const express = require("express");
const axios = require("axios");
const ical = require("ical");
const icalGenerator = require("ical-generator").default;

const app = express();
const PORT = 3000;

// ---- Fonctions utilitaires ----

const parseTitle = (rawTitle) => {
  if (!rawTitle?.trim()) return "Titre non défini";
  let [, name] = rawTitle.split(" - ");
  name = name || rawTitle;

  if (name.includes(";")) {
    let [courseName, typeRaw] = name.split(";").map((s) => s.trim());
    let tag = "";
    if (typeRaw) {
      tag =
        {
          "Cours Magistraux (CM)": "[CM]",
          "Travaux Pratiques (TP)": "[TP]",
          "Travaux Dirigés (TD)": "[TD]",
        }[typeRaw] || `[${typeRaw}]`;
    }
    name = tag ? `${tag} ${courseName}` : courseName;
  }
  return name.trim() || "Titre non défini";
};

const parseDescription = (desc) => {
  if (!desc?.trim()) return { prof: "Professeur inconnu", group: "Tous" };

  const [profRaw, groupRaw] = desc.split(";").map((s) => s.trim());
  const prof = profRaw || "Professeur inconnu";

  const cleanGroup = (groupRaw || "").split("\n\n")[0].trim();
  let group = "Tous";

  if (cleanGroup) {
    const mmiMatch = cleanGroup.match(/^MMI(\d*)-?(.*)$/);
    group = mmiMatch ? (mmiMatch[2] ? mmiMatch[2].trim() : "Tous") : cleanGroup.trim();
  }

  return { prof, group };
};

const cleanLocation = (loc) => {
  if (!loc?.trim()) return "Lieu non défini";
  return loc.replace(/\s*- VEL$/, "").trim();
};

// ---- Serveur Express ----

app.get("/ics", async (req, res) => {
  const { group, type } = req.query; // récupérer type depuis l'URL
  if (!group) return res.status(400).send("Paramètre 'group' requis");

  const ICAL_URL = `https://celcat.rambouillet.iut-velizy.uvsq.fr/cal/ical/${group}/schedule.ics`;

  try {
    const { data } = await axios.get(ICAL_URL);
    const events = ical.parseICS(data);

    const cal = icalGenerator({
      name: `Emploi du temps ${group}`,
      prodId: "//UVSQ//ICAL-Generator//FR",
      timezone: "Europe/Paris",
    });

    Object.values(events)
      .filter((ev) => ev.type === "VEVENT")
      .forEach((ev) => {
        const title = parseTitle(ev.summary);
        const { prof, group: grp } = parseDescription(ev.description);

        // Filtrage par type si param type fourni
        if (type) {
          const tagMatch = title.match(/^\[(CM|TP|TD|.*?)]/);
          if (!tagMatch || tagMatch[1] !== type) return;
        }

        cal.createEvent({
          start: ev.start,
          end: ev.end,
          uid: ev.uid,
          dtstamp: ev.dtstamp,
          created: ev.created,
          lastModified: ev.lastmodified,
          summary: title,
          location: cleanLocation(ev.location),
          description: `
📚 Enseignant : ${prof}
👥 Groupe : ${grp}
          `.trim(),
        });
      });

    res.setHeader("Content-Type", "text/calendar");
    res.setHeader("Content-Disposition", `attachment; filename="edt_${group}.ics"`);
    res.send(cal.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération du calendrier");
  }
});

app.listen(PORT, () => {
  console.log("--------------------------------------------------");
  console.log("✅ Serveur ICS démarré avec succès !");
  console.log("🔗 Exemple d'URL pour récupérer le calendrier d'un groupe :");
  console.log(`   http://localhost:${PORT}/ics?group=G1-HN2CHYNX5990`);
  console.log("📌 Paramètres disponibles :");
  console.log("   - group : obligatoire, identifiant du groupe Celcat (remplacez G1-HN2CHYNX5990 par votre groupe)");
  console.log("   - type  : optionnel, filtre par type d'événement (CM, TP, TD)");
  console.log("--------------------------------------------------");
});
