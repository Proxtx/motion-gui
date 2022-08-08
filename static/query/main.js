import { createTags } from "../lib/tag.js";
import { publicSortingInterface } from "../lib/apiLoader.js";

let tagsWrap = document.getElementById("tags");
let skip = document.getElementById("skip");
let reverse = document.getElementById("reverse");
let filter = document.getElementById("filter");
let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  skip.component.value = 0;
});

let go = document.getElementById("go");
go.addEventListener("click", () => {
  localStorage.query = JSON.stringify(collectQuery());
  localStorage.mode = "query";
  location.pathname = "../file";
});
let sortingButtonsWrap = document.getElementById("sortingButtonsWrap");
let activeTags = [];
createTags(activeTags, tagsWrap);

let activeSortingOption;
let activeButton;
let sortingOptionButtons = {};

const generateSortingOptions = async () => {
  let sortingOptions = await publicSortingInterface.sortingOptions;
  for (let option of sortingOptions) {
    let button = document.createElement("m-button");
    button.innerText = option;
    button.setAttribute("type", "outlined");
    button.addEventListener("click", () => {
      if (activeButton) activeButton.setAttribute("type", "outlined");
      activeButton = button;
      activeButton.setAttribute("type", "contained");
      activeSortingOption = option;
    });
    sortingButtonsWrap.appendChild(button);
    sortingOptionButtons[option] = button;
  }
};

await generateSortingOptions();

const applyQuery = (query) => {
  if (query.filter) filter.component.value = query.filter;
  if (!query.tags) query.tags = [];
  createTags(query.tags, tagsWrap);
  activeTags = query.tags;
  if (query.sortBy) sortingOptionButtons[query.sortBy].click();
  else sortingOptionButtons[Object.keys(sortingOptionButtons)[0]].click();
  reverse.component.checked = query.reverse;
  if (!query.skip) query.skip = 0;
  skip.component.value = query.skip;
};

applyQuery(localStorage.query ? JSON.parse(localStorage.query) : {});

const collectQuery = () => {
  let query = {};
  query.filter = filter.component.value;
  query.tags = activeTags;
  query.sortBy = activeSortingOption;
  query.reverse = reverse.component.checked;
  query.skip = skip.component.value;

  return query;
};
