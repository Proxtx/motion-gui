import config from "@proxtx/config";
import { increaseCounter } from "../private/stats.js";

export const auth = (pwd) => {
  let auth = pwd == config.pwd;
  increaseCounter("auth");
  if (!auth) increaseCounter("failed auth");
  return auth;
};
