import { i as za, G as Ta } from "./layout-2c1637bb.js";
import { l as o0, m as Aa, g as Me, f as xr, h as fe } from "./commonDb-ee617a3e.js";
import { f as Ba } from "./flowDb-81d4a313.js";
import { k as Ca, z as it, A as $e, y as Ve, u as Da, B as Na } from "./utils-865f90f3.js";
import { r as qa } from "./index-fd07e60c.js";
import { s as Ea } from "./selectAll-3476431b.js";
class s0 {
  // The + prefix indicates that these fields aren't writeable
  // Lexer holding the input string.
  // Start offset, zero-based inclusive.
  // End offset, zero-based exclusive.
  constructor(e, t, a) {
    this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = e, this.start = t, this.end = a;
  }
  /**
   * Merges two `SourceLocation`s from location providers, given they are
   * provided in order of appearance.
   * - Returns the first one's location if only the first is provided.
   * - Returns a merged range of the first and the last if both are provided
   *   and their lexers match.
   * - Otherwise, returns null.
   */
  static range(e, t) {
    return t ? !e || !e.loc || !t.loc || e.loc.lexer !== t.loc.lexer ? null : new s0(e.loc.lexer, e.loc.start, t.loc.end) : e && e.loc;
  }
}
class d0 {
  // don't expand the token
  // used in \noexpand
  constructor(e, t) {
    this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = e, this.loc = t;
  }
  /**
   * Given a pair of tokens (this and endToken), compute a `Token` encompassing
   * the whole input range enclosed by these two.
   */
  range(e, t) {
    return new d0(t, s0.range(this, e));
  }
}
class T {
  // Error position based on passed-in Token or ParseNode.
  constructor(e, t) {
    this.position = void 0;
    var a = "KaTeX parse error: " + e, n, l = t && t.loc;
    if (l && l.start <= l.end) {
      var o = l.lexer.input;
      n = l.start;
      var h = l.end;
      n === o.length ? a += " at end of input: " : a += " at position " + (n + 1) + ": ";
      var m = o.slice(n, h).replace(/[^]/g, "$&̲"), f;
      n > 15 ? f = "…" + o.slice(n - 15, n) : f = o.slice(0, n);
      var g;
      h + 15 < o.length ? g = o.slice(h, h + 15) + "…" : g = o.slice(h), a += f + m + g;
    }
    var b = new Error(a);
    return b.name = "ParseError", b.__proto__ = T.prototype, b.position = n, b;
  }
}
T.prototype.__proto__ = Error.prototype;
var Ra = function(e, t) {
  return e.indexOf(t) !== -1;
}, Ia = function(e, t) {
  return e === void 0 ? t : e;
}, La = /([A-Z])/g, Ha = function(e) {
  return e.replace(La, "-$1").toLowerCase();
}, Oa = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#x27;"
}, Fa = /[&><"']/g;
function Pa(r) {
  return String(r).replace(Fa, (e) => Oa[e]);
}
var wr = function r(e) {
  return e.type === "ordgroup" || e.type === "color" ? e.body.length === 1 ? r(e.body[0]) : e : e.type === "font" ? r(e.body) : e;
}, Ga = function(e) {
  var t = wr(e);
  return t.type === "mathord" || t.type === "textord" || t.type === "atom";
}, $a = function(e) {
  if (!e)
    throw new Error("Expected non-null, but got " + String(e));
  return e;
}, Va = function(e) {
  var t = /^\s*([^\\/#]*?)(?::|&#0*58|&#x0*3a)/i.exec(e);
  return t != null ? t[1] : "_relative";
}, L = {
  contains: Ra,
  deflt: Ia,
  escape: Pa,
  hyphenate: Ha,
  getBaseElem: wr,
  isCharacterBox: Ga,
  protocolFromUrl: Va
}, ze = {
  displayMode: {
    type: "boolean",
    description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
    cli: "-d, --display-mode"
  },
  output: {
    type: {
      enum: ["htmlAndMathml", "html", "mathml"]
    },
    description: "Determines the markup language of the output.",
    cli: "-F, --format <type>"
  },
  leqno: {
    type: "boolean",
    description: "Render display math in leqno style (left-justified tags)."
  },
  fleqn: {
    type: "boolean",
    description: "Render display math flush left."
  },
  throwOnError: {
    type: "boolean",
    default: !0,
    cli: "-t, --no-throw-on-error",
    cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
  },
  errorColor: {
    type: "string",
    default: "#cc0000",
    cli: "-c, --error-color <color>",
    cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
    cliProcessor: (r) => "#" + r
  },
  macros: {
    type: "object",
    cli: "-m, --macro <def>",
    cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
    cliDefault: [],
    cliProcessor: (r, e) => (e.push(r), e)
  },
  minRuleThickness: {
    type: "number",
    description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
    processor: (r) => Math.max(0, r),
    cli: "--min-rule-thickness <size>",
    cliProcessor: parseFloat
  },
  colorIsTextColor: {
    type: "boolean",
    description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
    cli: "-b, --color-is-text-color"
  },
  strict: {
    type: [{
      enum: ["warn", "ignore", "error"]
    }, "boolean", "function"],
    description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
    cli: "-S, --strict",
    cliDefault: !1
  },
  trust: {
    type: ["boolean", "function"],
    description: "Trust the input, enabling all HTML features such as \\url.",
    cli: "-T, --trust"
  },
  maxSize: {
    type: "number",
    default: 1 / 0,
    description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
    processor: (r) => Math.max(0, r),
    cli: "-s, --max-size <n>",
    cliProcessor: parseInt
  },
  maxExpand: {
    type: "number",
    default: 1e3,
    description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
    processor: (r) => Math.max(0, r),
    cli: "-e, --max-expand <n>",
    cliProcessor: (r) => r === "Infinity" ? 1 / 0 : parseInt(r)
  },
  globalGroup: {
    type: "boolean",
    cli: !1
  }
};
function Ua(r) {
  if (r.default)
    return r.default;
  var e = r.type, t = Array.isArray(e) ? e[0] : e;
  if (typeof t != "string")
    return t.enum[0];
  switch (t) {
    case "boolean":
      return !1;
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
  }
}
class pt {
  constructor(e) {
    this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, e = e || {};
    for (var t in ze)
      if (ze.hasOwnProperty(t)) {
        var a = ze[t];
        this[t] = e[t] !== void 0 ? a.processor ? a.processor(e[t]) : e[t] : Ua(a);
      }
  }
  /**
   * Report nonstrict (non-LaTeX-compatible) input.
   * Can safely not be called if `this.strict` is false in JavaScript.
   */
  reportNonstrict(e, t, a) {
    var n = this.strict;
    if (typeof n == "function" && (n = n(e, t, a)), !(!n || n === "ignore")) {
      if (n === !0 || n === "error")
        throw new T("LaTeX-incompatible input and strict mode is set to 'error': " + (t + " [" + e + "]"), a);
      n === "warn" ? typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")) : typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + n + "': " + t + " [" + e + "]"));
    }
  }
  /**
   * Check whether to apply strict (LaTeX-adhering) behavior for unusual
   * input (like `\\`).  Unlike `nonstrict`, will not throw an error;
   * instead, "error" translates to a return value of `true`, while "ignore"
   * translates to a return value of `false`.  May still print a warning:
   * "warn" prints a warning and returns `false`.
   * This is for the second category of `errorCode`s listed in the README.
   */
  useStrictBehavior(e, t, a) {
    var n = this.strict;
    if (typeof n == "function")
      try {
        n = n(e, t, a);
      } catch {
        n = "error";
      }
    return !n || n === "ignore" ? !1 : n === !0 || n === "error" ? !0 : n === "warn" ? (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")), !1) : (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + n + "': " + t + " [" + e + "]")), !1);
  }
  /**
   * Check whether to test potentially dangerous input, and return
   * `true` (trusted) or `false` (untrusted).  The sole argument `context`
   * should be an object with `command` field specifying the relevant LaTeX
   * command (as a string starting with `\`), and any other arguments, etc.
   * If `context` has a `url` field, a `protocol` field will automatically
   * get added by this function (changing the specified object).
   */
  isTrusted(e) {
    e.url && !e.protocol && (e.protocol = L.protocolFromUrl(e.url));
    var t = typeof this.trust == "function" ? this.trust(e) : this.trust;
    return Boolean(t);
  }
}
class R0 {
  constructor(e, t, a) {
    this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = e, this.size = t, this.cramped = a;
  }
  /**
   * Get the style of a superscript given a base in the current style.
   */
  sup() {
    return b0[Xa[this.id]];
  }
  /**
   * Get the style of a subscript given a base in the current style.
   */
  sub() {
    return b0[Ya[this.id]];
  }
  /**
   * Get the style of a fraction numerator given the fraction in the current
   * style.
   */
  fracNum() {
    return b0[Wa[this.id]];
  }
  /**
   * Get the style of a fraction denominator given the fraction in the current
   * style.
   */
  fracDen() {
    return b0[ja[this.id]];
  }
  /**
   * Get the cramped version of a style (in particular, cramping a cramped style
   * doesn't change the style).
   */
  cramp() {
    return b0[Za[this.id]];
  }
  /**
   * Get a text or display version of this style.
   */
  text() {
    return b0[Ka[this.id]];
  }
  /**
   * Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
   */
  isTight() {
    return this.size >= 2;
  }
}
var vt = 0, Ae = 1, J0 = 2, B0 = 3, ne = 4, f0 = 5, Q0 = 6, a0 = 7, b0 = [new R0(vt, 0, !1), new R0(Ae, 0, !0), new R0(J0, 1, !1), new R0(B0, 1, !0), new R0(ne, 2, !1), new R0(f0, 2, !0), new R0(Q0, 3, !1), new R0(a0, 3, !0)], Xa = [ne, f0, ne, f0, Q0, a0, Q0, a0], Ya = [f0, f0, f0, f0, a0, a0, a0, a0], Wa = [J0, B0, ne, f0, Q0, a0, Q0, a0], ja = [B0, B0, f0, f0, a0, a0, a0, a0], Za = [Ae, Ae, B0, B0, f0, f0, a0, a0], Ka = [vt, Ae, J0, B0, J0, B0, J0, B0], E = {
  DISPLAY: b0[vt],
  TEXT: b0[J0],
  SCRIPT: b0[ne],
  SCRIPTSCRIPT: b0[Q0]
}, lt = [{
  // Latin characters beyond the Latin-1 characters we have metrics for.
  // Needed for Czech, Hungarian and Turkish text, for example.
  name: "latin",
  blocks: [
    [256, 591],
    // Latin Extended-A and Latin Extended-B
    [768, 879]
    // Combining Diacritical marks
  ]
}, {
  // The Cyrillic script used by Russian and related languages.
  // A Cyrillic subset used to be supported as explicitly defined
  // symbols in symbols.js
  name: "cyrillic",
  blocks: [[1024, 1279]]
}, {
  // Armenian
  name: "armenian",
  blocks: [[1328, 1423]]
}, {
  // The Brahmic scripts of South and Southeast Asia
  // Devanagari (0900–097F)
  // Bengali (0980–09FF)
  // Gurmukhi (0A00–0A7F)
  // Gujarati (0A80–0AFF)
  // Oriya (0B00–0B7F)
  // Tamil (0B80–0BFF)
  // Telugu (0C00–0C7F)
  // Kannada (0C80–0CFF)
  // Malayalam (0D00–0D7F)
  // Sinhala (0D80–0DFF)
  // Thai (0E00–0E7F)
  // Lao (0E80–0EFF)
  // Tibetan (0F00–0FFF)
  // Myanmar (1000–109F)
  name: "brahmic",
  blocks: [[2304, 4255]]
}, {
  name: "georgian",
  blocks: [[4256, 4351]]
}, {
  // Chinese and Japanese.
  // The "k" in cjk is for Korean, but we've separated Korean out
  name: "cjk",
  blocks: [
    [12288, 12543],
    // CJK symbols and punctuation, Hiragana, Katakana
    [19968, 40879],
    // CJK ideograms
    [65280, 65376]
    // Fullwidth punctuation
    // TODO: add halfwidth Katakana and Romanji glyphs
  ]
}, {
  // Korean
  name: "hangul",
  blocks: [[44032, 55215]]
}];
function Ja(r) {
  for (var e = 0; e < lt.length; e++)
    for (var t = lt[e], a = 0; a < t.blocks.length; a++) {
      var n = t.blocks[a];
      if (r >= n[0] && r <= n[1])
        return t.name;
    }
  return null;
}
var Te = [];
lt.forEach((r) => r.blocks.forEach((e) => Te.push(...e)));
function kr(r) {
  for (var e = 0; e < Te.length; e += 2)
    if (r >= Te[e] && r <= Te[e + 1])
      return !0;
  return !1;
}
var K0 = 80, Qa = function(e, t) {
  return "M95," + (622 + e + t) + `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` + e / 2.075 + " -" + e + `
c5.3,-9.3,12,-14,20,-14
H400000v` + (40 + e) + `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` + (834 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, _a = function(e, t) {
  return "M263," + (601 + e + t) + `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` + e / 2.084 + " -" + e + `
c4.7,-7.3,11,-11,19,-11
H40000v` + (40 + e) + `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, e1 = function(e, t) {
  return "M983 " + (10 + e + t) + `
l` + e / 3.13 + " -" + e + `
c4,-6.7,10,-10,18,-10 H400000v` + (40 + e) + `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, t1 = function(e, t) {
  return "M424," + (2398 + e + t) + `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` + e / 4.223 + " -" + e + `c4,-6.7,10,-10,18,-10 H400000
v` + (40 + e) + `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` + (1001 + e) + " " + t + `
h400000v` + (40 + e) + "h-400000z";
}, r1 = function(e, t) {
  return "M473," + (2713 + e + t) + `
c339.3,-1799.3,509.3,-2700,510,-2702 l` + e / 5.298 + " -" + e + `
c3.3,-7.3,9.3,-11,18,-11 H400000v` + (40 + e) + `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` + (1001 + e) + " " + t + "h400000v" + (40 + e) + "H1017.7z";
}, a1 = function(e) {
  var t = e / 2;
  return "M400000 " + e + " H0 L" + t + " 0 l65 45 L145 " + (e - 80) + " H400000z";
}, n1 = function(e, t, a) {
  var n = a - 54 - t - e;
  return "M702 " + (e + t) + "H400000" + (40 + e) + `
H742v` + n + `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` + t + "H400000v" + (40 + e) + "H742z";
}, i1 = function(e, t, a) {
  t = 1e3 * t;
  var n = "";
  switch (e) {
    case "sqrtMain":
      n = Qa(t, K0);
      break;
    case "sqrtSize1":
      n = _a(t, K0);
      break;
    case "sqrtSize2":
      n = e1(t, K0);
      break;
    case "sqrtSize3":
      n = t1(t, K0);
      break;
    case "sqrtSize4":
      n = r1(t, K0);
      break;
    case "sqrtTall":
      n = n1(t, K0, a);
  }
  return n;
}, l1 = function(e, t) {
  switch (e) {
    case "⎜":
      return "M291 0 H417 V" + t + " H291z M291 0 H417 V" + t + " H291z";
    case "∣":
      return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145z";
    case "∥":
      return "M145 0 H188 V" + t + " H145z M145 0 H188 V" + t + " H145z" + ("M367 0 H410 V" + t + " H367z M367 0 H410 V" + t + " H367z");
    case "⎟":
      return "M457 0 H583 V" + t + " H457z M457 0 H583 V" + t + " H457z";
    case "⎢":
      return "M319 0 H403 V" + t + " H319z M319 0 H403 V" + t + " H319z";
    case "⎥":
      return "M263 0 H347 V" + t + " H263z M263 0 H347 V" + t + " H263z";
    case "⎪":
      return "M384 0 H504 V" + t + " H384z M384 0 H504 V" + t + " H384z";
    case "⏐":
      return "M312 0 H355 V" + t + " H312z M312 0 H355 V" + t + " H312z";
    case "‖":
      return "M257 0 H300 V" + t + " H257z M257 0 H300 V" + t + " H257z" + ("M478 0 H521 V" + t + " H478z M478 0 H521 V" + t + " H478z");
    default:
      return "";
  }
}, Pt = {
  // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
  doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,
  // doublerightarrow is from glyph U+21D2 in font KaTeX Main
  doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,
  // leftarrow is from glyph U+2190 in font KaTeX Main
  leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,
  // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
  leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,
  leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,
  // overgroup is from the MnSymbol package (public domain)
  leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,
  leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,
  // Harpoons are from glyph U+21BD in font KaTeX Main
  leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,
  leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,
  leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,
  leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,
  // hook is from glyph U+21A9 in font KaTeX Main
  lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,
  leftlinesegment: `M40 281 V428 H0 V94 H40 V241 H400000 v40z
M40 281 V428 H0 V94 H40 V241 H400000 v40z`,
  leftmapsto: `M40 281 V448H0V74H40V241H400000v40z
M40 281 V448H0V74H40V241H400000v40z`,
  // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
  leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,
  longequal: `M0 50 h400000 v40H0z m0 194h40000v40H0z
M0 50 h400000 v40H0z m0 194h40000v40H0z`,
  midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,
  midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,
  oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,
  oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,
  oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,
  oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,
  rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,
  rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,
  rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,
  rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,
  rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,
  rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,
  rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,
  rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,
  rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,
  righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,
  rightlinesegment: `M399960 241 V94 h40 V428 h-40 V281 H0 v-40z
M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`,
  rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,
  // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
  twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,
  twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,
  // tilde1 is a modified version of a glyph from the MnSymbol package
  tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,
  // ditto tilde2, tilde3, & tilde4
  tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,
  tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,
  tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,
  // vec is from glyph U+20D7 in font KaTeX Main
  vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,
  // widehat1 is a modified version of a glyph from the MnSymbol package
  widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,
  // ditto widehat2, widehat3, & widehat4
  widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,
  // widecheck paths are all inverted versions of widehat
  widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,
  widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,
  // The next ten paths support reaction arrows from the mhchem package.
  // Arrows for \ce{<-->} are offset from xAxis by 0.22ex, per mhchem in LaTeX
  // baraboveleftarrow is mostly from from glyph U+2190 in font KaTeX Main
  baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,
  // rightarrowabovebar is mostly from glyph U+2192, KaTeX Main
  rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,
  // The short left harpoon has 0.5em (i.e. 500 units) kern on the left end.
  // Ref from mhchem.sty: \rlap{\raisebox{-.22ex}{$\kern0.5em
  baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,
  rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,
  shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,
  shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z`
};
class se {
  // HtmlDomNode
  // Never used; needed for satisfying interface.
  constructor(e) {
    this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = e, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
  }
  hasClass(e) {
    return L.contains(this.classes, e);
  }
  /** Convert the fragment into a node. */
  toNode() {
    for (var e = document.createDocumentFragment(), t = 0; t < this.children.length; t++)
      e.appendChild(this.children[t].toNode());
    return e;
  }
  /** Convert the fragment into HTML markup. */
  toMarkup() {
    for (var e = "", t = 0; t < this.children.length; t++)
      e += this.children[t].toMarkup();
    return e;
  }
  /**
   * Converts the math node into a string, similar to innerText. Applies to
   * MathDomNode's only.
   */
  toText() {
    var e = (t) => t.toText();
    return this.children.map(e).join("");
  }
}
var y0 = {
  "AMS-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.68889, 0, 0, 0.72222],
    66: [0, 0.68889, 0, 0, 0.66667],
    67: [0, 0.68889, 0, 0, 0.72222],
    68: [0, 0.68889, 0, 0, 0.72222],
    69: [0, 0.68889, 0, 0, 0.66667],
    70: [0, 0.68889, 0, 0, 0.61111],
    71: [0, 0.68889, 0, 0, 0.77778],
    72: [0, 0.68889, 0, 0, 0.77778],
    73: [0, 0.68889, 0, 0, 0.38889],
    74: [0.16667, 0.68889, 0, 0, 0.5],
    75: [0, 0.68889, 0, 0, 0.77778],
    76: [0, 0.68889, 0, 0, 0.66667],
    77: [0, 0.68889, 0, 0, 0.94445],
    78: [0, 0.68889, 0, 0, 0.72222],
    79: [0.16667, 0.68889, 0, 0, 0.77778],
    80: [0, 0.68889, 0, 0, 0.61111],
    81: [0.16667, 0.68889, 0, 0, 0.77778],
    82: [0, 0.68889, 0, 0, 0.72222],
    83: [0, 0.68889, 0, 0, 0.55556],
    84: [0, 0.68889, 0, 0, 0.66667],
    85: [0, 0.68889, 0, 0, 0.72222],
    86: [0, 0.68889, 0, 0, 0.72222],
    87: [0, 0.68889, 0, 0, 1],
    88: [0, 0.68889, 0, 0, 0.72222],
    89: [0, 0.68889, 0, 0, 0.72222],
    90: [0, 0.68889, 0, 0, 0.66667],
    107: [0, 0.68889, 0, 0, 0.55556],
    160: [0, 0, 0, 0, 0.25],
    165: [0, 0.675, 0.025, 0, 0.75],
    174: [0.15559, 0.69224, 0, 0, 0.94666],
    240: [0, 0.68889, 0, 0, 0.55556],
    295: [0, 0.68889, 0, 0, 0.54028],
    710: [0, 0.825, 0, 0, 2.33334],
    732: [0, 0.9, 0, 0, 2.33334],
    770: [0, 0.825, 0, 0, 2.33334],
    771: [0, 0.9, 0, 0, 2.33334],
    989: [0.08167, 0.58167, 0, 0, 0.77778],
    1008: [0, 0.43056, 0.04028, 0, 0.66667],
    8245: [0, 0.54986, 0, 0, 0.275],
    8463: [0, 0.68889, 0, 0, 0.54028],
    8487: [0, 0.68889, 0, 0, 0.72222],
    8498: [0, 0.68889, 0, 0, 0.55556],
    8502: [0, 0.68889, 0, 0, 0.66667],
    8503: [0, 0.68889, 0, 0, 0.44445],
    8504: [0, 0.68889, 0, 0, 0.66667],
    8513: [0, 0.68889, 0, 0, 0.63889],
    8592: [-0.03598, 0.46402, 0, 0, 0.5],
    8594: [-0.03598, 0.46402, 0, 0, 0.5],
    8602: [-0.13313, 0.36687, 0, 0, 1],
    8603: [-0.13313, 0.36687, 0, 0, 1],
    8606: [0.01354, 0.52239, 0, 0, 1],
    8608: [0.01354, 0.52239, 0, 0, 1],
    8610: [0.01354, 0.52239, 0, 0, 1.11111],
    8611: [0.01354, 0.52239, 0, 0, 1.11111],
    8619: [0, 0.54986, 0, 0, 1],
    8620: [0, 0.54986, 0, 0, 1],
    8621: [-0.13313, 0.37788, 0, 0, 1.38889],
    8622: [-0.13313, 0.36687, 0, 0, 1],
    8624: [0, 0.69224, 0, 0, 0.5],
    8625: [0, 0.69224, 0, 0, 0.5],
    8630: [0, 0.43056, 0, 0, 1],
    8631: [0, 0.43056, 0, 0, 1],
    8634: [0.08198, 0.58198, 0, 0, 0.77778],
    8635: [0.08198, 0.58198, 0, 0, 0.77778],
    8638: [0.19444, 0.69224, 0, 0, 0.41667],
    8639: [0.19444, 0.69224, 0, 0, 0.41667],
    8642: [0.19444, 0.69224, 0, 0, 0.41667],
    8643: [0.19444, 0.69224, 0, 0, 0.41667],
    8644: [0.1808, 0.675, 0, 0, 1],
    8646: [0.1808, 0.675, 0, 0, 1],
    8647: [0.1808, 0.675, 0, 0, 1],
    8648: [0.19444, 0.69224, 0, 0, 0.83334],
    8649: [0.1808, 0.675, 0, 0, 1],
    8650: [0.19444, 0.69224, 0, 0, 0.83334],
    8651: [0.01354, 0.52239, 0, 0, 1],
    8652: [0.01354, 0.52239, 0, 0, 1],
    8653: [-0.13313, 0.36687, 0, 0, 1],
    8654: [-0.13313, 0.36687, 0, 0, 1],
    8655: [-0.13313, 0.36687, 0, 0, 1],
    8666: [0.13667, 0.63667, 0, 0, 1],
    8667: [0.13667, 0.63667, 0, 0, 1],
    8669: [-0.13313, 0.37788, 0, 0, 1],
    8672: [-0.064, 0.437, 0, 0, 1.334],
    8674: [-0.064, 0.437, 0, 0, 1.334],
    8705: [0, 0.825, 0, 0, 0.5],
    8708: [0, 0.68889, 0, 0, 0.55556],
    8709: [0.08167, 0.58167, 0, 0, 0.77778],
    8717: [0, 0.43056, 0, 0, 0.42917],
    8722: [-0.03598, 0.46402, 0, 0, 0.5],
    8724: [0.08198, 0.69224, 0, 0, 0.77778],
    8726: [0.08167, 0.58167, 0, 0, 0.77778],
    8733: [0, 0.69224, 0, 0, 0.77778],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8737: [0, 0.69224, 0, 0, 0.72222],
    8738: [0.03517, 0.52239, 0, 0, 0.72222],
    8739: [0.08167, 0.58167, 0, 0, 0.22222],
    8740: [0.25142, 0.74111, 0, 0, 0.27778],
    8741: [0.08167, 0.58167, 0, 0, 0.38889],
    8742: [0.25142, 0.74111, 0, 0, 0.5],
    8756: [0, 0.69224, 0, 0, 0.66667],
    8757: [0, 0.69224, 0, 0, 0.66667],
    8764: [-0.13313, 0.36687, 0, 0, 0.77778],
    8765: [-0.13313, 0.37788, 0, 0, 0.77778],
    8769: [-0.13313, 0.36687, 0, 0, 0.77778],
    8770: [-0.03625, 0.46375, 0, 0, 0.77778],
    8774: [0.30274, 0.79383, 0, 0, 0.77778],
    8776: [-0.01688, 0.48312, 0, 0, 0.77778],
    8778: [0.08167, 0.58167, 0, 0, 0.77778],
    8782: [0.06062, 0.54986, 0, 0, 0.77778],
    8783: [0.06062, 0.54986, 0, 0, 0.77778],
    8785: [0.08198, 0.58198, 0, 0, 0.77778],
    8786: [0.08198, 0.58198, 0, 0, 0.77778],
    8787: [0.08198, 0.58198, 0, 0, 0.77778],
    8790: [0, 0.69224, 0, 0, 0.77778],
    8791: [0.22958, 0.72958, 0, 0, 0.77778],
    8796: [0.08198, 0.91667, 0, 0, 0.77778],
    8806: [0.25583, 0.75583, 0, 0, 0.77778],
    8807: [0.25583, 0.75583, 0, 0, 0.77778],
    8808: [0.25142, 0.75726, 0, 0, 0.77778],
    8809: [0.25142, 0.75726, 0, 0, 0.77778],
    8812: [0.25583, 0.75583, 0, 0, 0.5],
    8814: [0.20576, 0.70576, 0, 0, 0.77778],
    8815: [0.20576, 0.70576, 0, 0, 0.77778],
    8816: [0.30274, 0.79383, 0, 0, 0.77778],
    8817: [0.30274, 0.79383, 0, 0, 0.77778],
    8818: [0.22958, 0.72958, 0, 0, 0.77778],
    8819: [0.22958, 0.72958, 0, 0, 0.77778],
    8822: [0.1808, 0.675, 0, 0, 0.77778],
    8823: [0.1808, 0.675, 0, 0, 0.77778],
    8828: [0.13667, 0.63667, 0, 0, 0.77778],
    8829: [0.13667, 0.63667, 0, 0, 0.77778],
    8830: [0.22958, 0.72958, 0, 0, 0.77778],
    8831: [0.22958, 0.72958, 0, 0, 0.77778],
    8832: [0.20576, 0.70576, 0, 0, 0.77778],
    8833: [0.20576, 0.70576, 0, 0, 0.77778],
    8840: [0.30274, 0.79383, 0, 0, 0.77778],
    8841: [0.30274, 0.79383, 0, 0, 0.77778],
    8842: [0.13597, 0.63597, 0, 0, 0.77778],
    8843: [0.13597, 0.63597, 0, 0, 0.77778],
    8847: [0.03517, 0.54986, 0, 0, 0.77778],
    8848: [0.03517, 0.54986, 0, 0, 0.77778],
    8858: [0.08198, 0.58198, 0, 0, 0.77778],
    8859: [0.08198, 0.58198, 0, 0, 0.77778],
    8861: [0.08198, 0.58198, 0, 0, 0.77778],
    8862: [0, 0.675, 0, 0, 0.77778],
    8863: [0, 0.675, 0, 0, 0.77778],
    8864: [0, 0.675, 0, 0, 0.77778],
    8865: [0, 0.675, 0, 0, 0.77778],
    8872: [0, 0.69224, 0, 0, 0.61111],
    8873: [0, 0.69224, 0, 0, 0.72222],
    8874: [0, 0.69224, 0, 0, 0.88889],
    8876: [0, 0.68889, 0, 0, 0.61111],
    8877: [0, 0.68889, 0, 0, 0.61111],
    8878: [0, 0.68889, 0, 0, 0.72222],
    8879: [0, 0.68889, 0, 0, 0.72222],
    8882: [0.03517, 0.54986, 0, 0, 0.77778],
    8883: [0.03517, 0.54986, 0, 0, 0.77778],
    8884: [0.13667, 0.63667, 0, 0, 0.77778],
    8885: [0.13667, 0.63667, 0, 0, 0.77778],
    8888: [0, 0.54986, 0, 0, 1.11111],
    8890: [0.19444, 0.43056, 0, 0, 0.55556],
    8891: [0.19444, 0.69224, 0, 0, 0.61111],
    8892: [0.19444, 0.69224, 0, 0, 0.61111],
    8901: [0, 0.54986, 0, 0, 0.27778],
    8903: [0.08167, 0.58167, 0, 0, 0.77778],
    8905: [0.08167, 0.58167, 0, 0, 0.77778],
    8906: [0.08167, 0.58167, 0, 0, 0.77778],
    8907: [0, 0.69224, 0, 0, 0.77778],
    8908: [0, 0.69224, 0, 0, 0.77778],
    8909: [-0.03598, 0.46402, 0, 0, 0.77778],
    8910: [0, 0.54986, 0, 0, 0.76042],
    8911: [0, 0.54986, 0, 0, 0.76042],
    8912: [0.03517, 0.54986, 0, 0, 0.77778],
    8913: [0.03517, 0.54986, 0, 0, 0.77778],
    8914: [0, 0.54986, 0, 0, 0.66667],
    8915: [0, 0.54986, 0, 0, 0.66667],
    8916: [0, 0.69224, 0, 0, 0.66667],
    8918: [0.0391, 0.5391, 0, 0, 0.77778],
    8919: [0.0391, 0.5391, 0, 0, 0.77778],
    8920: [0.03517, 0.54986, 0, 0, 1.33334],
    8921: [0.03517, 0.54986, 0, 0, 1.33334],
    8922: [0.38569, 0.88569, 0, 0, 0.77778],
    8923: [0.38569, 0.88569, 0, 0, 0.77778],
    8926: [0.13667, 0.63667, 0, 0, 0.77778],
    8927: [0.13667, 0.63667, 0, 0, 0.77778],
    8928: [0.30274, 0.79383, 0, 0, 0.77778],
    8929: [0.30274, 0.79383, 0, 0, 0.77778],
    8934: [0.23222, 0.74111, 0, 0, 0.77778],
    8935: [0.23222, 0.74111, 0, 0, 0.77778],
    8936: [0.23222, 0.74111, 0, 0, 0.77778],
    8937: [0.23222, 0.74111, 0, 0, 0.77778],
    8938: [0.20576, 0.70576, 0, 0, 0.77778],
    8939: [0.20576, 0.70576, 0, 0, 0.77778],
    8940: [0.30274, 0.79383, 0, 0, 0.77778],
    8941: [0.30274, 0.79383, 0, 0, 0.77778],
    8994: [0.19444, 0.69224, 0, 0, 0.77778],
    8995: [0.19444, 0.69224, 0, 0, 0.77778],
    9416: [0.15559, 0.69224, 0, 0, 0.90222],
    9484: [0, 0.69224, 0, 0, 0.5],
    9488: [0, 0.69224, 0, 0, 0.5],
    9492: [0, 0.37788, 0, 0, 0.5],
    9496: [0, 0.37788, 0, 0, 0.5],
    9585: [0.19444, 0.68889, 0, 0, 0.88889],
    9586: [0.19444, 0.74111, 0, 0, 0.88889],
    9632: [0, 0.675, 0, 0, 0.77778],
    9633: [0, 0.675, 0, 0, 0.77778],
    9650: [0, 0.54986, 0, 0, 0.72222],
    9651: [0, 0.54986, 0, 0, 0.72222],
    9654: [0.03517, 0.54986, 0, 0, 0.77778],
    9660: [0, 0.54986, 0, 0, 0.72222],
    9661: [0, 0.54986, 0, 0, 0.72222],
    9664: [0.03517, 0.54986, 0, 0, 0.77778],
    9674: [0.11111, 0.69224, 0, 0, 0.66667],
    9733: [0.19444, 0.69224, 0, 0, 0.94445],
    10003: [0, 0.69224, 0, 0, 0.83334],
    10016: [0, 0.69224, 0, 0, 0.83334],
    10731: [0.11111, 0.69224, 0, 0, 0.66667],
    10846: [0.19444, 0.75583, 0, 0, 0.61111],
    10877: [0.13667, 0.63667, 0, 0, 0.77778],
    10878: [0.13667, 0.63667, 0, 0, 0.77778],
    10885: [0.25583, 0.75583, 0, 0, 0.77778],
    10886: [0.25583, 0.75583, 0, 0, 0.77778],
    10887: [0.13597, 0.63597, 0, 0, 0.77778],
    10888: [0.13597, 0.63597, 0, 0, 0.77778],
    10889: [0.26167, 0.75726, 0, 0, 0.77778],
    10890: [0.26167, 0.75726, 0, 0, 0.77778],
    10891: [0.48256, 0.98256, 0, 0, 0.77778],
    10892: [0.48256, 0.98256, 0, 0, 0.77778],
    10901: [0.13667, 0.63667, 0, 0, 0.77778],
    10902: [0.13667, 0.63667, 0, 0, 0.77778],
    10933: [0.25142, 0.75726, 0, 0, 0.77778],
    10934: [0.25142, 0.75726, 0, 0, 0.77778],
    10935: [0.26167, 0.75726, 0, 0, 0.77778],
    10936: [0.26167, 0.75726, 0, 0, 0.77778],
    10937: [0.26167, 0.75726, 0, 0, 0.77778],
    10938: [0.26167, 0.75726, 0, 0, 0.77778],
    10949: [0.25583, 0.75583, 0, 0, 0.77778],
    10950: [0.25583, 0.75583, 0, 0, 0.77778],
    10955: [0.28481, 0.79383, 0, 0, 0.77778],
    10956: [0.28481, 0.79383, 0, 0, 0.77778],
    57350: [0.08167, 0.58167, 0, 0, 0.22222],
    57351: [0.08167, 0.58167, 0, 0, 0.38889],
    57352: [0.08167, 0.58167, 0, 0, 0.77778],
    57353: [0, 0.43056, 0.04028, 0, 0.66667],
    57356: [0.25142, 0.75726, 0, 0, 0.77778],
    57357: [0.25142, 0.75726, 0, 0, 0.77778],
    57358: [0.41951, 0.91951, 0, 0, 0.77778],
    57359: [0.30274, 0.79383, 0, 0, 0.77778],
    57360: [0.30274, 0.79383, 0, 0, 0.77778],
    57361: [0.41951, 0.91951, 0, 0, 0.77778],
    57366: [0.25142, 0.75726, 0, 0, 0.77778],
    57367: [0.25142, 0.75726, 0, 0, 0.77778],
    57368: [0.25142, 0.75726, 0, 0, 0.77778],
    57369: [0.25142, 0.75726, 0, 0, 0.77778],
    57370: [0.13597, 0.63597, 0, 0, 0.77778],
    57371: [0.13597, 0.63597, 0, 0, 0.77778]
  },
  "Caligraphic-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.68333, 0, 0.19445, 0.79847],
    66: [0, 0.68333, 0.03041, 0.13889, 0.65681],
    67: [0, 0.68333, 0.05834, 0.13889, 0.52653],
    68: [0, 0.68333, 0.02778, 0.08334, 0.77139],
    69: [0, 0.68333, 0.08944, 0.11111, 0.52778],
    70: [0, 0.68333, 0.09931, 0.11111, 0.71875],
    71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
    72: [0, 0.68333, 965e-5, 0.11111, 0.84452],
    73: [0, 0.68333, 0.07382, 0, 0.54452],
    74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
    75: [0, 0.68333, 0.01445, 0.05556, 0.76195],
    76: [0, 0.68333, 0, 0.13889, 0.68972],
    77: [0, 0.68333, 0, 0.13889, 1.2009],
    78: [0, 0.68333, 0.14736, 0.08334, 0.82049],
    79: [0, 0.68333, 0.02778, 0.11111, 0.79611],
    80: [0, 0.68333, 0.08222, 0.08334, 0.69556],
    81: [0.09722, 0.68333, 0, 0.11111, 0.81667],
    82: [0, 0.68333, 0, 0.08334, 0.8475],
    83: [0, 0.68333, 0.075, 0.13889, 0.60556],
    84: [0, 0.68333, 0.25417, 0, 0.54464],
    85: [0, 0.68333, 0.09931, 0.08334, 0.62583],
    86: [0, 0.68333, 0.08222, 0, 0.61278],
    87: [0, 0.68333, 0.08222, 0.08334, 0.98778],
    88: [0, 0.68333, 0.14643, 0.13889, 0.7133],
    89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
    90: [0, 0.68333, 0.07944, 0.13889, 0.72473],
    160: [0, 0, 0, 0, 0.25]
  },
  "Fraktur-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69141, 0, 0, 0.29574],
    34: [0, 0.69141, 0, 0, 0.21471],
    38: [0, 0.69141, 0, 0, 0.73786],
    39: [0, 0.69141, 0, 0, 0.21201],
    40: [0.24982, 0.74947, 0, 0, 0.38865],
    41: [0.24982, 0.74947, 0, 0, 0.38865],
    42: [0, 0.62119, 0, 0, 0.27764],
    43: [0.08319, 0.58283, 0, 0, 0.75623],
    44: [0, 0.10803, 0, 0, 0.27764],
    45: [0.08319, 0.58283, 0, 0, 0.75623],
    46: [0, 0.10803, 0, 0, 0.27764],
    47: [0.24982, 0.74947, 0, 0, 0.50181],
    48: [0, 0.47534, 0, 0, 0.50181],
    49: [0, 0.47534, 0, 0, 0.50181],
    50: [0, 0.47534, 0, 0, 0.50181],
    51: [0.18906, 0.47534, 0, 0, 0.50181],
    52: [0.18906, 0.47534, 0, 0, 0.50181],
    53: [0.18906, 0.47534, 0, 0, 0.50181],
    54: [0, 0.69141, 0, 0, 0.50181],
    55: [0.18906, 0.47534, 0, 0, 0.50181],
    56: [0, 0.69141, 0, 0, 0.50181],
    57: [0.18906, 0.47534, 0, 0, 0.50181],
    58: [0, 0.47534, 0, 0, 0.21606],
    59: [0.12604, 0.47534, 0, 0, 0.21606],
    61: [-0.13099, 0.36866, 0, 0, 0.75623],
    63: [0, 0.69141, 0, 0, 0.36245],
    65: [0, 0.69141, 0, 0, 0.7176],
    66: [0, 0.69141, 0, 0, 0.88397],
    67: [0, 0.69141, 0, 0, 0.61254],
    68: [0, 0.69141, 0, 0, 0.83158],
    69: [0, 0.69141, 0, 0, 0.66278],
    70: [0.12604, 0.69141, 0, 0, 0.61119],
    71: [0, 0.69141, 0, 0, 0.78539],
    72: [0.06302, 0.69141, 0, 0, 0.7203],
    73: [0, 0.69141, 0, 0, 0.55448],
    74: [0.12604, 0.69141, 0, 0, 0.55231],
    75: [0, 0.69141, 0, 0, 0.66845],
    76: [0, 0.69141, 0, 0, 0.66602],
    77: [0, 0.69141, 0, 0, 1.04953],
    78: [0, 0.69141, 0, 0, 0.83212],
    79: [0, 0.69141, 0, 0, 0.82699],
    80: [0.18906, 0.69141, 0, 0, 0.82753],
    81: [0.03781, 0.69141, 0, 0, 0.82699],
    82: [0, 0.69141, 0, 0, 0.82807],
    83: [0, 0.69141, 0, 0, 0.82861],
    84: [0, 0.69141, 0, 0, 0.66899],
    85: [0, 0.69141, 0, 0, 0.64576],
    86: [0, 0.69141, 0, 0, 0.83131],
    87: [0, 0.69141, 0, 0, 1.04602],
    88: [0, 0.69141, 0, 0, 0.71922],
    89: [0.18906, 0.69141, 0, 0, 0.83293],
    90: [0.12604, 0.69141, 0, 0, 0.60201],
    91: [0.24982, 0.74947, 0, 0, 0.27764],
    93: [0.24982, 0.74947, 0, 0, 0.27764],
    94: [0, 0.69141, 0, 0, 0.49965],
    97: [0, 0.47534, 0, 0, 0.50046],
    98: [0, 0.69141, 0, 0, 0.51315],
    99: [0, 0.47534, 0, 0, 0.38946],
    100: [0, 0.62119, 0, 0, 0.49857],
    101: [0, 0.47534, 0, 0, 0.40053],
    102: [0.18906, 0.69141, 0, 0, 0.32626],
    103: [0.18906, 0.47534, 0, 0, 0.5037],
    104: [0.18906, 0.69141, 0, 0, 0.52126],
    105: [0, 0.69141, 0, 0, 0.27899],
    106: [0, 0.69141, 0, 0, 0.28088],
    107: [0, 0.69141, 0, 0, 0.38946],
    108: [0, 0.69141, 0, 0, 0.27953],
    109: [0, 0.47534, 0, 0, 0.76676],
    110: [0, 0.47534, 0, 0, 0.52666],
    111: [0, 0.47534, 0, 0, 0.48885],
    112: [0.18906, 0.52396, 0, 0, 0.50046],
    113: [0.18906, 0.47534, 0, 0, 0.48912],
    114: [0, 0.47534, 0, 0, 0.38919],
    115: [0, 0.47534, 0, 0, 0.44266],
    116: [0, 0.62119, 0, 0, 0.33301],
    117: [0, 0.47534, 0, 0, 0.5172],
    118: [0, 0.52396, 0, 0, 0.5118],
    119: [0, 0.52396, 0, 0, 0.77351],
    120: [0.18906, 0.47534, 0, 0, 0.38865],
    121: [0.18906, 0.47534, 0, 0, 0.49884],
    122: [0.18906, 0.47534, 0, 0, 0.39054],
    160: [0, 0, 0, 0, 0.25],
    8216: [0, 0.69141, 0, 0, 0.21471],
    8217: [0, 0.69141, 0, 0, 0.21471],
    58112: [0, 0.62119, 0, 0, 0.49749],
    58113: [0, 0.62119, 0, 0, 0.4983],
    58114: [0.18906, 0.69141, 0, 0, 0.33328],
    58115: [0.18906, 0.69141, 0, 0, 0.32923],
    58116: [0.18906, 0.47534, 0, 0, 0.50343],
    58117: [0, 0.69141, 0, 0, 0.33301],
    58118: [0, 0.62119, 0, 0, 0.33409],
    58119: [0, 0.47534, 0, 0, 0.50073]
  },
  "Main-Bold": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.35],
    34: [0, 0.69444, 0, 0, 0.60278],
    35: [0.19444, 0.69444, 0, 0, 0.95833],
    36: [0.05556, 0.75, 0, 0, 0.575],
    37: [0.05556, 0.75, 0, 0, 0.95833],
    38: [0, 0.69444, 0, 0, 0.89444],
    39: [0, 0.69444, 0, 0, 0.31944],
    40: [0.25, 0.75, 0, 0, 0.44722],
    41: [0.25, 0.75, 0, 0, 0.44722],
    42: [0, 0.75, 0, 0, 0.575],
    43: [0.13333, 0.63333, 0, 0, 0.89444],
    44: [0.19444, 0.15556, 0, 0, 0.31944],
    45: [0, 0.44444, 0, 0, 0.38333],
    46: [0, 0.15556, 0, 0, 0.31944],
    47: [0.25, 0.75, 0, 0, 0.575],
    48: [0, 0.64444, 0, 0, 0.575],
    49: [0, 0.64444, 0, 0, 0.575],
    50: [0, 0.64444, 0, 0, 0.575],
    51: [0, 0.64444, 0, 0, 0.575],
    52: [0, 0.64444, 0, 0, 0.575],
    53: [0, 0.64444, 0, 0, 0.575],
    54: [0, 0.64444, 0, 0, 0.575],
    55: [0, 0.64444, 0, 0, 0.575],
    56: [0, 0.64444, 0, 0, 0.575],
    57: [0, 0.64444, 0, 0, 0.575],
    58: [0, 0.44444, 0, 0, 0.31944],
    59: [0.19444, 0.44444, 0, 0, 0.31944],
    60: [0.08556, 0.58556, 0, 0, 0.89444],
    61: [-0.10889, 0.39111, 0, 0, 0.89444],
    62: [0.08556, 0.58556, 0, 0, 0.89444],
    63: [0, 0.69444, 0, 0, 0.54305],
    64: [0, 0.69444, 0, 0, 0.89444],
    65: [0, 0.68611, 0, 0, 0.86944],
    66: [0, 0.68611, 0, 0, 0.81805],
    67: [0, 0.68611, 0, 0, 0.83055],
    68: [0, 0.68611, 0, 0, 0.88194],
    69: [0, 0.68611, 0, 0, 0.75555],
    70: [0, 0.68611, 0, 0, 0.72361],
    71: [0, 0.68611, 0, 0, 0.90416],
    72: [0, 0.68611, 0, 0, 0.9],
    73: [0, 0.68611, 0, 0, 0.43611],
    74: [0, 0.68611, 0, 0, 0.59444],
    75: [0, 0.68611, 0, 0, 0.90138],
    76: [0, 0.68611, 0, 0, 0.69166],
    77: [0, 0.68611, 0, 0, 1.09166],
    78: [0, 0.68611, 0, 0, 0.9],
    79: [0, 0.68611, 0, 0, 0.86388],
    80: [0, 0.68611, 0, 0, 0.78611],
    81: [0.19444, 0.68611, 0, 0, 0.86388],
    82: [0, 0.68611, 0, 0, 0.8625],
    83: [0, 0.68611, 0, 0, 0.63889],
    84: [0, 0.68611, 0, 0, 0.8],
    85: [0, 0.68611, 0, 0, 0.88472],
    86: [0, 0.68611, 0.01597, 0, 0.86944],
    87: [0, 0.68611, 0.01597, 0, 1.18888],
    88: [0, 0.68611, 0, 0, 0.86944],
    89: [0, 0.68611, 0.02875, 0, 0.86944],
    90: [0, 0.68611, 0, 0, 0.70277],
    91: [0.25, 0.75, 0, 0, 0.31944],
    92: [0.25, 0.75, 0, 0, 0.575],
    93: [0.25, 0.75, 0, 0, 0.31944],
    94: [0, 0.69444, 0, 0, 0.575],
    95: [0.31, 0.13444, 0.03194, 0, 0.575],
    97: [0, 0.44444, 0, 0, 0.55902],
    98: [0, 0.69444, 0, 0, 0.63889],
    99: [0, 0.44444, 0, 0, 0.51111],
    100: [0, 0.69444, 0, 0, 0.63889],
    101: [0, 0.44444, 0, 0, 0.52708],
    102: [0, 0.69444, 0.10903, 0, 0.35139],
    103: [0.19444, 0.44444, 0.01597, 0, 0.575],
    104: [0, 0.69444, 0, 0, 0.63889],
    105: [0, 0.69444, 0, 0, 0.31944],
    106: [0.19444, 0.69444, 0, 0, 0.35139],
    107: [0, 0.69444, 0, 0, 0.60694],
    108: [0, 0.69444, 0, 0, 0.31944],
    109: [0, 0.44444, 0, 0, 0.95833],
    110: [0, 0.44444, 0, 0, 0.63889],
    111: [0, 0.44444, 0, 0, 0.575],
    112: [0.19444, 0.44444, 0, 0, 0.63889],
    113: [0.19444, 0.44444, 0, 0, 0.60694],
    114: [0, 0.44444, 0, 0, 0.47361],
    115: [0, 0.44444, 0, 0, 0.45361],
    116: [0, 0.63492, 0, 0, 0.44722],
    117: [0, 0.44444, 0, 0, 0.63889],
    118: [0, 0.44444, 0.01597, 0, 0.60694],
    119: [0, 0.44444, 0.01597, 0, 0.83055],
    120: [0, 0.44444, 0, 0, 0.60694],
    121: [0.19444, 0.44444, 0.01597, 0, 0.60694],
    122: [0, 0.44444, 0, 0, 0.51111],
    123: [0.25, 0.75, 0, 0, 0.575],
    124: [0.25, 0.75, 0, 0, 0.31944],
    125: [0.25, 0.75, 0, 0, 0.575],
    126: [0.35, 0.34444, 0, 0, 0.575],
    160: [0, 0, 0, 0, 0.25],
    163: [0, 0.69444, 0, 0, 0.86853],
    168: [0, 0.69444, 0, 0, 0.575],
    172: [0, 0.44444, 0, 0, 0.76666],
    176: [0, 0.69444, 0, 0, 0.86944],
    177: [0.13333, 0.63333, 0, 0, 0.89444],
    184: [0.17014, 0, 0, 0, 0.51111],
    198: [0, 0.68611, 0, 0, 1.04166],
    215: [0.13333, 0.63333, 0, 0, 0.89444],
    216: [0.04861, 0.73472, 0, 0, 0.89444],
    223: [0, 0.69444, 0, 0, 0.59722],
    230: [0, 0.44444, 0, 0, 0.83055],
    247: [0.13333, 0.63333, 0, 0, 0.89444],
    248: [0.09722, 0.54167, 0, 0, 0.575],
    305: [0, 0.44444, 0, 0, 0.31944],
    338: [0, 0.68611, 0, 0, 1.16944],
    339: [0, 0.44444, 0, 0, 0.89444],
    567: [0.19444, 0.44444, 0, 0, 0.35139],
    710: [0, 0.69444, 0, 0, 0.575],
    711: [0, 0.63194, 0, 0, 0.575],
    713: [0, 0.59611, 0, 0, 0.575],
    714: [0, 0.69444, 0, 0, 0.575],
    715: [0, 0.69444, 0, 0, 0.575],
    728: [0, 0.69444, 0, 0, 0.575],
    729: [0, 0.69444, 0, 0, 0.31944],
    730: [0, 0.69444, 0, 0, 0.86944],
    732: [0, 0.69444, 0, 0, 0.575],
    733: [0, 0.69444, 0, 0, 0.575],
    915: [0, 0.68611, 0, 0, 0.69166],
    916: [0, 0.68611, 0, 0, 0.95833],
    920: [0, 0.68611, 0, 0, 0.89444],
    923: [0, 0.68611, 0, 0, 0.80555],
    926: [0, 0.68611, 0, 0, 0.76666],
    928: [0, 0.68611, 0, 0, 0.9],
    931: [0, 0.68611, 0, 0, 0.83055],
    933: [0, 0.68611, 0, 0, 0.89444],
    934: [0, 0.68611, 0, 0, 0.83055],
    936: [0, 0.68611, 0, 0, 0.89444],
    937: [0, 0.68611, 0, 0, 0.83055],
    8211: [0, 0.44444, 0.03194, 0, 0.575],
    8212: [0, 0.44444, 0.03194, 0, 1.14999],
    8216: [0, 0.69444, 0, 0, 0.31944],
    8217: [0, 0.69444, 0, 0, 0.31944],
    8220: [0, 0.69444, 0, 0, 0.60278],
    8221: [0, 0.69444, 0, 0, 0.60278],
    8224: [0.19444, 0.69444, 0, 0, 0.51111],
    8225: [0.19444, 0.69444, 0, 0, 0.51111],
    8242: [0, 0.55556, 0, 0, 0.34444],
    8407: [0, 0.72444, 0.15486, 0, 0.575],
    8463: [0, 0.69444, 0, 0, 0.66759],
    8465: [0, 0.69444, 0, 0, 0.83055],
    8467: [0, 0.69444, 0, 0, 0.47361],
    8472: [0.19444, 0.44444, 0, 0, 0.74027],
    8476: [0, 0.69444, 0, 0, 0.83055],
    8501: [0, 0.69444, 0, 0, 0.70277],
    8592: [-0.10889, 0.39111, 0, 0, 1.14999],
    8593: [0.19444, 0.69444, 0, 0, 0.575],
    8594: [-0.10889, 0.39111, 0, 0, 1.14999],
    8595: [0.19444, 0.69444, 0, 0, 0.575],
    8596: [-0.10889, 0.39111, 0, 0, 1.14999],
    8597: [0.25, 0.75, 0, 0, 0.575],
    8598: [0.19444, 0.69444, 0, 0, 1.14999],
    8599: [0.19444, 0.69444, 0, 0, 1.14999],
    8600: [0.19444, 0.69444, 0, 0, 1.14999],
    8601: [0.19444, 0.69444, 0, 0, 1.14999],
    8636: [-0.10889, 0.39111, 0, 0, 1.14999],
    8637: [-0.10889, 0.39111, 0, 0, 1.14999],
    8640: [-0.10889, 0.39111, 0, 0, 1.14999],
    8641: [-0.10889, 0.39111, 0, 0, 1.14999],
    8656: [-0.10889, 0.39111, 0, 0, 1.14999],
    8657: [0.19444, 0.69444, 0, 0, 0.70277],
    8658: [-0.10889, 0.39111, 0, 0, 1.14999],
    8659: [0.19444, 0.69444, 0, 0, 0.70277],
    8660: [-0.10889, 0.39111, 0, 0, 1.14999],
    8661: [0.25, 0.75, 0, 0, 0.70277],
    8704: [0, 0.69444, 0, 0, 0.63889],
    8706: [0, 0.69444, 0.06389, 0, 0.62847],
    8707: [0, 0.69444, 0, 0, 0.63889],
    8709: [0.05556, 0.75, 0, 0, 0.575],
    8711: [0, 0.68611, 0, 0, 0.95833],
    8712: [0.08556, 0.58556, 0, 0, 0.76666],
    8715: [0.08556, 0.58556, 0, 0, 0.76666],
    8722: [0.13333, 0.63333, 0, 0, 0.89444],
    8723: [0.13333, 0.63333, 0, 0, 0.89444],
    8725: [0.25, 0.75, 0, 0, 0.575],
    8726: [0.25, 0.75, 0, 0, 0.575],
    8727: [-0.02778, 0.47222, 0, 0, 0.575],
    8728: [-0.02639, 0.47361, 0, 0, 0.575],
    8729: [-0.02639, 0.47361, 0, 0, 0.575],
    8730: [0.18, 0.82, 0, 0, 0.95833],
    8733: [0, 0.44444, 0, 0, 0.89444],
    8734: [0, 0.44444, 0, 0, 1.14999],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8739: [0.25, 0.75, 0, 0, 0.31944],
    8741: [0.25, 0.75, 0, 0, 0.575],
    8743: [0, 0.55556, 0, 0, 0.76666],
    8744: [0, 0.55556, 0, 0, 0.76666],
    8745: [0, 0.55556, 0, 0, 0.76666],
    8746: [0, 0.55556, 0, 0, 0.76666],
    8747: [0.19444, 0.69444, 0.12778, 0, 0.56875],
    8764: [-0.10889, 0.39111, 0, 0, 0.89444],
    8768: [0.19444, 0.69444, 0, 0, 0.31944],
    8771: [222e-5, 0.50222, 0, 0, 0.89444],
    8773: [0.027, 0.638, 0, 0, 0.894],
    8776: [0.02444, 0.52444, 0, 0, 0.89444],
    8781: [222e-5, 0.50222, 0, 0, 0.89444],
    8801: [222e-5, 0.50222, 0, 0, 0.89444],
    8804: [0.19667, 0.69667, 0, 0, 0.89444],
    8805: [0.19667, 0.69667, 0, 0, 0.89444],
    8810: [0.08556, 0.58556, 0, 0, 1.14999],
    8811: [0.08556, 0.58556, 0, 0, 1.14999],
    8826: [0.08556, 0.58556, 0, 0, 0.89444],
    8827: [0.08556, 0.58556, 0, 0, 0.89444],
    8834: [0.08556, 0.58556, 0, 0, 0.89444],
    8835: [0.08556, 0.58556, 0, 0, 0.89444],
    8838: [0.19667, 0.69667, 0, 0, 0.89444],
    8839: [0.19667, 0.69667, 0, 0, 0.89444],
    8846: [0, 0.55556, 0, 0, 0.76666],
    8849: [0.19667, 0.69667, 0, 0, 0.89444],
    8850: [0.19667, 0.69667, 0, 0, 0.89444],
    8851: [0, 0.55556, 0, 0, 0.76666],
    8852: [0, 0.55556, 0, 0, 0.76666],
    8853: [0.13333, 0.63333, 0, 0, 0.89444],
    8854: [0.13333, 0.63333, 0, 0, 0.89444],
    8855: [0.13333, 0.63333, 0, 0, 0.89444],
    8856: [0.13333, 0.63333, 0, 0, 0.89444],
    8857: [0.13333, 0.63333, 0, 0, 0.89444],
    8866: [0, 0.69444, 0, 0, 0.70277],
    8867: [0, 0.69444, 0, 0, 0.70277],
    8868: [0, 0.69444, 0, 0, 0.89444],
    8869: [0, 0.69444, 0, 0, 0.89444],
    8900: [-0.02639, 0.47361, 0, 0, 0.575],
    8901: [-0.02639, 0.47361, 0, 0, 0.31944],
    8902: [-0.02778, 0.47222, 0, 0, 0.575],
    8968: [0.25, 0.75, 0, 0, 0.51111],
    8969: [0.25, 0.75, 0, 0, 0.51111],
    8970: [0.25, 0.75, 0, 0, 0.51111],
    8971: [0.25, 0.75, 0, 0, 0.51111],
    8994: [-0.13889, 0.36111, 0, 0, 1.14999],
    8995: [-0.13889, 0.36111, 0, 0, 1.14999],
    9651: [0.19444, 0.69444, 0, 0, 1.02222],
    9657: [-0.02778, 0.47222, 0, 0, 0.575],
    9661: [0.19444, 0.69444, 0, 0, 1.02222],
    9667: [-0.02778, 0.47222, 0, 0, 0.575],
    9711: [0.19444, 0.69444, 0, 0, 1.14999],
    9824: [0.12963, 0.69444, 0, 0, 0.89444],
    9825: [0.12963, 0.69444, 0, 0, 0.89444],
    9826: [0.12963, 0.69444, 0, 0, 0.89444],
    9827: [0.12963, 0.69444, 0, 0, 0.89444],
    9837: [0, 0.75, 0, 0, 0.44722],
    9838: [0.19444, 0.69444, 0, 0, 0.44722],
    9839: [0.19444, 0.69444, 0, 0, 0.44722],
    10216: [0.25, 0.75, 0, 0, 0.44722],
    10217: [0.25, 0.75, 0, 0, 0.44722],
    10815: [0, 0.68611, 0, 0, 0.9],
    10927: [0.19667, 0.69667, 0, 0, 0.89444],
    10928: [0.19667, 0.69667, 0, 0, 0.89444],
    57376: [0.19444, 0.69444, 0, 0, 0]
  },
  "Main-BoldItalic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.11417, 0, 0.38611],
    34: [0, 0.69444, 0.07939, 0, 0.62055],
    35: [0.19444, 0.69444, 0.06833, 0, 0.94444],
    37: [0.05556, 0.75, 0.12861, 0, 0.94444],
    38: [0, 0.69444, 0.08528, 0, 0.88555],
    39: [0, 0.69444, 0.12945, 0, 0.35555],
    40: [0.25, 0.75, 0.15806, 0, 0.47333],
    41: [0.25, 0.75, 0.03306, 0, 0.47333],
    42: [0, 0.75, 0.14333, 0, 0.59111],
    43: [0.10333, 0.60333, 0.03306, 0, 0.88555],
    44: [0.19444, 0.14722, 0, 0, 0.35555],
    45: [0, 0.44444, 0.02611, 0, 0.41444],
    46: [0, 0.14722, 0, 0, 0.35555],
    47: [0.25, 0.75, 0.15806, 0, 0.59111],
    48: [0, 0.64444, 0.13167, 0, 0.59111],
    49: [0, 0.64444, 0.13167, 0, 0.59111],
    50: [0, 0.64444, 0.13167, 0, 0.59111],
    51: [0, 0.64444, 0.13167, 0, 0.59111],
    52: [0.19444, 0.64444, 0.13167, 0, 0.59111],
    53: [0, 0.64444, 0.13167, 0, 0.59111],
    54: [0, 0.64444, 0.13167, 0, 0.59111],
    55: [0.19444, 0.64444, 0.13167, 0, 0.59111],
    56: [0, 0.64444, 0.13167, 0, 0.59111],
    57: [0, 0.64444, 0.13167, 0, 0.59111],
    58: [0, 0.44444, 0.06695, 0, 0.35555],
    59: [0.19444, 0.44444, 0.06695, 0, 0.35555],
    61: [-0.10889, 0.39111, 0.06833, 0, 0.88555],
    63: [0, 0.69444, 0.11472, 0, 0.59111],
    64: [0, 0.69444, 0.09208, 0, 0.88555],
    65: [0, 0.68611, 0, 0, 0.86555],
    66: [0, 0.68611, 0.0992, 0, 0.81666],
    67: [0, 0.68611, 0.14208, 0, 0.82666],
    68: [0, 0.68611, 0.09062, 0, 0.87555],
    69: [0, 0.68611, 0.11431, 0, 0.75666],
    70: [0, 0.68611, 0.12903, 0, 0.72722],
    71: [0, 0.68611, 0.07347, 0, 0.89527],
    72: [0, 0.68611, 0.17208, 0, 0.8961],
    73: [0, 0.68611, 0.15681, 0, 0.47166],
    74: [0, 0.68611, 0.145, 0, 0.61055],
    75: [0, 0.68611, 0.14208, 0, 0.89499],
    76: [0, 0.68611, 0, 0, 0.69777],
    77: [0, 0.68611, 0.17208, 0, 1.07277],
    78: [0, 0.68611, 0.17208, 0, 0.8961],
    79: [0, 0.68611, 0.09062, 0, 0.85499],
    80: [0, 0.68611, 0.0992, 0, 0.78721],
    81: [0.19444, 0.68611, 0.09062, 0, 0.85499],
    82: [0, 0.68611, 0.02559, 0, 0.85944],
    83: [0, 0.68611, 0.11264, 0, 0.64999],
    84: [0, 0.68611, 0.12903, 0, 0.7961],
    85: [0, 0.68611, 0.17208, 0, 0.88083],
    86: [0, 0.68611, 0.18625, 0, 0.86555],
    87: [0, 0.68611, 0.18625, 0, 1.15999],
    88: [0, 0.68611, 0.15681, 0, 0.86555],
    89: [0, 0.68611, 0.19803, 0, 0.86555],
    90: [0, 0.68611, 0.14208, 0, 0.70888],
    91: [0.25, 0.75, 0.1875, 0, 0.35611],
    93: [0.25, 0.75, 0.09972, 0, 0.35611],
    94: [0, 0.69444, 0.06709, 0, 0.59111],
    95: [0.31, 0.13444, 0.09811, 0, 0.59111],
    97: [0, 0.44444, 0.09426, 0, 0.59111],
    98: [0, 0.69444, 0.07861, 0, 0.53222],
    99: [0, 0.44444, 0.05222, 0, 0.53222],
    100: [0, 0.69444, 0.10861, 0, 0.59111],
    101: [0, 0.44444, 0.085, 0, 0.53222],
    102: [0.19444, 0.69444, 0.21778, 0, 0.4],
    103: [0.19444, 0.44444, 0.105, 0, 0.53222],
    104: [0, 0.69444, 0.09426, 0, 0.59111],
    105: [0, 0.69326, 0.11387, 0, 0.35555],
    106: [0.19444, 0.69326, 0.1672, 0, 0.35555],
    107: [0, 0.69444, 0.11111, 0, 0.53222],
    108: [0, 0.69444, 0.10861, 0, 0.29666],
    109: [0, 0.44444, 0.09426, 0, 0.94444],
    110: [0, 0.44444, 0.09426, 0, 0.64999],
    111: [0, 0.44444, 0.07861, 0, 0.59111],
    112: [0.19444, 0.44444, 0.07861, 0, 0.59111],
    113: [0.19444, 0.44444, 0.105, 0, 0.53222],
    114: [0, 0.44444, 0.11111, 0, 0.50167],
    115: [0, 0.44444, 0.08167, 0, 0.48694],
    116: [0, 0.63492, 0.09639, 0, 0.385],
    117: [0, 0.44444, 0.09426, 0, 0.62055],
    118: [0, 0.44444, 0.11111, 0, 0.53222],
    119: [0, 0.44444, 0.11111, 0, 0.76777],
    120: [0, 0.44444, 0.12583, 0, 0.56055],
    121: [0.19444, 0.44444, 0.105, 0, 0.56166],
    122: [0, 0.44444, 0.13889, 0, 0.49055],
    126: [0.35, 0.34444, 0.11472, 0, 0.59111],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.69444, 0.11473, 0, 0.59111],
    176: [0, 0.69444, 0, 0, 0.94888],
    184: [0.17014, 0, 0, 0, 0.53222],
    198: [0, 0.68611, 0.11431, 0, 1.02277],
    216: [0.04861, 0.73472, 0.09062, 0, 0.88555],
    223: [0.19444, 0.69444, 0.09736, 0, 0.665],
    230: [0, 0.44444, 0.085, 0, 0.82666],
    248: [0.09722, 0.54167, 0.09458, 0, 0.59111],
    305: [0, 0.44444, 0.09426, 0, 0.35555],
    338: [0, 0.68611, 0.11431, 0, 1.14054],
    339: [0, 0.44444, 0.085, 0, 0.82666],
    567: [0.19444, 0.44444, 0.04611, 0, 0.385],
    710: [0, 0.69444, 0.06709, 0, 0.59111],
    711: [0, 0.63194, 0.08271, 0, 0.59111],
    713: [0, 0.59444, 0.10444, 0, 0.59111],
    714: [0, 0.69444, 0.08528, 0, 0.59111],
    715: [0, 0.69444, 0, 0, 0.59111],
    728: [0, 0.69444, 0.10333, 0, 0.59111],
    729: [0, 0.69444, 0.12945, 0, 0.35555],
    730: [0, 0.69444, 0, 0, 0.94888],
    732: [0, 0.69444, 0.11472, 0, 0.59111],
    733: [0, 0.69444, 0.11472, 0, 0.59111],
    915: [0, 0.68611, 0.12903, 0, 0.69777],
    916: [0, 0.68611, 0, 0, 0.94444],
    920: [0, 0.68611, 0.09062, 0, 0.88555],
    923: [0, 0.68611, 0, 0, 0.80666],
    926: [0, 0.68611, 0.15092, 0, 0.76777],
    928: [0, 0.68611, 0.17208, 0, 0.8961],
    931: [0, 0.68611, 0.11431, 0, 0.82666],
    933: [0, 0.68611, 0.10778, 0, 0.88555],
    934: [0, 0.68611, 0.05632, 0, 0.82666],
    936: [0, 0.68611, 0.10778, 0, 0.88555],
    937: [0, 0.68611, 0.0992, 0, 0.82666],
    8211: [0, 0.44444, 0.09811, 0, 0.59111],
    8212: [0, 0.44444, 0.09811, 0, 1.18221],
    8216: [0, 0.69444, 0.12945, 0, 0.35555],
    8217: [0, 0.69444, 0.12945, 0, 0.35555],
    8220: [0, 0.69444, 0.16772, 0, 0.62055],
    8221: [0, 0.69444, 0.07939, 0, 0.62055]
  },
  "Main-Italic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.12417, 0, 0.30667],
    34: [0, 0.69444, 0.06961, 0, 0.51444],
    35: [0.19444, 0.69444, 0.06616, 0, 0.81777],
    37: [0.05556, 0.75, 0.13639, 0, 0.81777],
    38: [0, 0.69444, 0.09694, 0, 0.76666],
    39: [0, 0.69444, 0.12417, 0, 0.30667],
    40: [0.25, 0.75, 0.16194, 0, 0.40889],
    41: [0.25, 0.75, 0.03694, 0, 0.40889],
    42: [0, 0.75, 0.14917, 0, 0.51111],
    43: [0.05667, 0.56167, 0.03694, 0, 0.76666],
    44: [0.19444, 0.10556, 0, 0, 0.30667],
    45: [0, 0.43056, 0.02826, 0, 0.35778],
    46: [0, 0.10556, 0, 0, 0.30667],
    47: [0.25, 0.75, 0.16194, 0, 0.51111],
    48: [0, 0.64444, 0.13556, 0, 0.51111],
    49: [0, 0.64444, 0.13556, 0, 0.51111],
    50: [0, 0.64444, 0.13556, 0, 0.51111],
    51: [0, 0.64444, 0.13556, 0, 0.51111],
    52: [0.19444, 0.64444, 0.13556, 0, 0.51111],
    53: [0, 0.64444, 0.13556, 0, 0.51111],
    54: [0, 0.64444, 0.13556, 0, 0.51111],
    55: [0.19444, 0.64444, 0.13556, 0, 0.51111],
    56: [0, 0.64444, 0.13556, 0, 0.51111],
    57: [0, 0.64444, 0.13556, 0, 0.51111],
    58: [0, 0.43056, 0.0582, 0, 0.30667],
    59: [0.19444, 0.43056, 0.0582, 0, 0.30667],
    61: [-0.13313, 0.36687, 0.06616, 0, 0.76666],
    63: [0, 0.69444, 0.1225, 0, 0.51111],
    64: [0, 0.69444, 0.09597, 0, 0.76666],
    65: [0, 0.68333, 0, 0, 0.74333],
    66: [0, 0.68333, 0.10257, 0, 0.70389],
    67: [0, 0.68333, 0.14528, 0, 0.71555],
    68: [0, 0.68333, 0.09403, 0, 0.755],
    69: [0, 0.68333, 0.12028, 0, 0.67833],
    70: [0, 0.68333, 0.13305, 0, 0.65277],
    71: [0, 0.68333, 0.08722, 0, 0.77361],
    72: [0, 0.68333, 0.16389, 0, 0.74333],
    73: [0, 0.68333, 0.15806, 0, 0.38555],
    74: [0, 0.68333, 0.14028, 0, 0.525],
    75: [0, 0.68333, 0.14528, 0, 0.76888],
    76: [0, 0.68333, 0, 0, 0.62722],
    77: [0, 0.68333, 0.16389, 0, 0.89666],
    78: [0, 0.68333, 0.16389, 0, 0.74333],
    79: [0, 0.68333, 0.09403, 0, 0.76666],
    80: [0, 0.68333, 0.10257, 0, 0.67833],
    81: [0.19444, 0.68333, 0.09403, 0, 0.76666],
    82: [0, 0.68333, 0.03868, 0, 0.72944],
    83: [0, 0.68333, 0.11972, 0, 0.56222],
    84: [0, 0.68333, 0.13305, 0, 0.71555],
    85: [0, 0.68333, 0.16389, 0, 0.74333],
    86: [0, 0.68333, 0.18361, 0, 0.74333],
    87: [0, 0.68333, 0.18361, 0, 0.99888],
    88: [0, 0.68333, 0.15806, 0, 0.74333],
    89: [0, 0.68333, 0.19383, 0, 0.74333],
    90: [0, 0.68333, 0.14528, 0, 0.61333],
    91: [0.25, 0.75, 0.1875, 0, 0.30667],
    93: [0.25, 0.75, 0.10528, 0, 0.30667],
    94: [0, 0.69444, 0.06646, 0, 0.51111],
    95: [0.31, 0.12056, 0.09208, 0, 0.51111],
    97: [0, 0.43056, 0.07671, 0, 0.51111],
    98: [0, 0.69444, 0.06312, 0, 0.46],
    99: [0, 0.43056, 0.05653, 0, 0.46],
    100: [0, 0.69444, 0.10333, 0, 0.51111],
    101: [0, 0.43056, 0.07514, 0, 0.46],
    102: [0.19444, 0.69444, 0.21194, 0, 0.30667],
    103: [0.19444, 0.43056, 0.08847, 0, 0.46],
    104: [0, 0.69444, 0.07671, 0, 0.51111],
    105: [0, 0.65536, 0.1019, 0, 0.30667],
    106: [0.19444, 0.65536, 0.14467, 0, 0.30667],
    107: [0, 0.69444, 0.10764, 0, 0.46],
    108: [0, 0.69444, 0.10333, 0, 0.25555],
    109: [0, 0.43056, 0.07671, 0, 0.81777],
    110: [0, 0.43056, 0.07671, 0, 0.56222],
    111: [0, 0.43056, 0.06312, 0, 0.51111],
    112: [0.19444, 0.43056, 0.06312, 0, 0.51111],
    113: [0.19444, 0.43056, 0.08847, 0, 0.46],
    114: [0, 0.43056, 0.10764, 0, 0.42166],
    115: [0, 0.43056, 0.08208, 0, 0.40889],
    116: [0, 0.61508, 0.09486, 0, 0.33222],
    117: [0, 0.43056, 0.07671, 0, 0.53666],
    118: [0, 0.43056, 0.10764, 0, 0.46],
    119: [0, 0.43056, 0.10764, 0, 0.66444],
    120: [0, 0.43056, 0.12042, 0, 0.46389],
    121: [0.19444, 0.43056, 0.08847, 0, 0.48555],
    122: [0, 0.43056, 0.12292, 0, 0.40889],
    126: [0.35, 0.31786, 0.11585, 0, 0.51111],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.66786, 0.10474, 0, 0.51111],
    176: [0, 0.69444, 0, 0, 0.83129],
    184: [0.17014, 0, 0, 0, 0.46],
    198: [0, 0.68333, 0.12028, 0, 0.88277],
    216: [0.04861, 0.73194, 0.09403, 0, 0.76666],
    223: [0.19444, 0.69444, 0.10514, 0, 0.53666],
    230: [0, 0.43056, 0.07514, 0, 0.71555],
    248: [0.09722, 0.52778, 0.09194, 0, 0.51111],
    338: [0, 0.68333, 0.12028, 0, 0.98499],
    339: [0, 0.43056, 0.07514, 0, 0.71555],
    710: [0, 0.69444, 0.06646, 0, 0.51111],
    711: [0, 0.62847, 0.08295, 0, 0.51111],
    713: [0, 0.56167, 0.10333, 0, 0.51111],
    714: [0, 0.69444, 0.09694, 0, 0.51111],
    715: [0, 0.69444, 0, 0, 0.51111],
    728: [0, 0.69444, 0.10806, 0, 0.51111],
    729: [0, 0.66786, 0.11752, 0, 0.30667],
    730: [0, 0.69444, 0, 0, 0.83129],
    732: [0, 0.66786, 0.11585, 0, 0.51111],
    733: [0, 0.69444, 0.1225, 0, 0.51111],
    915: [0, 0.68333, 0.13305, 0, 0.62722],
    916: [0, 0.68333, 0, 0, 0.81777],
    920: [0, 0.68333, 0.09403, 0, 0.76666],
    923: [0, 0.68333, 0, 0, 0.69222],
    926: [0, 0.68333, 0.15294, 0, 0.66444],
    928: [0, 0.68333, 0.16389, 0, 0.74333],
    931: [0, 0.68333, 0.12028, 0, 0.71555],
    933: [0, 0.68333, 0.11111, 0, 0.76666],
    934: [0, 0.68333, 0.05986, 0, 0.71555],
    936: [0, 0.68333, 0.11111, 0, 0.76666],
    937: [0, 0.68333, 0.10257, 0, 0.71555],
    8211: [0, 0.43056, 0.09208, 0, 0.51111],
    8212: [0, 0.43056, 0.09208, 0, 1.02222],
    8216: [0, 0.69444, 0.12417, 0, 0.30667],
    8217: [0, 0.69444, 0.12417, 0, 0.30667],
    8220: [0, 0.69444, 0.1685, 0, 0.51444],
    8221: [0, 0.69444, 0.06961, 0, 0.51444],
    8463: [0, 0.68889, 0, 0, 0.54028]
  },
  "Main-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.27778],
    34: [0, 0.69444, 0, 0, 0.5],
    35: [0.19444, 0.69444, 0, 0, 0.83334],
    36: [0.05556, 0.75, 0, 0, 0.5],
    37: [0.05556, 0.75, 0, 0, 0.83334],
    38: [0, 0.69444, 0, 0, 0.77778],
    39: [0, 0.69444, 0, 0, 0.27778],
    40: [0.25, 0.75, 0, 0, 0.38889],
    41: [0.25, 0.75, 0, 0, 0.38889],
    42: [0, 0.75, 0, 0, 0.5],
    43: [0.08333, 0.58333, 0, 0, 0.77778],
    44: [0.19444, 0.10556, 0, 0, 0.27778],
    45: [0, 0.43056, 0, 0, 0.33333],
    46: [0, 0.10556, 0, 0, 0.27778],
    47: [0.25, 0.75, 0, 0, 0.5],
    48: [0, 0.64444, 0, 0, 0.5],
    49: [0, 0.64444, 0, 0, 0.5],
    50: [0, 0.64444, 0, 0, 0.5],
    51: [0, 0.64444, 0, 0, 0.5],
    52: [0, 0.64444, 0, 0, 0.5],
    53: [0, 0.64444, 0, 0, 0.5],
    54: [0, 0.64444, 0, 0, 0.5],
    55: [0, 0.64444, 0, 0, 0.5],
    56: [0, 0.64444, 0, 0, 0.5],
    57: [0, 0.64444, 0, 0, 0.5],
    58: [0, 0.43056, 0, 0, 0.27778],
    59: [0.19444, 0.43056, 0, 0, 0.27778],
    60: [0.0391, 0.5391, 0, 0, 0.77778],
    61: [-0.13313, 0.36687, 0, 0, 0.77778],
    62: [0.0391, 0.5391, 0, 0, 0.77778],
    63: [0, 0.69444, 0, 0, 0.47222],
    64: [0, 0.69444, 0, 0, 0.77778],
    65: [0, 0.68333, 0, 0, 0.75],
    66: [0, 0.68333, 0, 0, 0.70834],
    67: [0, 0.68333, 0, 0, 0.72222],
    68: [0, 0.68333, 0, 0, 0.76389],
    69: [0, 0.68333, 0, 0, 0.68056],
    70: [0, 0.68333, 0, 0, 0.65278],
    71: [0, 0.68333, 0, 0, 0.78472],
    72: [0, 0.68333, 0, 0, 0.75],
    73: [0, 0.68333, 0, 0, 0.36111],
    74: [0, 0.68333, 0, 0, 0.51389],
    75: [0, 0.68333, 0, 0, 0.77778],
    76: [0, 0.68333, 0, 0, 0.625],
    77: [0, 0.68333, 0, 0, 0.91667],
    78: [0, 0.68333, 0, 0, 0.75],
    79: [0, 0.68333, 0, 0, 0.77778],
    80: [0, 0.68333, 0, 0, 0.68056],
    81: [0.19444, 0.68333, 0, 0, 0.77778],
    82: [0, 0.68333, 0, 0, 0.73611],
    83: [0, 0.68333, 0, 0, 0.55556],
    84: [0, 0.68333, 0, 0, 0.72222],
    85: [0, 0.68333, 0, 0, 0.75],
    86: [0, 0.68333, 0.01389, 0, 0.75],
    87: [0, 0.68333, 0.01389, 0, 1.02778],
    88: [0, 0.68333, 0, 0, 0.75],
    89: [0, 0.68333, 0.025, 0, 0.75],
    90: [0, 0.68333, 0, 0, 0.61111],
    91: [0.25, 0.75, 0, 0, 0.27778],
    92: [0.25, 0.75, 0, 0, 0.5],
    93: [0.25, 0.75, 0, 0, 0.27778],
    94: [0, 0.69444, 0, 0, 0.5],
    95: [0.31, 0.12056, 0.02778, 0, 0.5],
    97: [0, 0.43056, 0, 0, 0.5],
    98: [0, 0.69444, 0, 0, 0.55556],
    99: [0, 0.43056, 0, 0, 0.44445],
    100: [0, 0.69444, 0, 0, 0.55556],
    101: [0, 0.43056, 0, 0, 0.44445],
    102: [0, 0.69444, 0.07778, 0, 0.30556],
    103: [0.19444, 0.43056, 0.01389, 0, 0.5],
    104: [0, 0.69444, 0, 0, 0.55556],
    105: [0, 0.66786, 0, 0, 0.27778],
    106: [0.19444, 0.66786, 0, 0, 0.30556],
    107: [0, 0.69444, 0, 0, 0.52778],
    108: [0, 0.69444, 0, 0, 0.27778],
    109: [0, 0.43056, 0, 0, 0.83334],
    110: [0, 0.43056, 0, 0, 0.55556],
    111: [0, 0.43056, 0, 0, 0.5],
    112: [0.19444, 0.43056, 0, 0, 0.55556],
    113: [0.19444, 0.43056, 0, 0, 0.52778],
    114: [0, 0.43056, 0, 0, 0.39167],
    115: [0, 0.43056, 0, 0, 0.39445],
    116: [0, 0.61508, 0, 0, 0.38889],
    117: [0, 0.43056, 0, 0, 0.55556],
    118: [0, 0.43056, 0.01389, 0, 0.52778],
    119: [0, 0.43056, 0.01389, 0, 0.72222],
    120: [0, 0.43056, 0, 0, 0.52778],
    121: [0.19444, 0.43056, 0.01389, 0, 0.52778],
    122: [0, 0.43056, 0, 0, 0.44445],
    123: [0.25, 0.75, 0, 0, 0.5],
    124: [0.25, 0.75, 0, 0, 0.27778],
    125: [0.25, 0.75, 0, 0, 0.5],
    126: [0.35, 0.31786, 0, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    163: [0, 0.69444, 0, 0, 0.76909],
    167: [0.19444, 0.69444, 0, 0, 0.44445],
    168: [0, 0.66786, 0, 0, 0.5],
    172: [0, 0.43056, 0, 0, 0.66667],
    176: [0, 0.69444, 0, 0, 0.75],
    177: [0.08333, 0.58333, 0, 0, 0.77778],
    182: [0.19444, 0.69444, 0, 0, 0.61111],
    184: [0.17014, 0, 0, 0, 0.44445],
    198: [0, 0.68333, 0, 0, 0.90278],
    215: [0.08333, 0.58333, 0, 0, 0.77778],
    216: [0.04861, 0.73194, 0, 0, 0.77778],
    223: [0, 0.69444, 0, 0, 0.5],
    230: [0, 0.43056, 0, 0, 0.72222],
    247: [0.08333, 0.58333, 0, 0, 0.77778],
    248: [0.09722, 0.52778, 0, 0, 0.5],
    305: [0, 0.43056, 0, 0, 0.27778],
    338: [0, 0.68333, 0, 0, 1.01389],
    339: [0, 0.43056, 0, 0, 0.77778],
    567: [0.19444, 0.43056, 0, 0, 0.30556],
    710: [0, 0.69444, 0, 0, 0.5],
    711: [0, 0.62847, 0, 0, 0.5],
    713: [0, 0.56778, 0, 0, 0.5],
    714: [0, 0.69444, 0, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0, 0, 0.5],
    729: [0, 0.66786, 0, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.75],
    732: [0, 0.66786, 0, 0, 0.5],
    733: [0, 0.69444, 0, 0, 0.5],
    915: [0, 0.68333, 0, 0, 0.625],
    916: [0, 0.68333, 0, 0, 0.83334],
    920: [0, 0.68333, 0, 0, 0.77778],
    923: [0, 0.68333, 0, 0, 0.69445],
    926: [0, 0.68333, 0, 0, 0.66667],
    928: [0, 0.68333, 0, 0, 0.75],
    931: [0, 0.68333, 0, 0, 0.72222],
    933: [0, 0.68333, 0, 0, 0.77778],
    934: [0, 0.68333, 0, 0, 0.72222],
    936: [0, 0.68333, 0, 0, 0.77778],
    937: [0, 0.68333, 0, 0, 0.72222],
    8211: [0, 0.43056, 0.02778, 0, 0.5],
    8212: [0, 0.43056, 0.02778, 0, 1],
    8216: [0, 0.69444, 0, 0, 0.27778],
    8217: [0, 0.69444, 0, 0, 0.27778],
    8220: [0, 0.69444, 0, 0, 0.5],
    8221: [0, 0.69444, 0, 0, 0.5],
    8224: [0.19444, 0.69444, 0, 0, 0.44445],
    8225: [0.19444, 0.69444, 0, 0, 0.44445],
    8230: [0, 0.123, 0, 0, 1.172],
    8242: [0, 0.55556, 0, 0, 0.275],
    8407: [0, 0.71444, 0.15382, 0, 0.5],
    8463: [0, 0.68889, 0, 0, 0.54028],
    8465: [0, 0.69444, 0, 0, 0.72222],
    8467: [0, 0.69444, 0, 0.11111, 0.41667],
    8472: [0.19444, 0.43056, 0, 0.11111, 0.63646],
    8476: [0, 0.69444, 0, 0, 0.72222],
    8501: [0, 0.69444, 0, 0, 0.61111],
    8592: [-0.13313, 0.36687, 0, 0, 1],
    8593: [0.19444, 0.69444, 0, 0, 0.5],
    8594: [-0.13313, 0.36687, 0, 0, 1],
    8595: [0.19444, 0.69444, 0, 0, 0.5],
    8596: [-0.13313, 0.36687, 0, 0, 1],
    8597: [0.25, 0.75, 0, 0, 0.5],
    8598: [0.19444, 0.69444, 0, 0, 1],
    8599: [0.19444, 0.69444, 0, 0, 1],
    8600: [0.19444, 0.69444, 0, 0, 1],
    8601: [0.19444, 0.69444, 0, 0, 1],
    8614: [0.011, 0.511, 0, 0, 1],
    8617: [0.011, 0.511, 0, 0, 1.126],
    8618: [0.011, 0.511, 0, 0, 1.126],
    8636: [-0.13313, 0.36687, 0, 0, 1],
    8637: [-0.13313, 0.36687, 0, 0, 1],
    8640: [-0.13313, 0.36687, 0, 0, 1],
    8641: [-0.13313, 0.36687, 0, 0, 1],
    8652: [0.011, 0.671, 0, 0, 1],
    8656: [-0.13313, 0.36687, 0, 0, 1],
    8657: [0.19444, 0.69444, 0, 0, 0.61111],
    8658: [-0.13313, 0.36687, 0, 0, 1],
    8659: [0.19444, 0.69444, 0, 0, 0.61111],
    8660: [-0.13313, 0.36687, 0, 0, 1],
    8661: [0.25, 0.75, 0, 0, 0.61111],
    8704: [0, 0.69444, 0, 0, 0.55556],
    8706: [0, 0.69444, 0.05556, 0.08334, 0.5309],
    8707: [0, 0.69444, 0, 0, 0.55556],
    8709: [0.05556, 0.75, 0, 0, 0.5],
    8711: [0, 0.68333, 0, 0, 0.83334],
    8712: [0.0391, 0.5391, 0, 0, 0.66667],
    8715: [0.0391, 0.5391, 0, 0, 0.66667],
    8722: [0.08333, 0.58333, 0, 0, 0.77778],
    8723: [0.08333, 0.58333, 0, 0, 0.77778],
    8725: [0.25, 0.75, 0, 0, 0.5],
    8726: [0.25, 0.75, 0, 0, 0.5],
    8727: [-0.03472, 0.46528, 0, 0, 0.5],
    8728: [-0.05555, 0.44445, 0, 0, 0.5],
    8729: [-0.05555, 0.44445, 0, 0, 0.5],
    8730: [0.2, 0.8, 0, 0, 0.83334],
    8733: [0, 0.43056, 0, 0, 0.77778],
    8734: [0, 0.43056, 0, 0, 1],
    8736: [0, 0.69224, 0, 0, 0.72222],
    8739: [0.25, 0.75, 0, 0, 0.27778],
    8741: [0.25, 0.75, 0, 0, 0.5],
    8743: [0, 0.55556, 0, 0, 0.66667],
    8744: [0, 0.55556, 0, 0, 0.66667],
    8745: [0, 0.55556, 0, 0, 0.66667],
    8746: [0, 0.55556, 0, 0, 0.66667],
    8747: [0.19444, 0.69444, 0.11111, 0, 0.41667],
    8764: [-0.13313, 0.36687, 0, 0, 0.77778],
    8768: [0.19444, 0.69444, 0, 0, 0.27778],
    8771: [-0.03625, 0.46375, 0, 0, 0.77778],
    8773: [-0.022, 0.589, 0, 0, 0.778],
    8776: [-0.01688, 0.48312, 0, 0, 0.77778],
    8781: [-0.03625, 0.46375, 0, 0, 0.77778],
    8784: [-0.133, 0.673, 0, 0, 0.778],
    8801: [-0.03625, 0.46375, 0, 0, 0.77778],
    8804: [0.13597, 0.63597, 0, 0, 0.77778],
    8805: [0.13597, 0.63597, 0, 0, 0.77778],
    8810: [0.0391, 0.5391, 0, 0, 1],
    8811: [0.0391, 0.5391, 0, 0, 1],
    8826: [0.0391, 0.5391, 0, 0, 0.77778],
    8827: [0.0391, 0.5391, 0, 0, 0.77778],
    8834: [0.0391, 0.5391, 0, 0, 0.77778],
    8835: [0.0391, 0.5391, 0, 0, 0.77778],
    8838: [0.13597, 0.63597, 0, 0, 0.77778],
    8839: [0.13597, 0.63597, 0, 0, 0.77778],
    8846: [0, 0.55556, 0, 0, 0.66667],
    8849: [0.13597, 0.63597, 0, 0, 0.77778],
    8850: [0.13597, 0.63597, 0, 0, 0.77778],
    8851: [0, 0.55556, 0, 0, 0.66667],
    8852: [0, 0.55556, 0, 0, 0.66667],
    8853: [0.08333, 0.58333, 0, 0, 0.77778],
    8854: [0.08333, 0.58333, 0, 0, 0.77778],
    8855: [0.08333, 0.58333, 0, 0, 0.77778],
    8856: [0.08333, 0.58333, 0, 0, 0.77778],
    8857: [0.08333, 0.58333, 0, 0, 0.77778],
    8866: [0, 0.69444, 0, 0, 0.61111],
    8867: [0, 0.69444, 0, 0, 0.61111],
    8868: [0, 0.69444, 0, 0, 0.77778],
    8869: [0, 0.69444, 0, 0, 0.77778],
    8872: [0.249, 0.75, 0, 0, 0.867],
    8900: [-0.05555, 0.44445, 0, 0, 0.5],
    8901: [-0.05555, 0.44445, 0, 0, 0.27778],
    8902: [-0.03472, 0.46528, 0, 0, 0.5],
    8904: [5e-3, 0.505, 0, 0, 0.9],
    8942: [0.03, 0.903, 0, 0, 0.278],
    8943: [-0.19, 0.313, 0, 0, 1.172],
    8945: [-0.1, 0.823, 0, 0, 1.282],
    8968: [0.25, 0.75, 0, 0, 0.44445],
    8969: [0.25, 0.75, 0, 0, 0.44445],
    8970: [0.25, 0.75, 0, 0, 0.44445],
    8971: [0.25, 0.75, 0, 0, 0.44445],
    8994: [-0.14236, 0.35764, 0, 0, 1],
    8995: [-0.14236, 0.35764, 0, 0, 1],
    9136: [0.244, 0.744, 0, 0, 0.412],
    9137: [0.244, 0.745, 0, 0, 0.412],
    9651: [0.19444, 0.69444, 0, 0, 0.88889],
    9657: [-0.03472, 0.46528, 0, 0, 0.5],
    9661: [0.19444, 0.69444, 0, 0, 0.88889],
    9667: [-0.03472, 0.46528, 0, 0, 0.5],
    9711: [0.19444, 0.69444, 0, 0, 1],
    9824: [0.12963, 0.69444, 0, 0, 0.77778],
    9825: [0.12963, 0.69444, 0, 0, 0.77778],
    9826: [0.12963, 0.69444, 0, 0, 0.77778],
    9827: [0.12963, 0.69444, 0, 0, 0.77778],
    9837: [0, 0.75, 0, 0, 0.38889],
    9838: [0.19444, 0.69444, 0, 0, 0.38889],
    9839: [0.19444, 0.69444, 0, 0, 0.38889],
    10216: [0.25, 0.75, 0, 0, 0.38889],
    10217: [0.25, 0.75, 0, 0, 0.38889],
    10222: [0.244, 0.744, 0, 0, 0.412],
    10223: [0.244, 0.745, 0, 0, 0.412],
    10229: [0.011, 0.511, 0, 0, 1.609],
    10230: [0.011, 0.511, 0, 0, 1.638],
    10231: [0.011, 0.511, 0, 0, 1.859],
    10232: [0.024, 0.525, 0, 0, 1.609],
    10233: [0.024, 0.525, 0, 0, 1.638],
    10234: [0.024, 0.525, 0, 0, 1.858],
    10236: [0.011, 0.511, 0, 0, 1.638],
    10815: [0, 0.68333, 0, 0, 0.75],
    10927: [0.13597, 0.63597, 0, 0, 0.77778],
    10928: [0.13597, 0.63597, 0, 0, 0.77778],
    57376: [0.19444, 0.69444, 0, 0, 0]
  },
  "Math-BoldItalic": {
    32: [0, 0, 0, 0, 0.25],
    48: [0, 0.44444, 0, 0, 0.575],
    49: [0, 0.44444, 0, 0, 0.575],
    50: [0, 0.44444, 0, 0, 0.575],
    51: [0.19444, 0.44444, 0, 0, 0.575],
    52: [0.19444, 0.44444, 0, 0, 0.575],
    53: [0.19444, 0.44444, 0, 0, 0.575],
    54: [0, 0.64444, 0, 0, 0.575],
    55: [0.19444, 0.44444, 0, 0, 0.575],
    56: [0, 0.64444, 0, 0, 0.575],
    57: [0.19444, 0.44444, 0, 0, 0.575],
    65: [0, 0.68611, 0, 0, 0.86944],
    66: [0, 0.68611, 0.04835, 0, 0.8664],
    67: [0, 0.68611, 0.06979, 0, 0.81694],
    68: [0, 0.68611, 0.03194, 0, 0.93812],
    69: [0, 0.68611, 0.05451, 0, 0.81007],
    70: [0, 0.68611, 0.15972, 0, 0.68889],
    71: [0, 0.68611, 0, 0, 0.88673],
    72: [0, 0.68611, 0.08229, 0, 0.98229],
    73: [0, 0.68611, 0.07778, 0, 0.51111],
    74: [0, 0.68611, 0.10069, 0, 0.63125],
    75: [0, 0.68611, 0.06979, 0, 0.97118],
    76: [0, 0.68611, 0, 0, 0.75555],
    77: [0, 0.68611, 0.11424, 0, 1.14201],
    78: [0, 0.68611, 0.11424, 0, 0.95034],
    79: [0, 0.68611, 0.03194, 0, 0.83666],
    80: [0, 0.68611, 0.15972, 0, 0.72309],
    81: [0.19444, 0.68611, 0, 0, 0.86861],
    82: [0, 0.68611, 421e-5, 0, 0.87235],
    83: [0, 0.68611, 0.05382, 0, 0.69271],
    84: [0, 0.68611, 0.15972, 0, 0.63663],
    85: [0, 0.68611, 0.11424, 0, 0.80027],
    86: [0, 0.68611, 0.25555, 0, 0.67778],
    87: [0, 0.68611, 0.15972, 0, 1.09305],
    88: [0, 0.68611, 0.07778, 0, 0.94722],
    89: [0, 0.68611, 0.25555, 0, 0.67458],
    90: [0, 0.68611, 0.06979, 0, 0.77257],
    97: [0, 0.44444, 0, 0, 0.63287],
    98: [0, 0.69444, 0, 0, 0.52083],
    99: [0, 0.44444, 0, 0, 0.51342],
    100: [0, 0.69444, 0, 0, 0.60972],
    101: [0, 0.44444, 0, 0, 0.55361],
    102: [0.19444, 0.69444, 0.11042, 0, 0.56806],
    103: [0.19444, 0.44444, 0.03704, 0, 0.5449],
    104: [0, 0.69444, 0, 0, 0.66759],
    105: [0, 0.69326, 0, 0, 0.4048],
    106: [0.19444, 0.69326, 0.0622, 0, 0.47083],
    107: [0, 0.69444, 0.01852, 0, 0.6037],
    108: [0, 0.69444, 88e-4, 0, 0.34815],
    109: [0, 0.44444, 0, 0, 1.0324],
    110: [0, 0.44444, 0, 0, 0.71296],
    111: [0, 0.44444, 0, 0, 0.58472],
    112: [0.19444, 0.44444, 0, 0, 0.60092],
    113: [0.19444, 0.44444, 0.03704, 0, 0.54213],
    114: [0, 0.44444, 0.03194, 0, 0.5287],
    115: [0, 0.44444, 0, 0, 0.53125],
    116: [0, 0.63492, 0, 0, 0.41528],
    117: [0, 0.44444, 0, 0, 0.68102],
    118: [0, 0.44444, 0.03704, 0, 0.56666],
    119: [0, 0.44444, 0.02778, 0, 0.83148],
    120: [0, 0.44444, 0, 0, 0.65903],
    121: [0.19444, 0.44444, 0.03704, 0, 0.59028],
    122: [0, 0.44444, 0.04213, 0, 0.55509],
    160: [0, 0, 0, 0, 0.25],
    915: [0, 0.68611, 0.15972, 0, 0.65694],
    916: [0, 0.68611, 0, 0, 0.95833],
    920: [0, 0.68611, 0.03194, 0, 0.86722],
    923: [0, 0.68611, 0, 0, 0.80555],
    926: [0, 0.68611, 0.07458, 0, 0.84125],
    928: [0, 0.68611, 0.08229, 0, 0.98229],
    931: [0, 0.68611, 0.05451, 0, 0.88507],
    933: [0, 0.68611, 0.15972, 0, 0.67083],
    934: [0, 0.68611, 0, 0, 0.76666],
    936: [0, 0.68611, 0.11653, 0, 0.71402],
    937: [0, 0.68611, 0.04835, 0, 0.8789],
    945: [0, 0.44444, 0, 0, 0.76064],
    946: [0.19444, 0.69444, 0.03403, 0, 0.65972],
    947: [0.19444, 0.44444, 0.06389, 0, 0.59003],
    948: [0, 0.69444, 0.03819, 0, 0.52222],
    949: [0, 0.44444, 0, 0, 0.52882],
    950: [0.19444, 0.69444, 0.06215, 0, 0.50833],
    951: [0.19444, 0.44444, 0.03704, 0, 0.6],
    952: [0, 0.69444, 0.03194, 0, 0.5618],
    953: [0, 0.44444, 0, 0, 0.41204],
    954: [0, 0.44444, 0, 0, 0.66759],
    955: [0, 0.69444, 0, 0, 0.67083],
    956: [0.19444, 0.44444, 0, 0, 0.70787],
    957: [0, 0.44444, 0.06898, 0, 0.57685],
    958: [0.19444, 0.69444, 0.03021, 0, 0.50833],
    959: [0, 0.44444, 0, 0, 0.58472],
    960: [0, 0.44444, 0.03704, 0, 0.68241],
    961: [0.19444, 0.44444, 0, 0, 0.6118],
    962: [0.09722, 0.44444, 0.07917, 0, 0.42361],
    963: [0, 0.44444, 0.03704, 0, 0.68588],
    964: [0, 0.44444, 0.13472, 0, 0.52083],
    965: [0, 0.44444, 0.03704, 0, 0.63055],
    966: [0.19444, 0.44444, 0, 0, 0.74722],
    967: [0.19444, 0.44444, 0, 0, 0.71805],
    968: [0.19444, 0.69444, 0.03704, 0, 0.75833],
    969: [0, 0.44444, 0.03704, 0, 0.71782],
    977: [0, 0.69444, 0, 0, 0.69155],
    981: [0.19444, 0.69444, 0, 0, 0.7125],
    982: [0, 0.44444, 0.03194, 0, 0.975],
    1009: [0.19444, 0.44444, 0, 0, 0.6118],
    1013: [0, 0.44444, 0, 0, 0.48333],
    57649: [0, 0.44444, 0, 0, 0.39352],
    57911: [0.19444, 0.44444, 0, 0, 0.43889]
  },
  "Math-Italic": {
    32: [0, 0, 0, 0, 0.25],
    48: [0, 0.43056, 0, 0, 0.5],
    49: [0, 0.43056, 0, 0, 0.5],
    50: [0, 0.43056, 0, 0, 0.5],
    51: [0.19444, 0.43056, 0, 0, 0.5],
    52: [0.19444, 0.43056, 0, 0, 0.5],
    53: [0.19444, 0.43056, 0, 0, 0.5],
    54: [0, 0.64444, 0, 0, 0.5],
    55: [0.19444, 0.43056, 0, 0, 0.5],
    56: [0, 0.64444, 0, 0, 0.5],
    57: [0.19444, 0.43056, 0, 0, 0.5],
    65: [0, 0.68333, 0, 0.13889, 0.75],
    66: [0, 0.68333, 0.05017, 0.08334, 0.75851],
    67: [0, 0.68333, 0.07153, 0.08334, 0.71472],
    68: [0, 0.68333, 0.02778, 0.05556, 0.82792],
    69: [0, 0.68333, 0.05764, 0.08334, 0.7382],
    70: [0, 0.68333, 0.13889, 0.08334, 0.64306],
    71: [0, 0.68333, 0, 0.08334, 0.78625],
    72: [0, 0.68333, 0.08125, 0.05556, 0.83125],
    73: [0, 0.68333, 0.07847, 0.11111, 0.43958],
    74: [0, 0.68333, 0.09618, 0.16667, 0.55451],
    75: [0, 0.68333, 0.07153, 0.05556, 0.84931],
    76: [0, 0.68333, 0, 0.02778, 0.68056],
    77: [0, 0.68333, 0.10903, 0.08334, 0.97014],
    78: [0, 0.68333, 0.10903, 0.08334, 0.80347],
    79: [0, 0.68333, 0.02778, 0.08334, 0.76278],
    80: [0, 0.68333, 0.13889, 0.08334, 0.64201],
    81: [0.19444, 0.68333, 0, 0.08334, 0.79056],
    82: [0, 0.68333, 773e-5, 0.08334, 0.75929],
    83: [0, 0.68333, 0.05764, 0.08334, 0.6132],
    84: [0, 0.68333, 0.13889, 0.08334, 0.58438],
    85: [0, 0.68333, 0.10903, 0.02778, 0.68278],
    86: [0, 0.68333, 0.22222, 0, 0.58333],
    87: [0, 0.68333, 0.13889, 0, 0.94445],
    88: [0, 0.68333, 0.07847, 0.08334, 0.82847],
    89: [0, 0.68333, 0.22222, 0, 0.58056],
    90: [0, 0.68333, 0.07153, 0.08334, 0.68264],
    97: [0, 0.43056, 0, 0, 0.52859],
    98: [0, 0.69444, 0, 0, 0.42917],
    99: [0, 0.43056, 0, 0.05556, 0.43276],
    100: [0, 0.69444, 0, 0.16667, 0.52049],
    101: [0, 0.43056, 0, 0.05556, 0.46563],
    102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
    103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
    104: [0, 0.69444, 0, 0, 0.57616],
    105: [0, 0.65952, 0, 0, 0.34451],
    106: [0.19444, 0.65952, 0.05724, 0, 0.41181],
    107: [0, 0.69444, 0.03148, 0, 0.5206],
    108: [0, 0.69444, 0.01968, 0.08334, 0.29838],
    109: [0, 0.43056, 0, 0, 0.87801],
    110: [0, 0.43056, 0, 0, 0.60023],
    111: [0, 0.43056, 0, 0.05556, 0.48472],
    112: [0.19444, 0.43056, 0, 0.08334, 0.50313],
    113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
    114: [0, 0.43056, 0.02778, 0.05556, 0.45116],
    115: [0, 0.43056, 0, 0.05556, 0.46875],
    116: [0, 0.61508, 0, 0.08334, 0.36111],
    117: [0, 0.43056, 0, 0.02778, 0.57246],
    118: [0, 0.43056, 0.03588, 0.02778, 0.48472],
    119: [0, 0.43056, 0.02691, 0.08334, 0.71592],
    120: [0, 0.43056, 0, 0.02778, 0.57153],
    121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
    122: [0, 0.43056, 0.04398, 0.05556, 0.46505],
    160: [0, 0, 0, 0, 0.25],
    915: [0, 0.68333, 0.13889, 0.08334, 0.61528],
    916: [0, 0.68333, 0, 0.16667, 0.83334],
    920: [0, 0.68333, 0.02778, 0.08334, 0.76278],
    923: [0, 0.68333, 0, 0.16667, 0.69445],
    926: [0, 0.68333, 0.07569, 0.08334, 0.74236],
    928: [0, 0.68333, 0.08125, 0.05556, 0.83125],
    931: [0, 0.68333, 0.05764, 0.08334, 0.77986],
    933: [0, 0.68333, 0.13889, 0.05556, 0.58333],
    934: [0, 0.68333, 0, 0.08334, 0.66667],
    936: [0, 0.68333, 0.11, 0.05556, 0.61222],
    937: [0, 0.68333, 0.05017, 0.08334, 0.7724],
    945: [0, 0.43056, 37e-4, 0.02778, 0.6397],
    946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
    947: [0.19444, 0.43056, 0.05556, 0, 0.51773],
    948: [0, 0.69444, 0.03785, 0.05556, 0.44444],
    949: [0, 0.43056, 0, 0.08334, 0.46632],
    950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
    951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
    952: [0, 0.69444, 0.02778, 0.08334, 0.46944],
    953: [0, 0.43056, 0, 0.05556, 0.35394],
    954: [0, 0.43056, 0, 0, 0.57616],
    955: [0, 0.69444, 0, 0, 0.58334],
    956: [0.19444, 0.43056, 0, 0.02778, 0.60255],
    957: [0, 0.43056, 0.06366, 0.02778, 0.49398],
    958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
    959: [0, 0.43056, 0, 0.05556, 0.48472],
    960: [0, 0.43056, 0.03588, 0, 0.57003],
    961: [0.19444, 0.43056, 0, 0.08334, 0.51702],
    962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
    963: [0, 0.43056, 0.03588, 0, 0.57141],
    964: [0, 0.43056, 0.1132, 0.02778, 0.43715],
    965: [0, 0.43056, 0.03588, 0.02778, 0.54028],
    966: [0.19444, 0.43056, 0, 0.08334, 0.65417],
    967: [0.19444, 0.43056, 0, 0.05556, 0.62569],
    968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
    969: [0, 0.43056, 0.03588, 0, 0.62245],
    977: [0, 0.69444, 0, 0.08334, 0.59144],
    981: [0.19444, 0.69444, 0, 0.08334, 0.59583],
    982: [0, 0.43056, 0.02778, 0, 0.82813],
    1009: [0.19444, 0.43056, 0, 0.08334, 0.51702],
    1013: [0, 0.43056, 0, 0.05556, 0.4059],
    57649: [0, 0.43056, 0, 0.02778, 0.32246],
    57911: [0.19444, 0.43056, 0, 0.08334, 0.38403]
  },
  "SansSerif-Bold": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.36667],
    34: [0, 0.69444, 0, 0, 0.55834],
    35: [0.19444, 0.69444, 0, 0, 0.91667],
    36: [0.05556, 0.75, 0, 0, 0.55],
    37: [0.05556, 0.75, 0, 0, 1.02912],
    38: [0, 0.69444, 0, 0, 0.83056],
    39: [0, 0.69444, 0, 0, 0.30556],
    40: [0.25, 0.75, 0, 0, 0.42778],
    41: [0.25, 0.75, 0, 0, 0.42778],
    42: [0, 0.75, 0, 0, 0.55],
    43: [0.11667, 0.61667, 0, 0, 0.85556],
    44: [0.10556, 0.13056, 0, 0, 0.30556],
    45: [0, 0.45833, 0, 0, 0.36667],
    46: [0, 0.13056, 0, 0, 0.30556],
    47: [0.25, 0.75, 0, 0, 0.55],
    48: [0, 0.69444, 0, 0, 0.55],
    49: [0, 0.69444, 0, 0, 0.55],
    50: [0, 0.69444, 0, 0, 0.55],
    51: [0, 0.69444, 0, 0, 0.55],
    52: [0, 0.69444, 0, 0, 0.55],
    53: [0, 0.69444, 0, 0, 0.55],
    54: [0, 0.69444, 0, 0, 0.55],
    55: [0, 0.69444, 0, 0, 0.55],
    56: [0, 0.69444, 0, 0, 0.55],
    57: [0, 0.69444, 0, 0, 0.55],
    58: [0, 0.45833, 0, 0, 0.30556],
    59: [0.10556, 0.45833, 0, 0, 0.30556],
    61: [-0.09375, 0.40625, 0, 0, 0.85556],
    63: [0, 0.69444, 0, 0, 0.51945],
    64: [0, 0.69444, 0, 0, 0.73334],
    65: [0, 0.69444, 0, 0, 0.73334],
    66: [0, 0.69444, 0, 0, 0.73334],
    67: [0, 0.69444, 0, 0, 0.70278],
    68: [0, 0.69444, 0, 0, 0.79445],
    69: [0, 0.69444, 0, 0, 0.64167],
    70: [0, 0.69444, 0, 0, 0.61111],
    71: [0, 0.69444, 0, 0, 0.73334],
    72: [0, 0.69444, 0, 0, 0.79445],
    73: [0, 0.69444, 0, 0, 0.33056],
    74: [0, 0.69444, 0, 0, 0.51945],
    75: [0, 0.69444, 0, 0, 0.76389],
    76: [0, 0.69444, 0, 0, 0.58056],
    77: [0, 0.69444, 0, 0, 0.97778],
    78: [0, 0.69444, 0, 0, 0.79445],
    79: [0, 0.69444, 0, 0, 0.79445],
    80: [0, 0.69444, 0, 0, 0.70278],
    81: [0.10556, 0.69444, 0, 0, 0.79445],
    82: [0, 0.69444, 0, 0, 0.70278],
    83: [0, 0.69444, 0, 0, 0.61111],
    84: [0, 0.69444, 0, 0, 0.73334],
    85: [0, 0.69444, 0, 0, 0.76389],
    86: [0, 0.69444, 0.01528, 0, 0.73334],
    87: [0, 0.69444, 0.01528, 0, 1.03889],
    88: [0, 0.69444, 0, 0, 0.73334],
    89: [0, 0.69444, 0.0275, 0, 0.73334],
    90: [0, 0.69444, 0, 0, 0.67223],
    91: [0.25, 0.75, 0, 0, 0.34306],
    93: [0.25, 0.75, 0, 0, 0.34306],
    94: [0, 0.69444, 0, 0, 0.55],
    95: [0.35, 0.10833, 0.03056, 0, 0.55],
    97: [0, 0.45833, 0, 0, 0.525],
    98: [0, 0.69444, 0, 0, 0.56111],
    99: [0, 0.45833, 0, 0, 0.48889],
    100: [0, 0.69444, 0, 0, 0.56111],
    101: [0, 0.45833, 0, 0, 0.51111],
    102: [0, 0.69444, 0.07639, 0, 0.33611],
    103: [0.19444, 0.45833, 0.01528, 0, 0.55],
    104: [0, 0.69444, 0, 0, 0.56111],
    105: [0, 0.69444, 0, 0, 0.25556],
    106: [0.19444, 0.69444, 0, 0, 0.28611],
    107: [0, 0.69444, 0, 0, 0.53056],
    108: [0, 0.69444, 0, 0, 0.25556],
    109: [0, 0.45833, 0, 0, 0.86667],
    110: [0, 0.45833, 0, 0, 0.56111],
    111: [0, 0.45833, 0, 0, 0.55],
    112: [0.19444, 0.45833, 0, 0, 0.56111],
    113: [0.19444, 0.45833, 0, 0, 0.56111],
    114: [0, 0.45833, 0.01528, 0, 0.37222],
    115: [0, 0.45833, 0, 0, 0.42167],
    116: [0, 0.58929, 0, 0, 0.40417],
    117: [0, 0.45833, 0, 0, 0.56111],
    118: [0, 0.45833, 0.01528, 0, 0.5],
    119: [0, 0.45833, 0.01528, 0, 0.74445],
    120: [0, 0.45833, 0, 0, 0.5],
    121: [0.19444, 0.45833, 0.01528, 0, 0.5],
    122: [0, 0.45833, 0, 0, 0.47639],
    126: [0.35, 0.34444, 0, 0, 0.55],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.69444, 0, 0, 0.55],
    176: [0, 0.69444, 0, 0, 0.73334],
    180: [0, 0.69444, 0, 0, 0.55],
    184: [0.17014, 0, 0, 0, 0.48889],
    305: [0, 0.45833, 0, 0, 0.25556],
    567: [0.19444, 0.45833, 0, 0, 0.28611],
    710: [0, 0.69444, 0, 0, 0.55],
    711: [0, 0.63542, 0, 0, 0.55],
    713: [0, 0.63778, 0, 0, 0.55],
    728: [0, 0.69444, 0, 0, 0.55],
    729: [0, 0.69444, 0, 0, 0.30556],
    730: [0, 0.69444, 0, 0, 0.73334],
    732: [0, 0.69444, 0, 0, 0.55],
    733: [0, 0.69444, 0, 0, 0.55],
    915: [0, 0.69444, 0, 0, 0.58056],
    916: [0, 0.69444, 0, 0, 0.91667],
    920: [0, 0.69444, 0, 0, 0.85556],
    923: [0, 0.69444, 0, 0, 0.67223],
    926: [0, 0.69444, 0, 0, 0.73334],
    928: [0, 0.69444, 0, 0, 0.79445],
    931: [0, 0.69444, 0, 0, 0.79445],
    933: [0, 0.69444, 0, 0, 0.85556],
    934: [0, 0.69444, 0, 0, 0.79445],
    936: [0, 0.69444, 0, 0, 0.85556],
    937: [0, 0.69444, 0, 0, 0.79445],
    8211: [0, 0.45833, 0.03056, 0, 0.55],
    8212: [0, 0.45833, 0.03056, 0, 1.10001],
    8216: [0, 0.69444, 0, 0, 0.30556],
    8217: [0, 0.69444, 0, 0, 0.30556],
    8220: [0, 0.69444, 0, 0, 0.55834],
    8221: [0, 0.69444, 0, 0, 0.55834]
  },
  "SansSerif-Italic": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0.05733, 0, 0.31945],
    34: [0, 0.69444, 316e-5, 0, 0.5],
    35: [0.19444, 0.69444, 0.05087, 0, 0.83334],
    36: [0.05556, 0.75, 0.11156, 0, 0.5],
    37: [0.05556, 0.75, 0.03126, 0, 0.83334],
    38: [0, 0.69444, 0.03058, 0, 0.75834],
    39: [0, 0.69444, 0.07816, 0, 0.27778],
    40: [0.25, 0.75, 0.13164, 0, 0.38889],
    41: [0.25, 0.75, 0.02536, 0, 0.38889],
    42: [0, 0.75, 0.11775, 0, 0.5],
    43: [0.08333, 0.58333, 0.02536, 0, 0.77778],
    44: [0.125, 0.08333, 0, 0, 0.27778],
    45: [0, 0.44444, 0.01946, 0, 0.33333],
    46: [0, 0.08333, 0, 0, 0.27778],
    47: [0.25, 0.75, 0.13164, 0, 0.5],
    48: [0, 0.65556, 0.11156, 0, 0.5],
    49: [0, 0.65556, 0.11156, 0, 0.5],
    50: [0, 0.65556, 0.11156, 0, 0.5],
    51: [0, 0.65556, 0.11156, 0, 0.5],
    52: [0, 0.65556, 0.11156, 0, 0.5],
    53: [0, 0.65556, 0.11156, 0, 0.5],
    54: [0, 0.65556, 0.11156, 0, 0.5],
    55: [0, 0.65556, 0.11156, 0, 0.5],
    56: [0, 0.65556, 0.11156, 0, 0.5],
    57: [0, 0.65556, 0.11156, 0, 0.5],
    58: [0, 0.44444, 0.02502, 0, 0.27778],
    59: [0.125, 0.44444, 0.02502, 0, 0.27778],
    61: [-0.13, 0.37, 0.05087, 0, 0.77778],
    63: [0, 0.69444, 0.11809, 0, 0.47222],
    64: [0, 0.69444, 0.07555, 0, 0.66667],
    65: [0, 0.69444, 0, 0, 0.66667],
    66: [0, 0.69444, 0.08293, 0, 0.66667],
    67: [0, 0.69444, 0.11983, 0, 0.63889],
    68: [0, 0.69444, 0.07555, 0, 0.72223],
    69: [0, 0.69444, 0.11983, 0, 0.59722],
    70: [0, 0.69444, 0.13372, 0, 0.56945],
    71: [0, 0.69444, 0.11983, 0, 0.66667],
    72: [0, 0.69444, 0.08094, 0, 0.70834],
    73: [0, 0.69444, 0.13372, 0, 0.27778],
    74: [0, 0.69444, 0.08094, 0, 0.47222],
    75: [0, 0.69444, 0.11983, 0, 0.69445],
    76: [0, 0.69444, 0, 0, 0.54167],
    77: [0, 0.69444, 0.08094, 0, 0.875],
    78: [0, 0.69444, 0.08094, 0, 0.70834],
    79: [0, 0.69444, 0.07555, 0, 0.73611],
    80: [0, 0.69444, 0.08293, 0, 0.63889],
    81: [0.125, 0.69444, 0.07555, 0, 0.73611],
    82: [0, 0.69444, 0.08293, 0, 0.64584],
    83: [0, 0.69444, 0.09205, 0, 0.55556],
    84: [0, 0.69444, 0.13372, 0, 0.68056],
    85: [0, 0.69444, 0.08094, 0, 0.6875],
    86: [0, 0.69444, 0.1615, 0, 0.66667],
    87: [0, 0.69444, 0.1615, 0, 0.94445],
    88: [0, 0.69444, 0.13372, 0, 0.66667],
    89: [0, 0.69444, 0.17261, 0, 0.66667],
    90: [0, 0.69444, 0.11983, 0, 0.61111],
    91: [0.25, 0.75, 0.15942, 0, 0.28889],
    93: [0.25, 0.75, 0.08719, 0, 0.28889],
    94: [0, 0.69444, 0.0799, 0, 0.5],
    95: [0.35, 0.09444, 0.08616, 0, 0.5],
    97: [0, 0.44444, 981e-5, 0, 0.48056],
    98: [0, 0.69444, 0.03057, 0, 0.51667],
    99: [0, 0.44444, 0.08336, 0, 0.44445],
    100: [0, 0.69444, 0.09483, 0, 0.51667],
    101: [0, 0.44444, 0.06778, 0, 0.44445],
    102: [0, 0.69444, 0.21705, 0, 0.30556],
    103: [0.19444, 0.44444, 0.10836, 0, 0.5],
    104: [0, 0.69444, 0.01778, 0, 0.51667],
    105: [0, 0.67937, 0.09718, 0, 0.23889],
    106: [0.19444, 0.67937, 0.09162, 0, 0.26667],
    107: [0, 0.69444, 0.08336, 0, 0.48889],
    108: [0, 0.69444, 0.09483, 0, 0.23889],
    109: [0, 0.44444, 0.01778, 0, 0.79445],
    110: [0, 0.44444, 0.01778, 0, 0.51667],
    111: [0, 0.44444, 0.06613, 0, 0.5],
    112: [0.19444, 0.44444, 0.0389, 0, 0.51667],
    113: [0.19444, 0.44444, 0.04169, 0, 0.51667],
    114: [0, 0.44444, 0.10836, 0, 0.34167],
    115: [0, 0.44444, 0.0778, 0, 0.38333],
    116: [0, 0.57143, 0.07225, 0, 0.36111],
    117: [0, 0.44444, 0.04169, 0, 0.51667],
    118: [0, 0.44444, 0.10836, 0, 0.46111],
    119: [0, 0.44444, 0.10836, 0, 0.68334],
    120: [0, 0.44444, 0.09169, 0, 0.46111],
    121: [0.19444, 0.44444, 0.10836, 0, 0.46111],
    122: [0, 0.44444, 0.08752, 0, 0.43472],
    126: [0.35, 0.32659, 0.08826, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.67937, 0.06385, 0, 0.5],
    176: [0, 0.69444, 0, 0, 0.73752],
    184: [0.17014, 0, 0, 0, 0.44445],
    305: [0, 0.44444, 0.04169, 0, 0.23889],
    567: [0.19444, 0.44444, 0.04169, 0, 0.26667],
    710: [0, 0.69444, 0.0799, 0, 0.5],
    711: [0, 0.63194, 0.08432, 0, 0.5],
    713: [0, 0.60889, 0.08776, 0, 0.5],
    714: [0, 0.69444, 0.09205, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0.09483, 0, 0.5],
    729: [0, 0.67937, 0.07774, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.73752],
    732: [0, 0.67659, 0.08826, 0, 0.5],
    733: [0, 0.69444, 0.09205, 0, 0.5],
    915: [0, 0.69444, 0.13372, 0, 0.54167],
    916: [0, 0.69444, 0, 0, 0.83334],
    920: [0, 0.69444, 0.07555, 0, 0.77778],
    923: [0, 0.69444, 0, 0, 0.61111],
    926: [0, 0.69444, 0.12816, 0, 0.66667],
    928: [0, 0.69444, 0.08094, 0, 0.70834],
    931: [0, 0.69444, 0.11983, 0, 0.72222],
    933: [0, 0.69444, 0.09031, 0, 0.77778],
    934: [0, 0.69444, 0.04603, 0, 0.72222],
    936: [0, 0.69444, 0.09031, 0, 0.77778],
    937: [0, 0.69444, 0.08293, 0, 0.72222],
    8211: [0, 0.44444, 0.08616, 0, 0.5],
    8212: [0, 0.44444, 0.08616, 0, 1],
    8216: [0, 0.69444, 0.07816, 0, 0.27778],
    8217: [0, 0.69444, 0.07816, 0, 0.27778],
    8220: [0, 0.69444, 0.14205, 0, 0.5],
    8221: [0, 0.69444, 316e-5, 0, 0.5]
  },
  "SansSerif-Regular": {
    32: [0, 0, 0, 0, 0.25],
    33: [0, 0.69444, 0, 0, 0.31945],
    34: [0, 0.69444, 0, 0, 0.5],
    35: [0.19444, 0.69444, 0, 0, 0.83334],
    36: [0.05556, 0.75, 0, 0, 0.5],
    37: [0.05556, 0.75, 0, 0, 0.83334],
    38: [0, 0.69444, 0, 0, 0.75834],
    39: [0, 0.69444, 0, 0, 0.27778],
    40: [0.25, 0.75, 0, 0, 0.38889],
    41: [0.25, 0.75, 0, 0, 0.38889],
    42: [0, 0.75, 0, 0, 0.5],
    43: [0.08333, 0.58333, 0, 0, 0.77778],
    44: [0.125, 0.08333, 0, 0, 0.27778],
    45: [0, 0.44444, 0, 0, 0.33333],
    46: [0, 0.08333, 0, 0, 0.27778],
    47: [0.25, 0.75, 0, 0, 0.5],
    48: [0, 0.65556, 0, 0, 0.5],
    49: [0, 0.65556, 0, 0, 0.5],
    50: [0, 0.65556, 0, 0, 0.5],
    51: [0, 0.65556, 0, 0, 0.5],
    52: [0, 0.65556, 0, 0, 0.5],
    53: [0, 0.65556, 0, 0, 0.5],
    54: [0, 0.65556, 0, 0, 0.5],
    55: [0, 0.65556, 0, 0, 0.5],
    56: [0, 0.65556, 0, 0, 0.5],
    57: [0, 0.65556, 0, 0, 0.5],
    58: [0, 0.44444, 0, 0, 0.27778],
    59: [0.125, 0.44444, 0, 0, 0.27778],
    61: [-0.13, 0.37, 0, 0, 0.77778],
    63: [0, 0.69444, 0, 0, 0.47222],
    64: [0, 0.69444, 0, 0, 0.66667],
    65: [0, 0.69444, 0, 0, 0.66667],
    66: [0, 0.69444, 0, 0, 0.66667],
    67: [0, 0.69444, 0, 0, 0.63889],
    68: [0, 0.69444, 0, 0, 0.72223],
    69: [0, 0.69444, 0, 0, 0.59722],
    70: [0, 0.69444, 0, 0, 0.56945],
    71: [0, 0.69444, 0, 0, 0.66667],
    72: [0, 0.69444, 0, 0, 0.70834],
    73: [0, 0.69444, 0, 0, 0.27778],
    74: [0, 0.69444, 0, 0, 0.47222],
    75: [0, 0.69444, 0, 0, 0.69445],
    76: [0, 0.69444, 0, 0, 0.54167],
    77: [0, 0.69444, 0, 0, 0.875],
    78: [0, 0.69444, 0, 0, 0.70834],
    79: [0, 0.69444, 0, 0, 0.73611],
    80: [0, 0.69444, 0, 0, 0.63889],
    81: [0.125, 0.69444, 0, 0, 0.73611],
    82: [0, 0.69444, 0, 0, 0.64584],
    83: [0, 0.69444, 0, 0, 0.55556],
    84: [0, 0.69444, 0, 0, 0.68056],
    85: [0, 0.69444, 0, 0, 0.6875],
    86: [0, 0.69444, 0.01389, 0, 0.66667],
    87: [0, 0.69444, 0.01389, 0, 0.94445],
    88: [0, 0.69444, 0, 0, 0.66667],
    89: [0, 0.69444, 0.025, 0, 0.66667],
    90: [0, 0.69444, 0, 0, 0.61111],
    91: [0.25, 0.75, 0, 0, 0.28889],
    93: [0.25, 0.75, 0, 0, 0.28889],
    94: [0, 0.69444, 0, 0, 0.5],
    95: [0.35, 0.09444, 0.02778, 0, 0.5],
    97: [0, 0.44444, 0, 0, 0.48056],
    98: [0, 0.69444, 0, 0, 0.51667],
    99: [0, 0.44444, 0, 0, 0.44445],
    100: [0, 0.69444, 0, 0, 0.51667],
    101: [0, 0.44444, 0, 0, 0.44445],
    102: [0, 0.69444, 0.06944, 0, 0.30556],
    103: [0.19444, 0.44444, 0.01389, 0, 0.5],
    104: [0, 0.69444, 0, 0, 0.51667],
    105: [0, 0.67937, 0, 0, 0.23889],
    106: [0.19444, 0.67937, 0, 0, 0.26667],
    107: [0, 0.69444, 0, 0, 0.48889],
    108: [0, 0.69444, 0, 0, 0.23889],
    109: [0, 0.44444, 0, 0, 0.79445],
    110: [0, 0.44444, 0, 0, 0.51667],
    111: [0, 0.44444, 0, 0, 0.5],
    112: [0.19444, 0.44444, 0, 0, 0.51667],
    113: [0.19444, 0.44444, 0, 0, 0.51667],
    114: [0, 0.44444, 0.01389, 0, 0.34167],
    115: [0, 0.44444, 0, 0, 0.38333],
    116: [0, 0.57143, 0, 0, 0.36111],
    117: [0, 0.44444, 0, 0, 0.51667],
    118: [0, 0.44444, 0.01389, 0, 0.46111],
    119: [0, 0.44444, 0.01389, 0, 0.68334],
    120: [0, 0.44444, 0, 0, 0.46111],
    121: [0.19444, 0.44444, 0.01389, 0, 0.46111],
    122: [0, 0.44444, 0, 0, 0.43472],
    126: [0.35, 0.32659, 0, 0, 0.5],
    160: [0, 0, 0, 0, 0.25],
    168: [0, 0.67937, 0, 0, 0.5],
    176: [0, 0.69444, 0, 0, 0.66667],
    184: [0.17014, 0, 0, 0, 0.44445],
    305: [0, 0.44444, 0, 0, 0.23889],
    567: [0.19444, 0.44444, 0, 0, 0.26667],
    710: [0, 0.69444, 0, 0, 0.5],
    711: [0, 0.63194, 0, 0, 0.5],
    713: [0, 0.60889, 0, 0, 0.5],
    714: [0, 0.69444, 0, 0, 0.5],
    715: [0, 0.69444, 0, 0, 0.5],
    728: [0, 0.69444, 0, 0, 0.5],
    729: [0, 0.67937, 0, 0, 0.27778],
    730: [0, 0.69444, 0, 0, 0.66667],
    732: [0, 0.67659, 0, 0, 0.5],
    733: [0, 0.69444, 0, 0, 0.5],
    915: [0, 0.69444, 0, 0, 0.54167],
    916: [0, 0.69444, 0, 0, 0.83334],
    920: [0, 0.69444, 0, 0, 0.77778],
    923: [0, 0.69444, 0, 0, 0.61111],
    926: [0, 0.69444, 0, 0, 0.66667],
    928: [0, 0.69444, 0, 0, 0.70834],
    931: [0, 0.69444, 0, 0, 0.72222],
    933: [0, 0.69444, 0, 0, 0.77778],
    934: [0, 0.69444, 0, 0, 0.72222],
    936: [0, 0.69444, 0, 0, 0.77778],
    937: [0, 0.69444, 0, 0, 0.72222],
    8211: [0, 0.44444, 0.02778, 0, 0.5],
    8212: [0, 0.44444, 0.02778, 0, 1],
    8216: [0, 0.69444, 0, 0, 0.27778],
    8217: [0, 0.69444, 0, 0, 0.27778],
    8220: [0, 0.69444, 0, 0, 0.5],
    8221: [0, 0.69444, 0, 0, 0.5]
  },
  "Script-Regular": {
    32: [0, 0, 0, 0, 0.25],
    65: [0, 0.7, 0.22925, 0, 0.80253],
    66: [0, 0.7, 0.04087, 0, 0.90757],
    67: [0, 0.7, 0.1689, 0, 0.66619],
    68: [0, 0.7, 0.09371, 0, 0.77443],
    69: [0, 0.7, 0.18583, 0, 0.56162],
    70: [0, 0.7, 0.13634, 0, 0.89544],
    71: [0, 0.7, 0.17322, 0, 0.60961],
    72: [0, 0.7, 0.29694, 0, 0.96919],
    73: [0, 0.7, 0.19189, 0, 0.80907],
    74: [0.27778, 0.7, 0.19189, 0, 1.05159],
    75: [0, 0.7, 0.31259, 0, 0.91364],
    76: [0, 0.7, 0.19189, 0, 0.87373],
    77: [0, 0.7, 0.15981, 0, 1.08031],
    78: [0, 0.7, 0.3525, 0, 0.9015],
    79: [0, 0.7, 0.08078, 0, 0.73787],
    80: [0, 0.7, 0.08078, 0, 1.01262],
    81: [0, 0.7, 0.03305, 0, 0.88282],
    82: [0, 0.7, 0.06259, 0, 0.85],
    83: [0, 0.7, 0.19189, 0, 0.86767],
    84: [0, 0.7, 0.29087, 0, 0.74697],
    85: [0, 0.7, 0.25815, 0, 0.79996],
    86: [0, 0.7, 0.27523, 0, 0.62204],
    87: [0, 0.7, 0.27523, 0, 0.80532],
    88: [0, 0.7, 0.26006, 0, 0.94445],
    89: [0, 0.7, 0.2939, 0, 0.70961],
    90: [0, 0.7, 0.24037, 0, 0.8212],
    160: [0, 0, 0, 0, 0.25]
  },
  "Size1-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.35001, 0.85, 0, 0, 0.45834],
    41: [0.35001, 0.85, 0, 0, 0.45834],
    47: [0.35001, 0.85, 0, 0, 0.57778],
    91: [0.35001, 0.85, 0, 0, 0.41667],
    92: [0.35001, 0.85, 0, 0, 0.57778],
    93: [0.35001, 0.85, 0, 0, 0.41667],
    123: [0.35001, 0.85, 0, 0, 0.58334],
    125: [0.35001, 0.85, 0, 0, 0.58334],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.72222, 0, 0, 0.55556],
    732: [0, 0.72222, 0, 0, 0.55556],
    770: [0, 0.72222, 0, 0, 0.55556],
    771: [0, 0.72222, 0, 0, 0.55556],
    8214: [-99e-5, 0.601, 0, 0, 0.77778],
    8593: [1e-5, 0.6, 0, 0, 0.66667],
    8595: [1e-5, 0.6, 0, 0, 0.66667],
    8657: [1e-5, 0.6, 0, 0, 0.77778],
    8659: [1e-5, 0.6, 0, 0, 0.77778],
    8719: [0.25001, 0.75, 0, 0, 0.94445],
    8720: [0.25001, 0.75, 0, 0, 0.94445],
    8721: [0.25001, 0.75, 0, 0, 1.05556],
    8730: [0.35001, 0.85, 0, 0, 1],
    8739: [-599e-5, 0.606, 0, 0, 0.33333],
    8741: [-599e-5, 0.606, 0, 0, 0.55556],
    8747: [0.30612, 0.805, 0.19445, 0, 0.47222],
    8748: [0.306, 0.805, 0.19445, 0, 0.47222],
    8749: [0.306, 0.805, 0.19445, 0, 0.47222],
    8750: [0.30612, 0.805, 0.19445, 0, 0.47222],
    8896: [0.25001, 0.75, 0, 0, 0.83334],
    8897: [0.25001, 0.75, 0, 0, 0.83334],
    8898: [0.25001, 0.75, 0, 0, 0.83334],
    8899: [0.25001, 0.75, 0, 0, 0.83334],
    8968: [0.35001, 0.85, 0, 0, 0.47222],
    8969: [0.35001, 0.85, 0, 0, 0.47222],
    8970: [0.35001, 0.85, 0, 0, 0.47222],
    8971: [0.35001, 0.85, 0, 0, 0.47222],
    9168: [-99e-5, 0.601, 0, 0, 0.66667],
    10216: [0.35001, 0.85, 0, 0, 0.47222],
    10217: [0.35001, 0.85, 0, 0, 0.47222],
    10752: [0.25001, 0.75, 0, 0, 1.11111],
    10753: [0.25001, 0.75, 0, 0, 1.11111],
    10754: [0.25001, 0.75, 0, 0, 1.11111],
    10756: [0.25001, 0.75, 0, 0, 0.83334],
    10758: [0.25001, 0.75, 0, 0, 0.83334]
  },
  "Size2-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.65002, 1.15, 0, 0, 0.59722],
    41: [0.65002, 1.15, 0, 0, 0.59722],
    47: [0.65002, 1.15, 0, 0, 0.81111],
    91: [0.65002, 1.15, 0, 0, 0.47222],
    92: [0.65002, 1.15, 0, 0, 0.81111],
    93: [0.65002, 1.15, 0, 0, 0.47222],
    123: [0.65002, 1.15, 0, 0, 0.66667],
    125: [0.65002, 1.15, 0, 0, 0.66667],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.75, 0, 0, 1],
    732: [0, 0.75, 0, 0, 1],
    770: [0, 0.75, 0, 0, 1],
    771: [0, 0.75, 0, 0, 1],
    8719: [0.55001, 1.05, 0, 0, 1.27778],
    8720: [0.55001, 1.05, 0, 0, 1.27778],
    8721: [0.55001, 1.05, 0, 0, 1.44445],
    8730: [0.65002, 1.15, 0, 0, 1],
    8747: [0.86225, 1.36, 0.44445, 0, 0.55556],
    8748: [0.862, 1.36, 0.44445, 0, 0.55556],
    8749: [0.862, 1.36, 0.44445, 0, 0.55556],
    8750: [0.86225, 1.36, 0.44445, 0, 0.55556],
    8896: [0.55001, 1.05, 0, 0, 1.11111],
    8897: [0.55001, 1.05, 0, 0, 1.11111],
    8898: [0.55001, 1.05, 0, 0, 1.11111],
    8899: [0.55001, 1.05, 0, 0, 1.11111],
    8968: [0.65002, 1.15, 0, 0, 0.52778],
    8969: [0.65002, 1.15, 0, 0, 0.52778],
    8970: [0.65002, 1.15, 0, 0, 0.52778],
    8971: [0.65002, 1.15, 0, 0, 0.52778],
    10216: [0.65002, 1.15, 0, 0, 0.61111],
    10217: [0.65002, 1.15, 0, 0, 0.61111],
    10752: [0.55001, 1.05, 0, 0, 1.51112],
    10753: [0.55001, 1.05, 0, 0, 1.51112],
    10754: [0.55001, 1.05, 0, 0, 1.51112],
    10756: [0.55001, 1.05, 0, 0, 1.11111],
    10758: [0.55001, 1.05, 0, 0, 1.11111]
  },
  "Size3-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [0.95003, 1.45, 0, 0, 0.73611],
    41: [0.95003, 1.45, 0, 0, 0.73611],
    47: [0.95003, 1.45, 0, 0, 1.04445],
    91: [0.95003, 1.45, 0, 0, 0.52778],
    92: [0.95003, 1.45, 0, 0, 1.04445],
    93: [0.95003, 1.45, 0, 0, 0.52778],
    123: [0.95003, 1.45, 0, 0, 0.75],
    125: [0.95003, 1.45, 0, 0, 0.75],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.75, 0, 0, 1.44445],
    732: [0, 0.75, 0, 0, 1.44445],
    770: [0, 0.75, 0, 0, 1.44445],
    771: [0, 0.75, 0, 0, 1.44445],
    8730: [0.95003, 1.45, 0, 0, 1],
    8968: [0.95003, 1.45, 0, 0, 0.58334],
    8969: [0.95003, 1.45, 0, 0, 0.58334],
    8970: [0.95003, 1.45, 0, 0, 0.58334],
    8971: [0.95003, 1.45, 0, 0, 0.58334],
    10216: [0.95003, 1.45, 0, 0, 0.75],
    10217: [0.95003, 1.45, 0, 0, 0.75]
  },
  "Size4-Regular": {
    32: [0, 0, 0, 0, 0.25],
    40: [1.25003, 1.75, 0, 0, 0.79167],
    41: [1.25003, 1.75, 0, 0, 0.79167],
    47: [1.25003, 1.75, 0, 0, 1.27778],
    91: [1.25003, 1.75, 0, 0, 0.58334],
    92: [1.25003, 1.75, 0, 0, 1.27778],
    93: [1.25003, 1.75, 0, 0, 0.58334],
    123: [1.25003, 1.75, 0, 0, 0.80556],
    125: [1.25003, 1.75, 0, 0, 0.80556],
    160: [0, 0, 0, 0, 0.25],
    710: [0, 0.825, 0, 0, 1.8889],
    732: [0, 0.825, 0, 0, 1.8889],
    770: [0, 0.825, 0, 0, 1.8889],
    771: [0, 0.825, 0, 0, 1.8889],
    8730: [1.25003, 1.75, 0, 0, 1],
    8968: [1.25003, 1.75, 0, 0, 0.63889],
    8969: [1.25003, 1.75, 0, 0, 0.63889],
    8970: [1.25003, 1.75, 0, 0, 0.63889],
    8971: [1.25003, 1.75, 0, 0, 0.63889],
    9115: [0.64502, 1.155, 0, 0, 0.875],
    9116: [1e-5, 0.6, 0, 0, 0.875],
    9117: [0.64502, 1.155, 0, 0, 0.875],
    9118: [0.64502, 1.155, 0, 0, 0.875],
    9119: [1e-5, 0.6, 0, 0, 0.875],
    9120: [0.64502, 1.155, 0, 0, 0.875],
    9121: [0.64502, 1.155, 0, 0, 0.66667],
    9122: [-99e-5, 0.601, 0, 0, 0.66667],
    9123: [0.64502, 1.155, 0, 0, 0.66667],
    9124: [0.64502, 1.155, 0, 0, 0.66667],
    9125: [-99e-5, 0.601, 0, 0, 0.66667],
    9126: [0.64502, 1.155, 0, 0, 0.66667],
    9127: [1e-5, 0.9, 0, 0, 0.88889],
    9128: [0.65002, 1.15, 0, 0, 0.88889],
    9129: [0.90001, 0, 0, 0, 0.88889],
    9130: [0, 0.3, 0, 0, 0.88889],
    9131: [1e-5, 0.9, 0, 0, 0.88889],
    9132: [0.65002, 1.15, 0, 0, 0.88889],
    9133: [0.90001, 0, 0, 0, 0.88889],
    9143: [0.88502, 0.915, 0, 0, 1.05556],
    10216: [1.25003, 1.75, 0, 0, 0.80556],
    10217: [1.25003, 1.75, 0, 0, 0.80556],
    57344: [-499e-5, 0.605, 0, 0, 1.05556],
    57345: [-499e-5, 0.605, 0, 0, 1.05556],
    57680: [0, 0.12, 0, 0, 0.45],
    57681: [0, 0.12, 0, 0, 0.45],
    57682: [0, 0.12, 0, 0, 0.45],
    57683: [0, 0.12, 0, 0, 0.45]
  },
  "Typewriter-Regular": {
    32: [0, 0, 0, 0, 0.525],
    33: [0, 0.61111, 0, 0, 0.525],
    34: [0, 0.61111, 0, 0, 0.525],
    35: [0, 0.61111, 0, 0, 0.525],
    36: [0.08333, 0.69444, 0, 0, 0.525],
    37: [0.08333, 0.69444, 0, 0, 0.525],
    38: [0, 0.61111, 0, 0, 0.525],
    39: [0, 0.61111, 0, 0, 0.525],
    40: [0.08333, 0.69444, 0, 0, 0.525],
    41: [0.08333, 0.69444, 0, 0, 0.525],
    42: [0, 0.52083, 0, 0, 0.525],
    43: [-0.08056, 0.53055, 0, 0, 0.525],
    44: [0.13889, 0.125, 0, 0, 0.525],
    45: [-0.08056, 0.53055, 0, 0, 0.525],
    46: [0, 0.125, 0, 0, 0.525],
    47: [0.08333, 0.69444, 0, 0, 0.525],
    48: [0, 0.61111, 0, 0, 0.525],
    49: [0, 0.61111, 0, 0, 0.525],
    50: [0, 0.61111, 0, 0, 0.525],
    51: [0, 0.61111, 0, 0, 0.525],
    52: [0, 0.61111, 0, 0, 0.525],
    53: [0, 0.61111, 0, 0, 0.525],
    54: [0, 0.61111, 0, 0, 0.525],
    55: [0, 0.61111, 0, 0, 0.525],
    56: [0, 0.61111, 0, 0, 0.525],
    57: [0, 0.61111, 0, 0, 0.525],
    58: [0, 0.43056, 0, 0, 0.525],
    59: [0.13889, 0.43056, 0, 0, 0.525],
    60: [-0.05556, 0.55556, 0, 0, 0.525],
    61: [-0.19549, 0.41562, 0, 0, 0.525],
    62: [-0.05556, 0.55556, 0, 0, 0.525],
    63: [0, 0.61111, 0, 0, 0.525],
    64: [0, 0.61111, 0, 0, 0.525],
    65: [0, 0.61111, 0, 0, 0.525],
    66: [0, 0.61111, 0, 0, 0.525],
    67: [0, 0.61111, 0, 0, 0.525],
    68: [0, 0.61111, 0, 0, 0.525],
    69: [0, 0.61111, 0, 0, 0.525],
    70: [0, 0.61111, 0, 0, 0.525],
    71: [0, 0.61111, 0, 0, 0.525],
    72: [0, 0.61111, 0, 0, 0.525],
    73: [0, 0.61111, 0, 0, 0.525],
    74: [0, 0.61111, 0, 0, 0.525],
    75: [0, 0.61111, 0, 0, 0.525],
    76: [0, 0.61111, 0, 0, 0.525],
    77: [0, 0.61111, 0, 0, 0.525],
    78: [0, 0.61111, 0, 0, 0.525],
    79: [0, 0.61111, 0, 0, 0.525],
    80: [0, 0.61111, 0, 0, 0.525],
    81: [0.13889, 0.61111, 0, 0, 0.525],
    82: [0, 0.61111, 0, 0, 0.525],
    83: [0, 0.61111, 0, 0, 0.525],
    84: [0, 0.61111, 0, 0, 0.525],
    85: [0, 0.61111, 0, 0, 0.525],
    86: [0, 0.61111, 0, 0, 0.525],
    87: [0, 0.61111, 0, 0, 0.525],
    88: [0, 0.61111, 0, 0, 0.525],
    89: [0, 0.61111, 0, 0, 0.525],
    90: [0, 0.61111, 0, 0, 0.525],
    91: [0.08333, 0.69444, 0, 0, 0.525],
    92: [0.08333, 0.69444, 0, 0, 0.525],
    93: [0.08333, 0.69444, 0, 0, 0.525],
    94: [0, 0.61111, 0, 0, 0.525],
    95: [0.09514, 0, 0, 0, 0.525],
    96: [0, 0.61111, 0, 0, 0.525],
    97: [0, 0.43056, 0, 0, 0.525],
    98: [0, 0.61111, 0, 0, 0.525],
    99: [0, 0.43056, 0, 0, 0.525],
    100: [0, 0.61111, 0, 0, 0.525],
    101: [0, 0.43056, 0, 0, 0.525],
    102: [0, 0.61111, 0, 0, 0.525],
    103: [0.22222, 0.43056, 0, 0, 0.525],
    104: [0, 0.61111, 0, 0, 0.525],
    105: [0, 0.61111, 0, 0, 0.525],
    106: [0.22222, 0.61111, 0, 0, 0.525],
    107: [0, 0.61111, 0, 0, 0.525],
    108: [0, 0.61111, 0, 0, 0.525],
    109: [0, 0.43056, 0, 0, 0.525],
    110: [0, 0.43056, 0, 0, 0.525],
    111: [0, 0.43056, 0, 0, 0.525],
    112: [0.22222, 0.43056, 0, 0, 0.525],
    113: [0.22222, 0.43056, 0, 0, 0.525],
    114: [0, 0.43056, 0, 0, 0.525],
    115: [0, 0.43056, 0, 0, 0.525],
    116: [0, 0.55358, 0, 0, 0.525],
    117: [0, 0.43056, 0, 0, 0.525],
    118: [0, 0.43056, 0, 0, 0.525],
    119: [0, 0.43056, 0, 0, 0.525],
    120: [0, 0.43056, 0, 0, 0.525],
    121: [0.22222, 0.43056, 0, 0, 0.525],
    122: [0, 0.43056, 0, 0, 0.525],
    123: [0.08333, 0.69444, 0, 0, 0.525],
    124: [0.08333, 0.69444, 0, 0, 0.525],
    125: [0.08333, 0.69444, 0, 0, 0.525],
    126: [0, 0.61111, 0, 0, 0.525],
    127: [0, 0.61111, 0, 0, 0.525],
    160: [0, 0, 0, 0, 0.525],
    176: [0, 0.61111, 0, 0, 0.525],
    184: [0.19445, 0, 0, 0, 0.525],
    305: [0, 0.43056, 0, 0, 0.525],
    567: [0.22222, 0.43056, 0, 0, 0.525],
    711: [0, 0.56597, 0, 0, 0.525],
    713: [0, 0.56555, 0, 0, 0.525],
    714: [0, 0.61111, 0, 0, 0.525],
    715: [0, 0.61111, 0, 0, 0.525],
    728: [0, 0.61111, 0, 0, 0.525],
    730: [0, 0.61111, 0, 0, 0.525],
    770: [0, 0.61111, 0, 0, 0.525],
    771: [0, 0.61111, 0, 0, 0.525],
    776: [0, 0.61111, 0, 0, 0.525],
    915: [0, 0.61111, 0, 0, 0.525],
    916: [0, 0.61111, 0, 0, 0.525],
    920: [0, 0.61111, 0, 0, 0.525],
    923: [0, 0.61111, 0, 0, 0.525],
    926: [0, 0.61111, 0, 0, 0.525],
    928: [0, 0.61111, 0, 0, 0.525],
    931: [0, 0.61111, 0, 0, 0.525],
    933: [0, 0.61111, 0, 0, 0.525],
    934: [0, 0.61111, 0, 0, 0.525],
    936: [0, 0.61111, 0, 0, 0.525],
    937: [0, 0.61111, 0, 0, 0.525],
    8216: [0, 0.61111, 0, 0, 0.525],
    8217: [0, 0.61111, 0, 0, 0.525],
    8242: [0, 0.61111, 0, 0, 0.525],
    9251: [0.11111, 0.21944, 0, 0, 0.525]
  }
}, pe = {
  slant: [0.25, 0.25, 0.25],
  // sigma1
  space: [0, 0, 0],
  // sigma2
  stretch: [0, 0, 0],
  // sigma3
  shrink: [0, 0, 0],
  // sigma4
  xHeight: [0.431, 0.431, 0.431],
  // sigma5
  quad: [1, 1.171, 1.472],
  // sigma6
  extraSpace: [0, 0, 0],
  // sigma7
  num1: [0.677, 0.732, 0.925],
  // sigma8
  num2: [0.394, 0.384, 0.387],
  // sigma9
  num3: [0.444, 0.471, 0.504],
  // sigma10
  denom1: [0.686, 0.752, 1.025],
  // sigma11
  denom2: [0.345, 0.344, 0.532],
  // sigma12
  sup1: [0.413, 0.503, 0.504],
  // sigma13
  sup2: [0.363, 0.431, 0.404],
  // sigma14
  sup3: [0.289, 0.286, 0.294],
  // sigma15
  sub1: [0.15, 0.143, 0.2],
  // sigma16
  sub2: [0.247, 0.286, 0.4],
  // sigma17
  supDrop: [0.386, 0.353, 0.494],
  // sigma18
  subDrop: [0.05, 0.071, 0.1],
  // sigma19
  delim1: [2.39, 1.7, 1.98],
  // sigma20
  delim2: [1.01, 1.157, 1.42],
  // sigma21
  axisHeight: [0.25, 0.25, 0.25],
  // sigma22
  // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
  // they correspond to the font parameters of the extension fonts (family 3).
  // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
  // match cmex7, we'd use cmex7.tfm values for script and scriptscript
  // values.
  defaultRuleThickness: [0.04, 0.049, 0.049],
  // xi8; cmex7: 0.049
  bigOpSpacing1: [0.111, 0.111, 0.111],
  // xi9
  bigOpSpacing2: [0.166, 0.166, 0.166],
  // xi10
  bigOpSpacing3: [0.2, 0.2, 0.2],
  // xi11
  bigOpSpacing4: [0.6, 0.611, 0.611],
  // xi12; cmex7: 0.611
  bigOpSpacing5: [0.1, 0.143, 0.143],
  // xi13; cmex7: 0.143
  // The \sqrt rule width is taken from the height of the surd character.
  // Since we use the same font at all sizes, this thickness doesn't scale.
  sqrtRuleThickness: [0.04, 0.04, 0.04],
  // This value determines how large a pt is, for metrics which are defined
  // in terms of pts.
  // This value is also used in katex.less; if you change it make sure the
  // values match.
  ptPerEm: [10, 10, 10],
  // The space between adjacent `|` columns in an array definition. From
  // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
  doubleRuleSep: [0.2, 0.2, 0.2],
  // The width of separator lines in {array} environments. From
  // `\showthe\arrayrulewidth` in LaTeX. Equals 0.4 / ptPerEm.
  arrayRuleWidth: [0.04, 0.04, 0.04],
  // Two values from LaTeX source2e:
  fboxsep: [0.3, 0.3, 0.3],
  //        3 pt / ptPerEm
  fboxrule: [0.04, 0.04, 0.04]
  // 0.4 pt / ptPerEm
}, Gt = {
  // Latin-1
  Å: "A",
  Ð: "D",
  Þ: "o",
  å: "a",
  ð: "d",
  þ: "o",
  // Cyrillic
  А: "A",
  Б: "B",
  В: "B",
  Г: "F",
  Д: "A",
  Е: "E",
  Ж: "K",
  З: "3",
  И: "N",
  Й: "N",
  К: "K",
  Л: "N",
  М: "M",
  Н: "H",
  О: "O",
  П: "N",
  Р: "P",
  С: "C",
  Т: "T",
  У: "y",
  Ф: "O",
  Х: "X",
  Ц: "U",
  Ч: "h",
  Ш: "W",
  Щ: "W",
  Ъ: "B",
  Ы: "X",
  Ь: "B",
  Э: "3",
  Ю: "X",
  Я: "R",
  а: "a",
  б: "b",
  в: "a",
  г: "r",
  д: "y",
  е: "e",
  ж: "m",
  з: "e",
  и: "n",
  й: "n",
  к: "n",
  л: "n",
  м: "m",
  н: "n",
  о: "o",
  п: "n",
  р: "p",
  с: "c",
  т: "o",
  у: "y",
  ф: "b",
  х: "x",
  ц: "n",
  ч: "n",
  ш: "w",
  щ: "w",
  ъ: "a",
  ы: "m",
  ь: "a",
  э: "e",
  ю: "m",
  я: "r"
};
function s1(r, e) {
  y0[r] = e;
}
function gt(r, e, t) {
  if (!y0[e])
    throw new Error("Font metrics not found for font: " + e + ".");
  var a = r.charCodeAt(0), n = y0[e][a];
  if (!n && r[0] in Gt && (a = Gt[r[0]].charCodeAt(0), n = y0[e][a]), !n && t === "text" && kr(a) && (n = y0[e][77]), n)
    return {
      depth: n[0],
      height: n[1],
      italic: n[2],
      skew: n[3],
      width: n[4]
    };
}
var Ue = {};
function o1(r) {
  var e;
  if (r >= 5 ? e = 0 : r >= 3 ? e = 1 : e = 2, !Ue[e]) {
    var t = Ue[e] = {
      cssEmPerMu: pe.quad[e] / 18
    };
    for (var a in pe)
      pe.hasOwnProperty(a) && (t[a] = pe[a][e]);
  }
  return Ue[e];
}
var u1 = [
  // Each element contains [textsize, scriptsize, scriptscriptsize].
  // The size mappings are taken from TeX with \normalsize=10pt.
  [1, 1, 1],
  // size1: [5, 5, 5]              \tiny
  [2, 1, 1],
  // size2: [6, 5, 5]
  [3, 1, 1],
  // size3: [7, 5, 5]              \scriptsize
  [4, 2, 1],
  // size4: [8, 6, 5]              \footnotesize
  [5, 2, 1],
  // size5: [9, 6, 5]              \small
  [6, 3, 1],
  // size6: [10, 7, 5]             \normalsize
  [7, 4, 2],
  // size7: [12, 8, 6]             \large
  [8, 6, 3],
  // size8: [14.4, 10, 7]          \Large
  [9, 7, 6],
  // size9: [17.28, 12, 10]        \LARGE
  [10, 8, 7],
  // size10: [20.74, 14.4, 12]     \huge
  [11, 10, 9]
  // size11: [24.88, 20.74, 17.28] \HUGE
], $t = [
  // fontMetrics.js:getGlobalMetrics also uses size indexes, so if
  // you change size indexes, change that function.
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1,
  1.2,
  1.44,
  1.728,
  2.074,
  2.488
], Vt = function(e, t) {
  return t.size < 2 ? e : u1[e - 1][t.size - 1];
};
class A0 {
  // A font family applies to a group of fonts (i.e. SansSerif), while a font
  // represents a specific font (i.e. SansSerif Bold).
  // See: https://tex.stackexchange.com/questions/22350/difference-between-textrm-and-mathrm
  /**
   * The base size index.
   */
  constructor(e) {
    this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = e.style, this.color = e.color, this.size = e.size || A0.BASESIZE, this.textSize = e.textSize || this.size, this.phantom = !!e.phantom, this.font = e.font || "", this.fontFamily = e.fontFamily || "", this.fontWeight = e.fontWeight || "", this.fontShape = e.fontShape || "", this.sizeMultiplier = $t[this.size - 1], this.maxSize = e.maxSize, this.minRuleThickness = e.minRuleThickness, this._fontMetrics = void 0;
  }
  /**
   * Returns a new options object with the same properties as "this".  Properties
   * from "extension" will be copied to the new options object.
   */
  extend(e) {
    var t = {
      style: this.style,
      size: this.size,
      textSize: this.textSize,
      color: this.color,
      phantom: this.phantom,
      font: this.font,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontShape: this.fontShape,
      maxSize: this.maxSize,
      minRuleThickness: this.minRuleThickness
    };
    for (var a in e)
      e.hasOwnProperty(a) && (t[a] = e[a]);
    return new A0(t);
  }
  /**
   * Return an options object with the given style. If `this.style === style`,
   * returns `this`.
   */
  havingStyle(e) {
    return this.style === e ? this : this.extend({
      style: e,
      size: Vt(this.textSize, e)
    });
  }
  /**
   * Return an options object with a cramped version of the current style. If
   * the current style is cramped, returns `this`.
   */
  havingCrampedStyle() {
    return this.havingStyle(this.style.cramp());
  }
  /**
   * Return an options object with the given size and in at least `\textstyle`.
   * Returns `this` if appropriate.
   */
  havingSize(e) {
    return this.size === e && this.textSize === e ? this : this.extend({
      style: this.style.text(),
      size: e,
      textSize: e,
      sizeMultiplier: $t[e - 1]
    });
  }
  /**
   * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
   * changes to at least `\textstyle`.
   */
  havingBaseStyle(e) {
    e = e || this.style.text();
    var t = Vt(A0.BASESIZE, e);
    return this.size === t && this.textSize === A0.BASESIZE && this.style === e ? this : this.extend({
      style: e,
      size: t
    });
  }
  /**
   * Remove the effect of sizing changes such as \Huge.
   * Keep the effect of the current style, such as \scriptstyle.
   */
  havingBaseSizing() {
    var e;
    switch (this.style.id) {
      case 4:
      case 5:
        e = 3;
        break;
      case 6:
      case 7:
        e = 1;
        break;
      default:
        e = 6;
    }
    return this.extend({
      style: this.style.text(),
      size: e
    });
  }
  /**
   * Create a new options object with the given color.
   */
  withColor(e) {
    return this.extend({
      color: e
    });
  }
  /**
   * Create a new options object with "phantom" set to true.
   */
  withPhantom() {
    return this.extend({
      phantom: !0
    });
  }
  /**
   * Creates a new options object with the given math font or old text font.
   * @type {[type]}
   */
  withFont(e) {
    return this.extend({
      font: e
    });
  }
  /**
   * Create a new options objects with the given fontFamily.
   */
  withTextFontFamily(e) {
    return this.extend({
      fontFamily: e,
      font: ""
    });
  }
  /**
   * Creates a new options object with the given font weight
   */
  withTextFontWeight(e) {
    return this.extend({
      fontWeight: e,
      font: ""
    });
  }
  /**
   * Creates a new options object with the given font weight
   */
  withTextFontShape(e) {
    return this.extend({
      fontShape: e,
      font: ""
    });
  }
  /**
   * Return the CSS sizing classes required to switch from enclosing options
   * `oldOptions` to `this`. Returns an array of classes.
   */
  sizingClasses(e) {
    return e.size !== this.size ? ["sizing", "reset-size" + e.size, "size" + this.size] : [];
  }
  /**
   * Return the CSS sizing classes required to switch to the base size. Like
   * `this.havingSize(BASESIZE).sizingClasses(this)`.
   */
  baseSizingClasses() {
    return this.size !== A0.BASESIZE ? ["sizing", "reset-size" + this.size, "size" + A0.BASESIZE] : [];
  }
  /**
   * Return the font metrics for this size.
   */
  fontMetrics() {
    return this._fontMetrics || (this._fontMetrics = o1(this.size)), this._fontMetrics;
  }
  /**
   * Gets the CSS color of the current options object
   */
  getColor() {
    return this.phantom ? "transparent" : this.color;
  }
}
A0.BASESIZE = 6;
var st = {
  // https://en.wikibooks.org/wiki/LaTeX/Lengths and
  // https://tex.stackexchange.com/a/8263
  pt: 1,
  // TeX point
  mm: 7227 / 2540,
  // millimeter
  cm: 7227 / 254,
  // centimeter
  in: 72.27,
  // inch
  bp: 803 / 800,
  // big (PostScript) points
  pc: 12,
  // pica
  dd: 1238 / 1157,
  // didot
  cc: 14856 / 1157,
  // cicero (12 didot)
  nd: 685 / 642,
  // new didot
  nc: 1370 / 107,
  // new cicero (12 new didot)
  sp: 1 / 65536,
  // scaled point (TeX's internal smallest unit)
  // https://tex.stackexchange.com/a/41371
  px: 803 / 800
  // \pdfpxdimen defaults to 1 bp in pdfTeX and LuaTeX
}, h1 = {
  ex: !0,
  em: !0,
  mu: !0
}, Sr = function(e) {
  return typeof e != "string" && (e = e.unit), e in st || e in h1 || e === "ex";
}, K = function(e, t) {
  var a;
  if (e.unit in st)
    a = st[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
  else if (e.unit === "mu")
    a = t.fontMetrics().cssEmPerMu;
  else {
    var n;
    if (t.style.isTight() ? n = t.havingStyle(t.style.text()) : n = t, e.unit === "ex")
      a = n.fontMetrics().xHeight;
    else if (e.unit === "em")
      a = n.fontMetrics().quad;
    else
      throw new T("Invalid unit: '" + e.unit + "'");
    n !== t && (a *= n.sizeMultiplier / t.sizeMultiplier);
  }
  return Math.min(e.number * a, t.maxSize);
}, A = function(e) {
  return +e.toFixed(4) + "em";
}, H0 = function(e) {
  return e.filter((t) => t).join(" ");
}, Mr = function(e, t, a) {
  if (this.classes = e || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = a || {}, t) {
    t.style.isTight() && this.classes.push("mtight");
    var n = t.getColor();
    n && (this.style.color = n);
  }
}, zr = function(e) {
  var t = document.createElement(e);
  t.className = H0(this.classes);
  for (var a in this.style)
    this.style.hasOwnProperty(a) && (t.style[a] = this.style[a]);
  for (var n in this.attributes)
    this.attributes.hasOwnProperty(n) && t.setAttribute(n, this.attributes[n]);
  for (var l = 0; l < this.children.length; l++)
    t.appendChild(this.children[l].toNode());
  return t;
}, Tr = function(e) {
  var t = "<" + e;
  this.classes.length && (t += ' class="' + L.escape(H0(this.classes)) + '"');
  var a = "";
  for (var n in this.style)
    this.style.hasOwnProperty(n) && (a += L.hyphenate(n) + ":" + this.style[n] + ";");
  a && (t += ' style="' + L.escape(a) + '"');
  for (var l in this.attributes)
    this.attributes.hasOwnProperty(l) && (t += " " + l + '="' + L.escape(this.attributes[l]) + '"');
  t += ">";
  for (var o = 0; o < this.children.length; o++)
    t += this.children[o].toMarkup();
  return t += "</" + e + ">", t;
};
class oe {
  constructor(e, t, a, n) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, Mr.call(this, e, a, n), this.children = t || [];
  }
  /**
   * Sets an arbitrary attribute on the span. Warning: use this wisely. Not
   * all browsers support attributes the same, and having too many custom
   * attributes is probably bad.
   */
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return L.contains(this.classes, e);
  }
  toNode() {
    return zr.call(this, "span");
  }
  toMarkup() {
    return Tr.call(this, "span");
  }
}
class bt {
  constructor(e, t, a, n) {
    this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, Mr.call(this, t, n), this.children = a || [], this.setAttribute("href", e);
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  hasClass(e) {
    return L.contains(this.classes, e);
  }
  toNode() {
    return zr.call(this, "a");
  }
  toMarkup() {
    return Tr.call(this, "a");
  }
}
class m1 {
  constructor(e, t, a) {
    this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = t, this.src = e, this.classes = ["mord"], this.style = a;
  }
  hasClass(e) {
    return L.contains(this.classes, e);
  }
  toNode() {
    var e = document.createElement("img");
    e.src = this.src, e.alt = this.alt, e.className = "mord";
    for (var t in this.style)
      this.style.hasOwnProperty(t) && (e.style[t] = this.style[t]);
    return e;
  }
  toMarkup() {
    var e = "<img  src='" + this.src + " 'alt='" + this.alt + "' ", t = "";
    for (var a in this.style)
      this.style.hasOwnProperty(a) && (t += L.hyphenate(a) + ":" + this.style[a] + ";");
    return t && (e += ' style="' + L.escape(t) + '"'), e += "'/>", e;
  }
}
var c1 = {
  î: "ı̂",
  ï: "ı̈",
  í: "ı́",
  // 'ī': '\u0131\u0304', // enable when we add Extended Latin
  ì: "ı̀"
};
class p0 {
  constructor(e, t, a, n, l, o, h, m) {
    this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = e, this.height = t || 0, this.depth = a || 0, this.italic = n || 0, this.skew = l || 0, this.width = o || 0, this.classes = h || [], this.style = m || {}, this.maxFontSize = 0;
    var f = Ja(this.text.charCodeAt(0));
    f && this.classes.push(f + "_fallback"), /[îïíì]/.test(this.text) && (this.text = c1[this.text]);
  }
  hasClass(e) {
    return L.contains(this.classes, e);
  }
  /**
   * Creates a text node or span from a symbol node. Note that a span is only
   * created if it is needed.
   */
  toNode() {
    var e = document.createTextNode(this.text), t = null;
    this.italic > 0 && (t = document.createElement("span"), t.style.marginRight = A(this.italic)), this.classes.length > 0 && (t = t || document.createElement("span"), t.className = H0(this.classes));
    for (var a in this.style)
      this.style.hasOwnProperty(a) && (t = t || document.createElement("span"), t.style[a] = this.style[a]);
    return t ? (t.appendChild(e), t) : e;
  }
  /**
   * Creates markup for a symbol node.
   */
  toMarkup() {
    var e = !1, t = "<span";
    this.classes.length && (e = !0, t += ' class="', t += L.escape(H0(this.classes)), t += '"');
    var a = "";
    this.italic > 0 && (a += "margin-right:" + this.italic + "em;");
    for (var n in this.style)
      this.style.hasOwnProperty(n) && (a += L.hyphenate(n) + ":" + this.style[n] + ";");
    a && (e = !0, t += ' style="' + L.escape(a) + '"');
    var l = L.escape(this.text);
    return e ? (t += ">", t += l, t += "</span>", t) : l;
  }
}
class O0 {
  constructor(e, t) {
    this.children = void 0, this.attributes = void 0, this.children = e || [], this.attributes = t || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "svg");
    for (var a in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, a) && t.setAttribute(a, this.attributes[a]);
    for (var n = 0; n < this.children.length; n++)
      t.appendChild(this.children[n].toNode());
    return t;
  }
  toMarkup() {
    var e = '<svg xmlns="http://www.w3.org/2000/svg"';
    for (var t in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + "='" + this.attributes[t] + "'");
    e += ">";
    for (var a = 0; a < this.children.length; a++)
      e += this.children[a].toMarkup();
    return e += "</svg>", e;
  }
}
class V0 {
  constructor(e, t) {
    this.pathName = void 0, this.alternate = void 0, this.pathName = e, this.alternate = t;
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "path");
    return this.alternate ? t.setAttribute("d", this.alternate) : t.setAttribute("d", Pt[this.pathName]), t;
  }
  toMarkup() {
    return this.alternate ? "<path d='" + this.alternate + "'/>" : "<path d='" + Pt[this.pathName] + "'/>";
  }
}
class ot {
  constructor(e) {
    this.attributes = void 0, this.attributes = e || {};
  }
  toNode() {
    var e = "http://www.w3.org/2000/svg", t = document.createElementNS(e, "line");
    for (var a in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, a) && t.setAttribute(a, this.attributes[a]);
    return t;
  }
  toMarkup() {
    var e = "<line";
    for (var t in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + "='" + this.attributes[t] + "'");
    return e += "/>", e;
  }
}
function Ut(r) {
  if (r instanceof p0)
    return r;
  throw new Error("Expected symbolNode but got " + String(r) + ".");
}
function d1(r) {
  if (r instanceof oe)
    return r;
  throw new Error("Expected span<HtmlDomNode> but got " + String(r) + ".");
}
var f1 = {
  bin: 1,
  close: 1,
  inner: 1,
  open: 1,
  punct: 1,
  rel: 1
}, p1 = {
  "accent-token": 1,
  mathord: 1,
  "op-token": 1,
  spacing: 1,
  textord: 1
}, W = {
  math: {},
  text: {}
};
function i(r, e, t, a, n, l) {
  W[r][n] = {
    font: e,
    group: t,
    replace: a
  }, l && a && (W[r][a] = W[r][n]);
}
var s = "math", S = "text", u = "main", d = "ams", j = "accent-token", N = "bin", n0 = "close", _0 = "inner", R = "mathord", e0 = "op-token", u0 = "open", qe = "punct", p = "rel", q0 = "spacing", v = "textord";
i(s, u, p, "≡", "\\equiv", !0);
i(s, u, p, "≺", "\\prec", !0);
i(s, u, p, "≻", "\\succ", !0);
i(s, u, p, "∼", "\\sim", !0);
i(s, u, p, "⊥", "\\perp");
i(s, u, p, "⪯", "\\preceq", !0);
i(s, u, p, "⪰", "\\succeq", !0);
i(s, u, p, "≃", "\\simeq", !0);
i(s, u, p, "∣", "\\mid", !0);
i(s, u, p, "≪", "\\ll", !0);
i(s, u, p, "≫", "\\gg", !0);
i(s, u, p, "≍", "\\asymp", !0);
i(s, u, p, "∥", "\\parallel");
i(s, u, p, "⋈", "\\bowtie", !0);
i(s, u, p, "⌣", "\\smile", !0);
i(s, u, p, "⊑", "\\sqsubseteq", !0);
i(s, u, p, "⊒", "\\sqsupseteq", !0);
i(s, u, p, "≐", "\\doteq", !0);
i(s, u, p, "⌢", "\\frown", !0);
i(s, u, p, "∋", "\\ni", !0);
i(s, u, p, "∝", "\\propto", !0);
i(s, u, p, "⊢", "\\vdash", !0);
i(s, u, p, "⊣", "\\dashv", !0);
i(s, u, p, "∋", "\\owns");
i(s, u, qe, ".", "\\ldotp");
i(s, u, qe, "⋅", "\\cdotp");
i(s, u, v, "#", "\\#");
i(S, u, v, "#", "\\#");
i(s, u, v, "&", "\\&");
i(S, u, v, "&", "\\&");
i(s, u, v, "ℵ", "\\aleph", !0);
i(s, u, v, "∀", "\\forall", !0);
i(s, u, v, "ℏ", "\\hbar", !0);
i(s, u, v, "∃", "\\exists", !0);
i(s, u, v, "∇", "\\nabla", !0);
i(s, u, v, "♭", "\\flat", !0);
i(s, u, v, "ℓ", "\\ell", !0);
i(s, u, v, "♮", "\\natural", !0);
i(s, u, v, "♣", "\\clubsuit", !0);
i(s, u, v, "℘", "\\wp", !0);
i(s, u, v, "♯", "\\sharp", !0);
i(s, u, v, "♢", "\\diamondsuit", !0);
i(s, u, v, "ℜ", "\\Re", !0);
i(s, u, v, "♡", "\\heartsuit", !0);
i(s, u, v, "ℑ", "\\Im", !0);
i(s, u, v, "♠", "\\spadesuit", !0);
i(s, u, v, "§", "\\S", !0);
i(S, u, v, "§", "\\S");
i(s, u, v, "¶", "\\P", !0);
i(S, u, v, "¶", "\\P");
i(s, u, v, "†", "\\dag");
i(S, u, v, "†", "\\dag");
i(S, u, v, "†", "\\textdagger");
i(s, u, v, "‡", "\\ddag");
i(S, u, v, "‡", "\\ddag");
i(S, u, v, "‡", "\\textdaggerdbl");
i(s, u, n0, "⎱", "\\rmoustache", !0);
i(s, u, u0, "⎰", "\\lmoustache", !0);
i(s, u, n0, "⟯", "\\rgroup", !0);
i(s, u, u0, "⟮", "\\lgroup", !0);
i(s, u, N, "∓", "\\mp", !0);
i(s, u, N, "⊖", "\\ominus", !0);
i(s, u, N, "⊎", "\\uplus", !0);
i(s, u, N, "⊓", "\\sqcap", !0);
i(s, u, N, "∗", "\\ast");
i(s, u, N, "⊔", "\\sqcup", !0);
i(s, u, N, "◯", "\\bigcirc", !0);
i(s, u, N, "∙", "\\bullet", !0);
i(s, u, N, "‡", "\\ddagger");
i(s, u, N, "≀", "\\wr", !0);
i(s, u, N, "⨿", "\\amalg");
i(s, u, N, "&", "\\And");
i(s, u, p, "⟵", "\\longleftarrow", !0);
i(s, u, p, "⇐", "\\Leftarrow", !0);
i(s, u, p, "⟸", "\\Longleftarrow", !0);
i(s, u, p, "⟶", "\\longrightarrow", !0);
i(s, u, p, "⇒", "\\Rightarrow", !0);
i(s, u, p, "⟹", "\\Longrightarrow", !0);
i(s, u, p, "↔", "\\leftrightarrow", !0);
i(s, u, p, "⟷", "\\longleftrightarrow", !0);
i(s, u, p, "⇔", "\\Leftrightarrow", !0);
i(s, u, p, "⟺", "\\Longleftrightarrow", !0);
i(s, u, p, "↦", "\\mapsto", !0);
i(s, u, p, "⟼", "\\longmapsto", !0);
i(s, u, p, "↗", "\\nearrow", !0);
i(s, u, p, "↩", "\\hookleftarrow", !0);
i(s, u, p, "↪", "\\hookrightarrow", !0);
i(s, u, p, "↘", "\\searrow", !0);
i(s, u, p, "↼", "\\leftharpoonup", !0);
i(s, u, p, "⇀", "\\rightharpoonup", !0);
i(s, u, p, "↙", "\\swarrow", !0);
i(s, u, p, "↽", "\\leftharpoondown", !0);
i(s, u, p, "⇁", "\\rightharpoondown", !0);
i(s, u, p, "↖", "\\nwarrow", !0);
i(s, u, p, "⇌", "\\rightleftharpoons", !0);
i(s, d, p, "≮", "\\nless", !0);
i(s, d, p, "", "\\@nleqslant");
i(s, d, p, "", "\\@nleqq");
i(s, d, p, "⪇", "\\lneq", !0);
i(s, d, p, "≨", "\\lneqq", !0);
i(s, d, p, "", "\\@lvertneqq");
i(s, d, p, "⋦", "\\lnsim", !0);
i(s, d, p, "⪉", "\\lnapprox", !0);
i(s, d, p, "⊀", "\\nprec", !0);
i(s, d, p, "⋠", "\\npreceq", !0);
i(s, d, p, "⋨", "\\precnsim", !0);
i(s, d, p, "⪹", "\\precnapprox", !0);
i(s, d, p, "≁", "\\nsim", !0);
i(s, d, p, "", "\\@nshortmid");
i(s, d, p, "∤", "\\nmid", !0);
i(s, d, p, "⊬", "\\nvdash", !0);
i(s, d, p, "⊭", "\\nvDash", !0);
i(s, d, p, "⋪", "\\ntriangleleft");
i(s, d, p, "⋬", "\\ntrianglelefteq", !0);
i(s, d, p, "⊊", "\\subsetneq", !0);
i(s, d, p, "", "\\@varsubsetneq");
i(s, d, p, "⫋", "\\subsetneqq", !0);
i(s, d, p, "", "\\@varsubsetneqq");
i(s, d, p, "≯", "\\ngtr", !0);
i(s, d, p, "", "\\@ngeqslant");
i(s, d, p, "", "\\@ngeqq");
i(s, d, p, "⪈", "\\gneq", !0);
i(s, d, p, "≩", "\\gneqq", !0);
i(s, d, p, "", "\\@gvertneqq");
i(s, d, p, "⋧", "\\gnsim", !0);
i(s, d, p, "⪊", "\\gnapprox", !0);
i(s, d, p, "⊁", "\\nsucc", !0);
i(s, d, p, "⋡", "\\nsucceq", !0);
i(s, d, p, "⋩", "\\succnsim", !0);
i(s, d, p, "⪺", "\\succnapprox", !0);
i(s, d, p, "≆", "\\ncong", !0);
i(s, d, p, "", "\\@nshortparallel");
i(s, d, p, "∦", "\\nparallel", !0);
i(s, d, p, "⊯", "\\nVDash", !0);
i(s, d, p, "⋫", "\\ntriangleright");
i(s, d, p, "⋭", "\\ntrianglerighteq", !0);
i(s, d, p, "", "\\@nsupseteqq");
i(s, d, p, "⊋", "\\supsetneq", !0);
i(s, d, p, "", "\\@varsupsetneq");
i(s, d, p, "⫌", "\\supsetneqq", !0);
i(s, d, p, "", "\\@varsupsetneqq");
i(s, d, p, "⊮", "\\nVdash", !0);
i(s, d, p, "⪵", "\\precneqq", !0);
i(s, d, p, "⪶", "\\succneqq", !0);
i(s, d, p, "", "\\@nsubseteqq");
i(s, d, N, "⊴", "\\unlhd");
i(s, d, N, "⊵", "\\unrhd");
i(s, d, p, "↚", "\\nleftarrow", !0);
i(s, d, p, "↛", "\\nrightarrow", !0);
i(s, d, p, "⇍", "\\nLeftarrow", !0);
i(s, d, p, "⇏", "\\nRightarrow", !0);
i(s, d, p, "↮", "\\nleftrightarrow", !0);
i(s, d, p, "⇎", "\\nLeftrightarrow", !0);
i(s, d, p, "△", "\\vartriangle");
i(s, d, v, "ℏ", "\\hslash");
i(s, d, v, "▽", "\\triangledown");
i(s, d, v, "◊", "\\lozenge");
i(s, d, v, "Ⓢ", "\\circledS");
i(s, d, v, "®", "\\circledR");
i(S, d, v, "®", "\\circledR");
i(s, d, v, "∡", "\\measuredangle", !0);
i(s, d, v, "∄", "\\nexists");
i(s, d, v, "℧", "\\mho");
i(s, d, v, "Ⅎ", "\\Finv", !0);
i(s, d, v, "⅁", "\\Game", !0);
i(s, d, v, "‵", "\\backprime");
i(s, d, v, "▲", "\\blacktriangle");
i(s, d, v, "▼", "\\blacktriangledown");
i(s, d, v, "■", "\\blacksquare");
i(s, d, v, "⧫", "\\blacklozenge");
i(s, d, v, "★", "\\bigstar");
i(s, d, v, "∢", "\\sphericalangle", !0);
i(s, d, v, "∁", "\\complement", !0);
i(s, d, v, "ð", "\\eth", !0);
i(S, u, v, "ð", "ð");
i(s, d, v, "╱", "\\diagup");
i(s, d, v, "╲", "\\diagdown");
i(s, d, v, "□", "\\square");
i(s, d, v, "□", "\\Box");
i(s, d, v, "◊", "\\Diamond");
i(s, d, v, "¥", "\\yen", !0);
i(S, d, v, "¥", "\\yen", !0);
i(s, d, v, "✓", "\\checkmark", !0);
i(S, d, v, "✓", "\\checkmark");
i(s, d, v, "ℶ", "\\beth", !0);
i(s, d, v, "ℸ", "\\daleth", !0);
i(s, d, v, "ℷ", "\\gimel", !0);
i(s, d, v, "ϝ", "\\digamma", !0);
i(s, d, v, "ϰ", "\\varkappa");
i(s, d, u0, "┌", "\\@ulcorner", !0);
i(s, d, n0, "┐", "\\@urcorner", !0);
i(s, d, u0, "└", "\\@llcorner", !0);
i(s, d, n0, "┘", "\\@lrcorner", !0);
i(s, d, p, "≦", "\\leqq", !0);
i(s, d, p, "⩽", "\\leqslant", !0);
i(s, d, p, "⪕", "\\eqslantless", !0);
i(s, d, p, "≲", "\\lesssim", !0);
i(s, d, p, "⪅", "\\lessapprox", !0);
i(s, d, p, "≊", "\\approxeq", !0);
i(s, d, N, "⋖", "\\lessdot");
i(s, d, p, "⋘", "\\lll", !0);
i(s, d, p, "≶", "\\lessgtr", !0);
i(s, d, p, "⋚", "\\lesseqgtr", !0);
i(s, d, p, "⪋", "\\lesseqqgtr", !0);
i(s, d, p, "≑", "\\doteqdot");
i(s, d, p, "≓", "\\risingdotseq", !0);
i(s, d, p, "≒", "\\fallingdotseq", !0);
i(s, d, p, "∽", "\\backsim", !0);
i(s, d, p, "⋍", "\\backsimeq", !0);
i(s, d, p, "⫅", "\\subseteqq", !0);
i(s, d, p, "⋐", "\\Subset", !0);
i(s, d, p, "⊏", "\\sqsubset", !0);
i(s, d, p, "≼", "\\preccurlyeq", !0);
i(s, d, p, "⋞", "\\curlyeqprec", !0);
i(s, d, p, "≾", "\\precsim", !0);
i(s, d, p, "⪷", "\\precapprox", !0);
i(s, d, p, "⊲", "\\vartriangleleft");
i(s, d, p, "⊴", "\\trianglelefteq");
i(s, d, p, "⊨", "\\vDash", !0);
i(s, d, p, "⊪", "\\Vvdash", !0);
i(s, d, p, "⌣", "\\smallsmile");
i(s, d, p, "⌢", "\\smallfrown");
i(s, d, p, "≏", "\\bumpeq", !0);
i(s, d, p, "≎", "\\Bumpeq", !0);
i(s, d, p, "≧", "\\geqq", !0);
i(s, d, p, "⩾", "\\geqslant", !0);
i(s, d, p, "⪖", "\\eqslantgtr", !0);
i(s, d, p, "≳", "\\gtrsim", !0);
i(s, d, p, "⪆", "\\gtrapprox", !0);
i(s, d, N, "⋗", "\\gtrdot");
i(s, d, p, "⋙", "\\ggg", !0);
i(s, d, p, "≷", "\\gtrless", !0);
i(s, d, p, "⋛", "\\gtreqless", !0);
i(s, d, p, "⪌", "\\gtreqqless", !0);
i(s, d, p, "≖", "\\eqcirc", !0);
i(s, d, p, "≗", "\\circeq", !0);
i(s, d, p, "≜", "\\triangleq", !0);
i(s, d, p, "∼", "\\thicksim");
i(s, d, p, "≈", "\\thickapprox");
i(s, d, p, "⫆", "\\supseteqq", !0);
i(s, d, p, "⋑", "\\Supset", !0);
i(s, d, p, "⊐", "\\sqsupset", !0);
i(s, d, p, "≽", "\\succcurlyeq", !0);
i(s, d, p, "⋟", "\\curlyeqsucc", !0);
i(s, d, p, "≿", "\\succsim", !0);
i(s, d, p, "⪸", "\\succapprox", !0);
i(s, d, p, "⊳", "\\vartriangleright");
i(s, d, p, "⊵", "\\trianglerighteq");
i(s, d, p, "⊩", "\\Vdash", !0);
i(s, d, p, "∣", "\\shortmid");
i(s, d, p, "∥", "\\shortparallel");
i(s, d, p, "≬", "\\between", !0);
i(s, d, p, "⋔", "\\pitchfork", !0);
i(s, d, p, "∝", "\\varpropto");
i(s, d, p, "◀", "\\blacktriangleleft");
i(s, d, p, "∴", "\\therefore", !0);
i(s, d, p, "∍", "\\backepsilon");
i(s, d, p, "▶", "\\blacktriangleright");
i(s, d, p, "∵", "\\because", !0);
i(s, d, p, "⋘", "\\llless");
i(s, d, p, "⋙", "\\gggtr");
i(s, d, N, "⊲", "\\lhd");
i(s, d, N, "⊳", "\\rhd");
i(s, d, p, "≂", "\\eqsim", !0);
i(s, u, p, "⋈", "\\Join");
i(s, d, p, "≑", "\\Doteq", !0);
i(s, d, N, "∔", "\\dotplus", !0);
i(s, d, N, "∖", "\\smallsetminus");
i(s, d, N, "⋒", "\\Cap", !0);
i(s, d, N, "⋓", "\\Cup", !0);
i(s, d, N, "⩞", "\\doublebarwedge", !0);
i(s, d, N, "⊟", "\\boxminus", !0);
i(s, d, N, "⊞", "\\boxplus", !0);
i(s, d, N, "⋇", "\\divideontimes", !0);
i(s, d, N, "⋉", "\\ltimes", !0);
i(s, d, N, "⋊", "\\rtimes", !0);
i(s, d, N, "⋋", "\\leftthreetimes", !0);
i(s, d, N, "⋌", "\\rightthreetimes", !0);
i(s, d, N, "⋏", "\\curlywedge", !0);
i(s, d, N, "⋎", "\\curlyvee", !0);
i(s, d, N, "⊝", "\\circleddash", !0);
i(s, d, N, "⊛", "\\circledast", !0);
i(s, d, N, "⋅", "\\centerdot");
i(s, d, N, "⊺", "\\intercal", !0);
i(s, d, N, "⋒", "\\doublecap");
i(s, d, N, "⋓", "\\doublecup");
i(s, d, N, "⊠", "\\boxtimes", !0);
i(s, d, p, "⇢", "\\dashrightarrow", !0);
i(s, d, p, "⇠", "\\dashleftarrow", !0);
i(s, d, p, "⇇", "\\leftleftarrows", !0);
i(s, d, p, "⇆", "\\leftrightarrows", !0);
i(s, d, p, "⇚", "\\Lleftarrow", !0);
i(s, d, p, "↞", "\\twoheadleftarrow", !0);
i(s, d, p, "↢", "\\leftarrowtail", !0);
i(s, d, p, "↫", "\\looparrowleft", !0);
i(s, d, p, "⇋", "\\leftrightharpoons", !0);
i(s, d, p, "↶", "\\curvearrowleft", !0);
i(s, d, p, "↺", "\\circlearrowleft", !0);
i(s, d, p, "↰", "\\Lsh", !0);
i(s, d, p, "⇈", "\\upuparrows", !0);
i(s, d, p, "↿", "\\upharpoonleft", !0);
i(s, d, p, "⇃", "\\downharpoonleft", !0);
i(s, u, p, "⊶", "\\origof", !0);
i(s, u, p, "⊷", "\\imageof", !0);
i(s, d, p, "⊸", "\\multimap", !0);
i(s, d, p, "↭", "\\leftrightsquigarrow", !0);
i(s, d, p, "⇉", "\\rightrightarrows", !0);
i(s, d, p, "⇄", "\\rightleftarrows", !0);
i(s, d, p, "↠", "\\twoheadrightarrow", !0);
i(s, d, p, "↣", "\\rightarrowtail", !0);
i(s, d, p, "↬", "\\looparrowright", !0);
i(s, d, p, "↷", "\\curvearrowright", !0);
i(s, d, p, "↻", "\\circlearrowright", !0);
i(s, d, p, "↱", "\\Rsh", !0);
i(s, d, p, "⇊", "\\downdownarrows", !0);
i(s, d, p, "↾", "\\upharpoonright", !0);
i(s, d, p, "⇂", "\\downharpoonright", !0);
i(s, d, p, "⇝", "\\rightsquigarrow", !0);
i(s, d, p, "⇝", "\\leadsto");
i(s, d, p, "⇛", "\\Rrightarrow", !0);
i(s, d, p, "↾", "\\restriction");
i(s, u, v, "‘", "`");
i(s, u, v, "$", "\\$");
i(S, u, v, "$", "\\$");
i(S, u, v, "$", "\\textdollar");
i(s, u, v, "%", "\\%");
i(S, u, v, "%", "\\%");
i(s, u, v, "_", "\\_");
i(S, u, v, "_", "\\_");
i(S, u, v, "_", "\\textunderscore");
i(s, u, v, "∠", "\\angle", !0);
i(s, u, v, "∞", "\\infty", !0);
i(s, u, v, "′", "\\prime");
i(s, u, v, "△", "\\triangle");
i(s, u, v, "Γ", "\\Gamma", !0);
i(s, u, v, "Δ", "\\Delta", !0);
i(s, u, v, "Θ", "\\Theta", !0);
i(s, u, v, "Λ", "\\Lambda", !0);
i(s, u, v, "Ξ", "\\Xi", !0);
i(s, u, v, "Π", "\\Pi", !0);
i(s, u, v, "Σ", "\\Sigma", !0);
i(s, u, v, "Υ", "\\Upsilon", !0);
i(s, u, v, "Φ", "\\Phi", !0);
i(s, u, v, "Ψ", "\\Psi", !0);
i(s, u, v, "Ω", "\\Omega", !0);
i(s, u, v, "A", "Α");
i(s, u, v, "B", "Β");
i(s, u, v, "E", "Ε");
i(s, u, v, "Z", "Ζ");
i(s, u, v, "H", "Η");
i(s, u, v, "I", "Ι");
i(s, u, v, "K", "Κ");
i(s, u, v, "M", "Μ");
i(s, u, v, "N", "Ν");
i(s, u, v, "O", "Ο");
i(s, u, v, "P", "Ρ");
i(s, u, v, "T", "Τ");
i(s, u, v, "X", "Χ");
i(s, u, v, "¬", "\\neg", !0);
i(s, u, v, "¬", "\\lnot");
i(s, u, v, "⊤", "\\top");
i(s, u, v, "⊥", "\\bot");
i(s, u, v, "∅", "\\emptyset");
i(s, d, v, "∅", "\\varnothing");
i(s, u, R, "α", "\\alpha", !0);
i(s, u, R, "β", "\\beta", !0);
i(s, u, R, "γ", "\\gamma", !0);
i(s, u, R, "δ", "\\delta", !0);
i(s, u, R, "ϵ", "\\epsilon", !0);
i(s, u, R, "ζ", "\\zeta", !0);
i(s, u, R, "η", "\\eta", !0);
i(s, u, R, "θ", "\\theta", !0);
i(s, u, R, "ι", "\\iota", !0);
i(s, u, R, "κ", "\\kappa", !0);
i(s, u, R, "λ", "\\lambda", !0);
i(s, u, R, "μ", "\\mu", !0);
i(s, u, R, "ν", "\\nu", !0);
i(s, u, R, "ξ", "\\xi", !0);
i(s, u, R, "ο", "\\omicron", !0);
i(s, u, R, "π", "\\pi", !0);
i(s, u, R, "ρ", "\\rho", !0);
i(s, u, R, "σ", "\\sigma", !0);
i(s, u, R, "τ", "\\tau", !0);
i(s, u, R, "υ", "\\upsilon", !0);
i(s, u, R, "ϕ", "\\phi", !0);
i(s, u, R, "χ", "\\chi", !0);
i(s, u, R, "ψ", "\\psi", !0);
i(s, u, R, "ω", "\\omega", !0);
i(s, u, R, "ε", "\\varepsilon", !0);
i(s, u, R, "ϑ", "\\vartheta", !0);
i(s, u, R, "ϖ", "\\varpi", !0);
i(s, u, R, "ϱ", "\\varrho", !0);
i(s, u, R, "ς", "\\varsigma", !0);
i(s, u, R, "φ", "\\varphi", !0);
i(s, u, N, "∗", "*", !0);
i(s, u, N, "+", "+");
i(s, u, N, "−", "-", !0);
i(s, u, N, "⋅", "\\cdot", !0);
i(s, u, N, "∘", "\\circ", !0);
i(s, u, N, "÷", "\\div", !0);
i(s, u, N, "±", "\\pm", !0);
i(s, u, N, "×", "\\times", !0);
i(s, u, N, "∩", "\\cap", !0);
i(s, u, N, "∪", "\\cup", !0);
i(s, u, N, "∖", "\\setminus", !0);
i(s, u, N, "∧", "\\land");
i(s, u, N, "∨", "\\lor");
i(s, u, N, "∧", "\\wedge", !0);
i(s, u, N, "∨", "\\vee", !0);
i(s, u, v, "√", "\\surd");
i(s, u, u0, "⟨", "\\langle", !0);
i(s, u, u0, "∣", "\\lvert");
i(s, u, u0, "∥", "\\lVert");
i(s, u, n0, "?", "?");
i(s, u, n0, "!", "!");
i(s, u, n0, "⟩", "\\rangle", !0);
i(s, u, n0, "∣", "\\rvert");
i(s, u, n0, "∥", "\\rVert");
i(s, u, p, "=", "=");
i(s, u, p, ":", ":");
i(s, u, p, "≈", "\\approx", !0);
i(s, u, p, "≅", "\\cong", !0);
i(s, u, p, "≥", "\\ge");
i(s, u, p, "≥", "\\geq", !0);
i(s, u, p, "←", "\\gets");
i(s, u, p, ">", "\\gt", !0);
i(s, u, p, "∈", "\\in", !0);
i(s, u, p, "", "\\@not");
i(s, u, p, "⊂", "\\subset", !0);
i(s, u, p, "⊃", "\\supset", !0);
i(s, u, p, "⊆", "\\subseteq", !0);
i(s, u, p, "⊇", "\\supseteq", !0);
i(s, d, p, "⊈", "\\nsubseteq", !0);
i(s, d, p, "⊉", "\\nsupseteq", !0);
i(s, u, p, "⊨", "\\models");
i(s, u, p, "←", "\\leftarrow", !0);
i(s, u, p, "≤", "\\le");
i(s, u, p, "≤", "\\leq", !0);
i(s, u, p, "<", "\\lt", !0);
i(s, u, p, "→", "\\rightarrow", !0);
i(s, u, p, "→", "\\to");
i(s, d, p, "≱", "\\ngeq", !0);
i(s, d, p, "≰", "\\nleq", !0);
i(s, u, q0, " ", "\\ ");
i(s, u, q0, " ", "\\space");
i(s, u, q0, " ", "\\nobreakspace");
i(S, u, q0, " ", "\\ ");
i(S, u, q0, " ", " ");
i(S, u, q0, " ", "\\space");
i(S, u, q0, " ", "\\nobreakspace");
i(s, u, q0, null, "\\nobreak");
i(s, u, q0, null, "\\allowbreak");
i(s, u, qe, ",", ",");
i(s, u, qe, ";", ";");
i(s, d, N, "⊼", "\\barwedge", !0);
i(s, d, N, "⊻", "\\veebar", !0);
i(s, u, N, "⊙", "\\odot", !0);
i(s, u, N, "⊕", "\\oplus", !0);
i(s, u, N, "⊗", "\\otimes", !0);
i(s, u, v, "∂", "\\partial", !0);
i(s, u, N, "⊘", "\\oslash", !0);
i(s, d, N, "⊚", "\\circledcirc", !0);
i(s, d, N, "⊡", "\\boxdot", !0);
i(s, u, N, "△", "\\bigtriangleup");
i(s, u, N, "▽", "\\bigtriangledown");
i(s, u, N, "†", "\\dagger");
i(s, u, N, "⋄", "\\diamond");
i(s, u, N, "⋆", "\\star");
i(s, u, N, "◃", "\\triangleleft");
i(s, u, N, "▹", "\\triangleright");
i(s, u, u0, "{", "\\{");
i(S, u, v, "{", "\\{");
i(S, u, v, "{", "\\textbraceleft");
i(s, u, n0, "}", "\\}");
i(S, u, v, "}", "\\}");
i(S, u, v, "}", "\\textbraceright");
i(s, u, u0, "{", "\\lbrace");
i(s, u, n0, "}", "\\rbrace");
i(s, u, u0, "[", "\\lbrack", !0);
i(S, u, v, "[", "\\lbrack", !0);
i(s, u, n0, "]", "\\rbrack", !0);
i(S, u, v, "]", "\\rbrack", !0);
i(s, u, u0, "(", "\\lparen", !0);
i(s, u, n0, ")", "\\rparen", !0);
i(S, u, v, "<", "\\textless", !0);
i(S, u, v, ">", "\\textgreater", !0);
i(s, u, u0, "⌊", "\\lfloor", !0);
i(s, u, n0, "⌋", "\\rfloor", !0);
i(s, u, u0, "⌈", "\\lceil", !0);
i(s, u, n0, "⌉", "\\rceil", !0);
i(s, u, v, "\\", "\\backslash");
i(s, u, v, "∣", "|");
i(s, u, v, "∣", "\\vert");
i(S, u, v, "|", "\\textbar", !0);
i(s, u, v, "∥", "\\|");
i(s, u, v, "∥", "\\Vert");
i(S, u, v, "∥", "\\textbardbl");
i(S, u, v, "~", "\\textasciitilde");
i(S, u, v, "\\", "\\textbackslash");
i(S, u, v, "^", "\\textasciicircum");
i(s, u, p, "↑", "\\uparrow", !0);
i(s, u, p, "⇑", "\\Uparrow", !0);
i(s, u, p, "↓", "\\downarrow", !0);
i(s, u, p, "⇓", "\\Downarrow", !0);
i(s, u, p, "↕", "\\updownarrow", !0);
i(s, u, p, "⇕", "\\Updownarrow", !0);
i(s, u, e0, "∐", "\\coprod");
i(s, u, e0, "⋁", "\\bigvee");
i(s, u, e0, "⋀", "\\bigwedge");
i(s, u, e0, "⨄", "\\biguplus");
i(s, u, e0, "⋂", "\\bigcap");
i(s, u, e0, "⋃", "\\bigcup");
i(s, u, e0, "∫", "\\int");
i(s, u, e0, "∫", "\\intop");
i(s, u, e0, "∬", "\\iint");
i(s, u, e0, "∭", "\\iiint");
i(s, u, e0, "∏", "\\prod");
i(s, u, e0, "∑", "\\sum");
i(s, u, e0, "⨂", "\\bigotimes");
i(s, u, e0, "⨁", "\\bigoplus");
i(s, u, e0, "⨀", "\\bigodot");
i(s, u, e0, "∮", "\\oint");
i(s, u, e0, "∯", "\\oiint");
i(s, u, e0, "∰", "\\oiiint");
i(s, u, e0, "⨆", "\\bigsqcup");
i(s, u, e0, "∫", "\\smallint");
i(S, u, _0, "…", "\\textellipsis");
i(s, u, _0, "…", "\\mathellipsis");
i(S, u, _0, "…", "\\ldots", !0);
i(s, u, _0, "…", "\\ldots", !0);
i(s, u, _0, "⋯", "\\@cdots", !0);
i(s, u, _0, "⋱", "\\ddots", !0);
i(s, u, v, "⋮", "\\varvdots");
i(s, u, j, "ˊ", "\\acute");
i(s, u, j, "ˋ", "\\grave");
i(s, u, j, "¨", "\\ddot");
i(s, u, j, "~", "\\tilde");
i(s, u, j, "ˉ", "\\bar");
i(s, u, j, "˘", "\\breve");
i(s, u, j, "ˇ", "\\check");
i(s, u, j, "^", "\\hat");
i(s, u, j, "⃗", "\\vec");
i(s, u, j, "˙", "\\dot");
i(s, u, j, "˚", "\\mathring");
i(s, u, R, "", "\\@imath");
i(s, u, R, "", "\\@jmath");
i(s, u, v, "ı", "ı");
i(s, u, v, "ȷ", "ȷ");
i(S, u, v, "ı", "\\i", !0);
i(S, u, v, "ȷ", "\\j", !0);
i(S, u, v, "ß", "\\ss", !0);
i(S, u, v, "æ", "\\ae", !0);
i(S, u, v, "œ", "\\oe", !0);
i(S, u, v, "ø", "\\o", !0);
i(S, u, v, "Æ", "\\AE", !0);
i(S, u, v, "Œ", "\\OE", !0);
i(S, u, v, "Ø", "\\O", !0);
i(S, u, j, "ˊ", "\\'");
i(S, u, j, "ˋ", "\\`");
i(S, u, j, "ˆ", "\\^");
i(S, u, j, "˜", "\\~");
i(S, u, j, "ˉ", "\\=");
i(S, u, j, "˘", "\\u");
i(S, u, j, "˙", "\\.");
i(S, u, j, "¸", "\\c");
i(S, u, j, "˚", "\\r");
i(S, u, j, "ˇ", "\\v");
i(S, u, j, "¨", '\\"');
i(S, u, j, "˝", "\\H");
i(S, u, j, "◯", "\\textcircled");
var Ar = {
  "--": !0,
  "---": !0,
  "``": !0,
  "''": !0
};
i(S, u, v, "–", "--", !0);
i(S, u, v, "–", "\\textendash");
i(S, u, v, "—", "---", !0);
i(S, u, v, "—", "\\textemdash");
i(S, u, v, "‘", "`", !0);
i(S, u, v, "‘", "\\textquoteleft");
i(S, u, v, "’", "'", !0);
i(S, u, v, "’", "\\textquoteright");
i(S, u, v, "“", "``", !0);
i(S, u, v, "“", "\\textquotedblleft");
i(S, u, v, "”", "''", !0);
i(S, u, v, "”", "\\textquotedblright");
i(s, u, v, "°", "\\degree", !0);
i(S, u, v, "°", "\\degree");
i(S, u, v, "°", "\\textdegree", !0);
i(s, u, v, "£", "\\pounds");
i(s, u, v, "£", "\\mathsterling", !0);
i(S, u, v, "£", "\\pounds");
i(S, u, v, "£", "\\textsterling", !0);
i(s, d, v, "✠", "\\maltese");
i(S, d, v, "✠", "\\maltese");
var Xt = '0123456789/@."';
for (var Xe = 0; Xe < Xt.length; Xe++) {
  var Yt = Xt.charAt(Xe);
  i(s, u, v, Yt, Yt);
}
var Wt = '0123456789!@*()-=+";:?/.,';
for (var Ye = 0; Ye < Wt.length; Ye++) {
  var jt = Wt.charAt(Ye);
  i(S, u, v, jt, jt);
}
var Be = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (var We = 0; We < Be.length; We++) {
  var ve = Be.charAt(We);
  i(s, u, R, ve, ve), i(S, u, v, ve, ve);
}
i(s, d, v, "C", "ℂ");
i(S, d, v, "C", "ℂ");
i(s, d, v, "H", "ℍ");
i(S, d, v, "H", "ℍ");
i(s, d, v, "N", "ℕ");
i(S, d, v, "N", "ℕ");
i(s, d, v, "P", "ℙ");
i(S, d, v, "P", "ℙ");
i(s, d, v, "Q", "ℚ");
i(S, d, v, "Q", "ℚ");
i(s, d, v, "R", "ℝ");
i(S, d, v, "R", "ℝ");
i(s, d, v, "Z", "ℤ");
i(S, d, v, "Z", "ℤ");
i(s, u, R, "h", "ℎ");
i(S, u, R, "h", "ℎ");
var O = "";
for (var i0 = 0; i0 < Be.length; i0++) {
  var Q = Be.charAt(i0);
  O = String.fromCharCode(55349, 56320 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), O = String.fromCharCode(55349, 56372 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), O = String.fromCharCode(55349, 56424 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), O = String.fromCharCode(55349, 56580 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), O = String.fromCharCode(55349, 56736 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), O = String.fromCharCode(55349, 56788 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), O = String.fromCharCode(55349, 56840 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), O = String.fromCharCode(55349, 56944 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), i0 < 26 && (O = String.fromCharCode(55349, 56632 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O), O = String.fromCharCode(55349, 56476 + i0), i(s, u, R, Q, O), i(S, u, v, Q, O));
}
O = String.fromCharCode(55349, 56668);
i(s, u, R, "k", O);
i(S, u, v, "k", O);
for (var G0 = 0; G0 < 10; G0++) {
  var I0 = G0.toString();
  O = String.fromCharCode(55349, 57294 + G0), i(s, u, R, I0, O), i(S, u, v, I0, O), O = String.fromCharCode(55349, 57314 + G0), i(s, u, R, I0, O), i(S, u, v, I0, O), O = String.fromCharCode(55349, 57324 + G0), i(s, u, R, I0, O), i(S, u, v, I0, O), O = String.fromCharCode(55349, 57334 + G0), i(s, u, R, I0, O), i(S, u, v, I0, O);
}
var ut = "ÐÞþ";
for (var je = 0; je < ut.length; je++) {
  var ge = ut.charAt(je);
  i(s, u, R, ge, ge), i(S, u, v, ge, ge);
}
var be = [
  ["mathbf", "textbf", "Main-Bold"],
  // A-Z bold upright
  ["mathbf", "textbf", "Main-Bold"],
  // a-z bold upright
  ["mathnormal", "textit", "Math-Italic"],
  // A-Z italic
  ["mathnormal", "textit", "Math-Italic"],
  // a-z italic
  ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
  // A-Z bold italic
  ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
  // a-z bold italic
  // Map fancy A-Z letters to script, not calligraphic.
  // This aligns with unicode-math and math fonts (except Cambria Math).
  ["mathscr", "textscr", "Script-Regular"],
  // A-Z script
  ["", "", ""],
  // a-z script.  No font
  ["", "", ""],
  // A-Z bold script. No font
  ["", "", ""],
  // a-z bold script. No font
  ["mathfrak", "textfrak", "Fraktur-Regular"],
  // A-Z Fraktur
  ["mathfrak", "textfrak", "Fraktur-Regular"],
  // a-z Fraktur
  ["mathbb", "textbb", "AMS-Regular"],
  // A-Z double-struck
  ["mathbb", "textbb", "AMS-Regular"],
  // k double-struck
  ["", "", ""],
  // A-Z bold Fraktur No font metrics
  ["", "", ""],
  // a-z bold Fraktur.   No font.
  ["mathsf", "textsf", "SansSerif-Regular"],
  // A-Z sans-serif
  ["mathsf", "textsf", "SansSerif-Regular"],
  // a-z sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // A-Z bold sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // a-z bold sans-serif
  ["mathitsf", "textitsf", "SansSerif-Italic"],
  // A-Z italic sans-serif
  ["mathitsf", "textitsf", "SansSerif-Italic"],
  // a-z italic sans-serif
  ["", "", ""],
  // A-Z bold italic sans. No font
  ["", "", ""],
  // a-z bold italic sans. No font
  ["mathtt", "texttt", "Typewriter-Regular"],
  // A-Z monospace
  ["mathtt", "texttt", "Typewriter-Regular"]
  // a-z monospace
], Zt = [
  ["mathbf", "textbf", "Main-Bold"],
  // 0-9 bold
  ["", "", ""],
  // 0-9 double-struck. No KaTeX font.
  ["mathsf", "textsf", "SansSerif-Regular"],
  // 0-9 sans-serif
  ["mathboldsf", "textboldsf", "SansSerif-Bold"],
  // 0-9 bold sans-serif
  ["mathtt", "texttt", "Typewriter-Regular"]
  // 0-9 monospace
], v1 = function(e, t) {
  var a = e.charCodeAt(0), n = e.charCodeAt(1), l = (a - 55296) * 1024 + (n - 56320) + 65536, o = t === "math" ? 0 : 1;
  if (119808 <= l && l < 120484) {
    var h = Math.floor((l - 119808) / 26);
    return [be[h][2], be[h][o]];
  } else if (120782 <= l && l <= 120831) {
    var m = Math.floor((l - 120782) / 10);
    return [Zt[m][2], Zt[m][o]];
  } else {
    if (l === 120485 || l === 120486)
      return [be[0][2], be[0][o]];
    if (120486 < l && l < 120782)
      return ["", ""];
    throw new T("Unsupported character: " + e);
  }
}, Ee = function(e, t, a) {
  return W[a][e] && W[a][e].replace && (e = W[a][e].replace), {
    value: e,
    metrics: gt(e, t, a)
  };
}, g0 = function(e, t, a, n, l) {
  var o = Ee(e, t, a), h = o.metrics;
  e = o.value;
  var m;
  if (h) {
    var f = h.italic;
    (a === "text" || n && n.font === "mathit") && (f = 0), m = new p0(e, h.height, h.depth, f, h.skew, h.width, l);
  } else
    typeof console < "u" && console.warn("No character metrics " + ("for '" + e + "' in style '" + t + "' and mode '" + a + "'")), m = new p0(e, 0, 0, 0, 0, 0, l);
  if (n) {
    m.maxFontSize = n.sizeMultiplier, n.style.isTight() && m.classes.push("mtight");
    var g = n.getColor();
    g && (m.style.color = g);
  }
  return m;
}, g1 = function(e, t, a, n) {
  return n === void 0 && (n = []), a.font === "boldsymbol" && Ee(e, "Main-Bold", t).metrics ? g0(e, "Main-Bold", t, a, n.concat(["mathbf"])) : e === "\\" || W[t][e].font === "main" ? g0(e, "Main-Regular", t, a, n) : g0(e, "AMS-Regular", t, a, n.concat(["amsrm"]));
}, b1 = function(e, t, a, n, l) {
  return l !== "textord" && Ee(e, "Math-BoldItalic", t).metrics ? {
    fontName: "Math-BoldItalic",
    fontClass: "boldsymbol"
  } : {
    fontName: "Main-Bold",
    fontClass: "mathbf"
  };
}, y1 = function(e, t, a) {
  var n = e.mode, l = e.text, o = ["mord"], h = n === "math" || n === "text" && t.font, m = h ? t.font : t.fontFamily;
  if (l.charCodeAt(0) === 55349) {
    var [f, g] = v1(l, n);
    return g0(l, f, n, t, o.concat(g));
  } else if (m) {
    var b, y;
    if (m === "boldsymbol") {
      var w = b1(l, n, t, o, a);
      b = w.fontName, y = [w.fontClass];
    } else
      h ? (b = Dr[m].fontName, y = [m]) : (b = ye(m, t.fontWeight, t.fontShape), y = [m, t.fontWeight, t.fontShape]);
    if (Ee(l, b, n).metrics)
      return g0(l, b, n, t, o.concat(y));
    if (Ar.hasOwnProperty(l) && b.substr(0, 10) === "Typewriter") {
      for (var M = [], k = 0; k < l.length; k++)
        M.push(g0(l[k], b, n, t, o.concat(y)));
      return Cr(M);
    }
  }
  if (a === "mathord")
    return g0(l, "Math-Italic", n, t, o.concat(["mathnormal"]));
  if (a === "textord") {
    var C = W[n][l] && W[n][l].font;
    if (C === "ams") {
      var B = ye("amsrm", t.fontWeight, t.fontShape);
      return g0(l, B, n, t, o.concat("amsrm", t.fontWeight, t.fontShape));
    } else if (C === "main" || !C) {
      var q = ye("textrm", t.fontWeight, t.fontShape);
      return g0(l, q, n, t, o.concat(t.fontWeight, t.fontShape));
    } else {
      var H = ye(C, t.fontWeight, t.fontShape);
      return g0(l, H, n, t, o.concat(H, t.fontWeight, t.fontShape));
    }
  } else
    throw new Error("unexpected type: " + a + " in makeOrd");
}, x1 = (r, e) => {
  if (H0(r.classes) !== H0(e.classes) || r.skew !== e.skew || r.maxFontSize !== e.maxFontSize)
    return !1;
  if (r.classes.length === 1) {
    var t = r.classes[0];
    if (t === "mbin" || t === "mord")
      return !1;
  }
  for (var a in r.style)
    if (r.style.hasOwnProperty(a) && r.style[a] !== e.style[a])
      return !1;
  for (var n in e.style)
    if (e.style.hasOwnProperty(n) && r.style[n] !== e.style[n])
      return !1;
  return !0;
}, w1 = (r) => {
  for (var e = 0; e < r.length - 1; e++) {
    var t = r[e], a = r[e + 1];
    t instanceof p0 && a instanceof p0 && x1(t, a) && (t.text += a.text, t.height = Math.max(t.height, a.height), t.depth = Math.max(t.depth, a.depth), t.italic = a.italic, r.splice(e + 1, 1), e--);
  }
  return r;
}, yt = function(e) {
  for (var t = 0, a = 0, n = 0, l = 0; l < e.children.length; l++) {
    var o = e.children[l];
    o.height > t && (t = o.height), o.depth > a && (a = o.depth), o.maxFontSize > n && (n = o.maxFontSize);
  }
  e.height = t, e.depth = a, e.maxFontSize = n;
}, l0 = function(e, t, a, n) {
  var l = new oe(e, t, a, n);
  return yt(l), l;
}, Br = (r, e, t, a) => new oe(r, e, t, a), k1 = function(e, t, a) {
  var n = l0([e], [], t);
  return n.height = Math.max(a || t.fontMetrics().defaultRuleThickness, t.minRuleThickness), n.style.borderBottomWidth = A(n.height), n.maxFontSize = 1, n;
}, S1 = function(e, t, a, n) {
  var l = new bt(e, t, a, n);
  return yt(l), l;
}, Cr = function(e) {
  var t = new se(e);
  return yt(t), t;
}, M1 = function(e, t) {
  return e instanceof se ? l0([], [e], t) : e;
}, z1 = function(e) {
  if (e.positionType === "individualShift") {
    for (var t = e.children, a = [t[0]], n = -t[0].shift - t[0].elem.depth, l = n, o = 1; o < t.length; o++) {
      var h = -t[o].shift - l - t[o].elem.depth, m = h - (t[o - 1].elem.height + t[o - 1].elem.depth);
      l = l + h, a.push({
        type: "kern",
        size: m
      }), a.push(t[o]);
    }
    return {
      children: a,
      depth: n
    };
  }
  var f;
  if (e.positionType === "top") {
    for (var g = e.positionData, b = 0; b < e.children.length; b++) {
      var y = e.children[b];
      g -= y.type === "kern" ? y.size : y.elem.height + y.elem.depth;
    }
    f = g;
  } else if (e.positionType === "bottom")
    f = -e.positionData;
  else {
    var w = e.children[0];
    if (w.type !== "elem")
      throw new Error('First child must have type "elem".');
    if (e.positionType === "shift")
      f = -w.elem.depth - e.positionData;
    else if (e.positionType === "firstBaseline")
      f = -w.elem.depth;
    else
      throw new Error("Invalid positionType " + e.positionType + ".");
  }
  return {
    children: e.children,
    depth: f
  };
}, T1 = function(e, t) {
  for (var {
    children: a,
    depth: n
  } = z1(e), l = 0, o = 0; o < a.length; o++) {
    var h = a[o];
    if (h.type === "elem") {
      var m = h.elem;
      l = Math.max(l, m.maxFontSize, m.height);
    }
  }
  l += 2;
  var f = l0(["pstrut"], []);
  f.style.height = A(l);
  for (var g = [], b = n, y = n, w = n, M = 0; M < a.length; M++) {
    var k = a[M];
    if (k.type === "kern")
      w += k.size;
    else {
      var C = k.elem, B = k.wrapperClasses || [], q = k.wrapperStyle || {}, H = l0(B, [f, C], void 0, q);
      H.style.top = A(-l - w - C.depth), k.marginLeft && (H.style.marginLeft = k.marginLeft), k.marginRight && (H.style.marginRight = k.marginRight), g.push(H), w += C.height + C.depth;
    }
    b = Math.min(b, w), y = Math.max(y, w);
  }
  var $ = l0(["vlist"], g);
  $.style.height = A(y);
  var I;
  if (b < 0) {
    var G = l0([], []), F = l0(["vlist"], [G]);
    F.style.height = A(-b);
    var V = l0(["vlist-s"], [new p0("​")]);
    I = [l0(["vlist-r"], [$, V]), l0(["vlist-r"], [F])];
  } else
    I = [l0(["vlist-r"], [$])];
  var X = l0(["vlist-t"], I);
  return I.length === 2 && X.classes.push("vlist-t2"), X.height = y, X.depth = -b, X;
}, A1 = (r, e) => {
  var t = l0(["mspace"], [], e), a = K(r, e);
  return t.style.marginRight = A(a), t;
}, ye = function(e, t, a) {
  var n = "";
  switch (e) {
    case "amsrm":
      n = "AMS";
      break;
    case "textrm":
      n = "Main";
      break;
    case "textsf":
      n = "SansSerif";
      break;
    case "texttt":
      n = "Typewriter";
      break;
    default:
      n = e;
  }
  var l;
  return t === "textbf" && a === "textit" ? l = "BoldItalic" : t === "textbf" ? l = "Bold" : t === "textit" ? l = "Italic" : l = "Regular", n + "-" + l;
}, Dr = {
  // styles
  mathbf: {
    variant: "bold",
    fontName: "Main-Bold"
  },
  mathrm: {
    variant: "normal",
    fontName: "Main-Regular"
  },
  textit: {
    variant: "italic",
    fontName: "Main-Italic"
  },
  mathit: {
    variant: "italic",
    fontName: "Main-Italic"
  },
  mathnormal: {
    variant: "italic",
    fontName: "Math-Italic"
  },
  // "boldsymbol" is missing because they require the use of multiple fonts:
  // Math-BoldItalic and Main-Bold.  This is handled by a special case in
  // makeOrd which ends up calling boldsymbol.
  // families
  mathbb: {
    variant: "double-struck",
    fontName: "AMS-Regular"
  },
  mathcal: {
    variant: "script",
    fontName: "Caligraphic-Regular"
  },
  mathfrak: {
    variant: "fraktur",
    fontName: "Fraktur-Regular"
  },
  mathscr: {
    variant: "script",
    fontName: "Script-Regular"
  },
  mathsf: {
    variant: "sans-serif",
    fontName: "SansSerif-Regular"
  },
  mathtt: {
    variant: "monospace",
    fontName: "Typewriter-Regular"
  }
}, Nr = {
  //   path, width, height
  vec: ["vec", 0.471, 0.714],
  // values from the font glyph
  oiintSize1: ["oiintSize1", 0.957, 0.499],
  // oval to overlay the integrand
  oiintSize2: ["oiintSize2", 1.472, 0.659],
  oiiintSize1: ["oiiintSize1", 1.304, 0.499],
  oiiintSize2: ["oiiintSize2", 1.98, 0.659]
}, B1 = function(e, t) {
  var [a, n, l] = Nr[e], o = new V0(a), h = new O0([o], {
    width: A(n),
    height: A(l),
    // Override CSS rule `.katex svg { width: 100% }`
    style: "width:" + A(n),
    viewBox: "0 0 " + 1e3 * n + " " + 1e3 * l,
    preserveAspectRatio: "xMinYMin"
  }), m = Br(["overlay"], [h], t);
  return m.height = l, m.style.height = A(l), m.style.width = A(n), m;
}, x = {
  fontMap: Dr,
  makeSymbol: g0,
  mathsym: g1,
  makeSpan: l0,
  makeSvgSpan: Br,
  makeLineSpan: k1,
  makeAnchor: S1,
  makeFragment: Cr,
  wrapFragment: M1,
  makeVList: T1,
  makeOrd: y1,
  makeGlue: A1,
  staticSvg: B1,
  svgData: Nr,
  tryCombineChars: w1
}, Z = {
  number: 3,
  unit: "mu"
}, $0 = {
  number: 4,
  unit: "mu"
}, T0 = {
  number: 5,
  unit: "mu"
}, C1 = {
  mord: {
    mop: Z,
    mbin: $0,
    mrel: T0,
    minner: Z
  },
  mop: {
    mord: Z,
    mop: Z,
    mrel: T0,
    minner: Z
  },
  mbin: {
    mord: $0,
    mop: $0,
    mopen: $0,
    minner: $0
  },
  mrel: {
    mord: T0,
    mop: T0,
    mopen: T0,
    minner: T0
  },
  mopen: {},
  mclose: {
    mop: Z,
    mbin: $0,
    mrel: T0,
    minner: Z
  },
  mpunct: {
    mord: Z,
    mop: Z,
    mrel: T0,
    mopen: Z,
    mclose: Z,
    mpunct: Z,
    minner: Z
  },
  minner: {
    mord: Z,
    mop: Z,
    mbin: $0,
    mrel: T0,
    mopen: Z,
    mpunct: Z,
    minner: Z
  }
}, D1 = {
  mord: {
    mop: Z
  },
  mop: {
    mord: Z,
    mop: Z
  },
  mbin: {},
  mrel: {},
  mopen: {},
  mclose: {
    mop: Z
  },
  mpunct: {},
  minner: {
    mop: Z
  }
}, qr = {}, Ce = {}, De = {};
function D(r) {
  for (var {
    type: e,
    names: t,
    props: a,
    handler: n,
    htmlBuilder: l,
    mathmlBuilder: o
  } = r, h = {
    type: e,
    numArgs: a.numArgs,
    argTypes: a.argTypes,
    allowedInArgument: !!a.allowedInArgument,
    allowedInText: !!a.allowedInText,
    allowedInMath: a.allowedInMath === void 0 ? !0 : a.allowedInMath,
    numOptionalArgs: a.numOptionalArgs || 0,
    infix: !!a.infix,
    primitive: !!a.primitive,
    handler: n
  }, m = 0; m < t.length; ++m)
    qr[t[m]] = h;
  e && (l && (Ce[e] = l), o && (De[e] = o));
}
function U0(r) {
  var {
    type: e,
    htmlBuilder: t,
    mathmlBuilder: a
  } = r;
  D({
    type: e,
    names: [],
    props: {
      numArgs: 0
    },
    handler() {
      throw new Error("Should never be called.");
    },
    htmlBuilder: t,
    mathmlBuilder: a
  });
}
var Ne = function(e) {
  return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
}, _ = function(e) {
  return e.type === "ordgroup" ? e.body : [e];
}, D0 = x.makeSpan, N1 = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"], q1 = ["rightmost", "mrel", "mclose", "mpunct"], E1 = {
  display: E.DISPLAY,
  text: E.TEXT,
  script: E.SCRIPT,
  scriptscript: E.SCRIPTSCRIPT
}, R1 = {
  mord: "mord",
  mop: "mop",
  mbin: "mbin",
  mrel: "mrel",
  mopen: "mopen",
  mclose: "mclose",
  mpunct: "mpunct",
  minner: "minner"
}, r0 = function(e, t, a, n) {
  n === void 0 && (n = [null, null]);
  for (var l = [], o = 0; o < e.length; o++) {
    var h = U(e[o], t);
    if (h instanceof se) {
      var m = h.children;
      l.push(...m);
    } else
      l.push(h);
  }
  if (x.tryCombineChars(l), !a)
    return l;
  var f = t;
  if (e.length === 1) {
    var g = e[0];
    g.type === "sizing" ? f = t.havingSize(g.size) : g.type === "styling" && (f = t.havingStyle(E1[g.style]));
  }
  var b = D0([n[0] || "leftmost"], [], t), y = D0([n[1] || "rightmost"], [], t), w = a === "root";
  return Kt(l, (M, k) => {
    var C = k.classes[0], B = M.classes[0];
    C === "mbin" && L.contains(q1, B) ? k.classes[0] = "mord" : B === "mbin" && L.contains(N1, C) && (M.classes[0] = "mord");
  }, {
    node: b
  }, y, w), Kt(l, (M, k) => {
    var C = ht(k), B = ht(M), q = C && B ? M.hasClass("mtight") ? D1[C][B] : C1[C][B] : null;
    if (q)
      return x.makeGlue(q, f);
  }, {
    node: b
  }, y, w), l;
}, Kt = function r(e, t, a, n, l) {
  n && e.push(n);
  for (var o = 0; o < e.length; o++) {
    var h = e[o], m = Er(h);
    if (m) {
      r(m.children, t, a, null, l);
      continue;
    }
    var f = !h.hasClass("mspace");
    if (f) {
      var g = t(h, a.node);
      g && (a.insertAfter ? a.insertAfter(g) : (e.unshift(g), o++));
    }
    f ? a.node = h : l && h.hasClass("newline") && (a.node = D0(["leftmost"])), a.insertAfter = ((b) => (y) => {
      e.splice(b + 1, 0, y), o++;
    })(o);
  }
  n && e.pop();
}, Er = function(e) {
  return e instanceof se || e instanceof bt || e instanceof oe && e.hasClass("enclosing") ? e : null;
}, I1 = function r(e, t) {
  var a = Er(e);
  if (a) {
    var n = a.children;
    if (n.length) {
      if (t === "right")
        return r(n[n.length - 1], "right");
      if (t === "left")
        return r(n[0], "left");
    }
  }
  return e;
}, ht = function(e, t) {
  return e ? (t && (e = I1(e, t)), R1[e.classes[0]] || null) : null;
}, ie = function(e, t) {
  var a = ["nulldelimiter"].concat(e.baseSizingClasses());
  return D0(t.concat(a));
}, U = function(e, t, a) {
  if (!e)
    return D0();
  if (Ce[e.type]) {
    var n = Ce[e.type](e, t);
    if (a && t.size !== a.size) {
      n = D0(t.sizingClasses(a), [n], t);
      var l = t.sizeMultiplier / a.sizeMultiplier;
      n.height *= l, n.depth *= l;
    }
    return n;
  } else
    throw new T("Got group of unknown type: '" + e.type + "'");
};
function xe(r, e) {
  var t = D0(["base"], r, e), a = D0(["strut"]);
  return a.style.height = A(t.height + t.depth), t.depth && (a.style.verticalAlign = A(-t.depth)), t.children.unshift(a), t;
}
function mt(r, e) {
  var t = null;
  r.length === 1 && r[0].type === "tag" && (t = r[0].tag, r = r[0].body);
  var a = r0(r, e, "root"), n;
  a.length === 2 && a[1].hasClass("tag") && (n = a.pop());
  for (var l = [], o = [], h = 0; h < a.length; h++)
    if (o.push(a[h]), a[h].hasClass("mbin") || a[h].hasClass("mrel") || a[h].hasClass("allowbreak")) {
      for (var m = !1; h < a.length - 1 && a[h + 1].hasClass("mspace") && !a[h + 1].hasClass("newline"); )
        h++, o.push(a[h]), a[h].hasClass("nobreak") && (m = !0);
      m || (l.push(xe(o, e)), o = []);
    } else
      a[h].hasClass("newline") && (o.pop(), o.length > 0 && (l.push(xe(o, e)), o = []), l.push(a[h]));
  o.length > 0 && l.push(xe(o, e));
  var f;
  t ? (f = xe(r0(t, e, !0)), f.classes = ["tag"], l.push(f)) : n && l.push(n);
  var g = D0(["katex-html"], l);
  if (g.setAttribute("aria-hidden", "true"), f) {
    var b = f.children[0];
    b.style.height = A(g.height + g.depth), g.depth && (b.style.verticalAlign = A(-g.depth));
  }
  return g;
}
function Rr(r) {
  return new se(r);
}
class c0 {
  constructor(e, t, a) {
    this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = e, this.attributes = {}, this.children = t || [], this.classes = a || [];
  }
  /**
   * Sets an attribute on a MathML node. MathML depends on attributes to convey a
   * semantic content, so this is used heavily.
   */
  setAttribute(e, t) {
    this.attributes[e] = t;
  }
  /**
   * Gets an attribute on a MathML node.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
    for (var t in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
    this.classes.length > 0 && (e.className = H0(this.classes));
    for (var a = 0; a < this.children.length; a++)
      e.appendChild(this.children[a].toNode());
    return e;
  }
  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    var e = "<" + this.type;
    for (var t in this.attributes)
      Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + '="', e += L.escape(this.attributes[t]), e += '"');
    this.classes.length > 0 && (e += ' class ="' + L.escape(H0(this.classes)) + '"'), e += ">";
    for (var a = 0; a < this.children.length; a++)
      e += this.children[a].toMarkup();
    return e += "</" + this.type + ">", e;
  }
  /**
   * Converts the math node into a string, similar to innerText, but escaped.
   */
  toText() {
    return this.children.map((e) => e.toText()).join("");
  }
}
class re {
  constructor(e) {
    this.text = void 0, this.text = e;
  }
  /**
   * Converts the text node into a DOM text node.
   */
  toNode() {
    return document.createTextNode(this.text);
  }
  /**
   * Converts the text node into escaped HTML markup
   * (representing the text itself).
   */
  toMarkup() {
    return L.escape(this.toText());
  }
  /**
   * Converts the text node into a string
   * (representing the text iteself).
   */
  toText() {
    return this.text;
  }
}
class L1 {
  /**
   * Create a Space node with width given in CSS ems.
   */
  constructor(e) {
    this.width = void 0, this.character = void 0, this.width = e, e >= 0.05555 && e <= 0.05556 ? this.character = " " : e >= 0.1666 && e <= 0.1667 ? this.character = " " : e >= 0.2222 && e <= 0.2223 ? this.character = " " : e >= 0.2777 && e <= 0.2778 ? this.character = "  " : e >= -0.05556 && e <= -0.05555 ? this.character = " ⁣" : e >= -0.1667 && e <= -0.1666 ? this.character = " ⁣" : e >= -0.2223 && e <= -0.2222 ? this.character = " ⁣" : e >= -0.2778 && e <= -0.2777 ? this.character = " ⁣" : this.character = null;
  }
  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    if (this.character)
      return document.createTextNode(this.character);
    var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
    return e.setAttribute("width", A(this.width)), e;
  }
  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    return this.character ? "<mtext>" + this.character + "</mtext>" : '<mspace width="' + A(this.width) + '"/>';
  }
  /**
   * Converts the math node into a string, similar to innerText.
   */
  toText() {
    return this.character ? this.character : " ";
  }
}
var z = {
  MathNode: c0,
  TextNode: re,
  SpaceNode: L1,
  newDocumentFragment: Rr
}, v0 = function(e, t, a) {
  return W[t][e] && W[t][e].replace && e.charCodeAt(0) !== 55349 && !(Ar.hasOwnProperty(e) && a && (a.fontFamily && a.fontFamily.substr(4, 2) === "tt" || a.font && a.font.substr(4, 2) === "tt")) && (e = W[t][e].replace), new z.TextNode(e);
}, xt = function(e) {
  return e.length === 1 ? e[0] : new z.MathNode("mrow", e);
}, wt = function(e, t) {
  if (t.fontFamily === "texttt")
    return "monospace";
  if (t.fontFamily === "textsf")
    return t.fontShape === "textit" && t.fontWeight === "textbf" ? "sans-serif-bold-italic" : t.fontShape === "textit" ? "sans-serif-italic" : t.fontWeight === "textbf" ? "bold-sans-serif" : "sans-serif";
  if (t.fontShape === "textit" && t.fontWeight === "textbf")
    return "bold-italic";
  if (t.fontShape === "textit")
    return "italic";
  if (t.fontWeight === "textbf")
    return "bold";
  var a = t.font;
  if (!a || a === "mathnormal")
    return null;
  var n = e.mode;
  if (a === "mathit")
    return "italic";
  if (a === "boldsymbol")
    return e.type === "textord" ? "bold" : "bold-italic";
  if (a === "mathbf")
    return "bold";
  if (a === "mathbb")
    return "double-struck";
  if (a === "mathfrak")
    return "fraktur";
  if (a === "mathscr" || a === "mathcal")
    return "script";
  if (a === "mathsf")
    return "sans-serif";
  if (a === "mathtt")
    return "monospace";
  var l = e.text;
  if (L.contains(["\\imath", "\\jmath"], l))
    return null;
  W[n][l] && W[n][l].replace && (l = W[n][l].replace);
  var o = x.fontMap[a].fontName;
  return gt(l, o, n) ? x.fontMap[a].variant : null;
}, h0 = function(e, t, a) {
  if (e.length === 1) {
    var n = Y(e[0], t);
    return a && n instanceof c0 && n.type === "mo" && (n.setAttribute("lspace", "0em"), n.setAttribute("rspace", "0em")), [n];
  }
  for (var l = [], o, h = 0; h < e.length; h++) {
    var m = Y(e[h], t);
    if (m instanceof c0 && o instanceof c0) {
      if (m.type === "mtext" && o.type === "mtext" && m.getAttribute("mathvariant") === o.getAttribute("mathvariant")) {
        o.children.push(...m.children);
        continue;
      } else if (m.type === "mn" && o.type === "mn") {
        o.children.push(...m.children);
        continue;
      } else if (m.type === "mi" && m.children.length === 1 && o.type === "mn") {
        var f = m.children[0];
        if (f instanceof re && f.text === ".") {
          o.children.push(...m.children);
          continue;
        }
      } else if (o.type === "mi" && o.children.length === 1) {
        var g = o.children[0];
        if (g instanceof re && g.text === "̸" && (m.type === "mo" || m.type === "mi" || m.type === "mn")) {
          var b = m.children[0];
          b instanceof re && b.text.length > 0 && (b.text = b.text.slice(0, 1) + "̸" + b.text.slice(1), l.pop());
        }
      }
    }
    l.push(m), o = m;
  }
  return l;
}, F0 = function(e, t, a) {
  return xt(h0(e, t, a));
}, Y = function(e, t) {
  if (!e)
    return new z.MathNode("mrow");
  if (De[e.type]) {
    var a = De[e.type](e, t);
    return a;
  } else
    throw new T("Got group of unknown type: '" + e.type + "'");
};
function Jt(r, e, t, a, n) {
  var l = h0(r, t), o;
  l.length === 1 && l[0] instanceof c0 && L.contains(["mrow", "mtable"], l[0].type) ? o = l[0] : o = new z.MathNode("mrow", l);
  var h = new z.MathNode("annotation", [new z.TextNode(e)]);
  h.setAttribute("encoding", "application/x-tex");
  var m = new z.MathNode("semantics", [o, h]), f = new z.MathNode("math", [m]);
  f.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), a && f.setAttribute("display", "block");
  var g = n ? "katex" : "katex-mathml";
  return x.makeSpan([g], [f]);
}
var Ir = function(e) {
  return new A0({
    style: e.displayMode ? E.DISPLAY : E.TEXT,
    maxSize: e.maxSize,
    minRuleThickness: e.minRuleThickness
  });
}, Lr = function(e, t) {
  if (t.displayMode) {
    var a = ["katex-display"];
    t.leqno && a.push("leqno"), t.fleqn && a.push("fleqn"), e = x.makeSpan(a, [e]);
  }
  return e;
}, H1 = function(e, t, a) {
  var n = Ir(a), l;
  if (a.output === "mathml")
    return Jt(e, t, n, a.displayMode, !0);
  if (a.output === "html") {
    var o = mt(e, n);
    l = x.makeSpan(["katex"], [o]);
  } else {
    var h = Jt(e, t, n, a.displayMode, !1), m = mt(e, n);
    l = x.makeSpan(["katex"], [h, m]);
  }
  return Lr(l, a);
}, O1 = function(e, t, a) {
  var n = Ir(a), l = mt(e, n), o = x.makeSpan(["katex"], [l]);
  return Lr(o, a);
}, F1 = {
  widehat: "^",
  widecheck: "ˇ",
  widetilde: "~",
  utilde: "~",
  overleftarrow: "←",
  underleftarrow: "←",
  xleftarrow: "←",
  overrightarrow: "→",
  underrightarrow: "→",
  xrightarrow: "→",
  underbrace: "⏟",
  overbrace: "⏞",
  overgroup: "⏠",
  undergroup: "⏡",
  overleftrightarrow: "↔",
  underleftrightarrow: "↔",
  xleftrightarrow: "↔",
  Overrightarrow: "⇒",
  xRightarrow: "⇒",
  overleftharpoon: "↼",
  xleftharpoonup: "↼",
  overrightharpoon: "⇀",
  xrightharpoonup: "⇀",
  xLeftarrow: "⇐",
  xLeftrightarrow: "⇔",
  xhookleftarrow: "↩",
  xhookrightarrow: "↪",
  xmapsto: "↦",
  xrightharpoondown: "⇁",
  xleftharpoondown: "↽",
  xrightleftharpoons: "⇌",
  xleftrightharpoons: "⇋",
  xtwoheadleftarrow: "↞",
  xtwoheadrightarrow: "↠",
  xlongequal: "=",
  xtofrom: "⇄",
  xrightleftarrows: "⇄",
  xrightequilibrium: "⇌",
  // Not a perfect match.
  xleftequilibrium: "⇋",
  // None better available.
  "\\cdrightarrow": "→",
  "\\cdleftarrow": "←",
  "\\cdlongequal": "="
}, P1 = function(e) {
  var t = new z.MathNode("mo", [new z.TextNode(F1[e.replace(/^\\/, "")])]);
  return t.setAttribute("stretchy", "true"), t;
}, G1 = {
  //   path(s), minWidth, height, align
  overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
  overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
  underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
  underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
  xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
  "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
  // CD minwwidth2.5pc
  xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
  "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
  Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
  xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
  xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
  overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
  xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
  xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
  overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
  xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
  xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
  xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
  "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
  xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
  xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
  overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
  overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
  underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
  underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
  xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
  xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
  xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
  xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
  xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
  xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
  overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
  underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
  overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
  undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
  xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
  xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
  // The next three arrows are from the mhchem package.
  // In mhchem.sty, min-length is 2.0em. But these arrows might appear in the
  // document as \xrightarrow or \xrightleftharpoons. Those have
  // min-length = 1.75em, so we set min-length on these next three to match.
  xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
  xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
  xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
}, $1 = function(e) {
  return e.type === "ordgroup" ? e.body.length : 1;
}, V1 = function(e, t) {
  function a() {
    var h = 4e5, m = e.label.substr(1);
    if (L.contains(["widehat", "widecheck", "widetilde", "utilde"], m)) {
      var f = e, g = $1(f.base), b, y, w;
      if (g > 5)
        m === "widehat" || m === "widecheck" ? (b = 420, h = 2364, w = 0.42, y = m + "4") : (b = 312, h = 2340, w = 0.34, y = "tilde4");
      else {
        var M = [1, 1, 2, 2, 3, 3][g];
        m === "widehat" || m === "widecheck" ? (h = [0, 1062, 2364, 2364, 2364][M], b = [0, 239, 300, 360, 420][M], w = [0, 0.24, 0.3, 0.3, 0.36, 0.42][M], y = m + M) : (h = [0, 600, 1033, 2339, 2340][M], b = [0, 260, 286, 306, 312][M], w = [0, 0.26, 0.286, 0.3, 0.306, 0.34][M], y = "tilde" + M);
      }
      var k = new V0(y), C = new O0([k], {
        width: "100%",
        height: A(w),
        viewBox: "0 0 " + h + " " + b,
        preserveAspectRatio: "none"
      });
      return {
        span: x.makeSvgSpan([], [C], t),
        minWidth: 0,
        height: w
      };
    } else {
      var B = [], q = G1[m], [H, $, I] = q, G = I / 1e3, F = H.length, V, X;
      if (F === 1) {
        var J = q[3];
        V = ["hide-tail"], X = [J];
      } else if (F === 2)
        V = ["halfarrow-left", "halfarrow-right"], X = ["xMinYMin", "xMaxYMin"];
      else if (F === 3)
        V = ["brace-left", "brace-center", "brace-right"], X = ["xMinYMin", "xMidYMin", "xMaxYMin"];
      else
        throw new Error(`Correct katexImagesData or update code here to support
                    ` + F + " children.");
      for (var t0 = 0; t0 < F; t0++) {
        var S0 = new V0(H[t0]), E0 = new O0([S0], {
          width: "400em",
          height: A(G),
          viewBox: "0 0 " + h + " " + I,
          preserveAspectRatio: X[t0] + " slice"
        }), m0 = x.makeSvgSpan([V[t0]], [E0], t);
        if (F === 1)
          return {
            span: m0,
            minWidth: $,
            height: G
          };
        m0.style.height = A(G), B.push(m0);
      }
      return {
        span: x.makeSpan(["stretchy"], B, t),
        minWidth: $,
        height: G
      };
    }
  }
  var {
    span: n,
    minWidth: l,
    height: o
  } = a();
  return n.height = o, n.style.height = A(o), l > 0 && (n.style.minWidth = A(l)), n;
}, U1 = function(e, t, a, n, l) {
  var o, h = e.height + e.depth + a + n;
  if (/fbox|color|angl/.test(t)) {
    if (o = x.makeSpan(["stretchy", t], [], l), t === "fbox") {
      var m = l.color && l.getColor();
      m && (o.style.borderColor = m);
    }
  } else {
    var f = [];
    /^[bx]cancel$/.test(t) && f.push(new ot({
      x1: "0",
      y1: "0",
      x2: "100%",
      y2: "100%",
      "stroke-width": "0.046em"
    })), /^x?cancel$/.test(t) && f.push(new ot({
      x1: "0",
      y1: "100%",
      x2: "100%",
      y2: "0",
      "stroke-width": "0.046em"
    }));
    var g = new O0(f, {
      width: "100%",
      height: A(h)
    });
    o = x.makeSvgSpan([], [g], l);
  }
  return o.height = h, o.style.height = A(h), o;
}, N0 = {
  encloseSpan: U1,
  mathMLnode: P1,
  svgSpan: V1
};
function P(r, e) {
  if (!r || r.type !== e)
    throw new Error("Expected node of type " + e + ", but got " + (r ? "node of type " + r.type : String(r)));
  return r;
}
function kt(r) {
  var e = Re(r);
  if (!e)
    throw new Error("Expected node of symbol group type, but got " + (r ? "node of type " + r.type : String(r)));
  return e;
}
function Re(r) {
  return r && (r.type === "atom" || p1.hasOwnProperty(r.type)) ? r : null;
}
var St = (r, e) => {
  var t, a, n;
  r && r.type === "supsub" ? (a = P(r.base, "accent"), t = a.base, r.base = t, n = d1(U(r, e)), r.base = a) : (a = P(r, "accent"), t = a.base);
  var l = U(t, e.havingCrampedStyle()), o = a.isShifty && L.isCharacterBox(t), h = 0;
  if (o) {
    var m = L.getBaseElem(t), f = U(m, e.havingCrampedStyle());
    h = Ut(f).skew;
  }
  var g = a.label === "\\c", b = g ? l.height + l.depth : Math.min(l.height, e.fontMetrics().xHeight), y;
  if (a.isStretchy)
    y = N0.svgSpan(a, e), y = x.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: l
      }, {
        type: "elem",
        elem: y,
        wrapperClasses: ["svg-align"],
        wrapperStyle: h > 0 ? {
          width: "calc(100% - " + A(2 * h) + ")",
          marginLeft: A(2 * h)
        } : void 0
      }]
    }, e);
  else {
    var w, M;
    a.label === "\\vec" ? (w = x.staticSvg("vec", e), M = x.svgData.vec[1]) : (w = x.makeOrd({
      mode: a.mode,
      text: a.label
    }, e, "textord"), w = Ut(w), w.italic = 0, M = w.width, g && (b += w.depth)), y = x.makeSpan(["accent-body"], [w]);
    var k = a.label === "\\textcircled";
    k && (y.classes.push("accent-full"), b = l.height);
    var C = h;
    k || (C -= M / 2), y.style.left = A(C), a.label === "\\textcircled" && (y.style.top = ".2em"), y = x.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: l
      }, {
        type: "kern",
        size: -b
      }, {
        type: "elem",
        elem: y
      }]
    }, e);
  }
  var B = x.makeSpan(["mord", "accent"], [y], e);
  return n ? (n.children[0] = B, n.height = Math.max(B.height, n.height), n.classes[0] = "mord", n) : B;
}, Hr = (r, e) => {
  var t = r.isStretchy ? N0.mathMLnode(r.label) : new z.MathNode("mo", [v0(r.label, r.mode)]), a = new z.MathNode("mover", [Y(r.base, e), t]);
  return a.setAttribute("accent", "true"), a;
}, X1 = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((r) => "\\" + r).join("|"));
D({
  type: "accent",
  names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
  props: {
    numArgs: 1
  },
  handler: (r, e) => {
    var t = Ne(e[0]), a = !X1.test(r.funcName), n = !a || r.funcName === "\\widehat" || r.funcName === "\\widetilde" || r.funcName === "\\widecheck";
    return {
      type: "accent",
      mode: r.parser.mode,
      label: r.funcName,
      isStretchy: a,
      isShifty: n,
      base: t
    };
  },
  htmlBuilder: St,
  mathmlBuilder: Hr
});
D({
  type: "accent",
  names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
  props: {
    numArgs: 1,
    allowedInText: !0,
    allowedInMath: !0,
    // unless in strict mode
    argTypes: ["primitive"]
  },
  handler: (r, e) => {
    var t = e[0], a = r.parser.mode;
    return a === "math" && (r.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + r.funcName + " works only in text mode"), a = "text"), {
      type: "accent",
      mode: a,
      label: r.funcName,
      isStretchy: !1,
      isShifty: !0,
      base: t
    };
  },
  htmlBuilder: St,
  mathmlBuilder: Hr
});
D({
  type: "accentUnder",
  names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
  props: {
    numArgs: 1
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0];
    return {
      type: "accentUnder",
      mode: t.mode,
      label: a,
      base: n
    };
  },
  htmlBuilder: (r, e) => {
    var t = U(r.base, e), a = N0.svgSpan(r, e), n = r.label === "\\utilde" ? 0.12 : 0, l = x.makeVList({
      positionType: "top",
      positionData: t.height,
      children: [{
        type: "elem",
        elem: a,
        wrapperClasses: ["svg-align"]
      }, {
        type: "kern",
        size: n
      }, {
        type: "elem",
        elem: t
      }]
    }, e);
    return x.makeSpan(["mord", "accentunder"], [l], e);
  },
  mathmlBuilder: (r, e) => {
    var t = N0.mathMLnode(r.label), a = new z.MathNode("munder", [Y(r.base, e), t]);
    return a.setAttribute("accentunder", "true"), a;
  }
});
var we = (r) => {
  var e = new z.MathNode("mpadded", r ? [r] : []);
  return e.setAttribute("width", "+0.6em"), e.setAttribute("lspace", "0.3em"), e;
};
D({
  type: "xArrow",
  names: [
    "\\xleftarrow",
    "\\xrightarrow",
    "\\xLeftarrow",
    "\\xRightarrow",
    "\\xleftrightarrow",
    "\\xLeftrightarrow",
    "\\xhookleftarrow",
    "\\xhookrightarrow",
    "\\xmapsto",
    "\\xrightharpoondown",
    "\\xrightharpoonup",
    "\\xleftharpoondown",
    "\\xleftharpoonup",
    "\\xrightleftharpoons",
    "\\xleftrightharpoons",
    "\\xlongequal",
    "\\xtwoheadrightarrow",
    "\\xtwoheadleftarrow",
    "\\xtofrom",
    // The next 3 functions are here to support the mhchem extension.
    // Direct use of these functions is discouraged and may break someday.
    "\\xrightleftarrows",
    "\\xrightequilibrium",
    "\\xleftequilibrium",
    // The next 3 functions are here only to support the {CD} environment.
    "\\\\cdrightarrow",
    "\\\\cdleftarrow",
    "\\\\cdlongequal"
  ],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler(r, e, t) {
    var {
      parser: a,
      funcName: n
    } = r;
    return {
      type: "xArrow",
      mode: a.mode,
      label: n,
      body: e[0],
      below: t[0]
    };
  },
  // Flow is unable to correctly infer the type of `group`, even though it's
  // unamibiguously determined from the passed-in `type` above.
  htmlBuilder(r, e) {
    var t = e.style, a = e.havingStyle(t.sup()), n = x.wrapFragment(U(r.body, a, e), e), l = r.label.slice(0, 2) === "\\x" ? "x" : "cd";
    n.classes.push(l + "-arrow-pad");
    var o;
    r.below && (a = e.havingStyle(t.sub()), o = x.wrapFragment(U(r.below, a, e), e), o.classes.push(l + "-arrow-pad"));
    var h = N0.svgSpan(r, e), m = -e.fontMetrics().axisHeight + 0.5 * h.height, f = -e.fontMetrics().axisHeight - 0.5 * h.height - 0.111;
    (n.depth > 0.25 || r.label === "\\xleftequilibrium") && (f -= n.depth);
    var g;
    if (o) {
      var b = -e.fontMetrics().axisHeight + o.height + 0.5 * h.height + 0.111;
      g = x.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: n,
          shift: f
        }, {
          type: "elem",
          elem: h,
          shift: m
        }, {
          type: "elem",
          elem: o,
          shift: b
        }]
      }, e);
    } else
      g = x.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: n,
          shift: f
        }, {
          type: "elem",
          elem: h,
          shift: m
        }]
      }, e);
    return g.children[0].children[0].children[1].classes.push("svg-align"), x.makeSpan(["mrel", "x-arrow"], [g], e);
  },
  mathmlBuilder(r, e) {
    var t = N0.mathMLnode(r.label);
    t.setAttribute("minsize", r.label.charAt(0) === "x" ? "1.75em" : "3.0em");
    var a;
    if (r.body) {
      var n = we(Y(r.body, e));
      if (r.below) {
        var l = we(Y(r.below, e));
        a = new z.MathNode("munderover", [t, l, n]);
      } else
        a = new z.MathNode("mover", [t, n]);
    } else if (r.below) {
      var o = we(Y(r.below, e));
      a = new z.MathNode("munder", [t, o]);
    } else
      a = we(), a = new z.MathNode("mover", [t, a]);
    return a;
  }
});
var Y1 = {
  ">": "\\\\cdrightarrow",
  "<": "\\\\cdleftarrow",
  "=": "\\\\cdlongequal",
  A: "\\uparrow",
  V: "\\downarrow",
  "|": "\\Vert",
  ".": "no arrow"
}, Qt = () => ({
  type: "styling",
  body: [],
  mode: "math",
  style: "display"
}), _t = (r) => r.type === "textord" && r.text === "@", W1 = (r, e) => (r.type === "mathord" || r.type === "atom") && r.text === e;
function j1(r, e, t) {
  var a = Y1[r];
  switch (a) {
    case "\\\\cdrightarrow":
    case "\\\\cdleftarrow":
      return t.callFunction(a, [e[0]], [e[1]]);
    case "\\uparrow":
    case "\\downarrow": {
      var n = t.callFunction("\\\\cdleft", [e[0]], []), l = {
        type: "atom",
        text: a,
        mode: "math",
        family: "rel"
      }, o = t.callFunction("\\Big", [l], []), h = t.callFunction("\\\\cdright", [e[1]], []), m = {
        type: "ordgroup",
        mode: "math",
        body: [n, o, h]
      };
      return t.callFunction("\\\\cdparent", [m], []);
    }
    case "\\\\cdlongequal":
      return t.callFunction("\\\\cdlongequal", [], []);
    case "\\Vert": {
      var f = {
        type: "textord",
        text: "\\Vert",
        mode: "math"
      };
      return t.callFunction("\\Big", [f], []);
    }
    default:
      return {
        type: "textord",
        text: " ",
        mode: "math"
      };
  }
}
function Z1(r) {
  var e = [];
  for (r.gullet.beginGroup(), r.gullet.macros.set("\\cr", "\\\\\\relax"), r.gullet.beginGroup(); ; ) {
    e.push(r.parseExpression(!1, "\\\\")), r.gullet.endGroup(), r.gullet.beginGroup();
    var t = r.fetch().text;
    if (t === "&" || t === "\\\\")
      r.consume();
    else if (t === "\\end") {
      e[e.length - 1].length === 0 && e.pop();
      break;
    } else
      throw new T("Expected \\\\ or \\cr or \\end", r.nextToken);
  }
  for (var a = [], n = [a], l = 0; l < e.length; l++) {
    for (var o = e[l], h = Qt(), m = 0; m < o.length; m++)
      if (!_t(o[m]))
        h.body.push(o[m]);
      else {
        a.push(h), m += 1;
        var f = kt(o[m]).text, g = new Array(2);
        if (g[0] = {
          type: "ordgroup",
          mode: "math",
          body: []
        }, g[1] = {
          type: "ordgroup",
          mode: "math",
          body: []
        }, !("=|.".indexOf(f) > -1))
          if ("<>AV".indexOf(f) > -1)
            for (var b = 0; b < 2; b++) {
              for (var y = !0, w = m + 1; w < o.length; w++) {
                if (W1(o[w], f)) {
                  y = !1, m = w;
                  break;
                }
                if (_t(o[w]))
                  throw new T("Missing a " + f + " character to complete a CD arrow.", o[w]);
                g[b].body.push(o[w]);
              }
              if (y)
                throw new T("Missing a " + f + " character to complete a CD arrow.", o[m]);
            }
          else
            throw new T('Expected one of "<>AV=|." after @', o[m]);
        var M = j1(f, g, r), k = {
          type: "styling",
          body: [M],
          mode: "math",
          style: "display"
          // CD is always displaystyle.
        };
        a.push(k), h = Qt();
      }
    l % 2 === 0 ? a.push(h) : a.shift(), a = [], n.push(a);
  }
  r.gullet.endGroup(), r.gullet.endGroup();
  var C = new Array(n[0].length).fill({
    type: "align",
    align: "c",
    pregap: 0.25,
    // CD package sets \enskip between columns.
    postgap: 0.25
    // So pre and post each get half an \enskip, i.e. 0.25em.
  });
  return {
    type: "array",
    mode: "math",
    body: n,
    arraystretch: 1,
    addJot: !0,
    rowGaps: [null],
    cols: C,
    colSeparationType: "CD",
    hLinesBeforeRow: new Array(n.length + 1).fill([])
  };
}
D({
  type: "cdlabel",
  names: ["\\\\cdleft", "\\\\cdright"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a
    } = r;
    return {
      type: "cdlabel",
      mode: t.mode,
      side: a.slice(4),
      label: e[0]
    };
  },
  htmlBuilder(r, e) {
    var t = e.havingStyle(e.style.sup()), a = x.wrapFragment(U(r.label, t, e), e);
    return a.classes.push("cd-label-" + r.side), a.style.bottom = A(0.8 - a.depth), a.height = 0, a.depth = 0, a;
  },
  mathmlBuilder(r, e) {
    var t = new z.MathNode("mrow", [Y(r.label, e)]);
    return t = new z.MathNode("mpadded", [t]), t.setAttribute("width", "0"), r.side === "left" && t.setAttribute("lspace", "-1width"), t.setAttribute("voffset", "0.7em"), t = new z.MathNode("mstyle", [t]), t.setAttribute("displaystyle", "false"), t.setAttribute("scriptlevel", "1"), t;
  }
});
D({
  type: "cdlabelparent",
  names: ["\\\\cdparent"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var {
      parser: t
    } = r;
    return {
      type: "cdlabelparent",
      mode: t.mode,
      fragment: e[0]
    };
  },
  htmlBuilder(r, e) {
    var t = x.wrapFragment(U(r.fragment, e), e);
    return t.classes.push("cd-vert-arrow"), t;
  },
  mathmlBuilder(r, e) {
    return new z.MathNode("mrow", [Y(r.fragment, e)]);
  }
});
D({
  type: "textord",
  names: ["\\@char"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler(r, e) {
    for (var {
      parser: t
    } = r, a = P(e[0], "ordgroup"), n = a.body, l = "", o = 0; o < n.length; o++) {
      var h = P(n[o], "textord");
      l += h.text;
    }
    var m = parseInt(l), f;
    if (isNaN(m))
      throw new T("\\@char has non-numeric argument " + l);
    if (m < 0 || m >= 1114111)
      throw new T("\\@char with invalid code point " + l);
    return m <= 65535 ? f = String.fromCharCode(m) : (m -= 65536, f = String.fromCharCode((m >> 10) + 55296, (m & 1023) + 56320)), {
      type: "textord",
      mode: t.mode,
      text: f
    };
  }
});
var Or = (r, e) => {
  var t = r0(r.body, e.withColor(r.color), !1);
  return x.makeFragment(t);
}, Fr = (r, e) => {
  var t = h0(r.body, e.withColor(r.color)), a = new z.MathNode("mstyle", t);
  return a.setAttribute("mathcolor", r.color), a;
};
D({
  type: "color",
  names: ["\\textcolor"],
  props: {
    numArgs: 2,
    allowedInText: !0,
    argTypes: ["color", "original"]
  },
  handler(r, e) {
    var {
      parser: t
    } = r, a = P(e[0], "color-token").color, n = e[1];
    return {
      type: "color",
      mode: t.mode,
      color: a,
      body: _(n)
    };
  },
  htmlBuilder: Or,
  mathmlBuilder: Fr
});
D({
  type: "color",
  names: ["\\color"],
  props: {
    numArgs: 1,
    allowedInText: !0,
    argTypes: ["color"]
  },
  handler(r, e) {
    var {
      parser: t,
      breakOnTokenText: a
    } = r, n = P(e[0], "color-token").color;
    t.gullet.macros.set("\\current@color", n);
    var l = t.parseExpression(!0, a);
    return {
      type: "color",
      mode: t.mode,
      color: n,
      body: l
    };
  },
  htmlBuilder: Or,
  mathmlBuilder: Fr
});
D({
  type: "cr",
  names: ["\\\\"],
  props: {
    numArgs: 0,
    numOptionalArgs: 1,
    argTypes: ["size"],
    allowedInText: !0
  },
  handler(r, e, t) {
    var {
      parser: a
    } = r, n = t[0], l = !a.settings.displayMode || !a.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
    return {
      type: "cr",
      mode: a.mode,
      newLine: l,
      size: n && P(n, "size").value
    };
  },
  // The following builders are called only at the top level,
  // not within tabular/array environments.
  htmlBuilder(r, e) {
    var t = x.makeSpan(["mspace"], [], e);
    return r.newLine && (t.classes.push("newline"), r.size && (t.style.marginTop = A(K(r.size, e)))), t;
  },
  mathmlBuilder(r, e) {
    var t = new z.MathNode("mspace");
    return r.newLine && (t.setAttribute("linebreak", "newline"), r.size && t.setAttribute("height", A(K(r.size, e)))), t;
  }
});
var ct = {
  "\\global": "\\global",
  "\\long": "\\\\globallong",
  "\\\\globallong": "\\\\globallong",
  "\\def": "\\gdef",
  "\\gdef": "\\gdef",
  "\\edef": "\\xdef",
  "\\xdef": "\\xdef",
  "\\let": "\\\\globallet",
  "\\futurelet": "\\\\globalfuture"
}, Pr = (r) => {
  var e = r.text;
  if (/^(?:[\\{}$&#^_]|EOF)$/.test(e))
    throw new T("Expected a control sequence", r);
  return e;
}, K1 = (r) => {
  var e = r.gullet.popToken();
  return e.text === "=" && (e = r.gullet.popToken(), e.text === " " && (e = r.gullet.popToken())), e;
}, Gr = (r, e, t, a) => {
  var n = r.gullet.macros.get(t.text);
  n == null && (t.noexpand = !0, n = {
    tokens: [t],
    numArgs: 0,
    // reproduce the same behavior in expansion
    unexpandable: !r.gullet.isExpandable(t.text)
  }), r.gullet.macros.set(e, n, a);
};
D({
  type: "internal",
  names: [
    "\\global",
    "\\long",
    "\\\\globallong"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler(r) {
    var {
      parser: e,
      funcName: t
    } = r;
    e.consumeSpaces();
    var a = e.fetch();
    if (ct[a.text])
      return (t === "\\global" || t === "\\\\globallong") && (a.text = ct[a.text]), P(e.parseFunction(), "internal");
    throw new T("Invalid token after macro prefix", a);
  }
});
D({
  type: "internal",
  names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(r) {
    var {
      parser: e,
      funcName: t
    } = r, a = e.gullet.popToken(), n = a.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(n))
      throw new T("Expected a control sequence", a);
    for (var l = 0, o, h = [[]]; e.gullet.future().text !== "{"; )
      if (a = e.gullet.popToken(), a.text === "#") {
        if (e.gullet.future().text === "{") {
          o = e.gullet.future(), h[l].push("{");
          break;
        }
        if (a = e.gullet.popToken(), !/^[1-9]$/.test(a.text))
          throw new T('Invalid argument number "' + a.text + '"');
        if (parseInt(a.text) !== l + 1)
          throw new T('Argument number "' + a.text + '" out of order');
        l++, h.push([]);
      } else {
        if (a.text === "EOF")
          throw new T("Expected a macro definition");
        h[l].push(a.text);
      }
    var {
      tokens: m
    } = e.gullet.consumeArg();
    return o && m.unshift(o), (t === "\\edef" || t === "\\xdef") && (m = e.gullet.expandTokens(m), m.reverse()), e.gullet.macros.set(n, {
      tokens: m,
      numArgs: l,
      delimiters: h
    }, t === ct[t]), {
      type: "internal",
      mode: e.mode
    };
  }
});
D({
  type: "internal",
  names: [
    "\\let",
    "\\\\globallet"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(r) {
    var {
      parser: e,
      funcName: t
    } = r, a = Pr(e.gullet.popToken());
    e.gullet.consumeSpaces();
    var n = K1(e);
    return Gr(e, a, n, t === "\\\\globallet"), {
      type: "internal",
      mode: e.mode
    };
  }
});
D({
  type: "internal",
  names: [
    "\\futurelet",
    "\\\\globalfuture"
    // can’t be entered directly
  ],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(r) {
    var {
      parser: e,
      funcName: t
    } = r, a = Pr(e.gullet.popToken()), n = e.gullet.popToken(), l = e.gullet.popToken();
    return Gr(e, a, l, t === "\\\\globalfuture"), e.gullet.pushToken(l), e.gullet.pushToken(n), {
      type: "internal",
      mode: e.mode
    };
  }
});
var te = function(e, t, a) {
  var n = W.math[e] && W.math[e].replace, l = gt(n || e, t, a);
  if (!l)
    throw new Error("Unsupported symbol " + e + " and font size " + t + ".");
  return l;
}, Mt = function(e, t, a, n) {
  var l = a.havingBaseStyle(t), o = x.makeSpan(n.concat(l.sizingClasses(a)), [e], a), h = l.sizeMultiplier / a.sizeMultiplier;
  return o.height *= h, o.depth *= h, o.maxFontSize = l.sizeMultiplier, o;
}, $r = function(e, t, a) {
  var n = t.havingBaseStyle(a), l = (1 - t.sizeMultiplier / n.sizeMultiplier) * t.fontMetrics().axisHeight;
  e.classes.push("delimcenter"), e.style.top = A(l), e.height -= l, e.depth += l;
}, J1 = function(e, t, a, n, l, o) {
  var h = x.makeSymbol(e, "Main-Regular", l, n), m = Mt(h, t, n, o);
  return a && $r(m, n, t), m;
}, Q1 = function(e, t, a, n) {
  return x.makeSymbol(e, "Size" + t + "-Regular", a, n);
}, Vr = function(e, t, a, n, l, o) {
  var h = Q1(e, t, l, n), m = Mt(x.makeSpan(["delimsizing", "size" + t], [h], n), E.TEXT, n, o);
  return a && $r(m, n, E.TEXT), m;
}, Ze = function(e, t, a) {
  var n;
  t === "Size1-Regular" ? n = "delim-size1" : n = "delim-size4";
  var l = x.makeSpan(["delimsizinginner", n], [x.makeSpan([], [x.makeSymbol(e, t, a)])]);
  return {
    type: "elem",
    elem: l
  };
}, Ke = function(e, t, a) {
  var n = y0["Size4-Regular"][e.charCodeAt(0)] ? y0["Size4-Regular"][e.charCodeAt(0)][4] : y0["Size1-Regular"][e.charCodeAt(0)][4], l = new V0("inner", l1(e, Math.round(1e3 * t))), o = new O0([l], {
    width: A(n),
    height: A(t),
    // Override CSS rule `.katex svg { width: 100% }`
    style: "width:" + A(n),
    viewBox: "0 0 " + 1e3 * n + " " + Math.round(1e3 * t),
    preserveAspectRatio: "xMinYMin"
  }), h = x.makeSvgSpan([], [o], a);
  return h.height = t, h.style.height = A(t), h.style.width = A(n), {
    type: "elem",
    elem: h
  };
}, dt = 8e-3, ke = {
  type: "kern",
  size: -1 * dt
}, _1 = ["|", "\\lvert", "\\rvert", "\\vert"], en = ["\\|", "\\lVert", "\\rVert", "\\Vert"], Ur = function(e, t, a, n, l, o) {
  var h, m, f, g;
  h = f = g = e, m = null;
  var b = "Size1-Regular";
  e === "\\uparrow" ? f = g = "⏐" : e === "\\Uparrow" ? f = g = "‖" : e === "\\downarrow" ? h = f = "⏐" : e === "\\Downarrow" ? h = f = "‖" : e === "\\updownarrow" ? (h = "\\uparrow", f = "⏐", g = "\\downarrow") : e === "\\Updownarrow" ? (h = "\\Uparrow", f = "‖", g = "\\Downarrow") : L.contains(_1, e) ? f = "∣" : L.contains(en, e) ? f = "∥" : e === "[" || e === "\\lbrack" ? (h = "⎡", f = "⎢", g = "⎣", b = "Size4-Regular") : e === "]" || e === "\\rbrack" ? (h = "⎤", f = "⎥", g = "⎦", b = "Size4-Regular") : e === "\\lfloor" || e === "⌊" ? (f = h = "⎢", g = "⎣", b = "Size4-Regular") : e === "\\lceil" || e === "⌈" ? (h = "⎡", f = g = "⎢", b = "Size4-Regular") : e === "\\rfloor" || e === "⌋" ? (f = h = "⎥", g = "⎦", b = "Size4-Regular") : e === "\\rceil" || e === "⌉" ? (h = "⎤", f = g = "⎥", b = "Size4-Regular") : e === "(" || e === "\\lparen" ? (h = "⎛", f = "⎜", g = "⎝", b = "Size4-Regular") : e === ")" || e === "\\rparen" ? (h = "⎞", f = "⎟", g = "⎠", b = "Size4-Regular") : e === "\\{" || e === "\\lbrace" ? (h = "⎧", m = "⎨", g = "⎩", f = "⎪", b = "Size4-Regular") : e === "\\}" || e === "\\rbrace" ? (h = "⎫", m = "⎬", g = "⎭", f = "⎪", b = "Size4-Regular") : e === "\\lgroup" || e === "⟮" ? (h = "⎧", g = "⎩", f = "⎪", b = "Size4-Regular") : e === "\\rgroup" || e === "⟯" ? (h = "⎫", g = "⎭", f = "⎪", b = "Size4-Regular") : e === "\\lmoustache" || e === "⎰" ? (h = "⎧", g = "⎭", f = "⎪", b = "Size4-Regular") : (e === "\\rmoustache" || e === "⎱") && (h = "⎫", g = "⎩", f = "⎪", b = "Size4-Regular");
  var y = te(h, b, l), w = y.height + y.depth, M = te(f, b, l), k = M.height + M.depth, C = te(g, b, l), B = C.height + C.depth, q = 0, H = 1;
  if (m !== null) {
    var $ = te(m, b, l);
    q = $.height + $.depth, H = 2;
  }
  var I = w + B + q, G = Math.max(0, Math.ceil((t - I) / (H * k))), F = I + G * H * k, V = n.fontMetrics().axisHeight;
  a && (V *= n.sizeMultiplier);
  var X = F / 2 - V, J = [];
  if (J.push(Ze(g, b, l)), J.push(ke), m === null) {
    var t0 = F - w - B + 2 * dt;
    J.push(Ke(f, t0, n));
  } else {
    var S0 = (F - w - B - q) / 2 + 2 * dt;
    J.push(Ke(f, S0, n)), J.push(ke), J.push(Ze(m, b, l)), J.push(ke), J.push(Ke(f, S0, n));
  }
  J.push(ke), J.push(Ze(h, b, l));
  var E0 = n.havingBaseStyle(E.TEXT), m0 = x.makeVList({
    positionType: "bottom",
    positionData: X,
    children: J
  }, E0);
  return Mt(x.makeSpan(["delimsizing", "mult"], [m0], E0), E.TEXT, n, o);
}, Je = 80, Qe = 0.08, _e = function(e, t, a, n, l) {
  var o = i1(e, n, a), h = new V0(e, o), m = new O0([h], {
    // Note: 1000:1 ratio of viewBox to document em width.
    width: "400em",
    height: A(t),
    viewBox: "0 0 400000 " + a,
    preserveAspectRatio: "xMinYMin slice"
  });
  return x.makeSvgSpan(["hide-tail"], [m], l);
}, tn = function(e, t) {
  var a = t.havingBaseSizing(), n = jr("\\surd", e * a.sizeMultiplier, Wr, a), l = a.sizeMultiplier, o = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness), h, m = 0, f = 0, g = 0, b;
  return n.type === "small" ? (g = 1e3 + 1e3 * o + Je, e < 1 ? l = 1 : e < 1.4 && (l = 0.7), m = (1 + o + Qe) / l, f = (1 + o) / l, h = _e("sqrtMain", m, g, o, t), h.style.minWidth = "0.853em", b = 0.833 / l) : n.type === "large" ? (g = (1e3 + Je) * ae[n.size], f = (ae[n.size] + o) / l, m = (ae[n.size] + o + Qe) / l, h = _e("sqrtSize" + n.size, m, g, o, t), h.style.minWidth = "1.02em", b = 1 / l) : (m = e + o + Qe, f = e + o, g = Math.floor(1e3 * e + o) + Je, h = _e("sqrtTall", m, g, o, t), h.style.minWidth = "0.742em", b = 1.056), h.height = f, h.style.height = A(m), {
    span: h,
    advanceWidth: b,
    // Calculate the actual line width.
    // This actually should depend on the chosen font -- e.g. \boldmath
    // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
    // have thicker rules.
    ruleWidth: (t.fontMetrics().sqrtRuleThickness + o) * l
  };
}, Xr = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "\\surd"], rn = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱"], Yr = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"], ae = [0, 1.2, 1.8, 2.4, 3], an = function(e, t, a, n, l) {
  if (e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle"), L.contains(Xr, e) || L.contains(Yr, e))
    return Vr(e, t, !1, a, n, l);
  if (L.contains(rn, e))
    return Ur(e, ae[t], !1, a, n, l);
  throw new T("Illegal delimiter: '" + e + "'");
}, nn = [{
  type: "small",
  style: E.SCRIPTSCRIPT
}, {
  type: "small",
  style: E.SCRIPT
}, {
  type: "small",
  style: E.TEXT
}, {
  type: "large",
  size: 1
}, {
  type: "large",
  size: 2
}, {
  type: "large",
  size: 3
}, {
  type: "large",
  size: 4
}], ln = [{
  type: "small",
  style: E.SCRIPTSCRIPT
}, {
  type: "small",
  style: E.SCRIPT
}, {
  type: "small",
  style: E.TEXT
}, {
  type: "stack"
}], Wr = [{
  type: "small",
  style: E.SCRIPTSCRIPT
}, {
  type: "small",
  style: E.SCRIPT
}, {
  type: "small",
  style: E.TEXT
}, {
  type: "large",
  size: 1
}, {
  type: "large",
  size: 2
}, {
  type: "large",
  size: 3
}, {
  type: "large",
  size: 4
}, {
  type: "stack"
}], sn = function(e) {
  if (e.type === "small")
    return "Main-Regular";
  if (e.type === "large")
    return "Size" + e.size + "-Regular";
  if (e.type === "stack")
    return "Size4-Regular";
  throw new Error("Add support for delim type '" + e.type + "' here.");
}, jr = function(e, t, a, n) {
  for (var l = Math.min(2, 3 - n.style.size), o = l; o < a.length && a[o].type !== "stack"; o++) {
    var h = te(e, sn(a[o]), "math"), m = h.height + h.depth;
    if (a[o].type === "small") {
      var f = n.havingBaseStyle(a[o].style);
      m *= f.sizeMultiplier;
    }
    if (m > t)
      return a[o];
  }
  return a[a.length - 1];
}, Zr = function(e, t, a, n, l, o) {
  e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle");
  var h;
  L.contains(Yr, e) ? h = nn : L.contains(Xr, e) ? h = Wr : h = ln;
  var m = jr(e, t, h, n);
  return m.type === "small" ? J1(e, m.style, a, n, l, o) : m.type === "large" ? Vr(e, m.size, a, n, l, o) : Ur(e, t, a, n, l, o);
}, on = function(e, t, a, n, l, o) {
  var h = n.fontMetrics().axisHeight * n.sizeMultiplier, m = 901, f = 5 / n.fontMetrics().ptPerEm, g = Math.max(t - h, a + h), b = Math.max(
    // In real TeX, calculations are done using integral values which are
    // 65536 per pt, or 655360 per em. So, the division here truncates in
    // TeX but doesn't here, producing different results. If we wanted to
    // exactly match TeX's calculation, we could do
    //   Math.floor(655360 * maxDistFromAxis / 500) *
    //    delimiterFactor / 655360
    // (To see the difference, compare
    //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
    // in TeX and KaTeX)
    g / 500 * m,
    2 * g - f
  );
  return Zr(e, b, !0, n, l, o);
}, C0 = {
  sqrtImage: tn,
  sizedDelim: an,
  sizeToMaxHeight: ae,
  customSizedDelim: Zr,
  leftRightDelim: on
}, er = {
  "\\bigl": {
    mclass: "mopen",
    size: 1
  },
  "\\Bigl": {
    mclass: "mopen",
    size: 2
  },
  "\\biggl": {
    mclass: "mopen",
    size: 3
  },
  "\\Biggl": {
    mclass: "mopen",
    size: 4
  },
  "\\bigr": {
    mclass: "mclose",
    size: 1
  },
  "\\Bigr": {
    mclass: "mclose",
    size: 2
  },
  "\\biggr": {
    mclass: "mclose",
    size: 3
  },
  "\\Biggr": {
    mclass: "mclose",
    size: 4
  },
  "\\bigm": {
    mclass: "mrel",
    size: 1
  },
  "\\Bigm": {
    mclass: "mrel",
    size: 2
  },
  "\\biggm": {
    mclass: "mrel",
    size: 3
  },
  "\\Biggm": {
    mclass: "mrel",
    size: 4
  },
  "\\big": {
    mclass: "mord",
    size: 1
  },
  "\\Big": {
    mclass: "mord",
    size: 2
  },
  "\\bigg": {
    mclass: "mord",
    size: 3
  },
  "\\Bigg": {
    mclass: "mord",
    size: 4
  }
}, un = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "<", ">", "\\langle", "⟨", "\\rangle", "⟩", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
function Ie(r, e) {
  var t = Re(r);
  if (t && L.contains(un, t.text))
    return t;
  throw t ? new T("Invalid delimiter '" + t.text + "' after '" + e.funcName + "'", r) : new T("Invalid delimiter type '" + r.type + "'", r);
}
D({
  type: "delimsizing",
  names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
  props: {
    numArgs: 1,
    argTypes: ["primitive"]
  },
  handler: (r, e) => {
    var t = Ie(e[0], r);
    return {
      type: "delimsizing",
      mode: r.parser.mode,
      size: er[r.funcName].size,
      mclass: er[r.funcName].mclass,
      delim: t.text
    };
  },
  htmlBuilder: (r, e) => r.delim === "." ? x.makeSpan([r.mclass]) : C0.sizedDelim(r.delim, r.size, e, r.mode, [r.mclass]),
  mathmlBuilder: (r) => {
    var e = [];
    r.delim !== "." && e.push(v0(r.delim, r.mode));
    var t = new z.MathNode("mo", e);
    r.mclass === "mopen" || r.mclass === "mclose" ? t.setAttribute("fence", "true") : t.setAttribute("fence", "false"), t.setAttribute("stretchy", "true");
    var a = A(C0.sizeToMaxHeight[r.size]);
    return t.setAttribute("minsize", a), t.setAttribute("maxsize", a), t;
  }
});
function tr(r) {
  if (!r.body)
    throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
D({
  type: "leftright-right",
  names: ["\\right"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (r, e) => {
    var t = r.parser.gullet.macros.get("\\current@color");
    if (t && typeof t != "string")
      throw new T("\\current@color set to non-string in \\right");
    return {
      type: "leftright-right",
      mode: r.parser.mode,
      delim: Ie(e[0], r).text,
      color: t
      // undefined if not set via \color
    };
  }
});
D({
  type: "leftright",
  names: ["\\left"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (r, e) => {
    var t = Ie(e[0], r), a = r.parser;
    ++a.leftrightDepth;
    var n = a.parseExpression(!1);
    --a.leftrightDepth, a.expect("\\right", !1);
    var l = P(a.parseFunction(), "leftright-right");
    return {
      type: "leftright",
      mode: a.mode,
      body: n,
      left: t.text,
      right: l.delim,
      rightColor: l.color
    };
  },
  htmlBuilder: (r, e) => {
    tr(r);
    for (var t = r0(r.body, e, !0, ["mopen", "mclose"]), a = 0, n = 0, l = !1, o = 0; o < t.length; o++)
      t[o].isMiddle ? l = !0 : (a = Math.max(t[o].height, a), n = Math.max(t[o].depth, n));
    a *= e.sizeMultiplier, n *= e.sizeMultiplier;
    var h;
    if (r.left === "." ? h = ie(e, ["mopen"]) : h = C0.leftRightDelim(r.left, a, n, e, r.mode, ["mopen"]), t.unshift(h), l)
      for (var m = 1; m < t.length; m++) {
        var f = t[m], g = f.isMiddle;
        g && (t[m] = C0.leftRightDelim(g.delim, a, n, g.options, r.mode, []));
      }
    var b;
    if (r.right === ".")
      b = ie(e, ["mclose"]);
    else {
      var y = r.rightColor ? e.withColor(r.rightColor) : e;
      b = C0.leftRightDelim(r.right, a, n, y, r.mode, ["mclose"]);
    }
    return t.push(b), x.makeSpan(["minner"], t, e);
  },
  mathmlBuilder: (r, e) => {
    tr(r);
    var t = h0(r.body, e);
    if (r.left !== ".") {
      var a = new z.MathNode("mo", [v0(r.left, r.mode)]);
      a.setAttribute("fence", "true"), t.unshift(a);
    }
    if (r.right !== ".") {
      var n = new z.MathNode("mo", [v0(r.right, r.mode)]);
      n.setAttribute("fence", "true"), r.rightColor && n.setAttribute("mathcolor", r.rightColor), t.push(n);
    }
    return xt(t);
  }
});
D({
  type: "middle",
  names: ["\\middle"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (r, e) => {
    var t = Ie(e[0], r);
    if (!r.parser.leftrightDepth)
      throw new T("\\middle without preceding \\left", t);
    return {
      type: "middle",
      mode: r.parser.mode,
      delim: t.text
    };
  },
  htmlBuilder: (r, e) => {
    var t;
    if (r.delim === ".")
      t = ie(e, []);
    else {
      t = C0.sizedDelim(r.delim, 1, e, r.mode, []);
      var a = {
        delim: r.delim,
        options: e
      };
      t.isMiddle = a;
    }
    return t;
  },
  mathmlBuilder: (r, e) => {
    var t = r.delim === "\\vert" || r.delim === "|" ? v0("|", "text") : v0(r.delim, r.mode), a = new z.MathNode("mo", [t]);
    return a.setAttribute("fence", "true"), a.setAttribute("lspace", "0.05em"), a.setAttribute("rspace", "0.05em"), a;
  }
});
var zt = (r, e) => {
  var t = x.wrapFragment(U(r.body, e), e), a = r.label.substr(1), n = e.sizeMultiplier, l, o = 0, h = L.isCharacterBox(r.body);
  if (a === "sout")
    l = x.makeSpan(["stretchy", "sout"]), l.height = e.fontMetrics().defaultRuleThickness / n, o = -0.5 * e.fontMetrics().xHeight;
  else if (a === "phase") {
    var m = K({
      number: 0.6,
      unit: "pt"
    }, e), f = K({
      number: 0.35,
      unit: "ex"
    }, e), g = e.havingBaseSizing();
    n = n / g.sizeMultiplier;
    var b = t.height + t.depth + m + f;
    t.style.paddingLeft = A(b / 2 + m);
    var y = Math.floor(1e3 * b * n), w = a1(y), M = new O0([new V0("phase", w)], {
      width: "400em",
      height: A(y / 1e3),
      viewBox: "0 0 400000 " + y,
      preserveAspectRatio: "xMinYMin slice"
    });
    l = x.makeSvgSpan(["hide-tail"], [M], e), l.style.height = A(b), o = t.depth + m + f;
  } else {
    /cancel/.test(a) ? h || t.classes.push("cancel-pad") : a === "angl" ? t.classes.push("anglpad") : t.classes.push("boxpad");
    var k = 0, C = 0, B = 0;
    /box/.test(a) ? (B = Math.max(
      e.fontMetrics().fboxrule,
      // default
      e.minRuleThickness
      // User override.
    ), k = e.fontMetrics().fboxsep + (a === "colorbox" ? 0 : B), C = k) : a === "angl" ? (B = Math.max(e.fontMetrics().defaultRuleThickness, e.minRuleThickness), k = 4 * B, C = Math.max(0, 0.25 - t.depth)) : (k = h ? 0.2 : 0, C = k), l = N0.encloseSpan(t, a, k, C, e), /fbox|boxed|fcolorbox/.test(a) ? (l.style.borderStyle = "solid", l.style.borderWidth = A(B)) : a === "angl" && B !== 0.049 && (l.style.borderTopWidth = A(B), l.style.borderRightWidth = A(B)), o = t.depth + C, r.backgroundColor && (l.style.backgroundColor = r.backgroundColor, r.borderColor && (l.style.borderColor = r.borderColor));
  }
  var q;
  if (r.backgroundColor)
    q = x.makeVList({
      positionType: "individualShift",
      children: [
        // Put the color background behind inner;
        {
          type: "elem",
          elem: l,
          shift: o
        },
        {
          type: "elem",
          elem: t,
          shift: 0
        }
      ]
    }, e);
  else {
    var H = /cancel|phase/.test(a) ? ["svg-align"] : [];
    q = x.makeVList({
      positionType: "individualShift",
      children: [
        // Write the \cancel stroke on top of inner.
        {
          type: "elem",
          elem: t,
          shift: 0
        },
        {
          type: "elem",
          elem: l,
          shift: o,
          wrapperClasses: H
        }
      ]
    }, e);
  }
  return /cancel/.test(a) && (q.height = t.height, q.depth = t.depth), /cancel/.test(a) && !h ? x.makeSpan(["mord", "cancel-lap"], [q], e) : x.makeSpan(["mord"], [q], e);
}, Tt = (r, e) => {
  var t = 0, a = new z.MathNode(r.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [Y(r.body, e)]);
  switch (r.label) {
    case "\\cancel":
      a.setAttribute("notation", "updiagonalstrike");
      break;
    case "\\bcancel":
      a.setAttribute("notation", "downdiagonalstrike");
      break;
    case "\\phase":
      a.setAttribute("notation", "phasorangle");
      break;
    case "\\sout":
      a.setAttribute("notation", "horizontalstrike");
      break;
    case "\\fbox":
      a.setAttribute("notation", "box");
      break;
    case "\\angl":
      a.setAttribute("notation", "actuarial");
      break;
    case "\\fcolorbox":
    case "\\colorbox":
      if (t = e.fontMetrics().fboxsep * e.fontMetrics().ptPerEm, a.setAttribute("width", "+" + 2 * t + "pt"), a.setAttribute("height", "+" + 2 * t + "pt"), a.setAttribute("lspace", t + "pt"), a.setAttribute("voffset", t + "pt"), r.label === "\\fcolorbox") {
        var n = Math.max(
          e.fontMetrics().fboxrule,
          // default
          e.minRuleThickness
          // user override
        );
        a.setAttribute("style", "border: " + n + "em solid " + String(r.borderColor));
      }
      break;
    case "\\xcancel":
      a.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
      break;
  }
  return r.backgroundColor && a.setAttribute("mathbackground", r.backgroundColor), a;
};
D({
  type: "enclose",
  names: ["\\colorbox"],
  props: {
    numArgs: 2,
    allowedInText: !0,
    argTypes: ["color", "text"]
  },
  handler(r, e, t) {
    var {
      parser: a,
      funcName: n
    } = r, l = P(e[0], "color-token").color, o = e[1];
    return {
      type: "enclose",
      mode: a.mode,
      label: n,
      backgroundColor: l,
      body: o
    };
  },
  htmlBuilder: zt,
  mathmlBuilder: Tt
});
D({
  type: "enclose",
  names: ["\\fcolorbox"],
  props: {
    numArgs: 3,
    allowedInText: !0,
    argTypes: ["color", "color", "text"]
  },
  handler(r, e, t) {
    var {
      parser: a,
      funcName: n
    } = r, l = P(e[0], "color-token").color, o = P(e[1], "color-token").color, h = e[2];
    return {
      type: "enclose",
      mode: a.mode,
      label: n,
      backgroundColor: o,
      borderColor: l,
      body: h
    };
  },
  htmlBuilder: zt,
  mathmlBuilder: Tt
});
D({
  type: "enclose",
  names: ["\\fbox"],
  props: {
    numArgs: 1,
    argTypes: ["hbox"],
    allowedInText: !0
  },
  handler(r, e) {
    var {
      parser: t
    } = r;
    return {
      type: "enclose",
      mode: t.mode,
      label: "\\fbox",
      body: e[0]
    };
  }
});
D({
  type: "enclose",
  names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0];
    return {
      type: "enclose",
      mode: t.mode,
      label: a,
      body: n
    };
  },
  htmlBuilder: zt,
  mathmlBuilder: Tt
});
D({
  type: "enclose",
  names: ["\\angl"],
  props: {
    numArgs: 1,
    argTypes: ["hbox"],
    allowedInText: !1
  },
  handler(r, e) {
    var {
      parser: t
    } = r;
    return {
      type: "enclose",
      mode: t.mode,
      label: "\\angl",
      body: e[0]
    };
  }
});
var Kr = {};
function x0(r) {
  for (var {
    type: e,
    names: t,
    props: a,
    handler: n,
    htmlBuilder: l,
    mathmlBuilder: o
  } = r, h = {
    type: e,
    numArgs: a.numArgs || 0,
    allowedInText: !1,
    numOptionalArgs: 0,
    handler: n
  }, m = 0; m < t.length; ++m)
    Kr[t[m]] = h;
  l && (Ce[e] = l), o && (De[e] = o);
}
var Jr = {};
function c(r, e) {
  Jr[r] = e;
}
function rr(r) {
  var e = [];
  r.consumeSpaces();
  for (var t = r.fetch().text; t === "\\hline" || t === "\\hdashline"; )
    r.consume(), e.push(t === "\\hdashline"), r.consumeSpaces(), t = r.fetch().text;
  return e;
}
var Le = (r) => {
  var e = r.parser.settings;
  if (!e.displayMode)
    throw new T("{" + r.envName + "} can be used only in display mode.");
};
function At(r) {
  if (r.indexOf("ed") === -1)
    return r.indexOf("*") === -1;
}
function P0(r, e, t) {
  var {
    hskipBeforeAndAfter: a,
    addJot: n,
    cols: l,
    arraystretch: o,
    colSeparationType: h,
    autoTag: m,
    singleRow: f,
    emptySingleRow: g,
    maxNumCols: b,
    leqno: y
  } = e;
  if (r.gullet.beginGroup(), f || r.gullet.macros.set("\\cr", "\\\\\\relax"), !o) {
    var w = r.gullet.expandMacroAsText("\\arraystretch");
    if (w == null)
      o = 1;
    else if (o = parseFloat(w), !o || o < 0)
      throw new T("Invalid \\arraystretch: " + w);
  }
  r.gullet.beginGroup();
  var M = [], k = [M], C = [], B = [], q = m != null ? [] : void 0;
  function H() {
    m && r.gullet.macros.set("\\@eqnsw", "1", !0);
  }
  function $() {
    q && (r.gullet.macros.get("\\df@tag") ? (q.push(r.subparse([new d0("\\df@tag")])), r.gullet.macros.set("\\df@tag", void 0, !0)) : q.push(Boolean(m) && r.gullet.macros.get("\\@eqnsw") === "1"));
  }
  for (H(), B.push(rr(r)); ; ) {
    var I = r.parseExpression(!1, f ? "\\end" : "\\\\");
    r.gullet.endGroup(), r.gullet.beginGroup(), I = {
      type: "ordgroup",
      mode: r.mode,
      body: I
    }, t && (I = {
      type: "styling",
      mode: r.mode,
      style: t,
      body: [I]
    }), M.push(I);
    var G = r.fetch().text;
    if (G === "&") {
      if (b && M.length === b) {
        if (f || h)
          throw new T("Too many tab characters: &", r.nextToken);
        r.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
      }
      r.consume();
    } else if (G === "\\end") {
      $(), M.length === 1 && I.type === "styling" && I.body[0].body.length === 0 && (k.length > 1 || !g) && k.pop(), B.length < k.length + 1 && B.push([]);
      break;
    } else if (G === "\\\\") {
      r.consume();
      var F = void 0;
      r.gullet.future().text !== " " && (F = r.parseSizeGroup(!0)), C.push(F ? F.value : null), $(), B.push(rr(r)), M = [], k.push(M), H();
    } else
      throw new T("Expected & or \\\\ or \\cr or \\end", r.nextToken);
  }
  return r.gullet.endGroup(), r.gullet.endGroup(), {
    type: "array",
    mode: r.mode,
    addJot: n,
    arraystretch: o,
    body: k,
    cols: l,
    rowGaps: C,
    hskipBeforeAndAfter: a,
    hLinesBeforeRow: B,
    colSeparationType: h,
    tags: q,
    leqno: y
  };
}
function Bt(r) {
  return r.substr(0, 1) === "d" ? "display" : "text";
}
var w0 = function(e, t) {
  var a, n, l = e.body.length, o = e.hLinesBeforeRow, h = 0, m = new Array(l), f = [], g = Math.max(
    // From LaTeX \showthe\arrayrulewidth. Equals 0.04 em.
    t.fontMetrics().arrayRuleWidth,
    t.minRuleThickness
    // User override.
  ), b = 1 / t.fontMetrics().ptPerEm, y = 5 * b;
  if (e.colSeparationType && e.colSeparationType === "small") {
    var w = t.havingStyle(E.SCRIPT).sizeMultiplier;
    y = 0.2778 * (w / t.sizeMultiplier);
  }
  var M = e.colSeparationType === "CD" ? K({
    number: 3,
    unit: "ex"
  }, t) : 12 * b, k = 3 * b, C = e.arraystretch * M, B = 0.7 * C, q = 0.3 * C, H = 0;
  function $(ce) {
    for (var de = 0; de < ce.length; ++de)
      de > 0 && (H += 0.25), f.push({
        pos: H,
        isDashed: ce[de]
      });
  }
  for ($(o[0]), a = 0; a < e.body.length; ++a) {
    var I = e.body[a], G = B, F = q;
    h < I.length && (h = I.length);
    var V = new Array(I.length);
    for (n = 0; n < I.length; ++n) {
      var X = U(I[n], t);
      F < X.depth && (F = X.depth), G < X.height && (G = X.height), V[n] = X;
    }
    var J = e.rowGaps[a], t0 = 0;
    J && (t0 = K(J, t), t0 > 0 && (t0 += q, F < t0 && (F = t0), t0 = 0)), e.addJot && (F += k), V.height = G, V.depth = F, H += G, V.pos = H, H += F + t0, m[a] = V, $(o[a + 1]);
  }
  var S0 = H / 2 + t.fontMetrics().axisHeight, E0 = e.cols || [], m0 = [], M0, X0, He = [];
  if (e.tags && e.tags.some((ce) => ce))
    for (a = 0; a < l; ++a) {
      var Oe = m[a], xa = Oe.pos - S0, Fe = e.tags[a], Y0 = void 0;
      Fe === !0 ? Y0 = x.makeSpan(["eqn-num"], [], t) : Fe === !1 ? Y0 = x.makeSpan([], [], t) : Y0 = x.makeSpan([], r0(Fe, t, !0), t), Y0.depth = Oe.depth, Y0.height = Oe.height, He.push({
        type: "elem",
        elem: Y0,
        shift: xa
      });
    }
  for (
    n = 0, X0 = 0;
    // Continue while either there are more columns or more column
    // descriptions, so trailing separators don't get lost.
    n < h || X0 < E0.length;
    ++n, ++X0
  ) {
    for (var z0 = E0[X0] || {}, Lt = !0; z0.type === "separator"; ) {
      if (Lt || (M0 = x.makeSpan(["arraycolsep"], []), M0.style.width = A(t.fontMetrics().doubleRuleSep), m0.push(M0)), z0.separator === "|" || z0.separator === ":") {
        var wa = z0.separator === "|" ? "solid" : "dashed", W0 = x.makeSpan(["vertical-separator"], [], t);
        W0.style.height = A(H), W0.style.borderRightWidth = A(g), W0.style.borderRightStyle = wa, W0.style.margin = "0 " + A(-g / 2);
        var Ht = H - S0;
        Ht && (W0.style.verticalAlign = A(-Ht)), m0.push(W0);
      } else
        throw new T("Invalid separator type: " + z0.separator);
      X0++, z0 = E0[X0] || {}, Lt = !1;
    }
    if (!(n >= h)) {
      var j0 = void 0;
      (n > 0 || e.hskipBeforeAndAfter) && (j0 = L.deflt(z0.pregap, y), j0 !== 0 && (M0 = x.makeSpan(["arraycolsep"], []), M0.style.width = A(j0), m0.push(M0)));
      var Z0 = [];
      for (a = 0; a < l; ++a) {
        var he = m[a], me = he[n];
        if (me) {
          var ka = he.pos - S0;
          me.depth = he.depth, me.height = he.height, Z0.push({
            type: "elem",
            elem: me,
            shift: ka
          });
        }
      }
      Z0 = x.makeVList({
        positionType: "individualShift",
        children: Z0
      }, t), Z0 = x.makeSpan(["col-align-" + (z0.align || "c")], [Z0]), m0.push(Z0), (n < h - 1 || e.hskipBeforeAndAfter) && (j0 = L.deflt(z0.postgap, y), j0 !== 0 && (M0 = x.makeSpan(["arraycolsep"], []), M0.style.width = A(j0), m0.push(M0)));
    }
  }
  if (m = x.makeSpan(["mtable"], m0), f.length > 0) {
    for (var Sa = x.makeLineSpan("hline", t, g), Ma = x.makeLineSpan("hdashline", t, g), Pe = [{
      type: "elem",
      elem: m,
      shift: 0
    }]; f.length > 0; ) {
      var Ot = f.pop(), Ft = Ot.pos - S0;
      Ot.isDashed ? Pe.push({
        type: "elem",
        elem: Ma,
        shift: Ft
      }) : Pe.push({
        type: "elem",
        elem: Sa,
        shift: Ft
      });
    }
    m = x.makeVList({
      positionType: "individualShift",
      children: Pe
    }, t);
  }
  if (He.length === 0)
    return x.makeSpan(["mord"], [m], t);
  var Ge = x.makeVList({
    positionType: "individualShift",
    children: He
  }, t);
  return Ge = x.makeSpan(["tag"], [Ge], t), x.makeFragment([m, Ge]);
}, hn = {
  c: "center ",
  l: "left ",
  r: "right "
}, k0 = function(e, t) {
  for (var a = [], n = new z.MathNode("mtd", [], ["mtr-glue"]), l = new z.MathNode("mtd", [], ["mml-eqn-num"]), o = 0; o < e.body.length; o++) {
    for (var h = e.body[o], m = [], f = 0; f < h.length; f++)
      m.push(new z.MathNode("mtd", [Y(h[f], t)]));
    e.tags && e.tags[o] && (m.unshift(n), m.push(n), e.leqno ? m.unshift(l) : m.push(l)), a.push(new z.MathNode("mtr", m));
  }
  var g = new z.MathNode("mtable", a), b = e.arraystretch === 0.5 ? 0.1 : 0.16 + e.arraystretch - 1 + (e.addJot ? 0.09 : 0);
  g.setAttribute("rowspacing", A(b));
  var y = "", w = "";
  if (e.cols && e.cols.length > 0) {
    var M = e.cols, k = "", C = !1, B = 0, q = M.length;
    M[0].type === "separator" && (y += "top ", B = 1), M[M.length - 1].type === "separator" && (y += "bottom ", q -= 1);
    for (var H = B; H < q; H++)
      M[H].type === "align" ? (w += hn[M[H].align], C && (k += "none "), C = !0) : M[H].type === "separator" && C && (k += M[H].separator === "|" ? "solid " : "dashed ", C = !1);
    g.setAttribute("columnalign", w.trim()), /[sd]/.test(k) && g.setAttribute("columnlines", k.trim());
  }
  if (e.colSeparationType === "align") {
    for (var $ = e.cols || [], I = "", G = 1; G < $.length; G++)
      I += G % 2 ? "0em " : "1em ";
    g.setAttribute("columnspacing", I.trim());
  } else
    e.colSeparationType === "alignat" || e.colSeparationType === "gather" ? g.setAttribute("columnspacing", "0em") : e.colSeparationType === "small" ? g.setAttribute("columnspacing", "0.2778em") : e.colSeparationType === "CD" ? g.setAttribute("columnspacing", "0.5em") : g.setAttribute("columnspacing", "1em");
  var F = "", V = e.hLinesBeforeRow;
  y += V[0].length > 0 ? "left " : "", y += V[V.length - 1].length > 0 ? "right " : "";
  for (var X = 1; X < V.length - 1; X++)
    F += V[X].length === 0 ? "none " : V[X][0] ? "dashed " : "solid ";
  return /[sd]/.test(F) && g.setAttribute("rowlines", F.trim()), y !== "" && (g = new z.MathNode("menclose", [g]), g.setAttribute("notation", y.trim())), e.arraystretch && e.arraystretch < 1 && (g = new z.MathNode("mstyle", [g]), g.setAttribute("scriptlevel", "1")), g;
}, Qr = function(e, t) {
  e.envName.indexOf("ed") === -1 && Le(e);
  var a = [], n = e.envName.indexOf("at") > -1 ? "alignat" : "align", l = e.envName === "split", o = P0(e.parser, {
    cols: a,
    addJot: !0,
    autoTag: l ? void 0 : At(e.envName),
    emptySingleRow: !0,
    colSeparationType: n,
    maxNumCols: l ? 2 : void 0,
    leqno: e.parser.settings.leqno
  }, "display"), h, m = 0, f = {
    type: "ordgroup",
    mode: e.mode,
    body: []
  };
  if (t[0] && t[0].type === "ordgroup") {
    for (var g = "", b = 0; b < t[0].body.length; b++) {
      var y = P(t[0].body[b], "textord");
      g += y.text;
    }
    h = Number(g), m = h * 2;
  }
  var w = !m;
  o.body.forEach(function(B) {
    for (var q = 1; q < B.length; q += 2) {
      var H = P(B[q], "styling"), $ = P(H.body[0], "ordgroup");
      $.body.unshift(f);
    }
    if (w)
      m < B.length && (m = B.length);
    else {
      var I = B.length / 2;
      if (h < I)
        throw new T("Too many math in a row: " + ("expected " + h + ", but got " + I), B[0]);
    }
  });
  for (var M = 0; M < m; ++M) {
    var k = "r", C = 0;
    M % 2 === 1 ? k = "l" : M > 0 && w && (C = 1), a[M] = {
      type: "align",
      align: k,
      pregap: C,
      postgap: 0
    };
  }
  return o.colSeparationType = w ? "align" : "alignat", o;
};
x0({
  type: "array",
  names: ["array", "darray"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var t = Re(e[0]), a = t ? [e[0]] : P(e[0], "ordgroup").body, n = a.map(function(o) {
      var h = kt(o), m = h.text;
      if ("lcr".indexOf(m) !== -1)
        return {
          type: "align",
          align: m
        };
      if (m === "|")
        return {
          type: "separator",
          separator: "|"
        };
      if (m === ":")
        return {
          type: "separator",
          separator: ":"
        };
      throw new T("Unknown column alignment: " + m, o);
    }), l = {
      cols: n,
      hskipBeforeAndAfter: !0,
      // \@preamble in lttab.dtx
      maxNumCols: n.length
    };
    return P0(r.parser, l, Bt(r.envName));
  },
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var e = {
      matrix: null,
      pmatrix: ["(", ")"],
      bmatrix: ["[", "]"],
      Bmatrix: ["\\{", "\\}"],
      vmatrix: ["|", "|"],
      Vmatrix: ["\\Vert", "\\Vert"]
    }[r.envName.replace("*", "")], t = "c", a = {
      hskipBeforeAndAfter: !1,
      cols: [{
        type: "align",
        align: t
      }]
    };
    if (r.envName.charAt(r.envName.length - 1) === "*") {
      var n = r.parser;
      if (n.consumeSpaces(), n.fetch().text === "[") {
        if (n.consume(), n.consumeSpaces(), t = n.fetch().text, "lcr".indexOf(t) === -1)
          throw new T("Expected l or c or r", n.nextToken);
        n.consume(), n.consumeSpaces(), n.expect("]"), n.consume(), a.cols = [{
          type: "align",
          align: t
        }];
      }
    }
    var l = P0(r.parser, a, Bt(r.envName)), o = Math.max(0, ...l.body.map((h) => h.length));
    return l.cols = new Array(o).fill({
      type: "align",
      align: t
    }), e ? {
      type: "leftright",
      mode: r.mode,
      body: [l],
      left: e[0],
      right: e[1],
      rightColor: void 0
      // \right uninfluenced by \color in array
    } : l;
  },
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["smallmatrix"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var e = {
      arraystretch: 0.5
    }, t = P0(r.parser, e, "script");
    return t.colSeparationType = "small", t;
  },
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["subarray"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var t = Re(e[0]), a = t ? [e[0]] : P(e[0], "ordgroup").body, n = a.map(function(o) {
      var h = kt(o), m = h.text;
      if ("lc".indexOf(m) !== -1)
        return {
          type: "align",
          align: m
        };
      throw new T("Unknown column alignment: " + m, o);
    });
    if (n.length > 1)
      throw new T("{subarray} can contain only one column");
    var l = {
      cols: n,
      hskipBeforeAndAfter: !1,
      arraystretch: 0.5
    };
    if (l = P0(r.parser, l, "script"), l.body.length > 0 && l.body[0].length > 1)
      throw new T("{subarray} can contain only one column");
    return l;
  },
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["cases", "dcases", "rcases", "drcases"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var e = {
      arraystretch: 1.2,
      cols: [{
        type: "align",
        align: "l",
        pregap: 0,
        // TODO(kevinb) get the current style.
        // For now we use the metrics for TEXT style which is what we were
        // doing before.  Before attempting to get the current style we
        // should look at TeX's behavior especially for \over and matrices.
        postgap: 1
        /* 1em quad */
      }, {
        type: "align",
        align: "l",
        pregap: 0,
        postgap: 0
      }]
    }, t = P0(r.parser, e, Bt(r.envName));
    return {
      type: "leftright",
      mode: r.mode,
      body: [t],
      left: r.envName.indexOf("r") > -1 ? "." : "\\{",
      right: r.envName.indexOf("r") > -1 ? "\\}" : ".",
      rightColor: void 0
    };
  },
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["align", "align*", "aligned", "split"],
  props: {
    numArgs: 0
  },
  handler: Qr,
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["gathered", "gather", "gather*"],
  props: {
    numArgs: 0
  },
  handler(r) {
    L.contains(["gather", "gather*"], r.envName) && Le(r);
    var e = {
      cols: [{
        type: "align",
        align: "c"
      }],
      addJot: !0,
      colSeparationType: "gather",
      autoTag: At(r.envName),
      emptySingleRow: !0,
      leqno: r.parser.settings.leqno
    };
    return P0(r.parser, e, "display");
  },
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["alignat", "alignat*", "alignedat"],
  props: {
    numArgs: 1
  },
  handler: Qr,
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["equation", "equation*"],
  props: {
    numArgs: 0
  },
  handler(r) {
    Le(r);
    var e = {
      autoTag: At(r.envName),
      emptySingleRow: !0,
      singleRow: !0,
      maxNumCols: 1,
      leqno: r.parser.settings.leqno
    };
    return P0(r.parser, e, "display");
  },
  htmlBuilder: w0,
  mathmlBuilder: k0
});
x0({
  type: "array",
  names: ["CD"],
  props: {
    numArgs: 0
  },
  handler(r) {
    return Le(r), Z1(r.parser);
  },
  htmlBuilder: w0,
  mathmlBuilder: k0
});
c("\\nonumber", "\\gdef\\@eqnsw{0}");
c("\\notag", "\\nonumber");
D({
  type: "text",
  // Doesn't matter what this is.
  names: ["\\hline", "\\hdashline"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !0
  },
  handler(r, e) {
    throw new T(r.funcName + " valid only within array environment");
  }
});
var ar = Kr;
D({
  type: "environment",
  names: ["\\begin", "\\end"],
  props: {
    numArgs: 1,
    argTypes: ["text"]
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0];
    if (n.type !== "ordgroup")
      throw new T("Invalid environment name", n);
    for (var l = "", o = 0; o < n.body.length; ++o)
      l += P(n.body[o], "textord").text;
    if (a === "\\begin") {
      if (!ar.hasOwnProperty(l))
        throw new T("No such environment: " + l, n);
      var h = ar[l], {
        args: m,
        optArgs: f
      } = t.parseArguments("\\begin{" + l + "}", h), g = {
        mode: t.mode,
        envName: l,
        parser: t
      }, b = h.handler(g, m, f);
      t.expect("\\end", !1);
      var y = t.nextToken, w = P(t.parseFunction(), "environment");
      if (w.name !== l)
        throw new T("Mismatch: \\begin{" + l + "} matched by \\end{" + w.name + "}", y);
      return b;
    }
    return {
      type: "environment",
      mode: t.mode,
      name: l,
      nameGroup: n
    };
  }
});
var mn = x.makeSpan;
function _r(r, e) {
  var t = r0(r.body, e, !0);
  return mn([r.mclass], t, e);
}
function ea(r, e) {
  var t, a = h0(r.body, e);
  return r.mclass === "minner" ? t = new z.MathNode("mpadded", a) : r.mclass === "mord" ? r.isCharacterBox ? (t = a[0], t.type = "mi") : t = new z.MathNode("mi", a) : (r.isCharacterBox ? (t = a[0], t.type = "mo") : t = new z.MathNode("mo", a), r.mclass === "mbin" ? (t.attributes.lspace = "0.22em", t.attributes.rspace = "0.22em") : r.mclass === "mpunct" ? (t.attributes.lspace = "0em", t.attributes.rspace = "0.17em") : r.mclass === "mopen" || r.mclass === "mclose" ? (t.attributes.lspace = "0em", t.attributes.rspace = "0em") : r.mclass === "minner" && (t.attributes.lspace = "0.0556em", t.attributes.width = "+0.1111em")), t;
}
D({
  type: "mclass",
  names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0];
    return {
      type: "mclass",
      mode: t.mode,
      mclass: "m" + a.substr(5),
      // TODO(kevinb): don't prefix with 'm'
      body: _(n),
      isCharacterBox: L.isCharacterBox(n)
    };
  },
  htmlBuilder: _r,
  mathmlBuilder: ea
});
var Ct = (r) => {
  var e = r.type === "ordgroup" && r.body.length ? r.body[0] : r;
  return e.type === "atom" && (e.family === "bin" || e.family === "rel") ? "m" + e.family : "mord";
};
D({
  type: "mclass",
  names: ["\\@binrel"],
  props: {
    numArgs: 2
  },
  handler(r, e) {
    var {
      parser: t
    } = r;
    return {
      type: "mclass",
      mode: t.mode,
      mclass: Ct(e[0]),
      body: _(e[1]),
      isCharacterBox: L.isCharacterBox(e[1])
    };
  }
});
D({
  type: "mclass",
  names: ["\\stackrel", "\\overset", "\\underset"],
  props: {
    numArgs: 2
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a
    } = r, n = e[1], l = e[0], o;
    a !== "\\stackrel" ? o = Ct(n) : o = "mrel";
    var h = {
      type: "op",
      mode: n.mode,
      limits: !0,
      alwaysHandleSupSub: !0,
      parentIsSupSub: !1,
      symbol: !1,
      suppressBaseShift: a !== "\\stackrel",
      body: _(n)
    }, m = {
      type: "supsub",
      mode: l.mode,
      base: h,
      sup: a === "\\underset" ? null : l,
      sub: a === "\\underset" ? l : null
    };
    return {
      type: "mclass",
      mode: t.mode,
      mclass: o,
      body: [m],
      isCharacterBox: L.isCharacterBox(m)
    };
  },
  htmlBuilder: _r,
  mathmlBuilder: ea
});
var ta = (r, e) => {
  var t = r.font, a = e.withFont(t);
  return U(r.body, a);
}, ra = (r, e) => {
  var t = r.font, a = e.withFont(t);
  return Y(r.body, a);
}, nr = {
  "\\Bbb": "\\mathbb",
  "\\bold": "\\mathbf",
  "\\frak": "\\mathfrak",
  "\\bm": "\\boldsymbol"
};
D({
  type: "font",
  names: [
    // styles, except \boldsymbol defined below
    "\\mathrm",
    "\\mathit",
    "\\mathbf",
    "\\mathnormal",
    // families
    "\\mathbb",
    "\\mathcal",
    "\\mathfrak",
    "\\mathscr",
    "\\mathsf",
    "\\mathtt",
    // aliases, except \bm defined below
    "\\Bbb",
    "\\bold",
    "\\frak"
  ],
  props: {
    numArgs: 1,
    allowedInArgument: !0
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a
    } = r, n = Ne(e[0]), l = a;
    return l in nr && (l = nr[l]), {
      type: "font",
      mode: t.mode,
      font: l.slice(1),
      body: n
    };
  },
  htmlBuilder: ta,
  mathmlBuilder: ra
});
D({
  type: "mclass",
  names: ["\\boldsymbol", "\\bm"],
  props: {
    numArgs: 1
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r, a = e[0], n = L.isCharacterBox(a);
    return {
      type: "mclass",
      mode: t.mode,
      mclass: Ct(a),
      body: [{
        type: "font",
        mode: t.mode,
        font: "boldsymbol",
        body: a
      }],
      isCharacterBox: n
    };
  }
});
D({
  type: "font",
  names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a,
      breakOnTokenText: n
    } = r, {
      mode: l
    } = t, o = t.parseExpression(!0, n), h = "math" + a.slice(1);
    return {
      type: "font",
      mode: l,
      font: h,
      body: {
        type: "ordgroup",
        mode: t.mode,
        body: o
      }
    };
  },
  htmlBuilder: ta,
  mathmlBuilder: ra
});
var aa = (r, e) => {
  var t = e;
  return r === "display" ? t = t.id >= E.SCRIPT.id ? t.text() : E.DISPLAY : r === "text" && t.size === E.DISPLAY.size ? t = E.TEXT : r === "script" ? t = E.SCRIPT : r === "scriptscript" && (t = E.SCRIPTSCRIPT), t;
}, Dt = (r, e) => {
  var t = aa(r.size, e.style), a = t.fracNum(), n = t.fracDen(), l;
  l = e.havingStyle(a);
  var o = U(r.numer, l, e);
  if (r.continued) {
    var h = 8.5 / e.fontMetrics().ptPerEm, m = 3.5 / e.fontMetrics().ptPerEm;
    o.height = o.height < h ? h : o.height, o.depth = o.depth < m ? m : o.depth;
  }
  l = e.havingStyle(n);
  var f = U(r.denom, l, e), g, b, y;
  r.hasBarLine ? (r.barSize ? (b = K(r.barSize, e), g = x.makeLineSpan("frac-line", e, b)) : g = x.makeLineSpan("frac-line", e), b = g.height, y = g.height) : (g = null, b = 0, y = e.fontMetrics().defaultRuleThickness);
  var w, M, k;
  t.size === E.DISPLAY.size || r.size === "display" ? (w = e.fontMetrics().num1, b > 0 ? M = 3 * y : M = 7 * y, k = e.fontMetrics().denom1) : (b > 0 ? (w = e.fontMetrics().num2, M = y) : (w = e.fontMetrics().num3, M = 3 * y), k = e.fontMetrics().denom2);
  var C;
  if (g) {
    var q = e.fontMetrics().axisHeight;
    w - o.depth - (q + 0.5 * b) < M && (w += M - (w - o.depth - (q + 0.5 * b))), q - 0.5 * b - (f.height - k) < M && (k += M - (q - 0.5 * b - (f.height - k)));
    var H = -(q - 0.5 * b);
    C = x.makeVList({
      positionType: "individualShift",
      children: [{
        type: "elem",
        elem: f,
        shift: k
      }, {
        type: "elem",
        elem: g,
        shift: H
      }, {
        type: "elem",
        elem: o,
        shift: -w
      }]
    }, e);
  } else {
    var B = w - o.depth - (f.height - k);
    B < M && (w += 0.5 * (M - B), k += 0.5 * (M - B)), C = x.makeVList({
      positionType: "individualShift",
      children: [{
        type: "elem",
        elem: f,
        shift: k
      }, {
        type: "elem",
        elem: o,
        shift: -w
      }]
    }, e);
  }
  l = e.havingStyle(t), C.height *= l.sizeMultiplier / e.sizeMultiplier, C.depth *= l.sizeMultiplier / e.sizeMultiplier;
  var $;
  t.size === E.DISPLAY.size ? $ = e.fontMetrics().delim1 : t.size === E.SCRIPTSCRIPT.size ? $ = e.havingStyle(E.SCRIPT).fontMetrics().delim2 : $ = e.fontMetrics().delim2;
  var I, G;
  return r.leftDelim == null ? I = ie(e, ["mopen"]) : I = C0.customSizedDelim(r.leftDelim, $, !0, e.havingStyle(t), r.mode, ["mopen"]), r.continued ? G = x.makeSpan([]) : r.rightDelim == null ? G = ie(e, ["mclose"]) : G = C0.customSizedDelim(r.rightDelim, $, !0, e.havingStyle(t), r.mode, ["mclose"]), x.makeSpan(["mord"].concat(l.sizingClasses(e)), [I, x.makeSpan(["mfrac"], [C]), G], e);
}, Nt = (r, e) => {
  var t = new z.MathNode("mfrac", [Y(r.numer, e), Y(r.denom, e)]);
  if (!r.hasBarLine)
    t.setAttribute("linethickness", "0px");
  else if (r.barSize) {
    var a = K(r.barSize, e);
    t.setAttribute("linethickness", A(a));
  }
  var n = aa(r.size, e.style);
  if (n.size !== e.style.size) {
    t = new z.MathNode("mstyle", [t]);
    var l = n.size === E.DISPLAY.size ? "true" : "false";
    t.setAttribute("displaystyle", l), t.setAttribute("scriptlevel", "0");
  }
  if (r.leftDelim != null || r.rightDelim != null) {
    var o = [];
    if (r.leftDelim != null) {
      var h = new z.MathNode("mo", [new z.TextNode(r.leftDelim.replace("\\", ""))]);
      h.setAttribute("fence", "true"), o.push(h);
    }
    if (o.push(t), r.rightDelim != null) {
      var m = new z.MathNode("mo", [new z.TextNode(r.rightDelim.replace("\\", ""))]);
      m.setAttribute("fence", "true"), o.push(m);
    }
    return xt(o);
  }
  return t;
};
D({
  type: "genfrac",
  names: [
    "\\dfrac",
    "\\frac",
    "\\tfrac",
    "\\dbinom",
    "\\binom",
    "\\tbinom",
    "\\\\atopfrac",
    // can’t be entered directly
    "\\\\bracefrac",
    "\\\\brackfrac"
    // ditto
  ],
  props: {
    numArgs: 2,
    allowedInArgument: !0
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0], l = e[1], o, h = null, m = null, f = "auto";
    switch (a) {
      case "\\dfrac":
      case "\\frac":
      case "\\tfrac":
        o = !0;
        break;
      case "\\\\atopfrac":
        o = !1;
        break;
      case "\\dbinom":
      case "\\binom":
      case "\\tbinom":
        o = !1, h = "(", m = ")";
        break;
      case "\\\\bracefrac":
        o = !1, h = "\\{", m = "\\}";
        break;
      case "\\\\brackfrac":
        o = !1, h = "[", m = "]";
        break;
      default:
        throw new Error("Unrecognized genfrac command");
    }
    switch (a) {
      case "\\dfrac":
      case "\\dbinom":
        f = "display";
        break;
      case "\\tfrac":
      case "\\tbinom":
        f = "text";
        break;
    }
    return {
      type: "genfrac",
      mode: t.mode,
      continued: !1,
      numer: n,
      denom: l,
      hasBarLine: o,
      leftDelim: h,
      rightDelim: m,
      size: f,
      barSize: null
    };
  },
  htmlBuilder: Dt,
  mathmlBuilder: Nt
});
D({
  type: "genfrac",
  names: ["\\cfrac"],
  props: {
    numArgs: 2
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0], l = e[1];
    return {
      type: "genfrac",
      mode: t.mode,
      continued: !0,
      numer: n,
      denom: l,
      hasBarLine: !0,
      leftDelim: null,
      rightDelim: null,
      size: "display",
      barSize: null
    };
  }
});
D({
  type: "infix",
  names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
  props: {
    numArgs: 0,
    infix: !0
  },
  handler(r) {
    var {
      parser: e,
      funcName: t,
      token: a
    } = r, n;
    switch (t) {
      case "\\over":
        n = "\\frac";
        break;
      case "\\choose":
        n = "\\binom";
        break;
      case "\\atop":
        n = "\\\\atopfrac";
        break;
      case "\\brace":
        n = "\\\\bracefrac";
        break;
      case "\\brack":
        n = "\\\\brackfrac";
        break;
      default:
        throw new Error("Unrecognized infix genfrac command");
    }
    return {
      type: "infix",
      mode: e.mode,
      replaceWith: n,
      token: a
    };
  }
});
var ir = ["display", "text", "script", "scriptscript"], lr = function(e) {
  var t = null;
  return e.length > 0 && (t = e, t = t === "." ? null : t), t;
};
D({
  type: "genfrac",
  names: ["\\genfrac"],
  props: {
    numArgs: 6,
    allowedInArgument: !0,
    argTypes: ["math", "math", "size", "text", "math", "math"]
  },
  handler(r, e) {
    var {
      parser: t
    } = r, a = e[4], n = e[5], l = Ne(e[0]), o = l.type === "atom" && l.family === "open" ? lr(l.text) : null, h = Ne(e[1]), m = h.type === "atom" && h.family === "close" ? lr(h.text) : null, f = P(e[2], "size"), g, b = null;
    f.isBlank ? g = !0 : (b = f.value, g = b.number > 0);
    var y = "auto", w = e[3];
    if (w.type === "ordgroup") {
      if (w.body.length > 0) {
        var M = P(w.body[0], "textord");
        y = ir[Number(M.text)];
      }
    } else
      w = P(w, "textord"), y = ir[Number(w.text)];
    return {
      type: "genfrac",
      mode: t.mode,
      numer: a,
      denom: n,
      continued: !1,
      hasBarLine: g,
      barSize: b,
      leftDelim: o,
      rightDelim: m,
      size: y
    };
  },
  htmlBuilder: Dt,
  mathmlBuilder: Nt
});
D({
  type: "infix",
  names: ["\\above"],
  props: {
    numArgs: 1,
    argTypes: ["size"],
    infix: !0
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a,
      token: n
    } = r;
    return {
      type: "infix",
      mode: t.mode,
      replaceWith: "\\\\abovefrac",
      size: P(e[0], "size").value,
      token: n
    };
  }
});
D({
  type: "genfrac",
  names: ["\\\\abovefrac"],
  props: {
    numArgs: 3,
    argTypes: ["math", "size", "math"]
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0], l = $a(P(e[1], "infix").size), o = e[2], h = l.number > 0;
    return {
      type: "genfrac",
      mode: t.mode,
      numer: n,
      denom: o,
      continued: !1,
      hasBarLine: h,
      barSize: l,
      leftDelim: null,
      rightDelim: null,
      size: "auto"
    };
  },
  htmlBuilder: Dt,
  mathmlBuilder: Nt
});
var na = (r, e) => {
  var t = e.style, a, n;
  r.type === "supsub" ? (a = r.sup ? U(r.sup, e.havingStyle(t.sup()), e) : U(r.sub, e.havingStyle(t.sub()), e), n = P(r.base, "horizBrace")) : n = P(r, "horizBrace");
  var l = U(n.base, e.havingBaseStyle(E.DISPLAY)), o = N0.svgSpan(n, e), h;
  if (n.isOver ? (h = x.makeVList({
    positionType: "firstBaseline",
    children: [{
      type: "elem",
      elem: l
    }, {
      type: "kern",
      size: 0.1
    }, {
      type: "elem",
      elem: o
    }]
  }, e), h.children[0].children[0].children[1].classes.push("svg-align")) : (h = x.makeVList({
    positionType: "bottom",
    positionData: l.depth + 0.1 + o.height,
    children: [{
      type: "elem",
      elem: o
    }, {
      type: "kern",
      size: 0.1
    }, {
      type: "elem",
      elem: l
    }]
  }, e), h.children[0].children[0].children[0].classes.push("svg-align")), a) {
    var m = x.makeSpan(["mord", n.isOver ? "mover" : "munder"], [h], e);
    n.isOver ? h = x.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: m
      }, {
        type: "kern",
        size: 0.2
      }, {
        type: "elem",
        elem: a
      }]
    }, e) : h = x.makeVList({
      positionType: "bottom",
      positionData: m.depth + 0.2 + a.height + a.depth,
      children: [{
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: 0.2
      }, {
        type: "elem",
        elem: m
      }]
    }, e);
  }
  return x.makeSpan(["mord", n.isOver ? "mover" : "munder"], [h], e);
}, cn = (r, e) => {
  var t = N0.mathMLnode(r.label);
  return new z.MathNode(r.isOver ? "mover" : "munder", [Y(r.base, e), t]);
};
D({
  type: "horizBrace",
  names: ["\\overbrace", "\\underbrace"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a
    } = r;
    return {
      type: "horizBrace",
      mode: t.mode,
      label: a,
      isOver: /^\\over/.test(a),
      base: e[0]
    };
  },
  htmlBuilder: na,
  mathmlBuilder: cn
});
D({
  type: "href",
  names: ["\\href"],
  props: {
    numArgs: 2,
    argTypes: ["url", "original"],
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r, a = e[1], n = P(e[0], "url").url;
    return t.settings.isTrusted({
      command: "\\href",
      url: n
    }) ? {
      type: "href",
      mode: t.mode,
      href: n,
      body: _(a)
    } : t.formatUnsupportedCmd("\\href");
  },
  htmlBuilder: (r, e) => {
    var t = r0(r.body, e, !1);
    return x.makeAnchor(r.href, [], t, e);
  },
  mathmlBuilder: (r, e) => {
    var t = F0(r.body, e);
    return t instanceof c0 || (t = new c0("mrow", [t])), t.setAttribute("href", r.href), t;
  }
});
D({
  type: "href",
  names: ["\\url"],
  props: {
    numArgs: 1,
    argTypes: ["url"],
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r, a = P(e[0], "url").url;
    if (!t.settings.isTrusted({
      command: "\\url",
      url: a
    }))
      return t.formatUnsupportedCmd("\\url");
    for (var n = [], l = 0; l < a.length; l++) {
      var o = a[l];
      o === "~" && (o = "\\textasciitilde"), n.push({
        type: "textord",
        mode: "text",
        text: o
      });
    }
    var h = {
      type: "text",
      mode: t.mode,
      font: "\\texttt",
      body: n
    };
    return {
      type: "href",
      mode: t.mode,
      href: a,
      body: _(h)
    };
  }
});
D({
  type: "hbox",
  names: ["\\hbox"],
  props: {
    numArgs: 1,
    argTypes: ["text"],
    allowedInText: !0,
    primitive: !0
  },
  handler(r, e) {
    var {
      parser: t
    } = r;
    return {
      type: "hbox",
      mode: t.mode,
      body: _(e[0])
    };
  },
  htmlBuilder(r, e) {
    var t = r0(r.body, e, !1);
    return x.makeFragment(t);
  },
  mathmlBuilder(r, e) {
    return new z.MathNode("mrow", h0(r.body, e));
  }
});
D({
  type: "html",
  names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
  props: {
    numArgs: 2,
    argTypes: ["raw", "original"],
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a,
      token: n
    } = r, l = P(e[0], "raw").string, o = e[1];
    t.settings.strict && t.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
    var h, m = {};
    switch (a) {
      case "\\htmlClass":
        m.class = l, h = {
          command: "\\htmlClass",
          class: l
        };
        break;
      case "\\htmlId":
        m.id = l, h = {
          command: "\\htmlId",
          id: l
        };
        break;
      case "\\htmlStyle":
        m.style = l, h = {
          command: "\\htmlStyle",
          style: l
        };
        break;
      case "\\htmlData": {
        for (var f = l.split(","), g = 0; g < f.length; g++) {
          var b = f[g].split("=");
          if (b.length !== 2)
            throw new T("Error parsing key-value for \\htmlData");
          m["data-" + b[0].trim()] = b[1].trim();
        }
        h = {
          command: "\\htmlData",
          attributes: m
        };
        break;
      }
      default:
        throw new Error("Unrecognized html command");
    }
    return t.settings.isTrusted(h) ? {
      type: "html",
      mode: t.mode,
      attributes: m,
      body: _(o)
    } : t.formatUnsupportedCmd(a);
  },
  htmlBuilder: (r, e) => {
    var t = r0(r.body, e, !1), a = ["enclosing"];
    r.attributes.class && a.push(...r.attributes.class.trim().split(/\s+/));
    var n = x.makeSpan(a, t, e);
    for (var l in r.attributes)
      l !== "class" && r.attributes.hasOwnProperty(l) && n.setAttribute(l, r.attributes[l]);
    return n;
  },
  mathmlBuilder: (r, e) => F0(r.body, e)
});
D({
  type: "htmlmathml",
  names: ["\\html@mathml"],
  props: {
    numArgs: 2,
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r;
    return {
      type: "htmlmathml",
      mode: t.mode,
      html: _(e[0]),
      mathml: _(e[1])
    };
  },
  htmlBuilder: (r, e) => {
    var t = r0(r.html, e, !1);
    return x.makeFragment(t);
  },
  mathmlBuilder: (r, e) => F0(r.mathml, e)
});
var et = function(e) {
  if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e))
    return {
      number: +e,
      unit: "bp"
    };
  var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
  if (!t)
    throw new T("Invalid size: '" + e + "' in \\includegraphics");
  var a = {
    number: +(t[1] + t[2]),
    // sign + magnitude, cast to number
    unit: t[3]
  };
  if (!Sr(a))
    throw new T("Invalid unit: '" + a.unit + "' in \\includegraphics.");
  return a;
};
D({
  type: "includegraphics",
  names: ["\\includegraphics"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1,
    argTypes: ["raw", "url"],
    allowedInText: !1
  },
  handler: (r, e, t) => {
    var {
      parser: a
    } = r, n = {
      number: 0,
      unit: "em"
    }, l = {
      number: 0.9,
      unit: "em"
    }, o = {
      number: 0,
      unit: "em"
    }, h = "";
    if (t[0])
      for (var m = P(t[0], "raw").string, f = m.split(","), g = 0; g < f.length; g++) {
        var b = f[g].split("=");
        if (b.length === 2) {
          var y = b[1].trim();
          switch (b[0].trim()) {
            case "alt":
              h = y;
              break;
            case "width":
              n = et(y);
              break;
            case "height":
              l = et(y);
              break;
            case "totalheight":
              o = et(y);
              break;
            default:
              throw new T("Invalid key: '" + b[0] + "' in \\includegraphics.");
          }
        }
      }
    var w = P(e[0], "url").url;
    return h === "" && (h = w, h = h.replace(/^.*[\\/]/, ""), h = h.substring(0, h.lastIndexOf("."))), a.settings.isTrusted({
      command: "\\includegraphics",
      url: w
    }) ? {
      type: "includegraphics",
      mode: a.mode,
      alt: h,
      width: n,
      height: l,
      totalheight: o,
      src: w
    } : a.formatUnsupportedCmd("\\includegraphics");
  },
  htmlBuilder: (r, e) => {
    var t = K(r.height, e), a = 0;
    r.totalheight.number > 0 && (a = K(r.totalheight, e) - t);
    var n = 0;
    r.width.number > 0 && (n = K(r.width, e));
    var l = {
      height: A(t + a)
    };
    n > 0 && (l.width = A(n)), a > 0 && (l.verticalAlign = A(-a));
    var o = new m1(r.src, r.alt, l);
    return o.height = t, o.depth = a, o;
  },
  mathmlBuilder: (r, e) => {
    var t = new z.MathNode("mglyph", []);
    t.setAttribute("alt", r.alt);
    var a = K(r.height, e), n = 0;
    if (r.totalheight.number > 0 && (n = K(r.totalheight, e) - a, t.setAttribute("valign", A(-n))), t.setAttribute("height", A(a + n)), r.width.number > 0) {
      var l = K(r.width, e);
      t.setAttribute("width", A(l));
    }
    return t.setAttribute("src", r.src), t;
  }
});
D({
  type: "kern",
  names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
  props: {
    numArgs: 1,
    argTypes: ["size"],
    primitive: !0,
    allowedInText: !0
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a
    } = r, n = P(e[0], "size");
    if (t.settings.strict) {
      var l = a[1] === "m", o = n.value.unit === "mu";
      l ? (o || t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " supports only mu units, " + ("not " + n.value.unit + " units")), t.mode !== "math" && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " works only in math mode")) : o && t.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + a + " doesn't support mu units");
    }
    return {
      type: "kern",
      mode: t.mode,
      dimension: n.value
    };
  },
  htmlBuilder(r, e) {
    return x.makeGlue(r.dimension, e);
  },
  mathmlBuilder(r, e) {
    var t = K(r.dimension, e);
    return new z.SpaceNode(t);
  }
});
D({
  type: "lap",
  names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0];
    return {
      type: "lap",
      mode: t.mode,
      alignment: a.slice(5),
      body: n
    };
  },
  htmlBuilder: (r, e) => {
    var t;
    r.alignment === "clap" ? (t = x.makeSpan([], [U(r.body, e)]), t = x.makeSpan(["inner"], [t], e)) : t = x.makeSpan(["inner"], [U(r.body, e)]);
    var a = x.makeSpan(["fix"], []), n = x.makeSpan([r.alignment], [t, a], e), l = x.makeSpan(["strut"]);
    return l.style.height = A(n.height + n.depth), n.depth && (l.style.verticalAlign = A(-n.depth)), n.children.unshift(l), n = x.makeSpan(["thinbox"], [n], e), x.makeSpan(["mord", "vbox"], [n], e);
  },
  mathmlBuilder: (r, e) => {
    var t = new z.MathNode("mpadded", [Y(r.body, e)]);
    if (r.alignment !== "rlap") {
      var a = r.alignment === "llap" ? "-1" : "-0.5";
      t.setAttribute("lspace", a + "width");
    }
    return t.setAttribute("width", "0px"), t;
  }
});
D({
  type: "styling",
  names: ["\\(", "$"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !1
  },
  handler(r, e) {
    var {
      funcName: t,
      parser: a
    } = r, n = a.mode;
    a.switchMode("math");
    var l = t === "\\(" ? "\\)" : "$", o = a.parseExpression(!1, l);
    return a.expect(l), a.switchMode(n), {
      type: "styling",
      mode: a.mode,
      style: "text",
      body: o
    };
  }
});
D({
  type: "text",
  // Doesn't matter what this is.
  names: ["\\)", "\\]"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    allowedInMath: !1
  },
  handler(r, e) {
    throw new T("Mismatched " + r.funcName);
  }
});
var sr = (r, e) => {
  switch (e.style.size) {
    case E.DISPLAY.size:
      return r.display;
    case E.TEXT.size:
      return r.text;
    case E.SCRIPT.size:
      return r.script;
    case E.SCRIPTSCRIPT.size:
      return r.scriptscript;
    default:
      return r.text;
  }
};
D({
  type: "mathchoice",
  names: ["\\mathchoice"],
  props: {
    numArgs: 4,
    primitive: !0
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r;
    return {
      type: "mathchoice",
      mode: t.mode,
      display: _(e[0]),
      text: _(e[1]),
      script: _(e[2]),
      scriptscript: _(e[3])
    };
  },
  htmlBuilder: (r, e) => {
    var t = sr(r, e), a = r0(t, e, !1);
    return x.makeFragment(a);
  },
  mathmlBuilder: (r, e) => {
    var t = sr(r, e);
    return F0(t, e);
  }
});
var ia = (r, e, t, a, n, l, o) => {
  r = x.makeSpan([], [r]);
  var h = t && L.isCharacterBox(t), m, f;
  if (e) {
    var g = U(e, a.havingStyle(n.sup()), a);
    f = {
      elem: g,
      kern: Math.max(a.fontMetrics().bigOpSpacing1, a.fontMetrics().bigOpSpacing3 - g.depth)
    };
  }
  if (t) {
    var b = U(t, a.havingStyle(n.sub()), a);
    m = {
      elem: b,
      kern: Math.max(a.fontMetrics().bigOpSpacing2, a.fontMetrics().bigOpSpacing4 - b.height)
    };
  }
  var y;
  if (f && m) {
    var w = a.fontMetrics().bigOpSpacing5 + m.elem.height + m.elem.depth + m.kern + r.depth + o;
    y = x.makeVList({
      positionType: "bottom",
      positionData: w,
      children: [{
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }, {
        type: "elem",
        elem: m.elem,
        marginLeft: A(-l)
      }, {
        type: "kern",
        size: m.kern
      }, {
        type: "elem",
        elem: r
      }, {
        type: "kern",
        size: f.kern
      }, {
        type: "elem",
        elem: f.elem,
        marginLeft: A(l)
      }, {
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }]
    }, a);
  } else if (m) {
    var M = r.height - o;
    y = x.makeVList({
      positionType: "top",
      positionData: M,
      children: [{
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }, {
        type: "elem",
        elem: m.elem,
        marginLeft: A(-l)
      }, {
        type: "kern",
        size: m.kern
      }, {
        type: "elem",
        elem: r
      }]
    }, a);
  } else if (f) {
    var k = r.depth + o;
    y = x.makeVList({
      positionType: "bottom",
      positionData: k,
      children: [{
        type: "elem",
        elem: r
      }, {
        type: "kern",
        size: f.kern
      }, {
        type: "elem",
        elem: f.elem,
        marginLeft: A(l)
      }, {
        type: "kern",
        size: a.fontMetrics().bigOpSpacing5
      }]
    }, a);
  } else
    return r;
  var C = [y];
  if (m && l !== 0 && !h) {
    var B = x.makeSpan(["mspace"], [], a);
    B.style.marginRight = A(l), C.unshift(B);
  }
  return x.makeSpan(["mop", "op-limits"], C, a);
}, la = ["\\smallint"], ee = (r, e) => {
  var t, a, n = !1, l;
  r.type === "supsub" ? (t = r.sup, a = r.sub, l = P(r.base, "op"), n = !0) : l = P(r, "op");
  var o = e.style, h = !1;
  o.size === E.DISPLAY.size && l.symbol && !L.contains(la, l.name) && (h = !0);
  var m;
  if (l.symbol) {
    var f = h ? "Size2-Regular" : "Size1-Regular", g = "";
    if ((l.name === "\\oiint" || l.name === "\\oiiint") && (g = l.name.substr(1), l.name = g === "oiint" ? "\\iint" : "\\iiint"), m = x.makeSymbol(l.name, f, "math", e, ["mop", "op-symbol", h ? "large-op" : "small-op"]), g.length > 0) {
      var b = m.italic, y = x.staticSvg(g + "Size" + (h ? "2" : "1"), e);
      m = x.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: m,
          shift: 0
        }, {
          type: "elem",
          elem: y,
          shift: h ? 0.08 : 0
        }]
      }, e), l.name = "\\" + g, m.classes.unshift("mop"), m.italic = b;
    }
  } else if (l.body) {
    var w = r0(l.body, e, !0);
    w.length === 1 && w[0] instanceof p0 ? (m = w[0], m.classes[0] = "mop") : m = x.makeSpan(["mop"], w, e);
  } else {
    for (var M = [], k = 1; k < l.name.length; k++)
      M.push(x.mathsym(l.name[k], l.mode, e));
    m = x.makeSpan(["mop"], M, e);
  }
  var C = 0, B = 0;
  return (m instanceof p0 || l.name === "\\oiint" || l.name === "\\oiiint") && !l.suppressBaseShift && (C = (m.height - m.depth) / 2 - e.fontMetrics().axisHeight, B = m.italic), n ? ia(m, t, a, e, o, B, C) : (C && (m.style.position = "relative", m.style.top = A(C)), m);
}, ue = (r, e) => {
  var t;
  if (r.symbol)
    t = new c0("mo", [v0(r.name, r.mode)]), L.contains(la, r.name) && t.setAttribute("largeop", "false");
  else if (r.body)
    t = new c0("mo", h0(r.body, e));
  else {
    t = new c0("mi", [new re(r.name.slice(1))]);
    var a = new c0("mo", [v0("⁡", "text")]);
    r.parentIsSupSub ? t = new c0("mrow", [t, a]) : t = Rr([t, a]);
  }
  return t;
}, dn = {
  "∏": "\\prod",
  "∐": "\\coprod",
  "∑": "\\sum",
  "⋀": "\\bigwedge",
  "⋁": "\\bigvee",
  "⋂": "\\bigcap",
  "⋃": "\\bigcup",
  "⨀": "\\bigodot",
  "⨁": "\\bigoplus",
  "⨂": "\\bigotimes",
  "⨄": "\\biguplus",
  "⨆": "\\bigsqcup"
};
D({
  type: "op",
  names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "∏", "∐", "∑", "⋀", "⋁", "⋂", "⋃", "⨀", "⨁", "⨂", "⨄", "⨆"],
  props: {
    numArgs: 0
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a
    } = r, n = a;
    return n.length === 1 && (n = dn[n]), {
      type: "op",
      mode: t.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !0,
      name: n
    };
  },
  htmlBuilder: ee,
  mathmlBuilder: ue
});
D({
  type: "op",
  names: ["\\mathop"],
  props: {
    numArgs: 1,
    primitive: !0
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r, a = e[0];
    return {
      type: "op",
      mode: t.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      body: _(a)
    };
  },
  htmlBuilder: ee,
  mathmlBuilder: ue
});
var fn = {
  "∫": "\\int",
  "∬": "\\iint",
  "∭": "\\iiint",
  "∮": "\\oint",
  "∯": "\\oiint",
  "∰": "\\oiiint"
};
D({
  type: "op",
  names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var {
      parser: e,
      funcName: t
    } = r;
    return {
      type: "op",
      mode: e.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !1,
      name: t
    };
  },
  htmlBuilder: ee,
  mathmlBuilder: ue
});
D({
  type: "op",
  names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var {
      parser: e,
      funcName: t
    } = r;
    return {
      type: "op",
      mode: e.mode,
      limits: !0,
      parentIsSupSub: !1,
      symbol: !1,
      name: t
    };
  },
  htmlBuilder: ee,
  mathmlBuilder: ue
});
D({
  type: "op",
  names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "∫", "∬", "∭", "∮", "∯", "∰"],
  props: {
    numArgs: 0
  },
  handler(r) {
    var {
      parser: e,
      funcName: t
    } = r, a = t;
    return a.length === 1 && (a = fn[a]), {
      type: "op",
      mode: e.mode,
      limits: !1,
      parentIsSupSub: !1,
      symbol: !0,
      name: a
    };
  },
  htmlBuilder: ee,
  mathmlBuilder: ue
});
var sa = (r, e) => {
  var t, a, n = !1, l;
  r.type === "supsub" ? (t = r.sup, a = r.sub, l = P(r.base, "operatorname"), n = !0) : l = P(r, "operatorname");
  var o;
  if (l.body.length > 0) {
    for (var h = l.body.map((b) => {
      var y = b.text;
      return typeof y == "string" ? {
        type: "textord",
        mode: b.mode,
        text: y
      } : b;
    }), m = r0(h, e.withFont("mathrm"), !0), f = 0; f < m.length; f++) {
      var g = m[f];
      g instanceof p0 && (g.text = g.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
    }
    o = x.makeSpan(["mop"], m, e);
  } else
    o = x.makeSpan(["mop"], [], e);
  return n ? ia(o, t, a, e, e.style, 0, 0) : o;
}, pn = (r, e) => {
  for (var t = h0(r.body, e.withFont("mathrm")), a = !0, n = 0; n < t.length; n++) {
    var l = t[n];
    if (!(l instanceof z.SpaceNode))
      if (l instanceof z.MathNode)
        switch (l.type) {
          case "mi":
          case "mn":
          case "ms":
          case "mspace":
          case "mtext":
            break;
          case "mo": {
            var o = l.children[0];
            l.children.length === 1 && o instanceof z.TextNode ? o.text = o.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : a = !1;
            break;
          }
          default:
            a = !1;
        }
      else
        a = !1;
  }
  if (a) {
    var h = t.map((g) => g.toText()).join("");
    t = [new z.TextNode(h)];
  }
  var m = new z.MathNode("mi", t);
  m.setAttribute("mathvariant", "normal");
  var f = new z.MathNode("mo", [v0("⁡", "text")]);
  return r.parentIsSupSub ? new z.MathNode("mrow", [m, f]) : z.newDocumentFragment([m, f]);
};
D({
  type: "operatorname",
  names: ["\\operatorname@", "\\operatornamewithlimits"],
  props: {
    numArgs: 1
  },
  handler: (r, e) => {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0];
    return {
      type: "operatorname",
      mode: t.mode,
      body: _(n),
      alwaysHandleSupSub: a === "\\operatornamewithlimits",
      limits: !1,
      parentIsSupSub: !1
    };
  },
  htmlBuilder: sa,
  mathmlBuilder: pn
});
c("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
U0({
  type: "ordgroup",
  htmlBuilder(r, e) {
    return r.semisimple ? x.makeFragment(r0(r.body, e, !1)) : x.makeSpan(["mord"], r0(r.body, e, !0), e);
  },
  mathmlBuilder(r, e) {
    return F0(r.body, e, !0);
  }
});
D({
  type: "overline",
  names: ["\\overline"],
  props: {
    numArgs: 1
  },
  handler(r, e) {
    var {
      parser: t
    } = r, a = e[0];
    return {
      type: "overline",
      mode: t.mode,
      body: a
    };
  },
  htmlBuilder(r, e) {
    var t = U(r.body, e.havingCrampedStyle()), a = x.makeLineSpan("overline-line", e), n = e.fontMetrics().defaultRuleThickness, l = x.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: t
      }, {
        type: "kern",
        size: 3 * n
      }, {
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: n
      }]
    }, e);
    return x.makeSpan(["mord", "overline"], [l], e);
  },
  mathmlBuilder(r, e) {
    var t = new z.MathNode("mo", [new z.TextNode("‾")]);
    t.setAttribute("stretchy", "true");
    var a = new z.MathNode("mover", [Y(r.body, e), t]);
    return a.setAttribute("accent", "true"), a;
  }
});
D({
  type: "phantom",
  names: ["\\phantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r, a = e[0];
    return {
      type: "phantom",
      mode: t.mode,
      body: _(a)
    };
  },
  htmlBuilder: (r, e) => {
    var t = r0(r.body, e.withPhantom(), !1);
    return x.makeFragment(t);
  },
  mathmlBuilder: (r, e) => {
    var t = h0(r.body, e);
    return new z.MathNode("mphantom", t);
  }
});
D({
  type: "hphantom",
  names: ["\\hphantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r, a = e[0];
    return {
      type: "hphantom",
      mode: t.mode,
      body: a
    };
  },
  htmlBuilder: (r, e) => {
    var t = x.makeSpan([], [U(r.body, e.withPhantom())]);
    if (t.height = 0, t.depth = 0, t.children)
      for (var a = 0; a < t.children.length; a++)
        t.children[a].height = 0, t.children[a].depth = 0;
    return t = x.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: t
      }]
    }, e), x.makeSpan(["mord"], [t], e);
  },
  mathmlBuilder: (r, e) => {
    var t = h0(_(r.body), e), a = new z.MathNode("mphantom", t), n = new z.MathNode("mpadded", [a]);
    return n.setAttribute("height", "0px"), n.setAttribute("depth", "0px"), n;
  }
});
D({
  type: "vphantom",
  names: ["\\vphantom"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      parser: t
    } = r, a = e[0];
    return {
      type: "vphantom",
      mode: t.mode,
      body: a
    };
  },
  htmlBuilder: (r, e) => {
    var t = x.makeSpan(["inner"], [U(r.body, e.withPhantom())]), a = x.makeSpan(["fix"], []);
    return x.makeSpan(["mord", "rlap"], [t, a], e);
  },
  mathmlBuilder: (r, e) => {
    var t = h0(_(r.body), e), a = new z.MathNode("mphantom", t), n = new z.MathNode("mpadded", [a]);
    return n.setAttribute("width", "0px"), n;
  }
});
D({
  type: "raisebox",
  names: ["\\raisebox"],
  props: {
    numArgs: 2,
    argTypes: ["size", "hbox"],
    allowedInText: !0
  },
  handler(r, e) {
    var {
      parser: t
    } = r, a = P(e[0], "size").value, n = e[1];
    return {
      type: "raisebox",
      mode: t.mode,
      dy: a,
      body: n
    };
  },
  htmlBuilder(r, e) {
    var t = U(r.body, e), a = K(r.dy, e);
    return x.makeVList({
      positionType: "shift",
      positionData: -a,
      children: [{
        type: "elem",
        elem: t
      }]
    }, e);
  },
  mathmlBuilder(r, e) {
    var t = new z.MathNode("mpadded", [Y(r.body, e)]), a = r.dy.number + r.dy.unit;
    return t.setAttribute("voffset", a), t;
  }
});
D({
  type: "internal",
  names: ["\\relax"],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler(r) {
    var {
      parser: e
    } = r;
    return {
      type: "internal",
      mode: e.mode
    };
  }
});
D({
  type: "rule",
  names: ["\\rule"],
  props: {
    numArgs: 2,
    numOptionalArgs: 1,
    argTypes: ["size", "size", "size"]
  },
  handler(r, e, t) {
    var {
      parser: a
    } = r, n = t[0], l = P(e[0], "size"), o = P(e[1], "size");
    return {
      type: "rule",
      mode: a.mode,
      shift: n && P(n, "size").value,
      width: l.value,
      height: o.value
    };
  },
  htmlBuilder(r, e) {
    var t = x.makeSpan(["mord", "rule"], [], e), a = K(r.width, e), n = K(r.height, e), l = r.shift ? K(r.shift, e) : 0;
    return t.style.borderRightWidth = A(a), t.style.borderTopWidth = A(n), t.style.bottom = A(l), t.width = a, t.height = n + l, t.depth = -l, t.maxFontSize = n * 1.125 * e.sizeMultiplier, t;
  },
  mathmlBuilder(r, e) {
    var t = K(r.width, e), a = K(r.height, e), n = r.shift ? K(r.shift, e) : 0, l = e.color && e.getColor() || "black", o = new z.MathNode("mspace");
    o.setAttribute("mathbackground", l), o.setAttribute("width", A(t)), o.setAttribute("height", A(a));
    var h = new z.MathNode("mpadded", [o]);
    return n >= 0 ? h.setAttribute("height", A(n)) : (h.setAttribute("height", A(n)), h.setAttribute("depth", A(-n))), h.setAttribute("voffset", A(n)), h;
  }
});
function oa(r, e, t) {
  for (var a = r0(r, e, !1), n = e.sizeMultiplier / t.sizeMultiplier, l = 0; l < a.length; l++) {
    var o = a[l].classes.indexOf("sizing");
    o < 0 ? Array.prototype.push.apply(a[l].classes, e.sizingClasses(t)) : a[l].classes[o + 1] === "reset-size" + e.size && (a[l].classes[o + 1] = "reset-size" + t.size), a[l].height *= n, a[l].depth *= n;
  }
  return x.makeFragment(a);
}
var or = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"], vn = (r, e) => {
  var t = e.havingSize(r.size);
  return oa(r.body, t, e);
};
D({
  type: "sizing",
  names: or,
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler: (r, e) => {
    var {
      breakOnTokenText: t,
      funcName: a,
      parser: n
    } = r, l = n.parseExpression(!1, t);
    return {
      type: "sizing",
      mode: n.mode,
      // Figure out what size to use based on the list of functions above
      size: or.indexOf(a) + 1,
      body: l
    };
  },
  htmlBuilder: vn,
  mathmlBuilder: (r, e) => {
    var t = e.havingSize(r.size), a = h0(r.body, t), n = new z.MathNode("mstyle", a);
    return n.setAttribute("mathsize", A(t.sizeMultiplier)), n;
  }
});
D({
  type: "smash",
  names: ["\\smash"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1,
    allowedInText: !0
  },
  handler: (r, e, t) => {
    var {
      parser: a
    } = r, n = !1, l = !1, o = t[0] && P(t[0], "ordgroup");
    if (o)
      for (var h = "", m = 0; m < o.body.length; ++m) {
        var f = o.body[m];
        if (h = f.text, h === "t")
          n = !0;
        else if (h === "b")
          l = !0;
        else {
          n = !1, l = !1;
          break;
        }
      }
    else
      n = !0, l = !0;
    var g = e[0];
    return {
      type: "smash",
      mode: a.mode,
      body: g,
      smashHeight: n,
      smashDepth: l
    };
  },
  htmlBuilder: (r, e) => {
    var t = x.makeSpan([], [U(r.body, e)]);
    if (!r.smashHeight && !r.smashDepth)
      return t;
    if (r.smashHeight && (t.height = 0, t.children))
      for (var a = 0; a < t.children.length; a++)
        t.children[a].height = 0;
    if (r.smashDepth && (t.depth = 0, t.children))
      for (var n = 0; n < t.children.length; n++)
        t.children[n].depth = 0;
    var l = x.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: t
      }]
    }, e);
    return x.makeSpan(["mord"], [l], e);
  },
  mathmlBuilder: (r, e) => {
    var t = new z.MathNode("mpadded", [Y(r.body, e)]);
    return r.smashHeight && t.setAttribute("height", "0px"), r.smashDepth && t.setAttribute("depth", "0px"), t;
  }
});
D({
  type: "sqrt",
  names: ["\\sqrt"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler(r, e, t) {
    var {
      parser: a
    } = r, n = t[0], l = e[0];
    return {
      type: "sqrt",
      mode: a.mode,
      body: l,
      index: n
    };
  },
  htmlBuilder(r, e) {
    var t = U(r.body, e.havingCrampedStyle());
    t.height === 0 && (t.height = e.fontMetrics().xHeight), t = x.wrapFragment(t, e);
    var a = e.fontMetrics(), n = a.defaultRuleThickness, l = n;
    e.style.id < E.TEXT.id && (l = e.fontMetrics().xHeight);
    var o = n + l / 4, h = t.height + t.depth + o + n, {
      span: m,
      ruleWidth: f,
      advanceWidth: g
    } = C0.sqrtImage(h, e), b = m.height - f;
    b > t.height + t.depth + o && (o = (o + b - t.height - t.depth) / 2);
    var y = m.height - t.height - o - f;
    t.style.paddingLeft = A(g);
    var w = x.makeVList({
      positionType: "firstBaseline",
      children: [{
        type: "elem",
        elem: t,
        wrapperClasses: ["svg-align"]
      }, {
        type: "kern",
        size: -(t.height + y)
      }, {
        type: "elem",
        elem: m
      }, {
        type: "kern",
        size: f
      }]
    }, e);
    if (r.index) {
      var M = e.havingStyle(E.SCRIPTSCRIPT), k = U(r.index, M, e), C = 0.6 * (w.height - w.depth), B = x.makeVList({
        positionType: "shift",
        positionData: -C,
        children: [{
          type: "elem",
          elem: k
        }]
      }, e), q = x.makeSpan(["root"], [B]);
      return x.makeSpan(["mord", "sqrt"], [q, w], e);
    } else
      return x.makeSpan(["mord", "sqrt"], [w], e);
  },
  mathmlBuilder(r, e) {
    var {
      body: t,
      index: a
    } = r;
    return a ? new z.MathNode("mroot", [Y(t, e), Y(a, e)]) : new z.MathNode("msqrt", [Y(t, e)]);
  }
});
var ur = {
  display: E.DISPLAY,
  text: E.TEXT,
  script: E.SCRIPT,
  scriptscript: E.SCRIPTSCRIPT
};
D({
  type: "styling",
  names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
  props: {
    numArgs: 0,
    allowedInText: !0,
    primitive: !0
  },
  handler(r, e) {
    var {
      breakOnTokenText: t,
      funcName: a,
      parser: n
    } = r, l = n.parseExpression(!0, t), o = a.slice(1, a.length - 5);
    return {
      type: "styling",
      mode: n.mode,
      // Figure out what style to use by pulling out the style from
      // the function name
      style: o,
      body: l
    };
  },
  htmlBuilder(r, e) {
    var t = ur[r.style], a = e.havingStyle(t).withFont("");
    return oa(r.body, a, e);
  },
  mathmlBuilder(r, e) {
    var t = ur[r.style], a = e.havingStyle(t), n = h0(r.body, a), l = new z.MathNode("mstyle", n), o = {
      display: ["0", "true"],
      text: ["0", "false"],
      script: ["1", "false"],
      scriptscript: ["2", "false"]
    }, h = o[r.style];
    return l.setAttribute("scriptlevel", h[0]), l.setAttribute("displaystyle", h[1]), l;
  }
});
var gn = function(e, t) {
  var a = e.base;
  if (a)
    if (a.type === "op") {
      var n = a.limits && (t.style.size === E.DISPLAY.size || a.alwaysHandleSupSub);
      return n ? ee : null;
    } else if (a.type === "operatorname") {
      var l = a.alwaysHandleSupSub && (t.style.size === E.DISPLAY.size || a.limits);
      return l ? sa : null;
    } else {
      if (a.type === "accent")
        return L.isCharacterBox(a.base) ? St : null;
      if (a.type === "horizBrace") {
        var o = !e.sub;
        return o === a.isOver ? na : null;
      } else
        return null;
    }
  else
    return null;
};
U0({
  type: "supsub",
  htmlBuilder(r, e) {
    var t = gn(r, e);
    if (t)
      return t(r, e);
    var {
      base: a,
      sup: n,
      sub: l
    } = r, o = U(a, e), h, m, f = e.fontMetrics(), g = 0, b = 0, y = a && L.isCharacterBox(a);
    if (n) {
      var w = e.havingStyle(e.style.sup());
      h = U(n, w, e), y || (g = o.height - w.fontMetrics().supDrop * w.sizeMultiplier / e.sizeMultiplier);
    }
    if (l) {
      var M = e.havingStyle(e.style.sub());
      m = U(l, M, e), y || (b = o.depth + M.fontMetrics().subDrop * M.sizeMultiplier / e.sizeMultiplier);
    }
    var k;
    e.style === E.DISPLAY ? k = f.sup1 : e.style.cramped ? k = f.sup3 : k = f.sup2;
    var C = e.sizeMultiplier, B = A(0.5 / f.ptPerEm / C), q = null;
    if (m) {
      var H = r.base && r.base.type === "op" && r.base.name && (r.base.name === "\\oiint" || r.base.name === "\\oiiint");
      (o instanceof p0 || H) && (q = A(-o.italic));
    }
    var $;
    if (h && m) {
      g = Math.max(g, k, h.depth + 0.25 * f.xHeight), b = Math.max(b, f.sub2);
      var I = f.defaultRuleThickness, G = 4 * I;
      if (g - h.depth - (m.height - b) < G) {
        b = G - (g - h.depth) + m.height;
        var F = 0.8 * f.xHeight - (g - h.depth);
        F > 0 && (g += F, b -= F);
      }
      var V = [{
        type: "elem",
        elem: m,
        shift: b,
        marginRight: B,
        marginLeft: q
      }, {
        type: "elem",
        elem: h,
        shift: -g,
        marginRight: B
      }];
      $ = x.makeVList({
        positionType: "individualShift",
        children: V
      }, e);
    } else if (m) {
      b = Math.max(b, f.sub1, m.height - 0.8 * f.xHeight);
      var X = [{
        type: "elem",
        elem: m,
        marginLeft: q,
        marginRight: B
      }];
      $ = x.makeVList({
        positionType: "shift",
        positionData: b,
        children: X
      }, e);
    } else if (h)
      g = Math.max(g, k, h.depth + 0.25 * f.xHeight), $ = x.makeVList({
        positionType: "shift",
        positionData: -g,
        children: [{
          type: "elem",
          elem: h,
          marginRight: B
        }]
      }, e);
    else
      throw new Error("supsub must have either sup or sub.");
    var J = ht(o, "right") || "mord";
    return x.makeSpan([J], [o, x.makeSpan(["msupsub"], [$])], e);
  },
  mathmlBuilder(r, e) {
    var t = !1, a, n;
    r.base && r.base.type === "horizBrace" && (n = !!r.sup, n === r.base.isOver && (t = !0, a = r.base.isOver)), r.base && (r.base.type === "op" || r.base.type === "operatorname") && (r.base.parentIsSupSub = !0);
    var l = [Y(r.base, e)];
    r.sub && l.push(Y(r.sub, e)), r.sup && l.push(Y(r.sup, e));
    var o;
    if (t)
      o = a ? "mover" : "munder";
    else if (r.sub)
      if (r.sup) {
        var f = r.base;
        f && f.type === "op" && f.limits && e.style === E.DISPLAY || f && f.type === "operatorname" && f.alwaysHandleSupSub && (e.style === E.DISPLAY || f.limits) ? o = "munderover" : o = "msubsup";
      } else {
        var m = r.base;
        m && m.type === "op" && m.limits && (e.style === E.DISPLAY || m.alwaysHandleSupSub) || m && m.type === "operatorname" && m.alwaysHandleSupSub && (m.limits || e.style === E.DISPLAY) ? o = "munder" : o = "msub";
      }
    else {
      var h = r.base;
      h && h.type === "op" && h.limits && (e.style === E.DISPLAY || h.alwaysHandleSupSub) || h && h.type === "operatorname" && h.alwaysHandleSupSub && (h.limits || e.style === E.DISPLAY) ? o = "mover" : o = "msup";
    }
    return new z.MathNode(o, l);
  }
});
U0({
  type: "atom",
  htmlBuilder(r, e) {
    return x.mathsym(r.text, r.mode, e, ["m" + r.family]);
  },
  mathmlBuilder(r, e) {
    var t = new z.MathNode("mo", [v0(r.text, r.mode)]);
    if (r.family === "bin") {
      var a = wt(r, e);
      a === "bold-italic" && t.setAttribute("mathvariant", a);
    } else
      r.family === "punct" ? t.setAttribute("separator", "true") : (r.family === "open" || r.family === "close") && t.setAttribute("stretchy", "false");
    return t;
  }
});
var ua = {
  mi: "italic",
  mn: "normal",
  mtext: "normal"
};
U0({
  type: "mathord",
  htmlBuilder(r, e) {
    return x.makeOrd(r, e, "mathord");
  },
  mathmlBuilder(r, e) {
    var t = new z.MathNode("mi", [v0(r.text, r.mode, e)]), a = wt(r, e) || "italic";
    return a !== ua[t.type] && t.setAttribute("mathvariant", a), t;
  }
});
U0({
  type: "textord",
  htmlBuilder(r, e) {
    return x.makeOrd(r, e, "textord");
  },
  mathmlBuilder(r, e) {
    var t = v0(r.text, r.mode, e), a = wt(r, e) || "normal", n;
    return r.mode === "text" ? n = new z.MathNode("mtext", [t]) : /[0-9]/.test(r.text) ? n = new z.MathNode("mn", [t]) : r.text === "\\prime" ? n = new z.MathNode("mo", [t]) : n = new z.MathNode("mi", [t]), a !== ua[n.type] && n.setAttribute("mathvariant", a), n;
  }
});
var tt = {
  "\\nobreak": "nobreak",
  "\\allowbreak": "allowbreak"
}, rt = {
  " ": {},
  "\\ ": {},
  "~": {
    className: "nobreak"
  },
  "\\space": {},
  "\\nobreakspace": {
    className: "nobreak"
  }
};
U0({
  type: "spacing",
  htmlBuilder(r, e) {
    if (rt.hasOwnProperty(r.text)) {
      var t = rt[r.text].className || "";
      if (r.mode === "text") {
        var a = x.makeOrd(r, e, "textord");
        return a.classes.push(t), a;
      } else
        return x.makeSpan(["mspace", t], [x.mathsym(r.text, r.mode, e)], e);
    } else {
      if (tt.hasOwnProperty(r.text))
        return x.makeSpan(["mspace", tt[r.text]], [], e);
      throw new T('Unknown type of space "' + r.text + '"');
    }
  },
  mathmlBuilder(r, e) {
    var t;
    if (rt.hasOwnProperty(r.text))
      t = new z.MathNode("mtext", [new z.TextNode(" ")]);
    else {
      if (tt.hasOwnProperty(r.text))
        return new z.MathNode("mspace");
      throw new T('Unknown type of space "' + r.text + '"');
    }
    return t;
  }
});
var hr = () => {
  var r = new z.MathNode("mtd", []);
  return r.setAttribute("width", "50%"), r;
};
U0({
  type: "tag",
  mathmlBuilder(r, e) {
    var t = new z.MathNode("mtable", [new z.MathNode("mtr", [hr(), new z.MathNode("mtd", [F0(r.body, e)]), hr(), new z.MathNode("mtd", [F0(r.tag, e)])])]);
    return t.setAttribute("width", "100%"), t;
  }
});
var mr = {
  "\\text": void 0,
  "\\textrm": "textrm",
  "\\textsf": "textsf",
  "\\texttt": "texttt",
  "\\textnormal": "textrm"
}, cr = {
  "\\textbf": "textbf",
  "\\textmd": "textmd"
}, bn = {
  "\\textit": "textit",
  "\\textup": "textup"
}, dr = (r, e) => {
  var t = r.font;
  return t ? mr[t] ? e.withTextFontFamily(mr[t]) : cr[t] ? e.withTextFontWeight(cr[t]) : e.withTextFontShape(bn[t]) : e;
};
D({
  type: "text",
  names: [
    // Font families
    "\\text",
    "\\textrm",
    "\\textsf",
    "\\texttt",
    "\\textnormal",
    // Font weights
    "\\textbf",
    "\\textmd",
    // Font Shapes
    "\\textit",
    "\\textup"
  ],
  props: {
    numArgs: 1,
    argTypes: ["text"],
    allowedInArgument: !0,
    allowedInText: !0
  },
  handler(r, e) {
    var {
      parser: t,
      funcName: a
    } = r, n = e[0];
    return {
      type: "text",
      mode: t.mode,
      body: _(n),
      font: a
    };
  },
  htmlBuilder(r, e) {
    var t = dr(r, e), a = r0(r.body, t, !0);
    return x.makeSpan(["mord", "text"], a, t);
  },
  mathmlBuilder(r, e) {
    var t = dr(r, e);
    return F0(r.body, t);
  }
});
D({
  type: "underline",
  names: ["\\underline"],
  props: {
    numArgs: 1,
    allowedInText: !0
  },
  handler(r, e) {
    var {
      parser: t
    } = r;
    return {
      type: "underline",
      mode: t.mode,
      body: e[0]
    };
  },
  htmlBuilder(r, e) {
    var t = U(r.body, e), a = x.makeLineSpan("underline-line", e), n = e.fontMetrics().defaultRuleThickness, l = x.makeVList({
      positionType: "top",
      positionData: t.height,
      children: [{
        type: "kern",
        size: n
      }, {
        type: "elem",
        elem: a
      }, {
        type: "kern",
        size: 3 * n
      }, {
        type: "elem",
        elem: t
      }]
    }, e);
    return x.makeSpan(["mord", "underline"], [l], e);
  },
  mathmlBuilder(r, e) {
    var t = new z.MathNode("mo", [new z.TextNode("‾")]);
    t.setAttribute("stretchy", "true");
    var a = new z.MathNode("munder", [Y(r.body, e), t]);
    return a.setAttribute("accentunder", "true"), a;
  }
});
D({
  type: "vcenter",
  names: ["\\vcenter"],
  props: {
    numArgs: 1,
    argTypes: ["original"],
    // In LaTeX, \vcenter can act only on a box.
    allowedInText: !1
  },
  handler(r, e) {
    var {
      parser: t
    } = r;
    return {
      type: "vcenter",
      mode: t.mode,
      body: e[0]
    };
  },
  htmlBuilder(r, e) {
    var t = U(r.body, e), a = e.fontMetrics().axisHeight, n = 0.5 * (t.height - a - (t.depth + a));
    return x.makeVList({
      positionType: "shift",
      positionData: n,
      children: [{
        type: "elem",
        elem: t
      }]
    }, e);
  },
  mathmlBuilder(r, e) {
    return new z.MathNode("mpadded", [Y(r.body, e)], ["vcenter"]);
  }
});
D({
  type: "verb",
  names: ["\\verb"],
  props: {
    numArgs: 0,
    allowedInText: !0
  },
  handler(r, e, t) {
    throw new T("\\verb ended by end of line instead of matching delimiter");
  },
  htmlBuilder(r, e) {
    for (var t = fr(r), a = [], n = e.havingStyle(e.style.text()), l = 0; l < t.length; l++) {
      var o = t[l];
      o === "~" && (o = "\\textasciitilde"), a.push(x.makeSymbol(o, "Typewriter-Regular", r.mode, n, ["mord", "texttt"]));
    }
    return x.makeSpan(["mord", "text"].concat(n.sizingClasses(e)), x.tryCombineChars(a), n);
  },
  mathmlBuilder(r, e) {
    var t = new z.TextNode(fr(r)), a = new z.MathNode("mtext", [t]);
    return a.setAttribute("mathvariant", "monospace"), a;
  }
});
var fr = (r) => r.body.replace(/ /g, r.star ? "␣" : " "), L0 = qr, ha = `[ \r
	]`, yn = "\\\\[a-zA-Z@]+", xn = "\\\\[^\uD800-\uDFFF]", wn = "(" + yn + ")" + ha + "*", kn = `\\\\(
|[ \r	]+
?)[ \r	]*`, ft = "[̀-ͯ]", Sn = new RegExp(ft + "+$"), Mn = "(" + ha + "+)|" + // whitespace
(kn + "|") + // \whitespace
"([!-\\[\\]-‧‪-퟿豈-￿]" + // single codepoint
(ft + "*") + // ...plus accents
"|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
(ft + "*") + // ...plus accents
"|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + // \verb unstarred
("|" + wn) + // \macroName + spaces
("|" + xn + ")");
class pr {
  // Category codes. The lexer only supports comment characters (14) for now.
  // MacroExpander additionally distinguishes active (13).
  constructor(e, t) {
    this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = e, this.settings = t, this.tokenRegex = new RegExp(Mn, "g"), this.catcodes = {
      "%": 14,
      // comment character
      "~": 13
      // active character
    };
  }
  setCatcode(e, t) {
    this.catcodes[e] = t;
  }
  /**
   * This function lexes a single token.
   */
  lex() {
    var e = this.input, t = this.tokenRegex.lastIndex;
    if (t === e.length)
      return new d0("EOF", new s0(this, t, t));
    var a = this.tokenRegex.exec(e);
    if (a === null || a.index !== t)
      throw new T("Unexpected character: '" + e[t] + "'", new d0(e[t], new s0(this, t, t + 1)));
    var n = a[6] || a[3] || (a[2] ? "\\ " : " ");
    if (this.catcodes[n] === 14) {
      var l = e.indexOf(`
`, this.tokenRegex.lastIndex);
      return l === -1 ? (this.tokenRegex.lastIndex = e.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = l + 1, this.lex();
    }
    return new d0(n, new s0(this, t, this.tokenRegex.lastIndex));
  }
}
class zn {
  /**
   * Both arguments are optional.  The first argument is an object of
   * built-in mappings which never change.  The second argument is an object
   * of initial (global-level) mappings, which will constantly change
   * according to any global/top-level `set`s done.
   */
  constructor(e, t) {
    e === void 0 && (e = {}), t === void 0 && (t = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = t, this.builtins = e, this.undefStack = [];
  }
  /**
   * Start a new nested group, affecting future local `set`s.
   */
  beginGroup() {
    this.undefStack.push({});
  }
  /**
   * End current nested group, restoring values before the group began.
   */
  endGroup() {
    if (this.undefStack.length === 0)
      throw new T("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
    var e = this.undefStack.pop();
    for (var t in e)
      e.hasOwnProperty(t) && (e[t] == null ? delete this.current[t] : this.current[t] = e[t]);
  }
  /**
   * Ends all currently nested groups (if any), restoring values before the
   * groups began.  Useful in case of an error in the middle of parsing.
   */
  endGroups() {
    for (; this.undefStack.length > 0; )
      this.endGroup();
  }
  /**
   * Detect whether `name` has a definition.  Equivalent to
   * `get(name) != null`.
   */
  has(e) {
    return this.current.hasOwnProperty(e) || this.builtins.hasOwnProperty(e);
  }
  /**
   * Get the current value of a name, or `undefined` if there is no value.
   *
   * Note: Do not use `if (namespace.get(...))` to detect whether a macro
   * is defined, as the definition may be the empty string which evaluates
   * to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
   * `if (namespace.has(...))`.
   */
  get(e) {
    return this.current.hasOwnProperty(e) ? this.current[e] : this.builtins[e];
  }
  /**
   * Set the current value of a name, and optionally set it globally too.
   * Local set() sets the current value and (when appropriate) adds an undo
   * operation to the undo stack.  Global set() may change the undo
   * operation at every level, so takes time linear in their number.
   * A value of undefined means to delete existing definitions.
   */
  set(e, t, a) {
    if (a === void 0 && (a = !1), a) {
      for (var n = 0; n < this.undefStack.length; n++)
        delete this.undefStack[n][e];
      this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = t);
    } else {
      var l = this.undefStack[this.undefStack.length - 1];
      l && !l.hasOwnProperty(e) && (l[e] = this.current[e]);
    }
    t == null ? delete this.current[e] : this.current[e] = t;
  }
}
var Tn = Jr;
c("\\noexpand", function(r) {
  var e = r.popToken();
  return r.isExpandable(e.text) && (e.noexpand = !0, e.treatAsRelax = !0), {
    tokens: [e],
    numArgs: 0
  };
});
c("\\expandafter", function(r) {
  var e = r.popToken();
  return r.expandOnce(!0), {
    tokens: [e],
    numArgs: 0
  };
});
c("\\@firstoftwo", function(r) {
  var e = r.consumeArgs(2);
  return {
    tokens: e[0],
    numArgs: 0
  };
});
c("\\@secondoftwo", function(r) {
  var e = r.consumeArgs(2);
  return {
    tokens: e[1],
    numArgs: 0
  };
});
c("\\@ifnextchar", function(r) {
  var e = r.consumeArgs(3);
  r.consumeSpaces();
  var t = r.future();
  return e[0].length === 1 && e[0][0].text === t.text ? {
    tokens: e[1],
    numArgs: 0
  } : {
    tokens: e[2],
    numArgs: 0
  };
});
c("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
c("\\TextOrMath", function(r) {
  var e = r.consumeArgs(2);
  return r.mode === "text" ? {
    tokens: e[0],
    numArgs: 0
  } : {
    tokens: e[1],
    numArgs: 0
  };
});
var vr = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
c("\\char", function(r) {
  var e = r.popToken(), t, a = "";
  if (e.text === "'")
    t = 8, e = r.popToken();
  else if (e.text === '"')
    t = 16, e = r.popToken();
  else if (e.text === "`")
    if (e = r.popToken(), e.text[0] === "\\")
      a = e.text.charCodeAt(1);
    else {
      if (e.text === "EOF")
        throw new T("\\char` missing argument");
      a = e.text.charCodeAt(0);
    }
  else
    t = 10;
  if (t) {
    if (a = vr[e.text], a == null || a >= t)
      throw new T("Invalid base-" + t + " digit " + e.text);
    for (var n; (n = vr[r.future().text]) != null && n < t; )
      a *= t, a += n, r.popToken();
  }
  return "\\@char{" + a + "}";
});
var qt = (r, e, t) => {
  var a = r.consumeArg().tokens;
  if (a.length !== 1)
    throw new T("\\newcommand's first argument must be a macro name");
  var n = a[0].text, l = r.isDefined(n);
  if (l && !e)
    throw new T("\\newcommand{" + n + "} attempting to redefine " + (n + "; use \\renewcommand"));
  if (!l && !t)
    throw new T("\\renewcommand{" + n + "} when command " + n + " does not yet exist; use \\newcommand");
  var o = 0;
  if (a = r.consumeArg().tokens, a.length === 1 && a[0].text === "[") {
    for (var h = "", m = r.expandNextToken(); m.text !== "]" && m.text !== "EOF"; )
      h += m.text, m = r.expandNextToken();
    if (!h.match(/^\s*[0-9]+\s*$/))
      throw new T("Invalid number of arguments: " + h);
    o = parseInt(h), a = r.consumeArg().tokens;
  }
  return r.macros.set(n, {
    tokens: a,
    numArgs: o
  }), "";
};
c("\\newcommand", (r) => qt(r, !1, !0));
c("\\renewcommand", (r) => qt(r, !0, !1));
c("\\providecommand", (r) => qt(r, !0, !0));
c("\\message", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.log(e.reverse().map((t) => t.text).join("")), "";
});
c("\\errmessage", (r) => {
  var e = r.consumeArgs(1)[0];
  return console.error(e.reverse().map((t) => t.text).join("")), "";
});
c("\\show", (r) => {
  var e = r.popToken(), t = e.text;
  return console.log(e, r.macros.get(t), L0[t], W.math[t], W.text[t]), "";
});
c("\\bgroup", "{");
c("\\egroup", "}");
c("~", "\\nobreakspace");
c("\\lq", "`");
c("\\rq", "'");
c("\\aa", "\\r a");
c("\\AA", "\\r A");
c("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
c("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
c("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
c("ℬ", "\\mathscr{B}");
c("ℰ", "\\mathscr{E}");
c("ℱ", "\\mathscr{F}");
c("ℋ", "\\mathscr{H}");
c("ℐ", "\\mathscr{I}");
c("ℒ", "\\mathscr{L}");
c("ℳ", "\\mathscr{M}");
c("ℛ", "\\mathscr{R}");
c("ℭ", "\\mathfrak{C}");
c("ℌ", "\\mathfrak{H}");
c("ℨ", "\\mathfrak{Z}");
c("\\Bbbk", "\\Bbb{k}");
c("·", "\\cdotp");
c("\\llap", "\\mathllap{\\textrm{#1}}");
c("\\rlap", "\\mathrlap{\\textrm{#1}}");
c("\\clap", "\\mathclap{\\textrm{#1}}");
c("\\mathstrut", "\\vphantom{(}");
c("\\underbar", "\\underline{\\text{#1}}");
c("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
c("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
c("\\ne", "\\neq");
c("≠", "\\neq");
c("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}");
c("∉", "\\notin");
c("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}");
c("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
c("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
c("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
c("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}");
c("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
c("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
c("⟂", "\\perp");
c("‼", "\\mathclose{!\\mkern-0.8mu!}");
c("∌", "\\notni");
c("⌜", "\\ulcorner");
c("⌝", "\\urcorner");
c("⌞", "\\llcorner");
c("⌟", "\\lrcorner");
c("©", "\\copyright");
c("®", "\\textregistered");
c("️", "\\textregistered");
c("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
c("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
c("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
c("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
c("\\vdots", "\\mathord{\\varvdots\\rule{0pt}{15pt}}");
c("⋮", "\\vdots");
c("\\varGamma", "\\mathit{\\Gamma}");
c("\\varDelta", "\\mathit{\\Delta}");
c("\\varTheta", "\\mathit{\\Theta}");
c("\\varLambda", "\\mathit{\\Lambda}");
c("\\varXi", "\\mathit{\\Xi}");
c("\\varPi", "\\mathit{\\Pi}");
c("\\varSigma", "\\mathit{\\Sigma}");
c("\\varUpsilon", "\\mathit{\\Upsilon}");
c("\\varPhi", "\\mathit{\\Phi}");
c("\\varPsi", "\\mathit{\\Psi}");
c("\\varOmega", "\\mathit{\\Omega}");
c("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
c("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
c("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
c("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
c("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
c("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
var gr = {
  ",": "\\dotsc",
  "\\not": "\\dotsb",
  // \keybin@ checks for the following:
  "+": "\\dotsb",
  "=": "\\dotsb",
  "<": "\\dotsb",
  ">": "\\dotsb",
  "-": "\\dotsb",
  "*": "\\dotsb",
  ":": "\\dotsb",
  // Symbols whose definition starts with \DOTSB:
  "\\DOTSB": "\\dotsb",
  "\\coprod": "\\dotsb",
  "\\bigvee": "\\dotsb",
  "\\bigwedge": "\\dotsb",
  "\\biguplus": "\\dotsb",
  "\\bigcap": "\\dotsb",
  "\\bigcup": "\\dotsb",
  "\\prod": "\\dotsb",
  "\\sum": "\\dotsb",
  "\\bigotimes": "\\dotsb",
  "\\bigoplus": "\\dotsb",
  "\\bigodot": "\\dotsb",
  "\\bigsqcup": "\\dotsb",
  "\\And": "\\dotsb",
  "\\longrightarrow": "\\dotsb",
  "\\Longrightarrow": "\\dotsb",
  "\\longleftarrow": "\\dotsb",
  "\\Longleftarrow": "\\dotsb",
  "\\longleftrightarrow": "\\dotsb",
  "\\Longleftrightarrow": "\\dotsb",
  "\\mapsto": "\\dotsb",
  "\\longmapsto": "\\dotsb",
  "\\hookrightarrow": "\\dotsb",
  "\\doteq": "\\dotsb",
  // Symbols whose definition starts with \mathbin:
  "\\mathbin": "\\dotsb",
  // Symbols whose definition starts with \mathrel:
  "\\mathrel": "\\dotsb",
  "\\relbar": "\\dotsb",
  "\\Relbar": "\\dotsb",
  "\\xrightarrow": "\\dotsb",
  "\\xleftarrow": "\\dotsb",
  // Symbols whose definition starts with \DOTSI:
  "\\DOTSI": "\\dotsi",
  "\\int": "\\dotsi",
  "\\oint": "\\dotsi",
  "\\iint": "\\dotsi",
  "\\iiint": "\\dotsi",
  "\\iiiint": "\\dotsi",
  "\\idotsint": "\\dotsi",
  // Symbols whose definition starts with \DOTSX:
  "\\DOTSX": "\\dotsx"
};
c("\\dots", function(r) {
  var e = "\\dotso", t = r.expandAfterFuture().text;
  return t in gr ? e = gr[t] : (t.substr(0, 4) === "\\not" || t in W.math && L.contains(["bin", "rel"], W.math[t].group)) && (e = "\\dotsb"), e;
});
var Et = {
  // \rightdelim@ checks for the following:
  ")": !0,
  "]": !0,
  "\\rbrack": !0,
  "\\}": !0,
  "\\rbrace": !0,
  "\\rangle": !0,
  "\\rceil": !0,
  "\\rfloor": !0,
  "\\rgroup": !0,
  "\\rmoustache": !0,
  "\\right": !0,
  "\\bigr": !0,
  "\\biggr": !0,
  "\\Bigr": !0,
  "\\Biggr": !0,
  // \extra@ also tests for the following:
  $: !0,
  // \extrap@ checks for the following:
  ";": !0,
  ".": !0,
  ",": !0
};
c("\\dotso", function(r) {
  var e = r.future().text;
  return e in Et ? "\\ldots\\," : "\\ldots";
});
c("\\dotsc", function(r) {
  var e = r.future().text;
  return e in Et && e !== "," ? "\\ldots\\," : "\\ldots";
});
c("\\cdots", function(r) {
  var e = r.future().text;
  return e in Et ? "\\@cdots\\," : "\\@cdots";
});
c("\\dotsb", "\\cdots");
c("\\dotsm", "\\cdots");
c("\\dotsi", "\\!\\cdots");
c("\\dotsx", "\\ldots\\,");
c("\\DOTSI", "\\relax");
c("\\DOTSB", "\\relax");
c("\\DOTSX", "\\relax");
c("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
c("\\,", "\\tmspace+{3mu}{.1667em}");
c("\\thinspace", "\\,");
c("\\>", "\\mskip{4mu}");
c("\\:", "\\tmspace+{4mu}{.2222em}");
c("\\medspace", "\\:");
c("\\;", "\\tmspace+{5mu}{.2777em}");
c("\\thickspace", "\\;");
c("\\!", "\\tmspace-{3mu}{.1667em}");
c("\\negthinspace", "\\!");
c("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
c("\\negthickspace", "\\tmspace-{5mu}{.277em}");
c("\\enspace", "\\kern.5em ");
c("\\enskip", "\\hskip.5em\\relax");
c("\\quad", "\\hskip1em\\relax");
c("\\qquad", "\\hskip2em\\relax");
c("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
c("\\tag@paren", "\\tag@literal{({#1})}");
c("\\tag@literal", (r) => {
  if (r.macros.get("\\df@tag"))
    throw new T("Multiple \\tag");
  return "\\gdef\\df@tag{\\text{#1}}";
});
c("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
c("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
c("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
c("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
c("\\pmb", "\\html@mathml{\\@binrel{#1}{\\mathrlap{#1}\\kern0.5px#1}}{\\mathbf{#1}}");
c("\\newline", "\\\\\\relax");
c("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var ma = A(y0["Main-Regular"]["T".charCodeAt(0)][1] - 0.7 * y0["Main-Regular"]["A".charCodeAt(0)][1]);
c("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + ma + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
c("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + ma + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
c("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
c("\\@hspace", "\\hskip #1\\relax");
c("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
c("\\ordinarycolon", ":");
c("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
c("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
c("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
c("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
c("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
c("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
c("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
c("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
c("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
c("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
c("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
c("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
c("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
c("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
c("∷", "\\dblcolon");
c("∹", "\\eqcolon");
c("≔", "\\coloneqq");
c("≕", "\\eqqcolon");
c("⩴", "\\Coloneqq");
c("\\ratio", "\\vcentcolon");
c("\\coloncolon", "\\dblcolon");
c("\\colonequals", "\\coloneqq");
c("\\coloncolonequals", "\\Coloneqq");
c("\\equalscolon", "\\eqqcolon");
c("\\equalscoloncolon", "\\Eqqcolon");
c("\\colonminus", "\\coloneq");
c("\\coloncolonminus", "\\Coloneq");
c("\\minuscolon", "\\eqcolon");
c("\\minuscoloncolon", "\\Eqcolon");
c("\\coloncolonapprox", "\\Colonapprox");
c("\\coloncolonsim", "\\Colonsim");
c("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
c("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
c("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
c("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
c("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
c("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
c("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
c("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
c("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
c("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
c("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
c("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
c("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
c("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
c("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
c("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
c("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
c("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
c("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
c("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
c("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
c("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
c("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
c("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
c("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
c("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
c("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
c("\\imath", "\\html@mathml{\\@imath}{ı}");
c("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
c("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}");
c("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}");
c("⟦", "\\llbracket");
c("⟧", "\\rrbracket");
c("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}");
c("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}");
c("⦃", "\\lBrace");
c("⦄", "\\rBrace");
c("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}");
c("⦵", "\\minuso");
c("\\darr", "\\downarrow");
c("\\dArr", "\\Downarrow");
c("\\Darr", "\\Downarrow");
c("\\lang", "\\langle");
c("\\rang", "\\rangle");
c("\\uarr", "\\uparrow");
c("\\uArr", "\\Uparrow");
c("\\Uarr", "\\Uparrow");
c("\\N", "\\mathbb{N}");
c("\\R", "\\mathbb{R}");
c("\\Z", "\\mathbb{Z}");
c("\\alef", "\\aleph");
c("\\alefsym", "\\aleph");
c("\\Alpha", "\\mathrm{A}");
c("\\Beta", "\\mathrm{B}");
c("\\bull", "\\bullet");
c("\\Chi", "\\mathrm{X}");
c("\\clubs", "\\clubsuit");
c("\\cnums", "\\mathbb{C}");
c("\\Complex", "\\mathbb{C}");
c("\\Dagger", "\\ddagger");
c("\\diamonds", "\\diamondsuit");
c("\\empty", "\\emptyset");
c("\\Epsilon", "\\mathrm{E}");
c("\\Eta", "\\mathrm{H}");
c("\\exist", "\\exists");
c("\\harr", "\\leftrightarrow");
c("\\hArr", "\\Leftrightarrow");
c("\\Harr", "\\Leftrightarrow");
c("\\hearts", "\\heartsuit");
c("\\image", "\\Im");
c("\\infin", "\\infty");
c("\\Iota", "\\mathrm{I}");
c("\\isin", "\\in");
c("\\Kappa", "\\mathrm{K}");
c("\\larr", "\\leftarrow");
c("\\lArr", "\\Leftarrow");
c("\\Larr", "\\Leftarrow");
c("\\lrarr", "\\leftrightarrow");
c("\\lrArr", "\\Leftrightarrow");
c("\\Lrarr", "\\Leftrightarrow");
c("\\Mu", "\\mathrm{M}");
c("\\natnums", "\\mathbb{N}");
c("\\Nu", "\\mathrm{N}");
c("\\Omicron", "\\mathrm{O}");
c("\\plusmn", "\\pm");
c("\\rarr", "\\rightarrow");
c("\\rArr", "\\Rightarrow");
c("\\Rarr", "\\Rightarrow");
c("\\real", "\\Re");
c("\\reals", "\\mathbb{R}");
c("\\Reals", "\\mathbb{R}");
c("\\Rho", "\\mathrm{P}");
c("\\sdot", "\\cdot");
c("\\sect", "\\S");
c("\\spades", "\\spadesuit");
c("\\sub", "\\subset");
c("\\sube", "\\subseteq");
c("\\supe", "\\supseteq");
c("\\Tau", "\\mathrm{T}");
c("\\thetasym", "\\vartheta");
c("\\weierp", "\\wp");
c("\\Zeta", "\\mathrm{Z}");
c("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
c("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
c("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
c("\\bra", "\\mathinner{\\langle{#1}|}");
c("\\ket", "\\mathinner{|{#1}\\rangle}");
c("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
c("\\Bra", "\\left\\langle#1\\right|");
c("\\Ket", "\\left|#1\\right\\rangle");
var ca = (r) => (e) => {
  var t = e.consumeArg().tokens, a = e.consumeArg().tokens, n = e.consumeArg().tokens, l = e.consumeArg().tokens, o = e.macros.get("|"), h = e.macros.get("\\|");
  e.macros.beginGroup();
  var m = (b) => (y) => {
    r && (y.macros.set("|", o), n.length && y.macros.set("\\|", h));
    var w = b;
    if (!b && n.length) {
      var M = y.future();
      M.text === "|" && (y.popToken(), w = !0);
    }
    return {
      tokens: w ? n : a,
      numArgs: 0
    };
  };
  e.macros.set("|", m(!1)), n.length && e.macros.set("\\|", m(!0));
  var f = e.consumeArg().tokens, g = e.expandTokens([
    ...l,
    ...f,
    ...t
    // reversed
  ]);
  return e.macros.endGroup(), {
    tokens: g.reverse(),
    numArgs: 0
  };
};
c("\\bra@ket", ca(!1));
c("\\bra@set", ca(!0));
c("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
c("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
c("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
c("\\angln", "{\\angl n}");
c("\\blue", "\\textcolor{##6495ed}{#1}");
c("\\orange", "\\textcolor{##ffa500}{#1}");
c("\\pink", "\\textcolor{##ff00af}{#1}");
c("\\red", "\\textcolor{##df0030}{#1}");
c("\\green", "\\textcolor{##28ae7b}{#1}");
c("\\gray", "\\textcolor{gray}{#1}");
c("\\purple", "\\textcolor{##9d38bd}{#1}");
c("\\blueA", "\\textcolor{##ccfaff}{#1}");
c("\\blueB", "\\textcolor{##80f6ff}{#1}");
c("\\blueC", "\\textcolor{##63d9ea}{#1}");
c("\\blueD", "\\textcolor{##11accd}{#1}");
c("\\blueE", "\\textcolor{##0c7f99}{#1}");
c("\\tealA", "\\textcolor{##94fff5}{#1}");
c("\\tealB", "\\textcolor{##26edd5}{#1}");
c("\\tealC", "\\textcolor{##01d1c1}{#1}");
c("\\tealD", "\\textcolor{##01a995}{#1}");
c("\\tealE", "\\textcolor{##208170}{#1}");
c("\\greenA", "\\textcolor{##b6ffb0}{#1}");
c("\\greenB", "\\textcolor{##8af281}{#1}");
c("\\greenC", "\\textcolor{##74cf70}{#1}");
c("\\greenD", "\\textcolor{##1fab54}{#1}");
c("\\greenE", "\\textcolor{##0d923f}{#1}");
c("\\goldA", "\\textcolor{##ffd0a9}{#1}");
c("\\goldB", "\\textcolor{##ffbb71}{#1}");
c("\\goldC", "\\textcolor{##ff9c39}{#1}");
c("\\goldD", "\\textcolor{##e07d10}{#1}");
c("\\goldE", "\\textcolor{##a75a05}{#1}");
c("\\redA", "\\textcolor{##fca9a9}{#1}");
c("\\redB", "\\textcolor{##ff8482}{#1}");
c("\\redC", "\\textcolor{##f9685d}{#1}");
c("\\redD", "\\textcolor{##e84d39}{#1}");
c("\\redE", "\\textcolor{##bc2612}{#1}");
c("\\maroonA", "\\textcolor{##ffbde0}{#1}");
c("\\maroonB", "\\textcolor{##ff92c6}{#1}");
c("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
c("\\maroonD", "\\textcolor{##ca337c}{#1}");
c("\\maroonE", "\\textcolor{##9e034e}{#1}");
c("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
c("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
c("\\purpleC", "\\textcolor{##aa87ff}{#1}");
c("\\purpleD", "\\textcolor{##7854ab}{#1}");
c("\\purpleE", "\\textcolor{##543b78}{#1}");
c("\\mintA", "\\textcolor{##f5f9e8}{#1}");
c("\\mintB", "\\textcolor{##edf2df}{#1}");
c("\\mintC", "\\textcolor{##e0e5cc}{#1}");
c("\\grayA", "\\textcolor{##f6f7f7}{#1}");
c("\\grayB", "\\textcolor{##f0f1f2}{#1}");
c("\\grayC", "\\textcolor{##e3e5e6}{#1}");
c("\\grayD", "\\textcolor{##d6d8da}{#1}");
c("\\grayE", "\\textcolor{##babec2}{#1}");
c("\\grayF", "\\textcolor{##888d93}{#1}");
c("\\grayG", "\\textcolor{##626569}{#1}");
c("\\grayH", "\\textcolor{##3b3e40}{#1}");
c("\\grayI", "\\textcolor{##21242c}{#1}");
c("\\kaBlue", "\\textcolor{##314453}{#1}");
c("\\kaGreen", "\\textcolor{##71B307}{#1}");
var da = {
  "^": !0,
  // Parser.js
  _: !0,
  // Parser.js
  "\\limits": !0,
  // Parser.js
  "\\nolimits": !0
  // Parser.js
};
class An {
  constructor(e, t, a) {
    this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = t, this.expansionCount = 0, this.feed(e), this.macros = new zn(Tn, t.macros), this.mode = a, this.stack = [];
  }
  /**
   * Feed a new input string to the same MacroExpander
   * (with existing macros etc.).
   */
  feed(e) {
    this.lexer = new pr(e, this.settings);
  }
  /**
   * Switches between "text" and "math" modes.
   */
  switchMode(e) {
    this.mode = e;
  }
  /**
   * Start a new group nesting within all namespaces.
   */
  beginGroup() {
    this.macros.beginGroup();
  }
  /**
   * End current group nesting within all namespaces.
   */
  endGroup() {
    this.macros.endGroup();
  }
  /**
   * Ends all currently nested groups (if any), restoring values before the
   * groups began.  Useful in case of an error in the middle of parsing.
   */
  endGroups() {
    this.macros.endGroups();
  }
  /**
   * Returns the topmost token on the stack, without expanding it.
   * Similar in behavior to TeX's `\futurelet`.
   */
  future() {
    return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
  }
  /**
   * Remove and return the next unexpanded token.
   */
  popToken() {
    return this.future(), this.stack.pop();
  }
  /**
   * Add a given token to the token stack.  In particular, this get be used
   * to put back a token returned from one of the other methods.
   */
  pushToken(e) {
    this.stack.push(e);
  }
  /**
   * Append an array of tokens to the token stack.
   */
  pushTokens(e) {
    this.stack.push(...e);
  }
  /**
   * Find an macro argument without expanding tokens and append the array of
   * tokens to the token stack. Uses Token as a container for the result.
   */
  scanArgument(e) {
    var t, a, n;
    if (e) {
      if (this.consumeSpaces(), this.future().text !== "[")
        return null;
      t = this.popToken(), {
        tokens: n,
        end: a
      } = this.consumeArg(["]"]);
    } else
      ({
        tokens: n,
        start: t,
        end: a
      } = this.consumeArg());
    return this.pushToken(new d0("EOF", a.loc)), this.pushTokens(n), t.range(a, "");
  }
  /**
   * Consume all following space tokens, without expansion.
   */
  consumeSpaces() {
    for (; ; ) {
      var e = this.future();
      if (e.text === " ")
        this.stack.pop();
      else
        break;
    }
  }
  /**
   * Consume an argument from the token stream, and return the resulting array
   * of tokens and start/end token.
   */
  consumeArg(e) {
    var t = [], a = e && e.length > 0;
    a || this.consumeSpaces();
    var n = this.future(), l, o = 0, h = 0;
    do {
      if (l = this.popToken(), t.push(l), l.text === "{")
        ++o;
      else if (l.text === "}") {
        if (--o, o === -1)
          throw new T("Extra }", l);
      } else if (l.text === "EOF")
        throw new T("Unexpected end of input in a macro argument, expected '" + (e && a ? e[h] : "}") + "'", l);
      if (e && a)
        if ((o === 0 || o === 1 && e[h] === "{") && l.text === e[h]) {
          if (++h, h === e.length) {
            t.splice(-h, h);
            break;
          }
        } else
          h = 0;
    } while (o !== 0 || a);
    return n.text === "{" && t[t.length - 1].text === "}" && (t.pop(), t.shift()), t.reverse(), {
      tokens: t,
      start: n,
      end: l
    };
  }
  /**
   * Consume the specified number of (delimited) arguments from the token
   * stream and return the resulting array of arguments.
   */
  consumeArgs(e, t) {
    if (t) {
      if (t.length !== e + 1)
        throw new T("The length of delimiters doesn't match the number of args!");
      for (var a = t[0], n = 0; n < a.length; n++) {
        var l = this.popToken();
        if (a[n] !== l.text)
          throw new T("Use of the macro doesn't match its definition", l);
      }
    }
    for (var o = [], h = 0; h < e; h++)
      o.push(this.consumeArg(t && t[h + 1]).tokens);
    return o;
  }
  /**
   * Expand the next token only once if possible.
   *
   * If the token is expanded, the resulting tokens will be pushed onto
   * the stack in reverse order and will be returned as an array,
   * also in reverse order.
   *
   * If not, the next token will be returned without removing it
   * from the stack.  This case can be detected by a `Token` return value
   * instead of an `Array` return value.
   *
   * In either case, the next token will be on the top of the stack,
   * or the stack will be empty.
   *
   * Used to implement `expandAfterFuture` and `expandNextToken`.
   *
   * If expandableOnly, only expandable tokens are expanded and
   * an undefined control sequence results in an error.
   */
  expandOnce(e) {
    var t = this.popToken(), a = t.text, n = t.noexpand ? null : this._getExpansion(a);
    if (n == null || e && n.unexpandable) {
      if (e && n == null && a[0] === "\\" && !this.isDefined(a))
        throw new T("Undefined control sequence: " + a);
      return this.pushToken(t), t;
    }
    if (this.expansionCount++, this.expansionCount > this.settings.maxExpand)
      throw new T("Too many expansions: infinite loop or need to increase maxExpand setting");
    var l = n.tokens, o = this.consumeArgs(n.numArgs, n.delimiters);
    if (n.numArgs) {
      l = l.slice();
      for (var h = l.length - 1; h >= 0; --h) {
        var m = l[h];
        if (m.text === "#") {
          if (h === 0)
            throw new T("Incomplete placeholder at end of macro body", m);
          if (m = l[--h], m.text === "#")
            l.splice(h + 1, 1);
          else if (/^[1-9]$/.test(m.text))
            l.splice(h, 2, ...o[+m.text - 1]);
          else
            throw new T("Not a valid argument number", m);
        }
      }
    }
    return this.pushTokens(l), l;
  }
  /**
   * Expand the next token only once (if possible), and return the resulting
   * top token on the stack (without removing anything from the stack).
   * Similar in behavior to TeX's `\expandafter\futurelet`.
   * Equivalent to expandOnce() followed by future().
   */
  expandAfterFuture() {
    return this.expandOnce(), this.future();
  }
  /**
   * Recursively expand first token, then return first non-expandable token.
   */
  expandNextToken() {
    for (; ; ) {
      var e = this.expandOnce();
      if (e instanceof d0)
        return e.treatAsRelax && (e.text = "\\relax"), this.stack.pop();
    }
    throw new Error();
  }
  /**
   * Fully expand the given macro name and return the resulting list of
   * tokens, or return `undefined` if no such macro is defined.
   */
  expandMacro(e) {
    return this.macros.has(e) ? this.expandTokens([new d0(e)]) : void 0;
  }
  /**
   * Fully expand the given token stream and return the resulting list of
   * tokens.  Note that the input tokens are in reverse order, but the
   * output tokens are in forward order.
   */
  expandTokens(e) {
    var t = [], a = this.stack.length;
    for (this.pushTokens(e); this.stack.length > a; ) {
      var n = this.expandOnce(!0);
      n instanceof d0 && (n.treatAsRelax && (n.noexpand = !1, n.treatAsRelax = !1), t.push(this.stack.pop()));
    }
    return t;
  }
  /**
   * Fully expand the given macro name and return the result as a string,
   * or return `undefined` if no such macro is defined.
   */
  expandMacroAsText(e) {
    var t = this.expandMacro(e);
    return t && t.map((a) => a.text).join("");
  }
  /**
   * Returns the expanded macro as a reversed array of tokens and a macro
   * argument count.  Or returns `null` if no such macro.
   */
  _getExpansion(e) {
    var t = this.macros.get(e);
    if (t == null)
      return t;
    if (e.length === 1) {
      var a = this.lexer.catcodes[e];
      if (a != null && a !== 13)
        return;
    }
    var n = typeof t == "function" ? t(this) : t;
    if (typeof n == "string") {
      var l = 0;
      if (n.indexOf("#") !== -1)
        for (var o = n.replace(/##/g, ""); o.indexOf("#" + (l + 1)) !== -1; )
          ++l;
      for (var h = new pr(n, this.settings), m = [], f = h.lex(); f.text !== "EOF"; )
        m.push(f), f = h.lex();
      m.reverse();
      var g = {
        tokens: m,
        numArgs: l
      };
      return g;
    }
    return n;
  }
  /**
   * Determine whether a command is currently "defined" (has some
   * functionality), meaning that it's a macro (in the current group),
   * a function, a symbol, or one of the special commands listed in
   * `implicitCommands`.
   */
  isDefined(e) {
    return this.macros.has(e) || L0.hasOwnProperty(e) || W.math.hasOwnProperty(e) || W.text.hasOwnProperty(e) || da.hasOwnProperty(e);
  }
  /**
   * Determine whether a command is expandable.
   */
  isExpandable(e) {
    var t = this.macros.get(e);
    return t != null ? typeof t == "string" || typeof t == "function" || !t.unexpandable : L0.hasOwnProperty(e) && !L0[e].primitive;
  }
}
var br = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/, Se = Object.freeze({
  "₊": "+",
  "₋": "-",
  "₌": "=",
  "₍": "(",
  "₎": ")",
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
  "ₐ": "a",
  "ₑ": "e",
  "ₕ": "h",
  "ᵢ": "i",
  "ⱼ": "j",
  "ₖ": "k",
  "ₗ": "l",
  "ₘ": "m",
  "ₙ": "n",
  "ₒ": "o",
  "ₚ": "p",
  "ᵣ": "r",
  "ₛ": "s",
  "ₜ": "t",
  "ᵤ": "u",
  "ᵥ": "v",
  "ₓ": "x",
  "ᵦ": "β",
  "ᵧ": "γ",
  "ᵨ": "ρ",
  "ᵩ": "ϕ",
  "ᵪ": "χ",
  "⁺": "+",
  "⁻": "-",
  "⁼": "=",
  "⁽": "(",
  "⁾": ")",
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "ᴬ": "A",
  "ᴮ": "B",
  "ᴰ": "D",
  "ᴱ": "E",
  "ᴳ": "G",
  "ᴴ": "H",
  "ᴵ": "I",
  "ᴶ": "J",
  "ᴷ": "K",
  "ᴸ": "L",
  "ᴹ": "M",
  "ᴺ": "N",
  "ᴼ": "O",
  "ᴾ": "P",
  "ᴿ": "R",
  "ᵀ": "T",
  "ᵁ": "U",
  "ⱽ": "V",
  "ᵂ": "W",
  "ᵃ": "a",
  "ᵇ": "b",
  "ᶜ": "c",
  "ᵈ": "d",
  "ᵉ": "e",
  "ᶠ": "f",
  "ᵍ": "g",
  ʰ: "h",
  "ⁱ": "i",
  ʲ: "j",
  "ᵏ": "k",
  ˡ: "l",
  "ᵐ": "m",
  ⁿ: "n",
  "ᵒ": "o",
  "ᵖ": "p",
  ʳ: "r",
  ˢ: "s",
  "ᵗ": "t",
  "ᵘ": "u",
  "ᵛ": "v",
  ʷ: "w",
  ˣ: "x",
  ʸ: "y",
  "ᶻ": "z",
  "ᵝ": "β",
  "ᵞ": "γ",
  "ᵟ": "δ",
  "ᵠ": "ϕ",
  "ᵡ": "χ",
  "ᶿ": "θ"
}), at = {
  "́": {
    text: "\\'",
    math: "\\acute"
  },
  "̀": {
    text: "\\`",
    math: "\\grave"
  },
  "̈": {
    text: '\\"',
    math: "\\ddot"
  },
  "̃": {
    text: "\\~",
    math: "\\tilde"
  },
  "̄": {
    text: "\\=",
    math: "\\bar"
  },
  "̆": {
    text: "\\u",
    math: "\\breve"
  },
  "̌": {
    text: "\\v",
    math: "\\check"
  },
  "̂": {
    text: "\\^",
    math: "\\hat"
  },
  "̇": {
    text: "\\.",
    math: "\\dot"
  },
  "̊": {
    text: "\\r",
    math: "\\mathring"
  },
  "̋": {
    text: "\\H"
  },
  "̧": {
    text: "\\c"
  }
}, yr = {
  á: "á",
  à: "à",
  ä: "ä",
  ǟ: "ǟ",
  ã: "ã",
  ā: "ā",
  ă: "ă",
  ắ: "ắ",
  ằ: "ằ",
  ẵ: "ẵ",
  ǎ: "ǎ",
  â: "â",
  ấ: "ấ",
  ầ: "ầ",
  ẫ: "ẫ",
  ȧ: "ȧ",
  ǡ: "ǡ",
  å: "å",
  ǻ: "ǻ",
  ḃ: "ḃ",
  ć: "ć",
  ḉ: "ḉ",
  č: "č",
  ĉ: "ĉ",
  ċ: "ċ",
  ç: "ç",
  ď: "ď",
  ḋ: "ḋ",
  ḑ: "ḑ",
  é: "é",
  è: "è",
  ë: "ë",
  ẽ: "ẽ",
  ē: "ē",
  ḗ: "ḗ",
  ḕ: "ḕ",
  ĕ: "ĕ",
  ḝ: "ḝ",
  ě: "ě",
  ê: "ê",
  ế: "ế",
  ề: "ề",
  ễ: "ễ",
  ė: "ė",
  ȩ: "ȩ",
  ḟ: "ḟ",
  ǵ: "ǵ",
  ḡ: "ḡ",
  ğ: "ğ",
  ǧ: "ǧ",
  ĝ: "ĝ",
  ġ: "ġ",
  ģ: "ģ",
  ḧ: "ḧ",
  ȟ: "ȟ",
  ĥ: "ĥ",
  ḣ: "ḣ",
  ḩ: "ḩ",
  í: "í",
  ì: "ì",
  ï: "ï",
  ḯ: "ḯ",
  ĩ: "ĩ",
  ī: "ī",
  ĭ: "ĭ",
  ǐ: "ǐ",
  î: "î",
  ǰ: "ǰ",
  ĵ: "ĵ",
  ḱ: "ḱ",
  ǩ: "ǩ",
  ķ: "ķ",
  ĺ: "ĺ",
  ľ: "ľ",
  ļ: "ļ",
  ḿ: "ḿ",
  ṁ: "ṁ",
  ń: "ń",
  ǹ: "ǹ",
  ñ: "ñ",
  ň: "ň",
  ṅ: "ṅ",
  ņ: "ņ",
  ó: "ó",
  ò: "ò",
  ö: "ö",
  ȫ: "ȫ",
  õ: "õ",
  ṍ: "ṍ",
  ṏ: "ṏ",
  ȭ: "ȭ",
  ō: "ō",
  ṓ: "ṓ",
  ṑ: "ṑ",
  ŏ: "ŏ",
  ǒ: "ǒ",
  ô: "ô",
  ố: "ố",
  ồ: "ồ",
  ỗ: "ỗ",
  ȯ: "ȯ",
  ȱ: "ȱ",
  ő: "ő",
  ṕ: "ṕ",
  ṗ: "ṗ",
  ŕ: "ŕ",
  ř: "ř",
  ṙ: "ṙ",
  ŗ: "ŗ",
  ś: "ś",
  ṥ: "ṥ",
  š: "š",
  ṧ: "ṧ",
  ŝ: "ŝ",
  ṡ: "ṡ",
  ş: "ş",
  ẗ: "ẗ",
  ť: "ť",
  ṫ: "ṫ",
  ţ: "ţ",
  ú: "ú",
  ù: "ù",
  ü: "ü",
  ǘ: "ǘ",
  ǜ: "ǜ",
  ǖ: "ǖ",
  ǚ: "ǚ",
  ũ: "ũ",
  ṹ: "ṹ",
  ū: "ū",
  ṻ: "ṻ",
  ŭ: "ŭ",
  ǔ: "ǔ",
  û: "û",
  ů: "ů",
  ű: "ű",
  ṽ: "ṽ",
  ẃ: "ẃ",
  ẁ: "ẁ",
  ẅ: "ẅ",
  ŵ: "ŵ",
  ẇ: "ẇ",
  ẘ: "ẘ",
  ẍ: "ẍ",
  ẋ: "ẋ",
  ý: "ý",
  ỳ: "ỳ",
  ÿ: "ÿ",
  ỹ: "ỹ",
  ȳ: "ȳ",
  ŷ: "ŷ",
  ẏ: "ẏ",
  ẙ: "ẙ",
  ź: "ź",
  ž: "ž",
  ẑ: "ẑ",
  ż: "ż",
  Á: "Á",
  À: "À",
  Ä: "Ä",
  Ǟ: "Ǟ",
  Ã: "Ã",
  Ā: "Ā",
  Ă: "Ă",
  Ắ: "Ắ",
  Ằ: "Ằ",
  Ẵ: "Ẵ",
  Ǎ: "Ǎ",
  Â: "Â",
  Ấ: "Ấ",
  Ầ: "Ầ",
  Ẫ: "Ẫ",
  Ȧ: "Ȧ",
  Ǡ: "Ǡ",
  Å: "Å",
  Ǻ: "Ǻ",
  Ḃ: "Ḃ",
  Ć: "Ć",
  Ḉ: "Ḉ",
  Č: "Č",
  Ĉ: "Ĉ",
  Ċ: "Ċ",
  Ç: "Ç",
  Ď: "Ď",
  Ḋ: "Ḋ",
  Ḑ: "Ḑ",
  É: "É",
  È: "È",
  Ë: "Ë",
  Ẽ: "Ẽ",
  Ē: "Ē",
  Ḗ: "Ḗ",
  Ḕ: "Ḕ",
  Ĕ: "Ĕ",
  Ḝ: "Ḝ",
  Ě: "Ě",
  Ê: "Ê",
  Ế: "Ế",
  Ề: "Ề",
  Ễ: "Ễ",
  Ė: "Ė",
  Ȩ: "Ȩ",
  Ḟ: "Ḟ",
  Ǵ: "Ǵ",
  Ḡ: "Ḡ",
  Ğ: "Ğ",
  Ǧ: "Ǧ",
  Ĝ: "Ĝ",
  Ġ: "Ġ",
  Ģ: "Ģ",
  Ḧ: "Ḧ",
  Ȟ: "Ȟ",
  Ĥ: "Ĥ",
  Ḣ: "Ḣ",
  Ḩ: "Ḩ",
  Í: "Í",
  Ì: "Ì",
  Ï: "Ï",
  Ḯ: "Ḯ",
  Ĩ: "Ĩ",
  Ī: "Ī",
  Ĭ: "Ĭ",
  Ǐ: "Ǐ",
  Î: "Î",
  İ: "İ",
  Ĵ: "Ĵ",
  Ḱ: "Ḱ",
  Ǩ: "Ǩ",
  Ķ: "Ķ",
  Ĺ: "Ĺ",
  Ľ: "Ľ",
  Ļ: "Ļ",
  Ḿ: "Ḿ",
  Ṁ: "Ṁ",
  Ń: "Ń",
  Ǹ: "Ǹ",
  Ñ: "Ñ",
  Ň: "Ň",
  Ṅ: "Ṅ",
  Ņ: "Ņ",
  Ó: "Ó",
  Ò: "Ò",
  Ö: "Ö",
  Ȫ: "Ȫ",
  Õ: "Õ",
  Ṍ: "Ṍ",
  Ṏ: "Ṏ",
  Ȭ: "Ȭ",
  Ō: "Ō",
  Ṓ: "Ṓ",
  Ṑ: "Ṑ",
  Ŏ: "Ŏ",
  Ǒ: "Ǒ",
  Ô: "Ô",
  Ố: "Ố",
  Ồ: "Ồ",
  Ỗ: "Ỗ",
  Ȯ: "Ȯ",
  Ȱ: "Ȱ",
  Ő: "Ő",
  Ṕ: "Ṕ",
  Ṗ: "Ṗ",
  Ŕ: "Ŕ",
  Ř: "Ř",
  Ṙ: "Ṙ",
  Ŗ: "Ŗ",
  Ś: "Ś",
  Ṥ: "Ṥ",
  Š: "Š",
  Ṧ: "Ṧ",
  Ŝ: "Ŝ",
  Ṡ: "Ṡ",
  Ş: "Ş",
  Ť: "Ť",
  Ṫ: "Ṫ",
  Ţ: "Ţ",
  Ú: "Ú",
  Ù: "Ù",
  Ü: "Ü",
  Ǘ: "Ǘ",
  Ǜ: "Ǜ",
  Ǖ: "Ǖ",
  Ǚ: "Ǚ",
  Ũ: "Ũ",
  Ṹ: "Ṹ",
  Ū: "Ū",
  Ṻ: "Ṻ",
  Ŭ: "Ŭ",
  Ǔ: "Ǔ",
  Û: "Û",
  Ů: "Ů",
  Ű: "Ű",
  Ṽ: "Ṽ",
  Ẃ: "Ẃ",
  Ẁ: "Ẁ",
  Ẅ: "Ẅ",
  Ŵ: "Ŵ",
  Ẇ: "Ẇ",
  Ẍ: "Ẍ",
  Ẋ: "Ẋ",
  Ý: "Ý",
  Ỳ: "Ỳ",
  Ÿ: "Ÿ",
  Ỹ: "Ỹ",
  Ȳ: "Ȳ",
  Ŷ: "Ŷ",
  Ẏ: "Ẏ",
  Ź: "Ź",
  Ž: "Ž",
  Ẑ: "Ẑ",
  Ż: "Ż",
  ά: "ά",
  ὰ: "ὰ",
  ᾱ: "ᾱ",
  ᾰ: "ᾰ",
  έ: "έ",
  ὲ: "ὲ",
  ή: "ή",
  ὴ: "ὴ",
  ί: "ί",
  ὶ: "ὶ",
  ϊ: "ϊ",
  ΐ: "ΐ",
  ῒ: "ῒ",
  ῑ: "ῑ",
  ῐ: "ῐ",
  ό: "ό",
  ὸ: "ὸ",
  ύ: "ύ",
  ὺ: "ὺ",
  ϋ: "ϋ",
  ΰ: "ΰ",
  ῢ: "ῢ",
  ῡ: "ῡ",
  ῠ: "ῠ",
  ώ: "ώ",
  ὼ: "ὼ",
  Ύ: "Ύ",
  Ὺ: "Ὺ",
  Ϋ: "Ϋ",
  Ῡ: "Ῡ",
  Ῠ: "Ῠ",
  Ώ: "Ώ",
  Ὼ: "Ὼ"
};
class le {
  constructor(e, t) {
    this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new An(e, t, this.mode), this.settings = t, this.leftrightDepth = 0;
  }
  /**
   * Checks a result to make sure it has the right type, and throws an
   * appropriate error otherwise.
   */
  expect(e, t) {
    if (t === void 0 && (t = !0), this.fetch().text !== e)
      throw new T("Expected '" + e + "', got '" + this.fetch().text + "'", this.fetch());
    t && this.consume();
  }
  /**
   * Discards the current lookahead token, considering it consumed.
   */
  consume() {
    this.nextToken = null;
  }
  /**
   * Return the current lookahead token, or if there isn't one (at the
   * beginning, or if the previous lookahead token was consume()d),
   * fetch the next token as the new lookahead token and return it.
   */
  fetch() {
    return this.nextToken == null && (this.nextToken = this.gullet.expandNextToken()), this.nextToken;
  }
  /**
   * Switches between "text" and "math" modes.
   */
  switchMode(e) {
    this.mode = e, this.gullet.switchMode(e);
  }
  /**
   * Main parsing function, which parses an entire input.
   */
  parse() {
    this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
    try {
      var e = this.parseExpression(!1);
      return this.expect("EOF"), this.settings.globalGroup || this.gullet.endGroup(), e;
    } finally {
      this.gullet.endGroups();
    }
  }
  /**
   * Fully parse a separate sequence of tokens as a separate job.
   * Tokens should be specified in reverse order, as in a MacroDefinition.
   */
  subparse(e) {
    var t = this.nextToken;
    this.consume(), this.gullet.pushToken(new d0("}")), this.gullet.pushTokens(e);
    var a = this.parseExpression(!1);
    return this.expect("}"), this.nextToken = t, a;
  }
  /**
   * Parses an "expression", which is a list of atoms.
   *
   * `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
   *                 happens when functions have higher precendence han infix
   *                 nodes in implicit parses.
   *
   * `breakOnTokenText`: The text of the token that the expression should end
   *                     with, or `null` if something else should end the
   *                     expression.
   */
  parseExpression(e, t) {
    for (var a = []; ; ) {
      this.mode === "math" && this.consumeSpaces();
      var n = this.fetch();
      if (le.endOfExpression.indexOf(n.text) !== -1 || t && n.text === t || e && L0[n.text] && L0[n.text].infix)
        break;
      var l = this.parseAtom(t);
      if (l) {
        if (l.type === "internal")
          continue;
      } else
        break;
      a.push(l);
    }
    return this.mode === "text" && this.formLigatures(a), this.handleInfixNodes(a);
  }
  /**
   * Rewrites infix operators such as \over with corresponding commands such
   * as \frac.
   *
   * There can only be one infix operator per group.  If there's more than one
   * then the expression is ambiguous.  This can be resolved by adding {}.
   */
  handleInfixNodes(e) {
    for (var t = -1, a, n = 0; n < e.length; n++)
      if (e[n].type === "infix") {
        if (t !== -1)
          throw new T("only one infix operator per group", e[n].token);
        t = n, a = e[n].replaceWith;
      }
    if (t !== -1 && a) {
      var l, o, h = e.slice(0, t), m = e.slice(t + 1);
      h.length === 1 && h[0].type === "ordgroup" ? l = h[0] : l = {
        type: "ordgroup",
        mode: this.mode,
        body: h
      }, m.length === 1 && m[0].type === "ordgroup" ? o = m[0] : o = {
        type: "ordgroup",
        mode: this.mode,
        body: m
      };
      var f;
      return a === "\\\\abovefrac" ? f = this.callFunction(a, [l, e[t], o], []) : f = this.callFunction(a, [l, o], []), [f];
    } else
      return e;
  }
  /**
   * Handle a subscript or superscript with nice errors.
   */
  handleSupSubscript(e) {
    var t = this.fetch(), a = t.text;
    this.consume(), this.consumeSpaces();
    var n = this.parseGroup(e);
    if (!n)
      throw new T("Expected group after '" + a + "'", t);
    return n;
  }
  /**
   * Converts the textual input of an unsupported command into a text node
   * contained within a color node whose color is determined by errorColor
   */
  formatUnsupportedCmd(e) {
    for (var t = [], a = 0; a < e.length; a++)
      t.push({
        type: "textord",
        mode: "text",
        text: e[a]
      });
    var n = {
      type: "text",
      mode: this.mode,
      body: t
    }, l = {
      type: "color",
      mode: this.mode,
      color: this.settings.errorColor,
      body: [n]
    };
    return l;
  }
  /**
   * Parses a group with optional super/subscripts.
   */
  parseAtom(e) {
    var t = this.parseGroup("atom", e);
    if (this.mode === "text")
      return t;
    for (var a, n; ; ) {
      this.consumeSpaces();
      var l = this.fetch();
      if (l.text === "\\limits" || l.text === "\\nolimits") {
        if (t && t.type === "op") {
          var o = l.text === "\\limits";
          t.limits = o, t.alwaysHandleSupSub = !0;
        } else if (t && t.type === "operatorname")
          t.alwaysHandleSupSub && (t.limits = l.text === "\\limits");
        else
          throw new T("Limit controls must follow a math operator", l);
        this.consume();
      } else if (l.text === "^") {
        if (a)
          throw new T("Double superscript", l);
        a = this.handleSupSubscript("superscript");
      } else if (l.text === "_") {
        if (n)
          throw new T("Double subscript", l);
        n = this.handleSupSubscript("subscript");
      } else if (l.text === "'") {
        if (a)
          throw new T("Double superscript", l);
        var h = {
          type: "textord",
          mode: this.mode,
          text: "\\prime"
        }, m = [h];
        for (this.consume(); this.fetch().text === "'"; )
          m.push(h), this.consume();
        this.fetch().text === "^" && m.push(this.handleSupSubscript("superscript")), a = {
          type: "ordgroup",
          mode: this.mode,
          body: m
        };
      } else if (Se[l.text]) {
        var f = Se[l.text], g = br.test(l.text);
        for (this.consume(); ; ) {
          var b = this.fetch().text;
          if (!Se[b] || br.test(b) !== g)
            break;
          this.consume(), f += Se[b];
        }
        var y = new le(f, this.settings).parse();
        g ? n = {
          type: "ordgroup",
          mode: "math",
          body: y
        } : a = {
          type: "ordgroup",
          mode: "math",
          body: y
        };
      } else
        break;
    }
    return a || n ? {
      type: "supsub",
      mode: this.mode,
      base: t,
      sup: a,
      sub: n
    } : t;
  }
  /**
   * Parses an entire function, including its base and all of its arguments.
   */
  parseFunction(e, t) {
    var a = this.fetch(), n = a.text, l = L0[n];
    if (!l)
      return null;
    if (this.consume(), t && t !== "atom" && !l.allowedInArgument)
      throw new T("Got function '" + n + "' with no arguments" + (t ? " as " + t : ""), a);
    if (this.mode === "text" && !l.allowedInText)
      throw new T("Can't use function '" + n + "' in text mode", a);
    if (this.mode === "math" && l.allowedInMath === !1)
      throw new T("Can't use function '" + n + "' in math mode", a);
    var {
      args: o,
      optArgs: h
    } = this.parseArguments(n, l);
    return this.callFunction(n, o, h, a, e);
  }
  /**
   * Call a function handler with a suitable context and arguments.
   */
  callFunction(e, t, a, n, l) {
    var o = {
      funcName: e,
      parser: this,
      token: n,
      breakOnTokenText: l
    }, h = L0[e];
    if (h && h.handler)
      return h.handler(o, t, a);
    throw new T("No function handler for " + e);
  }
  /**
   * Parses the arguments of a function or environment
   */
  parseArguments(e, t) {
    var a = t.numArgs + t.numOptionalArgs;
    if (a === 0)
      return {
        args: [],
        optArgs: []
      };
    for (var n = [], l = [], o = 0; o < a; o++) {
      var h = t.argTypes && t.argTypes[o], m = o < t.numOptionalArgs;
      (t.primitive && h == null || // \sqrt expands into primitive if optional argument doesn't exist
      t.type === "sqrt" && o === 1 && l[0] == null) && (h = "primitive");
      var f = this.parseGroupOfType("argument to '" + e + "'", h, m);
      if (m)
        l.push(f);
      else if (f != null)
        n.push(f);
      else
        throw new T("Null argument, please report this as a bug");
    }
    return {
      args: n,
      optArgs: l
    };
  }
  /**
   * Parses a group when the mode is changing.
   */
  parseGroupOfType(e, t, a) {
    switch (t) {
      case "color":
        return this.parseColorGroup(a);
      case "size":
        return this.parseSizeGroup(a);
      case "url":
        return this.parseUrlGroup(a);
      case "math":
      case "text":
        return this.parseArgumentGroup(a, t);
      case "hbox": {
        var n = this.parseArgumentGroup(a, "text");
        return n != null ? {
          type: "styling",
          mode: n.mode,
          body: [n],
          style: "text"
          // simulate \textstyle
        } : null;
      }
      case "raw": {
        var l = this.parseStringGroup("raw", a);
        return l != null ? {
          type: "raw",
          mode: "text",
          string: l.text
        } : null;
      }
      case "primitive": {
        if (a)
          throw new T("A primitive argument cannot be optional");
        var o = this.parseGroup(e);
        if (o == null)
          throw new T("Expected group as " + e, this.fetch());
        return o;
      }
      case "original":
      case null:
      case void 0:
        return this.parseArgumentGroup(a);
      default:
        throw new T("Unknown group type as " + e, this.fetch());
    }
  }
  /**
   * Discard any space tokens, fetching the next non-space token.
   */
  consumeSpaces() {
    for (; this.fetch().text === " "; )
      this.consume();
  }
  /**
   * Parses a group, essentially returning the string formed by the
   * brace-enclosed tokens plus some position information.
   */
  parseStringGroup(e, t) {
    var a = this.gullet.scanArgument(t);
    if (a == null)
      return null;
    for (var n = "", l; (l = this.fetch()).text !== "EOF"; )
      n += l.text, this.consume();
    return this.consume(), a.text = n, a;
  }
  /**
   * Parses a regex-delimited group: the largest sequence of tokens
   * whose concatenated strings match `regex`. Returns the string
   * formed by the tokens plus some position information.
   */
  parseRegexGroup(e, t) {
    for (var a = this.fetch(), n = a, l = "", o; (o = this.fetch()).text !== "EOF" && e.test(l + o.text); )
      n = o, l += n.text, this.consume();
    if (l === "")
      throw new T("Invalid " + t + ": '" + a.text + "'", a);
    return a.range(n, l);
  }
  /**
   * Parses a color description.
   */
  parseColorGroup(e) {
    var t = this.parseStringGroup("color", e);
    if (t == null)
      return null;
    var a = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
    if (!a)
      throw new T("Invalid color: '" + t.text + "'", t);
    var n = a[0];
    return /^[0-9a-f]{6}$/i.test(n) && (n = "#" + n), {
      type: "color-token",
      mode: this.mode,
      color: n
    };
  }
  /**
   * Parses a size specification, consisting of magnitude and unit.
   */
  parseSizeGroup(e) {
    var t, a = !1;
    if (this.gullet.consumeSpaces(), !e && this.gullet.future().text !== "{" ? t = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size") : t = this.parseStringGroup("size", e), !t)
      return null;
    !e && t.text.length === 0 && (t.text = "0pt", a = !0);
    var n = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
    if (!n)
      throw new T("Invalid size: '" + t.text + "'", t);
    var l = {
      number: +(n[1] + n[2]),
      // sign + magnitude, cast to number
      unit: n[3]
    };
    if (!Sr(l))
      throw new T("Invalid unit: '" + l.unit + "'", t);
    return {
      type: "size",
      mode: this.mode,
      value: l,
      isBlank: a
    };
  }
  /**
   * Parses an URL, checking escaped letters and allowed protocols,
   * and setting the catcode of % as an active character (as in \hyperref).
   */
  parseUrlGroup(e) {
    this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
    var t = this.parseStringGroup("url", e);
    if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), t == null)
      return null;
    var a = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
    return {
      type: "url",
      mode: this.mode,
      url: a
    };
  }
  /**
   * Parses an argument with the mode specified.
   */
  parseArgumentGroup(e, t) {
    var a = this.gullet.scanArgument(e);
    if (a == null)
      return null;
    var n = this.mode;
    t && this.switchMode(t), this.gullet.beginGroup();
    var l = this.parseExpression(!1, "EOF");
    this.expect("EOF"), this.gullet.endGroup();
    var o = {
      type: "ordgroup",
      mode: this.mode,
      loc: a.loc,
      body: l
    };
    return t && this.switchMode(n), o;
  }
  /**
   * Parses an ordinary group, which is either a single nucleus (like "x")
   * or an expression in braces (like "{x+y}") or an implicit group, a group
   * that starts at the current position, and ends right before a higher explicit
   * group ends, or at EOF.
   */
  parseGroup(e, t) {
    var a = this.fetch(), n = a.text, l;
    if (n === "{" || n === "\\begingroup") {
      this.consume();
      var o = n === "{" ? "}" : "\\endgroup";
      this.gullet.beginGroup();
      var h = this.parseExpression(!1, o), m = this.fetch();
      this.expect(o), this.gullet.endGroup(), l = {
        type: "ordgroup",
        mode: this.mode,
        loc: s0.range(a, m),
        body: h,
        // A group formed by \begingroup...\endgroup is a semi-simple group
        // which doesn't affect spacing in math mode, i.e., is transparent.
        // https://tex.stackexchange.com/questions/1930/when-should-one-
        // use-begingroup-instead-of-bgroup
        semisimple: n === "\\begingroup" || void 0
      };
    } else if (l = this.parseFunction(t, e) || this.parseSymbol(), l == null && n[0] === "\\" && !da.hasOwnProperty(n)) {
      if (this.settings.throwOnError)
        throw new T("Undefined control sequence: " + n, a);
      l = this.formatUnsupportedCmd(n), this.consume();
    }
    return l;
  }
  /**
   * Form ligature-like combinations of characters for text mode.
   * This includes inputs like "--", "---", "``" and "''".
   * The result will simply replace multiple textord nodes with a single
   * character in each value by a single textord node having multiple
   * characters in its value.  The representation is still ASCII source.
   * The group will be modified in place.
   */
  formLigatures(e) {
    for (var t = e.length - 1, a = 0; a < t; ++a) {
      var n = e[a], l = n.text;
      l === "-" && e[a + 1].text === "-" && (a + 1 < t && e[a + 2].text === "-" ? (e.splice(a, 3, {
        type: "textord",
        mode: "text",
        loc: s0.range(n, e[a + 2]),
        text: "---"
      }), t -= 2) : (e.splice(a, 2, {
        type: "textord",
        mode: "text",
        loc: s0.range(n, e[a + 1]),
        text: "--"
      }), t -= 1)), (l === "'" || l === "`") && e[a + 1].text === l && (e.splice(a, 2, {
        type: "textord",
        mode: "text",
        loc: s0.range(n, e[a + 1]),
        text: l + l
      }), t -= 1);
    }
  }
  /**
   * Parse a single symbol out of the string. Here, we handle single character
   * symbols and special functions like \verb.
   */
  parseSymbol() {
    var e = this.fetch(), t = e.text;
    if (/^\\verb[^a-zA-Z]/.test(t)) {
      this.consume();
      var a = t.slice(5), n = a.charAt(0) === "*";
      if (n && (a = a.slice(1)), a.length < 2 || a.charAt(0) !== a.slice(-1))
        throw new T(`\\verb assertion failed --
                    please report what input caused this bug`);
      return a = a.slice(1, -1), {
        type: "verb",
        mode: "text",
        body: a,
        star: n
      };
    }
    yr.hasOwnProperty(t[0]) && !W[this.mode][t[0]] && (this.settings.strict && this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + t[0] + '" used in math mode', e), t = yr[t[0]] + t.substr(1));
    var l = Sn.exec(t);
    l && (t = t.substring(0, l.index), t === "i" ? t = "ı" : t === "j" && (t = "ȷ"));
    var o;
    if (W[this.mode][t]) {
      this.settings.strict && this.mode === "math" && ut.indexOf(t) >= 0 && this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + t[0] + '" used in math mode', e);
      var h = W[this.mode][t].group, m = s0.range(e), f;
      if (f1.hasOwnProperty(h)) {
        var g = h;
        f = {
          type: "atom",
          mode: this.mode,
          family: g,
          loc: m,
          text: t
        };
      } else
        f = {
          type: h,
          mode: this.mode,
          loc: m,
          text: t
        };
      o = f;
    } else if (t.charCodeAt(0) >= 128)
      this.settings.strict && (kr(t.charCodeAt(0)) ? this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + t[0] + '" used in math mode', e) : this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + t[0] + '"' + (" (" + t.charCodeAt(0) + ")"), e)), o = {
        type: "textord",
        mode: "text",
        loc: s0.range(e),
        text: t
      };
    else
      return null;
    if (this.consume(), l)
      for (var b = 0; b < l[0].length; b++) {
        var y = l[0][b];
        if (!at[y])
          throw new T("Unknown accent ' " + y + "'", e);
        var w = at[y][this.mode] || at[y].text;
        if (!w)
          throw new T("Accent " + y + " unsupported in " + this.mode + " mode", e);
        o = {
          type: "accent",
          mode: this.mode,
          loc: s0.range(e),
          label: w,
          isStretchy: !1,
          isShifty: !0,
          // $FlowFixMe
          base: o
        };
      }
    return o;
  }
}
le.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
var Rt = function(e, t) {
  if (!(typeof e == "string" || e instanceof String))
    throw new TypeError("KaTeX can only parse string typed expression");
  var a = new le(e, t);
  delete a.gullet.macros.current["\\df@tag"];
  var n = a.parse();
  if (delete a.gullet.macros.current["\\current@color"], delete a.gullet.macros.current["\\color"], a.gullet.macros.get("\\df@tag")) {
    if (!t.displayMode)
      throw new T("\\tag works only in display equations");
    n = [{
      type: "tag",
      mode: "text",
      body: n,
      tag: a.subparse([new d0("\\df@tag")])
    }];
  }
  return n;
}, fa = function(e, t, a) {
  t.textContent = "";
  var n = It(e, a).toNode();
  t.appendChild(n);
};
typeof document < "u" && document.compatMode !== "CSS1Compat" && (typeof console < "u" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), fa = function() {
  throw new T("KaTeX doesn't work in quirks mode.");
});
var Bn = function(e, t) {
  var a = It(e, t).toMarkup();
  return a;
}, Cn = function(e, t) {
  var a = new pt(t);
  return Rt(e, a);
}, pa = function(e, t, a) {
  if (a.throwOnError || !(e instanceof T))
    throw e;
  var n = x.makeSpan(["katex-error"], [new p0(t)]);
  return n.setAttribute("title", e.toString()), n.setAttribute("style", "color:" + a.errorColor), n;
}, It = function(e, t) {
  var a = new pt(t);
  try {
    var n = Rt(e, a);
    return H1(n, e, a);
  } catch (l) {
    return pa(l, e, a);
  }
}, Dn = function(e, t) {
  var a = new pt(t);
  try {
    var n = Rt(e, a);
    return O1(n, e, a);
  } catch (l) {
    return pa(l, e, a);
  }
}, va = {
  /**
   * Current KaTeX version
   */
  version: "0.15.6",
  /**
   * Renders the given LaTeX into an HTML+MathML combination, and adds
   * it as a child to the specified DOM node.
   */
  render: fa,
  /**
   * Renders the given LaTeX into an HTML+MathML combination string,
   * for sending to the client.
   */
  renderToString: Bn,
  /**
   * KaTeX error, usually during parsing.
   */
  ParseError: T,
  /**
   * The shema of Settings
   */
  SETTINGS_SCHEMA: ze,
  /**
   * Parses the given LaTeX into KaTeX's internal parse tree structure,
   * without rendering to HTML or MathML.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __parse: Cn,
  /**
   * Renders the given LaTeX into an HTML+MathML internal DOM tree
   * representation, without flattening that representation to a string.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __renderToDomTree: It,
  /**
   * Renders the given LaTeX into an HTML internal DOM tree representation,
   * without MathML and without flattening that representation to a string.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __renderToHTMLTree: Dn,
  /**
   * extends internal font metrics object with a new object
   * each key in the new object represents a font name
  */
  __setFontMetrics: s1,
  /**
   * adds a new symbol to builtin symbols table
   */
  __defineSymbol: i,
  /**
   * adds a new macro to builtin macro list
   */
  __defineMacro: c,
  /**
   * Expose the dom tree node types, which can be useful for type checking nodes.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __domTree: {
    Span: oe,
    Anchor: bt,
    SymbolNode: p0,
    SvgNode: O0,
    PathNode: V0,
    LineNode: ot
  }
};
function Un(r, e) {
  return !!r.children(e).length;
}
function Xn(r) {
  return nt(r.v) + ":" + nt(r.w) + ":" + nt(r.name);
}
var Nn = /:/g;
function nt(r) {
  return r ? String(r).replace(Nn, "\\:") : "";
}
function qn(r, e) {
  e && r.attr("style", e);
}
function Yn(r, e, t) {
  e && r.attr("class", e).attr("class", t + " " + r.attr("class"));
}
function Wn(r, e) {
  var t = e.graph();
  if (za(t)) {
    var a = t.transition;
    if (Ca(a))
      return a(r);
  }
  return r;
}
function En(r, e) {
  var t = r.append("foreignObject").attr("width", "100000"), a = t.append("xhtml:div");
  a.attr("xmlns", "http://www.w3.org/1999/xhtml");
  var n = e.label;
  switch (typeof n) {
    case "function":
      a.insert(n);
      break;
    case "object":
      a.insert(function() {
        return n;
      });
      break;
    default:
      a.html(n);
  }
  qn(a, e.labelStyle), a.style("display", "inline-block"), a.style("white-space", "nowrap");
  var l = a.node().getBoundingClientRect();
  return t.attr("width", l.width).attr("height", l.height), t;
}
const ga = {}, Rn = function(r) {
  const e = Object.keys(r);
  for (const t of e)
    ga[t] = r[t];
}, ba = function(r, e, t, a, n, l) {
  const o = a.select(`[id="${t}"]`);
  Object.keys(r).forEach(function(m) {
    const f = r[m];
    let g = "default";
    f.classes.length > 0 && (g = f.classes.join(" ")), g = g + " flowchart-label";
    const b = it(f.styles);
    let y = f.text !== void 0 ? f.text : f.id, w;
    if (o0.info("vertex", f, f.labelType), f.labelType === "markdown")
      o0.info("vertex", f, f.labelType);
    else if (Aa(Me().flowchart.htmlLabels))
      w = En(o, {
        label: y
      }).node(), w.parentNode.removeChild(w);
    else {
      const B = n.createElementNS("http://www.w3.org/2000/svg", "text");
      B.setAttribute("style", b.labelStyle.replace("color:", "fill:"));
      const q = y.split(xr.lineBreakRegex);
      for (const H of q) {
        const $ = n.createElementNS("http://www.w3.org/2000/svg", "tspan");
        $.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), $.setAttribute("dy", "1em"), $.setAttribute("x", "1"), $.textContent = H, B.appendChild($);
      }
      w = B;
    }
    let M = 0, k = "";
    switch (f.type) {
      case "round":
        M = 5, k = "rect";
        break;
      case "square":
        k = "rect";
        break;
      case "diamond":
        k = "question";
        break;
      case "hexagon":
        k = "hexagon";
        break;
      case "odd":
        k = "rect_left_inv_arrow";
        break;
      case "lean_right":
        k = "lean_right";
        break;
      case "lean_left":
        k = "lean_left";
        break;
      case "trapezoid":
        k = "trapezoid";
        break;
      case "inv_trapezoid":
        k = "inv_trapezoid";
        break;
      case "odd_right":
        k = "rect_left_inv_arrow";
        break;
      case "circle":
        k = "circle";
        break;
      case "ellipse":
        k = "ellipse";
        break;
      case "stadium":
        k = "stadium";
        break;
      case "subroutine":
        k = "subroutine";
        break;
      case "cylinder":
        k = "cylinder";
        break;
      case "group":
        k = "rect";
        break;
      case "doublecircle":
        k = "doublecircle";
        break;
      default:
        k = "rect";
    }
    const C = y.replace(
      /\$\$(.*)\$\$/g,
      (B, q) => va.renderToString(q, { throwOnError: !0, displayMode: !0, output: "mathml" }).replace(/\n/g, " ").replace(/<annotation.*<\/annotation>/g, "")
    );
    e.setNode(f.id, {
      labelStyle: b.labelStyle,
      shape: k,
      labelText: C,
      labelType: f.labelType,
      rx: M,
      ry: M,
      class: g,
      style: b.style,
      id: f.id,
      link: f.link,
      linkTarget: f.linkTarget,
      tooltip: l.db.getTooltip(f.id) || "",
      domId: l.db.lookUpDomId(f.id),
      haveCallback: f.haveCallback,
      width: f.type === "group" ? 500 : void 0,
      dir: f.dir,
      type: f.type,
      props: f.props,
      padding: Me().flowchart.padding
    }), o0.info("setNode", {
      labelStyle: b.labelStyle,
      labelType: f.labelType,
      shape: k,
      labelText: C,
      rx: M,
      ry: M,
      class: g,
      style: b.style,
      id: f.id,
      domId: l.db.lookUpDomId(f.id),
      width: f.type === "group" ? 500 : void 0,
      type: f.type,
      dir: f.dir,
      props: f.props,
      padding: Me().flowchart.padding
    });
  });
}, ya = function(r, e, t) {
  o0.info("abc78 edges = ", r);
  let a = 0, n = {}, l, o;
  if (r.defaultStyle !== void 0) {
    const h = it(r.defaultStyle);
    l = h.style, o = h.labelStyle;
  }
  r.forEach(function(h) {
    a++;
    var m = "L-" + h.start + "-" + h.end;
    n[m] === void 0 ? (n[m] = 0, o0.info("abc78 new entry", m, n[m])) : (n[m]++, o0.info("abc78 new entry", m, n[m]));
    let f = m + "-" + n[m];
    o0.info("abc78 new link id to be used is", m, f, n[m]);
    var g = "LS-" + h.start, b = "LE-" + h.end;
    const y = { style: "", labelStyle: "" };
    switch (y.minlen = h.length || 1, h.type === "arrow_open" ? y.arrowhead = "none" : y.arrowhead = "normal", y.arrowTypeStart = "arrow_open", y.arrowTypeEnd = "arrow_open", h.type) {
      case "double_arrow_cross":
        y.arrowTypeStart = "arrow_cross";
      case "arrow_cross":
        y.arrowTypeEnd = "arrow_cross";
        break;
      case "double_arrow_point":
        y.arrowTypeStart = "arrow_point";
      case "arrow_point":
        y.arrowTypeEnd = "arrow_point";
        break;
      case "double_arrow_circle":
        y.arrowTypeStart = "arrow_circle";
      case "arrow_circle":
        y.arrowTypeEnd = "arrow_circle";
        break;
    }
    let w = "", M = "";
    switch (h.stroke) {
      case "normal":
        w = "fill:none;", l !== void 0 && (w = l), o !== void 0 && (M = o), y.thickness = "normal", y.pattern = "solid";
        break;
      case "dotted":
        y.thickness = "normal", y.pattern = "dotted", y.style = "fill:none;stroke-width:2px;stroke-dasharray:3;";
        break;
      case "thick":
        y.thickness = "thick", y.pattern = "solid", y.style = "stroke-width: 3.5px;fill:none;";
        break;
      case "invisible":
        y.thickness = "invisible", y.pattern = "solid", y.style = "stroke-width: 0;fill:none;";
        break;
    }
    if (h.style !== void 0) {
      const k = it(h.style);
      w = k.style, M = k.labelStyle;
    }
    y.style = y.style += w, y.labelStyle = y.labelStyle += M, h.interpolate !== void 0 ? y.curve = $e(h.interpolate, Ve) : r.defaultInterpolate !== void 0 ? y.curve = $e(r.defaultInterpolate, Ve) : y.curve = $e(ga.curve, Ve), h.text === void 0 ? h.style !== void 0 && (y.arrowheadStyle = "fill: #333") : (y.arrowheadStyle = "fill: #333", y.labelpos = "c"), y.labelType = h.labelType, y.label = h.text.replace(xr.lineBreakRegex, `
`).replace(
      /\$\$(.*)\$\$/g,
      (k, C) => va.renderToString(C, { throwOnError: !0, displayMode: !0, output: "mathml" }).replace(/\n/g, " ").replace(/<annotation.*<\/annotation>/g, "")
    ), h.style === void 0 && (y.style = y.style || "stroke: #333; stroke-width: 1.5px;fill:none;"), y.labelStyle = y.labelStyle.replace("color:", "fill:"), y.id = f, y.classes = "flowchart-link " + g + " " + b, e.setEdge(h.start, h.end, y, a);
  });
}, In = function(r, e) {
  o0.info("Extracting classes"), e.db.clear();
  try {
    return e.parse(r), e.db.getClasses();
  } catch {
    return;
  }
}, Ln = async function(r, e, t, a) {
  o0.info("Drawing flowchart"), a.db.clear(), Ba.setGen("gen-2"), a.parser.parse(r);
  let n = a.db.getDirection();
  n === void 0 && (n = "TD");
  const { securityLevel: l, flowchart: o } = Me(), h = o.nodeSpacing || 50, m = o.rankSpacing || 50;
  let f;
  l === "sandbox" && (f = fe("#i" + e));
  const g = l === "sandbox" ? fe(f.nodes()[0].contentDocument.body) : fe("body"), b = l === "sandbox" ? f.nodes()[0].contentDocument : document, y = new Ta({
    multigraph: !0,
    compound: !0
  }).setGraph({
    rankdir: n,
    nodesep: h,
    ranksep: m,
    marginx: 0,
    marginy: 0
  }).setDefaultEdgeLabel(function() {
    return {};
  });
  let w;
  const M = a.db.getSubGraphs();
  o0.info("Subgraphs - ", M);
  for (let I = M.length - 1; I >= 0; I--)
    w = M[I], o0.info("Subgraph - ", w), a.db.addVertex(
      w.id,
      { text: w.title, type: w.labelType },
      "group",
      void 0,
      w.classes,
      w.dir
    );
  const k = a.db.getVertices(), C = a.db.getEdges();
  o0.info("Edges", C);
  let B = 0;
  for (B = M.length - 1; B >= 0; B--) {
    w = M[B], Ea("cluster").append("text");
    for (let I = 0; I < w.nodes.length; I++)
      o0.info("Setting up subgraphs", w.nodes[I], w.id), y.setParent(w.nodes[I], w.id);
  }
  ba(k, y, e, g, b, a), ya(C, y);
  const q = g.select(`[id="${e}"]`), H = g.select("#" + e + " g");
  if (await qa(H, y, ["point", "circle", "cross"], "flowchart", e), Da.insertTitle(q, "flowchartTitleText", o.titleTopMargin, a.db.getDiagramTitle()), Na(y, q, o.diagramPadding, o.useMaxWidth), a.db.indexNodes("subGraph" + B), !o.htmlLabels) {
    const I = b.querySelectorAll('[id="' + e + '"] .edgeLabel .label');
    for (const G of I) {
      const F = G.getBBox(), V = b.createElementNS("http://www.w3.org/2000/svg", "rect");
      V.setAttribute("rx", 0), V.setAttribute("ry", 0), V.setAttribute("width", F.width), V.setAttribute("height", F.height), G.insertBefore(V, G.firstChild);
    }
  }
  Object.keys(k).forEach(function(I) {
    const G = k[I];
    if (G.link) {
      const F = fe("#" + e + ' [id="' + I + '"]');
      if (F) {
        const V = b.createElementNS("http://www.w3.org/2000/svg", "a");
        V.setAttributeNS("http://www.w3.org/2000/svg", "class", G.classes.join(" ")), V.setAttributeNS("http://www.w3.org/2000/svg", "href", G.link), V.setAttributeNS("http://www.w3.org/2000/svg", "rel", "noopener"), l === "sandbox" ? V.setAttributeNS("http://www.w3.org/2000/svg", "target", "_top") : G.linkTarget && V.setAttributeNS("http://www.w3.org/2000/svg", "target", G.linkTarget);
        const X = F.insert(function() {
          return V;
        }, ":first-child"), J = F.select(".label-container");
        J && X.append(function() {
          return J.node();
        });
        const t0 = F.select(".label");
        t0 && X.append(function() {
          return t0.node();
        });
      }
    }
  });
}, jn = {
  setConf: Rn,
  addVertices: ba,
  addEdges: ya,
  getClasses: In,
  draw: Ln
}, Hn = (r) => `.label {
    font-family: ${r.fontFamily};
    color: ${r.nodeTextColor || r.textColor};
  }
  .cluster-label text {
    fill: ${r.titleColor};
  }
  .cluster-label span,p {
    color: ${r.titleColor};
  }

  .label text,span,p {
    fill: ${r.nodeTextColor || r.textColor};
    color: ${r.nodeTextColor || r.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${r.mainBkg};
    stroke: ${r.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${r.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${r.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${r.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${r.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${r.edgeLabelBackground};
      fill: ${r.edgeLabelBackground};
    }
    text-align: center;
  }

  .cluster rect {
    fill: ${r.clusterBkg};
    stroke: ${r.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${r.titleColor};
  }

  .cluster span,p {
    color: ${r.titleColor};
  }
  /* .cluster div {
    color: ${r.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${r.fontFamily};
    font-size: 12px;
    background: ${r.tertiaryColor};
    border: 1px solid ${r.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${r.textColor};
  }
`, Zn = Hn;
export {
  qn as a,
  En as b,
  Wn as c,
  Yn as d,
  Xn as e,
  jn as f,
  Zn as g,
  Un as i,
  va as k
};
//# sourceMappingURL=styles-0e47479c.js.map
