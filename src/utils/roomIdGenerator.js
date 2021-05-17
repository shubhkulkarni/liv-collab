import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
  names,
} from "unique-names-generator";

const config = {
  dictionaries: [adjectives, colors, names],
  separator: "-",
};

export const getRoomId = async () => {
  return await uniqueNamesGenerator(config);
};
