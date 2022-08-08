window.queryPosts = async () => {
  await new Promise((r) => setTimeout(r, 500));
  location.pathname = "./query";
};

window.indexPosts = async () => {
  await new Promise((r) => setTimeout(r, 500));
  localStorage.mode = "index";
  location.pathname = "./file";
};

let playbackSpeed = document.getElementById("playbackSpeed");

if (!localStorage.playbackSpeed) localStorage.playbackSpeed = 1;
playbackSpeed.setAttribute("value", localStorage.playbackSpeed);

window.savePlaybackSpeed = () => {
  localStorage.playbackSpeed = playbackSpeed.component.value;
};
