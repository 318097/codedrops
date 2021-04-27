const hasToken = () => !!getToken();

const getToken = () => getSessionFromStorage().token || "";

const setSessionInStorage = (data = {}) => {
  localStorage.clear();
  localStorage.setItem("codedrops-tech", JSON.stringify(data));
};

const getSessionFromStorage = () =>
  JSON.parse(localStorage.getItem("codedrops-tech") || "{}");

module.exports = {
  hasToken,
  getToken,
  setSessionInStorage,
  getSessionFromStorage,
};
