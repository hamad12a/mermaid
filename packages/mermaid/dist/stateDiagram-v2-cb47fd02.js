import { D as H, a as Q, S as X, b as Z, c as F, p as j, d as B, s as I } from "./styles-6c181577.js";
import { G as tt } from "./layout-2c1637bb.js";
import { l, g, h as $, f as w } from "./commonDb-ee617a3e.js";
import { r as et } from "./index-fd07e60c.js";
import { u as ot, v as st } from "./utils-865f90f3.js";
import "./mermaidAPI-b39e5b34.js";
import "./edges-c128583f.js";
import "./createText-2d261cdb.js";
import "./svgDraw-87bd21cf.js";
import "./line-a504cab0.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
const A = "rect", C = "rectWithTitle", nt = "start", ct = "end", it = "divider", rt = "roundedWithTitle", lt = "note", at = "noteGroup", u = "statediagram", dt = "state", Et = `${u}-${dt}`, U = "transition", St = "note", Tt = "note-edge", pt = `${U} ${Tt}`, ut = `${u}-${St}`, _t = "cluster", ft = `${u}-${_t}`, Dt = "cluster-alt", bt = `${u}-${Dt}`, V = "parent", Y = "note", ht = "state", N = "----", At = `${N}${Y}`, M = `${N}${V}`, W = "fill:none", m = "fill: #333", z = "c", q = "text", K = "normal";
let y = {}, E = 0;
const yt = function(t) {
  const n = Object.keys(t);
  for (const e of n)
    t[e];
}, gt = function(t, n) {
  l.trace("Extracting classes"), n.db.clear();
  try {
    return n.parser.parse(t), n.db.extract(n.db.getRootDocV2()), n.db.getClasses();
  } catch (e) {
    return e;
  }
};
function xt(t) {
  return t == null ? "" : t.classes ? t.classes.join(" ") : "";
}
function R(t = "", n = 0, e = "", c = N) {
  const i = e !== null && e.length > 0 ? `${c}${e}` : "";
  return `${ht}-${t}${i}-${n}`;
}
const h = (t, n, e, c, i, r) => {
  const o = e.id, _ = xt(c[o]);
  if (o !== "root") {
    let T = A;
    e.start === !0 && (T = nt), e.start === !1 && (T = ct), e.type !== H && (T = e.type), y[o] || (y[o] = {
      id: o,
      shape: T,
      description: w.sanitizeText(o, g()),
      classes: `${_} ${Et}`
    });
    const s = y[o];
    e.description && (Array.isArray(s.description) ? (s.shape = C, s.description.push(e.description)) : s.description.length > 0 ? (s.shape = C, s.description === o ? s.description = [e.description] : s.description = [s.description, e.description]) : (s.shape = A, s.description = e.description), s.description = w.sanitizeTextOrArray(s.description, g())), s.description.length === 1 && s.shape === C && (s.shape = A), !s.type && e.doc && (l.info("Setting cluster for ", o, G(e)), s.type = "group", s.dir = G(e), s.shape = e.type === Q ? it : rt, s.classes = s.classes + " " + ft + " " + (r ? bt : ""));
    const p = {
      labelStyle: "",
      shape: s.shape,
      labelText: s.description,
      // typeof newNode.description === 'object'
      //   ? newNode.description[0]
      //   : newNode.description,
      classes: s.classes,
      style: "",
      //styles.style,
      id: o,
      dir: s.dir,
      domId: R(o, E),
      type: s.type,
      padding: 15
      //getConfig().flowchart.padding
    };
    if (p.centerLabel = !0, e.note) {
      const a = {
        labelStyle: "",
        shape: lt,
        labelText: e.note.text,
        classes: ut,
        // useHtmlLabels: false,
        style: "",
        // styles.style,
        id: o + At + "-" + E,
        domId: R(o, E, Y),
        type: s.type,
        padding: 15
        //getConfig().flowchart.padding
      }, d = {
        labelStyle: "",
        shape: at,
        labelText: e.note.text,
        classes: s.classes,
        style: "",
        // styles.style,
        id: o + M,
        domId: R(o, E, V),
        type: "group",
        padding: 0
        //getConfig().flowchart.padding
      };
      E++;
      const f = o + M;
      t.setNode(f, d), t.setNode(a.id, a), t.setNode(o, p), t.setParent(o, f), t.setParent(a.id, f);
      let S = o, D = a.id;
      e.note.position === "left of" && (S = a.id, D = o), t.setEdge(S, D, {
        arrowhead: "none",
        arrowType: "",
        style: W,
        labelStyle: "",
        classes: pt,
        arrowheadStyle: m,
        labelpos: z,
        labelType: q,
        thickness: K
      });
    } else
      t.setNode(o, p);
  }
  n && n.id !== "root" && (l.trace("Setting node ", o, " to be child of its parent ", n.id), t.setParent(o, n.id)), e.doc && (l.trace("Adding nodes children "), $t(t, e, e.doc, c, i, !r));
}, $t = (t, n, e, c, i, r) => {
  l.trace("items", e), e.forEach((o) => {
    switch (o.stmt) {
      case Z:
        h(t, n, o, c, i, r);
        break;
      case H:
        h(t, n, o, c, i, r);
        break;
      case X:
        {
          h(t, n, o.state1, c, i, r), h(t, n, o.state2, c, i, r);
          const _ = {
            id: "edge" + E,
            arrowhead: "normal",
            arrowTypeEnd: "arrow_barb",
            style: W,
            labelStyle: "",
            label: w.sanitizeText(o.description, g()),
            arrowheadStyle: m,
            labelpos: z,
            labelType: q,
            thickness: K,
            classes: U
          };
          t.setEdge(o.state1.id, o.state2.id, _, E), E++;
        }
        break;
    }
  });
}, G = (t, n = F) => {
  let e = n;
  if (t.doc)
    for (let c = 0; c < t.doc.length; c++) {
      const i = t.doc[c];
      i.stmt === "dir" && (e = i.value);
    }
  return e;
}, Ct = async function(t, n, e, c) {
  l.info("Drawing state diagram (v2)", n), y = {}, c.db.getDirection();
  const { securityLevel: i, state: r } = g(), o = r.nodeSpacing || 50, _ = r.rankSpacing || 50;
  l.info(c.db.getRootDocV2()), c.db.extract(c.db.getRootDocV2()), l.info(c.db.getRootDocV2());
  const T = c.db.getStates(), s = new tt({
    multigraph: !0,
    compound: !0
  }).setGraph({
    rankdir: G(c.db.getRootDocV2()),
    nodesep: o,
    ranksep: _,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  });
  h(s, void 0, c.db.getRootDocV2(), T, c.db, !0);
  let p;
  i === "sandbox" && (p = $("#i" + n));
  const a = i === "sandbox" ? $(p.nodes()[0].contentDocument.body) : $("body"), d = a.select(`[id="${n}"]`), f = a.select("#" + n + " g");
  await et(f, s, ["barb"], u, n);
  const S = 8;
  ot.insertTitle(d, "statediagramTitleText", r.titleTopMargin, c.db.getDiagramTitle());
  const D = d.node().getBBox(), L = D.width + S * 2, P = D.height + S * 2;
  d.attr("class", u);
  const k = d.node().getBBox();
  st(d, P, L, r.useMaxWidth);
  const O = `${k.x - S} ${k.y - S} ${L} ${P}`;
  l.debug(`viewBox ${O}`), d.attr("viewBox", O);
  const J = document.querySelectorAll('[id="' + n + '"] .edgeLabel .label');
  for (const x of J) {
    const v = x.getBBox(), b = document.createElementNS("http://www.w3.org/2000/svg", A);
    b.setAttribute("rx", 0), b.setAttribute("ry", 0), b.setAttribute("width", v.width), b.setAttribute("height", v.height), x.insertBefore(b, x.firstChild);
  }
}, Rt = {
  setConf: yt,
  getClasses: gt,
  draw: Ct
}, Vt = {
  parser: j,
  db: B,
  renderer: Rt,
  styles: I,
  init: (t) => {
    t.state || (t.state = {}), t.state.arrowMarkerAbsolute = t.arrowMarkerAbsolute, B.clear();
  }
};
export {
  Vt as diagram
};
//# sourceMappingURL=stateDiagram-v2-cb47fd02.js.map
