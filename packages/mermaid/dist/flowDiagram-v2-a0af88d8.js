import { p as parser, f as flowDb } from "./flowDb-cdd2a1cd.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-cf4c443c.js";
import { i as setConfig } from "./commonDb-2573ecd8.js";
import "./utils-f8ca1ed8.js";
import "./mermaidAPI-83399b6f.js";
import "./layout-f416439d.js";
import "./index-e7220290.js";
import "./edges-713222af.js";
import "./createText-0d4295e1.js";
import "./svgDraw-f8fc4be5.js";
import "./line-92608025.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-32e43720.js";
const diagram = {
  parser,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-a0af88d8.js.map
