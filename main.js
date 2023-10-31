class BaseBottle {
	numerOfColors = 3;
	baseColors = ["aqua", "teal", "navy", "purple", "maroon", "hotpink"];
	colorElems = [];

	constructor() {
		let colors = [];

		for (let i = 0; i < this.numerOfColors; i++) {
			const randomIndex = Math.floor(Math.random() * this.baseColors.length);
			colors.push(this.baseColors[randomIndex]);
		}

		colors.map((color) => {
			var box = document.createElement("div");
			box.classList.add("box");
			this.colorElems.push(box);
			box.style.backgroundColor = color;
		});
	}
	pourOut(elem) {
		console.log(this.colorElems);
		let lastColor = this.colorElems.pop();
		console.log(lastColor);
		console.log(this.colorElems);
		return lastColor;
	}

	pourIn(lastColor) {
		this.colorElems.push(lastColor);
	}

	showBottle(field) {
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

	constructor(rowsCount, colsCount) {
		this.rowsCount = rowsCount;
		this.colsCount = colsCount;
		this.showPlayground();
	}

	showPlayground() {
		let lastFieldId;
		for (let i = 0; i < this.rowsCount; i++) {
			for (let j = 0; j < this.colsCount; j++) {
				let id = i * this.colsCount + j;
				let clone = this.field.clone();
				clone.attr("id", id);
				this.content.append(clone);
				this.container.append(this.content);

				lastFieldId = id;
			}
		}
		let fields = $("body").find(".field");
		fields.map((index, field) => {
			let bottle = new BaseBottle();
			bottle.showBottle(field);
		});
		let id = lastFieldId + 1;
		let clone = this.field.clone();
		clone.attr("id", id);
		this.content.append(clone);
		this.container.append(this.content);
	}
}

class Game {
	playground;
	selectedField;
	selected2ndField;

	constructor(playground) {
		this.playground = playground;
		this.startGame();

		// Events

		$(document).on("contextmenu", (event) => {
			event.preventDefault();
			return false;
		});

		$(".field").on("mousedown", (event) => {
			if (event.which === 1) {
				let elem = $(event.currentTarget);

				if (this.selectedField) {
					this.selectedField.removeClass("selected");
				}

				if (this.selectedField && this.selectedField.is(elem)) {
					this.selectedField = null;
				} else {
					elem.addClass("selected");
					this.selectedField = elem;
					let bottle = new BaseBottle();
					bottle.pourOut(elem);
				}
			} else if (event.which === 3) {
				let elem = $(event.currentTarget);

				if (this.selected2ndField) {
					this.selected2ndField.removeClass("selected");
				}

				if (this.selected2ndField && this.selected2ndField.is(elem)) {
					this.selected2ndField = null;
				} else {
					elem.addClass("selected");
					this.selected2ndField = elem;
				}
			}
		});
	}
	startGame() {
		//
	}
}

game = new Game(new Playground(2, 3));
bottle = new BaseBottle();

//TODO
//* Üres Bottle létrehozása
//? Újraindítás gomb
//! Kiönt és beönt megjavítása
//! Szín generálás limit?
//! Győzelem lekezelése
