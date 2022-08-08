import { file, publicSortingInterface } from "../lib/apiLoader.js";
import { applyFile, nextObj } from "./file.js";

if (window.guiLoaded) await new Promise((r) => window.guiLoaded.push(r));

let video = document.getElementById("video");
let played = false;

try {
  await video.play();
} catch {
  window.addEventListener("click", () => {
    if (!played) video.play();
    played = true;
  });
}

if (localStorage.mode == "query") {
  let data = JSON.parse(localStorage.query);
  let res = await publicSortingInterface.getPostWithQuery(
    cookie.pwd,
    data,
    data.skip
  );
  if (!res || !res.data) {
    alert("Noting was found!");
    location.pathname = "../query";
  }
  console.log(res);
  applyFile(res.data, res.file, res.perm);
  nextObj.next = () => {
    data.skip++;
    localStorage.query = JSON.stringify(data);
    location.pathname = location.pathname;
  };
} else {
  let res = await file.nextIndexFile(cookie.pwd);
  if (!res || !res.data) {
    alert("All done!");
    location.pathname = "../";
  }
  applyFile(res.data ? res.data : {}, res.file, res.perm);
  nextObj.next = () => {
    location.pathname = location.pathname;
  };
}
