// For further information about these options, please read the documentation.
// https://www.npmjs.com/package/fastest-validator

export const postUserValidator = {
  name: {
    type: "string",
    min: 3,
    max: 255,
  },
  email: {
    type: "email",
    max: 255,
  },
  password: {
    type: "string",
    min: 6,
    max: 255,
  },
};
