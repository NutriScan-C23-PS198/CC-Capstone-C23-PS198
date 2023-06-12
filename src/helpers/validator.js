/* eslint-disable eol-last */
/* eslint-disable arrow-body-style */
const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const isValidUsername = (username) => {
  return username.length >= 3;
};

const isValidPass = (pass) => {
  return pass.length >= 8;
};

module.exports = {
  isValidEmail,
  isValidUsername,
  isValidPass,
};
