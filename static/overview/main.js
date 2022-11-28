import { auth } from "../lib/apiLoader.js";

const liveIframe = document.getElementById("liveIframe");
const liveBox = document.getElementById("liveBox");

let liveView = await auth.liveView(cookie.pwd);
if (liveView) liveIframe.src = liveView;
else liveBox.style.display = "none";

window.queryPosts = async () => {
  await new Promise((r) => setTimeout(r, 500));
  location.pathname = "./query";
};

window.indexPosts = async () => {
  await new Promise((r) => setTimeout(r, 500));
  localStorage.mode = "index";
  location.pathname = "./file";
};

window.stopDeleteSegment = () => {
  localStorage.removeItem("deleteSegment");
  window.indexPosts();
};

let playbackSpeed = document.getElementById("playbackSpeed");

if (!localStorage.playbackSpeed) localStorage.playbackSpeed = 1;
playbackSpeed.setAttribute("value", localStorage.playbackSpeed);

window.savePlaybackSpeed = () => {
  localStorage.playbackSpeed = playbackSpeed.component.value;
};
