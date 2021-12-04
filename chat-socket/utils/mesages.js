const moment = require("moment");
function formatMassage(username, text) {
  const time = moment().format("h:mm a");
  text.time = time;
  return text;
}

module.exports = formatMassage;
