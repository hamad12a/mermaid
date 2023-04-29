import { l as M, h as A, g as R, i as Ee, j as zt, u as je, r as H, k as Tt, s as Bt, a as xe, m as Ce, p as Ie, n as Me, t as Z, o as ke } from "./commonDb-ee617a3e.js";
import { g as Le, a as rt, r as Fe, d as Ut, b as Gt, c as _e, U as Re, e as Oe, f as Y, h as B, t as O, j as q, M as at, k as Ve, m as Pe, p as ze, u as Be, n as Ue, o as Ge } from "./utils-865f90f3.js";
var Nt = "comm", Xt = "rule", Ht = "decl", Ne = "@import", Xe = "@keyframes", He = Math.abs, ft = String.fromCharCode;
function Yt(t) {
  return t.trim();
}
function nt(t, e, r) {
  return t.replace(e, r);
}
function Ye(t, e) {
  return t.indexOf(e);
}
function K(t, e) {
  return t.charCodeAt(e) | 0;
}
function z(t, e, r) {
  return t.slice(e, r);
}
function x(t) {
  return t.length;
}
function qt(t) {
  return t.length;
}
function U(t, e) {
  return e.push(t), t;
}
var W = 1, _ = 1, Kt = 0, $ = 0, m = 0, V = "";
function pt(t, e, r, a, n, s, o) {
  return { value: t, root: e, parent: r, type: a, props: n, children: s, line: W, column: _, length: o, return: "" };
}
function qe() {
  return m;
}
function Ke() {
  return m = $ > 0 ? K(V, --$) : 0, _--, m === 10 && (_ = 1, W--), m;
}
function T() {
  return m = $ < Kt ? K(V, $++) : 0, _++, m === 10 && (_ = 1, W++), m;
}
function k() {
  return K(V, $);
}
function G() {
  return $;
}
function J(t, e) {
  return z(V, t, e);
}
function st(t) {
  switch (t) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function We(t) {
  return W = _ = 1, Kt = x(V = t), $ = 0, [];
}
function Je(t) {
  return V = "", t;
}
function tt(t) {
  return Yt(J($ - 1, ot(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function Qe(t) {
  for (; (m = k()) && m < 33; )
    T();
  return st(t) > 2 || st(m) > 3 ? "" : " ";
}
function Ze(t, e) {
  for (; --e && T() && !(m < 48 || m > 102 || m > 57 && m < 65 || m > 70 && m < 97); )
    ;
  return J(t, G() + (e < 6 && k() == 32 && T() == 32));
}
function ot(t) {
  for (; T(); )
    switch (m) {
      case t:
        return $;
      case 34:
      case 39:
        t !== 34 && t !== 39 && ot(m);
        break;
      case 40:
        t === 41 && ot(t);
        break;
      case 92:
        T();
        break;
    }
  return $;
}
function tr(t, e) {
  for (; T() && t + m !== 47 + 10; )
    if (t + m === 42 + 42 && k() === 47)
      break;
  return "/*" + J(e, $ - 1) + "*" + ft(t === 47 ? t : T());
}
function er(t) {
  for (; !st(k()); )
    T();
  return J(t, $);
}
function rr(t) {
  return Je(N("", null, null, null, [""], t = We(t), 0, [0], t));
}
function N(t, e, r, a, n, s, o, f, y) {
  for (var b = 0, c = 0, d = o, E = 0, j = 0, u = 0, h = 1, L = 1, g = 1, p = 0, S = "", F = n, D = s, w = a, l = S; L; )
    switch (u = p, p = T()) {
      case 40:
        if (u != 108 && K(l, d - 1) == 58) {
          Ye(l += nt(tt(p), "&", "&\f"), "&\f") != -1 && (g = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        l += tt(p);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        l += Qe(u);
        break;
      case 92:
        l += Ze(G() - 1, 7);
        continue;
      case 47:
        switch (k()) {
          case 42:
          case 47:
            U(ar(tr(T(), G()), e, r), y);
            break;
          default:
            l += "/";
        }
        break;
      case 123 * h:
        f[b++] = x(l) * g;
      case 125 * h:
      case 59:
      case 0:
        switch (p) {
          case 0:
          case 125:
            L = 0;
          case 59 + c:
            j > 0 && x(l) - d && U(j > 32 ? Dt(l + ";", a, r, d - 1) : Dt(nt(l, " ", "") + ";", a, r, d - 2), y);
            break;
          case 59:
            l += ";";
          default:
            if (U(w = St(l, e, r, b, c, n, f, S, F = [], D = [], d), s), p === 123)
              if (c === 0)
                N(l, e, w, w, F, s, d, f, D);
              else
                switch (E) {
                  case 100:
                  case 109:
                  case 115:
                    N(t, w, w, a && U(St(t, w, w, 0, 0, n, f, S, n, F = [], d), D), n, D, d, f, a ? F : D);
                    break;
                  default:
                    N(l, w, w, w, [""], D, 0, f, D);
                }
        }
        b = c = j = 0, h = g = 1, S = l = "", d = o;
        break;
      case 58:
        d = 1 + x(l), j = u;
      default:
        if (h < 1) {
          if (p == 123)
            --h;
          else if (p == 125 && h++ == 0 && Ke() == 125)
            continue;
        }
        switch (l += ft(p), p * h) {
          case 38:
            g = c > 0 ? 1 : (l += "\f", -1);
            break;
          case 44:
            f[b++] = (x(l) - 1) * g, g = 1;
            break;
          case 64:
            k() === 45 && (l += tt(T())), E = k(), c = d = x(S = l += er(G())), p++;
            break;
          case 45:
            u === 45 && x(l) == 2 && (h = 0);
        }
    }
  return s;
}
function St(t, e, r, a, n, s, o, f, y, b, c) {
  for (var d = n - 1, E = n === 0 ? s : [""], j = qt(E), u = 0, h = 0, L = 0; u < a; ++u)
    for (var g = 0, p = z(t, d + 1, d = He(h = o[u])), S = t; g < j; ++g)
      (S = Yt(h > 0 ? E[g] + " " + p : nt(p, /&\f/g, E[g]))) && (y[L++] = S);
  return pt(t, e, r, n === 0 ? Xt : f, y, b, c);
}
function ar(t, e, r) {
  return pt(t, e, r, Nt, ft(qe()), z(t, 2, -2), 0);
}
function Dt(t, e, r, a) {
  return pt(t, e, r, Ht, z(t, 0, a), z(t, a + 1, -1), a);
}
function ct(t, e) {
  for (var r = "", a = qt(t), n = 0; n < a; n++)
    r += e(t[n], n, t, e) || "";
  return r;
}
function nr(t, e, r, a) {
  switch (t.type) {
    case Ne:
    case Ht:
      return t.return = t.return || t.value;
    case Nt:
      return "";
    case Xe:
      return t.return = t.value + "{" + ct(t.children, a) + "}";
    case Xt:
      t.value = t.props.join(",");
  }
  return x(r = ct(t.children, a)) ? t.return = t.value + "{" + r + "}" : "";
}
const At = "10.1.0", Wt = "c4", sr = (t) => t.match(/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/) !== null, or = async () => {
  const { diagram: t } = await import("./c4Diagram-e7c73260.js");
  return { id: Wt, diagram: t };
}, cr = {
  id: Wt,
  detector: sr,
  loader: or
}, ir = cr, Jt = "flowchart", lr = (t, e) => {
  var r, a;
  return ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || ((a = e == null ? void 0 : e.flowchart) == null ? void 0 : a.defaultRenderer) === "elk" ? !1 : t.match(/^\s*graph/) !== null;
}, dr = async () => {
  const { diagram: t } = await import("./flowDiagram-edb8a0be.js");
  return { id: Jt, diagram: t };
}, ur = {
  id: Jt,
  detector: lr,
  loader: dr
}, mr = ur, Qt = "flowchart-v2", fr = (t, e) => {
  var r, a, n;
  return ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-d3" || ((a = e == null ? void 0 : e.flowchart) == null ? void 0 : a.defaultRenderer) === "elk" ? !1 : t.match(/^\s*graph/) !== null && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : t.match(/^\s*flowchart/) !== null;
}, pr = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-8303960e.js");
  return { id: Qt, diagram: t };
}, hr = {
  id: Qt,
  detector: fr,
  loader: pr
}, gr = hr, Zt = "er", yr = (t) => t.match(/^\s*erDiagram/) !== null, br = async () => {
  const { diagram: t } = await import("./erDiagram-6bc39513.js");
  return { id: Zt, diagram: t };
}, wr = {
  id: Zt,
  detector: yr,
  loader: br
}, $r = wr, te = "gitGraph", vr = (t) => t.match(/^\s*gitGraph/) !== null, Tr = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-53a4dc53.js");
  return { id: te, diagram: t };
}, Sr = {
  id: te,
  detector: vr,
  loader: Tr
}, Dr = Sr, ee = "gantt", Ar = (t) => t.match(/^\s*gantt/) !== null, Er = async () => {
  const { diagram: t } = await import("./ganttDiagram-74b5e88d.js");
  return { id: ee, diagram: t };
}, jr = {
  id: ee,
  detector: Ar,
  loader: Er
}, xr = jr, re = "info", Cr = (t) => t.match(/^\s*info/) !== null, Ir = async () => {
  const { diagram: t } = await import("./infoDiagram-b461b8a6.js");
  return { id: re, diagram: t };
}, Mr = {
  id: re,
  detector: Cr,
  loader: Ir
}, kr = Mr, ae = "pie", Lr = (t) => t.match(/^\s*pie/) !== null, Fr = async () => {
  const { diagram: t } = await import("./pieDiagram-777c754a.js");
  return { id: ae, diagram: t };
}, _r = {
  id: ae,
  detector: Lr,
  loader: Fr
}, Rr = _r, ne = "requirement", Or = (t) => t.match(/^\s*requirement(Diagram)?/) !== null, Vr = async () => {
  const { diagram: t } = await import("./requirementDiagram-7f49ebf0.js");
  return { id: ne, diagram: t };
}, Pr = {
  id: ne,
  detector: Or,
  loader: Vr
}, zr = Pr, se = "sequence", Br = (t) => t.match(/^\s*sequenceDiagram/) !== null, Ur = async () => {
  const { diagram: t } = await import("./sequenceDiagram-8ba67fe5.js");
  return { id: se, diagram: t };
}, Gr = {
  id: se,
  detector: Br,
  loader: Ur
}, Nr = Gr, oe = "class", Xr = (t, e) => {
  var r;
  return ((r = e == null ? void 0 : e.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : t.match(/^\s*classDiagram/) !== null;
}, Hr = async () => {
  const { diagram: t } = await import("./classDiagram-2baa410d.js");
  return { id: oe, diagram: t };
}, Yr = {
  id: oe,
  detector: Xr,
  loader: Hr
}, qr = Yr, ce = "classDiagram", Kr = (t, e) => {
  var r;
  return t.match(/^\s*classDiagram/) !== null && ((r = e == null ? void 0 : e.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !0 : t.match(/^\s*classDiagram-v2/) !== null;
}, Wr = async () => {
  const { diagram: t } = await import("./classDiagram-v2-175d7f9f.js");
  return { id: ce, diagram: t };
}, Jr = {
  id: ce,
  detector: Kr,
  loader: Wr
}, Qr = Jr, ie = "state", Zr = (t, e) => {
  var r;
  return ((r = e == null ? void 0 : e.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : t.match(/^\s*stateDiagram/) !== null;
}, ta = async () => {
  const { diagram: t } = await import("./stateDiagram-9875a0c8.js");
  return { id: ie, diagram: t };
}, ea = {
  id: ie,
  detector: Zr,
  loader: ta
}, ra = ea, le = "stateDiagram", aa = (t, e) => {
  var r, a;
  return !!(t.match(/^\s*stateDiagram-v2/) !== null || t.match(/^\s*stateDiagram/) && ((r = e == null ? void 0 : e.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || t.match(/^\s*stateDiagram/) && ((a = e == null ? void 0 : e.state) == null ? void 0 : a.defaultRenderer) === "dagre-wrapper");
}, na = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-cb47fd02.js");
  return { id: le, diagram: t };
}, sa = {
  id: le,
  detector: aa,
  loader: na
}, oa = sa, de = "journey", ca = (t) => t.match(/^\s*journey/) !== null, ia = async () => {
  const { diagram: t } = await import("./journeyDiagram-1c5edba0.js");
  return { id: de, diagram: t };
}, la = {
  id: de,
  detector: ca,
  loader: ia
}, da = la, ua = () => "", ma = ua, fa = function() {
}, pa = (t, e, r, a = null) => {
  var n;
  try {
    M.debug(`Renering svg for syntax error
`);
    const s = A("#" + e), o = s.append("g");
    if (a && ((n = a.message) != null && n.includes("KaTeX"))) {
      const f = a.message.split(": ")[0], y = a.message.replace(/[A-z]*:/, "").replace("KaTeX parse ", "");
      o.append("foreignObject").attr("height", 100).attr("width", 500).append("xhtml:div").style("font-size", "18px").style("color", "#552222").html(`<div style="font-size: 26px; margin-bottom: 8px">${f}</div><div>${y}</div>`), s.attr("height", 100), s.attr("width", 500);
    } else
      o.append("path").attr("class", "error-icon").attr(
        "d",
        "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
      ), o.append("path").attr("class", "error-icon").attr(
        "d",
        "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
      ), o.append("path").attr("class", "error-icon").attr(
        "d",
        "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
      ), o.append("path").attr("class", "error-icon").attr(
        "d",
        "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
      ), o.append("path").attr("class", "error-icon").attr(
        "d",
        "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
      ), o.append("path").attr("class", "error-icon").attr(
        "d",
        "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
      ), o.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in graph"), o.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text("mermaid version " + r), s.attr("height", 100), s.attr("width", 500), s.attr("viewBox", "768 0 912 512");
  } catch (s) {
    M.error("Error while rendering info diagram"), M.error(Le(s));
  }
}, ue = {
  setConf: fa,
  draw: pa
}, ha = {
  db: {
    clear: () => {
    }
  },
  styles: ma,
  renderer: ue,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  },
  init: () => {
  }
}, ga = ha, me = "flowchart-elk", ya = (t, e) => {
  var r;
  return (
    // If diagram explicitly states flowchart-elk
    !!(t.match(/^\s*flowchart-elk/) || // If a flowchart/graph diagram has their default renderer set to elk
    t.match(/^\s*flowchart|graph/) && ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk")
  );
}, ba = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-0f96ca3e.js");
  return { id: me, diagram: t };
}, wa = {
  id: me,
  detector: ya,
  loader: ba
}, $a = wa, fe = "timeline", va = (t) => t.match(/^\s*timeline/) !== null, Ta = async () => {
  const { diagram: t } = await import("./timeline-definition-dc15bb18.js");
  return { id: fe, diagram: t };
}, Sa = {
  id: fe,
  detector: va,
  loader: Ta
}, Da = Sa, pe = "mindmap", Aa = (t) => t.match(/^\s*mindmap/) !== null, Ea = async () => {
  const { diagram: t } = await import("./mindmap-definition-b8655102.js");
  return { id: pe, diagram: t };
}, ja = {
  id: pe,
  detector: Aa,
  loader: Ea
}, xa = ja;
let Et = !1;
const ht = () => {
  Et || (Et = !0, rt("error", ga, (t) => t.toLowerCase().trim() === "error"), rt(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: () => {
        }
      },
      styles: {},
      // should never be used
      renderer: {},
      // should never be used
      parser: {
        parser: { yy: {} },
        parse: () => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }
      },
      init: () => null
      // no op
    },
    (t) => t.toLowerCase().trimStart().startsWith("---")
  ), Fe(
    ir,
    Qr,
    qr,
    $r,
    xr,
    kr,
    Rr,
    zr,
    Nr,
    $a,
    gr,
    mr,
    xa,
    Da,
    Dr,
    oa,
    ra,
    da
  ));
}, Ca = (t) => t.trimStart().replace(/^\s*%%(?!{)[^\n]+\n?/gm, "");
class he {
  constructor(e) {
    var s, o;
    this.text = e, this.type = "graph", this.text += `
`;
    const r = R();
    try {
      this.type = Ut(e, r);
    } catch (f) {
      this.type = "error", this.detectError = f;
    }
    const a = Gt(this.type);
    M.debug("Type " + this.type), this.db = a.db, (o = (s = this.db).clear) == null || o.call(s), this.renderer = a.renderer, this.parser = a.parser;
    const n = this.parser.parse.bind(this.parser);
    this.parser.parse = (f) => n(Ca(Oe(f, this.db))), this.parser.parser.yy = this.db, a.init && (a.init(r), M.info("Initialized diagram " + this.type, r)), this.parse();
  }
  parse() {
    var e, r;
    if (this.detectError)
      throw this.detectError;
    (r = (e = this.db).clear) == null || r.call(e), this.parser.parse(this.text);
  }
  async render(e, r) {
    await this.renderer.draw(this.text, e, r, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}
const gt = async (t) => {
  const e = Ut(t, R());
  try {
    Gt(e);
  } catch {
    const a = _e(e);
    if (!a)
      throw new Re(`Diagram ${e} not found.`);
    const { id: n, diagram: s } = await a();
    rt(n, s);
  }
  return new he(t);
};
let it = [];
const Ts = (t) => {
  it.push(t);
}, Ia = () => {
  it.forEach((t) => {
    t();
  }), it = [];
};
var Ma = Object.prototype;
function ge(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || Ma;
  return t === r;
}
function ka(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var La = ka(Object.keys, Object);
const Fa = La;
var _a = Object.prototype, Ra = _a.hasOwnProperty;
function Oa(t) {
  if (!ge(t))
    return Fa(t);
  var e = [];
  for (var r in Object(t))
    Ra.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
var Va = Y(B, "DataView");
const lt = Va;
var Pa = Y(B, "Promise");
const dt = Pa;
var za = Y(B, "Set");
const ut = za;
var Ba = Y(B, "WeakMap");
const mt = Ba;
var jt = "[object Map]", Ua = "[object Object]", xt = "[object Promise]", Ct = "[object Set]", It = "[object WeakMap]", Mt = "[object DataView]", Ga = O(lt), Na = O(at), Xa = O(dt), Ha = O(ut), Ya = O(mt), I = q;
(lt && I(new lt(new ArrayBuffer(1))) != Mt || at && I(new at()) != jt || dt && I(dt.resolve()) != xt || ut && I(new ut()) != Ct || mt && I(new mt()) != It) && (I = function(t) {
  var e = q(t), r = e == Ua ? t.constructor : void 0, a = r ? O(r) : "";
  if (a)
    switch (a) {
      case Ga:
        return Mt;
      case Na:
        return jt;
      case Xa:
        return xt;
      case Ha:
        return Ct;
      case Ya:
        return It;
    }
  return e;
});
const qa = I;
function yt(t) {
  return t != null && typeof t == "object";
}
var Ka = "[object Arguments]";
function kt(t) {
  return yt(t) && q(t) == Ka;
}
var ye = Object.prototype, Wa = ye.hasOwnProperty, Ja = ye.propertyIsEnumerable, Qa = kt(function() {
  return arguments;
}()) ? kt : function(t) {
  return yt(t) && Wa.call(t, "callee") && !Ja.call(t, "callee");
};
const Za = Qa;
var tn = Array.isArray;
const en = tn;
var rn = 9007199254740991;
function be(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= rn;
}
function an(t) {
  return t != null && be(t.length) && !Ve(t);
}
function nn() {
  return !1;
}
var we = typeof exports == "object" && exports && !exports.nodeType && exports, Lt = we && typeof module == "object" && module && !module.nodeType && module, sn = Lt && Lt.exports === we, Ft = sn ? B.Buffer : void 0, on = Ft ? Ft.isBuffer : void 0, cn = on || nn;
const ln = cn;
var dn = "[object Arguments]", un = "[object Array]", mn = "[object Boolean]", fn = "[object Date]", pn = "[object Error]", hn = "[object Function]", gn = "[object Map]", yn = "[object Number]", bn = "[object Object]", wn = "[object RegExp]", $n = "[object Set]", vn = "[object String]", Tn = "[object WeakMap]", Sn = "[object ArrayBuffer]", Dn = "[object DataView]", An = "[object Float32Array]", En = "[object Float64Array]", jn = "[object Int8Array]", xn = "[object Int16Array]", Cn = "[object Int32Array]", In = "[object Uint8Array]", Mn = "[object Uint8ClampedArray]", kn = "[object Uint16Array]", Ln = "[object Uint32Array]", i = {};
i[An] = i[En] = i[jn] = i[xn] = i[Cn] = i[In] = i[Mn] = i[kn] = i[Ln] = !0;
i[dn] = i[un] = i[Sn] = i[mn] = i[Dn] = i[fn] = i[pn] = i[hn] = i[gn] = i[yn] = i[bn] = i[wn] = i[$n] = i[vn] = i[Tn] = !1;
function Fn(t) {
  return yt(t) && be(t.length) && !!i[q(t)];
}
function _n(t) {
  return function(e) {
    return t(e);
  };
}
var $e = typeof exports == "object" && exports && !exports.nodeType && exports, P = $e && typeof module == "object" && module && !module.nodeType && module, Rn = P && P.exports === $e, et = Rn && Pe.process, On = function() {
  try {
    var t = P && P.require && P.require("util").types;
    return t || et && et.binding && et.binding("util");
  } catch {
  }
}();
const _t = On;
var Rt = _t && _t.isTypedArray, Vn = Rt ? _n(Rt) : Fn;
const Pn = Vn;
var zn = "[object Map]", Bn = "[object Set]", Un = Object.prototype, Gn = Un.hasOwnProperty;
function X(t) {
  if (t == null)
    return !0;
  if (an(t) && (en(t) || typeof t == "string" || typeof t.splice == "function" || ln(t) || Pn(t) || Za(t)))
    return !t.length;
  var e = qa(t);
  if (e == zn || e == Bn)
    return !t.size;
  if (ge(t))
    return !Oa(t).length;
  for (var r in t)
    if (Gn.call(t, r))
      return !1;
  return !0;
}
const Nn = "graphics-document document";
function Xn(t, e) {
  t.attr("role", Nn), X(e) || t.attr("aria-roledescription", e);
}
function Hn(t, e, r, a) {
  if (t.insert !== void 0)
    if (e || r) {
      if (r) {
        const n = "chart-desc-" + a;
        t.attr("aria-describedby", n), t.insert("desc", ":first-child").attr("id", n).text(r);
      }
      if (e) {
        const n = "chart-title-" + a;
        t.attr("aria-labelledby", n), t.insert("title", ":first-child").attr("id", n).text(e);
      }
    } else
      return;
}
const ve = [
  "graph",
  "flowchart",
  "flowchart-v2",
  "flowchart-elk",
  "stateDiagram",
  "stateDiagram-v2"
], Yn = 5e4, qn = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", Kn = "sandbox", Wn = "loose", Jn = "http://www.w3.org/2000/svg", Qn = "http://www.w3.org/1999/xlink", Zn = "http://www.w3.org/1999/xhtml", ts = "100%", es = "100%", rs = "border:0;margin:0;", as = "margin:0", ns = "allow-top-navigation-by-user-activation allow-popups", ss = 'The "iframe" tag is not supported by your browser.', os = ["foreignobject"], cs = ["dominant-baseline"];
async function is(t, e) {
  ht();
  try {
    (await gt(t)).parse();
  } catch (r) {
    if (e != null && e.suppressErrors)
      return !1;
    throw r;
  }
  return !0;
}
const ls = function(t) {
  let e = t;
  return e = e.replace(/style.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), e = e.replace(/classDef.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), e = e.replace(/#\w+;/g, function(r) {
    const a = r.substring(1, r.length - 1);
    return /^\+?\d+$/.test(a) ? "ﬂ°°" + a + "¶ß" : "ﬂ°" + a + "¶ß";
  }), e;
}, ds = function(t) {
  let e = t;
  return e = e.replace(/ﬂ°°/g, "&#"), e = e.replace(/ﬂ°/g, "&"), e = e.replace(/¶ß/g, ";"), e;
}, Ot = (t, e, r = []) => `
.${t} ${e} { ${r.join(" !important; ")} !important; }`, us = (t, e, r = {}) => {
  var n;
  let a = "";
  if (t.themeCSS !== void 0 && (a += `
${t.themeCSS}`), t.fontFamily !== void 0 && (a += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (a += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !X(r) && ve.includes(e)) {
    const y = t.htmlLabels || ((n = t.flowchart) == null ? void 0 : n.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const b in r) {
      const c = r[b];
      X(c.styles) || y.forEach((d) => {
        a += Ot(c.id, d, c.styles);
      }), X(c.textStyles) || (a += Ot(c.id, "tspan", c.textStyles));
    }
  }
  return a;
}, ms = (t, e, r, a) => {
  const n = us(t, e, r), s = Ge(e, n, t.themeVariables);
  return ct(rr(`${a}{${s}}`), nr);
}, fs = (t = "", e, r) => {
  let a = t;
  return !r && !e && (a = a.replace(/marker-end="url\(.*?#/g, 'marker-end="url(#')), a = ds(a), a = a.replace(/<br>/g, "<br/>"), a;
}, ps = (t = "", e) => {
  const r = e ? e.viewBox.baseVal.height + "px" : es, a = btoa('<body style="' + as + '">' + t + "</body>");
  return `<iframe style="width:${ts};height:${r};${rs}" src="data:text/html;base64,${a}" sandbox="${ns}">
  ${ss}
</iframe>`;
}, Vt = (t, e, r, a, n) => {
  const s = t.append("div");
  s.attr("id", r), a && s.attr("style", a);
  const o = s.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", Jn);
  return n && o.attr("xmlns:xlink", n), o.append("g"), t;
};
function Pt(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const hs = (t, e, r, a) => {
  var n, s, o;
  (n = t.getElementById(e)) == null || n.remove(), (s = t.getElementById(r)) == null || s.remove(), (o = t.getElementById(a)) == null || o.remove();
}, gs = async function(t, e, r) {
  var bt, wt, $t, vt;
  ht(), H();
  const a = Be.detectInit(e);
  a && (Ue(a), xe(a));
  const n = R();
  M.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? Yn) && (e = qn), e = e.replace(/\r\n?/g, `
`), e = e.replace(
    /<(\w+)([^>]*)>/g,
    (v, De, Ae) => "<" + De + Ae.replace(/="([^"]*)"/g, "='$1'") + ">"
  );
  const s = "#" + t, o = "i" + t, f = "#" + o, y = "d" + t, b = "#" + y;
  let c = A("body");
  const d = n.securityLevel === Kn, E = n.securityLevel === Wn, j = n.fontFamily;
  if (r !== void 0) {
    if (r && (r.innerHTML = ""), d) {
      const v = Pt(A(r), o);
      c = A(v.nodes()[0].contentDocument.body), c.node().style.margin = 0;
    } else
      c = A(r);
    Vt(c, t, y, `font-family: ${j}`, Qn);
  } else {
    if (hs(document, t, y, o), d) {
      const v = Pt(A("body"), o);
      c = A(v.nodes()[0].contentDocument.body), c.node().style.margin = 0;
    } else
      c = A("body");
    Vt(c, t, y);
  }
  e = ls(e);
  let u, h;
  try {
    u = await gt(e);
  } catch (v) {
    u = new he("error"), h = v;
  }
  const L = c.select(b).node(), g = u.type, p = L.firstChild, S = p.firstChild, F = ve.includes(g) ? u.renderer.getClasses(e, u) : {}, D = ms(
    n,
    g,
    // @ts-ignore convert renderer to TS.
    F,
    s
  ), w = document.createElement("style");
  w.innerHTML = D, p.insertBefore(w, S);
  try {
    await u.renderer.draw(e, t, At, u);
  } catch (v) {
    throw ue.draw(e, t, At, v), v;
  }
  const l = c.select(`${b} svg`), Te = (wt = (bt = u.db).getAccTitle) == null ? void 0 : wt.call(bt), Se = (vt = ($t = u.db).getAccDescription) == null ? void 0 : vt.call($t);
  bs(g, l, Te, Se), c.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", Zn);
  let C = c.select(b).node().innerHTML;
  if (M.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), C = fs(C, d, Ce(n.arrowMarkerAbsolute)), d) {
    const v = c.select(b + " svg").node();
    C = ps(C, v);
  } else
    E || (C = Ie.sanitize(C, {
      ADD_TAGS: os,
      ADD_ATTR: cs
    }));
  if (Ia(), h)
    throw h;
  const Q = A(d ? f : b).node();
  return Q && "remove" in Q && Q.remove(), {
    svg: C,
    bindFunctions: u.db.bindFunctions
  };
};
function ys(t = {}) {
  var r;
  t != null && t.fontFamily && !((r = t.themeVariables) != null && r.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), Me(t), t != null && t.theme && t.theme in Z ? t.themeVariables = Z[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = Z.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? ke(t) : zt();
  Bt(e.logLevel), ht();
}
function bs(t, e, r, a) {
  Xn(e, t), Hn(e, r, a, e.attr("id"));
}
const Ss = Object.freeze({
  render: gs,
  parse: is,
  parseDirective: ze,
  getDiagramFromText: gt,
  initialize: ys,
  getConfig: R,
  setConfig: Ee,
  getSiteConfig: zt,
  updateSiteConfig: je,
  reset: () => {
    H();
  },
  globalReset: () => {
    H(Tt);
  },
  defaultConfig: Tt
});
Bt(R().logLevel);
H(R());
export {
  ut as S,
  en as a,
  an as b,
  Za as c,
  ln as d,
  Pn as e,
  Oa as f,
  ge as g,
  qa as h,
  yt as i,
  _n as j,
  be as k,
  X as l,
  Ss as m,
  _t as n,
  ka as o,
  ds as p,
  Ts as q
};
//# sourceMappingURL=mermaidAPI-b39e5b34.js.map
