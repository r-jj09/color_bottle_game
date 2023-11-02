class BaseBottle {
	numerOfColors = 3;
	baseColors = ["aqua", "teal", "navy", "purple", "maroon", "hotpink"];
	colorElems = [];
	id;

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
		console.log(this.colorElems);
		var lastColor = this.colorElems.pop();
		console.log(lastColor);
		return lastColor;
	}

	pourIn(lastColor) {
		this.colorElems.push(lastColor);
		console.log(this.colorElems);
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
	bottles = [];

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
		let id = lastFieldId + 1;
		let clone = this.field.clone();
		clone.attr("id", id);
		this.content.append(clone);
		this.container.append(this.content);
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
					let color = this.selectedBottle.pourOut();
					selectedBottle2.pourIn(color);
					selectedBottle2.showBottle(
						$("body").find("[id=" + selectedBottle2.id + "]")
					);
					this.selectedField.removeClass("selected");
					this.selected2ndField.removeClass("selected");
				}
			}
		});
	}
	startGame() {
		console.log();
	}
	// color = this.playground.bottles[id].pourOut();
	// this.playground.bottles[id2].pourIn(color);
	// Ide kellene egy öntés metódus
}

game = new Game(new Playground(2, 3));
bottle = new BaseBottle();
