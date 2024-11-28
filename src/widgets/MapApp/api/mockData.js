export const filterCfg = {
  inputs: {
    search: {
      value: null,
      isChecked: "null",
      isDisabled: "null",
    },
    bars: {
      value: null,
      isChecked: true,
      isDisabled: false,
    },
    restaurant: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    trk: {
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
    type: "bars",
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
    type: "trk",
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
    { id: "1", type: "bars", cords: [56.5, 57.9] },
    { id: "2", type: "restaurant", cords: [54.5, 57.9] },
    { id: "14", type: "theater", cords: [53.5, 57.9] },
    { id: "15", type: "cinema", cords: [52.5, 57.9] },
    { id: "16", type: "trk", cords: [51.5, 57.9] },
  ],
};
