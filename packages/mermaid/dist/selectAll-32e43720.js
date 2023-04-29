import { S as Selection, B as root, C as array } from "./commonDb-2573ecd8.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
//# sourceMappingURL=selectAll-32e43720.js.map
