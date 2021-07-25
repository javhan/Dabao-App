const { getMaxListeners } = require("./users.model")

const seedUsers = [
  {
    username: "peter",
    password: "ga123",
    address: { street: "katong", postCode: 123456 },
    contact: { hp: 12345678, email:"peter@gmail.com"},
    isDabao: "",
  },
  {
    username: "loo",
    password: "ga123",
    address: { street: "raffles", postCode: 654321 },
    contact: {hp: 23456789, email: "loo@gmail.com"},
    isDabao: "",
  },
  {
    username: "yeo",
    password: "ga123",
    address: {street: "punggol", postCode: 123456 },
    contact: {hp: 23456789, email: "yeo@gmail.com"},
    isDabao: "",
  },
  {
    username: "david",
    password: "ga123",
    address: {street: "punggol", postCode: 234567 },
    contact: {hp: 23456789, email: "david@gmail.com"},
    isDabao: "",
  },
  {
    username: "mamamia",
    password: "ga123",
    address: {street: "bishan", postCode: 666777 },
    contact: {hp: 23456789, email: "mamamia@gmail.com"},
    isDabao: "",
  },
  {
    username: "simon",
    password: "ga123",
    address: {street: "pasir ris", postCode: 444555 },
    contact: {hp: 23456789, email: "simon@gmail.com"},
    isDabao: "",
  },

];

module.exports = seedUsers;
