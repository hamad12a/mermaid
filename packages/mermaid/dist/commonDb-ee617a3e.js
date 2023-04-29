var Gr = 60, Vr = Gr * 60, Yr = Vr * 24, an = Yr * 7, Ht = 1e3, gi = Gr * Ht, yr = Vr * Ht, ln = Yr * Ht, hn = an * Ht, Ni = "millisecond", Nt = "second", $t = "minute", Rt = "hour", Ct = "day", ke = "week", it = "month", Xr = "quarter", yt = "year", zt = "date", cn = "YYYY-MM-DDTHH:mm:ssZ", br = "Invalid Date", un = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, fn = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const dn = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(e) {
    var i = ["th", "st", "nd", "rd"], r = e % 100;
    return "[" + e + (i[(r - 20) % 10] || i[r] || i[0]) + "]";
  }
};
var ki = function(e, i, r) {
  var o = String(e);
  return !o || o.length >= i ? e : "" + Array(i + 1 - o.length).join(r) + e;
}, gn = function(e) {
  var i = -e.utcOffset(), r = Math.abs(i), o = Math.floor(r / 60), n = r % 60;
  return (i <= 0 ? "+" : "-") + ki(o, 2, "0") + ":" + ki(n, 2, "0");
}, pn = function t(e, i) {
  if (e.date() < i.date())
    return -t(i, e);
  var r = (i.year() - e.year()) * 12 + (i.month() - e.month()), o = e.clone().add(r, it), n = i - o < 0, s = e.clone().add(r + (n ? -1 : 1), it);
  return +(-(r + (i - o) / (n ? o - s : s - o)) || 0);
}, mn = function(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}, Cn = function(e) {
  var i = {
    M: it,
    y: yt,
    w: ke,
    d: Ct,
    D: zt,
    h: Rt,
    m: $t,
    s: Nt,
    ms: Ni,
    Q: Xr
  };
  return i[e] || String(e || "").toLowerCase().replace(/s$/, "");
}, yn = function(e) {
  return e === void 0;
};
const bn = {
  s: ki,
  z: gn,
  m: pn,
  a: mn,
  p: Cn,
  u: yn
};
var te = "en", Bt = {};
Bt[te] = dn;
var $i = function(e) {
  return e instanceof Pe;
}, Me = function t(e, i, r) {
  var o;
  if (!e)
    return te;
  if (typeof e == "string") {
    var n = e.toLowerCase();
    Bt[n] && (o = n), i && (Bt[n] = i, o = n);
    var s = e.split("-");
    if (!o && s.length > 1)
      return t(s[0]);
  } else {
    var a = e.name;
    Bt[a] = e, o = a;
  }
  return !r && o && (te = o), o || !r && te;
}, $ = function(e, i) {
  if ($i(e))
    return e.clone();
  var r = typeof i == "object" ? i : {};
  return r.date = e, r.args = arguments, new Pe(r);
}, _n = function(e, i) {
  return $(e, {
    locale: i.$L,
    utc: i.$u,
    x: i.$x,
    $offset: i.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, L = bn;
L.l = Me;
L.i = $i;
L.w = _n;
var xn = function(e) {
  var i = e.date, r = e.utc;
  if (i === null)
    return new Date(NaN);
  if (L.u(i))
    return new Date();
  if (i instanceof Date)
    return new Date(i);
  if (typeof i == "string" && !/Z$/i.test(i)) {
    var o = i.match(un);
    if (o) {
      var n = o[2] - 1 || 0, s = (o[7] || "0").substring(0, 3);
      return r ? new Date(Date.UTC(o[1], n, o[3] || 1, o[4] || 0, o[5] || 0, o[6] || 0, s)) : new Date(o[1], n, o[3] || 1, o[4] || 0, o[5] || 0, o[6] || 0, s);
    }
  }
  return new Date(i);
}, Pe = /* @__PURE__ */ function() {
  function t(i) {
    this.$L = Me(i.locale, null, !0), this.parse(i);
  }
  var e = t.prototype;
  return e.parse = function(r) {
    this.$d = xn(r), this.$x = r.x || {}, this.init();
  }, e.init = function() {
    var r = this.$d;
    this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
  }, e.$utils = function() {
    return L;
  }, e.isValid = function() {
    return this.$d.toString() !== br;
  }, e.isSame = function(r, o) {
    var n = $(r);
    return this.startOf(o) <= n && n <= this.endOf(o);
  }, e.isAfter = function(r, o) {
    return $(r) < this.startOf(o);
  }, e.isBefore = function(r, o) {
    return this.endOf(o) < $(r);
  }, e.$g = function(r, o, n) {
    return L.u(r) ? this[o] : this.set(n, r);
  }, e.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, e.valueOf = function() {
    return this.$d.getTime();
  }, e.startOf = function(r, o) {
    var n = this, s = L.u(o) ? !0 : o, a = L.p(r), h = function(Z, E) {
      var w = L.w(n.$u ? Date.UTC(n.$y, E, Z) : new Date(n.$y, E, Z), n);
      return s ? w : w.endOf(Ct);
    }, c = function(Z, E) {
      var w = [0, 0, 0, 0], F = [23, 59, 59, 999];
      return L.w(n.toDate()[Z].apply(
        // eslint-disable-line prefer-spread
        n.toDate("s"),
        (s ? w : F).slice(E)
      ), n);
    }, u = this.$W, g = this.$M, C = this.$D, y = "set" + (this.$u ? "UTC" : "");
    switch (a) {
      case yt:
        return s ? h(1, 0) : h(31, 11);
      case it:
        return s ? h(1, g) : h(0, g + 1);
      case ke: {
        var S = this.$locale().weekStart || 0, B = (u < S ? u + 7 : u) - S;
        return h(s ? C - B : C + (6 - B), g);
      }
      case Ct:
      case zt:
        return c(y + "Hours", 0);
      case Rt:
        return c(y + "Minutes", 1);
      case $t:
        return c(y + "Seconds", 2);
      case Nt:
        return c(y + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, e.endOf = function(r) {
    return this.startOf(r, !1);
  }, e.$set = function(r, o) {
    var n, s = L.p(r), a = "set" + (this.$u ? "UTC" : ""), h = (n = {}, n[Ct] = a + "Date", n[zt] = a + "Date", n[it] = a + "Month", n[yt] = a + "FullYear", n[Rt] = a + "Hours", n[$t] = a + "Minutes", n[Nt] = a + "Seconds", n[Ni] = a + "Milliseconds", n)[s], c = s === Ct ? this.$D + (o - this.$W) : o;
    if (s === it || s === yt) {
      var u = this.clone().set(zt, 1);
      u.$d[h](c), u.init(), this.$d = u.set(zt, Math.min(this.$D, u.daysInMonth())).$d;
    } else
      h && this.$d[h](c);
    return this.init(), this;
  }, e.set = function(r, o) {
    return this.clone().$set(r, o);
  }, e.get = function(r) {
    return this[L.p(r)]();
  }, e.add = function(r, o) {
    var n = this, s;
    r = Number(r);
    var a = L.p(o), h = function(C) {
      var y = $(n);
      return L.w(y.date(y.date() + Math.round(C * r)), n);
    };
    if (a === it)
      return this.set(it, this.$M + r);
    if (a === yt)
      return this.set(yt, this.$y + r);
    if (a === Ct)
      return h(1);
    if (a === ke)
      return h(7);
    var c = (s = {}, s[$t] = gi, s[Rt] = yr, s[Nt] = Ht, s)[a] || 1, u = this.$d.getTime() + r * c;
    return L.w(u, this);
  }, e.subtract = function(r, o) {
    return this.add(r * -1, o);
  }, e.format = function(r) {
    var o = this, n = this.$locale();
    if (!this.isValid())
      return n.invalidDate || br;
    var s = r || cn, a = L.z(this), h = this.$H, c = this.$m, u = this.$M, g = n.weekdays, C = n.months, y = n.meridiem, S = function(w, F, Q, Ft) {
      return w && (w[F] || w(o, s)) || Q[F].slice(0, Ft);
    }, B = function(w) {
      return L.s(h % 12 || 12, w, "0");
    }, M = y || function(E, w, F) {
      var Q = E < 12 ? "AM" : "PM";
      return F ? Q.toLowerCase() : Q;
    }, Z = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: u + 1,
      MM: L.s(u + 1, 2, "0"),
      MMM: S(n.monthsShort, u, C, 3),
      MMMM: S(C, u),
      D: this.$D,
      DD: L.s(this.$D, 2, "0"),
      d: String(this.$W),
      dd: S(n.weekdaysMin, this.$W, g, 2),
      ddd: S(n.weekdaysShort, this.$W, g, 3),
      dddd: g[this.$W],
      H: String(h),
      HH: L.s(h, 2, "0"),
      h: B(1),
      hh: B(2),
      a: M(h, c, !0),
      A: M(h, c, !1),
      m: String(c),
      mm: L.s(c, 2, "0"),
      s: String(this.$s),
      ss: L.s(this.$s, 2, "0"),
      SSS: L.s(this.$ms, 3, "0"),
      Z: a
      // 'ZZ' logic below
    };
    return s.replace(fn, function(E, w) {
      return w || Z[E] || a.replace(":", "");
    });
  }, e.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, e.diff = function(r, o, n) {
    var s, a = L.p(o), h = $(r), c = (h.utcOffset() - this.utcOffset()) * gi, u = this - h, g = L.m(this, h);
    return g = (s = {}, s[yt] = g / 12, s[it] = g, s[Xr] = g / 3, s[ke] = (u - c) / hn, s[Ct] = (u - c) / ln, s[Rt] = u / yr, s[$t] = u / gi, s[Nt] = u / Ht, s)[a] || u, n ? g : L.a(g);
  }, e.daysInMonth = function() {
    return this.endOf(it).$D;
  }, e.$locale = function() {
    return Bt[this.$L];
  }, e.locale = function(r, o) {
    if (!r)
      return this.$L;
    var n = this.clone(), s = Me(r, o, !0);
    return s && (n.$L = s), n;
  }, e.clone = function() {
    return L.w(this.$d, this);
  }, e.toDate = function() {
    return new Date(this.valueOf());
  }, e.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, e.toISOString = function() {
    return this.$d.toISOString();
  }, e.toString = function() {
    return this.$d.toUTCString();
  }, t;
}(), Kr = Pe.prototype;
$.prototype = Kr;
[["$ms", Ni], ["$s", Nt], ["$m", $t], ["$H", Rt], ["$W", Ct], ["$M", it], ["$y", yt], ["$D", zt]].forEach(function(t) {
  Kr[t[1]] = function(e) {
    return this.$g(e, t[0], t[1]);
  };
});
$.extend = function(t, e) {
  return t.$i || (t(e, Pe, $), t.$i = !0), $;
};
$.locale = Me;
$.isDayjs = $i;
$.unix = function(t) {
  return $(t * 1e3);
};
$.en = Bt[te];
$.Ls = Bt;
$.p = {};
const ft = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
}, G = {
  trace: (...t) => {
  },
  debug: (...t) => {
  },
  info: (...t) => {
  },
  warn: (...t) => {
  },
  error: (...t) => {
  },
  fatal: (...t) => {
  }
}, Qh = function(t = "fatal") {
  let e = ft.fatal;
  typeof t == "string" ? (t = t.toLowerCase(), t in ft && (e = ft[t])) : typeof t == "number" && (e = t), G.trace = () => {
  }, G.debug = () => {
  }, G.info = () => {
  }, G.warn = () => {
  }, G.error = () => {
  }, G.fatal = () => {
  }, e <= ft.fatal && (G.fatal = console.error ? console.error.bind(console, j("FATAL"), "color: orange") : console.log.bind(console, "\x1B[35m", j("FATAL"))), e <= ft.error && (G.error = console.error ? console.error.bind(console, j("ERROR"), "color: orange") : console.log.bind(console, "\x1B[31m", j("ERROR"))), e <= ft.warn && (G.warn = console.warn ? console.warn.bind(console, j("WARN"), "color: orange") : console.log.bind(console, "\x1B[33m", j("WARN"))), e <= ft.info && (G.info = console.info ? console.info.bind(console, j("INFO"), "color: lightblue") : console.log.bind(console, "\x1B[34m", j("INFO"))), e <= ft.debug && (G.debug = console.debug ? console.debug.bind(console, j("DEBUG"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", j("DEBUG"))), e <= ft.trace && (G.trace = console.debug ? console.debug.bind(console, j("TRACE"), "color: lightgreen") : console.log.bind(console, "\x1B[32m", j("TRACE")));
}, j = (t) => `%c${$().format("ss.SSS")} : ${t} : `;
var Tn = { value: () => {
} };
function Zr() {
  for (var t = 0, e = arguments.length, i = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in i || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    i[r] = [];
  }
  return new Se(i);
}
function Se(t) {
  this._ = t;
}
function kn(t, e) {
  return t.trim().split(/^|\s+/).map(function(i) {
    var r = "", o = i.indexOf(".");
    if (o >= 0 && (r = i.slice(o + 1), i = i.slice(0, o)), i && !e.hasOwnProperty(i))
      throw new Error("unknown type: " + i);
    return { type: i, name: r };
  });
}
Se.prototype = Zr.prototype = {
  constructor: Se,
  on: function(t, e) {
    var i = this._, r = kn(t + "", i), o, n = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++n < s; )
        if ((o = (t = r[n]).type) && (o = Sn(i[o], t.name)))
          return o;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++n < s; )
      if (o = (t = r[n]).type)
        i[o] = _r(i[o], t.name, e);
      else if (e == null)
        for (o in i)
          i[o] = _r(i[o], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var i in e)
      t[i] = e[i].slice();
    return new Se(t);
  },
  call: function(t, e) {
    if ((o = arguments.length - 2) > 0)
      for (var i = new Array(o), r = 0, o, n; r < o; ++r)
        i[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (n = this._[t], r = 0, o = n.length; r < o; ++r)
      n[r].value.apply(e, i);
  },
  apply: function(t, e, i) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], o = 0, n = r.length; o < n; ++o)
      r[o].value.apply(e, i);
  }
};
function Sn(t, e) {
  for (var i = 0, r = t.length, o; i < r; ++i)
    if ((o = t[i]).name === e)
      return o.value;
}
function _r(t, e, i) {
  for (var r = 0, o = t.length; r < o; ++r)
    if (t[r].name === e) {
      t[r] = Tn, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return i != null && t.push({ name: e, value: i }), t;
}
var Si = "http://www.w3.org/1999/xhtml";
const xr = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Si,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function He(t) {
  var e = t += "", i = e.indexOf(":");
  return i >= 0 && (e = t.slice(0, i)) !== "xmlns" && (t = t.slice(i + 1)), xr.hasOwnProperty(e) ? { space: xr[e], local: t } : t;
}
function vn(t) {
  return function() {
    var e = this.ownerDocument, i = this.namespaceURI;
    return i === Si && e.documentElement.namespaceURI === Si ? e.createElement(t) : e.createElementNS(i, t);
  };
}
function Bn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function jr(t) {
  var e = He(t);
  return (e.local ? Bn : vn)(e);
}
function Ln() {
}
function Ri(t) {
  return t == null ? Ln : function() {
    return this.querySelector(t);
  };
}
function wn(t) {
  typeof t != "function" && (t = Ri(t));
  for (var e = this._groups, i = e.length, r = new Array(i), o = 0; o < i; ++o)
    for (var n = e[o], s = n.length, a = r[o] = new Array(s), h, c, u = 0; u < s; ++u)
      (h = n[u]) && (c = t.call(h, h.__data__, u, n)) && ("__data__" in h && (c.__data__ = h.__data__), a[u] = c);
  return new K(r, this._parents);
}
function Fn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function En() {
  return [];
}
function Jr(t) {
  return t == null ? En : function() {
    return this.querySelectorAll(t);
  };
}
function An(t) {
  return function() {
    return Fn(t.apply(this, arguments));
  };
}
function Mn(t) {
  typeof t == "function" ? t = An(t) : t = Jr(t);
  for (var e = this._groups, i = e.length, r = [], o = [], n = 0; n < i; ++n)
    for (var s = e[n], a = s.length, h, c = 0; c < a; ++c)
      (h = s[c]) && (r.push(t.call(h, h.__data__, c, s)), o.push(h));
  return new K(r, o);
}
function Qr(t) {
  return function() {
    return this.matches(t);
  };
}
function to(t) {
  return function(e) {
    return e.matches(t);
  };
}
var On = Array.prototype.find;
function In(t) {
  return function() {
    return On.call(this.children, t);
  };
}
function Dn() {
  return this.firstElementChild;
}
function Nn(t) {
  return this.select(t == null ? Dn : In(typeof t == "function" ? t : to(t)));
}
var $n = Array.prototype.filter;
function Rn() {
  return Array.from(this.children);
}
function zn(t) {
  return function() {
    return $n.call(this.children, t);
  };
}
function Wn(t) {
  return this.selectAll(t == null ? Rn : zn(typeof t == "function" ? t : to(t)));
}
function Pn(t) {
  typeof t != "function" && (t = Qr(t));
  for (var e = this._groups, i = e.length, r = new Array(i), o = 0; o < i; ++o)
    for (var n = e[o], s = n.length, a = r[o] = [], h, c = 0; c < s; ++c)
      (h = n[c]) && t.call(h, h.__data__, c, n) && a.push(h);
  return new K(r, this._parents);
}
function eo(t) {
  return new Array(t.length);
}
function Hn() {
  return new K(this._enter || this._groups.map(eo), this._parents);
}
function Oe(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
Oe.prototype = {
  constructor: Oe,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function qn(t) {
  return function() {
    return t;
  };
}
function Un(t, e, i, r, o, n) {
  for (var s = 0, a, h = e.length, c = n.length; s < c; ++s)
    (a = e[s]) ? (a.__data__ = n[s], r[s] = a) : i[s] = new Oe(t, n[s]);
  for (; s < h; ++s)
    (a = e[s]) && (o[s] = a);
}
function Gn(t, e, i, r, o, n, s) {
  var a, h, c = /* @__PURE__ */ new Map(), u = e.length, g = n.length, C = new Array(u), y;
  for (a = 0; a < u; ++a)
    (h = e[a]) && (C[a] = y = s.call(h, h.__data__, a, e) + "", c.has(y) ? o[a] = h : c.set(y, h));
  for (a = 0; a < g; ++a)
    y = s.call(t, n[a], a, n) + "", (h = c.get(y)) ? (r[a] = h, h.__data__ = n[a], c.delete(y)) : i[a] = new Oe(t, n[a]);
  for (a = 0; a < u; ++a)
    (h = e[a]) && c.get(C[a]) === h && (o[a] = h);
}
function Vn(t) {
  return t.__data__;
}
function Yn(t, e) {
  if (!arguments.length)
    return Array.from(this, Vn);
  var i = e ? Gn : Un, r = this._parents, o = this._groups;
  typeof t != "function" && (t = qn(t));
  for (var n = o.length, s = new Array(n), a = new Array(n), h = new Array(n), c = 0; c < n; ++c) {
    var u = r[c], g = o[c], C = g.length, y = Xn(t.call(u, u && u.__data__, c, r)), S = y.length, B = a[c] = new Array(S), M = s[c] = new Array(S), Z = h[c] = new Array(C);
    i(u, g, B, M, Z, y, e);
    for (var E = 0, w = 0, F, Q; E < S; ++E)
      if (F = B[E]) {
        for (E >= w && (w = E + 1); !(Q = M[w]) && ++w < S; )
          ;
        F._next = Q || null;
      }
  }
  return s = new K(s, r), s._enter = a, s._exit = h, s;
}
function Xn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Kn() {
  return new K(this._exit || this._groups.map(eo), this._parents);
}
function Zn(t, e, i) {
  var r = this.enter(), o = this, n = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (o = e(o), o && (o = o.selection())), i == null ? n.remove() : i(n), r && o ? r.merge(o).order() : o;
}
function jn(t) {
  for (var e = t.selection ? t.selection() : t, i = this._groups, r = e._groups, o = i.length, n = r.length, s = Math.min(o, n), a = new Array(o), h = 0; h < s; ++h)
    for (var c = i[h], u = r[h], g = c.length, C = a[h] = new Array(g), y, S = 0; S < g; ++S)
      (y = c[S] || u[S]) && (C[S] = y);
  for (; h < o; ++h)
    a[h] = i[h];
  return new K(a, this._parents);
}
function Jn() {
  for (var t = this._groups, e = -1, i = t.length; ++e < i; )
    for (var r = t[e], o = r.length - 1, n = r[o], s; --o >= 0; )
      (s = r[o]) && (n && s.compareDocumentPosition(n) ^ 4 && n.parentNode.insertBefore(s, n), n = s);
  return this;
}
function Qn(t) {
  t || (t = ts);
  function e(g, C) {
    return g && C ? t(g.__data__, C.__data__) : !g - !C;
  }
  for (var i = this._groups, r = i.length, o = new Array(r), n = 0; n < r; ++n) {
    for (var s = i[n], a = s.length, h = o[n] = new Array(a), c, u = 0; u < a; ++u)
      (c = s[u]) && (h[u] = c);
    h.sort(e);
  }
  return new K(o, this._parents).order();
}
function ts(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function es() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function is() {
  return Array.from(this);
}
function rs() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], o = 0, n = r.length; o < n; ++o) {
      var s = r[o];
      if (s)
        return s;
    }
  return null;
}
function os() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function ns() {
  return !this.node();
}
function ss(t) {
  for (var e = this._groups, i = 0, r = e.length; i < r; ++i)
    for (var o = e[i], n = 0, s = o.length, a; n < s; ++n)
      (a = o[n]) && t.call(a, a.__data__, n, o);
  return this;
}
function as(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ls(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function hs(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function cs(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function us(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttribute(t) : this.setAttribute(t, i);
  };
}
function fs(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, i);
  };
}
function ds(t, e) {
  var i = He(t);
  if (arguments.length < 2) {
    var r = this.node();
    return i.local ? r.getAttributeNS(i.space, i.local) : r.getAttribute(i);
  }
  return this.each((e == null ? i.local ? ls : as : typeof e == "function" ? i.local ? fs : us : i.local ? cs : hs)(i, e));
}
function io(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function gs(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ps(t, e, i) {
  return function() {
    this.style.setProperty(t, e, i);
  };
}
function ms(t, e, i) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, i);
  };
}
function Cs(t, e, i) {
  return arguments.length > 1 ? this.each((e == null ? gs : typeof e == "function" ? ms : ps)(t, e, i ?? "")) : qt(this.node(), t);
}
function qt(t, e) {
  return t.style.getPropertyValue(e) || io(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ys(t) {
  return function() {
    delete this[t];
  };
}
function bs(t, e) {
  return function() {
    this[t] = e;
  };
}
function _s(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    i == null ? delete this[t] : this[t] = i;
  };
}
function xs(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ys : typeof e == "function" ? _s : bs)(t, e)) : this.node()[t];
}
function ro(t) {
  return t.trim().split(/^|\s+/);
}
function zi(t) {
  return t.classList || new oo(t);
}
function oo(t) {
  this._node = t, this._names = ro(t.getAttribute("class") || "");
}
oo.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function no(t, e) {
  for (var i = zi(t), r = -1, o = e.length; ++r < o; )
    i.add(e[r]);
}
function so(t, e) {
  for (var i = zi(t), r = -1, o = e.length; ++r < o; )
    i.remove(e[r]);
}
function Ts(t) {
  return function() {
    no(this, t);
  };
}
function ks(t) {
  return function() {
    so(this, t);
  };
}
function Ss(t, e) {
  return function() {
    (e.apply(this, arguments) ? no : so)(this, t);
  };
}
function vs(t, e) {
  var i = ro(t + "");
  if (arguments.length < 2) {
    for (var r = zi(this.node()), o = -1, n = i.length; ++o < n; )
      if (!r.contains(i[o]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Ss : e ? Ts : ks)(i, e));
}
function Bs() {
  this.textContent = "";
}
function Ls(t) {
  return function() {
    this.textContent = t;
  };
}
function ws(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Fs(t) {
  return arguments.length ? this.each(t == null ? Bs : (typeof t == "function" ? ws : Ls)(t)) : this.node().textContent;
}
function Es() {
  this.innerHTML = "";
}
function As(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ms(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Os(t) {
  return arguments.length ? this.each(t == null ? Es : (typeof t == "function" ? Ms : As)(t)) : this.node().innerHTML;
}
function Is() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ds() {
  return this.each(Is);
}
function Ns() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function $s() {
  return this.each(Ns);
}
function Rs(t) {
  var e = typeof t == "function" ? t : jr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function zs() {
  return null;
}
function Ws(t, e) {
  var i = typeof t == "function" ? t : jr(t), r = e == null ? zs : typeof e == "function" ? e : Ri(e);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Ps() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Hs() {
  return this.each(Ps);
}
function qs() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Us() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Gs(t) {
  return this.select(t ? Us : qs);
}
function Vs(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Ys(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Xs(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var i = "", r = e.indexOf(".");
    return r >= 0 && (i = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: i };
  });
}
function Ks(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var i = 0, r = -1, o = e.length, n; i < o; ++i)
        n = e[i], (!t.type || n.type === t.type) && n.name === t.name ? this.removeEventListener(n.type, n.listener, n.options) : e[++r] = n;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Zs(t, e, i) {
  return function() {
    var r = this.__on, o, n = Ys(e);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((o = r[s]).type === t.type && o.name === t.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = n, o.options = i), o.value = e;
          return;
        }
    }
    this.addEventListener(t.type, n, i), o = { type: t.type, name: t.name, value: e, listener: n, options: i }, r ? r.push(o) : this.__on = [o];
  };
}
function js(t, e, i) {
  var r = Xs(t + ""), o, n = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var h = 0, c = a.length, u; h < c; ++h)
        for (o = 0, u = a[h]; o < n; ++o)
          if ((s = r[o]).type === u.type && s.name === u.name)
            return u.value;
    }
    return;
  }
  for (a = e ? Zs : Ks, o = 0; o < n; ++o)
    this.each(a(r[o], e, i));
  return this;
}
function ao(t, e, i) {
  var r = io(t), o = r.CustomEvent;
  typeof o == "function" ? o = new o(e, i) : (o = r.document.createEvent("Event"), i ? (o.initEvent(e, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(e, !1, !1)), t.dispatchEvent(o);
}
function Js(t, e) {
  return function() {
    return ao(this, t, e);
  };
}
function Qs(t, e) {
  return function() {
    return ao(this, t, e.apply(this, arguments));
  };
}
function ta(t, e) {
  return this.each((typeof e == "function" ? Qs : Js)(t, e));
}
function* ea() {
  for (var t = this._groups, e = 0, i = t.length; e < i; ++e)
    for (var r = t[e], o = 0, n = r.length, s; o < n; ++o)
      (s = r[o]) && (yield s);
}
var lo = [null];
function K(t, e) {
  this._groups = t, this._parents = e;
}
function le() {
  return new K([[document.documentElement]], lo);
}
function ia() {
  return this;
}
K.prototype = le.prototype = {
  constructor: K,
  select: wn,
  selectAll: Mn,
  selectChild: Nn,
  selectChildren: Wn,
  filter: Pn,
  data: Yn,
  enter: Hn,
  exit: Kn,
  join: Zn,
  merge: jn,
  selection: ia,
  order: Jn,
  sort: Qn,
  call: es,
  nodes: is,
  node: rs,
  size: os,
  empty: ns,
  each: ss,
  attr: ds,
  style: Cs,
  property: xs,
  classed: vs,
  text: Fs,
  html: Os,
  raise: Ds,
  lower: $s,
  append: Rs,
  insert: Ws,
  remove: Hs,
  clone: Gs,
  datum: Vs,
  on: js,
  dispatch: ta,
  [Symbol.iterator]: ea
};
function tc(t) {
  return typeof t == "string" ? new K([[document.querySelector(t)]], [document.documentElement]) : new K([[t]], lo);
}
function Wi(t, e, i) {
  t.prototype = e.prototype = i, i.constructor = t;
}
function ho(t, e) {
  var i = Object.create(t.prototype);
  for (var r in e)
    i[r] = e[r];
  return i;
}
function he() {
}
var oe = 0.7, Ie = 1 / oe, Wt = "\\s*([+-]?\\d+)\\s*", ne = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", at = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ra = /^#([0-9a-f]{3,8})$/, oa = new RegExp(`^rgb\\(${Wt},${Wt},${Wt}\\)$`), na = new RegExp(`^rgb\\(${at},${at},${at}\\)$`), sa = new RegExp(`^rgba\\(${Wt},${Wt},${Wt},${ne}\\)$`), aa = new RegExp(`^rgba\\(${at},${at},${at},${ne}\\)$`), la = new RegExp(`^hsl\\(${ne},${at},${at}\\)$`), ha = new RegExp(`^hsla\\(${ne},${at},${at},${ne}\\)$`), Tr = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Wi(he, se, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: kr,
  // Deprecated! Use color.formatHex.
  formatHex: kr,
  formatHex8: ca,
  formatHsl: ua,
  formatRgb: Sr,
  toString: Sr
});
function kr() {
  return this.rgb().formatHex();
}
function ca() {
  return this.rgb().formatHex8();
}
function ua() {
  return co(this).formatHsl();
}
function Sr() {
  return this.rgb().formatRgb();
}
function se(t) {
  var e, i;
  return t = (t + "").trim().toLowerCase(), (e = ra.exec(t)) ? (i = e[1].length, e = parseInt(e[1], 16), i === 6 ? vr(e) : i === 3 ? new X(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : i === 8 ? me(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : i === 4 ? me(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = oa.exec(t)) ? new X(e[1], e[2], e[3], 1) : (e = na.exec(t)) ? new X(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = sa.exec(t)) ? me(e[1], e[2], e[3], e[4]) : (e = aa.exec(t)) ? me(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = la.exec(t)) ? wr(e[1], e[2] / 100, e[3] / 100, 1) : (e = ha.exec(t)) ? wr(e[1], e[2] / 100, e[3] / 100, e[4]) : Tr.hasOwnProperty(t) ? vr(Tr[t]) : t === "transparent" ? new X(NaN, NaN, NaN, 0) : null;
}
function vr(t) {
  return new X(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function me(t, e, i, r) {
  return r <= 0 && (t = e = i = NaN), new X(t, e, i, r);
}
function fa(t) {
  return t instanceof he || (t = se(t)), t ? (t = t.rgb(), new X(t.r, t.g, t.b, t.opacity)) : new X();
}
function vi(t, e, i, r) {
  return arguments.length === 1 ? fa(t) : new X(t, e, i, r ?? 1);
}
function X(t, e, i, r) {
  this.r = +t, this.g = +e, this.b = +i, this.opacity = +r;
}
Wi(X, vi, ho(he, {
  brighter(t) {
    return t = t == null ? Ie : Math.pow(Ie, t), new X(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? oe : Math.pow(oe, t), new X(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new X(Lt(this.r), Lt(this.g), Lt(this.b), De(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Br,
  // Deprecated! Use color.formatHex.
  formatHex: Br,
  formatHex8: da,
  formatRgb: Lr,
  toString: Lr
}));
function Br() {
  return `#${vt(this.r)}${vt(this.g)}${vt(this.b)}`;
}
function da() {
  return `#${vt(this.r)}${vt(this.g)}${vt(this.b)}${vt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Lr() {
  const t = De(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${Lt(this.r)}, ${Lt(this.g)}, ${Lt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function De(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function Lt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function vt(t) {
  return t = Lt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function wr(t, e, i, r) {
  return r <= 0 ? t = e = i = NaN : i <= 0 || i >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new rt(t, e, i, r);
}
function co(t) {
  if (t instanceof rt)
    return new rt(t.h, t.s, t.l, t.opacity);
  if (t instanceof he || (t = se(t)), !t)
    return new rt();
  if (t instanceof rt)
    return t;
  t = t.rgb();
  var e = t.r / 255, i = t.g / 255, r = t.b / 255, o = Math.min(e, i, r), n = Math.max(e, i, r), s = NaN, a = n - o, h = (n + o) / 2;
  return a ? (e === n ? s = (i - r) / a + (i < r) * 6 : i === n ? s = (r - e) / a + 2 : s = (e - i) / a + 4, a /= h < 0.5 ? n + o : 2 - n - o, s *= 60) : a = h > 0 && h < 1 ? 0 : s, new rt(s, a, h, t.opacity);
}
function ga(t, e, i, r) {
  return arguments.length === 1 ? co(t) : new rt(t, e, i, r ?? 1);
}
function rt(t, e, i, r) {
  this.h = +t, this.s = +e, this.l = +i, this.opacity = +r;
}
Wi(rt, ga, ho(he, {
  brighter(t) {
    return t = t == null ? Ie : Math.pow(Ie, t), new rt(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? oe : Math.pow(oe, t), new rt(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, i = this.l, r = i + (i < 0.5 ? i : 1 - i) * e, o = 2 * i - r;
    return new X(
      pi(t >= 240 ? t - 240 : t + 120, o, r),
      pi(t, o, r),
      pi(t < 120 ? t + 240 : t - 120, o, r),
      this.opacity
    );
  },
  clamp() {
    return new rt(Fr(this.h), Ce(this.s), Ce(this.l), De(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = De(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Fr(this.h)}, ${Ce(this.s) * 100}%, ${Ce(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Fr(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Ce(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function pi(t, e, i) {
  return (t < 60 ? e + (i - e) * t / 60 : t < 180 ? i : t < 240 ? e + (i - e) * (240 - t) / 60 : e) * 255;
}
const Pi = (t) => () => t;
function uo(t, e) {
  return function(i) {
    return t + i * e;
  };
}
function pa(t, e, i) {
  return t = Math.pow(t, i), e = Math.pow(e, i) - t, i = 1 / i, function(r) {
    return Math.pow(t + r * e, i);
  };
}
function ec(t, e) {
  var i = e - t;
  return i ? uo(t, i > 180 || i < -180 ? i - 360 * Math.round(i / 360) : i) : Pi(isNaN(t) ? e : t);
}
function ma(t) {
  return (t = +t) == 1 ? fo : function(e, i) {
    return i - e ? pa(e, i, t) : Pi(isNaN(e) ? i : e);
  };
}
function fo(t, e) {
  var i = e - t;
  return i ? uo(t, i) : Pi(isNaN(t) ? e : t);
}
const Er = function t(e) {
  var i = ma(e);
  function r(o, n) {
    var s = i((o = vi(o)).r, (n = vi(n)).r), a = i(o.g, n.g), h = i(o.b, n.b), c = fo(o.opacity, n.opacity);
    return function(u) {
      return o.r = s(u), o.g = a(u), o.b = h(u), o.opacity = c(u), o + "";
    };
  }
  return r.gamma = t, r;
}(1);
function bt(t, e) {
  return t = +t, e = +e, function(i) {
    return t * (1 - i) + e * i;
  };
}
var Bi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, mi = new RegExp(Bi.source, "g");
function Ca(t) {
  return function() {
    return t;
  };
}
function ya(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ba(t, e) {
  var i = Bi.lastIndex = mi.lastIndex = 0, r, o, n, s = -1, a = [], h = [];
  for (t = t + "", e = e + ""; (r = Bi.exec(t)) && (o = mi.exec(e)); )
    (n = o.index) > i && (n = e.slice(i, n), a[s] ? a[s] += n : a[++s] = n), (r = r[0]) === (o = o[0]) ? a[s] ? a[s] += o : a[++s] = o : (a[++s] = null, h.push({ i: s, x: bt(r, o) })), i = mi.lastIndex;
  return i < e.length && (n = e.slice(i), a[s] ? a[s] += n : a[++s] = n), a.length < 2 ? h[0] ? ya(h[0].x) : Ca(e) : (e = h.length, function(c) {
    for (var u = 0, g; u < e; ++u)
      a[(g = h[u]).i] = g.x(c);
    return a.join("");
  });
}
var Ar = 180 / Math.PI, Li = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function go(t, e, i, r, o, n) {
  var s, a, h;
  return (s = Math.sqrt(t * t + e * e)) && (t /= s, e /= s), (h = t * i + e * r) && (i -= t * h, r -= e * h), (a = Math.sqrt(i * i + r * r)) && (i /= a, r /= a, h /= a), t * r < e * i && (t = -t, e = -e, h = -h, s = -s), {
    translateX: o,
    translateY: n,
    rotate: Math.atan2(e, t) * Ar,
    skewX: Math.atan(h) * Ar,
    scaleX: s,
    scaleY: a
  };
}
var ye;
function _a(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Li : go(e.a, e.b, e.c, e.d, e.e, e.f);
}
function xa(t) {
  return t == null || (ye || (ye = document.createElementNS("http://www.w3.org/2000/svg", "g")), ye.setAttribute("transform", t), !(t = ye.transform.baseVal.consolidate())) ? Li : (t = t.matrix, go(t.a, t.b, t.c, t.d, t.e, t.f));
}
function po(t, e, i, r) {
  function o(c) {
    return c.length ? c.pop() + " " : "";
  }
  function n(c, u, g, C, y, S) {
    if (c !== g || u !== C) {
      var B = y.push("translate(", null, e, null, i);
      S.push({ i: B - 4, x: bt(c, g) }, { i: B - 2, x: bt(u, C) });
    } else
      (g || C) && y.push("translate(" + g + e + C + i);
  }
  function s(c, u, g, C) {
    c !== u ? (c - u > 180 ? u += 360 : u - c > 180 && (c += 360), C.push({ i: g.push(o(g) + "rotate(", null, r) - 2, x: bt(c, u) })) : u && g.push(o(g) + "rotate(" + u + r);
  }
  function a(c, u, g, C) {
    c !== u ? C.push({ i: g.push(o(g) + "skewX(", null, r) - 2, x: bt(c, u) }) : u && g.push(o(g) + "skewX(" + u + r);
  }
  function h(c, u, g, C, y, S) {
    if (c !== g || u !== C) {
      var B = y.push(o(y) + "scale(", null, ",", null, ")");
      S.push({ i: B - 4, x: bt(c, g) }, { i: B - 2, x: bt(u, C) });
    } else
      (g !== 1 || C !== 1) && y.push(o(y) + "scale(" + g + "," + C + ")");
  }
  return function(c, u) {
    var g = [], C = [];
    return c = t(c), u = t(u), n(c.translateX, c.translateY, u.translateX, u.translateY, g, C), s(c.rotate, u.rotate, g, C), a(c.skewX, u.skewX, g, C), h(c.scaleX, c.scaleY, u.scaleX, u.scaleY, g, C), c = u = null, function(y) {
      for (var S = -1, B = C.length, M; ++S < B; )
        g[(M = C[S]).i] = M.x(y);
      return g.join("");
    };
  };
}
var Ta = po(_a, "px, ", "px)", "deg)"), ka = po(xa, ", ", ")", ")"), Ut = 0, jt = 0, Kt = 0, mo = 1e3, Ne, Jt, $e = 0, wt = 0, qe = 0, ae = typeof performance == "object" && performance.now ? performance : Date, Co = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Hi() {
  return wt || (Co(Sa), wt = ae.now() + qe);
}
function Sa() {
  wt = 0;
}
function Re() {
  this._call = this._time = this._next = null;
}
Re.prototype = yo.prototype = {
  constructor: Re,
  restart: function(t, e, i) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    i = (i == null ? Hi() : +i) + (e == null ? 0 : +e), !this._next && Jt !== this && (Jt ? Jt._next = this : Ne = this, Jt = this), this._call = t, this._time = i, wi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, wi());
  }
};
function yo(t, e, i) {
  var r = new Re();
  return r.restart(t, e, i), r;
}
function va() {
  Hi(), ++Ut;
  for (var t = Ne, e; t; )
    (e = wt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ut;
}
function Mr() {
  wt = ($e = ae.now()) + qe, Ut = jt = 0;
  try {
    va();
  } finally {
    Ut = 0, La(), wt = 0;
  }
}
function Ba() {
  var t = ae.now(), e = t - $e;
  e > mo && (qe -= e, $e = t);
}
function La() {
  for (var t, e = Ne, i, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (i = e._next, e._next = null, e = t ? t._next = i : Ne = i);
  Jt = t, wi(r);
}
function wi(t) {
  if (!Ut) {
    jt && (jt = clearTimeout(jt));
    var e = t - wt;
    e > 24 ? (t < 1 / 0 && (jt = setTimeout(Mr, t - ae.now() - qe)), Kt && (Kt = clearInterval(Kt))) : (Kt || ($e = ae.now(), Kt = setInterval(Ba, mo)), Ut = 1, Co(Mr));
  }
}
function Or(t, e, i) {
  var r = new Re();
  return e = e == null ? 0 : +e, r.restart((o) => {
    r.stop(), t(o + e);
  }, e, i), r;
}
var wa = Zr("start", "end", "cancel", "interrupt"), Fa = [], bo = 0, Ir = 1, Fi = 2, ve = 3, Dr = 4, Ei = 5, Be = 6;
function Ue(t, e, i, r, o, n) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (i in s)
    return;
  Ea(t, i, {
    name: e,
    index: r,
    // For context during callback.
    group: o,
    // For context during callback.
    on: wa,
    tween: Fa,
    time: n.time,
    delay: n.delay,
    duration: n.duration,
    ease: n.ease,
    timer: null,
    state: bo
  });
}
function qi(t, e) {
  var i = nt(t, e);
  if (i.state > bo)
    throw new Error("too late; already scheduled");
  return i;
}
function lt(t, e) {
  var i = nt(t, e);
  if (i.state > ve)
    throw new Error("too late; already running");
  return i;
}
function nt(t, e) {
  var i = t.__transition;
  if (!i || !(i = i[e]))
    throw new Error("transition not found");
  return i;
}
function Ea(t, e, i) {
  var r = t.__transition, o;
  r[e] = i, i.timer = yo(n, 0, i.time);
  function n(c) {
    i.state = Ir, i.timer.restart(s, i.delay, i.time), i.delay <= c && s(c - i.delay);
  }
  function s(c) {
    var u, g, C, y;
    if (i.state !== Ir)
      return h();
    for (u in r)
      if (y = r[u], y.name === i.name) {
        if (y.state === ve)
          return Or(s);
        y.state === Dr ? (y.state = Be, y.timer.stop(), y.on.call("interrupt", t, t.__data__, y.index, y.group), delete r[u]) : +u < e && (y.state = Be, y.timer.stop(), y.on.call("cancel", t, t.__data__, y.index, y.group), delete r[u]);
      }
    if (Or(function() {
      i.state === ve && (i.state = Dr, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = Fi, i.on.call("start", t, t.__data__, i.index, i.group), i.state === Fi) {
      for (i.state = ve, o = new Array(C = i.tween.length), u = 0, g = -1; u < C; ++u)
        (y = i.tween[u].value.call(t, t.__data__, i.index, i.group)) && (o[++g] = y);
      o.length = g + 1;
    }
  }
  function a(c) {
    for (var u = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(h), i.state = Ei, 1), g = -1, C = o.length; ++g < C; )
      o[g].call(t, u);
    i.state === Ei && (i.on.call("end", t, t.__data__, i.index, i.group), h());
  }
  function h() {
    i.state = Be, i.timer.stop(), delete r[e];
    for (var c in r)
      return;
    delete t.__transition;
  }
}
function Aa(t, e) {
  var i = t.__transition, r, o, n = !0, s;
  if (i) {
    e = e == null ? null : e + "";
    for (s in i) {
      if ((r = i[s]).name !== e) {
        n = !1;
        continue;
      }
      o = r.state > Fi && r.state < Ei, r.state = Be, r.timer.stop(), r.on.call(o ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete i[s];
    }
    n && delete t.__transition;
  }
}
function Ma(t) {
  return this.each(function() {
    Aa(this, t);
  });
}
function Oa(t, e) {
  var i, r;
  return function() {
    var o = lt(this, t), n = o.tween;
    if (n !== i) {
      r = i = n;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    o.tween = r;
  };
}
function Ia(t, e, i) {
  var r, o;
  if (typeof i != "function")
    throw new Error();
  return function() {
    var n = lt(this, t), s = n.tween;
    if (s !== r) {
      o = (r = s).slice();
      for (var a = { name: e, value: i }, h = 0, c = o.length; h < c; ++h)
        if (o[h].name === e) {
          o[h] = a;
          break;
        }
      h === c && o.push(a);
    }
    n.tween = o;
  };
}
function Da(t, e) {
  var i = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = nt(this.node(), i).tween, o = 0, n = r.length, s; o < n; ++o)
      if ((s = r[o]).name === t)
        return s.value;
    return null;
  }
  return this.each((e == null ? Oa : Ia)(i, t, e));
}
function Ui(t, e, i) {
  var r = t._id;
  return t.each(function() {
    var o = lt(this, r);
    (o.value || (o.value = {}))[e] = i.apply(this, arguments);
  }), function(o) {
    return nt(o, r).value[e];
  };
}
function _o(t, e) {
  var i;
  return (typeof e == "number" ? bt : e instanceof se ? Er : (i = se(e)) ? (e = i, Er) : ba)(t, e);
}
function Na(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function $a(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ra(t, e, i) {
  var r, o = i + "", n;
  return function() {
    var s = this.getAttribute(t);
    return s === o ? null : s === r ? n : n = e(r = s, i);
  };
}
function za(t, e, i) {
  var r, o = i + "", n;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === o ? null : s === r ? n : n = e(r = s, i);
  };
}
function Wa(t, e, i) {
  var r, o, n;
  return function() {
    var s, a = i(this), h;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), h = a + "", s === h ? null : s === r && h === o ? n : (o = h, n = e(r = s, a)));
  };
}
function Pa(t, e, i) {
  var r, o, n;
  return function() {
    var s, a = i(this), h;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), h = a + "", s === h ? null : s === r && h === o ? n : (o = h, n = e(r = s, a)));
  };
}
function Ha(t, e) {
  var i = He(t), r = i === "transform" ? ka : _o;
  return this.attrTween(t, typeof e == "function" ? (i.local ? Pa : Wa)(i, r, Ui(this, "attr." + t, e)) : e == null ? (i.local ? $a : Na)(i) : (i.local ? za : Ra)(i, r, e));
}
function qa(t, e) {
  return function(i) {
    this.setAttribute(t, e.call(this, i));
  };
}
function Ua(t, e) {
  return function(i) {
    this.setAttributeNS(t.space, t.local, e.call(this, i));
  };
}
function Ga(t, e) {
  var i, r;
  function o() {
    var n = e.apply(this, arguments);
    return n !== r && (i = (r = n) && Ua(t, n)), i;
  }
  return o._value = e, o;
}
function Va(t, e) {
  var i, r;
  function o() {
    var n = e.apply(this, arguments);
    return n !== r && (i = (r = n) && qa(t, n)), i;
  }
  return o._value = e, o;
}
function Ya(t, e) {
  var i = "attr." + t;
  if (arguments.length < 2)
    return (i = this.tween(i)) && i._value;
  if (e == null)
    return this.tween(i, null);
  if (typeof e != "function")
    throw new Error();
  var r = He(t);
  return this.tween(i, (r.local ? Ga : Va)(r, e));
}
function Xa(t, e) {
  return function() {
    qi(this, t).delay = +e.apply(this, arguments);
  };
}
function Ka(t, e) {
  return e = +e, function() {
    qi(this, t).delay = e;
  };
}
function Za(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Xa : Ka)(e, t)) : nt(this.node(), e).delay;
}
function ja(t, e) {
  return function() {
    lt(this, t).duration = +e.apply(this, arguments);
  };
}
function Ja(t, e) {
  return e = +e, function() {
    lt(this, t).duration = e;
  };
}
function Qa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? ja : Ja)(e, t)) : nt(this.node(), e).duration;
}
function tl(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    lt(this, t).ease = e;
  };
}
function el(t) {
  var e = this._id;
  return arguments.length ? this.each(tl(e, t)) : nt(this.node(), e).ease;
}
function il(t, e) {
  return function() {
    var i = e.apply(this, arguments);
    if (typeof i != "function")
      throw new Error();
    lt(this, t).ease = i;
  };
}
function rl(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(il(this._id, t));
}
function ol(t) {
  typeof t != "function" && (t = Qr(t));
  for (var e = this._groups, i = e.length, r = new Array(i), o = 0; o < i; ++o)
    for (var n = e[o], s = n.length, a = r[o] = [], h, c = 0; c < s; ++c)
      (h = n[c]) && t.call(h, h.__data__, c, n) && a.push(h);
  return new gt(r, this._parents, this._name, this._id);
}
function nl(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, i = t._groups, r = e.length, o = i.length, n = Math.min(r, o), s = new Array(r), a = 0; a < n; ++a)
    for (var h = e[a], c = i[a], u = h.length, g = s[a] = new Array(u), C, y = 0; y < u; ++y)
      (C = h[y] || c[y]) && (g[y] = C);
  for (; a < r; ++a)
    s[a] = e[a];
  return new gt(s, this._parents, this._name, this._id);
}
function sl(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var i = e.indexOf(".");
    return i >= 0 && (e = e.slice(0, i)), !e || e === "start";
  });
}
function al(t, e, i) {
  var r, o, n = sl(e) ? qi : lt;
  return function() {
    var s = n(this, t), a = s.on;
    a !== r && (o = (r = a).copy()).on(e, i), s.on = o;
  };
}
function ll(t, e) {
  var i = this._id;
  return arguments.length < 2 ? nt(this.node(), i).on.on(t) : this.each(al(i, t, e));
}
function hl(t) {
  return function() {
    var e = this.parentNode;
    for (var i in this.__transition)
      if (+i !== t)
        return;
    e && e.removeChild(this);
  };
}
function cl() {
  return this.on("end.remove", hl(this._id));
}
function ul(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Ri(t));
  for (var r = this._groups, o = r.length, n = new Array(o), s = 0; s < o; ++s)
    for (var a = r[s], h = a.length, c = n[s] = new Array(h), u, g, C = 0; C < h; ++C)
      (u = a[C]) && (g = t.call(u, u.__data__, C, a)) && ("__data__" in u && (g.__data__ = u.__data__), c[C] = g, Ue(c[C], e, i, C, c, nt(u, i)));
  return new gt(n, this._parents, e, i);
}
function fl(t) {
  var e = this._name, i = this._id;
  typeof t != "function" && (t = Jr(t));
  for (var r = this._groups, o = r.length, n = [], s = [], a = 0; a < o; ++a)
    for (var h = r[a], c = h.length, u, g = 0; g < c; ++g)
      if (u = h[g]) {
        for (var C = t.call(u, u.__data__, g, h), y, S = nt(u, i), B = 0, M = C.length; B < M; ++B)
          (y = C[B]) && Ue(y, e, i, B, C, S);
        n.push(C), s.push(u);
      }
  return new gt(n, s, e, i);
}
var dl = le.prototype.constructor;
function gl() {
  return new dl(this._groups, this._parents);
}
function pl(t, e) {
  var i, r, o;
  return function() {
    var n = qt(this, t), s = (this.style.removeProperty(t), qt(this, t));
    return n === s ? null : n === i && s === r ? o : o = e(i = n, r = s);
  };
}
function xo(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ml(t, e, i) {
  var r, o = i + "", n;
  return function() {
    var s = qt(this, t);
    return s === o ? null : s === r ? n : n = e(r = s, i);
  };
}
function Cl(t, e, i) {
  var r, o, n;
  return function() {
    var s = qt(this, t), a = i(this), h = a + "";
    return a == null && (h = a = (this.style.removeProperty(t), qt(this, t))), s === h ? null : s === r && h === o ? n : (o = h, n = e(r = s, a));
  };
}
function yl(t, e) {
  var i, r, o, n = "style." + e, s = "end." + n, a;
  return function() {
    var h = lt(this, t), c = h.on, u = h.value[n] == null ? a || (a = xo(e)) : void 0;
    (c !== i || o !== u) && (r = (i = c).copy()).on(s, o = u), h.on = r;
  };
}
function bl(t, e, i) {
  var r = (t += "") == "transform" ? Ta : _o;
  return e == null ? this.styleTween(t, pl(t, r)).on("end.style." + t, xo(t)) : typeof e == "function" ? this.styleTween(t, Cl(t, r, Ui(this, "style." + t, e))).each(yl(this._id, t)) : this.styleTween(t, ml(t, r, e), i).on("end.style." + t, null);
}
function _l(t, e, i) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), i);
  };
}
function xl(t, e, i) {
  var r, o;
  function n() {
    var s = e.apply(this, arguments);
    return s !== o && (r = (o = s) && _l(t, s, i)), r;
  }
  return n._value = e, n;
}
function Tl(t, e, i) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, xl(t, e, i ?? ""));
}
function kl(t) {
  return function() {
    this.textContent = t;
  };
}
function Sl(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function vl(t) {
  return this.tween("text", typeof t == "function" ? Sl(Ui(this, "text", t)) : kl(t == null ? "" : t + ""));
}
function Bl(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Ll(t) {
  var e, i;
  function r() {
    var o = t.apply(this, arguments);
    return o !== i && (e = (i = o) && Bl(o)), e;
  }
  return r._value = t, r;
}
function wl(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, Ll(t));
}
function Fl() {
  for (var t = this._name, e = this._id, i = To(), r = this._groups, o = r.length, n = 0; n < o; ++n)
    for (var s = r[n], a = s.length, h, c = 0; c < a; ++c)
      if (h = s[c]) {
        var u = nt(h, e);
        Ue(h, t, i, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new gt(r, this._parents, t, i);
}
function El() {
  var t, e, i = this, r = i._id, o = i.size();
  return new Promise(function(n, s) {
    var a = { value: s }, h = { value: function() {
      --o === 0 && n();
    } };
    i.each(function() {
      var c = lt(this, r), u = c.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(h)), c.on = e;
    }), o === 0 && n();
  });
}
var Al = 0;
function gt(t, e, i, r) {
  this._groups = t, this._parents = e, this._name = i, this._id = r;
}
function To() {
  return ++Al;
}
var dt = le.prototype;
gt.prototype = {
  constructor: gt,
  select: ul,
  selectAll: fl,
  selectChild: dt.selectChild,
  selectChildren: dt.selectChildren,
  filter: ol,
  merge: nl,
  selection: gl,
  transition: Fl,
  call: dt.call,
  nodes: dt.nodes,
  node: dt.node,
  size: dt.size,
  empty: dt.empty,
  each: dt.each,
  on: ll,
  attr: Ha,
  attrTween: Ya,
  style: bl,
  styleTween: Tl,
  text: vl,
  textTween: wl,
  remove: cl,
  tween: Da,
  delay: Za,
  duration: Qa,
  ease: el,
  easeVarying: rl,
  end: El,
  [Symbol.iterator]: dt[Symbol.iterator]
};
function Ml(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ol = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ml
};
function Il(t, e) {
  for (var i; !(i = t.__transition) || !(i = i[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return i;
}
function Dl(t) {
  var e, i;
  t instanceof gt ? (e = t._id, t = t._name) : (e = To(), (i = Ol).time = Hi(), t = t == null ? null : t + "");
  for (var r = this._groups, o = r.length, n = 0; n < o; ++n)
    for (var s = r[n], a = s.length, h, c = 0; c < a; ++c)
      (h = s[c]) && Ue(h, t, e, c, s, i || Il(h, e));
  return new gt(r, this._parents, t, e);
}
le.prototype.interrupt = Ma;
le.prototype.transition = Dl;
function Qt(t, e, i) {
  this.k = t, this.x = e, this.y = i;
}
Qt.prototype = {
  constructor: Qt,
  scale: function(t) {
    return t === 1 ? this : new Qt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new Qt(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
Qt.prototype;
/*! @license DOMPurify 2.4.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.5/LICENSE */
function _t(t) {
  return _t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _t(t);
}
function Ai(t, e) {
  return Ai = Object.setPrototypeOf || function(r, o) {
    return r.__proto__ = o, r;
  }, Ai(t, e);
}
function Nl() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Le(t, e, i) {
  return Nl() ? Le = Reflect.construct : Le = function(o, n, s) {
    var a = [null];
    a.push.apply(a, n);
    var h = Function.bind.apply(o, a), c = new h();
    return s && Ai(c, s.prototype), c;
  }, Le.apply(null, arguments);
}
function et(t) {
  return $l(t) || Rl(t) || zl(t) || Wl();
}
function $l(t) {
  if (Array.isArray(t))
    return Mi(t);
}
function Rl(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function zl(t, e) {
  if (t) {
    if (typeof t == "string")
      return Mi(t, e);
    var i = Object.prototype.toString.call(t).slice(8, -1);
    if (i === "Object" && t.constructor && (i = t.constructor.name), i === "Map" || i === "Set")
      return Array.from(t);
    if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
      return Mi(t, e);
  }
}
function Mi(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var i = 0, r = new Array(e); i < e; i++)
    r[i] = t[i];
  return r;
}
function Wl() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Pl = Object.hasOwnProperty, Nr = Object.setPrototypeOf, Hl = Object.isFrozen, ql = Object.getPrototypeOf, Ul = Object.getOwnPropertyDescriptor, q = Object.freeze, ot = Object.seal, Gl = Object.create, ko = typeof Reflect < "u" && Reflect, ze = ko.apply, Oi = ko.construct;
ze || (ze = function(e, i, r) {
  return e.apply(i, r);
});
q || (q = function(e) {
  return e;
});
ot || (ot = function(e) {
  return e;
});
Oi || (Oi = function(e, i) {
  return Le(e, et(i));
});
var Vl = J(Array.prototype.forEach), $r = J(Array.prototype.pop), Zt = J(Array.prototype.push), we = J(String.prototype.toLowerCase), Ci = J(String.prototype.toString), Yl = J(String.prototype.match), tt = J(String.prototype.replace), Xl = J(String.prototype.indexOf), Kl = J(String.prototype.trim), P = J(RegExp.prototype.test), yi = Zl(TypeError);
function J(t) {
  return function(e) {
    for (var i = arguments.length, r = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
      r[o - 1] = arguments[o];
    return ze(t, e, r);
  };
}
function Zl(t) {
  return function() {
    for (var e = arguments.length, i = new Array(e), r = 0; r < e; r++)
      i[r] = arguments[r];
    return Oi(t, i);
  };
}
function k(t, e, i) {
  i = i || we, Nr && Nr(t, null);
  for (var r = e.length; r--; ) {
    var o = e[r];
    if (typeof o == "string") {
      var n = i(o);
      n !== o && (Hl(e) || (e[r] = n), o = n);
    }
    t[o] = !0;
  }
  return t;
}
function St(t) {
  var e = Gl(null), i;
  for (i in t)
    ze(Pl, t, [i]) === !0 && (e[i] = t[i]);
  return e;
}
function be(t, e) {
  for (; t !== null; ) {
    var i = Ul(t, e);
    if (i) {
      if (i.get)
        return J(i.get);
      if (typeof i.value == "function")
        return J(i.value);
    }
    t = ql(t);
  }
  function r(o) {
    return console.warn("fallback value for", o), null;
  }
  return r;
}
var Rr = q(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), bi = q(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), _i = q(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), jl = q(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), xi = q(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]), Jl = q(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), zr = q(["#text"]), Wr = q(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]), Ti = q(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Pr = q(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), _e = q(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Ql = ot(/\{\{[\w\W]*|[\w\W]*\}\}/gm), th = ot(/<%[\w\W]*|[\w\W]*%>/gm), eh = ot(/\${[\w\W]*}/gm), ih = ot(/^data-[\-\w.\u00B7-\uFFFF]/), rh = ot(/^aria-[\-\w]+$/), oh = ot(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), nh = ot(/^(?:\w+script|data):/i), sh = ot(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), ah = ot(/^html$/i), lh = function() {
  return typeof window > "u" ? null : window;
}, hh = function(e, i) {
  if (_t(e) !== "object" || typeof e.createPolicy != "function")
    return null;
  var r = null, o = "data-tt-policy-suffix";
  i.currentScript && i.currentScript.hasAttribute(o) && (r = i.currentScript.getAttribute(o));
  var n = "dompurify" + (r ? "#" + r : "");
  try {
    return e.createPolicy(n, {
      createHTML: function(a) {
        return a;
      },
      createScriptURL: function(a) {
        return a;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + n + " could not be created."), null;
  }
};
function So() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : lh(), e = function(l) {
    return So(l);
  };
  if (e.version = "2.4.5", e.removed = [], !t || !t.document || t.document.nodeType !== 9)
    return e.isSupported = !1, e;
  var i = t.document, r = t.document, o = t.DocumentFragment, n = t.HTMLTemplateElement, s = t.Node, a = t.Element, h = t.NodeFilter, c = t.NamedNodeMap, u = c === void 0 ? t.NamedNodeMap || t.MozNamedAttrMap : c, g = t.HTMLFormElement, C = t.DOMParser, y = t.trustedTypes, S = a.prototype, B = be(S, "cloneNode"), M = be(S, "nextSibling"), Z = be(S, "childNodes"), E = be(S, "parentNode");
  if (typeof n == "function") {
    var w = r.createElement("template");
    w.content && w.content.ownerDocument && (r = w.content.ownerDocument);
  }
  var F = hh(y, i), Q = F ? F.createHTML("") : "", Ft = r, je = Ft.implementation, Uo = Ft.createNodeIterator, Go = Ft.createDocumentFragment, Vo = Ft.getElementsByTagName, Yo = i.importNode, Ki = {};
  try {
    Ki = St(r).documentMode ? r.documentMode : {};
  } catch {
  }
  var st = {};
  e.isSupported = typeof E == "function" && je && typeof je.createHTMLDocument < "u" && Ki !== 9;
  var Je = Ql, Qe = th, ti = eh, Xo = ih, Ko = rh, Zo = nh, Zi = sh, ei = oh, O = null, ji = k({}, [].concat(et(Rr), et(bi), et(_i), et(xi), et(zr))), I = null, Ji = k({}, [].concat(et(Wr), et(Ti), et(Pr), et(_e))), A = Object.seal(Object.create(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), Vt = null, ii = null, Qi = !0, ri = !0, tr = !1, er = !0, Et = !1, Tt = !1, oi = !1, ni = !1, At = !1, ce = !1, ue = !1, ir = !0, rr = !1, jo = "user-content-", si = !0, Yt = !1, Mt = {}, Ot = null, or = k({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]), nr = null, sr = k({}, ["audio", "video", "img", "source", "image", "track"]), ai = null, ar = k({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), fe = "http://www.w3.org/1998/Math/MathML", de = "http://www.w3.org/2000/svg", ht = "http://www.w3.org/1999/xhtml", It = ht, li = !1, hi = null, Jo = k({}, [fe, de, ht], Ci), kt, Qo = ["application/xhtml+xml", "text/html"], tn = "text/html", D, Dt = null, en = r.createElement("form"), lr = function(l) {
    return l instanceof RegExp || l instanceof Function;
  }, ci = function(l) {
    Dt && Dt === l || ((!l || _t(l) !== "object") && (l = {}), l = St(l), kt = // eslint-disable-next-line unicorn/prefer-includes
    Qo.indexOf(l.PARSER_MEDIA_TYPE) === -1 ? kt = tn : kt = l.PARSER_MEDIA_TYPE, D = kt === "application/xhtml+xml" ? Ci : we, O = "ALLOWED_TAGS" in l ? k({}, l.ALLOWED_TAGS, D) : ji, I = "ALLOWED_ATTR" in l ? k({}, l.ALLOWED_ATTR, D) : Ji, hi = "ALLOWED_NAMESPACES" in l ? k({}, l.ALLOWED_NAMESPACES, Ci) : Jo, ai = "ADD_URI_SAFE_ATTR" in l ? k(
      St(ar),
      // eslint-disable-line indent
      l.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      D
      // eslint-disable-line indent
    ) : ar, nr = "ADD_DATA_URI_TAGS" in l ? k(
      St(sr),
      // eslint-disable-line indent
      l.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      D
      // eslint-disable-line indent
    ) : sr, Ot = "FORBID_CONTENTS" in l ? k({}, l.FORBID_CONTENTS, D) : or, Vt = "FORBID_TAGS" in l ? k({}, l.FORBID_TAGS, D) : {}, ii = "FORBID_ATTR" in l ? k({}, l.FORBID_ATTR, D) : {}, Mt = "USE_PROFILES" in l ? l.USE_PROFILES : !1, Qi = l.ALLOW_ARIA_ATTR !== !1, ri = l.ALLOW_DATA_ATTR !== !1, tr = l.ALLOW_UNKNOWN_PROTOCOLS || !1, er = l.ALLOW_SELF_CLOSE_IN_ATTR !== !1, Et = l.SAFE_FOR_TEMPLATES || !1, Tt = l.WHOLE_DOCUMENT || !1, At = l.RETURN_DOM || !1, ce = l.RETURN_DOM_FRAGMENT || !1, ue = l.RETURN_TRUSTED_TYPE || !1, ni = l.FORCE_BODY || !1, ir = l.SANITIZE_DOM !== !1, rr = l.SANITIZE_NAMED_PROPS || !1, si = l.KEEP_CONTENT !== !1, Yt = l.IN_PLACE || !1, ei = l.ALLOWED_URI_REGEXP || ei, It = l.NAMESPACE || ht, A = l.CUSTOM_ELEMENT_HANDLING || {}, l.CUSTOM_ELEMENT_HANDLING && lr(l.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (A.tagNameCheck = l.CUSTOM_ELEMENT_HANDLING.tagNameCheck), l.CUSTOM_ELEMENT_HANDLING && lr(l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (A.attributeNameCheck = l.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), l.CUSTOM_ELEMENT_HANDLING && typeof l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (A.allowCustomizedBuiltInElements = l.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), Et && (ri = !1), ce && (At = !0), Mt && (O = k({}, et(zr)), I = [], Mt.html === !0 && (k(O, Rr), k(I, Wr)), Mt.svg === !0 && (k(O, bi), k(I, Ti), k(I, _e)), Mt.svgFilters === !0 && (k(O, _i), k(I, Ti), k(I, _e)), Mt.mathMl === !0 && (k(O, xi), k(I, Pr), k(I, _e))), l.ADD_TAGS && (O === ji && (O = St(O)), k(O, l.ADD_TAGS, D)), l.ADD_ATTR && (I === Ji && (I = St(I)), k(I, l.ADD_ATTR, D)), l.ADD_URI_SAFE_ATTR && k(ai, l.ADD_URI_SAFE_ATTR, D), l.FORBID_CONTENTS && (Ot === or && (Ot = St(Ot)), k(Ot, l.FORBID_CONTENTS, D)), si && (O["#text"] = !0), Tt && k(O, ["html", "head", "body"]), O.table && (k(O, ["tbody"]), delete Vt.tbody), q && q(l), Dt = l);
  }, hr = k({}, ["mi", "mo", "mn", "ms", "mtext"]), cr = k({}, ["foreignobject", "desc", "title", "annotation-xml"]), rn = k({}, ["title", "style", "font", "a", "script"]), ge = k({}, bi);
  k(ge, _i), k(ge, jl);
  var ui = k({}, xi);
  k(ui, Jl);
  var on = function(l) {
    var d = E(l);
    (!d || !d.tagName) && (d = {
      namespaceURI: It,
      tagName: "template"
    });
    var m = we(l.tagName), v = we(d.tagName);
    return hi[l.namespaceURI] ? l.namespaceURI === de ? d.namespaceURI === ht ? m === "svg" : d.namespaceURI === fe ? m === "svg" && (v === "annotation-xml" || hr[v]) : Boolean(ge[m]) : l.namespaceURI === fe ? d.namespaceURI === ht ? m === "math" : d.namespaceURI === de ? m === "math" && cr[v] : Boolean(ui[m]) : l.namespaceURI === ht ? d.namespaceURI === de && !cr[v] || d.namespaceURI === fe && !hr[v] ? !1 : !ui[m] && (rn[m] || !ge[m]) : !!(kt === "application/xhtml+xml" && hi[l.namespaceURI]) : !1;
  }, ct = function(l) {
    Zt(e.removed, {
      element: l
    });
    try {
      l.parentNode.removeChild(l);
    } catch {
      try {
        l.outerHTML = Q;
      } catch {
        l.remove();
      }
    }
  }, fi = function(l, d) {
    try {
      Zt(e.removed, {
        attribute: d.getAttributeNode(l),
        from: d
      });
    } catch {
      Zt(e.removed, {
        attribute: null,
        from: d
      });
    }
    if (d.removeAttribute(l), l === "is" && !I[l])
      if (At || ce)
        try {
          ct(d);
        } catch {
        }
      else
        try {
          d.setAttribute(l, "");
        } catch {
        }
  }, ur = function(l) {
    var d, m;
    if (ni)
      l = "<remove></remove>" + l;
    else {
      var v = Yl(l, /^[\r\n\t ]+/);
      m = v && v[0];
    }
    kt === "application/xhtml+xml" && It === ht && (l = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + l + "</body></html>");
    var U = F ? F.createHTML(l) : l;
    if (It === ht)
      try {
        d = new C().parseFromString(U, kt);
      } catch {
      }
    if (!d || !d.documentElement) {
      d = je.createDocument(It, "template", null);
      try {
        d.documentElement.innerHTML = li ? Q : U;
      } catch {
      }
    }
    var z = d.body || d.documentElement;
    return l && m && z.insertBefore(r.createTextNode(m), z.childNodes[0] || null), It === ht ? Vo.call(d, Tt ? "html" : "body")[0] : Tt ? d.documentElement : z;
  }, fr = function(l) {
    return Uo.call(
      l.ownerDocument || l,
      l,
      // eslint-disable-next-line no-bitwise
      h.SHOW_ELEMENT | h.SHOW_COMMENT | h.SHOW_TEXT,
      null,
      !1
    );
  }, nn = function(l) {
    return l instanceof g && (typeof l.nodeName != "string" || typeof l.textContent != "string" || typeof l.removeChild != "function" || !(l.attributes instanceof u) || typeof l.removeAttribute != "function" || typeof l.setAttribute != "function" || typeof l.namespaceURI != "string" || typeof l.insertBefore != "function" || typeof l.hasChildNodes != "function");
  }, Xt = function(l) {
    return _t(s) === "object" ? l instanceof s : l && _t(l) === "object" && typeof l.nodeType == "number" && typeof l.nodeName == "string";
  }, ut = function(l, d, m) {
    st[l] && Vl(st[l], function(v) {
      v.call(e, d, m, Dt);
    });
  }, dr = function(l) {
    var d;
    if (ut("beforeSanitizeElements", l, null), nn(l) || P(/[\u0080-\uFFFF]/, l.nodeName))
      return ct(l), !0;
    var m = D(l.nodeName);
    if (ut("uponSanitizeElement", l, {
      tagName: m,
      allowedTags: O
    }), l.hasChildNodes() && !Xt(l.firstElementChild) && (!Xt(l.content) || !Xt(l.content.firstElementChild)) && P(/<[/\w]/g, l.innerHTML) && P(/<[/\w]/g, l.textContent) || m === "select" && P(/<template/i, l.innerHTML))
      return ct(l), !0;
    if (!O[m] || Vt[m]) {
      if (!Vt[m] && pr(m) && (A.tagNameCheck instanceof RegExp && P(A.tagNameCheck, m) || A.tagNameCheck instanceof Function && A.tagNameCheck(m)))
        return !1;
      if (si && !Ot[m]) {
        var v = E(l) || l.parentNode, U = Z(l) || l.childNodes;
        if (U && v)
          for (var z = U.length, R = z - 1; R >= 0; --R)
            v.insertBefore(B(U[R], !0), M(l));
      }
      return ct(l), !0;
    }
    return l instanceof a && !on(l) || (m === "noscript" || m === "noembed") && P(/<\/no(script|embed)/i, l.innerHTML) ? (ct(l), !0) : (Et && l.nodeType === 3 && (d = l.textContent, d = tt(d, Je, " "), d = tt(d, Qe, " "), d = tt(d, ti, " "), l.textContent !== d && (Zt(e.removed, {
      element: l.cloneNode()
    }), l.textContent = d)), ut("afterSanitizeElements", l, null), !1);
  }, gr = function(l, d, m) {
    if (ir && (d === "id" || d === "name") && (m in r || m in en))
      return !1;
    if (!(ri && !ii[d] && P(Xo, d))) {
      if (!(Qi && P(Ko, d))) {
        if (!I[d] || ii[d]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(pr(l) && (A.tagNameCheck instanceof RegExp && P(A.tagNameCheck, l) || A.tagNameCheck instanceof Function && A.tagNameCheck(l)) && (A.attributeNameCheck instanceof RegExp && P(A.attributeNameCheck, d) || A.attributeNameCheck instanceof Function && A.attributeNameCheck(d)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            d === "is" && A.allowCustomizedBuiltInElements && (A.tagNameCheck instanceof RegExp && P(A.tagNameCheck, m) || A.tagNameCheck instanceof Function && A.tagNameCheck(m)))
          )
            return !1;
        } else if (!ai[d]) {
          if (!P(ei, tt(m, Zi, ""))) {
            if (!((d === "src" || d === "xlink:href" || d === "href") && l !== "script" && Xl(m, "data:") === 0 && nr[l])) {
              if (!(tr && !P(Zo, tt(m, Zi, "")))) {
                if (m)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, pr = function(l) {
    return l.indexOf("-") > 0;
  }, mr = function(l) {
    var d, m, v, U;
    ut("beforeSanitizeAttributes", l, null);
    var z = l.attributes;
    if (z) {
      var R = {
        attrName: "",
        attrValue: "",
        keepAttr: !0,
        allowedAttributes: I
      };
      for (U = z.length; U--; ) {
        d = z[U];
        var pe = d, N = pe.name, di = pe.namespaceURI;
        if (m = N === "value" ? d.value : Kl(d.value), v = D(N), R.attrName = v, R.attrValue = m, R.keepAttr = !0, R.forceKeepAttr = void 0, ut("uponSanitizeAttribute", l, R), m = R.attrValue, !R.forceKeepAttr && (fi(N, l), !!R.keepAttr)) {
          if (!er && P(/\/>/i, m)) {
            fi(N, l);
            continue;
          }
          Et && (m = tt(m, Je, " "), m = tt(m, Qe, " "), m = tt(m, ti, " "));
          var Cr = D(l.nodeName);
          if (gr(Cr, v, m)) {
            if (rr && (v === "id" || v === "name") && (fi(N, l), m = jo + m), F && _t(y) === "object" && typeof y.getAttributeType == "function" && !di)
              switch (y.getAttributeType(Cr, v)) {
                case "TrustedHTML":
                  m = F.createHTML(m);
                  break;
                case "TrustedScriptURL":
                  m = F.createScriptURL(m);
                  break;
              }
            try {
              di ? l.setAttributeNS(di, N, m) : l.setAttribute(N, m), $r(e.removed);
            } catch {
            }
          }
        }
      }
      ut("afterSanitizeAttributes", l, null);
    }
  }, sn = function b(l) {
    var d, m = fr(l);
    for (ut("beforeSanitizeShadowDOM", l, null); d = m.nextNode(); )
      ut("uponSanitizeShadowNode", d, null), !dr(d) && (d.content instanceof o && b(d.content), mr(d));
    ut("afterSanitizeShadowDOM", l, null);
  };
  return e.sanitize = function(b) {
    var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, d, m, v, U, z;
    if (li = !b, li && (b = "<!-->"), typeof b != "string" && !Xt(b)) {
      if (typeof b.toString != "function")
        throw yi("toString is not a function");
      if (b = b.toString(), typeof b != "string")
        throw yi("dirty is not a string, aborting");
    }
    if (!e.isSupported) {
      if (_t(t.toStaticHTML) === "object" || typeof t.toStaticHTML == "function") {
        if (typeof b == "string")
          return t.toStaticHTML(b);
        if (Xt(b))
          return t.toStaticHTML(b.outerHTML);
      }
      return b;
    }
    if (oi || ci(l), e.removed = [], typeof b == "string" && (Yt = !1), Yt) {
      if (b.nodeName) {
        var R = D(b.nodeName);
        if (!O[R] || Vt[R])
          throw yi("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (b instanceof s)
      d = ur("<!---->"), m = d.ownerDocument.importNode(b, !0), m.nodeType === 1 && m.nodeName === "BODY" || m.nodeName === "HTML" ? d = m : d.appendChild(m);
    else {
      if (!At && !Et && !Tt && // eslint-disable-next-line unicorn/prefer-includes
      b.indexOf("<") === -1)
        return F && ue ? F.createHTML(b) : b;
      if (d = ur(b), !d)
        return At ? null : ue ? Q : "";
    }
    d && ni && ct(d.firstChild);
    for (var pe = fr(Yt ? b : d); v = pe.nextNode(); )
      v.nodeType === 3 && v === U || dr(v) || (v.content instanceof o && sn(v.content), mr(v), U = v);
    if (U = null, Yt)
      return b;
    if (At) {
      if (ce)
        for (z = Go.call(d.ownerDocument); d.firstChild; )
          z.appendChild(d.firstChild);
      else
        z = d;
      return (I.shadowroot || I.shadowrootmod) && (z = Yo.call(i, z, !0)), z;
    }
    var N = Tt ? d.outerHTML : d.innerHTML;
    return Tt && O["!doctype"] && d.ownerDocument && d.ownerDocument.doctype && d.ownerDocument.doctype.name && P(ah, d.ownerDocument.doctype.name) && (N = "<!DOCTYPE " + d.ownerDocument.doctype.name + `>
` + N), Et && (N = tt(N, Je, " "), N = tt(N, Qe, " "), N = tt(N, ti, " ")), F && ue ? F.createHTML(N) : N;
  }, e.setConfig = function(b) {
    ci(b), oi = !0;
  }, e.clearConfig = function() {
    Dt = null, oi = !1;
  }, e.isValidAttribute = function(b, l, d) {
    Dt || ci({});
    var m = D(b), v = D(l);
    return gr(m, v, d);
  }, e.addHook = function(b, l) {
    typeof l == "function" && (st[b] = st[b] || [], Zt(st[b], l));
  }, e.removeHook = function(b) {
    if (st[b])
      return $r(st[b]);
  }, e.removeHooks = function(b) {
    st[b] && (st[b] = []);
  }, e.removeAllHooks = function() {
    st = {};
  }, e;
}
var Ii = So();
const ch = (t) => t ? Bo(t).replace(/\\n/g, "#br#").split("#br#") : [""], vo = (t) => Ii.sanitize(t), Hr = (t, e) => {
  var i;
  if (((i = e.flowchart) == null ? void 0 : i.htmlLabels) !== !1) {
    const r = e.securityLevel;
    r === "antiscript" || r === "strict" ? t = vo(t) : r !== "loose" && (t = Bo(t), t = t.replace(/</g, "&lt;").replace(/>/g, "&gt;"), t = t.replace(/=/g, "&equals;"), t = gh(t));
  }
  return t;
}, We = (t, e) => t && (e.dompurifyConfig ? t = Ii.sanitize(Hr(t, e), e.dompurifyConfig).toString() : t = Ii.sanitize(Hr(t, e), {
  FORBID_TAGS: ["style"]
}).toString(), t), uh = (t, e) => typeof t == "string" ? We(t, e) : t.flat().map((i) => We(i, e)), Ge = /<br\s*\/?>/gi, fh = (t) => Ge.test(t), dh = (t) => t.split(Ge), gh = (t) => t.replace(/#br#/g, "<br/>"), Bo = (t) => t.replace(Ge, "#br#"), ph = (t) => {
  let e = "";
  return t && (e = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, e = e.replaceAll(/\(/g, "\\("), e = e.replaceAll(/\)/g, "\\)")), e;
}, mh = (t) => !(t === !1 || ["false", "null", "0"].includes(String(t).trim().toLowerCase())), Ch = function(t) {
  let e = t;
  if (t.split("~").length - 1 >= 2) {
    let i = e;
    do
      e = i, i = e.replace(/~([^\s,:;]+)~/, "<$1>");
    while (i != e);
    return Ch(i);
  } else
    return e;
}, ic = {
  getRows: ch,
  sanitizeText: We,
  sanitizeTextOrArray: uh,
  hasBreaks: fh,
  splitBreaks: dh,
  lineBreakRegex: Ge,
  removeScript: vo,
  getUrl: ph,
  evaluate: mh
}, Fe = {
  /* CLAMP */
  min: {
    r: 0,
    g: 0,
    b: 0,
    s: 0,
    l: 0,
    a: 0
  },
  max: {
    r: 255,
    g: 255,
    b: 255,
    h: 360,
    s: 100,
    l: 100,
    a: 1
  },
  clamp: {
    r: (t) => t >= 255 ? 255 : t < 0 ? 0 : t,
    g: (t) => t >= 255 ? 255 : t < 0 ? 0 : t,
    b: (t) => t >= 255 ? 255 : t < 0 ? 0 : t,
    h: (t) => t % 360,
    s: (t) => t >= 100 ? 100 : t < 0 ? 0 : t,
    l: (t) => t >= 100 ? 100 : t < 0 ? 0 : t,
    a: (t) => t >= 1 ? 1 : t < 0 ? 0 : t
  },
  /* CONVERSION */
  //SOURCE: https://planetcalc.com/7779
  toLinear: (t) => {
    const e = t / 255;
    return t > 0.03928 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92;
  },
  //SOURCE: https://gist.github.com/mjackson/5311256
  hue2rgb: (t, e, i) => (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (e - t) * 6 * i : i < 1 / 2 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t),
  hsl2rgb: ({ h: t, s: e, l: i }, r) => {
    if (!e)
      return i * 2.55;
    t /= 360, e /= 100, i /= 100;
    const o = i < 0.5 ? i * (1 + e) : i + e - i * e, n = 2 * i - o;
    switch (r) {
      case "r":
        return Fe.hue2rgb(n, o, t + 1 / 3) * 255;
      case "g":
        return Fe.hue2rgb(n, o, t) * 255;
      case "b":
        return Fe.hue2rgb(n, o, t - 1 / 3) * 255;
    }
  },
  rgb2hsl: ({ r: t, g: e, b: i }, r) => {
    t /= 255, e /= 255, i /= 255;
    const o = Math.max(t, e, i), n = Math.min(t, e, i), s = (o + n) / 2;
    if (r === "l")
      return s * 100;
    if (o === n)
      return 0;
    const a = o - n, h = s > 0.5 ? a / (2 - o - n) : a / (o + n);
    if (r === "s")
      return h * 100;
    switch (o) {
      case t:
        return ((e - i) / a + (e < i ? 6 : 0)) * 60;
      case e:
        return ((i - t) / a + 2) * 60;
      case i:
        return ((t - e) / a + 4) * 60;
      default:
        return -1;
    }
  }
}, yh = Fe, bh = {
  /* API */
  clamp: (t, e, i) => e > i ? Math.min(e, Math.max(i, t)) : Math.min(i, Math.max(e, t)),
  round: (t) => Math.round(t * 1e10) / 1e10
}, _h = bh, xh = {
  /* API */
  dec2hex: (t) => {
    const e = Math.round(t).toString(16);
    return e.length > 1 ? e : `0${e}`;
  }
}, Th = xh, kh = {
  channel: yh,
  lang: _h,
  unit: Th
}, T = kh, mt = {};
for (let t = 0; t <= 255; t++)
  mt[t] = T.unit.dec2hex(t);
const W = {
  ALL: 0,
  RGB: 1,
  HSL: 2
};
class Sh {
  constructor() {
    this.type = W.ALL;
  }
  /* API */
  get() {
    return this.type;
  }
  set(e) {
    if (this.type && this.type !== e)
      throw new Error("Cannot change both RGB and HSL channels at the same time");
    this.type = e;
  }
  reset() {
    this.type = W.ALL;
  }
  is(e) {
    return this.type === e;
  }
}
const vh = Sh;
class Bh {
  /* CONSTRUCTOR */
  constructor(e, i) {
    this.color = i, this.changed = !1, this.data = e, this.type = new vh();
  }
  /* API */
  set(e, i) {
    return this.color = i, this.changed = !1, this.data = e, this.type.type = W.ALL, this;
  }
  /* HELPERS */
  _ensureHSL() {
    const e = this.data, { h: i, s: r, l: o } = e;
    i === void 0 && (e.h = T.channel.rgb2hsl(e, "h")), r === void 0 && (e.s = T.channel.rgb2hsl(e, "s")), o === void 0 && (e.l = T.channel.rgb2hsl(e, "l"));
  }
  _ensureRGB() {
    const e = this.data, { r: i, g: r, b: o } = e;
    i === void 0 && (e.r = T.channel.hsl2rgb(e, "r")), r === void 0 && (e.g = T.channel.hsl2rgb(e, "g")), o === void 0 && (e.b = T.channel.hsl2rgb(e, "b"));
  }
  /* GETTERS */
  get r() {
    const e = this.data, i = e.r;
    return !this.type.is(W.HSL) && i !== void 0 ? i : (this._ensureHSL(), T.channel.hsl2rgb(e, "r"));
  }
  get g() {
    const e = this.data, i = e.g;
    return !this.type.is(W.HSL) && i !== void 0 ? i : (this._ensureHSL(), T.channel.hsl2rgb(e, "g"));
  }
  get b() {
    const e = this.data, i = e.b;
    return !this.type.is(W.HSL) && i !== void 0 ? i : (this._ensureHSL(), T.channel.hsl2rgb(e, "b"));
  }
  get h() {
    const e = this.data, i = e.h;
    return !this.type.is(W.RGB) && i !== void 0 ? i : (this._ensureRGB(), T.channel.rgb2hsl(e, "h"));
  }
  get s() {
    const e = this.data, i = e.s;
    return !this.type.is(W.RGB) && i !== void 0 ? i : (this._ensureRGB(), T.channel.rgb2hsl(e, "s"));
  }
  get l() {
    const e = this.data, i = e.l;
    return !this.type.is(W.RGB) && i !== void 0 ? i : (this._ensureRGB(), T.channel.rgb2hsl(e, "l"));
  }
  get a() {
    return this.data.a;
  }
  /* SETTERS */
  set r(e) {
    this.type.set(W.RGB), this.changed = !0, this.data.r = e;
  }
  set g(e) {
    this.type.set(W.RGB), this.changed = !0, this.data.g = e;
  }
  set b(e) {
    this.type.set(W.RGB), this.changed = !0, this.data.b = e;
  }
  set h(e) {
    this.type.set(W.HSL), this.changed = !0, this.data.h = e;
  }
  set s(e) {
    this.type.set(W.HSL), this.changed = !0, this.data.s = e;
  }
  set l(e) {
    this.type.set(W.HSL), this.changed = !0, this.data.l = e;
  }
  set a(e) {
    this.changed = !0, this.data.a = e;
  }
}
const Lh = Bh, wh = new Lh({ r: 0, g: 0, b: 0, a: 0 }, "transparent"), Ve = wh, Lo = {
  /* VARIABLES */
  re: /^#((?:[a-f0-9]{2}){2,4}|[a-f0-9]{3})$/i,
  /* API */
  parse: (t) => {
    if (t.charCodeAt(0) !== 35)
      return;
    const e = t.match(Lo.re);
    if (!e)
      return;
    const i = e[1], r = parseInt(i, 16), o = i.length, n = o % 4 === 0, s = o > 4, a = s ? 1 : 17, h = s ? 8 : 4, c = n ? 0 : -1, u = s ? 255 : 15;
    return Ve.set({
      r: (r >> h * (c + 3) & u) * a,
      g: (r >> h * (c + 2) & u) * a,
      b: (r >> h * (c + 1) & u) * a,
      a: n ? (r & u) * a / 255 : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: o } = t;
    return o < 1 ? `#${mt[Math.round(e)]}${mt[Math.round(i)]}${mt[Math.round(r)]}${mt[Math.round(o * 255)]}` : `#${mt[Math.round(e)]}${mt[Math.round(i)]}${mt[Math.round(r)]}`;
  }
}, ee = Lo, Ee = {
  /* VARIABLES */
  re: /^hsla?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(?:deg|grad|rad|turn)?)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?%)(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e-?\d+)?(%)?))?\s*?\)$/i,
  hueRe: /^(.+?)(deg|grad|rad|turn)$/i,
  /* HELPERS */
  _hue2deg: (t) => {
    const e = t.match(Ee.hueRe);
    if (e) {
      const [, i, r] = e;
      switch (r) {
        case "grad":
          return T.channel.clamp.h(parseFloat(i) * 0.9);
        case "rad":
          return T.channel.clamp.h(parseFloat(i) * 180 / Math.PI);
        case "turn":
          return T.channel.clamp.h(parseFloat(i) * 360);
      }
    }
    return T.channel.clamp.h(parseFloat(t));
  },
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 104 && e !== 72)
      return;
    const i = t.match(Ee.re);
    if (!i)
      return;
    const [, r, o, n, s, a] = i;
    return Ve.set({
      h: Ee._hue2deg(r),
      s: T.channel.clamp.s(parseFloat(o)),
      l: T.channel.clamp.l(parseFloat(n)),
      a: s ? T.channel.clamp.a(a ? parseFloat(s) / 100 : parseFloat(s)) : 1
    }, t);
  },
  stringify: (t) => {
    const { h: e, s: i, l: r, a: o } = t;
    return o < 1 ? `hsla(${T.lang.round(e)}, ${T.lang.round(i)}%, ${T.lang.round(r)}%, ${o})` : `hsl(${T.lang.round(e)}, ${T.lang.round(i)}%, ${T.lang.round(r)}%)`;
  }
}, xe = Ee, Ae = {
  /* VARIABLES */
  colors: {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyanaqua: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    transparent: "#00000000",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  },
  /* API */
  parse: (t) => {
    t = t.toLowerCase();
    const e = Ae.colors[t];
    if (e)
      return ee.parse(e);
  },
  stringify: (t) => {
    const e = ee.stringify(t);
    for (const i in Ae.colors)
      if (Ae.colors[i] === e)
        return i;
  }
}, qr = Ae, wo = {
  /* VARIABLES */
  re: /^rgba?\(\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))\s*?(?:,|\s)\s*?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?))(?:\s*?(?:,|\/)\s*?\+?(-?(?:\d+(?:\.\d+)?|(?:\.\d+))(?:e\d+)?(%?)))?\s*?\)$/i,
  /* API */
  parse: (t) => {
    const e = t.charCodeAt(0);
    if (e !== 114 && e !== 82)
      return;
    const i = t.match(wo.re);
    if (!i)
      return;
    const [, r, o, n, s, a, h, c, u] = i;
    return Ve.set({
      r: T.channel.clamp.r(o ? parseFloat(r) * 2.55 : parseFloat(r)),
      g: T.channel.clamp.g(s ? parseFloat(n) * 2.55 : parseFloat(n)),
      b: T.channel.clamp.b(h ? parseFloat(a) * 2.55 : parseFloat(a)),
      a: c ? T.channel.clamp.a(u ? parseFloat(c) / 100 : parseFloat(c)) : 1
    }, t);
  },
  stringify: (t) => {
    const { r: e, g: i, b: r, a: o } = t;
    return o < 1 ? `rgba(${T.lang.round(e)}, ${T.lang.round(i)}, ${T.lang.round(r)}, ${T.lang.round(o)})` : `rgb(${T.lang.round(e)}, ${T.lang.round(i)}, ${T.lang.round(r)})`;
  }
}, Te = wo, Fh = {
  /* VARIABLES */
  format: {
    keyword: qr,
    hex: ee,
    rgb: Te,
    rgba: Te,
    hsl: xe,
    hsla: xe
  },
  /* API */
  parse: (t) => {
    if (typeof t != "string")
      return t;
    const e = ee.parse(t) || Te.parse(t) || xe.parse(t) || qr.parse(t);
    if (e)
      return e;
    throw new Error(`Unsupported color format: "${t}"`);
  },
  stringify: (t) => !t.changed && t.color ? t.color : t.type.is(W.HSL) || t.data.r === void 0 ? xe.stringify(t) : t.a < 1 || !Number.isInteger(t.r) || !Number.isInteger(t.g) || !Number.isInteger(t.b) ? Te.stringify(t) : ee.stringify(t)
}, pt = Fh, Eh = (t, e) => {
  const i = pt.parse(t);
  for (const r in e)
    i[r] = T.channel.clamp[r](e[r]);
  return pt.stringify(i);
}, Fo = Eh, Ah = (t, e, i = 0, r = 1) => {
  if (typeof t != "number")
    return Fo(t, { a: e });
  const o = Ve.set({
    r: T.channel.clamp.r(t),
    g: T.channel.clamp.g(e),
    b: T.channel.clamp.b(i),
    a: T.channel.clamp.a(r)
  });
  return pt.stringify(o);
}, ie = Ah, Mh = (t, e, i) => {
  const r = pt.parse(t), o = r[e], n = T.channel.clamp[e](o + i);
  return o !== n && (r[e] = n), pt.stringify(r);
}, Eo = Mh, Oh = (t, e) => Eo(t, "l", e), _ = Oh, Ih = (t, e) => Eo(t, "l", -e), x = Ih, Dh = (t, e) => {
  const i = pt.parse(t), r = {};
  for (const o in e)
    e[o] && (r[o] = i[o] + e[o]);
  return Fo(t, r);
}, f = Dh, Nh = (t, e, i = 50) => {
  const { r, g: o, b: n, a: s } = pt.parse(t), { r: a, g: h, b: c, a: u } = pt.parse(e), g = i / 100, C = g * 2 - 1, y = s - u, B = ((C * y === -1 ? C : (C + y) / (1 + C * y)) + 1) / 2, M = 1 - B, Z = r * B + a * M, E = o * B + h * M, w = n * B + c * M, F = s * g + u * (1 - g);
  return ie(Z, E, w, F);
}, $h = Nh, Rh = (t, e = 100) => {
  const i = pt.parse(t);
  return i.r = 255 - i.r, i.g = 255 - i.g, i.b = 255 - i.b, $h(i, t, e);
}, p = Rh, H = (t, e) => e ? f(t, { s: -40, l: 10 }) : f(t, { s: -40, l: -10 }), Ye = "#ffffff", Xe = "#f2f2f2";
let zh = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#fff4dd", this.noteBkgColor = "#fff5ad", this.noteTextColor = "#333", this.THEME_COLOR_LIMIT = 12, this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px";
  }
  updateColors() {
    if (this.primaryTextColor = this.primaryTextColor || (this.darkMode ? "#eee" : "#333"), this.secondaryColor = this.secondaryColor || f(this.primaryColor, { h: -120 }), this.tertiaryColor = this.tertiaryColor || f(this.primaryColor, { h: 180, l: 5 }), this.primaryBorderColor = this.primaryBorderColor || H(this.primaryColor, this.darkMode), this.secondaryBorderColor = this.secondaryBorderColor || H(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = this.tertiaryBorderColor || H(this.tertiaryColor, this.darkMode), this.noteBorderColor = this.noteBorderColor || H(this.noteBkgColor, this.darkMode), this.noteBkgColor = this.noteBkgColor || "#fff5ad", this.noteTextColor = this.noteTextColor || "#333", this.secondaryTextColor = this.secondaryTextColor || p(this.secondaryColor), this.tertiaryTextColor = this.tertiaryTextColor || p(this.tertiaryColor), this.lineColor = this.lineColor || p(this.background), this.arrowheadColor = this.arrowheadColor || p(this.background), this.textColor = this.textColor || this.primaryTextColor, this.border2 = this.border2 || this.tertiaryBorderColor, this.nodeBkg = this.nodeBkg || this.primaryColor, this.mainBkg = this.mainBkg || this.primaryColor, this.nodeBorder = this.nodeBorder || this.primaryBorderColor, this.clusterBkg = this.clusterBkg || this.tertiaryColor, this.clusterBorder = this.clusterBorder || this.tertiaryBorderColor, this.defaultLinkColor = this.defaultLinkColor || this.lineColor, this.titleColor = this.titleColor || this.tertiaryTextColor, this.edgeLabelBackground = this.edgeLabelBackground || (this.darkMode ? x(this.secondaryColor, 30) : this.secondaryColor), this.nodeTextColor = this.nodeTextColor || this.primaryTextColor, this.actorBorder = this.actorBorder || this.primaryBorderColor, this.actorBkg = this.actorBkg || this.mainBkg, this.actorTextColor = this.actorTextColor || this.primaryTextColor, this.actorLineColor = this.actorLineColor || "grey", this.labelBoxBkgColor = this.labelBoxBkgColor || this.actorBkg, this.signalColor = this.signalColor || this.textColor, this.signalTextColor = this.signalTextColor || this.textColor, this.labelBoxBorderColor = this.labelBoxBorderColor || this.actorBorder, this.labelTextColor = this.labelTextColor || this.actorTextColor, this.loopTextColor = this.loopTextColor || this.actorTextColor, this.activationBorderColor = this.activationBorderColor || x(this.secondaryColor, 10), this.activationBkgColor = this.activationBkgColor || this.secondaryColor, this.sequenceNumberColor = this.sequenceNumberColor || p(this.lineColor), this.sectionBkgColor = this.sectionBkgColor || this.tertiaryColor, this.altSectionBkgColor = this.altSectionBkgColor || "white", this.sectionBkgColor = this.sectionBkgColor || this.secondaryColor, this.sectionBkgColor2 = this.sectionBkgColor2 || this.primaryColor, this.excludeBkgColor = this.excludeBkgColor || "#eeeeee", this.taskBorderColor = this.taskBorderColor || this.primaryBorderColor, this.taskBkgColor = this.taskBkgColor || this.primaryColor, this.activeTaskBorderColor = this.activeTaskBorderColor || this.primaryColor, this.activeTaskBkgColor = this.activeTaskBkgColor || _(this.primaryColor, 23), this.gridColor = this.gridColor || "lightgrey", this.doneTaskBkgColor = this.doneTaskBkgColor || "lightgrey", this.doneTaskBorderColor = this.doneTaskBorderColor || "grey", this.critBorderColor = this.critBorderColor || "#ff8888", this.critBkgColor = this.critBkgColor || "red", this.todayLineColor = this.todayLineColor || "red", this.taskTextColor = this.taskTextColor || this.textColor, this.taskTextOutsideColor = this.taskTextOutsideColor || this.textColor, this.taskTextLightColor = this.taskTextLightColor || this.textColor, this.taskTextColor = this.taskTextColor || this.primaryTextColor, this.taskTextDarkColor = this.taskTextDarkColor || this.textColor, this.taskTextClickableColor = this.taskTextClickableColor || "#003163", this.personBorder = this.personBorder || this.primaryBorderColor, this.personBkg = this.personBkg || this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || this.tertiaryColor, this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.specialStateColor = this.lineColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || f(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || f(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || f(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || f(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || f(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || f(this.primaryColor, { h: 210, l: 150 }), this.cScale9 = this.cScale9 || f(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || f(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || f(this.primaryColor, { h: 330 }), this.darkMode)
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = x(this["cScale" + i], 75);
    else
      for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
        this["cScale" + i] = x(this["cScale" + i], 25);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleInv" + i] = this["cScaleInv" + i] || p(this["cScale" + i]);
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this.darkMode ? this["cScalePeer" + i] = this["cScalePeer" + i] || _(this["cScale" + i], 10) : this["cScalePeer" + i] = this["cScalePeer" + i] || x(this["cScale" + i], 10);
    this.scaleLabelColor = this.scaleLabelColor || this.labelTextColor;
    for (let i = 0; i < this.THEME_COLOR_LIMIT; i++)
      this["cScaleLabel" + i] = this["cScaleLabel" + i] || this.scaleLabelColor;
    const e = this.darkMode ? -4 : -1;
    for (let i = 0; i < 5; i++)
      this["surface" + i] = this["surface" + i] || f(this.mainBkg, { h: 180, s: -15, l: e * (5 + i * 3) }), this["surfacePeer" + i] = this["surfacePeer" + i] || f(this.mainBkg, { h: 180, s: -15, l: e * (8 + i * 3) });
    this.classText = this.classText || this.textColor, this.fillType0 = this.fillType0 || this.primaryColor, this.fillType1 = this.fillType1 || this.secondaryColor, this.fillType2 = this.fillType2 || f(this.primaryColor, { h: 64 }), this.fillType3 = this.fillType3 || f(this.secondaryColor, { h: 64 }), this.fillType4 = this.fillType4 || f(this.primaryColor, { h: -64 }), this.fillType5 = this.fillType5 || f(this.secondaryColor, { h: -64 }), this.fillType6 = this.fillType6 || f(this.primaryColor, { h: 128 }), this.fillType7 = this.fillType7 || f(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || f(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || f(this.secondaryColor, { l: -10 }), this.pie6 = this.pie6 || f(this.tertiaryColor, { l: -10 }), this.pie7 = this.pie7 || f(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || f(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || f(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || f(this.primaryColor, { h: 60, l: -20 }), this.pie11 = this.pie11 || f(this.primaryColor, { h: -60, l: -20 }), this.pie12 = this.pie12 || f(this.primaryColor, { h: 120, l: -10 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? x(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || f(this.primaryColor, { h: -30 }), this.git4 = this.git4 || f(this.primaryColor, { h: -60 }), this.git5 = this.git5 || f(this.primaryColor, { h: -90 }), this.git6 = this.git6 || f(this.primaryColor, { h: 60 }), this.git7 = this.git7 || f(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = _(this.git0, 25), this.git1 = _(this.git1, 25), this.git2 = _(this.git2, 25), this.git3 = _(this.git3, 25), this.git4 = _(this.git4, 25), this.git5 = _(this.git5, 25), this.git6 = _(this.git6, 25), this.git7 = _(this.git7, 25)) : (this.git0 = x(this.git0, 25), this.git1 = x(this.git1, 25), this.git2 = x(this.git2, 25), this.git3 = x(this.git3, 25), this.git4 = x(this.git4, 25), this.git5 = x(this.git5, 25), this.git6 = x(this.git6, 25), this.git7 = x(this.git7, 25)), this.gitInv0 = this.gitInv0 || p(this.git0), this.gitInv1 = this.gitInv1 || p(this.git1), this.gitInv2 = this.gitInv2 || p(this.git2), this.gitInv3 = this.gitInv3 || p(this.git3), this.gitInv4 = this.gitInv4 || p(this.git4), this.gitInv5 = this.gitInv5 || p(this.git5), this.gitInv6 = this.gitInv6 || p(this.git6), this.gitInv7 = this.gitInv7 || p(this.git7), this.branchLabelColor = this.branchLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.gitBranchLabel0 = this.gitBranchLabel0 || this.branchLabelColor, this.gitBranchLabel1 = this.gitBranchLabel1 || this.branchLabelColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.branchLabelColor, this.gitBranchLabel3 = this.gitBranchLabel3 || this.branchLabelColor, this.gitBranchLabel4 = this.gitBranchLabel4 || this.branchLabelColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.branchLabelColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.branchLabelColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Ye, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Xe;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
};
const Wh = (t) => {
  const e = new zh();
  return e.calculate(t), e;
};
let Ph = class {
  constructor() {
    this.background = "#333", this.primaryColor = "#1f2020", this.secondaryColor = _(this.primaryColor, 16), this.tertiaryColor = f(this.primaryColor, { h: -160 }), this.primaryBorderColor = p(this.background), this.secondaryBorderColor = H(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = H(this.tertiaryColor, this.darkMode), this.primaryTextColor = p(this.primaryColor), this.secondaryTextColor = p(this.secondaryColor), this.tertiaryTextColor = p(this.tertiaryColor), this.lineColor = p(this.background), this.textColor = p(this.background), this.mainBkg = "#1f2020", this.secondBkg = "calculated", this.mainContrastColor = "lightgrey", this.darkTextColor = _(p("#323D47"), 10), this.lineColor = "calculated", this.border1 = "#81B1DB", this.border2 = ie(255, 255, 255, 0.25), this.arrowheadColor = "calculated", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#181818", this.textColor = "#ccc", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#F9FFFE", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "calculated", this.activationBkgColor = "calculated", this.sequenceNumberColor = "black", this.sectionBkgColor = x("#EAE8D9", 30), this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "#EAE8D9", this.excludeBkgColor = x(this.sectionBkgColor, 10), this.taskBorderColor = ie(255, 255, 255, 70), this.taskBkgColor = "calculated", this.taskTextColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = ie(255, 255, 255, 50), this.activeTaskBkgColor = "#81B1DB", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "grey", this.critBorderColor = "#E83737", this.critBkgColor = "#E83737", this.taskTextDarkColor = "calculated", this.todayLineColor = "#DB5757", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "calculated", this.errorBkgColor = "#a44141", this.errorTextColor = "#ddd";
  }
  updateColors() {
    this.secondBkg = _(this.mainBkg, 16), this.lineColor = this.mainContrastColor, this.arrowheadColor = this.mainContrastColor, this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.edgeLabelBackground = _(this.labelBackground, 25), this.actorBorder = this.border1, this.actorBkg = this.mainBkg, this.actorTextColor = this.mainContrastColor, this.actorLineColor = this.mainContrastColor, this.signalColor = this.mainContrastColor, this.signalTextColor = this.mainContrastColor, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.mainContrastColor, this.loopTextColor = this.mainContrastColor, this.noteBorderColor = this.secondaryBorderColor, this.noteBkgColor = this.secondBkg, this.noteTextColor = this.secondaryTextColor, this.activationBorderColor = this.border1, this.activationBkgColor = this.secondBkg, this.altSectionBkgColor = this.background, this.taskBkgColor = _(this.mainBkg, 23), this.taskTextColor = this.darkTextColor, this.taskTextLightColor = this.mainContrastColor, this.taskTextOutsideColor = this.taskTextLightColor, this.gridColor = this.mainContrastColor, this.doneTaskBkgColor = this.mainContrastColor, this.taskTextDarkColor = this.darkTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#555", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#f4f4f4", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = f(this.primaryColor, { h: 64 }), this.fillType3 = f(this.secondaryColor, { h: 64 }), this.fillType4 = f(this.primaryColor, { h: -64 }), this.fillType5 = f(this.secondaryColor, { h: -64 }), this.fillType6 = f(this.primaryColor, { h: 128 }), this.fillType7 = f(this.secondaryColor, { h: 128 }), this.cScale1 = this.cScale1 || "#0b0000", this.cScale2 = this.cScale2 || "#4d1037", this.cScale3 = this.cScale3 || "#3f5258", this.cScale4 = this.cScale4 || "#4f2f1b", this.cScale5 = this.cScale5 || "#6e0a0a", this.cScale6 = this.cScale6 || "#3b0048", this.cScale7 = this.cScale7 || "#995a01", this.cScale8 = this.cScale8 || "#154706", this.cScale9 = this.cScale9 || "#161722", this.cScale10 = this.cScale10 || "#00296f", this.cScale11 = this.cScale11 || "#01629c", this.cScale12 = this.cScale12 || "#010029", this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || f(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || f(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || f(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || f(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || f(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || f(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || f(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || f(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || f(this.primaryColor, { h: 330 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || p(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScalePeer" + e] = this["cScalePeer" + e] || _(this["cScale" + e], 10);
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || f(this.mainBkg, { h: 30, s: -30, l: -(-10 + e * 4) }), this["surfacePeer" + e] = this["surfacePeer" + e] || f(this.mainBkg, { h: 30, s: -30, l: -(-7 + e * 4) });
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.classText = this.primaryTextColor, this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || (this.darkMode ? x(this.secondaryColor, 30) : this.secondaryColor), this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = _(this.secondaryColor, 20), this.git1 = _(this.pie2 || this.secondaryColor, 20), this.git2 = _(this.pie3 || this.tertiaryColor, 20), this.git3 = _(this.pie4 || f(this.primaryColor, { h: -30 }), 20), this.git4 = _(this.pie5 || f(this.primaryColor, { h: -60 }), 20), this.git5 = _(this.pie6 || f(this.primaryColor, { h: -90 }), 10), this.git6 = _(this.pie7 || f(this.primaryColor, { h: 60 }), 10), this.git7 = _(this.pie8 || f(this.primaryColor, { h: 120 }), 20), this.gitInv0 = this.gitInv0 || p(this.git0), this.gitInv1 = this.gitInv1 || p(this.git1), this.gitInv2 = this.gitInv2 || p(this.git2), this.gitInv3 = this.gitInv3 || p(this.git3), this.gitInv4 = this.gitInv4 || p(this.git4), this.gitInv5 = this.gitInv5 || p(this.git5), this.gitInv6 = this.gitInv6 || p(this.git6), this.gitInv7 = this.gitInv7 || p(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || p(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || p(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || _(this.background, 12), this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || _(this.background, 2);
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
};
const Hh = (t) => {
  const e = new Ph();
  return e.calculate(t), e;
};
let qh = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#ECECFF", this.secondaryColor = f(this.primaryColor, { h: 120 }), this.secondaryColor = "#ffffde", this.tertiaryColor = f(this.primaryColor, { h: -160 }), this.primaryBorderColor = H(this.primaryColor, this.darkMode), this.secondaryBorderColor = H(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = H(this.tertiaryColor, this.darkMode), this.primaryTextColor = p(this.primaryColor), this.secondaryTextColor = p(this.secondaryColor), this.tertiaryTextColor = p(this.tertiaryColor), this.lineColor = p(this.background), this.textColor = p(this.background), this.background = "white", this.mainBkg = "#ECECFF", this.secondBkg = "#ffffde", this.lineColor = "#333333", this.border1 = "#9370DB", this.border2 = "#aaaa33", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.labelBackground = "#e8e8e8", this.textColor = "#333", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "calculated", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "calculated", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "calculated", this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = this.taskTextDarkColor, this.taskTextClickableColor = "calculated", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBorderColor = "calculated", this.critBkgColor = "calculated", this.todayLineColor = "calculated", this.sectionBkgColor = ie(102, 102, 255, 0.49), this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#fff400", this.taskBorderColor = "#534fbc", this.taskBkgColor = "#8a90dd", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "#534fbc", this.activeTaskBkgColor = "#bfc7ff", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222", this.updateColors();
  }
  updateColors() {
    this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || f(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || f(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || f(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || f(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || f(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || f(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || f(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || f(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || f(this.primaryColor, { h: 330 }), this["cScalePeer" + 1] = this["cScalePeer" + 1] || x(this.secondaryColor, 45), this["cScalePeer" + 2] = this["cScalePeer" + 2] || x(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = x(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || x(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || f(this["cScale" + e], { h: 180 });
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || f(this.mainBkg, { h: 30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || f(this.mainBkg, { h: 30, l: -(7 + e * 5) });
    if (this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor, this.labelTextColor !== "calculated") {
      this.cScaleLabel0 = this.cScaleLabel0 || p(this.labelTextColor), this.cScaleLabel3 = this.cScaleLabel3 || p(this.labelTextColor);
      for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
        this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.labelTextColor;
    }
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.textColor, this.edgeLabelBackground = this.labelBackground, this.actorBorder = _(this.border1, 23), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.signalColor = this.textColor, this.signalTextColor = this.textColor, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.nodeBorder, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = f(this.primaryColor, { h: 64 }), this.fillType3 = f(this.secondaryColor, { h: 64 }), this.fillType4 = f(this.primaryColor, { h: -64 }), this.fillType5 = f(this.secondaryColor, { h: -64 }), this.fillType6 = f(this.primaryColor, { h: 128 }), this.fillType7 = f(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || f(this.tertiaryColor, { l: -40 }), this.pie4 = this.pie4 || f(this.primaryColor, { l: -10 }), this.pie5 = this.pie5 || f(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || f(this.tertiaryColor, { l: -20 }), this.pie7 = this.pie7 || f(this.primaryColor, { h: 60, l: -20 }), this.pie8 = this.pie8 || f(this.primaryColor, { h: -60, l: -40 }), this.pie9 = this.pie9 || f(this.primaryColor, { h: 120, l: -40 }), this.pie10 = this.pie10 || f(this.primaryColor, { h: 60, l: -40 }), this.pie11 = this.pie11 || f(this.primaryColor, { h: -90, l: -40 }), this.pie12 = this.pie12 || f(this.primaryColor, { h: 120, l: -30 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.labelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || f(this.primaryColor, { h: -30 }), this.git4 = this.git4 || f(this.primaryColor, { h: -60 }), this.git5 = this.git5 || f(this.primaryColor, { h: -90 }), this.git6 = this.git6 || f(this.primaryColor, { h: 60 }), this.git7 = this.git7 || f(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = _(this.git0, 25), this.git1 = _(this.git1, 25), this.git2 = _(this.git2, 25), this.git3 = _(this.git3, 25), this.git4 = _(this.git4, 25), this.git5 = _(this.git5, 25), this.git6 = _(this.git6, 25), this.git7 = _(this.git7, 25)) : (this.git0 = x(this.git0, 25), this.git1 = x(this.git1, 25), this.git2 = x(this.git2, 25), this.git3 = x(this.git3, 25), this.git4 = x(this.git4, 25), this.git5 = x(this.git5, 25), this.git6 = x(this.git6, 25), this.git7 = x(this.git7, 25)), this.gitInv0 = this.gitInv0 || x(p(this.git0), 25), this.gitInv1 = this.gitInv1 || p(this.git1), this.gitInv2 = this.gitInv2 || p(this.git2), this.gitInv3 = this.gitInv3 || p(this.git3), this.gitInv4 = this.gitInv4 || p(this.git4), this.gitInv5 = this.gitInv5 || p(this.git5), this.gitInv6 = this.gitInv6 || p(this.git6), this.gitInv7 = this.gitInv7 || p(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || p(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || p(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Ye, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Xe;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
};
const Uh = (t) => {
  const e = new qh();
  return e.calculate(t), e;
};
let Gh = class {
  constructor() {
    this.background = "#f4f4f4", this.primaryColor = "#cde498", this.secondaryColor = "#cdffb2", this.background = "white", this.mainBkg = "#cde498", this.secondBkg = "#cdffb2", this.lineColor = "green", this.border1 = "#13540c", this.border2 = "#6eaa49", this.arrowheadColor = "green", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.tertiaryColor = _("#cde498", 10), this.primaryBorderColor = H(this.primaryColor, this.darkMode), this.secondaryBorderColor = H(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = H(this.tertiaryColor, this.darkMode), this.primaryTextColor = p(this.primaryColor), this.secondaryTextColor = p(this.secondaryColor), this.tertiaryTextColor = p(this.primaryColor), this.lineColor = p(this.background), this.textColor = p(this.background), this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "#333", this.edgeLabelBackground = "#e8e8e8", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "black", this.actorLineColor = "grey", this.signalColor = "#333", this.signalTextColor = "#333", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "#326932", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "#fff5ad", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "#6eaa49", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "#6eaa49", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "#487e3a", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "black", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "lightgrey", this.doneTaskBkgColor = "lightgrey", this.doneTaskBorderColor = "grey", this.critBorderColor = "#ff8888", this.critBkgColor = "red", this.todayLineColor = "red", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.actorBorder = x(this.mainBkg, 20), this.actorBkg = this.mainBkg, this.labelBoxBkgColor = this.actorBkg, this.labelTextColor = this.actorTextColor, this.loopTextColor = this.actorTextColor, this.noteBorderColor = this.border2, this.noteTextColor = this.actorTextColor, this.cScale0 = this.cScale0 || this.primaryColor, this.cScale1 = this.cScale1 || this.secondaryColor, this.cScale2 = this.cScale2 || this.tertiaryColor, this.cScale3 = this.cScale3 || f(this.primaryColor, { h: 30 }), this.cScale4 = this.cScale4 || f(this.primaryColor, { h: 60 }), this.cScale5 = this.cScale5 || f(this.primaryColor, { h: 90 }), this.cScale6 = this.cScale6 || f(this.primaryColor, { h: 120 }), this.cScale7 = this.cScale7 || f(this.primaryColor, { h: 150 }), this.cScale8 = this.cScale8 || f(this.primaryColor, { h: 210 }), this.cScale9 = this.cScale9 || f(this.primaryColor, { h: 270 }), this.cScale10 = this.cScale10 || f(this.primaryColor, { h: 300 }), this.cScale11 = this.cScale11 || f(this.primaryColor, { h: 330 }), this["cScalePeer" + 1] = this["cScalePeer" + 1] || x(this.secondaryColor, 45), this["cScalePeer" + 2] = this["cScalePeer" + 2] || x(this.tertiaryColor, 40);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScale" + e] = x(this["cScale" + e], 10), this["cScalePeer" + e] = this["cScalePeer" + e] || x(this["cScale" + e], 25);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || f(this["cScale" + e], { h: 180 });
    this.scaleLabelColor = this.scaleLabelColor !== "calculated" && this.scaleLabelColor ? this.scaleLabelColor : this.labelTextColor;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || f(this.mainBkg, { h: 30, s: -30, l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || f(this.mainBkg, { h: 30, s: -30, l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.taskBorderColor = this.border1, this.taskTextColor = this.taskTextLightColor, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.transitionColor = this.transitionColor || this.lineColor, this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f0f0f0", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.compositeBorder = this.compositeBorder || this.nodeBorder, this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = this.lineColor, this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.transitionColor = this.transitionColor || this.lineColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = f(this.primaryColor, { h: 64 }), this.fillType3 = f(this.secondaryColor, { h: 64 }), this.fillType4 = f(this.primaryColor, { h: -64 }), this.fillType5 = f(this.secondaryColor, { h: -64 }), this.fillType6 = f(this.primaryColor, { h: 128 }), this.fillType7 = f(this.secondaryColor, { h: 128 }), this.pie1 = this.pie1 || this.primaryColor, this.pie2 = this.pie2 || this.secondaryColor, this.pie3 = this.pie3 || this.tertiaryColor, this.pie4 = this.pie4 || f(this.primaryColor, { l: -30 }), this.pie5 = this.pie5 || f(this.secondaryColor, { l: -30 }), this.pie6 = this.pie6 || f(this.tertiaryColor, { h: 40, l: -40 }), this.pie7 = this.pie7 || f(this.primaryColor, { h: 60, l: -10 }), this.pie8 = this.pie8 || f(this.primaryColor, { h: -60, l: -10 }), this.pie9 = this.pie9 || f(this.primaryColor, { h: 120, l: 0 }), this.pie10 = this.pie10 || f(this.primaryColor, { h: 60, l: -50 }), this.pie11 = this.pie11 || f(this.primaryColor, { h: -60, l: -50 }), this.pie12 = this.pie12 || f(this.primaryColor, { h: 120, l: -50 }), this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = this.git0 || this.primaryColor, this.git1 = this.git1 || this.secondaryColor, this.git2 = this.git2 || this.tertiaryColor, this.git3 = this.git3 || f(this.primaryColor, { h: -30 }), this.git4 = this.git4 || f(this.primaryColor, { h: -60 }), this.git5 = this.git5 || f(this.primaryColor, { h: -90 }), this.git6 = this.git6 || f(this.primaryColor, { h: 60 }), this.git7 = this.git7 || f(this.primaryColor, { h: 120 }), this.darkMode ? (this.git0 = _(this.git0, 25), this.git1 = _(this.git1, 25), this.git2 = _(this.git2, 25), this.git3 = _(this.git3, 25), this.git4 = _(this.git4, 25), this.git5 = _(this.git5, 25), this.git6 = _(this.git6, 25), this.git7 = _(this.git7, 25)) : (this.git0 = x(this.git0, 25), this.git1 = x(this.git1, 25), this.git2 = x(this.git2, 25), this.git3 = x(this.git3, 25), this.git4 = x(this.git4, 25), this.git5 = x(this.git5, 25), this.git6 = x(this.git6, 25), this.git7 = x(this.git7, 25)), this.gitInv0 = this.gitInv0 || p(this.git0), this.gitInv1 = this.gitInv1 || p(this.git1), this.gitInv2 = this.gitInv2 || p(this.git2), this.gitInv3 = this.gitInv3 || p(this.git3), this.gitInv4 = this.gitInv4 || p(this.git4), this.gitInv5 = this.gitInv5 || p(this.git5), this.gitInv6 = this.gitInv6 || p(this.git6), this.gitInv7 = this.gitInv7 || p(this.git7), this.gitBranchLabel0 = this.gitBranchLabel0 || p(this.labelTextColor), this.gitBranchLabel1 = this.gitBranchLabel1 || this.labelTextColor, this.gitBranchLabel2 = this.gitBranchLabel2 || this.labelTextColor, this.gitBranchLabel3 = this.gitBranchLabel3 || p(this.labelTextColor), this.gitBranchLabel4 = this.gitBranchLabel4 || this.labelTextColor, this.gitBranchLabel5 = this.gitBranchLabel5 || this.labelTextColor, this.gitBranchLabel6 = this.gitBranchLabel6 || this.labelTextColor, this.gitBranchLabel7 = this.gitBranchLabel7 || this.labelTextColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Ye, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Xe;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
};
const Vh = (t) => {
  const e = new Gh();
  return e.calculate(t), e;
};
class Yh {
  constructor() {
    this.primaryColor = "#eee", this.contrast = "#707070", this.secondaryColor = _(this.contrast, 55), this.background = "#ffffff", this.tertiaryColor = f(this.primaryColor, { h: -160 }), this.primaryBorderColor = H(this.primaryColor, this.darkMode), this.secondaryBorderColor = H(this.secondaryColor, this.darkMode), this.tertiaryBorderColor = H(this.tertiaryColor, this.darkMode), this.primaryTextColor = p(this.primaryColor), this.secondaryTextColor = p(this.secondaryColor), this.tertiaryTextColor = p(this.tertiaryColor), this.lineColor = p(this.background), this.textColor = p(this.background), this.mainBkg = "#eee", this.secondBkg = "calculated", this.lineColor = "#666", this.border1 = "#999", this.border2 = "calculated", this.note = "#ffa", this.text = "#333", this.critical = "#d42", this.done = "#bbb", this.arrowheadColor = "#333333", this.fontFamily = '"trebuchet ms", verdana, arial, sans-serif', this.fontSize = "16px", this.THEME_COLOR_LIMIT = 12, this.nodeBkg = "calculated", this.nodeBorder = "calculated", this.clusterBkg = "calculated", this.clusterBorder = "calculated", this.defaultLinkColor = "calculated", this.titleColor = "calculated", this.edgeLabelBackground = "white", this.actorBorder = "calculated", this.actorBkg = "calculated", this.actorTextColor = "calculated", this.actorLineColor = "calculated", this.signalColor = "calculated", this.signalTextColor = "calculated", this.labelBoxBkgColor = "calculated", this.labelBoxBorderColor = "calculated", this.labelTextColor = "calculated", this.loopTextColor = "calculated", this.noteBorderColor = "calculated", this.noteBkgColor = "calculated", this.noteTextColor = "calculated", this.activationBorderColor = "#666", this.activationBkgColor = "#f4f4f4", this.sequenceNumberColor = "white", this.sectionBkgColor = "calculated", this.altSectionBkgColor = "white", this.sectionBkgColor2 = "calculated", this.excludeBkgColor = "#eeeeee", this.taskBorderColor = "calculated", this.taskBkgColor = "calculated", this.taskTextLightColor = "white", this.taskTextColor = "calculated", this.taskTextDarkColor = "calculated", this.taskTextOutsideColor = "calculated", this.taskTextClickableColor = "#003163", this.activeTaskBorderColor = "calculated", this.activeTaskBkgColor = "calculated", this.gridColor = "calculated", this.doneTaskBkgColor = "calculated", this.doneTaskBorderColor = "calculated", this.critBkgColor = "calculated", this.critBorderColor = "calculated", this.todayLineColor = "calculated", this.personBorder = this.primaryBorderColor, this.personBkg = this.mainBkg, this.labelColor = "black", this.errorBkgColor = "#552222", this.errorTextColor = "#552222";
  }
  updateColors() {
    this.secondBkg = _(this.contrast, 55), this.border2 = this.contrast, this.actorBorder = _(this.border1, 23), this.actorBkg = this.mainBkg, this.actorTextColor = this.text, this.actorLineColor = this.lineColor, this.signalColor = this.text, this.signalTextColor = this.text, this.labelBoxBkgColor = this.actorBkg, this.labelBoxBorderColor = this.actorBorder, this.labelTextColor = this.text, this.loopTextColor = this.text, this.noteBorderColor = "#999", this.noteBkgColor = "#666", this.noteTextColor = "#fff", this.cScale0 = this.cScale0 || "#555", this.cScale1 = this.cScale1 || "#F4F4F4", this.cScale2 = this.cScale2 || "#555", this.cScale3 = this.cScale3 || "#BBB", this.cScale4 = this.cScale4 || "#777", this.cScale5 = this.cScale5 || "#999", this.cScale6 = this.cScale6 || "#DDD", this.cScale7 = this.cScale7 || "#FFF", this.cScale8 = this.cScale8 || "#DDD", this.cScale9 = this.cScale9 || "#BBB", this.cScale10 = this.cScale10 || "#999", this.cScale11 = this.cScale11 || "#777";
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleInv" + e] = this["cScaleInv" + e] || p(this["cScale" + e]);
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this.darkMode ? this["cScalePeer" + e] = this["cScalePeer" + e] || _(this["cScale" + e], 10) : this["cScalePeer" + e] = this["cScalePeer" + e] || x(this["cScale" + e], 10);
    this.scaleLabelColor = this.scaleLabelColor || (this.darkMode ? "black" : this.labelTextColor), this.cScaleLabel0 = this.cScaleLabel0 || this.cScale1, this.cScaleLabel2 = this.cScaleLabel2 || this.cScale1;
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["cScaleLabel" + e] = this["cScaleLabel" + e] || this.scaleLabelColor;
    for (let e = 0; e < 5; e++)
      this["surface" + e] = this["surface" + e] || f(this.mainBkg, { l: -(5 + e * 5) }), this["surfacePeer" + e] = this["surfacePeer" + e] || f(this.mainBkg, { l: -(8 + e * 5) });
    this.nodeBkg = this.mainBkg, this.nodeBorder = this.border1, this.clusterBkg = this.secondBkg, this.clusterBorder = this.border2, this.defaultLinkColor = this.lineColor, this.titleColor = this.text, this.sectionBkgColor = _(this.contrast, 30), this.sectionBkgColor2 = _(this.contrast, 30), this.taskBorderColor = x(this.contrast, 10), this.taskBkgColor = this.contrast, this.taskTextColor = this.taskTextLightColor, this.taskTextDarkColor = this.text, this.taskTextOutsideColor = this.taskTextDarkColor, this.activeTaskBorderColor = this.taskBorderColor, this.activeTaskBkgColor = this.mainBkg, this.gridColor = _(this.border1, 30), this.doneTaskBkgColor = this.done, this.doneTaskBorderColor = this.lineColor, this.critBkgColor = this.critical, this.critBorderColor = x(this.critBkgColor, 10), this.todayLineColor = this.critBkgColor, this.transitionColor = this.transitionColor || "#000", this.transitionLabelColor = this.transitionLabelColor || this.textColor, this.stateLabelColor = this.stateLabelColor || this.stateBkg || this.primaryTextColor, this.stateBkg = this.stateBkg || this.mainBkg, this.labelBackgroundColor = this.labelBackgroundColor || this.stateBkg, this.compositeBackground = this.compositeBackground || this.background || this.tertiaryColor, this.altBackground = this.altBackground || "#f4f4f4", this.compositeTitleBackground = this.compositeTitleBackground || this.mainBkg, this.stateBorder = this.stateBorder || "#000", this.innerEndBackground = this.primaryBorderColor, this.specialStateColor = "#222", this.errorBkgColor = this.errorBkgColor || this.tertiaryColor, this.errorTextColor = this.errorTextColor || this.tertiaryTextColor, this.classText = this.primaryTextColor, this.fillType0 = this.primaryColor, this.fillType1 = this.secondaryColor, this.fillType2 = f(this.primaryColor, { h: 64 }), this.fillType3 = f(this.secondaryColor, { h: 64 }), this.fillType4 = f(this.primaryColor, { h: -64 }), this.fillType5 = f(this.secondaryColor, { h: -64 }), this.fillType6 = f(this.primaryColor, { h: 128 }), this.fillType7 = f(this.secondaryColor, { h: 128 });
    for (let e = 0; e < this.THEME_COLOR_LIMIT; e++)
      this["pie" + e] = this["cScale" + e];
    this.pie12 = this.pie0, this.pieTitleTextSize = this.pieTitleTextSize || "25px", this.pieTitleTextColor = this.pieTitleTextColor || this.taskTextDarkColor, this.pieSectionTextSize = this.pieSectionTextSize || "17px", this.pieSectionTextColor = this.pieSectionTextColor || this.textColor, this.pieLegendTextSize = this.pieLegendTextSize || "17px", this.pieLegendTextColor = this.pieLegendTextColor || this.taskTextDarkColor, this.pieStrokeColor = this.pieStrokeColor || "black", this.pieStrokeWidth = this.pieStrokeWidth || "2px", this.pieOuterStrokeWidth = this.pieOuterStrokeWidth || "2px", this.pieOuterStrokeColor = this.pieOuterStrokeColor || "black", this.pieOpacity = this.pieOpacity || "0.7", this.requirementBackground = this.requirementBackground || this.primaryColor, this.requirementBorderColor = this.requirementBorderColor || this.primaryBorderColor, this.requirementBorderSize = this.requirementBorderSize || "1", this.requirementTextColor = this.requirementTextColor || this.primaryTextColor, this.relationColor = this.relationColor || this.lineColor, this.relationLabelBackground = this.relationLabelBackground || this.edgeLabelBackground, this.relationLabelColor = this.relationLabelColor || this.actorTextColor, this.git0 = x(this.pie1, 25) || this.primaryColor, this.git1 = this.pie2 || this.secondaryColor, this.git2 = this.pie3 || this.tertiaryColor, this.git3 = this.pie4 || f(this.primaryColor, { h: -30 }), this.git4 = this.pie5 || f(this.primaryColor, { h: -60 }), this.git5 = this.pie6 || f(this.primaryColor, { h: -90 }), this.git6 = this.pie7 || f(this.primaryColor, { h: 60 }), this.git7 = this.pie8 || f(this.primaryColor, { h: 120 }), this.gitInv0 = this.gitInv0 || p(this.git0), this.gitInv1 = this.gitInv1 || p(this.git1), this.gitInv2 = this.gitInv2 || p(this.git2), this.gitInv3 = this.gitInv3 || p(this.git3), this.gitInv4 = this.gitInv4 || p(this.git4), this.gitInv5 = this.gitInv5 || p(this.git5), this.gitInv6 = this.gitInv6 || p(this.git6), this.gitInv7 = this.gitInv7 || p(this.git7), this.branchLabelColor = this.branchLabelColor || this.labelTextColor, this.gitBranchLabel0 = this.branchLabelColor, this.gitBranchLabel1 = "white", this.gitBranchLabel2 = this.branchLabelColor, this.gitBranchLabel3 = "white", this.gitBranchLabel4 = this.branchLabelColor, this.gitBranchLabel5 = this.branchLabelColor, this.gitBranchLabel6 = this.branchLabelColor, this.gitBranchLabel7 = this.branchLabelColor, this.tagLabelColor = this.tagLabelColor || this.primaryTextColor, this.tagLabelBackground = this.tagLabelBackground || this.primaryColor, this.tagLabelBorder = this.tagBorder || this.primaryBorderColor, this.tagLabelFontSize = this.tagLabelFontSize || "10px", this.commitLabelColor = this.commitLabelColor || this.secondaryTextColor, this.commitLabelBackground = this.commitLabelBackground || this.secondaryColor, this.commitLabelFontSize = this.commitLabelFontSize || "10px", this.attributeBackgroundColorOdd = this.attributeBackgroundColorOdd || Ye, this.attributeBackgroundColorEven = this.attributeBackgroundColorEven || Xe;
  }
  calculate(e) {
    if (typeof e != "object") {
      this.updateColors();
      return;
    }
    const i = Object.keys(e);
    i.forEach((r) => {
      this[r] = e[r];
    }), this.updateColors(), i.forEach((r) => {
      this[r] = e[r];
    });
  }
}
const Xh = (t) => {
  const e = new Yh();
  return e.calculate(t), e;
}, Pt = {
  base: {
    getThemeVariables: Wh
  },
  dark: {
    getThemeVariables: Hh
  },
  default: {
    getThemeVariables: Uh
  },
  forest: {
    getThemeVariables: Vh
  },
  neutral: {
    getThemeVariables: Xh
  }
}, xt = {
  /**
   * Theme , the CSS style sheet
   *
   * | Parameter | Description     | Type   | Required | Values                                         |
   * | --------- | --------------- | ------ | -------- | ---------------------------------------------- |
   * | theme     | Built in Themes | string | Optional | 'default', 'forest', 'dark', 'neutral', 'null' |
   *
   * **Notes:** To disable any pre-defined mermaid theme, use "null".
   *
   * @example
   *
   * ```js
   * {
   *   "theme": "forest",
   *   "themeCSS": ".node rect { fill: red; }"
   * }
   * ```
   */
  theme: "default",
  themeVariables: Pt.default.getThemeVariables(),
  themeCSS: void 0,
  /* **maxTextSize** - The maximum allowed size of the users text diagram */
  maxTextSize: 5e4,
  darkMode: !1,
  /**
   * | Parameter  | Description                                            | Type   | Required | Values                      |
   * | ---------- | ------------------------------------------------------ | ------ | -------- | --------------------------- |
   * | fontFamily | specifies the font to be used in the rendered diagrams | string | Required | Any Possible CSS FontFamily |
   *
   * **Notes:** Default value: '"trebuchet ms", verdana, arial, sans-serif;'.
   */
  fontFamily: '"trebuchet ms", verdana, arial, sans-serif;',
  /**
   * | Parameter | Description                                           | Type             | Required | Values                                        |
   * | --------- | ----------------------------------------------------- | ---------------- | -------- | --------------------------------------------- |
   * | logLevel  | This option decides the amount of logging to be used. | string \| number | Required | 'trace','debug','info','warn','error','fatal' |
   *
   * **Notes:**
   *
   * - Trace: 0
   * - Debug: 1
   * - Info: 2
   * - Warn: 3
   * - Error: 4
   * - Fatal: 5 (default)
   */
  logLevel: 5,
  /**
   * | Parameter     | Description                       | Type   | Required | Values                                     |
   * | ------------- | --------------------------------- | ------ | -------- | ------------------------------------------ |
   * | securityLevel | Level of trust for parsed diagram | string | Required | 'sandbox', 'strict', 'loose', 'antiscript' |
   *
   * **Notes**:
   *
   * - **strict**: (**default**) tags in text are encoded, click functionality is disabled
   * - **loose**: tags in text are allowed, click functionality is enabled
   * - **antiscript**: html tags in text are allowed, (only script element is removed), click
   *   functionality is enabled
   * - **sandbox**: With this security level all rendering takes place in a sandboxed iframe. This
   *   prevent any JavaScript from running in the context. This may hinder interactive functionality
   *   of the diagram like scripts, popups in sequence diagram or links to other tabs/targets etc.
   */
  securityLevel: "strict",
  /**
   * | Parameter   | Description                                  | Type    | Required | Values      |
   * | ----------- | -------------------------------------------- | ------- | -------- | ----------- |
   * | startOnLoad | Dictates whether mermaid starts on Page load | boolean | Required | true, false |
   *
   * **Notes:** Default value: true
   */
  startOnLoad: !0,
  /**
   * | Parameter           | Description                                                                  | Type    | Required | Values      |
   * | ------------------- | ---------------------------------------------------------------------------- | ------- | -------- | ----------- |
   * | arrowMarkerAbsolute | Controls whether or arrow markers in html code are absolute paths or anchors | boolean | Required | true, false |
   *
   * **Notes**:
   *
   * This matters if you are using base tag settings.
   *
   * Default value: false
   */
  arrowMarkerAbsolute: !1,
  /**
   * This option controls which currentConfig keys are considered _secure_ and can only be changed
   * via call to mermaidAPI.initialize. Calls to mermaidAPI.reinitialize cannot make changes to the
   * `secure` keys in the current currentConfig. This prevents malicious graph directives from
   * overriding a site's default security.
   *
   * **Notes**:
   *
   * Default value: ['secure', 'securityLevel', 'startOnLoad', 'maxTextSize']
   */
  secure: ["secure", "securityLevel", "startOnLoad", "maxTextSize"],
  /**
   * This option controls if the generated ids of nodes in the SVG are generated randomly or based
   * on a seed. If set to false, the IDs are generated based on the current date and thus are not
   * deterministic. This is the default behavior.
   *
   * **Notes**:
   *
   * This matters if your files are checked into source control e.g. git and should not change unless
   * content is changed.
   *
   * Default value: false
   */
  deterministicIds: !1,
  /**
   * This option is the optional seed for deterministic ids. if set to undefined but
   * deterministicIds is true, a simple number iterator is used. You can set this attribute to base
   * the seed on a static string.
   */
  deterministicIDSeed: void 0,
  /** The object containing configurations specific for flowcharts */
  flowchart: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the flowchart     | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    /**
     * | Parameter      | Description                                     | Type    | Required | Values             |
     * | -------------- | ----------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramPadding | Amount of padding around the diagram as a whole | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * The amount of padding around the diagram as a whole so that embedded diagrams have margins,
     * expressed in pixels
     *
     * Default value: 8
     */
    diagramPadding: 8,
    /**
     * | Parameter  | Description                                                                                  | Type    | Required | Values      |
     * | ---------- | -------------------------------------------------------------------------------------------- | ------- | -------- | ----------- |
     * | htmlLabels | Flag for setting whether or not a html tag should be used for rendering labels on the edges. | boolean | Required | true, false |
     *
     * **Notes:** Default value: true.
     */
    htmlLabels: !0,
    /**
     * | Parameter   | Description                                         | Type    | Required | Values              |
     * | ----------- | --------------------------------------------------- | ------- | -------- | ------------------- |
     * | nodeSpacing | Defines the spacing between nodes on the same level | Integer | Required | Any positive Number |
     *
     * **Notes:**
     *
     * Pertains to horizontal spacing for TB (top to bottom) or BT (bottom to top) graphs, and the
     * vertical spacing for LR as well as RL graphs.**
     *
     * Default value: 50
     */
    nodeSpacing: 50,
    /**
     * | Parameter   | Description                                           | Type    | Required | Values              |
     * | ----------- | ----------------------------------------------------- | ------- | -------- | ------------------- |
     * | rankSpacing | Defines the spacing between nodes on different levels | Integer | Required | Any Positive Number |
     *
     * **Notes**:
     *
     * Pertains to vertical spacing for TB (top to bottom) or BT (bottom to top), and the horizontal
     * spacing for LR as well as RL graphs.
     *
     * Default value 50
     */
    rankSpacing: 50,
    /**
     * | Parameter | Description                                        | Type   | Required | Values                        |
     * | --------- | -------------------------------------------------- | ------ | -------- | ----------------------------- |
     * | curve     | Defines how mermaid renders curves for flowcharts. | string | Required | 'basis', 'linear', 'cardinal' |
     *
     * **Notes:**
     *
     * Default Value: 'basis'
     */
    curve: "basis",
    // Only used in new experimental rendering
    // represents the padding between the labels and the shape
    padding: 15,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter       | Description | Type    | Required | Values                  |
     * | --------------- | ----------- | ------- | -------- | ----------------------- |
     * | defaultRenderer | See notes   | boolean | 4        | dagre-d3, dagre-wrapper, elk |
     *
     * **Notes:**
     *
     * Decides which rendering engine that is to be used for the rendering. Legal values are:
     * dagre-d3 dagre-wrapper - wrapper for dagre implemented in mermaid, elk for layout using
     * elkjs
     *
     * Default value: 'dagre-wrapper'
     */
    defaultRenderer: "dagre-wrapper",
    /**
     * | Parameter       | Description | Type    | Required | Values                  |
     * | --------------- | ----------- | ------- | -------- | ----------------------- |
     * | wrappingWidth   | See notes   | number  | 4        | width of nodes where text is wrapped |
     *
     * **Notes:**
     *
     * When using markdown strings the text ius wrapped automatically, this
     * value sets the max width of a text before it continues on a new line.
     * Default value: 'dagre-wrapper'
     */
    wrappingWidth: 200
  },
  /** The object containing configurations specific for sequence diagrams */
  sequence: {
    hideUnusedParticipants: !1,
    /**
     * | Parameter       | Description                  | Type    | Required | Values             |
     * | --------------- | ---------------------------- | ------- | -------- | ------------------ |
     * | activationWidth | Width of the activation rect | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value :10
     */
    activationWidth: 10,
    /**
     * | Parameter      | Description                                          | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginX | Margin to the right and left of the sequence diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    diagramMarginX: 50,
    /**
     * | Parameter      | Description                                       | Type    | Required | Values             |
     * | -------------- | ------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginY | Margin to the over and under the sequence diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    diagramMarginY: 10,
    /**
     * | Parameter   | Description           | Type    | Required | Values             |
     * | ----------- | --------------------- | ------- | -------- | ------------------ |
     * | actorMargin | Margin between actors | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    actorMargin: 50,
    /**
     * | Parameter | Description          | Type    | Required | Values             |
     * | --------- | -------------------- | ------- | -------- | ------------------ |
     * | width     | Width of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 150
     */
    width: 150,
    /**
     * | Parameter | Description           | Type    | Required | Values             |
     * | --------- | --------------------- | ------- | -------- | ------------------ |
     * | height    | Height of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 65
     */
    height: 65,
    /**
     * | Parameter | Description              | Type    | Required | Values             |
     * | --------- | ------------------------ | ------- | -------- | ------------------ |
     * | boxMargin | Margin around loop boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    boxMargin: 10,
    /**
     * | Parameter     | Description                                  | Type    | Required | Values             |
     * | ------------- | -------------------------------------------- | ------- | -------- | ------------------ |
     * | boxTextMargin | Margin around the text in loop/alt/opt boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 5
     */
    boxTextMargin: 5,
    /**
     * | Parameter  | Description         | Type    | Required | Values             |
     * | ---------- | ------------------- | ------- | -------- | ------------------ |
     * | noteMargin | margin around notes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    noteMargin: 10,
    /**
     * | Parameter     | Description            | Type    | Required | Values             |
     * | ------------- | ---------------------- | ------- | -------- | ------------------ |
     * | messageMargin | Space between messages | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 35
     */
    messageMargin: 35,
    /**
     * | Parameter    | Description                 | Type   | Required | Values                    |
     * | ------------ | --------------------------- | ------ | -------- | ------------------------- |
     * | messageAlign | Multiline message alignment | string | Required | 'left', 'center', 'right' |
     *
     * **Notes:** Default value: 'center'
     */
    messageAlign: "center",
    /**
     * | Parameter    | Description                 | Type    | Required | Values      |
     * | ------------ | --------------------------- | ------- | -------- | ----------- |
     * | mirrorActors | Mirror actors under diagram | boolean | Required | true, false |
     *
     * **Notes:** Default value: true
     */
    mirrorActors: !0,
    /**
     * | Parameter  | Description                                                             | Type    | Required | Values      |
     * | ---------- | ----------------------------------------------------------------------- | ------- | -------- | ----------- |
     * | forceMenus | forces actor popup menus to always be visible (to support E2E testing). | Boolean | Required | True, False |
     *
     * **Notes:**
     *
     * Default value: false.
     */
    forceMenus: !1,
    /**
     * | Parameter       | Description                                | Type    | Required | Values             |
     * | --------------- | ------------------------------------------ | ------- | -------- | ------------------ |
     * | bottomMarginAdj | Prolongs the edge of the diagram downwards | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * Depending on css styling this might need adjustment.
     *
     * Default value: 1
     */
    bottomMarginAdj: 1,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:** When this flag is set to true, the height and width is set to 100% and is then
     * scaling with the available space. If set to false, the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter   | Description                          | Type    | Required | Values      |
     * | ----------- | ------------------------------------ | ------- | -------- | ----------- |
     * | rightAngles | display curve arrows as right angles | boolean | Required | true, false |
     *
     * **Notes:**
     *
     * This will display arrows that start and begin at the same node as right angles, rather than a
     * curve
     *
     * Default value: false
     */
    rightAngles: !1,
    /**
     * | Parameter           | Description                     | Type    | Required | Values      |
     * | ------------------- | ------------------------------- | ------- | -------- | ----------- |
     * | showSequenceNumbers | This will show the node numbers | boolean | Required | true, false |
     *
     * **Notes:** Default value: false
     */
    showSequenceNumbers: !1,
    /**
     * | Parameter     | Description                                        | Type    | Required | Values             |
     * | ------------- | -------------------------------------------------- | ------- | -------- | ------------------ |
     * | actorFontSize | This sets the font size of the actor's description | Integer | Require  | Any Positive Value |
     *
     * **Notes:** **Default value 14**..
     */
    actorFontSize: 14,
    /**
     * | Parameter       | Description                                          | Type   | Required | Values                      |
     * | --------------- | ---------------------------------------------------- | ------ | -------- | --------------------------- |
     * | actorFontFamily | This sets the font family of the actor's description | string | Required | Any Possible CSS FontFamily |
     *
     * **Notes:** Default value: "'Open Sans", sans-serif'
     */
    actorFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of the actor's description
     *
     * **Notes:** Default value: 400.
     */
    actorFontWeight: 400,
    /**
     * | Parameter    | Description                                     | Type    | Required | Values             |
     * | ------------ | ----------------------------------------------- | ------- | -------- | ------------------ |
     * | noteFontSize | This sets the font size of actor-attached notes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 14
     */
    noteFontSize: 14,
    /**
     * | Parameter      | Description                                        | Type   | Required | Values                      |
     * | -------------- | -------------------------------------------------- | ------ | -------- | --------------------------- |
     * | noteFontFamily | This sets the font family of actor-attached notes. | string | Required | Any Possible CSS FontFamily |
     *
     * **Notes:** Default value: ''"trebuchet ms", verdana, arial, sans-serif'
     */
    noteFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    /**
     * This sets the font weight of the note's description
     *
     * **Notes:** Default value: 400
     */
    noteFontWeight: 400,
    /**
     * | Parameter | Description                                          | Type   | Required | Values                    |
     * | --------- | ---------------------------------------------------- | ------ | -------- | ------------------------- |
     * | noteAlign | This sets the text alignment of actor-attached notes | string | required | 'left', 'center', 'right' |
     *
     * **Notes:** Default value: 'center'
     */
    noteAlign: "center",
    /**
     * | Parameter       | Description                               | Type    | Required | Values              |
     * | --------------- | ----------------------------------------- | ------- | -------- | ------------------- |
     * | messageFontSize | This sets the font size of actor messages | Integer | Required | Any Positive Number |
     *
     * **Notes:** Default value: 16
     */
    messageFontSize: 16,
    /**
     * | Parameter         | Description                                 | Type   | Required | Values                      |
     * | ----------------- | ------------------------------------------- | ------ | -------- | --------------------------- |
     * | messageFontFamily | This sets the font family of actor messages | string | Required | Any Possible CSS FontFamily |
     *
     * **Notes:** Default value: '"trebuchet ms", verdana, arial, sans-serif'
     */
    messageFontFamily: '"trebuchet ms", verdana, arial, sans-serif',
    /**
     * This sets the font weight of the message's description
     *
     * **Notes:** Default value: 400.
     */
    messageFontWeight: 400,
    /**
     * This sets the auto-wrap state for the diagram
     *
     * **Notes:** Default value: false.
     */
    wrap: !1,
    /**
     * This sets the auto-wrap padding for the diagram (sides only)
     *
     * **Notes:** Default value: 0.
     */
    wrapPadding: 10,
    /**
     * This sets the width of the loop-box (loop, alt, opt, par)
     *
     * **Notes:** Default value: 50.
     */
    labelBoxWidth: 50,
    /**
     * This sets the height of the loop-box (loop, alt, opt, par)
     *
     * **Notes:** Default value: 20.
     */
    labelBoxHeight: 20,
    messageFont: function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    },
    noteFont: function() {
      return {
        fontFamily: this.noteFontFamily,
        fontSize: this.noteFontSize,
        fontWeight: this.noteFontWeight
      };
    },
    actorFont: function() {
      return {
        fontFamily: this.actorFontFamily,
        fontSize: this.actorFontSize,
        fontWeight: this.actorFontWeight
      };
    }
  },
  /** The object containing configurations specific for gantt diagrams */
  gantt: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the gantt diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    /**
     * | Parameter | Description                         | Type    | Required | Values             |
     * | --------- | ----------------------------------- | ------- | -------- | ------------------ |
     * | barHeight | The height of the bars in the graph | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 20
     */
    barHeight: 20,
    /**
     * | Parameter | Description                                                      | Type    | Required | Values             |
     * | --------- | ---------------------------------------------------------------- | ------- | -------- | ------------------ |
     * | barGap    | The margin between the different activities in the gantt diagram | Integer | Optional | Any Positive Value |
     *
     * **Notes:** Default value: 4
     */
    barGap: 4,
    /**
     * | Parameter  | Description                                                                | Type    | Required | Values             |
     * | ---------- | -------------------------------------------------------------------------- | ------- | -------- | ------------------ |
     * | topPadding | Margin between title and gantt diagram and between axis and gantt diagram. | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    topPadding: 50,
    /**
     * | Parameter    | Description                                                             | Type    | Required | Values             |
     * | ------------ | ----------------------------------------------------------------------- | ------- | -------- | ------------------ |
     * | rightPadding | The space allocated for the section name to the right of the activities | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 75
     */
    rightPadding: 75,
    /**
     * | Parameter   | Description                                                            | Type    | Required | Values             |
     * | ----------- | ---------------------------------------------------------------------- | ------- | -------- | ------------------ |
     * | leftPadding | The space allocated for the section name to the left of the activities | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 75
     */
    leftPadding: 75,
    /**
     * | Parameter            | Description                                  | Type    | Required | Values             |
     * | -------------------- | -------------------------------------------- | ------- | -------- | ------------------ |
     * | gridLineStartPadding | Vertical starting position of the grid lines | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 35
     */
    gridLineStartPadding: 35,
    /**
     * | Parameter | Description | Type    | Required | Values             |
     * | --------- | ----------- | ------- | -------- | ------------------ |
     * | fontSize  | Font size   | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 11
     */
    fontSize: 11,
    /**
     * | Parameter       | Description            | Type    | Required | Values             |
     * | --------------- | ---------------------- | ------- | -------- | ------------------ |
     * | sectionFontSize | Font size for sections | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 11
     */
    sectionFontSize: 11,
    /**
     * | Parameter           | Description                              | Type    | Required | Values             |
     * | ------------------- | ---------------------------------------- | ------- | -------- | ------------------ |
     * | numberSectionStyles | The number of alternating section styles | Integer | 4        | Any Positive Value |
     *
     * **Notes:** Default value: 4
     */
    numberSectionStyles: 4,
    /**
     * | Parameter   | Description               | Type   | Required | Values    |
     * | ----------- | ------------------------- | ------ | -------- | --------- |
     * | displayMode | Controls the display mode | string | 4        | 'compact' |
     *
     * **Notes**:
     *
     * - **compact**: Enables displaying multiple tasks on the same row.
     */
    displayMode: "",
    /**
     * | Parameter  | Description                  | Type | Required | Values           |
     * | ---------- | ---------------------------- | ---- | -------- | ---------------- |
     * | axisFormat | Date/time format of the axis | 3    | Required | Date in yy-mm-dd |
     *
     * **Notes:**
     *
     * This might need adjustment to match your locale and preferences
     *
     * Default value: '%Y-%m-%d'.
     */
    axisFormat: "%Y-%m-%d",
    /**
     * | Parameter    | Description | Type   | Required | Values  |
     * | ------------ | ------------| ------ | -------- | ------- |
     * | tickInterval | axis ticks  | string | Optional | string  |
     *
     * **Notes:**
     *
     * Pattern is /^([1-9][0-9]*)(minute|hour|day|week|month)$/
     *
     * Default value: undefined
     */
    tickInterval: void 0,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter | Description | Type    | Required | Values      |
     * | --------- | ----------- | ------- | -------- | ----------- |
     * | topAxis   | See notes   | Boolean | 4        | True, False |
     *
     * **Notes:** when this flag is set date labels will be added to the top of the chart
     *
     * **Default value false**.
     */
    topAxis: !1,
    useWidth: void 0
  },
  /** The object containing configurations specific for journey diagrams */
  journey: {
    /**
     * | Parameter      | Description                                          | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginX | Margin to the right and left of the sequence diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    diagramMarginX: 50,
    /**
     * | Parameter      | Description                                        | Type    | Required | Values             |
     * | -------------- | -------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginY | Margin to the over and under the sequence diagram. | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    diagramMarginY: 10,
    /**
     * | Parameter   | Description           | Type    | Required | Values             |
     * | ----------- | --------------------- | ------- | -------- | ------------------ |
     * | actorMargin | Margin between actors | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    leftMargin: 150,
    /**
     * | Parameter | Description          | Type    | Required | Values             |
     * | --------- | -------------------- | ------- | -------- | ------------------ |
     * | width     | Width of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 150
     */
    width: 150,
    /**
     * | Parameter | Description           | Type    | Required | Values             |
     * | --------- | --------------------- | ------- | -------- | ------------------ |
     * | height    | Height of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 65
     */
    height: 50,
    /**
     * | Parameter | Description              | Type    | Required | Values             |
     * | --------- | ------------------------ | ------- | -------- | ------------------ |
     * | boxMargin | Margin around loop boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    boxMargin: 10,
    /**
     * | Parameter     | Description                                  | Type    | Required | Values             |
     * | ------------- | -------------------------------------------- | ------- | -------- | ------------------ |
     * | boxTextMargin | Margin around the text in loop/alt/opt boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 5
     */
    boxTextMargin: 5,
    /**
     * | Parameter  | Description         | Type    | Required | Values             |
     * | ---------- | ------------------- | ------- | -------- | ------------------ |
     * | noteMargin | Margin around notes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    noteMargin: 10,
    /**
     * | Parameter     | Description             | Type    | Required | Values             |
     * | ------------- | ----------------------- | ------- | -------- | ------------------ |
     * | messageMargin | Space between messages. | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * Space between messages.
     *
     * Default value: 35
     */
    messageMargin: 35,
    /**
     * | Parameter    | Description                 | Type | Required | Values                    |
     * | ------------ | --------------------------- | ---- | -------- | ------------------------- |
     * | messageAlign | Multiline message alignment | 3    | 4        | 'left', 'center', 'right' |
     *
     * **Notes:** Default value: 'center'
     */
    messageAlign: "center",
    /**
     * | Parameter       | Description                                | Type    | Required | Values             |
     * | --------------- | ------------------------------------------ | ------- | -------- | ------------------ |
     * | bottomMarginAdj | Prolongs the edge of the diagram downwards | Integer | 4        | Any Positive Value |
     *
     * **Notes:**
     *
     * Depending on css styling this might need adjustment.
     *
     * Default value: 1
     */
    bottomMarginAdj: 1,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter   | Description                       | Type | Required | Values      |
     * | ----------- | --------------------------------- | ---- | -------- | ----------- |
     * | rightAngles | Curved Arrows become Right Angles | 3    | 4        | true, false |
     *
     * **Notes:**
     *
     * This will display arrows that start and begin at the same node as right angles, rather than a
     * curves
     *
     * Default value: false
     */
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    // width of activation box
    activationWidth: 10,
    // text placement as: tspan | fo | old only text as before
    textPlacement: "fo",
    actorColours: ["#8FBC8F", "#7CFC00", "#00FFFF", "#20B2AA", "#B0E0E6", "#FFFFE0"],
    sectionFills: ["#191970", "#8B008B", "#4B0082", "#2F4F4F", "#800000", "#8B4513", "#00008B"],
    sectionColours: ["#fff"]
  },
  /** The object containing configurations specific for timeline diagrams */
  timeline: {
    /**
     * | Parameter      | Description                                          | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginX | Margin to the right and left of the sequence diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    diagramMarginX: 50,
    /**
     * | Parameter      | Description                                        | Type    | Required | Values             |
     * | -------------- | -------------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginY | Margin to the over and under the sequence diagram. | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    diagramMarginY: 10,
    /**
     * | Parameter   | Description           | Type    | Required | Values             |
     * | ----------- | --------------------- | ------- | -------- | ------------------ |
     * | actorMargin | Margin between actors | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    leftMargin: 150,
    /**
     * | Parameter | Description          | Type    | Required | Values             |
     * | --------- | -------------------- | ------- | -------- | ------------------ |
     * | width     | Width of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 150
     */
    width: 150,
    /**
     * | Parameter | Description           | Type    | Required | Values             |
     * | --------- | --------------------- | ------- | -------- | ------------------ |
     * | height    | Height of actor boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 65
     */
    height: 50,
    /**
     * | Parameter | Description              | Type    | Required | Values             |
     * | --------- | ------------------------ | ------- | -------- | ------------------ |
     * | boxMargin | Margin around loop boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    boxMargin: 10,
    /**
     * | Parameter     | Description                                  | Type    | Required | Values             |
     * | ------------- | -------------------------------------------- | ------- | -------- | ------------------ |
     * | boxTextMargin | Margin around the text in loop/alt/opt boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 5
     */
    boxTextMargin: 5,
    /**
     * | Parameter  | Description         | Type    | Required | Values             |
     * | ---------- | ------------------- | ------- | -------- | ------------------ |
     * | noteMargin | Margin around notes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    noteMargin: 10,
    /**
     * | Parameter     | Description             | Type    | Required | Values             |
     * | ------------- | ----------------------- | ------- | -------- | ------------------ |
     * | messageMargin | Space between messages. | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * Space between messages.
     *
     * Default value: 35
     */
    messageMargin: 35,
    /**
     * | Parameter    | Description                 | Type | Required | Values                    |
     * | ------------ | --------------------------- | ---- | -------- | ------------------------- |
     * | messageAlign | Multiline message alignment | 3    | 4        | 'left', 'center', 'right' |
     *
     * **Notes:** Default value: 'center'
     */
    messageAlign: "center",
    /**
     * | Parameter       | Description                                | Type    | Required | Values             |
     * | --------------- | ------------------------------------------ | ------- | -------- | ------------------ |
     * | bottomMarginAdj | Prolongs the edge of the diagram downwards | Integer | 4        | Any Positive Value |
     *
     * **Notes:**
     *
     * Depending on css styling this might need adjustment.
     *
     * Default value: 1
     */
    bottomMarginAdj: 1,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter   | Description                       | Type | Required | Values      |
     * | ----------- | --------------------------------- | ---- | -------- | ----------- |
     * | rightAngles | Curved Arrows become Right Angles | 3    | 4        | true, false |
     *
     * **Notes:**
     *
     * This will display arrows that start and begin at the same node as right angles, rather than a
     * curves
     *
     * Default value: false
     */
    rightAngles: !1,
    taskFontSize: 14,
    taskFontFamily: '"Open Sans", sans-serif',
    taskMargin: 50,
    // width of activation box
    activationWidth: 10,
    // text placement as: tspan | fo | old only text as before
    textPlacement: "fo",
    actorColours: ["#8FBC8F", "#7CFC00", "#00FFFF", "#20B2AA", "#B0E0E6", "#FFFFE0"],
    sectionFills: ["#191970", "#8B008B", "#4B0082", "#2F4F4F", "#800000", "#8B4513", "#00008B"],
    sectionColours: ["#fff"],
    disableMulticolor: !1
  },
  class: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the class diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    arrowMarkerAbsolute: !1,
    dividerMargin: 10,
    padding: 5,
    textHeight: 10,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter       | Description | Type    | Required | Values                  |
     * | --------------- | ----------- | ------- | -------- | ----------------------- |
     * | defaultRenderer | See notes   | boolean | 4        | dagre-d3, dagre-wrapper |
     *
     * **Notes**:
     *
     * Decides which rendering engine that is to be used for the rendering. Legal values are:
     * dagre-d3 dagre-wrapper - wrapper for dagre implemented in mermaid
     *
     * Default value: 'dagre-d3'
     */
    defaultRenderer: "dagre-wrapper"
  },
  state: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the state diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    dividerMargin: 10,
    sizeUnit: 5,
    padding: 8,
    textHeight: 10,
    titleShift: -15,
    noteMargin: 10,
    forkWidth: 70,
    forkHeight: 7,
    // Used
    miniPadding: 2,
    // Font size factor, this is used to guess the width of the edges labels before rendering by dagre
    // layout. This might need updating if/when switching font
    fontSizeFactor: 5.02,
    fontSize: 24,
    labelHeight: 16,
    edgeLengthFactor: "20",
    compositTitleSize: 35,
    radius: 5,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See notes   | boolean | 4        | true, false |
     *
     * **Notes:**
     *
     * When this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter       | Description | Type    | Required | Values                  |
     * | --------------- | ----------- | ------- | -------- | ----------------------- |
     * | defaultRenderer | See notes   | boolean | 4        | dagre-d3, dagre-wrapper |
     *
     * **Notes:**
     *
     * Decides which rendering engine that is to be used for the rendering. Legal values are:
     * dagre-d3 dagre-wrapper - wrapper for dagre implemented in mermaid
     *
     * Default value: 'dagre-d3'
     */
    defaultRenderer: "dagre-wrapper"
  },
  /** The object containing configurations specific for entity relationship diagrams */
  er: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the diagram       | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    /**
     * | Parameter      | Description                                     | Type    | Required | Values             |
     * | -------------- | ----------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramPadding | Amount of padding around the diagram as a whole | Integer | Required | Any Positive Value |
     *
     * **Notes:**
     *
     * The amount of padding around the diagram as a whole so that embedded diagrams have margins,
     * expressed in pixels
     *
     * Default value: 20
     */
    diagramPadding: 20,
    /**
     * | Parameter       | Description                              | Type   | Required | Values                 |
     * | --------------- | ---------------------------------------- | ------ | -------- | ---------------------- |
     * | layoutDirection | Directional bias for layout of entities. | string | Required | "TB", "BT", "LR", "RL" |
     *
     * **Notes:**
     *
     * 'TB' for Top-Bottom, 'BT'for Bottom-Top, 'LR' for Left-Right, or 'RL' for Right to Left.
     *
     * T = top, B = bottom, L = left, and R = right.
     *
     * Default value: 'TB'
     */
    layoutDirection: "TB",
    /**
     * | Parameter      | Description                        | Type    | Required | Values             |
     * | -------------- | ---------------------------------- | ------- | -------- | ------------------ |
     * | minEntityWidth | The minimum width of an entity box | Integer | Required | Any Positive Value |
     *
     * **Notes:** Expressed in pixels. Default value: 100
     */
    minEntityWidth: 100,
    /**
     * | Parameter       | Description                         | Type    | Required | Values             |
     * | --------------- | ----------------------------------- | ------- | -------- | ------------------ |
     * | minEntityHeight | The minimum height of an entity box | Integer | 4        | Any Positive Value |
     *
     * **Notes:** Expressed in pixels Default value: 75
     */
    minEntityHeight: 75,
    /**
     * | Parameter     | Description                                                  | Type    | Required | Values             |
     * | ------------- | ------------------------------------------------------------ | ------- | -------- | ------------------ |
     * | entityPadding | Minimum internal padding between text in box and box borders | Integer | 4        | Any Positive Value |
     *
     * **Notes:**
     *
     * The minimum internal padding between text in an entity box and the enclosing box borders,
     * expressed in pixels.
     *
     * Default value: 15
     */
    entityPadding: 15,
    /**
     * | Parameter | Description                         | Type   | Required | Values               |
     * | --------- | ----------------------------------- | ------ | -------- | -------------------- |
     * | stroke    | Stroke color of box edges and lines | string | 4        | Any recognized color |
     *
     * **Notes:** Default value: 'gray'
     */
    stroke: "gray",
    /**
     * | Parameter | Description                | Type   | Required | Values               |
     * | --------- | -------------------------- | ------ | -------- | -------------------- |
     * | fill      | Fill color of entity boxes | string | 4        | Any recognized color |
     *
     * **Notes:** Default value: 'honeydew'
     */
    fill: "honeydew",
    /**
     * | Parameter | Description         | Type    | Required | Values             |
     * | --------- | ------------------- | ------- | -------- | ------------------ |
     * | fontSize  | Font Size in pixels | Integer |          | Any Positive Value |
     *
     * **Notes:**
     *
     * Font size (expressed as an integer representing a number of pixels) Default value: 12
     */
    fontSize: 12,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:**
     *
     * When this flag is set to true, the diagram width is locked to 100% and scaled based on
     * available space. If set to false, the diagram reserves its absolute width.
     *
     * Default value: true
     */
    useMaxWidth: !0
  },
  /** The object containing configurations specific for pie diagrams */
  pie: {
    useWidth: void 0,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:**
     *
     * When this flag is set to true, the diagram width is locked to 100% and scaled based on
     * available space. If set to false, the diagram reserves its absolute width.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter    | Description                                                                      | Type    | Required | Values              |
     * | ------------ | -------------------------------------------------------------------------------- | ------- | -------- | ------------------- |
     * | textPosition | Axial position of slice's label from zero at the center to 1 at the outside edge | Number  | Optional | Decimal from 0 to 1 |
     *
     * **Notes:** Default value: 0.75
     */
    textPosition: 0.75
  },
  /** The object containing configurations specific for req diagrams */
  requirement: {
    useWidth: void 0,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:**
     *
     * When this flag is set to true, the diagram width is locked to 100% and scaled based on
     * available space. If set to false, the diagram reserves its absolute width.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    rect_fill: "#f9f9f9",
    text_color: "#333",
    rect_border_size: "0.5px",
    rect_border_color: "#bbb",
    rect_min_width: 200,
    rect_min_height: 200,
    fontSize: 14,
    rect_padding: 10,
    line_height: 20
  },
  gitGraph: {
    /**
     * ### titleTopMargin
     *
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | titleTopMargin | Margin top for the text over the Git diagram   | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 25
     */
    titleTopMargin: 25,
    diagramPadding: 8,
    nodeLabel: {
      width: 75,
      height: 100,
      x: -25,
      y: 0
    },
    mainBranchName: "main",
    mainBranchOrder: 0,
    showCommitLabel: !0,
    showBranches: !0,
    rotateCommitLabel: !0
  },
  /** The object containing configurations specific for c4 diagrams */
  c4: {
    useWidth: void 0,
    /**
     * | Parameter      | Description                                    | Type    | Required | Values             |
     * | -------------- | ---------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginX | Margin to the right and left of the c4 diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    diagramMarginX: 50,
    /**
     * | Parameter      | Description                                 | Type    | Required | Values             |
     * | -------------- | ------------------------------------------- | ------- | -------- | ------------------ |
     * | diagramMarginY | Margin to the over and under the c4 diagram | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    diagramMarginY: 10,
    /**
     * | Parameter     | Description           | Type    | Required | Values             |
     * | ------------- | --------------------- | ------- | -------- | ------------------ |
     * | c4ShapeMargin | Margin between shapes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 50
     */
    c4ShapeMargin: 50,
    /**
     * | Parameter      | Description            | Type    | Required | Values             |
     * | -------------- | ---------------------- | ------- | -------- | ------------------ |
     * | c4ShapePadding | Padding between shapes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 20
     */
    c4ShapePadding: 20,
    /**
     * | Parameter | Description           | Type    | Required | Values             |
     * | --------- | --------------------- | ------- | -------- | ------------------ |
     * | width     | Width of person boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 216
     */
    width: 216,
    /**
     * | Parameter | Description            | Type    | Required | Values             |
     * | --------- | ---------------------- | ------- | -------- | ------------------ |
     * | height    | Height of person boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 60
     */
    height: 60,
    /**
     * | Parameter | Description         | Type    | Required | Values             |
     * | --------- | ------------------- | ------- | -------- | ------------------ |
     * | boxMargin | Margin around boxes | Integer | Required | Any Positive Value |
     *
     * **Notes:** Default value: 10
     */
    boxMargin: 10,
    /**
     * | Parameter   | Description | Type    | Required | Values      |
     * | ----------- | ----------- | ------- | -------- | ----------- |
     * | useMaxWidth | See Notes   | boolean | Required | true, false |
     *
     * **Notes:** When this flag is set to true, the height and width is set to 100% and is then
     * scaling with the available space. If set to false, the absolute space required is used.
     *
     * Default value: true
     */
    useMaxWidth: !0,
    /**
     * | Parameter    | Description | Type    | Required | Values             |
     * | ------------ | ----------- | ------- | -------- | ------------------ |
     * | c4ShapeInRow | See Notes   | Integer | Required | Any Positive Value |
     *
     * **Notes:** How many shapes to place in each row.
     *
     * Default value: 4
     */
    c4ShapeInRow: 4,
    nextLinePaddingX: 0,
    /**
     * | Parameter       | Description | Type    | Required | Values             |
     * | --------------- | ----------- | ------- | -------- | ------------------ |
     * | c4BoundaryInRow | See Notes   | Integer | Required | Any Positive Value |
     *
     * **Notes:** How many boundaries to place in each row.
     *
     * Default value: 2
     */
    c4BoundaryInRow: 2,
    /**
     * This sets the font size of Person shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    personFontSize: 14,
    /**
     * This sets the font family of Person shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    personFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Person shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    personFontWeight: "normal",
    /**
     * This sets the font size of External Person shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_personFontSize: 14,
    /**
     * This sets the font family of External Person shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_personFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Person shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_personFontWeight: "normal",
    /**
     * This sets the font size of System shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    systemFontSize: 14,
    /**
     * This sets the font family of System shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    systemFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of System shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    systemFontWeight: "normal",
    /**
     * This sets the font size of External System shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_systemFontSize: 14,
    /**
     * This sets the font family of External System shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_systemFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External System shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_systemFontWeight: "normal",
    /**
     * This sets the font size of System DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    system_dbFontSize: 14,
    /**
     * This sets the font family of System DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    system_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of System DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    system_dbFontWeight: "normal",
    /**
     * This sets the font size of External System DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_system_dbFontSize: 14,
    /**
     * This sets the font family of External System DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_system_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External System DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_system_dbFontWeight: "normal",
    /**
     * This sets the font size of System Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    system_queueFontSize: 14,
    /**
     * This sets the font family of System Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    system_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of System Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    system_queueFontWeight: "normal",
    /**
     * This sets the font size of External System Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_system_queueFontSize: 14,
    /**
     * This sets the font family of External System Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_system_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External System Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_system_queueFontWeight: "normal",
    /**
     * This sets the font size of Boundary shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    boundaryFontSize: 14,
    /**
     * This sets the font family of Boundary shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    boundaryFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Boundary shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    boundaryFontWeight: "normal",
    /**
     * This sets the font size of Message shape for the diagram
     *
     * **Notes:** Default value: 12.
     */
    messageFontSize: 12,
    /**
     * This sets the font family of Message shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    messageFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Message shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    messageFontWeight: "normal",
    /**
     * This sets the font size of Container shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    containerFontSize: 14,
    /**
     * This sets the font family of Container shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    containerFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Container shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    containerFontWeight: "normal",
    /**
     * This sets the font size of External Container shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_containerFontSize: 14,
    /**
     * This sets the font family of External Container shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_containerFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Container shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_containerFontWeight: "normal",
    /**
     * This sets the font size of Container DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    container_dbFontSize: 14,
    /**
     * This sets the font family of Container DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    container_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Container DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    container_dbFontWeight: "normal",
    /**
     * This sets the font size of External Container DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_container_dbFontSize: 14,
    /**
     * This sets the font family of External Container DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_container_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Container DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_container_dbFontWeight: "normal",
    /**
     * This sets the font size of Container Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    container_queueFontSize: 14,
    /**
     * This sets the font family of Container Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    container_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Container Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    container_queueFontWeight: "normal",
    /**
     * This sets the font size of External Container Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_container_queueFontSize: 14,
    /**
     * This sets the font family of External Container Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_container_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Container Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_container_queueFontWeight: "normal",
    /**
     * This sets the font size of Component shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    componentFontSize: 14,
    /**
     * This sets the font family of Component shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    componentFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Component shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    componentFontWeight: "normal",
    /**
     * This sets the font size of External Component shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_componentFontSize: 14,
    /**
     * This sets the font family of External Component shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_componentFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Component shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_componentFontWeight: "normal",
    /**
     * This sets the font size of Component DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    component_dbFontSize: 14,
    /**
     * This sets the font family of Component DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    component_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Component DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    component_dbFontWeight: "normal",
    /**
     * This sets the font size of External Component DB shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_component_dbFontSize: 14,
    /**
     * This sets the font family of External Component DB shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_component_dbFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Component DB shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_component_dbFontWeight: "normal",
    /**
     * This sets the font size of Component Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    component_queueFontSize: 14,
    /**
     * This sets the font family of Component Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    component_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of Component Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    component_queueFontWeight: "normal",
    /**
     * This sets the font size of External Component Queue shape for the diagram
     *
     * **Notes:** Default value: 14.
     */
    external_component_queueFontSize: 14,
    /**
     * This sets the font family of External Component Queue shape for the diagram
     *
     * **Notes:** Default value: "Open Sans", sans-serif.
     */
    external_component_queueFontFamily: '"Open Sans", sans-serif',
    /**
     * This sets the font weight of External Component Queue shape for the diagram
     *
     * **Notes:** Default value: normal.
     */
    external_component_queueFontWeight: "normal",
    /**
     * This sets the auto-wrap state for the diagram
     *
     * **Notes:** Default value: true.
     */
    wrap: !0,
    /**
     * This sets the auto-wrap padding for the diagram (sides only)
     *
     * **Notes:** Default value: 0.
     */
    wrapPadding: 10,
    personFont: function() {
      return {
        fontFamily: this.personFontFamily,
        fontSize: this.personFontSize,
        fontWeight: this.personFontWeight
      };
    },
    external_personFont: function() {
      return {
        fontFamily: this.external_personFontFamily,
        fontSize: this.external_personFontSize,
        fontWeight: this.external_personFontWeight
      };
    },
    systemFont: function() {
      return {
        fontFamily: this.systemFontFamily,
        fontSize: this.systemFontSize,
        fontWeight: this.systemFontWeight
      };
    },
    external_systemFont: function() {
      return {
        fontFamily: this.external_systemFontFamily,
        fontSize: this.external_systemFontSize,
        fontWeight: this.external_systemFontWeight
      };
    },
    system_dbFont: function() {
      return {
        fontFamily: this.system_dbFontFamily,
        fontSize: this.system_dbFontSize,
        fontWeight: this.system_dbFontWeight
      };
    },
    external_system_dbFont: function() {
      return {
        fontFamily: this.external_system_dbFontFamily,
        fontSize: this.external_system_dbFontSize,
        fontWeight: this.external_system_dbFontWeight
      };
    },
    system_queueFont: function() {
      return {
        fontFamily: this.system_queueFontFamily,
        fontSize: this.system_queueFontSize,
        fontWeight: this.system_queueFontWeight
      };
    },
    external_system_queueFont: function() {
      return {
        fontFamily: this.external_system_queueFontFamily,
        fontSize: this.external_system_queueFontSize,
        fontWeight: this.external_system_queueFontWeight
      };
    },
    containerFont: function() {
      return {
        fontFamily: this.containerFontFamily,
        fontSize: this.containerFontSize,
        fontWeight: this.containerFontWeight
      };
    },
    external_containerFont: function() {
      return {
        fontFamily: this.external_containerFontFamily,
        fontSize: this.external_containerFontSize,
        fontWeight: this.external_containerFontWeight
      };
    },
    container_dbFont: function() {
      return {
        fontFamily: this.container_dbFontFamily,
        fontSize: this.container_dbFontSize,
        fontWeight: this.container_dbFontWeight
      };
    },
    external_container_dbFont: function() {
      return {
        fontFamily: this.external_container_dbFontFamily,
        fontSize: this.external_container_dbFontSize,
        fontWeight: this.external_container_dbFontWeight
      };
    },
    container_queueFont: function() {
      return {
        fontFamily: this.container_queueFontFamily,
        fontSize: this.container_queueFontSize,
        fontWeight: this.container_queueFontWeight
      };
    },
    external_container_queueFont: function() {
      return {
        fontFamily: this.external_container_queueFontFamily,
        fontSize: this.external_container_queueFontSize,
        fontWeight: this.external_container_queueFontWeight
      };
    },
    componentFont: function() {
      return {
        fontFamily: this.componentFontFamily,
        fontSize: this.componentFontSize,
        fontWeight: this.componentFontWeight
      };
    },
    external_componentFont: function() {
      return {
        fontFamily: this.external_componentFontFamily,
        fontSize: this.external_componentFontSize,
        fontWeight: this.external_componentFontWeight
      };
    },
    component_dbFont: function() {
      return {
        fontFamily: this.component_dbFontFamily,
        fontSize: this.component_dbFontSize,
        fontWeight: this.component_dbFontWeight
      };
    },
    external_component_dbFont: function() {
      return {
        fontFamily: this.external_component_dbFontFamily,
        fontSize: this.external_component_dbFontSize,
        fontWeight: this.external_component_dbFontWeight
      };
    },
    component_queueFont: function() {
      return {
        fontFamily: this.component_queueFontFamily,
        fontSize: this.component_queueFontSize,
        fontWeight: this.component_queueFontWeight
      };
    },
    external_component_queueFont: function() {
      return {
        fontFamily: this.external_component_queueFontFamily,
        fontSize: this.external_component_queueFontSize,
        fontWeight: this.external_component_queueFontWeight
      };
    },
    boundaryFont: function() {
      return {
        fontFamily: this.boundaryFontFamily,
        fontSize: this.boundaryFontSize,
        fontWeight: this.boundaryFontWeight
      };
    },
    messageFont: function() {
      return {
        fontFamily: this.messageFontFamily,
        fontSize: this.messageFontSize,
        fontWeight: this.messageFontWeight
      };
    },
    // ' Colors
    // ' ##################################
    person_bg_color: "#08427B",
    person_border_color: "#073B6F",
    external_person_bg_color: "#686868",
    external_person_border_color: "#8A8A8A",
    system_bg_color: "#1168BD",
    system_border_color: "#3C7FC0",
    system_db_bg_color: "#1168BD",
    system_db_border_color: "#3C7FC0",
    system_queue_bg_color: "#1168BD",
    system_queue_border_color: "#3C7FC0",
    external_system_bg_color: "#999999",
    external_system_border_color: "#8A8A8A",
    external_system_db_bg_color: "#999999",
    external_system_db_border_color: "#8A8A8A",
    external_system_queue_bg_color: "#999999",
    external_system_queue_border_color: "#8A8A8A",
    container_bg_color: "#438DD5",
    container_border_color: "#3C7FC0",
    container_db_bg_color: "#438DD5",
    container_db_border_color: "#3C7FC0",
    container_queue_bg_color: "#438DD5",
    container_queue_border_color: "#3C7FC0",
    external_container_bg_color: "#B3B3B3",
    external_container_border_color: "#A6A6A6",
    external_container_db_bg_color: "#B3B3B3",
    external_container_db_border_color: "#A6A6A6",
    external_container_queue_bg_color: "#B3B3B3",
    external_container_queue_border_color: "#A6A6A6",
    component_bg_color: "#85BBF0",
    component_border_color: "#78A8D8",
    component_db_bg_color: "#85BBF0",
    component_db_border_color: "#78A8D8",
    component_queue_bg_color: "#85BBF0",
    component_queue_border_color: "#78A8D8",
    external_component_bg_color: "#CCCCCC",
    external_component_border_color: "#BFBFBF",
    external_component_db_bg_color: "#CCCCCC",
    external_component_db_border_color: "#BFBFBF",
    external_component_queue_bg_color: "#CCCCCC",
    external_component_queue_border_color: "#BFBFBF"
  },
  mindmap: {
    useMaxWidth: !0,
    padding: 10,
    maxNodeWidth: 200
  },
  fontSize: 16
};
xt.class && (xt.class.arrowMarkerAbsolute = xt.arrowMarkerAbsolute);
xt.gitGraph && (xt.gitGraph.arrowMarkerAbsolute = xt.arrowMarkerAbsolute);
const Ao = (t, e = "") => Object.keys(t).reduce((i, r) => Array.isArray(t[r]) ? i : typeof t[r] == "object" && t[r] !== null ? [...i, e + r, ...Ao(t[r], "")] : [...i, e + r], []), ac = Ao(xt, ""), Kh = xt, Di = function(t, e, i) {
  const { depth: r, clobber: o } = Object.assign({ depth: 2, clobber: !1 }, i);
  return Array.isArray(e) && !Array.isArray(t) ? (e.forEach((n) => Di(t, n, i)), t) : Array.isArray(e) && Array.isArray(t) ? (e.forEach((n) => {
    t.includes(n) || t.push(n);
  }), t) : t === void 0 || r <= 0 ? t != null && typeof t == "object" && typeof e == "object" ? Object.assign(t, e) : e : (e !== void 0 && typeof t == "object" && typeof e == "object" && Object.keys(e).forEach((n) => {
    typeof e[n] == "object" && (t[n] === void 0 || typeof t[n] == "object") ? (t[n] === void 0 && (t[n] = Array.isArray(e[n]) ? [] : {}), t[n] = Di(t[n], e[n], { depth: r - 1, clobber: o })) : (o || typeof t[n] != "object" && typeof e[n] != "object") && (t[n] = e[n]);
  }), t);
}, Y = Di, Gi = Object.freeze(Kh);
let V = Y({}, Gi), Mo, Gt = [], re = Y({}, Gi);
const Ke = (t, e) => {
  let i = Y({}, t), r = {};
  for (const o of e)
    Io(o), r = Y(r, o);
  if (i = Y(i, r), r.theme && r.theme in Pt) {
    const o = Y({}, Mo), n = Y(
      o.themeVariables || {},
      r.themeVariables
    );
    i.theme && i.theme in Pt && (i.themeVariables = Pt[i.theme].getThemeVariables(n));
  }
  return re = i, No(re), re;
}, lc = (t) => (V = Y({}, Gi), V = Y(V, t), t.theme && Pt[t.theme] && (V.themeVariables = Pt[t.theme].getThemeVariables(t.themeVariables)), Ke(V, Gt), V), hc = (t) => {
  Mo = Y({}, t);
}, cc = (t) => (V = Y(V, t), Ke(V, Gt), V), uc = () => Y({}, V), fc = (t) => (No(t), Y(re, t), Oo()), Oo = () => Y({}, re), Io = (t) => {
  ["secure", ...V.secure ?? []].forEach((e) => {
    t[e] !== void 0 && (G.debug(`Denied attempt to modify a secure key ${e}`, t[e]), delete t[e]);
  }), Object.keys(t).forEach((e) => {
    e.indexOf("__") === 0 && delete t[e];
  }), Object.keys(t).forEach((e) => {
    typeof t[e] == "string" && (t[e].includes("<") || t[e].includes(">") || t[e].includes("url(data:")) && delete t[e], typeof t[e] == "object" && Io(t[e]);
  });
}, dc = (t) => {
  t.fontFamily && (t.themeVariables ? t.themeVariables.fontFamily || (t.themeVariables = { fontFamily: t.fontFamily }) : t.themeVariables = { fontFamily: t.fontFamily }), Gt.push(t), Ke(V, Gt);
}, gc = (t = V) => {
  Gt = [], Ke(t, Gt);
};
var Do = /* @__PURE__ */ ((t) => (t.LAZY_LOAD_DEPRECATED = "The configuration options lazyLoadedDiagrams and loadExternalDiagramsAtStartup are deprecated. Please use registerExternalDiagrams instead.", t))(Do || {});
const Ur = {}, Zh = (t) => {
  Ur[t] || (G.warn(Do[t]), Ur[t] = !0);
}, No = (t) => {
  t && (t.lazyLoadedDiagrams || t.loadExternalDiagramsAtStartup) && Zh("LAZY_LOAD_DEPRECATED");
};
let Vi = "", Ze = "", Yi = "";
const Xi = (t) => We(t, Oo()), $o = function() {
  Vi = "", Yi = "", Ze = "";
}, Ro = function(t) {
  Vi = Xi(t).replace(/^\s+/g, "");
}, zo = function() {
  return Vi || Ze;
}, Wo = function(t) {
  Yi = Xi(t).replace(/\n\s+/g, `
`);
}, Po = function() {
  return Yi;
}, Ho = function(t) {
  Ze = Xi(t);
}, qo = function() {
  return Ze;
}, jh = {
  getAccTitle: zo,
  setAccTitle: Ro,
  getDiagramTitle: qo,
  setDiagramTitle: Ho,
  getAccDescription: Po,
  setAccDescription: Wo,
  clear: $o
}, pc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear: $o,
  default: jh,
  getAccDescription: Po,
  getAccTitle: zo,
  getDiagramTitle: qo,
  setAccDescription: Wo,
  setAccTitle: Ro,
  setDiagramTitle: Ho
}, Symbol.toStringTag, { value: "Module" }));
export {
  $o as A,
  lo as B,
  Fn as C,
  Ch as D,
  Wi as E,
  ho as F,
  he as G,
  fa as H,
  Pi as I,
  bt as J,
  se as K,
  Er as L,
  ba as M,
  fo as N,
  ec as O,
  Ct as P,
  cn as Q,
  X as R,
  K as S,
  $ as T,
  _ as U,
  x as V,
  ke as W,
  pt as X,
  yt as Y,
  T as _,
  dc as a,
  We as b,
  pc as c,
  Y as d,
  ac as e,
  ic as f,
  Oo as g,
  tc as h,
  fc as i,
  uc as j,
  Gi as k,
  G as l,
  mh as m,
  hc as n,
  lc as o,
  Ii as p,
  Ro as q,
  gc as r,
  Qh as s,
  Pt as t,
  cc as u,
  zo as v,
  Po as w,
  Wo as x,
  Ho as y,
  qo as z
};
//# sourceMappingURL=commonDb-ee617a3e.js.map
