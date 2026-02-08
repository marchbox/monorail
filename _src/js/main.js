import "regenerator-runtime/runtime";
import "@ungap/custom-elements-builtin";

import Glockenspiel from "./glockenspiel.js";
import Monorail from "./monorail.js";
import Tulgeywood from "./tulgeywood.js";
import { whenDocumentComplete, whenDocumentReady } from "./utils.js";

whenDocumentReady().then(() => {
	if ("customElements" in window) {
		customElements.define("land-glockenspiel", Glockenspiel);
		customElements.define("land-tulgeywood", Tulgeywood);
	}
});

whenDocumentComplete().then(() => {
	if ("customElements" in window) {
		customElements.define("land-monorail", Monorail, { extends: "nav" });
	}
});
