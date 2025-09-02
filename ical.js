const { default: ical } = require("ical-generator");
const he = require("he");

// Map l'événement Celcat brut vers l'événement prêt pour l'ICS
function mapEvent(event) {
  // Calcul du module
  const moduleName = event.module ? (event.module.match(/- (.*) \[/) || [])[1] || "" : "";

  // Calcul du tag catégorie
  let categoryTag = "";
  switch (event.eventCategory) {
    case "Cours Magistraux (CM)":
      categoryTag = "[CM]";
      break;
    case "Travaux Pratiques (TP)":
      categoryTag = "[TP]";
      break;
    case "Travaux Dirigés (TD)":
      categoryTag = "[TD]";
      break;
    default:
      categoryTag = event.eventCategory ? `[${event.eventCategory}]` : "";
  }

  // Summary
  const summary = moduleName ? `${moduleName} ${categoryTag}` : categoryTag;

  // Description : salle + enseignant
  const description = `${event.teacher}`;

  return {
    start: new Date(event.start),
    end: new Date(event.end),
    allDay: event.allDay,
    summary: he.decode(summary),
    description: he.decode(description),
    location: event.room,
  };
}

function generateICal(events, group) {
  const cal = ical({ name: group });

  // Mapper chaque événement avant de créer l'ICS
  events.map(mapEvent).forEach((event) => {
    cal.createEvent(event);
  });

  return cal;
}

module.exports = { generateICal, mapEvent };
