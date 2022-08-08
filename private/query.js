import { index } from "./index.js";

let indexInstance;

export const sortOptions = {
  date: (fileName1, fileName2) => {
    return indexInstance[fileName1].date - indexInstance[fileName2].date;
  },

  name: (fileName1, fileName2) => {
    return indexInstance[fileName1].name.localeCompare(
      indexInstance[fileName2].name
    );
  },
};

export const query = async (sortBy, reverse, filter, tags) => {
  indexInstance = await index.index;
  let fileNames = Object.keys(indexInstance);
  if (filter)
    fileNames = fileNames.filter((value) =>
      indexInstance[value].name.includes(filter)
    );
  fileNames = fileNames.sort(sortOptions[sortBy]);
  if (reverse) fileNames = fileNames.reverse();
  if (tags && tags.length > 0)
    fileNames = fileNames.filter((name) => {
      let keep = true;
      for (let tagName of tags) {
        if (!indexInstance[name].selectedTags.includes(tagName)) return;
      }
      return keep;
    });
  return fileNames;
};
