import { auth } from "../lib/apiLoader.js";

let password = document.getElementById("password");

document.getElementById("login").addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 500));
  cookie.pwd = password.component.value;
  if (await auth.auth(cookie.pwd)) location.pathname = "../";
  password.component.value = "";
});
