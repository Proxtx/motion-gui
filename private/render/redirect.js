import { auth } from "../../public/auth.js";

export const server = (document, options) => {
  if (!auth(options.req.cookies.pwd)) return options.res.redirect("./login");
  return options.res.redirect("./overview");
};
