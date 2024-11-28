export const filterCfg = {
  inputs: {
    search: {
      value: null,
      isChecked: "null",
      isDisabled: "null",
    },
    bars: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    restaurant: {
      value: null,
      isChecked: false,
      isDisabled: false,
    },
    music: {
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
    type: "0",
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
    type: "1",
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
    { id: "1", type: "0", cords: [56.5, 57.9] },
    { id: "2", type: "1", cords: [54.5, 57.9] },
    { id: "14", type: "2", cords: [53.5, 57.9] },
    { id: "15", type: "3", cords: [52.5, 57.9] },
    { id: "16", type: "4", cords: [51.5, 57.9] },
  ],
};
