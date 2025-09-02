const axios = require("axios");
const qs = require("qs");

async function fetchCelcatData(start, end, group) {
  const data = qs.stringify({
    start,
    end,
    resType: 103,
    calView: "agendaDay",
    "federationIds[]": group,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://edt.rambouillet.iut-velizy.uvsq.fr/Home/GetCalendarData",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    data,
  };

  const response = await axios.request(config);

  return response.data.map((event) => {
    const lines = event.description
      .split(/[\r\n]+/)
      .map((line) => line.trim())
      .filter(Boolean);

    return {
      id: event.id,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      backgroundColor: event.backgroundColor,
      textColor: event.textColor,
      department: event.department,
      faculty: event.faculty,
      eventCategory: event.eventCategory,
      sites: event.sites,
      modules: event.modules,
      teacher: lines[0] || "",
      classGroup: lines[2] || "",
      room: lines[4] || "",
      module: lines[6] || "",
    };
  });
}

module.exports = { fetchCelcatData };
