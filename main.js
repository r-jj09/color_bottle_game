// $("body").on("click", "button", (event) => {
// 	let form = $("form");
// 	let message = $(".message");
// 	const formData = new FormData(form.get(0));
// 	formData.append("message", message.text());
// 	for (const [key, value] of formData.entries()) {
// 		console.log(`${key} ${value}`);
// 	}
// });

class BaseBottle {
	numerOfColors = 4;
	baseColors = [
		"white",
		"red",
		"blue",
		"purple",
		"navy",
		"maroon",
		"green",
		"yellow",
	];
	colors = [];
	constructor() {
		// itt kellene feltölteni a colors paramétert.
		for (let i = 0; i < this.numerOfColors; i++) {
			const randomIndex = Math.floor(Math.random() * this.baseColors.length);
			this.colors.push(this.baseColors[randomIndex]);
		}
	}

	showBottle() {
		// itt jelenítsd meg-
		var bottle = document.createElement("div");
		bottle.classList.add("bottle");
		var box = document.createElement("div");
		box.classList.add("box");
		bottle.append(box);
	}
}
const bottle = new BaseBottle();
console.log(bottle.colors);
