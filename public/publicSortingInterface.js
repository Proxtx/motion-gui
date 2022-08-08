import { query, sortOptions } from "../private/query.js";
import { auth } from "./auth.js";
import { index } from "../private/index.js";
import { registerFilePerm } from "../private/render/file.js";
import config from "@proxtx/config";

const queries = {};

export const getPostWithQuery = async (pwd, queryOptions, skip) => {
  if (!auth(pwd)) return;
  let result;
  let queryString = JSON.stringify(queryOptions);
  if (
    queries[queryString] &&
    queries[queryString].date >= Date.now() + 1200000
  ) {
    console.log("loading from cache");
    result = queryOptions;
  } else {
    result = await query(
      queryOptions.sortBy,
      queryOptions.reverse,
      queryOptions.filter,
      queryOptions.tags
    );
  }

  let perm = registerFilePerm(config.path + result[skip]);

  return { file: result[skip], data: (await index.index)[result[skip]], perm };
};

export const sortingOptions = Object.keys(sortOptions);
