import { X as c, _ as r } from "./commonDb-ee617a3e.js";
const e = (n) => {
  const { r: t, g: o, b: a } = c.parse(n), s = 0.2126 * r.channel.toLinear(t) + 0.7152 * r.channel.toLinear(o) + 0.0722 * r.channel.toLinear(a);
  return r.lang.round(s);
}, i = e, l = (n) => i(n) >= 0.5, u = l, h = (n) => !u(n), L = h;
export {
  L as i
};
//# sourceMappingURL=is_dark-5f33190b.js.map
