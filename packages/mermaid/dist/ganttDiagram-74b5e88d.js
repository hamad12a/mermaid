import { s as ur, u as lr, v as fr } from "./utils-865f90f3.js";
import { E as kn, F as vn, R as Tn, G as xn, H as hr, I as dr, J as ve, K as Xe, L as Ge, M as mr, N as se, O as gr, P as oe, W as yr, Y as pr, Q as kr, g as xt, q as vr, v as Tr, y as xr, z as br, x as Mr, w as wr, T as rt, A as Dr, l as Te, h as Ht, f as Cr } from "./commonDb-ee617a3e.js";
import { m as Sr } from "./mermaidAPI-b39e5b34.js";
import { i as bn } from "./init-f9637058.js";
function Zt(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function _r(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ue(t) {
  let e, n, r;
  t.length !== 2 ? (e = Zt, n = (c, f) => Zt(t(c), f), r = (c, f) => t(c) - f) : (e = t === Zt || t === _r ? t : Fr, n = t, r = t);
  function i(c, f, h = 0, p = c.length) {
    if (h < p) {
      if (e(f, f) !== 0)
        return p;
      do {
        const k = h + p >>> 1;
        n(c[k], f) < 0 ? h = k + 1 : p = k;
      } while (h < p);
    }
    return h;
  }
  function a(c, f, h = 0, p = c.length) {
    if (h < p) {
      if (e(f, f) !== 0)
        return p;
      do {
        const k = h + p >>> 1;
        n(c[k], f) <= 0 ? h = k + 1 : p = k;
      } while (h < p);
    }
    return h;
  }
  function s(c, f, h = 0, p = c.length) {
    const k = i(c, f, h, p - 1);
    return k > h && r(c[k - 1], f) > -r(c[k], f) ? k - 1 : k;
  }
  return { left: i, center: s, right: a };
}
function Fr() {
  return 0;
}
function Ar(t) {
  return t === null ? NaN : +t;
}
const Yr = Ue(Zt), Ur = Yr.right;
Ue(Ar).center;
const Lr = Ur;
var xe = Math.sqrt(50), be = Math.sqrt(10), Me = Math.sqrt(2);
function Er(t, e, n) {
  var r, i = -1, a, s, c;
  if (e = +e, t = +t, n = +n, t === e && n > 0)
    return [t];
  if ((r = e < t) && (a = t, t = e, e = a), (c = Mn(t, e, n)) === 0 || !isFinite(c))
    return [];
  if (c > 0) {
    let f = Math.round(t / c), h = Math.round(e / c);
    for (f * c < t && ++f, h * c > e && --h, s = new Array(a = h - f + 1); ++i < a; )
      s[i] = (f + i) * c;
  } else {
    c = -c;
    let f = Math.round(t * c), h = Math.round(e * c);
    for (f / c < t && ++f, h / c > e && --h, s = new Array(a = h - f + 1); ++i < a; )
      s[i] = (f + i) / c;
  }
  return r && s.reverse(), s;
}
function Mn(t, e, n) {
  var r = (e - t) / Math.max(0, n), i = Math.floor(Math.log(r) / Math.LN10), a = r / Math.pow(10, i);
  return i >= 0 ? (a >= xe ? 10 : a >= be ? 5 : a >= Me ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (a >= xe ? 10 : a >= be ? 5 : a >= Me ? 2 : 1);
}
function we(t, e, n) {
  var r = Math.abs(e - t) / Math.max(0, n), i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)), a = r / i;
  return a >= xe ? i *= 10 : a >= be ? i *= 5 : a >= Me && (i *= 2), e < t ? -i : i;
}
function Ir(t, e) {
  let n;
  if (e === void 0)
    for (const r of t)
      r != null && (n < r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let i of t)
      (i = e(i, ++r, t)) != null && (n < i || n === void 0 && i >= i) && (n = i);
  }
  return n;
}
function Nr(t, e) {
  let n;
  if (e === void 0)
    for (const r of t)
      r != null && (n > r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let i of t)
      (i = e(i, ++r, t)) != null && (n > i || n === void 0 && i >= i) && (n = i);
  }
  return n;
}
function Wr(t) {
  return t;
}
var jt = 1, ce = 2, De = 3, Vt = 4, $e = 1e-6;
function zr(t) {
  return "translate(" + t + ",0)";
}
function Or(t) {
  return "translate(0," + t + ")";
}
function Pr(t) {
  return (e) => +t(e);
}
function Hr(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function Vr() {
  return !this.__axis;
}
function wn(t, e) {
  var n = [], r = null, i = null, a = 6, s = 6, c = 3, f = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, h = t === jt || t === Vt ? -1 : 1, p = t === Vt || t === ce ? "x" : "y", k = t === jt || t === De ? zr : Or;
  function v(x) {
    var _ = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), C = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : Wr), P = Math.max(a, 0) + c, H = e.range(), B = +H[0] + f, O = +H[H.length - 1] + f, V = (e.bandwidth ? Hr : Pr)(e.copy(), f), N = x.selection ? x.selection() : x, D = N.selectAll(".domain").data([null]), W = N.selectAll(".tick").data(_, e).order(), w = W.exit(), d = W.enter().append("g").attr("class", "tick"), y = W.select("line"), u = W.select("text");
    D = D.merge(D.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), W = W.merge(d), y = y.merge(d.append("line").attr("stroke", "currentColor").attr(p + "2", h * a)), u = u.merge(d.append("text").attr("fill", "currentColor").attr(p, h * P).attr("dy", t === jt ? "0em" : t === De ? "0.71em" : "0.32em")), x !== N && (D = D.transition(x), W = W.transition(x), y = y.transition(x), u = u.transition(x), w = w.transition(x).attr("opacity", $e).attr("transform", function(l) {
      return isFinite(l = V(l)) ? k(l + f) : this.getAttribute("transform");
    }), d.attr("opacity", $e).attr("transform", function(l) {
      var M = this.parentNode.__axis;
      return k((M && isFinite(M = M(l)) ? M : V(l)) + f);
    })), w.remove(), D.attr("d", t === Vt || t === ce ? s ? "M" + h * s + "," + B + "H" + f + "V" + O + "H" + h * s : "M" + f + "," + B + "V" + O : s ? "M" + B + "," + h * s + "V" + f + "H" + O + "V" + h * s : "M" + B + "," + f + "H" + O), W.attr("opacity", 1).attr("transform", function(l) {
      return k(V(l) + f);
    }), y.attr(p + "2", h * a), u.attr(p, h * P).text(C), N.filter(Vr).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ce ? "start" : t === Vt ? "end" : "middle"), N.each(function() {
      this.__axis = V;
    });
  }
  return v.scale = function(x) {
    return arguments.length ? (e = x, v) : e;
  }, v.ticks = function() {
    return n = Array.from(arguments), v;
  }, v.tickArguments = function(x) {
    return arguments.length ? (n = x == null ? [] : Array.from(x), v) : n.slice();
  }, v.tickValues = function(x) {
    return arguments.length ? (r = x == null ? null : Array.from(x), v) : r && r.slice();
  }, v.tickFormat = function(x) {
    return arguments.length ? (i = x, v) : i;
  }, v.tickSize = function(x) {
    return arguments.length ? (a = s = +x, v) : a;
  }, v.tickSizeInner = function(x) {
    return arguments.length ? (a = +x, v) : a;
  }, v.tickSizeOuter = function(x) {
    return arguments.length ? (s = +x, v) : s;
  }, v.tickPadding = function(x) {
    return arguments.length ? (c = +x, v) : c;
  }, v.offset = function(x) {
    return arguments.length ? (f = +x, v) : f;
  }, v;
}
function Rr(t) {
  return wn(jt, t);
}
function Br(t) {
  return wn(De, t);
}
const Zr = Math.PI / 180, jr = 180 / Math.PI, Gt = 18, Dn = 0.96422, Cn = 1, Sn = 0.82521, _n = 4 / 29, bt = 6 / 29, Fn = 3 * bt * bt, qr = bt * bt * bt;
function An(t) {
  if (t instanceof ut)
    return new ut(t.l, t.a, t.b, t.opacity);
  if (t instanceof ft)
    return Yn(t);
  t instanceof Tn || (t = hr(t));
  var e = he(t.r), n = he(t.g), r = he(t.b), i = ue((0.2225045 * e + 0.7168786 * n + 0.0606169 * r) / Cn), a, s;
  return e === n && n === r ? a = s = i : (a = ue((0.4360747 * e + 0.3850649 * n + 0.1430804 * r) / Dn), s = ue((0.0139322 * e + 0.0971045 * n + 0.7141733 * r) / Sn)), new ut(116 * i - 16, 500 * (a - i), 200 * (i - s), t.opacity);
}
function Xr(t, e, n, r) {
  return arguments.length === 1 ? An(t) : new ut(t, e, n, r ?? 1);
}
function ut(t, e, n, r) {
  this.l = +t, this.a = +e, this.b = +n, this.opacity = +r;
}
kn(ut, Xr, vn(xn, {
  brighter(t) {
    return new ut(this.l + Gt * (t ?? 1), this.a, this.b, this.opacity);
  },
  darker(t) {
    return new ut(this.l - Gt * (t ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var t = (this.l + 16) / 116, e = isNaN(this.a) ? t : t + this.a / 500, n = isNaN(this.b) ? t : t - this.b / 200;
    return e = Dn * le(e), t = Cn * le(t), n = Sn * le(n), new Tn(
      fe(3.1338561 * e - 1.6168667 * t - 0.4906146 * n),
      fe(-0.9787684 * e + 1.9161415 * t + 0.033454 * n),
      fe(0.0719453 * e - 0.2289914 * t + 1.4052427 * n),
      this.opacity
    );
  }
}));
function ue(t) {
  return t > qr ? Math.pow(t, 1 / 3) : t / Fn + _n;
}
function le(t) {
  return t > bt ? t * t * t : Fn * (t - _n);
}
function fe(t) {
  return 255 * (t <= 31308e-7 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055);
}
function he(t) {
  return (t /= 255) <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function Gr(t) {
  if (t instanceof ft)
    return new ft(t.h, t.c, t.l, t.opacity);
  if (t instanceof ut || (t = An(t)), t.a === 0 && t.b === 0)
    return new ft(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
  var e = Math.atan2(t.b, t.a) * jr;
  return new ft(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity);
}
function Ce(t, e, n, r) {
  return arguments.length === 1 ? Gr(t) : new ft(t, e, n, r ?? 1);
}
function ft(t, e, n, r) {
  this.h = +t, this.c = +e, this.l = +n, this.opacity = +r;
}
function Yn(t) {
  if (isNaN(t.h))
    return new ut(t.l, 0, 0, t.opacity);
  var e = t.h * Zr;
  return new ut(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
}
kn(ft, Ce, vn(xn, {
  brighter(t) {
    return new ft(this.h, this.c, this.l + Gt * (t ?? 1), this.opacity);
  },
  darker(t) {
    return new ft(this.h, this.c, this.l - Gt * (t ?? 1), this.opacity);
  },
  rgb() {
    return Yn(this).rgb();
  }
}));
function $r(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i)
      r[i] = t[i] * (1 - a) + e[i] * a;
    return r;
  };
}
function Qr(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Jr(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), a = new Array(n), s;
  for (s = 0; s < r; ++s)
    i[s] = Le(t[s], e[s]);
  for (; s < n; ++s)
    a[s] = e[s];
  return function(c) {
    for (s = 0; s < r; ++s)
      a[s] = i[s](c);
    return a;
  };
}
function Kr(t, e) {
  var n = new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function ti(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Le(t[i], e[i]) : r[i] = e[i];
  return function(a) {
    for (i in n)
      r[i] = n[i](a);
    return r;
  };
}
function Le(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? dr(e) : (n === "number" ? ve : n === "string" ? (r = Xe(e)) ? (e = r, Ge) : mr : e instanceof Xe ? Ge : e instanceof Date ? Kr : Qr(e) ? $r : Array.isArray(e) ? Jr : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? ti : ve)(t, e);
}
function ei(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
function ni(t) {
  return function(e, n) {
    var r = t((e = Ce(e)).h, (n = Ce(n)).h), i = se(e.c, n.c), a = se(e.l, n.l), s = se(e.opacity, n.opacity);
    return function(c) {
      return e.h = r(c), e.c = i(c), e.l = a(c), e.opacity = s(c), e + "";
    };
  };
}
const ri = ni(gr);
function ii(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function $t(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0)
    return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function wt(t) {
  return t = $t(Math.abs(t)), t ? t[1] : NaN;
}
function ai(t, e) {
  return function(n, r) {
    for (var i = n.length, a = [], s = 0, c = t[0], f = 0; i > 0 && c > 0 && (f + c + 1 > r && (c = Math.max(1, r - f)), a.push(n.substring(i -= c, i + c)), !((f += c + 1) > r)); )
      c = t[s = (s + 1) % t.length];
    return a.reverse().join(e);
  };
}
function si(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var oi = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Qt(t) {
  if (!(e = oi.exec(t)))
    throw new Error("invalid format: " + t);
  var e;
  return new Ee({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
Qt.prototype = Ee.prototype;
function Ee(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Ee.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function ci(t) {
  t:
    for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
      switch (t[n]) {
        case ".":
          r = i = n;
          break;
        case "0":
          r === 0 && (r = n), i = n;
          break;
        default:
          if (!+t[n])
            break t;
          r > 0 && (r = 0);
          break;
      }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var Un;
function ui(t, e) {
  var n = $t(t, e);
  if (!n)
    return t + "";
  var r = n[0], i = n[1], a = i - (Un = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return a === s ? r : a > s ? r + new Array(a - s + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + $t(t, Math.max(0, e + a - 1))[0];
}
function Qe(t, e) {
  var n = $t(t, e);
  if (!n)
    return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Je = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: ii,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Qe(t * 100, e),
  r: Qe,
  s: ui,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function Ke(t) {
  return t;
}
var tn = Array.prototype.map, en = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function li(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? Ke : ai(tn.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", a = t.numerals === void 0 ? Ke : si(tn.call(t.numerals, String)), s = t.percent === void 0 ? "%" : t.percent + "", c = t.minus === void 0 ? "−" : t.minus + "", f = t.nan === void 0 ? "NaN" : t.nan + "";
  function h(k) {
    k = Qt(k);
    var v = k.fill, x = k.align, _ = k.sign, C = k.symbol, P = k.zero, H = k.width, B = k.comma, O = k.precision, V = k.trim, N = k.type;
    N === "n" ? (B = !0, N = "g") : Je[N] || (O === void 0 && (O = 12), V = !0, N = "g"), (P || v === "0" && x === "=") && (P = !0, v = "0", x = "=");
    var D = C === "$" ? n : C === "#" && /[boxX]/.test(N) ? "0" + N.toLowerCase() : "", W = C === "$" ? r : /[%p]/.test(N) ? s : "", w = Je[N], d = /[defgprs%]/.test(N);
    O = O === void 0 ? 6 : /[gprs]/.test(N) ? Math.max(1, Math.min(21, O)) : Math.max(0, Math.min(20, O));
    function y(u) {
      var l = D, M = W, o, E, g;
      if (N === "c")
        M = w(u) + M, u = "";
      else {
        u = +u;
        var Z = u < 0 || 1 / u < 0;
        if (u = isNaN(u) ? f : w(Math.abs(u), O), V && (u = ci(u)), Z && +u == 0 && _ !== "+" && (Z = !1), l = (Z ? _ === "(" ? _ : c : _ === "-" || _ === "(" ? "" : _) + l, M = (N === "s" ? en[8 + Un / 3] : "") + M + (Z && _ === "(" ? ")" : ""), d) {
          for (o = -1, E = u.length; ++o < E; )
            if (g = u.charCodeAt(o), 48 > g || g > 57) {
              M = (g === 46 ? i + u.slice(o + 1) : u.slice(o)) + M, u = u.slice(0, o);
              break;
            }
        }
      }
      B && !P && (u = e(u, 1 / 0));
      var j = l.length + u.length + M.length, tt = j < H ? new Array(H - j + 1).join(v) : "";
      switch (B && P && (u = e(tt + u, tt.length ? H - M.length : 1 / 0), tt = ""), x) {
        case "<":
          u = l + u + M + tt;
          break;
        case "=":
          u = l + tt + u + M;
          break;
        case "^":
          u = tt.slice(0, j = tt.length >> 1) + l + u + M + tt.slice(j);
          break;
        default:
          u = tt + l + u + M;
          break;
      }
      return a(u);
    }
    return y.toString = function() {
      return k + "";
    }, y;
  }
  function p(k, v) {
    var x = h((k = Qt(k), k.type = "f", k)), _ = Math.max(-8, Math.min(8, Math.floor(wt(v) / 3))) * 3, C = Math.pow(10, -_), P = en[8 + _ / 3];
    return function(H) {
      return x(C * H) + P;
    };
  }
  return {
    format: h,
    formatPrefix: p
  };
}
var Rt, Ln, En;
fi({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function fi(t) {
  return Rt = li(t), Ln = Rt.format, En = Rt.formatPrefix, Rt;
}
function hi(t) {
  return Math.max(0, -wt(Math.abs(t)));
}
function di(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(wt(e) / 3))) * 3 - wt(Math.abs(t)));
}
function mi(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, wt(e) - wt(t)) + 1;
}
function gi(t) {
  return function() {
    return t;
  };
}
function yi(t) {
  return +t;
}
var nn = [0, 1];
function Tt(t) {
  return t;
}
function Se(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : gi(isNaN(e) ? NaN : 0.5);
}
function pi(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function ki(t, e, n) {
  var r = t[0], i = t[1], a = e[0], s = e[1];
  return i < r ? (r = Se(i, r), a = n(s, a)) : (r = Se(r, i), a = n(a, s)), function(c) {
    return a(r(c));
  };
}
function vi(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), a = new Array(r), s = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    i[s] = Se(t[s], t[s + 1]), a[s] = n(e[s], e[s + 1]);
  return function(c) {
    var f = Lr(t, c, 1, r) - 1;
    return a[f](i[f](c));
  };
}
function In(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Ti() {
  var t = nn, e = nn, n = Le, r, i, a, s = Tt, c, f, h;
  function p() {
    var v = Math.min(t.length, e.length);
    return s !== Tt && (s = pi(t[0], t[v - 1])), c = v > 2 ? vi : ki, f = h = null, k;
  }
  function k(v) {
    return v == null || isNaN(v = +v) ? a : (f || (f = c(t.map(r), e, n)))(r(s(v)));
  }
  return k.invert = function(v) {
    return s(i((h || (h = c(e, t.map(r), ve)))(v)));
  }, k.domain = function(v) {
    return arguments.length ? (t = Array.from(v, yi), p()) : t.slice();
  }, k.range = function(v) {
    return arguments.length ? (e = Array.from(v), p()) : e.slice();
  }, k.rangeRound = function(v) {
    return e = Array.from(v), n = ei, p();
  }, k.clamp = function(v) {
    return arguments.length ? (s = v ? !0 : Tt, p()) : s !== Tt;
  }, k.interpolate = function(v) {
    return arguments.length ? (n = v, p()) : n;
  }, k.unknown = function(v) {
    return arguments.length ? (a = v, k) : a;
  }, function(v, x) {
    return r = v, i = x, p();
  };
}
function Nn() {
  return Ti()(Tt, Tt);
}
function xi(t, e, n, r) {
  var i = we(t, e, n), a;
  switch (r = Qt(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(a = di(i, s)) && (r.precision = a), En(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(a = mi(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(a = hi(i)) && (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return Ln(r);
}
function bi(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return Er(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return xi(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, a = r.length - 1, s = r[i], c = r[a], f, h, p = 10;
    for (c < s && (h = s, s = c, c = h, h = i, i = a, a = h); p-- > 0; ) {
      if (h = Mn(s, c, n), h === f)
        return r[i] = s, r[a] = c, e(r);
      if (h > 0)
        s = Math.floor(s / h) * h, c = Math.ceil(c / h) * h;
      else if (h < 0)
        s = Math.ceil(s * h) / h, c = Math.floor(c * h) / h;
      else
        break;
      f = h;
    }
    return t;
  }, t;
}
function Wn() {
  var t = Nn();
  return t.copy = function() {
    return In(t, Wn());
  }, bn.apply(t, arguments), bi(t);
}
function Mi(t, e) {
  t = t.slice();
  var n = 0, r = t.length - 1, i = t[n], a = t[r], s;
  return a < i && (s = n, n = r, r = s, s = i, i = a, a = s), t[n] = e.floor(i), t[r] = e.ceil(a), t;
}
var de = new Date(), me = new Date();
function J(t, e, n, r) {
  function i(a) {
    return t(a = arguments.length === 0 ? new Date() : new Date(+a)), a;
  }
  return i.floor = function(a) {
    return t(a = new Date(+a)), a;
  }, i.ceil = function(a) {
    return t(a = new Date(a - 1)), e(a, 1), t(a), a;
  }, i.round = function(a) {
    var s = i(a), c = i.ceil(a);
    return a - s < c - a ? s : c;
  }, i.offset = function(a, s) {
    return e(a = new Date(+a), s == null ? 1 : Math.floor(s)), a;
  }, i.range = function(a, s, c) {
    var f = [], h;
    if (a = i.ceil(a), c = c == null ? 1 : Math.floor(c), !(a < s) || !(c > 0))
      return f;
    do
      f.push(h = new Date(+a)), e(a, c), t(a);
    while (h < a && a < s);
    return f;
  }, i.filter = function(a) {
    return J(function(s) {
      if (s >= s)
        for (; t(s), !a(s); )
          s.setTime(s - 1);
    }, function(s, c) {
      if (s >= s)
        if (c < 0)
          for (; ++c <= 0; )
            for (; e(s, -1), !a(s); )
              ;
        else
          for (; --c >= 0; )
            for (; e(s, 1), !a(s); )
              ;
    });
  }, n && (i.count = function(a, s) {
    return de.setTime(+a), me.setTime(+s), t(de), t(me), Math.floor(n(de, me));
  }, i.every = function(a) {
    return a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(r ? function(s) {
      return r(s) % a === 0;
    } : function(s) {
      return i.count(0, s) % a === 0;
    }) : i;
  }), i;
}
var Jt = J(function() {
}, function(t, e) {
  t.setTime(+t + e);
}, function(t, e) {
  return e - t;
});
Jt.every = function(t) {
  return t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? J(function(e) {
    e.setTime(Math.floor(e / t) * t);
  }, function(e, n) {
    e.setTime(+e + n * t);
  }, function(e, n) {
    return (n - e) / t;
  }) : Jt;
};
const wi = Jt;
Jt.range;
const ht = 1e3, at = ht * 60, dt = at * 60, gt = dt * 24, Ie = gt * 7, rn = gt * 30, ge = gt * 365;
var zn = J(function(t) {
  t.setTime(t - t.getMilliseconds());
}, function(t, e) {
  t.setTime(+t + e * ht);
}, function(t, e) {
  return (e - t) / ht;
}, function(t) {
  return t.getUTCSeconds();
});
const Wt = zn;
zn.range;
var On = J(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * ht);
}, function(t, e) {
  t.setTime(+t + e * at);
}, function(t, e) {
  return (e - t) / at;
}, function(t) {
  return t.getMinutes();
});
const Kt = On;
On.range;
var Pn = J(function(t) {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * ht - t.getMinutes() * at);
}, function(t, e) {
  t.setTime(+t + e * dt);
}, function(t, e) {
  return (e - t) / dt;
}, function(t) {
  return t.getHours();
});
const te = Pn;
Pn.range;
var Hn = J(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * at) / gt,
  (t) => t.getDate() - 1
);
const Dt = Hn;
Hn.range;
function pt(t) {
  return J(function(e) {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setDate(e.getDate() + n * 7);
  }, function(e, n) {
    return (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * at) / Ie;
  });
}
var Ct = pt(0), ee = pt(1), Di = pt(2), Ci = pt(3), St = pt(4), Si = pt(5), _i = pt(6);
Ct.range;
ee.range;
Di.range;
Ci.range;
St.range;
Si.range;
_i.range;
var Vn = J(function(t) {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setMonth(t.getMonth() + e);
}, function(t, e) {
  return e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12;
}, function(t) {
  return t.getMonth();
});
const ne = Vn;
Vn.range;
var Ne = J(function(t) {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, function(t, e) {
  t.setFullYear(t.getFullYear() + e);
}, function(t, e) {
  return e.getFullYear() - t.getFullYear();
}, function(t) {
  return t.getFullYear();
});
Ne.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : J(function(e) {
    e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setFullYear(e.getFullYear() + n * t);
  });
};
const yt = Ne;
Ne.range;
var Rn = J(function(t) {
  t.setUTCSeconds(0, 0);
}, function(t, e) {
  t.setTime(+t + e * at);
}, function(t, e) {
  return (e - t) / at;
}, function(t) {
  return t.getUTCMinutes();
});
const Fi = Rn;
Rn.range;
var Bn = J(function(t) {
  t.setUTCMinutes(0, 0, 0);
}, function(t, e) {
  t.setTime(+t + e * dt);
}, function(t, e) {
  return (e - t) / dt;
}, function(t) {
  return t.getUTCHours();
});
const Ai = Bn;
Bn.range;
var Zn = J(function(t) {
  t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCDate(t.getUTCDate() + e);
}, function(t, e) {
  return (e - t) / gt;
}, function(t) {
  return t.getUTCDate() - 1;
});
const We = Zn;
Zn.range;
function kt(t) {
  return J(function(e) {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, function(e, n) {
    return (n - e) / Ie;
  });
}
var ze = kt(0), re = kt(1), Yi = kt(2), Ui = kt(3), _t = kt(4), Li = kt(5), Ei = kt(6);
ze.range;
re.range;
Yi.range;
Ui.range;
_t.range;
Li.range;
Ei.range;
var jn = J(function(t) {
  t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCMonth(t.getUTCMonth() + e);
}, function(t, e) {
  return e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12;
}, function(t) {
  return t.getUTCMonth();
});
const Ii = jn;
jn.range;
var Oe = J(function(t) {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, function(t, e) {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, function(t, e) {
  return e.getUTCFullYear() - t.getUTCFullYear();
}, function(t) {
  return t.getUTCFullYear();
});
Oe.every = function(t) {
  return !isFinite(t = Math.floor(t)) || !(t > 0) ? null : J(function(e) {
    e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
  }, function(e, n) {
    e.setUTCFullYear(e.getUTCFullYear() + n * t);
  });
};
const Ft = Oe;
Oe.range;
function qn(t, e, n, r, i, a) {
  const s = [
    [Wt, 1, ht],
    [Wt, 5, 5 * ht],
    [Wt, 15, 15 * ht],
    [Wt, 30, 30 * ht],
    [a, 1, at],
    [a, 5, 5 * at],
    [a, 15, 15 * at],
    [a, 30, 30 * at],
    [i, 1, dt],
    [i, 3, 3 * dt],
    [i, 6, 6 * dt],
    [i, 12, 12 * dt],
    [r, 1, gt],
    [r, 2, 2 * gt],
    [n, 1, Ie],
    [e, 1, rn],
    [e, 3, 3 * rn],
    [t, 1, ge]
  ];
  function c(h, p, k) {
    const v = p < h;
    v && ([h, p] = [p, h]);
    const x = k && typeof k.range == "function" ? k : f(h, p, k), _ = x ? x.range(h, +p + 1) : [];
    return v ? _.reverse() : _;
  }
  function f(h, p, k) {
    const v = Math.abs(p - h) / k, x = Ue(([, , P]) => P).right(s, v);
    if (x === s.length)
      return t.every(we(h / ge, p / ge, k));
    if (x === 0)
      return wi.every(Math.max(we(h, p, k), 1));
    const [_, C] = s[v / s[x - 1][2] < s[x][2] / v ? x - 1 : x];
    return _.every(C);
  }
  return [c, f];
}
qn(Ft, Ii, ze, We, Ai, Fi);
const [Ni, Wi] = qn(yt, ne, Ct, Dt, te, Kt);
function ye(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function pe(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Lt(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function zi(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, a = t.days, s = t.shortDays, c = t.months, f = t.shortMonths, h = Et(i), p = It(i), k = Et(a), v = It(a), x = Et(s), _ = It(s), C = Et(c), P = It(c), H = Et(f), B = It(f), O = {
    a: Z,
    A: j,
    b: tt,
    B: T,
    c: null,
    d: ln,
    e: ln,
    f: oa,
    g: pa,
    G: va,
    H: ia,
    I: aa,
    j: sa,
    L: Xn,
    m: ca,
    M: ua,
    p: F,
    q: A,
    Q: dn,
    s: mn,
    S: la,
    u: fa,
    U: ha,
    V: da,
    w: ma,
    W: ga,
    x: null,
    X: null,
    y: ya,
    Y: ka,
    Z: Ta,
    "%": hn
  }, V = {
    a: Y,
    A: I,
    b: q,
    B: R,
    c: null,
    d: fn,
    e: fn,
    f: wa,
    g: Ea,
    G: Na,
    H: xa,
    I: ba,
    j: Ma,
    L: $n,
    m: Da,
    M: Ca,
    p: Ut,
    q: $,
    Q: dn,
    s: mn,
    S: Sa,
    u: _a,
    U: Fa,
    V: Aa,
    w: Ya,
    W: Ua,
    x: null,
    X: null,
    y: La,
    Y: Ia,
    Z: Wa,
    "%": hn
  }, N = {
    a: y,
    A: u,
    b: l,
    B: M,
    c: o,
    d: cn,
    e: cn,
    f: ta,
    g: on,
    G: sn,
    H: un,
    I: un,
    j: $i,
    L: Ki,
    m: Gi,
    M: Qi,
    p: d,
    q: Xi,
    Q: na,
    s: ra,
    S: Ji,
    u: Ri,
    U: Bi,
    V: Zi,
    w: Vi,
    W: ji,
    x: E,
    X: g,
    y: on,
    Y: sn,
    Z: qi,
    "%": ea
  };
  O.x = D(n, O), O.X = D(r, O), O.c = D(e, O), V.x = D(n, V), V.X = D(r, V), V.c = D(e, V);
  function D(b, S) {
    return function(U) {
      var m = [], X = -1, L = 0, et = b.length, Q, st, it;
      for (U instanceof Date || (U = new Date(+U)); ++X < et; )
        b.charCodeAt(X) === 37 && (m.push(b.slice(L, X)), (st = an[Q = b.charAt(++X)]) != null ? Q = b.charAt(++X) : st = Q === "e" ? " " : "0", (it = S[Q]) && (Q = it(U, st)), m.push(Q), L = X + 1);
      return m.push(b.slice(L, X)), m.join("");
    };
  }
  function W(b, S) {
    return function(U) {
      var m = Lt(1900, void 0, 1), X = w(m, b, U += "", 0), L, et;
      if (X != U.length)
        return null;
      if ("Q" in m)
        return new Date(m.Q);
      if ("s" in m)
        return new Date(m.s * 1e3 + ("L" in m ? m.L : 0));
      if (S && !("Z" in m) && (m.Z = 0), "p" in m && (m.H = m.H % 12 + m.p * 12), m.m === void 0 && (m.m = "q" in m ? m.q : 0), "V" in m) {
        if (m.V < 1 || m.V > 53)
          return null;
        "w" in m || (m.w = 1), "Z" in m ? (L = pe(Lt(m.y, 0, 1)), et = L.getUTCDay(), L = et > 4 || et === 0 ? re.ceil(L) : re(L), L = We.offset(L, (m.V - 1) * 7), m.y = L.getUTCFullYear(), m.m = L.getUTCMonth(), m.d = L.getUTCDate() + (m.w + 6) % 7) : (L = ye(Lt(m.y, 0, 1)), et = L.getDay(), L = et > 4 || et === 0 ? ee.ceil(L) : ee(L), L = Dt.offset(L, (m.V - 1) * 7), m.y = L.getFullYear(), m.m = L.getMonth(), m.d = L.getDate() + (m.w + 6) % 7);
      } else
        ("W" in m || "U" in m) && ("w" in m || (m.w = "u" in m ? m.u % 7 : "W" in m ? 1 : 0), et = "Z" in m ? pe(Lt(m.y, 0, 1)).getUTCDay() : ye(Lt(m.y, 0, 1)).getDay(), m.m = 0, m.d = "W" in m ? (m.w + 6) % 7 + m.W * 7 - (et + 5) % 7 : m.w + m.U * 7 - (et + 6) % 7);
      return "Z" in m ? (m.H += m.Z / 100 | 0, m.M += m.Z % 100, pe(m)) : ye(m);
    };
  }
  function w(b, S, U, m) {
    for (var X = 0, L = S.length, et = U.length, Q, st; X < L; ) {
      if (m >= et)
        return -1;
      if (Q = S.charCodeAt(X++), Q === 37) {
        if (Q = S.charAt(X++), st = N[Q in an ? S.charAt(X++) : Q], !st || (m = st(b, U, m)) < 0)
          return -1;
      } else if (Q != U.charCodeAt(m++))
        return -1;
    }
    return m;
  }
  function d(b, S, U) {
    var m = h.exec(S.slice(U));
    return m ? (b.p = p.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function y(b, S, U) {
    var m = x.exec(S.slice(U));
    return m ? (b.w = _.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function u(b, S, U) {
    var m = k.exec(S.slice(U));
    return m ? (b.w = v.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function l(b, S, U) {
    var m = H.exec(S.slice(U));
    return m ? (b.m = B.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function M(b, S, U) {
    var m = C.exec(S.slice(U));
    return m ? (b.m = P.get(m[0].toLowerCase()), U + m[0].length) : -1;
  }
  function o(b, S, U) {
    return w(b, e, S, U);
  }
  function E(b, S, U) {
    return w(b, n, S, U);
  }
  function g(b, S, U) {
    return w(b, r, S, U);
  }
  function Z(b) {
    return s[b.getDay()];
  }
  function j(b) {
    return a[b.getDay()];
  }
  function tt(b) {
    return f[b.getMonth()];
  }
  function T(b) {
    return c[b.getMonth()];
  }
  function F(b) {
    return i[+(b.getHours() >= 12)];
  }
  function A(b) {
    return 1 + ~~(b.getMonth() / 3);
  }
  function Y(b) {
    return s[b.getUTCDay()];
  }
  function I(b) {
    return a[b.getUTCDay()];
  }
  function q(b) {
    return f[b.getUTCMonth()];
  }
  function R(b) {
    return c[b.getUTCMonth()];
  }
  function Ut(b) {
    return i[+(b.getUTCHours() >= 12)];
  }
  function $(b) {
    return 1 + ~~(b.getUTCMonth() / 3);
  }
  return {
    format: function(b) {
      var S = D(b += "", O);
      return S.toString = function() {
        return b;
      }, S;
    },
    parse: function(b) {
      var S = W(b += "", !1);
      return S.toString = function() {
        return b;
      }, S;
    },
    utcFormat: function(b) {
      var S = D(b += "", V);
      return S.toString = function() {
        return b;
      }, S;
    },
    utcParse: function(b) {
      var S = W(b += "", !0);
      return S.toString = function() {
        return b;
      }, S;
    }
  };
}
var an = { "-": "", _: " ", 0: "0" }, K = /^\s*\d+/, Oi = /^%/, Pi = /[\\^$*+?|[\]().{}]/g;
function z(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", a = i.length;
  return r + (a < n ? new Array(n - a + 1).join(e) + i : i);
}
function Hi(t) {
  return t.replace(Pi, "\\$&");
}
function Et(t) {
  return new RegExp("^(?:" + t.map(Hi).join("|") + ")", "i");
}
function It(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Vi(t, e, n) {
  var r = K.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Ri(t, e, n) {
  var r = K.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function Bi(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Zi(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function ji(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function sn(t, e, n) {
  var r = K.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function on(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function qi(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Xi(t, e, n) {
  var r = K.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Gi(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function cn(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function $i(t, e, n) {
  var r = K.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function un(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function Qi(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function Ji(t, e, n) {
  var r = K.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function Ki(t, e, n) {
  var r = K.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function ta(t, e, n) {
  var r = K.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function ea(t, e, n) {
  var r = Oi.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function na(t, e, n) {
  var r = K.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function ra(t, e, n) {
  var r = K.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function ln(t, e) {
  return z(t.getDate(), e, 2);
}
function ia(t, e) {
  return z(t.getHours(), e, 2);
}
function aa(t, e) {
  return z(t.getHours() % 12 || 12, e, 2);
}
function sa(t, e) {
  return z(1 + Dt.count(yt(t), t), e, 3);
}
function Xn(t, e) {
  return z(t.getMilliseconds(), e, 3);
}
function oa(t, e) {
  return Xn(t, e) + "000";
}
function ca(t, e) {
  return z(t.getMonth() + 1, e, 2);
}
function ua(t, e) {
  return z(t.getMinutes(), e, 2);
}
function la(t, e) {
  return z(t.getSeconds(), e, 2);
}
function fa(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function ha(t, e) {
  return z(Ct.count(yt(t) - 1, t), e, 2);
}
function Gn(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? St(t) : St.ceil(t);
}
function da(t, e) {
  return t = Gn(t), z(St.count(yt(t), t) + (yt(t).getDay() === 4), e, 2);
}
function ma(t) {
  return t.getDay();
}
function ga(t, e) {
  return z(ee.count(yt(t) - 1, t), e, 2);
}
function ya(t, e) {
  return z(t.getFullYear() % 100, e, 2);
}
function pa(t, e) {
  return t = Gn(t), z(t.getFullYear() % 100, e, 2);
}
function ka(t, e) {
  return z(t.getFullYear() % 1e4, e, 4);
}
function va(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? St(t) : St.ceil(t), z(t.getFullYear() % 1e4, e, 4);
}
function Ta(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + z(e / 60 | 0, "0", 2) + z(e % 60, "0", 2);
}
function fn(t, e) {
  return z(t.getUTCDate(), e, 2);
}
function xa(t, e) {
  return z(t.getUTCHours(), e, 2);
}
function ba(t, e) {
  return z(t.getUTCHours() % 12 || 12, e, 2);
}
function Ma(t, e) {
  return z(1 + We.count(Ft(t), t), e, 3);
}
function $n(t, e) {
  return z(t.getUTCMilliseconds(), e, 3);
}
function wa(t, e) {
  return $n(t, e) + "000";
}
function Da(t, e) {
  return z(t.getUTCMonth() + 1, e, 2);
}
function Ca(t, e) {
  return z(t.getUTCMinutes(), e, 2);
}
function Sa(t, e) {
  return z(t.getUTCSeconds(), e, 2);
}
function _a(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function Fa(t, e) {
  return z(ze.count(Ft(t) - 1, t), e, 2);
}
function Qn(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? _t(t) : _t.ceil(t);
}
function Aa(t, e) {
  return t = Qn(t), z(_t.count(Ft(t), t) + (Ft(t).getUTCDay() === 4), e, 2);
}
function Ya(t) {
  return t.getUTCDay();
}
function Ua(t, e) {
  return z(re.count(Ft(t) - 1, t), e, 2);
}
function La(t, e) {
  return z(t.getUTCFullYear() % 100, e, 2);
}
function Ea(t, e) {
  return t = Qn(t), z(t.getUTCFullYear() % 100, e, 2);
}
function Ia(t, e) {
  return z(t.getUTCFullYear() % 1e4, e, 4);
}
function Na(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? _t(t) : _t.ceil(t), z(t.getUTCFullYear() % 1e4, e, 4);
}
function Wa() {
  return "+0000";
}
function hn() {
  return "%";
}
function dn(t) {
  return +t;
}
function mn(t) {
  return Math.floor(+t / 1e3);
}
var vt, ie;
za({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function za(t) {
  return vt = zi(t), ie = vt.format, vt.parse, vt.utcFormat, vt.utcParse, vt;
}
function Oa(t) {
  return new Date(t);
}
function Pa(t) {
  return t instanceof Date ? +t : +new Date(+t);
}
function Jn(t, e, n, r, i, a, s, c, f, h) {
  var p = Nn(), k = p.invert, v = p.domain, x = h(".%L"), _ = h(":%S"), C = h("%I:%M"), P = h("%I %p"), H = h("%a %d"), B = h("%b %d"), O = h("%B"), V = h("%Y");
  function N(D) {
    return (f(D) < D ? x : c(D) < D ? _ : s(D) < D ? C : a(D) < D ? P : r(D) < D ? i(D) < D ? H : B : n(D) < D ? O : V)(D);
  }
  return p.invert = function(D) {
    return new Date(k(D));
  }, p.domain = function(D) {
    return arguments.length ? v(Array.from(D, Pa)) : v().map(Oa);
  }, p.ticks = function(D) {
    var W = v();
    return t(W[0], W[W.length - 1], D ?? 10);
  }, p.tickFormat = function(D, W) {
    return W == null ? N : h(W);
  }, p.nice = function(D) {
    var W = v();
    return (!D || typeof D.range != "function") && (D = e(W[0], W[W.length - 1], D ?? 10)), D ? v(Mi(W, D)) : p;
  }, p.copy = function() {
    return In(p, Jn(t, e, n, r, i, a, s, c, f, h));
  }, p;
}
function Ha() {
  return bn.apply(Jn(Ni, Wi, yt, ne, Ct, Dt, te, Kt, Wt, ie).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var _e = function() {
  var t = function(w, d, y, u) {
    for (y = y || {}, u = w.length; u--; y[w[u]] = d)
      ;
    return y;
  }, e = [1, 3], n = [1, 5], r = [7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], i = [1, 15], a = [1, 16], s = [1, 17], c = [1, 18], f = [1, 19], h = [1, 20], p = [1, 21], k = [1, 22], v = [1, 23], x = [1, 24], _ = [1, 25], C = [1, 26], P = [1, 27], H = [1, 29], B = [1, 31], O = [1, 34], V = [5, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 26, 28, 35, 40], N = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, directive: 4, gantt: 5, document: 6, EOF: 7, line: 8, SPACE: 9, statement: 10, NL: 11, dateFormat: 12, inclusiveEndDates: 13, topAxis: 14, axisFormat: 15, tickInterval: 16, excludes: 17, includes: 18, todayMarker: 19, title: 20, acc_title: 21, acc_title_value: 22, acc_descr: 23, acc_descr_value: 24, acc_descr_multiline_value: 25, section: 26, clickStatement: 27, taskTxt: 28, taskData: 29, openDirective: 30, typeDirective: 31, closeDirective: 32, ":": 33, argDirective: 34, click: 35, callbackname: 36, callbackargs: 37, href: 38, clickStatementDebug: 39, open_directive: 40, type_directive: 41, arg_directive: 42, close_directive: 43, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 5: "gantt", 7: "EOF", 9: "SPACE", 11: "NL", 12: "dateFormat", 13: "inclusiveEndDates", 14: "topAxis", 15: "axisFormat", 16: "tickInterval", 17: "excludes", 18: "includes", 19: "todayMarker", 20: "title", 21: "acc_title", 22: "acc_title_value", 23: "acc_descr", 24: "acc_descr_value", 25: "acc_descr_multiline_value", 26: "section", 28: "taskTxt", 29: "taskData", 33: ":", 35: "click", 36: "callbackname", 37: "callbackargs", 38: "href", 40: "open_directive", 41: "type_directive", 42: "arg_directive", 43: "close_directive" },
    productions_: [0, [3, 2], [3, 3], [6, 0], [6, 2], [8, 2], [8, 1], [8, 1], [8, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [10, 1], [10, 1], [10, 1], [10, 2], [10, 1], [4, 4], [4, 6], [27, 2], [27, 3], [27, 3], [27, 4], [27, 3], [27, 4], [27, 2], [39, 2], [39, 3], [39, 3], [39, 4], [39, 3], [39, 4], [39, 2], [30, 1], [31, 1], [34, 1], [32, 1]],
    performAction: function(d, y, u, l, M, o, E) {
      var g = o.length - 1;
      switch (M) {
        case 2:
          return o[g - 1];
        case 3:
          this.$ = [];
          break;
        case 4:
          o[g - 1].push(o[g]), this.$ = o[g - 1];
          break;
        case 5:
        case 6:
          this.$ = o[g];
          break;
        case 7:
        case 8:
          this.$ = [];
          break;
        case 9:
          l.setDateFormat(o[g].substr(11)), this.$ = o[g].substr(11);
          break;
        case 10:
          l.enableInclusiveEndDates(), this.$ = o[g].substr(18);
          break;
        case 11:
          l.TopAxis(), this.$ = o[g].substr(8);
          break;
        case 12:
          l.setAxisFormat(o[g].substr(11)), this.$ = o[g].substr(11);
          break;
        case 13:
          l.setTickInterval(o[g].substr(13)), this.$ = o[g].substr(13);
          break;
        case 14:
          l.setExcludes(o[g].substr(9)), this.$ = o[g].substr(9);
          break;
        case 15:
          l.setIncludes(o[g].substr(9)), this.$ = o[g].substr(9);
          break;
        case 16:
          l.setTodayMarker(o[g].substr(12)), this.$ = o[g].substr(12);
          break;
        case 17:
          l.setDiagramTitle(o[g].substr(6)), this.$ = o[g].substr(6);
          break;
        case 18:
          this.$ = o[g].trim(), l.setAccTitle(this.$);
          break;
        case 19:
        case 20:
          this.$ = o[g].trim(), l.setAccDescription(this.$);
          break;
        case 21:
          l.addSection(o[g].substr(8)), this.$ = o[g].substr(8);
          break;
        case 23:
          l.addTask(o[g - 1], o[g]), this.$ = "task";
          break;
        case 27:
          this.$ = o[g - 1], l.setClickEvent(o[g - 1], o[g], null);
          break;
        case 28:
          this.$ = o[g - 2], l.setClickEvent(o[g - 2], o[g - 1], o[g]);
          break;
        case 29:
          this.$ = o[g - 2], l.setClickEvent(o[g - 2], o[g - 1], null), l.setLink(o[g - 2], o[g]);
          break;
        case 30:
          this.$ = o[g - 3], l.setClickEvent(o[g - 3], o[g - 2], o[g - 1]), l.setLink(o[g - 3], o[g]);
          break;
        case 31:
          this.$ = o[g - 2], l.setClickEvent(o[g - 2], o[g], null), l.setLink(o[g - 2], o[g - 1]);
          break;
        case 32:
          this.$ = o[g - 3], l.setClickEvent(o[g - 3], o[g - 1], o[g]), l.setLink(o[g - 3], o[g - 2]);
          break;
        case 33:
          this.$ = o[g - 1], l.setLink(o[g - 1], o[g]);
          break;
        case 34:
        case 40:
          this.$ = o[g - 1] + " " + o[g];
          break;
        case 35:
        case 36:
        case 38:
          this.$ = o[g - 2] + " " + o[g - 1] + " " + o[g];
          break;
        case 37:
        case 39:
          this.$ = o[g - 3] + " " + o[g - 2] + " " + o[g - 1] + " " + o[g];
          break;
        case 41:
          l.parseDirective("%%{", "open_directive");
          break;
        case 42:
          l.parseDirective(o[g], "type_directive");
          break;
        case 43:
          o[g] = o[g].trim().replace(/'/g, '"'), l.parseDirective(o[g], "arg_directive");
          break;
        case 44:
          l.parseDirective("}%%", "close_directive", "gantt");
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: e, 30: 4, 40: n }, { 1: [3] }, { 3: 6, 4: 2, 5: e, 30: 4, 40: n }, t(r, [2, 3], { 6: 7 }), { 31: 8, 41: [1, 9] }, { 41: [2, 41] }, { 1: [2, 1] }, { 4: 30, 7: [1, 10], 8: 11, 9: [1, 12], 10: 13, 11: [1, 14], 12: i, 13: a, 14: s, 15: c, 16: f, 17: h, 18: p, 19: k, 20: v, 21: x, 23: _, 25: C, 26: P, 27: 28, 28: H, 30: 4, 35: B, 40: n }, { 32: 32, 33: [1, 33], 43: O }, t([33, 43], [2, 42]), t(r, [2, 8], { 1: [2, 2] }), t(r, [2, 4]), { 4: 30, 10: 35, 12: i, 13: a, 14: s, 15: c, 16: f, 17: h, 18: p, 19: k, 20: v, 21: x, 23: _, 25: C, 26: P, 27: 28, 28: H, 30: 4, 35: B, 40: n }, t(r, [2, 6]), t(r, [2, 7]), t(r, [2, 9]), t(r, [2, 10]), t(r, [2, 11]), t(r, [2, 12]), t(r, [2, 13]), t(r, [2, 14]), t(r, [2, 15]), t(r, [2, 16]), t(r, [2, 17]), { 22: [1, 36] }, { 24: [1, 37] }, t(r, [2, 20]), t(r, [2, 21]), t(r, [2, 22]), { 29: [1, 38] }, t(r, [2, 24]), { 36: [1, 39], 38: [1, 40] }, { 11: [1, 41] }, { 34: 42, 42: [1, 43] }, { 11: [2, 44] }, t(r, [2, 5]), t(r, [2, 18]), t(r, [2, 19]), t(r, [2, 23]), t(r, [2, 27], { 37: [1, 44], 38: [1, 45] }), t(r, [2, 33], { 36: [1, 46] }), t(V, [2, 25]), { 32: 47, 43: O }, { 43: [2, 43] }, t(r, [2, 28], { 38: [1, 48] }), t(r, [2, 29]), t(r, [2, 31], { 37: [1, 49] }), { 11: [1, 50] }, t(r, [2, 30]), t(r, [2, 32]), t(V, [2, 26])],
    defaultActions: { 5: [2, 41], 6: [2, 1], 34: [2, 44], 43: [2, 43] },
    parseError: function(d, y) {
      if (y.recoverable)
        this.trace(d);
      else {
        var u = new Error(d);
        throw u.hash = y, u;
      }
    },
    parse: function(d) {
      var y = this, u = [0], l = [], M = [null], o = [], E = this.table, g = "", Z = 0, j = 0, tt = 2, T = 1, F = o.slice.call(arguments, 1), A = Object.create(this.lexer), Y = { yy: {} };
      for (var I in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, I) && (Y.yy[I] = this.yy[I]);
      A.setInput(d, Y.yy), Y.yy.lexer = A, Y.yy.parser = this, typeof A.yylloc > "u" && (A.yylloc = {});
      var q = A.yylloc;
      o.push(q);
      var R = A.options && A.options.ranges;
      typeof Y.yy.parseError == "function" ? this.parseError = Y.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function Ut() {
        var it;
        return it = l.pop() || A.lex() || T, typeof it != "number" && (it instanceof Array && (l = it, it = l.pop()), it = y.symbols_[it] || it), it;
      }
      for (var $, b, S, U, m = {}, X, L, et, Q; ; ) {
        if (b = u[u.length - 1], this.defaultActions[b] ? S = this.defaultActions[b] : (($ === null || typeof $ > "u") && ($ = Ut()), S = E[b] && E[b][$]), typeof S > "u" || !S.length || !S[0]) {
          var st = "";
          Q = [];
          for (X in E[b])
            this.terminals_[X] && X > tt && Q.push("'" + this.terminals_[X] + "'");
          A.showPosition ? st = "Parse error on line " + (Z + 1) + `:
` + A.showPosition() + `
Expecting ` + Q.join(", ") + ", got '" + (this.terminals_[$] || $) + "'" : st = "Parse error on line " + (Z + 1) + ": Unexpected " + ($ == T ? "end of input" : "'" + (this.terminals_[$] || $) + "'"), this.parseError(st, {
            text: A.match,
            token: this.terminals_[$] || $,
            line: A.yylineno,
            loc: q,
            expected: Q
          });
        }
        if (S[0] instanceof Array && S.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + $);
        switch (S[0]) {
          case 1:
            u.push($), M.push(A.yytext), o.push(A.yylloc), u.push(S[1]), $ = null, j = A.yyleng, g = A.yytext, Z = A.yylineno, q = A.yylloc;
            break;
          case 2:
            if (L = this.productions_[S[1]][1], m.$ = M[M.length - L], m._$ = {
              first_line: o[o.length - (L || 1)].first_line,
              last_line: o[o.length - 1].last_line,
              first_column: o[o.length - (L || 1)].first_column,
              last_column: o[o.length - 1].last_column
            }, R && (m._$.range = [
              o[o.length - (L || 1)].range[0],
              o[o.length - 1].range[1]
            ]), U = this.performAction.apply(m, [
              g,
              j,
              Z,
              Y.yy,
              S[1],
              M,
              o
            ].concat(F)), typeof U < "u")
              return U;
            L && (u = u.slice(0, -1 * L * 2), M = M.slice(0, -1 * L), o = o.slice(0, -1 * L)), u.push(this.productions_[S[1]][0]), M.push(m.$), o.push(m._$), et = E[u[u.length - 2]][u[u.length - 1]], u.push(et);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, D = function() {
    var w = {
      EOF: 1,
      parseError: function(y, u) {
        if (this.yy.parser)
          this.yy.parser.parseError(y, u);
        else
          throw new Error(y);
      },
      // resets the lexer, sets new input
      setInput: function(d, y) {
        return this.yy = y || this.yy || {}, this._input = d, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var d = this._input[0];
        this.yytext += d, this.yyleng++, this.offset++, this.match += d, this.matched += d;
        var y = d.match(/(?:\r\n?|\n).*/g);
        return y ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), d;
      },
      // unshifts one char (or a string) into the input
      unput: function(d) {
        var y = d.length, u = d.split(/(?:\r\n?|\n)/g);
        this._input = d + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - y), this.offset -= y;
        var l = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), u.length - 1 && (this.yylineno -= u.length - 1);
        var M = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: u ? (u.length === l.length ? this.yylloc.first_column : 0) + l[l.length - u.length].length - u[0].length : this.yylloc.first_column - y
        }, this.options.ranges && (this.yylloc.range = [M[0], M[0] + this.yyleng - y]), this.yyleng = this.yytext.length, this;
      },
      // When called from action, caches matched text and appends it on next action
      more: function() {
        return this._more = !0, this;
      },
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function() {
        if (this.options.backtrack_lexer)
          this._backtrack = !0;
        else
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        return this;
      },
      // retain first n characters of the match
      less: function(d) {
        this.unput(this.match.slice(d));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var d = this.matched.substr(0, this.matched.length - this.match.length);
        return (d.length > 20 ? "..." : "") + d.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var d = this.match;
        return d.length < 20 && (d += this._input.substr(0, 20 - d.length)), (d.substr(0, 20) + (d.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var d = this.pastInput(), y = new Array(d.length + 1).join("-");
        return d + this.upcomingInput() + `
` + y + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(d, y) {
        var u, l, M;
        if (this.options.backtrack_lexer && (M = {
          yylineno: this.yylineno,
          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column
          },
          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,
          yy: this.yy,
          conditionStack: this.conditionStack.slice(0),
          done: this.done
        }, this.options.ranges && (M.yylloc.range = this.yylloc.range.slice(0))), l = d[0].match(/(?:\r\n?|\n).*/g), l && (this.yylineno += l.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: l ? l[l.length - 1].length - l[l.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + d[0].length
        }, this.yytext += d[0], this.match += d[0], this.matches = d, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(d[0].length), this.matched += d[0], u = this.performAction.call(this, this.yy, this, y, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), u)
          return u;
        if (this._backtrack) {
          for (var o in M)
            this[o] = M[o];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var d, y, u, l;
        this._more || (this.yytext = "", this.match = "");
        for (var M = this._currentRules(), o = 0; o < M.length; o++)
          if (u = this._input.match(this.rules[M[o]]), u && (!y || u[0].length > y[0].length)) {
            if (y = u, l = o, this.options.backtrack_lexer) {
              if (d = this.test_match(u, M[o]), d !== !1)
                return d;
              if (this._backtrack) {
                y = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return y ? (d = this.test_match(y, M[l]), d !== !1 ? d : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var y = this.next();
        return y || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(y) {
        this.conditionStack.push(y);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var y = this.conditionStack.length - 1;
        return y > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(y) {
        return y = this.conditionStack.length - 1 - Math.abs(y || 0), y >= 0 ? this.conditionStack[y] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(y) {
        this.begin(y);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(y, u, l, M) {
        switch (l) {
          case 0:
            return this.begin("open_directive"), 40;
          case 1:
            return this.begin("type_directive"), 41;
          case 2:
            return this.popState(), this.begin("arg_directive"), 33;
          case 3:
            return this.popState(), this.popState(), 43;
          case 4:
            return 42;
          case 5:
            return this.begin("acc_title"), 21;
          case 6:
            return this.popState(), "acc_title_value";
          case 7:
            return this.begin("acc_descr"), 23;
          case 8:
            return this.popState(), "acc_descr_value";
          case 9:
            this.begin("acc_descr_multiline");
            break;
          case 10:
            this.popState();
            break;
          case 11:
            return "acc_descr_multiline_value";
          case 12:
            break;
          case 13:
            break;
          case 14:
            break;
          case 15:
            return 11;
          case 16:
            break;
          case 17:
            break;
          case 18:
            break;
          case 19:
            this.begin("href");
            break;
          case 20:
            this.popState();
            break;
          case 21:
            return 38;
          case 22:
            this.begin("callbackname");
            break;
          case 23:
            this.popState();
            break;
          case 24:
            this.popState(), this.begin("callbackargs");
            break;
          case 25:
            return 36;
          case 26:
            this.popState();
            break;
          case 27:
            return 37;
          case 28:
            this.begin("click");
            break;
          case 29:
            this.popState();
            break;
          case 30:
            return 35;
          case 31:
            return 5;
          case 32:
            return 12;
          case 33:
            return 13;
          case 34:
            return 14;
          case 35:
            return 15;
          case 36:
            return 16;
          case 37:
            return 18;
          case 38:
            return 17;
          case 39:
            return 19;
          case 40:
            return "date";
          case 41:
            return 20;
          case 42:
            return "accDescription";
          case 43:
            return 26;
          case 44:
            return 28;
          case 45:
            return 29;
          case 46:
            return 33;
          case 47:
            return 7;
          case 48:
            return "INVALID";
        }
      },
      rules: [/^(?:%%\{)/i, /^(?:((?:(?!\}%%)[^:.])*))/i, /^(?::)/i, /^(?:\}%%)/i, /^(?:((?:(?!\}%%).|\n)*))/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:%%(?!\{)*[^\n]*)/i, /^(?:[^\}]%%*[^\n]*)/i, /^(?:%%*[^\n]*[\n]*)/i, /^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:href[\s]+["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:call[\s]+)/i, /^(?:\([\s]*\))/i, /^(?:\()/i, /^(?:[^(]*)/i, /^(?:\))/i, /^(?:[^)]*)/i, /^(?:click[\s]+)/i, /^(?:[\s\n])/i, /^(?:[^\s\n]*)/i, /^(?:gantt\b)/i, /^(?:dateFormat\s[^#\n;]+)/i, /^(?:inclusiveEndDates\b)/i, /^(?:topAxis\b)/i, /^(?:axisFormat\s[^#\n;]+)/i, /^(?:tickInterval\s[^#\n;]+)/i, /^(?:includes\s[^#\n;]+)/i, /^(?:excludes\s[^#\n;]+)/i, /^(?:todayMarker\s[^\n;]+)/i, /^(?:\d\d\d\d-\d\d-\d\d\b)/i, /^(?:title\s[^#\n;]+)/i, /^(?:accDescription\s[^#\n;]+)/i, /^(?:section\s[^#:\n;]+)/i, /^(?:[^#:\n;]+)/i, /^(?::[^#\n;]+)/i, /^(?::)/i, /^(?:$)/i, /^(?:.)/i],
      conditions: { acc_descr_multiline: { rules: [10, 11], inclusive: !1 }, acc_descr: { rules: [8], inclusive: !1 }, acc_title: { rules: [6], inclusive: !1 }, close_directive: { rules: [], inclusive: !1 }, arg_directive: { rules: [3, 4], inclusive: !1 }, type_directive: { rules: [2, 3], inclusive: !1 }, open_directive: { rules: [1], inclusive: !1 }, callbackargs: { rules: [26, 27], inclusive: !1 }, callbackname: { rules: [23, 24, 25], inclusive: !1 }, href: { rules: [20, 21], inclusive: !1 }, click: { rules: [29, 30], inclusive: !1 }, INITIAL: { rules: [0, 5, 7, 9, 12, 13, 14, 15, 16, 17, 18, 19, 22, 28, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], inclusive: !0 } }
    };
    return w;
  }();
  N.lexer = D;
  function W() {
    this.yy = {};
  }
  return W.prototype = N, N.Parser = W, new W();
}();
_e.parser = _e;
const Va = _e;
var Ra = "isoweek";
const Ba = function(t, e, n) {
  var r = function(f, h) {
    var p = (h ? n.utc : n)().year(f).startOf(pr), k = 4 - p.isoWeekday();
    return p.isoWeekday() > 4 && (k += 7), p.add(k, oe);
  }, i = function(f) {
    return f.add(4 - f.isoWeekday(), oe);
  }, a = e.prototype;
  a.isoWeekYear = function() {
    var c = i(this);
    return c.year();
  }, a.isoWeek = function(c) {
    if (!this.$utils().u(c))
      return this.add((c - this.isoWeek()) * 7, oe);
    var f = i(this), h = r(this.isoWeekYear(), this.$u);
    return f.diff(h, yr) + 1;
  }, a.isoWeekday = function(c) {
    return this.$utils().u(c) ? this.day() || 7 : this.day(this.day() % 7 ? c : c - 7);
  };
  var s = a.startOf;
  a.startOf = function(c, f) {
    var h = this.$utils(), p = h.u(f) ? !0 : f, k = h.p(c);
    return k === Ra ? p ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : s.bind(this)(c, f);
  };
};
var Za = function(e) {
  return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(n, r, i) {
    return r || i.slice(1);
  });
}, ja = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
}, qa = function(e, n) {
  return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(r, i, a) {
    var s = a && a.toUpperCase();
    return i || n[a] || ja[a] || Za(n[s]);
  });
}, Xa = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, Ga = /\d/, Bt = /\d\d/, $a = /\d{3}/, Qa = /\d{4}/, ot = /\d\d?/, Ja = /[+-]?\d+/, Ka = /[+-]\d\d:?(\d\d)?|Z/, Nt = /\d*[^-_:/,()\s\d]+/, mt = {}, Kn = function(e) {
  return e = +e, e + (e > 68 ? 1900 : 2e3);
};
function ts(t) {
  if (!t || t === "Z")
    return 0;
  var e = t.match(/([+-]|\d\d)/g), n = +(e[1] * 60) + (+e[2] || 0);
  return n === 0 ? 0 : e[0] === "+" ? -n : n;
}
var nt = function(e) {
  return function(n) {
    this[e] = +n;
  };
}, gn = [Ka, function(t) {
  var e = this.zone || (this.zone = {});
  e.offset = ts(t);
}], ke = function(e) {
  var n = mt[e];
  return n && (n.indexOf ? n : n.s.concat(n.f));
}, yn = function(e, n) {
  var r, i = mt, a = i.meridiem;
  if (!a)
    r = e === (n ? "pm" : "PM");
  else
    for (var s = 1; s <= 24; s += 1)
      if (e.indexOf(a(s, 0, n)) > -1) {
        r = s > 12;
        break;
      }
  return r;
}, es = {
  A: [Nt, function(t) {
    this.afternoon = yn(t, !1);
  }],
  a: [Nt, function(t) {
    this.afternoon = yn(t, !0);
  }],
  S: [Ga, function(t) {
    this.milliseconds = +t * 100;
  }],
  SS: [Bt, function(t) {
    this.milliseconds = +t * 10;
  }],
  SSS: [$a, function(t) {
    this.milliseconds = +t;
  }],
  s: [ot, nt("seconds")],
  ss: [ot, nt("seconds")],
  m: [ot, nt("minutes")],
  mm: [ot, nt("minutes")],
  H: [ot, nt("hours")],
  h: [ot, nt("hours")],
  HH: [ot, nt("hours")],
  hh: [ot, nt("hours")],
  D: [ot, nt("day")],
  DD: [Bt, nt("day")],
  Do: [Nt, function(t) {
    var e = mt, n = e.ordinal, r = t.match(/\d+/);
    if (this.day = r[0], !!n)
      for (var i = 1; i <= 31; i += 1)
        n(i).replace(/\[|\]/g, "") === t && (this.day = i);
  }],
  M: [ot, nt("month")],
  MM: [Bt, nt("month")],
  MMM: [Nt, function(t) {
    var e = ke("months"), n = ke("monthsShort"), r = (n || e.map(function(i) {
      return i.slice(0, 3);
    })).indexOf(t) + 1;
    if (r < 1)
      throw new Error();
    this.month = r % 12 || r;
  }],
  MMMM: [Nt, function(t) {
    var e = ke("months"), n = e.indexOf(t) + 1;
    if (n < 1)
      throw new Error();
    this.month = n % 12 || n;
  }],
  Y: [Ja, nt("year")],
  YY: [Bt, function(t) {
    this.year = Kn(t);
  }],
  YYYY: [Qa, nt("year")],
  Z: gn,
  ZZ: gn
};
function ns(t) {
  var e = t.afternoon;
  if (e !== void 0) {
    var n = t.hours;
    e ? n < 12 && (t.hours += 12) : n === 12 && (t.hours = 0), delete t.afternoon;
  }
}
function rs(t) {
  t = qa(t, mt && mt.formats);
  for (var e = t.match(Xa), n = e.length, r = 0; r < n; r += 1) {
    var i = e[r], a = es[i], s = a && a[0], c = a && a[1];
    c ? e[r] = {
      regex: s,
      parser: c
    } : e[r] = i.replace(/^\[|\]$/g, "");
  }
  return function(f) {
    for (var h = {}, p = 0, k = 0; p < n; p += 1) {
      var v = e[p];
      if (typeof v == "string")
        k += v.length;
      else {
        var x = v.regex, _ = v.parser, C = f.slice(k), P = x.exec(C), H = P[0];
        _.call(h, H), f = f.replace(H, "");
      }
    }
    return ns(h), h;
  };
}
var is = function(e, n, r) {
  try {
    if (["x", "X"].indexOf(n) > -1)
      return new Date((n === "X" ? 1e3 : 1) * e);
    var i = rs(n), a = i(e), s = a.year, c = a.month, f = a.day, h = a.hours, p = a.minutes, k = a.seconds, v = a.milliseconds, x = a.zone, _ = new Date(), C = f || (!s && !c ? _.getDate() : 1), P = s || _.getFullYear(), H = 0;
    s && !c || (H = c > 0 ? c - 1 : _.getMonth());
    var B = h || 0, O = p || 0, V = k || 0, N = v || 0;
    return x ? new Date(Date.UTC(P, H, C, B, O, V, N + x.offset * 60 * 1e3)) : r ? new Date(Date.UTC(P, H, C, B, O, V, N)) : new Date(P, H, C, B, O, V, N);
  } catch {
    return new Date("");
  }
};
const as = function(t, e, n) {
  n.p.customParseFormat = !0, t && t.parseTwoDigitYear && (Kn = t.parseTwoDigitYear);
  var r = e.prototype, i = r.parse;
  r.parse = function(a) {
    var s = a.date, c = a.utc, f = a.args;
    this.$u = c;
    var h = f[1];
    if (typeof h == "string") {
      var p = f[2] === !0, k = f[3] === !0, v = p || k, x = f[2];
      k && (x = f[2]), mt = this.$locale(), !p && x && (mt = n.Ls[x]), this.$d = is(s, h, c), this.init(), x && x !== !0 && (this.$L = this.locale(x).$L), v && s != this.format(h) && (this.$d = new Date("")), mt = {};
    } else if (h instanceof Array)
      for (var _ = h.length, C = 1; C <= _; C += 1) {
        f[1] = h[C - 1];
        var P = n.apply(this, f);
        if (P.isValid()) {
          this.$d = P.$d, this.$L = P.$L, this.init();
          break;
        }
        C === _ && (this.$d = new Date(""));
      }
    else
      i.call(this, a);
  };
}, ss = function(t, e) {
  var n = e.prototype, r = n.format;
  n.format = function(i) {
    var a = this, s = this.$locale();
    if (!this.isValid())
      return r.bind(this)(i);
    var c = this.$utils(), f = i || kr, h = f.replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(p) {
      switch (p) {
        case "Q":
          return Math.ceil((a.$M + 1) / 3);
        case "Do":
          return s.ordinal(a.$D);
        case "gggg":
          return a.weekYear();
        case "GGGG":
          return a.isoWeekYear();
        case "wo":
          return s.ordinal(a.week(), "W");
        case "w":
        case "ww":
          return c.s(a.week(), p === "w" ? 1 : 2, "0");
        case "W":
        case "WW":
          return c.s(a.isoWeek(), p === "W" ? 1 : 2, "0");
        case "k":
        case "kk":
          return c.s(String(a.$H === 0 ? 24 : a.$H), p === "k" ? 1 : 2, "0");
        case "X":
          return Math.floor(a.$d.getTime() / 1e3);
        case "x":
          return a.$d.getTime();
        case "z":
          return "[" + a.offsetName() + "]";
        case "zzz":
          return "[" + a.offsetName("long") + "]";
        default:
          return p;
      }
    });
    return r.bind(this)(h);
  };
};
rt.extend(Ba);
rt.extend(as);
rt.extend(ss);
let ct = "", Pe = "", He, Ve = "", zt = [], Ot = [], Re = {}, Be = [], ae = [], At = "", Ze = "";
const tr = ["active", "done", "crit", "milestone"];
let je = [], Pt = !1, qe = !1, Fe = 0;
const os = function(t, e, n) {
  Sr.parseDirective(this, t, e, n);
}, cs = function() {
  Be = [], ae = [], At = "", je = [], qt = 0, Ye = void 0, Xt = void 0, G = [], ct = "", Pe = "", Ze = "", He = void 0, Ve = "", zt = [], Ot = [], Pt = !1, qe = !1, Fe = 0, Re = {}, Dr();
}, us = function(t) {
  Pe = t;
}, ls = function() {
  return Pe;
}, fs = function(t) {
  He = t;
}, hs = function() {
  return He;
}, ds = function(t) {
  Ve = t;
}, ms = function() {
  return Ve;
}, gs = function(t) {
  ct = t;
}, ys = function() {
  Pt = !0;
}, ps = function() {
  return Pt;
}, ks = function() {
  qe = !0;
}, vs = function() {
  return qe;
}, Ts = function(t) {
  Ze = t;
}, xs = function() {
  return Ze;
}, bs = function() {
  return ct;
}, Ms = function(t) {
  zt = t.toLowerCase().split(/[\s,]+/);
}, ws = function() {
  return zt;
}, Ds = function(t) {
  Ot = t.toLowerCase().split(/[\s,]+/);
}, Cs = function() {
  return Ot;
}, Ss = function() {
  return Re;
}, _s = function(t) {
  At = t, Be.push(t);
}, Fs = function() {
  return Be;
}, As = function() {
  let t = pn();
  const e = 10;
  let n = 0;
  for (; !t && n < e; )
    t = pn(), n++;
  return ae = G, ae;
}, er = function(t, e, n, r) {
  return r.includes(t.format(e.trim())) ? !1 : t.isoWeekday() >= 6 && n.includes("weekends") || n.includes(t.format("dddd").toLowerCase()) ? !0 : n.includes(t.format(e.trim()));
}, nr = function(t, e, n, r) {
  if (!n.length || t.manualEndTime)
    return;
  let i;
  t.startTime instanceof Date ? i = rt(t.startTime) : i = rt(t.startTime, e, !0), i = i.add(1, "d");
  let a;
  t.endTime instanceof Date ? a = rt(t.endTime) : a = rt(t.endTime, e, !0);
  const [s, c] = Ys(
    i,
    a,
    e,
    n,
    r
  );
  t.endTime = s.toDate(), t.renderEndTime = c;
}, Ys = function(t, e, n, r, i) {
  let a = !1, s = null;
  for (; t <= e; )
    a || (s = e.toDate()), a = er(t, n, r, i), a && (e = e.add(1, "d")), t = t.add(1, "d");
  return [e, s];
}, Ae = function(t, e, n) {
  n = n.trim();
  const i = /^after\s+([\d\w- ]+)/.exec(n.trim());
  if (i !== null) {
    let s = null;
    if (i[1].split(" ").forEach(function(c) {
      let f = Yt(c);
      f !== void 0 && (s ? f.endTime > s.endTime && (s = f) : s = f);
    }), s)
      return s.endTime;
    {
      const c = new Date();
      return c.setHours(0, 0, 0, 0), c;
    }
  }
  let a = rt(n, e.trim(), !0);
  if (a.isValid())
    return a.toDate();
  {
    Te.debug("Invalid date:" + n), Te.debug("With date format:" + e.trim());
    const s = new Date(n);
    if (s === void 0 || isNaN(s.getTime()))
      throw new Error("Invalid date:" + n);
    return s;
  }
}, rr = function(t) {
  const e = /^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());
  return e !== null ? [Number.parseFloat(e[1]), e[2]] : [NaN, "ms"];
}, ir = function(t, e, n, r = !1) {
  n = n.trim();
  let i = rt(n, e.trim(), !0);
  if (i.isValid())
    return r && (i = i.add(1, "d")), i.toDate();
  let a = rt(t);
  const [s, c] = rr(n);
  if (!Number.isNaN(s)) {
    const f = a.add(s, c);
    f.isValid() && (a = f);
  }
  return a.toDate();
};
let qt = 0;
const Mt = function(t) {
  return t === void 0 ? (qt = qt + 1, "task" + qt) : t;
}, Us = function(t, e) {
  let n;
  e.substr(0, 1) === ":" ? n = e.substr(1, e.length) : n = e;
  const r = n.split(","), i = {};
  cr(r, i, tr);
  for (let s = 0; s < r.length; s++)
    r[s] = r[s].trim();
  let a = "";
  switch (r.length) {
    case 1:
      i.id = Mt(), i.startTime = t.endTime, a = r[0];
      break;
    case 2:
      i.id = Mt(), i.startTime = Ae(void 0, ct, r[0]), a = r[1];
      break;
    case 3:
      i.id = Mt(r[0]), i.startTime = Ae(void 0, ct, r[1]), a = r[2];
      break;
  }
  return a && (i.endTime = ir(i.startTime, ct, a, Pt), i.manualEndTime = rt(a, "YYYY-MM-DD", !0).isValid(), nr(i, ct, Ot, zt)), i;
}, Ls = function(t, e) {
  let n;
  e.substr(0, 1) === ":" ? n = e.substr(1, e.length) : n = e;
  const r = n.split(","), i = {};
  cr(r, i, tr);
  for (let a = 0; a < r.length; a++)
    r[a] = r[a].trim();
  switch (r.length) {
    case 1:
      i.id = Mt(), i.startTime = {
        type: "prevTaskEnd",
        id: t
      }, i.endTime = {
        data: r[0]
      };
      break;
    case 2:
      i.id = Mt(), i.startTime = {
        type: "getStartDate",
        startData: r[0]
      }, i.endTime = {
        data: r[1]
      };
      break;
    case 3:
      i.id = Mt(r[0]), i.startTime = {
        type: "getStartDate",
        startData: r[1]
      }, i.endTime = {
        data: r[2]
      };
      break;
  }
  return i;
};
let Ye, Xt, G = [];
const ar = {}, Es = function(t, e) {
  const n = {
    section: At,
    type: At,
    processed: !1,
    manualEndTime: !1,
    renderEndTime: null,
    raw: { data: e },
    task: t,
    classes: []
  }, r = Ls(Xt, e);
  n.raw.startTime = r.startTime, n.raw.endTime = r.endTime, n.id = r.id, n.prevTaskId = Xt, n.active = r.active, n.done = r.done, n.crit = r.crit, n.milestone = r.milestone, n.order = Fe, Fe++;
  const i = G.push(n);
  Xt = n.id, ar[n.id] = i - 1;
}, Yt = function(t) {
  const e = ar[t];
  return G[e];
}, Is = function(t, e) {
  const n = {
    section: At,
    type: At,
    description: t,
    task: t,
    classes: []
  }, r = Us(Ye, e);
  n.startTime = r.startTime, n.endTime = r.endTime, n.id = r.id, n.active = r.active, n.done = r.done, n.crit = r.crit, n.milestone = r.milestone, Ye = n, ae.push(n);
}, pn = function() {
  const t = function(n) {
    const r = G[n];
    let i = "";
    switch (G[n].raw.startTime.type) {
      case "prevTaskEnd": {
        const a = Yt(r.prevTaskId);
        r.startTime = a.endTime;
        break;
      }
      case "getStartDate":
        i = Ae(void 0, ct, G[n].raw.startTime.startData), i && (G[n].startTime = i);
        break;
    }
    return G[n].startTime && (G[n].endTime = ir(
      G[n].startTime,
      ct,
      G[n].raw.endTime.data,
      Pt
    ), G[n].endTime && (G[n].processed = !0, G[n].manualEndTime = rt(
      G[n].raw.endTime.data,
      "YYYY-MM-DD",
      !0
    ).isValid(), nr(G[n], ct, Ot, zt))), G[n].processed;
  };
  let e = !0;
  for (const [n, r] of G.entries())
    t(n), e = e && r.processed;
  return e;
}, Ns = function(t, e) {
  let n = e;
  xt().securityLevel !== "loose" && (n = ur(e)), t.split(",").forEach(function(r) {
    Yt(r) !== void 0 && (or(r, () => {
      window.open(n, "_self");
    }), Re[r] = n);
  }), sr(t, "clickable");
}, sr = function(t, e) {
  t.split(",").forEach(function(n) {
    let r = Yt(n);
    r !== void 0 && r.classes.push(e);
  });
}, Ws = function(t, e, n) {
  if (xt().securityLevel !== "loose" || e === void 0)
    return;
  let r = [];
  if (typeof n == "string") {
    r = n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let a = 0; a < r.length; a++) {
      let s = r[a].trim();
      s.charAt(0) === '"' && s.charAt(s.length - 1) === '"' && (s = s.substr(1, s.length - 2)), r[a] = s;
    }
  }
  r.length === 0 && r.push(t), Yt(t) !== void 0 && or(t, () => {
    lr.runFunc(e, ...r);
  });
}, or = function(t, e) {
  je.push(
    function() {
      const n = document.querySelector(`[id="${t}"]`);
      n !== null && n.addEventListener("click", function() {
        e();
      });
    },
    function() {
      const n = document.querySelector(`[id="${t}-text"]`);
      n !== null && n.addEventListener("click", function() {
        e();
      });
    }
  );
}, zs = function(t, e, n) {
  t.split(",").forEach(function(r) {
    Ws(r, e, n);
  }), sr(t, "clickable");
}, Os = function(t) {
  je.forEach(function(e) {
    e(t);
  });
}, Ps = {
  parseDirective: os,
  getConfig: () => xt().gantt,
  clear: cs,
  setDateFormat: gs,
  getDateFormat: bs,
  enableInclusiveEndDates: ys,
  endDatesAreInclusive: ps,
  enableTopAxis: ks,
  topAxisEnabled: vs,
  setAxisFormat: us,
  getAxisFormat: ls,
  setTickInterval: fs,
  getTickInterval: hs,
  setTodayMarker: ds,
  getTodayMarker: ms,
  setAccTitle: vr,
  getAccTitle: Tr,
  setDiagramTitle: xr,
  getDiagramTitle: br,
  setDisplayMode: Ts,
  getDisplayMode: xs,
  setAccDescription: Mr,
  getAccDescription: wr,
  addSection: _s,
  getSections: Fs,
  getTasks: As,
  addTask: Es,
  findTaskById: Yt,
  addTaskOrg: Is,
  setIncludes: Ms,
  getIncludes: ws,
  setExcludes: Ds,
  getExcludes: Cs,
  setClickEvent: zs,
  setLink: Ns,
  getLinks: Ss,
  bindFunctions: Os,
  parseDuration: rr,
  isInvalidDate: er
};
function cr(t, e, n) {
  let r = !0;
  for (; r; )
    r = !1, n.forEach(function(i) {
      const a = "^\\s*" + i + "\\s*$", s = new RegExp(a);
      t[0].match(s) && (e[i] = !0, t.shift(1), r = !0);
    });
}
const Hs = function() {
  Te.debug("Something is calling, setConf, remove the call");
}, Vs = (t, e) => {
  let n = [...t].map(() => -1 / 0), r = [...t].sort((a, s) => a.startTime - s.startTime || a.order - s.order), i = 0;
  for (const a of r)
    for (let s = 0; s < n.length; s++)
      if (a.startTime >= n[s]) {
        n[s] = a.endTime, a.order = s + e, s > i && (i = s);
        break;
      }
  return i;
};
let lt;
const Rs = function(t, e, n, r) {
  const i = xt().gantt, a = xt().securityLevel;
  let s;
  a === "sandbox" && (s = Ht("#i" + e));
  const c = a === "sandbox" ? Ht(s.nodes()[0].contentDocument.body) : Ht("body"), f = a === "sandbox" ? s.nodes()[0].contentDocument : document, h = f.getElementById(e);
  lt = h.parentElement.offsetWidth, lt === void 0 && (lt = 1200), i.useWidth !== void 0 && (lt = i.useWidth);
  const p = r.db.getTasks();
  let k = [];
  for (const w of p)
    k.push(w.type);
  k = W(k);
  const v = {};
  let x = 2 * i.topPadding;
  if (r.db.getDisplayMode() === "compact" || i.displayMode === "compact") {
    const w = {};
    for (const y of p)
      w[y.section] === void 0 ? w[y.section] = [y] : w[y.section].push(y);
    let d = 0;
    for (const y of Object.keys(w)) {
      const u = Vs(w[y], d) + 1;
      d += u, x += u * (i.barHeight + i.barGap), v[y] = u;
    }
  } else {
    x += p.length * (i.barHeight + i.barGap);
    for (const w of k)
      v[w] = p.filter((d) => d.type === w).length;
  }
  h.setAttribute("viewBox", "0 0 " + lt + " " + x);
  const _ = c.select(`[id="${e}"]`), C = Ha().domain([
    Nr(p, function(w) {
      return w.startTime;
    }),
    Ir(p, function(w) {
      return w.endTime;
    })
  ]).rangeRound([0, lt - i.leftPadding - i.rightPadding]);
  function P(w, d) {
    const y = w.startTime, u = d.startTime;
    let l = 0;
    return y > u ? l = 1 : y < u && (l = -1), l;
  }
  p.sort(P), H(p, lt, x), fr(_, x, lt, i.useMaxWidth), _.append("text").text(r.db.getDiagramTitle()).attr("x", lt / 2).attr("y", i.titleTopMargin).attr("class", "titleText");
  function H(w, d, y) {
    const u = i.barHeight, l = u + i.barGap, M = i.topPadding, o = i.leftPadding, E = Wn().domain([0, k.length]).range(["#00B9FA", "#F95002"]).interpolate(ri);
    O(
      l,
      M,
      o,
      d,
      y,
      w,
      r.db.getExcludes(),
      r.db.getIncludes()
    ), V(o, M, d, y), B(w, l, M, o, u, E, d), N(l, M), D(o, M, d, y);
  }
  function B(w, d, y, u, l, M, o) {
    const g = [...new Set(w.map((T) => T.order))].map((T) => w.find((F) => F.order === T));
    _.append("g").selectAll("rect").data(g).enter().append("rect").attr("x", 0).attr("y", function(T, F) {
      return F = T.order, F * d + y - 2;
    }).attr("width", function() {
      return o - i.rightPadding / 2;
    }).attr("height", d).attr("class", function(T) {
      for (const [F, A] of k.entries())
        if (T.type === A)
          return "section section" + F % i.numberSectionStyles;
      return "section section0";
    });
    const Z = _.append("g").selectAll("rect").data(w).enter(), j = r.db.getLinks();
    if (Z.append("rect").attr("id", function(T) {
      return T.id;
    }).attr("rx", 3).attr("ry", 3).attr("x", function(T) {
      return T.milestone ? C(T.startTime) + u + 0.5 * (C(T.endTime) - C(T.startTime)) - 0.5 * l : C(T.startTime) + u;
    }).attr("y", function(T, F) {
      return F = T.order, F * d + y;
    }).attr("width", function(T) {
      return T.milestone ? l : C(T.renderEndTime || T.endTime) - C(T.startTime);
    }).attr("height", l).attr("transform-origin", function(T, F) {
      return F = T.order, (C(T.startTime) + u + 0.5 * (C(T.endTime) - C(T.startTime))).toString() + "px " + (F * d + y + 0.5 * l).toString() + "px";
    }).attr("class", function(T) {
      const F = "task";
      let A = "";
      T.classes.length > 0 && (A = T.classes.join(" "));
      let Y = 0;
      for (const [q, R] of k.entries())
        T.type === R && (Y = q % i.numberSectionStyles);
      let I = "";
      return T.active ? T.crit ? I += " activeCrit" : I = " active" : T.done ? T.crit ? I = " doneCrit" : I = " done" : T.crit && (I += " crit"), I.length === 0 && (I = " task"), T.milestone && (I = " milestone " + I), I += Y, I += " " + A, F + I;
    }), Z.append("text").attr("id", function(T) {
      return T.id + "-text";
    }).text(function(T) {
      return T.task;
    }).attr("font-size", i.fontSize).attr("x", function(T) {
      let F = C(T.startTime), A = C(T.renderEndTime || T.endTime);
      T.milestone && (F += 0.5 * (C(T.endTime) - C(T.startTime)) - 0.5 * l), T.milestone && (A = F + l);
      const Y = this.getBBox().width;
      return Y > A - F ? A + Y + 1.5 * i.leftPadding > o ? F + u - 5 : A + u + 5 : (A - F) / 2 + F + u;
    }).attr("y", function(T, F) {
      return F = T.order, F * d + i.barHeight / 2 + (i.fontSize / 2 - 2) + y;
    }).attr("text-height", l).attr("class", function(T) {
      const F = C(T.startTime);
      let A = C(T.endTime);
      T.milestone && (A = F + l);
      const Y = this.getBBox().width;
      let I = "";
      T.classes.length > 0 && (I = T.classes.join(" "));
      let q = 0;
      for (const [Ut, $] of k.entries())
        T.type === $ && (q = Ut % i.numberSectionStyles);
      let R = "";
      return T.active && (T.crit ? R = "activeCritText" + q : R = "activeText" + q), T.done ? T.crit ? R = R + " doneCritText" + q : R = R + " doneText" + q : T.crit && (R = R + " critText" + q), T.milestone && (R += " milestoneText"), Y > A - F ? A + Y + 1.5 * i.leftPadding > o ? I + " taskTextOutsideLeft taskTextOutside" + q + " " + R : I + " taskTextOutsideRight taskTextOutside" + q + " " + R + " width-" + Y : I + " taskText taskText" + q + " " + R + " width-" + Y;
    }), xt().securityLevel === "sandbox") {
      let T;
      T = Ht("#i" + e);
      const F = T.nodes()[0].contentDocument;
      Z.filter(function(A) {
        return j[A.id] !== void 0;
      }).each(function(A) {
        var Y = F.querySelector("#" + A.id), I = F.querySelector("#" + A.id + "-text");
        const q = Y.parentNode;
        var R = F.createElement("a");
        R.setAttribute("xlink:href", j[A.id]), R.setAttribute("target", "_top"), q.appendChild(R), R.appendChild(Y), R.appendChild(I);
      });
    }
  }
  function O(w, d, y, u, l, M, o, E) {
    const g = M.reduce(
      (Y, { startTime: I }) => Y ? Math.min(Y, I) : I,
      0
    ), Z = M.reduce((Y, { endTime: I }) => Y ? Math.max(Y, I) : I, 0), j = r.db.getDateFormat();
    if (!g || !Z)
      return;
    const tt = [];
    let T = null, F = rt(g);
    for (; F.valueOf() <= Z; )
      r.db.isInvalidDate(F, j, o, E) ? T ? T.end = F : T = {
        start: F,
        end: F
      } : T && (tt.push(T), T = null), F = F.add(1, "d");
    _.append("g").selectAll("rect").data(tt).enter().append("rect").attr("id", function(Y) {
      return "exclude-" + Y.start.format("YYYY-MM-DD");
    }).attr("x", function(Y) {
      return C(Y.start) + y;
    }).attr("y", i.gridLineStartPadding).attr("width", function(Y) {
      const I = Y.end.add(1, "day");
      return C(I) - C(Y.start);
    }).attr("height", l - d - i.gridLineStartPadding).attr("transform-origin", function(Y, I) {
      return (C(Y.start) + y + 0.5 * (C(Y.end) - C(Y.start))).toString() + "px " + (I * w + 0.5 * l).toString() + "px";
    }).attr("class", "exclude-range");
  }
  function V(w, d, y, u) {
    let l = Br(C).tickSize(-u + d + i.gridLineStartPadding).tickFormat(ie(r.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
    const o = /^([1-9]\d*)(minute|hour|day|week|month)$/.exec(
      r.db.getTickInterval() || i.tickInterval
    );
    if (o !== null) {
      const E = o[1];
      switch (o[2]) {
        case "minute":
          l.ticks(Kt.every(E));
          break;
        case "hour":
          l.ticks(te.every(E));
          break;
        case "day":
          l.ticks(Dt.every(E));
          break;
        case "week":
          l.ticks(Ct.every(E));
          break;
        case "month":
          l.ticks(ne.every(E));
          break;
      }
    }
    if (_.append("g").attr("class", "grid").attr("transform", "translate(" + w + ", " + (u - 50) + ")").call(l).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10).attr("dy", "1em"), r.db.topAxisEnabled() || i.topAxis) {
      let E = Rr(C).tickSize(-u + d + i.gridLineStartPadding).tickFormat(ie(r.db.getAxisFormat() || i.axisFormat || "%Y-%m-%d"));
      if (o !== null) {
        const g = o[1];
        switch (o[2]) {
          case "minute":
            E.ticks(Kt.every(g));
            break;
          case "hour":
            E.ticks(te.every(g));
            break;
          case "day":
            E.ticks(Dt.every(g));
            break;
          case "week":
            E.ticks(Ct.every(g));
            break;
          case "month":
            E.ticks(ne.every(g));
            break;
        }
      }
      _.append("g").attr("class", "grid").attr("transform", "translate(" + w + ", " + d + ")").call(E).selectAll("text").style("text-anchor", "middle").attr("fill", "#000").attr("stroke", "none").attr("font-size", 10);
    }
  }
  function N(w, d) {
    let y = 0;
    const u = Object.keys(v).map((l) => [l, v[l]]);
    _.append("g").selectAll("text").data(u).enter().append(function(l) {
      const M = l[0].split(Cr.lineBreakRegex), o = -(M.length - 1) / 2, E = f.createElementNS("http://www.w3.org/2000/svg", "text");
      E.setAttribute("dy", o + "em");
      for (const [g, Z] of M.entries()) {
        const j = f.createElementNS("http://www.w3.org/2000/svg", "tspan");
        j.setAttribute("alignment-baseline", "central"), j.setAttribute("x", "10"), g > 0 && j.setAttribute("dy", "1em"), j.textContent = Z, E.appendChild(j);
      }
      return E;
    }).attr("x", 10).attr("y", function(l, M) {
      if (M > 0)
        for (let o = 0; o < M; o++)
          return y += u[M - 1][1], l[1] * w / 2 + y * w + d;
      else
        return l[1] * w / 2 + d;
    }).attr("font-size", i.sectionFontSize).attr("class", function(l) {
      for (const [M, o] of k.entries())
        if (l[0] === o)
          return "sectionTitle sectionTitle" + M % i.numberSectionStyles;
      return "sectionTitle";
    });
  }
  function D(w, d, y, u) {
    const l = r.db.getTodayMarker();
    if (l === "off")
      return;
    const M = _.append("g").attr("class", "today"), o = new Date(), E = M.append("line");
    E.attr("x1", C(o) + w).attr("x2", C(o) + w).attr("y1", i.titleTopMargin).attr("y2", u - i.titleTopMargin).attr("class", "today"), l !== "" && E.attr("style", l.replace(/,/g, ";"));
  }
  function W(w) {
    const d = {}, y = [];
    for (let u = 0, l = w.length; u < l; ++u)
      Object.prototype.hasOwnProperty.call(d, w[u]) || (d[w[u]] = !0, y.push(w[u]));
    return y;
  }
}, Bs = {
  setConf: Hs,
  draw: Rs
}, Zs = (t) => `
  .mermaid-main-font {
    font-family: "trebuchet ms", verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    // text-height: 14px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
    text {
      font-family: ${t.fontFamily};
      fill: ${t.textColor};
    }
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }

  // .taskText:not([font-size]) {
  //   font-size: ${t.ganttFontSize};
  // }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
    // font-size: ${t.ganttFontSize};
  }

  /* Special case clickable */
  .task.clickable {
    cursor: pointer;
  }
  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor}    ;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
`, js = Zs, Qs = {
  parser: Va,
  db: Ps,
  renderer: Bs,
  styles: js
};
export {
  Qs as diagram
};
//# sourceMappingURL=ganttDiagram-74b5e88d.js.map
