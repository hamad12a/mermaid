import { p as parser, f as flowDb } from "./flowDb-8a8355ec.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-80213008.js";
import { h as setConfig } from "./commonDb-59629829.js";
import "d3";
import "./utils-f3391f29.js";
import "@braintree/sanitize-url";
import "lodash-es/memoize.js";
import "./mermaidAPI-2330821b.js";
import "stylis";
import "dompurify";
import "lodash-es/isEmpty.js";
import "dagre-d3-es/src/graphlib/index.js";
import "katex";
import "./index-2c6baede.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-16abd04b.js";
import "./createText-4742dda4.js";
import "@khanacademy/simple-markdown";
import "./svgDraw-f7b19055.js";
import "dagre-d3-es/src/dagre-js/label/add-html-label.js";
import "dayjs/esm/index.js";
import "khroma";
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
//# sourceMappingURL=flowDiagram-v2-53d9b5d4.js.map
