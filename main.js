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

	showBottle(field) {
		this.colorElems.map((colorElem) => {
			field.append(colorElem);
		});
	}

	pourOut() {
		var lastColor = this.colors.pop();
		return lastColor;
	}

	pourIn(colorElem) {
		this.colors.push(colorElem);
		return;
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
		for (let i = 0; i < this.rowsCount; i++) {
			for (let j = 0; j < this.colsCount; j++) {
				let id = i * this.colsCount + j;
				let clone = this.field.clone();
				clone.attr("id", id);
				this.content.append(clone);
				this.container.append(this.content);
				clone.append($(".bottle"));
			}
		}

		let fields = $("body").find(".field");
		fields.map((index, field) => {
			let bottle = new BaseBottle();
			bottle.showBottle(field);
		});
	}
}

class Game {
	playground;
	selectedField;

	constructor(playground) {
		this.playground = playground;
		this.startGame();

		// Events

		$(document).on("contextmenu", (event) => {
			event.preventDefault();
			return false;
		});

		// Kellene egy jobbgombos esemény, ahol megkapjuk, hogy melyi flaskába öntsünk.
		// A BaseBottle-t kellen úgy módosítani, hogy a colors tömbbe a színekkel feltöltött div elemek kerüljenek.

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
				}
			} else if (event.which === 3) {
				let elem = $(event.currentTarget);

				if (this.selectedField) {
					this.selectedField.removeClass("selected");
				}

				if (this.selectedField && this.selectedField.is(elem)) {
					this.selectedField = null;
				} else {
					elem.addClass("selected");
					this.selectedField = elem;
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
