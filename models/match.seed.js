const { getMaxListeners } = require("./shop.model");

const seedMatch = [
  {
    timePosted: Date.now(),
    DBER: "60fbae8c71401c1521d7027b",
    maxOrders: 1,
    Orders: [],
    pickUpLocation: {
      street: "katong",
      postCode: 123456,
    },
    timeAtPickUp: Date.now(),
    orderLocation: {
      street: "Bishan S11 Food Court",
      postCode: 570504,
    },
  },
  {
    timePosted: Date.now(),
    DBER: "60fbae8c71401c1521d7027c",
    maxOrders: 1,
    Orders: [],
    pickUpLocation: {
      street: "raffles",
      postCode: 654321,
    },
    timeAtPickUp: Date.now(),
    orderLocation: {
      street: "Bishan S11 Food Court",
      postCode: 570504,
    },
  },
  {
    timePosted: Date.now(),
    DBER: "60fbae8c71401c1521d7027d",
    maxOrders: 1,
    Orders: [],
    pickUpLocation: {
      street: "punggol",
      postCode: 123456,
    },
    timeAtPickUp: Date.now(),
    orderLocation: {
      street: "Bishan MRT Station 7-11",
      postCode: 579827,
    },
  },
  {
    timePosted: Date.now(),
    DBER: "60fbae8c71401c1521d7027e",
    maxOrders: 1,
    Orders: [
      {
        DBEE: "60fbae8c71401c1521d7027d",
        isCompleted: false,
        remarks: "No Skin",
        dishOrdered: {
          itemName: "Chicken Rice (White)",
          itemPrice: 4,
        },
        messages: [
          {
            message: "Hello",
            timePosted: Date.now(),
            user: "yeo",
          },
        ],
      },
    ],
    pickupLocation: {
      street: "punggol",
      postCode: 234567,
    },
    timeAtPickUp: Date.now(),
    orderLocation: {
      street: "Bishan S11 Food Court",
      postCode: 570504,
    },
  },
  {
    timePosted: Date.now(),
    DBER: "60fbae8c71401c1521d7027e",
    maxOrders: 1,
    Orders: [
      {
        DBEE: "60fbae8c71401c1521d7027d",
        isCompleted: false,
        remarks: "No Skin",
        dishOrdered: {
          itemName: "Chicken Rice (Black)",
          itemPrice: 4,
        },
        messages: [
          {
            message: "Hello",
            timePosted: Date.now(),
            user: "yeo",
          },
        ],
      },
    ],
    pickupLocation: {
      street: "punggol",
      postCode: 234567,
    },
    timeAtPickUp: Date.now(),
    orderLocation: {
      street: "Bishan S11 Food Court",
      postCode: 570504,
    },
  },
];

module.exports = seedMatch;
