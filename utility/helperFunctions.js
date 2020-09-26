const now = new Date();

const currentLocalTime = ()=> {
  return now.toLocaleTimeString('fi-FI');
};

const currentLocalDateTime = ()=> {
  return `--[ ${now} ]--`;
};
//return `--[ ${} ${now.toLocaleTimeString('fi-FI')} ]--`
module.exports = { currentLocalTime, currentLocalDateTime };