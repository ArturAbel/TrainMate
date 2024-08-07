import { levelCorrectOrder } from "../../utilities/constants";

export const sortLevels = (level) => {
  return [...level].sort(
    (a, b) => levelCorrectOrder.indexOf(a) - levelCorrectOrder.indexOf(b)
  );
};
