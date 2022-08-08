window.queryPosts = async () => {
  await new Promise((r) => setTimeout(r, 500));
  location.pathname = "./query";
};

window.indexPosts = async () => {
  await new Promise((r) => setTimeout(r, 500));
  localStorage.mode = "index";
  location.pathname = "./file";
};
