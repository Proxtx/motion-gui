import fs from "fs/promises";
import config from "@proxtx/config";
import { setCounter } from "./stats.js";

class Index {
  indexContent;
  promise;

  constructor() {
    this.promise = (async () => {
      try {
        this.indexContent = JSON.parse(
          await fs.readFile(config.path + "/index.json")
        );
      } catch {
        this.indexContent = {};
      }
    })();

    this.saveLoop();
  }

  async saveLoop() {
    await this.saveIndex();
    setTimeout(() => this.saveLoop(), 600000);
  }

  get index() {
    return (async () => {
      if (!this.indexContent) await this.promise;
      return this.indexContent;
    })();
  }

  set index(data) {
    this.indexContent = data;

    return this.saveIndex();
  }

  async saveIndex() {
    if (!this.indexContent) return;
    await fs.writeFile(
      config.path + "/index.json",
      JSON.stringify(this.indexContent, null, 2)
    );
  }
}

export let index = new Index();

export const allFiles = async () => {
  let fileNames = await fs.readdir(config.path);
  let files = [];
  let promises = [];

  for (let fileName of fileNames) {
    promises.push(
      (async () => {
        files.push({
          file: fileName,
          time: (await fs.stat(config.path + fileName)).mtime.getTime(),
        });
      })()
    );
  }

  await Promise.all(promises);

  files = files.sort((a, b) => a.time - b.time);

  setCounter("files", files.length);

  return files;
};

export const getFileToIndex = async () => {
  let files = await allFiles();
  setCounter(
    "files to index",
    files.length - Object.keys(await index.index).length - 1
  );
  setCounter("indexed files", Object.keys(await index.index).length);
  for (let file of files) {
    if (!(await index.index)[file.file] && file.file != "index.json")
      return file;
  }
};
