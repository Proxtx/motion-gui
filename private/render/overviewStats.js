import { getCounter, getCounters } from "../stats.js";
import { auth } from "../../public/auth.js";

export const server = (document, options) => {
  console.log(options.req.cookies.pwd);
  if (!auth(options.req.cookies.pwd)) return;

  let counters = getCounters();
  let statsHolder = document.getElementById("statsHolder");
  for (let counterName of counters) {
    statsHolder.appendChild(createStat(document, counterName));
  }
};

const createStat = (document, name) => {
  let value = getCounter(name);
  let div = document.createElement("div");
  div.setAttribute("class", "stat");
  let nameElem = document.createElement("m-text");
  nameElem.innerText = name;
  let valueElem = document.createElement("m-text");
  valueElem.innerText = value;
  div.appendChild(nameElem);
  div.appendChild(valueElem);

  return div;
};
