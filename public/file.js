import { getFileToIndex, index } from "../private/index.js";
import config from "@proxtx/config";
import { auth } from "./auth.js";
import { registerFilePerm } from "../private/render/file.js";
import fs from "fs/promises";
import { resolve } from "path";

export const nextIndexFile = async (pwd) => {
  if (!auth(pwd)) return;
  let file = await getFileToIndex();
  let perm = registerFilePerm(config.path + file.file);
  let indexInfo = (await index.index)[file.file];
  if (!indexInfo) indexInfo = {};
  if (!indexInfo.time) indexInfo.time = file.time;
  return { data: indexInfo, file: file.file, perm };
};

export const tags = async (pwd) => {
  if (!auth(pwd)) return;
  return config.tags;
};

export const saveData = async (pwd, fileName, data) => {
  if (!auth(pwd)) return;
  (await index.index)[fileName] = data;
  return { success: true };
};

export const deleteFile = async (pwd, fileName) => {
  if (!auth(pwd) || !isSubdirectory(config.path + fileName, config.path))
    return;
  await fs.unlink(config.path + fileName);
};

const isSubdirectory = (path, folder) => {
  return resolve(path).substring(0, resolve(folder).length) == resolve(folder);
};
