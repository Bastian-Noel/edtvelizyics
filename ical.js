const { default: ical } = require("ical-generator");
const he = require("he");
const { DateTime } = require("luxon"); // pratique pour gérer les TZ

function mapEvent(event) {
  const moduleName = event.module ? (event.module.match(/- (.*) \[/) || [])[1] || "" : "";

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

  const summary = moduleName ? `${moduleName} ${categoryTag}` : categoryTag;

  return {
    start: DateTime.fromISO(event.start, { zone: "Europe/Paris" }).toJSDate(),
    end: DateTime.fromISO(event.end, { zone: "Europe/Paris" }).toJSDate(),
    allDay: event.allDay,
    summary: he.decode(summary),
    description: he.decode(`${event.teacher}`),
    location: event.room,
  };
}

function generateICal(events, group) {
  const cal = ical({
    name: group,
    timezone: "Europe/Paris", // important !
  });

  events.map(mapEvent).forEach((event) => {
    cal.createEvent(event);
  });

  return cal;
}

module.exports = { generateICal, mapEvent };
