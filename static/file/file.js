import { file } from "../lib/apiLoader.js";
import { createTags } from "../lib/tag.js";

let globalData;
let globalFileName;

const tagsWrap = document.getElementById("tags");
const video = document.getElementById("video");
const name = document.getElementById("name");
name.addEventListener("change", () => {
  globalData.name = name.component.value;
});

const saveElem = document.getElementById("save");
saveElem.addEventListener("click", async () => {
  await save();
});

const nextElem = document.getElementById("next");
nextElem.addEventListener("click", async () => {
  await save();
  nextObj.next();
});

const deleteElem = document.getElementById("delete");
deleteElem.addEventListener("click", async () => {
  await deleteFile();
  nextObj.next();
});

export const applyFile = (data, file, filePerm) => {
  globalData = data;
  globalFileName = file;
  data.name = data.name ? data.name : file;
  name.component.value = data.name;
  data.selectedTags = data.selectedTags ? data.selectedTags : [];
  video.src = "/file.route/?perm=" + filePerm;

  createTags(data.selectedTags, tagsWrap);
};

export const save = async () => {
  await file.saveData(cookie.pwd, globalFileName, globalData);
};

export const deleteFile = async () => {
  await file.deleteFile(cookie.pwd, globalFileName);
};

export const nextObj = {
  next: () => {},
};
