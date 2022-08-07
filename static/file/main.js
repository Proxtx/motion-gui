import { file } from "../lib/apiLoader.js";
import { applyFile } from "./file.js";

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

let res = await file.nextIndexFile(cookie.pwd);
applyFile(res.data ? res.data : {}, res.file, res.perm);
