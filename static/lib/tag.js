import { file } from "../lib/apiLoader.js";

export const createTags = (selectedTags, wrap) => {
  tags.innerHTML = "";

  for (let tag of availableTags) {
    let tagElem = document.createElement("m-button");
    tagElem.className = "tag";
    tagElem.innerText = tag.name;
    tagElem.setAttribute(
      "type",
      selectedTags.includes(tag.name) ? "contained" : "text"
    );
    tagElem.style.cssText = "--accentColor: " + tag.color;
    tagElem.addEventListener("click", () => {
      let index = selectedTags.indexOf(tag.name);
      if (index != -1) {
        selectedTags.splice(index, 1);
        tagElem.setAttribute("type", "text");
      } else {
        selectedTags.push(tag.name);
        tagElem.setAttribute("type", "contained");
      }
    });
    wrap.appendChild(tagElem);
  }
};

export const availableTags = await file.tags(cookie.pwd);
