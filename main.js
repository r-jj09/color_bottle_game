class BaseBottle {
	numerOfColors = 3;
	baseColors = ["aqua", "teal", "navy", "purple", "maroon", "hotpink"];
	colorElems = [];
	id;

	//A színeket és a ranomziálást még át kell gondolni, mert ez így nem lesz jó

	constructor() {
		let colors = [];
		for (let i = 0; i < this.numerOfColors; i++) {
			const randomIndex = Math.floor(Math.random() * this.baseColors.length);
			colors.push(this.baseColors[randomIndex]);
		}

		colors.map((color) => {
			var box = document.createElement("div");
			box.classList.add("box");
			box.setAttribute("color", color);
			this.colorElems.push(box);
			box.style.backgroundColor = color;
		});
	}
	pourOut() {
		let lastColors = [];
		var lastColor = this.colorElems.pop();
		lastColors.push(lastColor);
		var colorAttr = $(lastColor).attr("color");
		this.colorElems.map(() => {
			if (
				this.colorElems[this.colorElems.length - 1].getAttribute("color") ===
				colorAttr
			) {
				lastColor = this.colorElems.pop();
				lastColors.push(lastColor);
			}
		});
		return lastColors;
	}

	pourIn(lastColors) {
		for (let i = 0; i < lastColors.length; i++) {
			if (this.colorElems.length < 4) {
				this.colorElems.push(lastColors[i]);
			} else {
				alert("The bottle is already full!");
				//Kivett elemek visszarakása az eredeti tömbbe
			}
		}
	}

	showBottle(field) {
		console.log(field);
		this.colorElems.map((colorElem) => {
			field.append(colorElem);
		});
	}
}
class Playground {
	rowsCount;
	colsCount;
	field = $("<div class='field'></div>");
	container = $("body");
	content = $("<div class='content'></div>");
	bottles = [];

	constructor(rowsCount, colsCount) {
		this.rowsCount = rowsCount;
		this.colsCount = colsCount;
		this.showPlayground();
	}

	showPlayground() {
		for (let i = 0; i < this.rowsCount; i++) {
			for (let j = 0; j < this.colsCount; j++) {
				let id = i * this.colsCount + j;
				let clone = this.field.clone();
				clone.attr("id", id);
				this.content.append(clone);
				this.container.append(this.content);
			}
		}
		let fields = $("body").find(".field");
		fields.map((index, field) => {
			let bottle = new BaseBottle();
			let id = $(field).attr("id");
			bottle.id = id;
			this.bottles[id] = bottle;
			bottle.showBottle(field);
		});
	}
}

class Game {
	playground;
	selectedField;
	selected2ndField;
	selectedBottle;

	constructor(playground) {
		this.playground = playground;
		this.startGame();

		var currentColor;
		var currentColor2;

		// Events

		$(document).on("contextmenu", (event) => {
			event.preventDefault();
			return false;
		});

		$(".field").on("mousedown", (event) => {
			if (event.which === 1) {
				//Bal katt
				let elem = $(event.currentTarget);

				if (this.selectedField) {
					this.selectedField.removeClass("selected");
				}

				if (this.selectedField && this.selectedField.is(elem)) {
					this.selectedField = null;
				} else {
					elem.addClass("selected");
					this.selectedField = elem;
					let currentId = elem.attr("id");
					this.selectedBottle = playground.bottles[currentId];

					currentColor = $(
						this.selectedBottle.colorElems[
							this.selectedBottle.colorElems.length - 1
						]
					).attr("color");
				}
			} else if (event.which === 3) {
				//Jobb katt
				let elem = $(event.currentTarget);
				if (this.selected2ndField) {
					this.selected2ndField.removeClass("selected");
				}

				if (this.selected2ndField && this.selected2ndField.is(elem)) {
					this.selected2ndField = null;
				} else {
					elem.addClass("selected");
					this.selected2ndField = elem;
					let currentId = elem.attr("id");
					let selectedBottle2 = playground.bottles[currentId];
					currentColor2 = $(
						selectedBottle2.colorElems[selectedBottle2.colorElems.length - 1]
					).attr("color");
					// console.log(currentColor);
					// console.log(currentColor2);
					if (
						currentColor === currentColor2 ||
						currentColor === undefined ||
						currentColor2 === undefined
					) {
						let color = this.selectedBottle.pourOut();
						selectedBottle2.pourIn(color);
						selectedBottle2.showBottle(
							$("body").find("[id=" + selectedBottle2.id + "]")
						);
					} else {
						this.selectedField.addClass("shake");
						this.selected2ndField.addClass("shake");

						setTimeout(() => {
							this.selectedField.removeClass("shake");
							this.selected2ndField.removeClass("shake");
						}, 1000);
					}
					this.selectedField.removeClass("selected");
					this.selected2ndField.removeClass("selected");
				}
			}
		});
	}
	startGame() {
		//Győzelem ellenőrzése
		//Minden field minden ColorElems tömb eleminek color attribútum ellenőrzése és összehasonlítádsa
		//Ha 1 field minden colorja egyanaz akkor azt befejezettnek jelölni
		//Ha mind a 7 befejezett akkor win
	}
}

game = new Game(new Playground(2, 3));
bottle = new BaseBottle();

//! TODO
//ColorElems tömb max elemeinek megadása és a túltöltés megakadályozása
//Utolsó üveg kiürítése generálást követően
//Szín randomizálás megjavítása max 4 egy színből összesen
//Győzelem lekezelése
