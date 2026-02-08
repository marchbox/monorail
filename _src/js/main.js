import Glockenspiel from "./glockenspiel.js";
import Tulgeywood from "./tulgeywood.js";

customElements.define("land-glockenspiel", Glockenspiel);
customElements.define("land-tulgeywood", Tulgeywood);

// Center the active monorail car after animation. This can be removed after
// `scroll-start-target` is supported.
window.addEventListener("pagereveal", async (evt) => {
	const activeMonorailCar = document.querySelector(".monorail-car.active");

	if (!activeMonorailCar || !evt.viewTransition) {
		return;
	}

	try {
		await evt.viewTransition.finished;
	} finally {
		activeMonorailCar.scrollIntoView({
			block: "nearest",
			inline: "center",
		});
	}
});
