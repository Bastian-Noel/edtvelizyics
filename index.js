const express = require("express");
const { fetchCelcatData } = require("./celcat");
const { generateICal } = require("./ical");

const app = express();

app.get("/ics", async (req, res) => {
  try {
    const group = req.query.group;
    const { start, end } = getMonthRange();
    const events = await fetchCelcatData(start, end, group);
    const cal = generateICal(events, group);

    res.setHeader("Content-Type", "text/calendar");
    res.send(cal.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la génération du calendrier");
  }
});

// Calculer la plage de dates : lundi précédent → dimanche fin du mois suivant
function getMonthRange() {
  const now = new Date();

  // Lundi précédent
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));

  // Dimanche 1 mois plus tard
  const sunday = new Date(monday);
  sunday.setMonth(monday.getMonth() + 1);
  sunday.setDate(sunday.getDate() + 6);

  return {
    start: monday.toISOString().split("T")[0],
    end: sunday.toISOString().split("T")[0],
  };
}

app.listen(3000, () => console.log("Serveur prêt ! Exemple : http://localhost:3000/ics?group=MMI1-B1"));
