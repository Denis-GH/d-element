export const filterCfg = {
  inputs: {
    search: {
      value: null,
      isChecked: "null",
      isDisabled: "null",
    },
    bar: {
      value: null,
      isChecked: true,
      isDisabled: false,
    },
    restaurant: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    club: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    theater: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    cinema: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
  },
};

export const markDetail = [
  {
    id: "1",
    title: "Al Capone",
    type: "bar",
    address: {
      city: "Челябинск",
      house: "12a",
      street: "ул. Братьев Кашириных",
    },
    comment: "Хороший бар и караоке, по средам у них специальные акции с коктейлями",
    images: [
      "assets/marksDetail/1.jpg",
      "assets/marksDetail/2.webp",
      "assets/marksDetail/3.jpg",
      "assets/marksDetail/4.jpg",
      "assets/marksDetail/5.jpg",
    ],
  },
  {
    id: "2",
    title: "Al Capone 2",
    type: "restaurant",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment: "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
  {
    id: "3",
    title: "Al Capone 2",
    type: "theater",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment: "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
  {
    id: "4",
    title: "Al Capone 2",
    type: "cinema",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment: "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
  {
    id: "5",
    title: "Al Capone 2",
    type: "club",
    address: {
      city: "Челябинск 2",
      house: "12a",
      street: "ул. Братьев Кашириных 2",
    },
    comment: "Хороший бар и караоке, по средам у них специальные акции с коктейлями 2",
    images: [
      "/images/image1.png",
      "/images/image2.png",
      "/images/image3.png",
      "/images/image4.png",
    ],
  },
];

export const marksList = {
  marks: [
    { id: "1", type: "bar", cords: [55.173722, 61.401783] },
    { id: "2", type: "restaurant", cords: [55.175375, 61.395695] },
    { id: "3", type: "theater", cords: [55.174985, 61.405741] },
    { id: "4", type: "cinema", cords: [55.171743, 61.40212] },
    { id: "5", type: "club", cords: [55.173287, 61.392337] },
    { id: "6", type: "restaurant", cords: [55.175375, 61.40212] },
    { id: "7", type: "restaurant", cords: [55.177375, 61.41212] },
    { id: "8", type: "bar", cords: [55.176375, 61.40212] },
    { id: "9", type: "bar", cords: [55.178375, 61.4] },
    { id: "10", type: "theater", cords: [55.178375, 61.395] },
  ],
};
