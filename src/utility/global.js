export const ENDPOINT = "http://localhost:8000/";
//export const ENDPOINT = "https://serverdev.scotstudy.co.uk/";
export const SERVER_URL = `${ENDPOINT}api`;
export const TOKEN = "tk-cookie";
export const USER = "tk-user";
export const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },

  getUser: function () {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(USER));
    });
  },
};
