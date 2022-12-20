export const COLOR = {
  primary: "#A352EB",
  white: "#FFFFFF"
};
export const CHARACTERISTICS_OPTIONS = [
  // this is the parent or 'item'
  {
    name: "My child wears or has",
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: "Glasses",
        id: 1,
      },
      {
        name: "Birthmark(s)",
        id: 2,
      },
      {
        name: "Scar(s)",
        id: 3,
      },
      {
        name: "Tattoo(s)",
        id: 4,
      },
      {
        name: "Braces",
        id: 5,
      },
    ],
  },
];
export const MAXIMUM_EMERGENCY_CONTACT_COUNT = 3;

export const MAXIMUM_TRUSTED_CONTACT_COUNT = 10;

export const CONTACT_INIT_OBJ = {
  name: "",
  relationship: "",
  primaryPhoneNumber: "",
  secondaryPhoneNumber: "",
  address: "",
};
