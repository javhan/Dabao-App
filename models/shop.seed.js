const { getMaxListeners } = require("./shop.model");

const seedShop = [
  {
    street: "Bishan S11 Food Court",
    postCode: 570504,
    stores: [
      {
        name: "Ah Han Chicken Rice",
        menu: [
          {
            itemName: "Chicken Rice (White)",
            itemPrice: 4.0,
          },
          {
            itemName: "Chicken Rice (Roast)",
            itemPrice: 4.0,
          },
        ],
      },
      {
        name: "Daryl's CKT",
        menu: [
          {
            itemName: "CKT (with hum)",
            itemPrice: 3.0,
          },
          {
            itemName: "CKT (no hum)",
            itemPrice: 2.5,
          },
          {
            itemName: "Orh Luat",
            itemPrice: 3.0,
          },
        ],
      },
      {
        name: "Chan's Grill",
        menu: [
          {
            itemName: "Sirloin Steak",
            itemPrice: 8.0,
          },
          {
            itemName: "Seafood Pasta",
            itemPrice: 6.0,
          },
        ],
      },
    ],
  },
  {
    street: "Bishan MRT Station 7-11",
    postCode: 579827,
    stores: [
      {
        name: "Bishan MRT Station 7-11",
        menu: [
          {
            itemName: "Today Newspaper",
            itemPrice: 0.6,
          },
          {
            itemName: "Straits Times",
            itemPrice: 0.8,
          },
          {
            itemName: "Magnum Ice-Cream (Almond)",
            itemPrice: 4.2,
          },
        ],
      }
    ],
  },
  {
    street: "Old Airport Road Food Centre & Shopping Mall",
    postCode: 390051,
    stores: [
      {
        name: "Lao Ban Tao Huey",
        menu: [
          {
            itemName: "Tao Huey",
            itemPrice: 2.0,
          },
          {
            itemName: "Tao Heuy Zui",
            itemPrice: 1.0,
          },
        ],
      },
      {
        name: "Xin Mei Xiang Zheng Zong Lor Mee",
        menu: [
          {
            itemName: "Lor Mee (S)",
            itemPrice: 5.0,
          },
          {
            itemName: "Lor Mee (B)",
            itemPrice: 7.0,
          },
        ],
      },
      {
        name: "Roast Paradise",
        menu: [
          {
            itemName: "Roast Pork Rice",
            itemPrice: 4.0,
          },
          {
            itemName: "Char Siew Rice",
            itemPrice: 4.0,
          },
          {
            itemName: "Char Siew + Roast Pork Rice",
            itemPrice: 5.0,
          },
        ],
      },
    ],
  },
  {
    street: "Maxwell Food Centre",
    postCode: "069184",
    stores: [
      {
        name: "Tian Tian Chicken Rice",
        menu: [
          {
            itemName: "Chicken Rice (White)",
            itemPrice: 4.0,
          },
          {
            itemName: "Chicken Rice (Roast)",
            itemPrice: 4.0,
          },
        ],
      },
      {
          name: "Yi Jia Teochew Fish",
          menu: [{
              itemName: "Fish Soup",
              itemPrice: 5.00
          },
          {
              itemName: "Fish Porridge",
              itemPrice: 4.00
          }
        ]

      }
    ],
  },
];

module.exports = seedShop;
