class BaseBottle {
	numerOfColors = 3;
	baseColors = ["aqua", "teal", "navy", "purple", "maroon", "hotpink"];
	colorElems = [];
	id;

	constructor() {
		let colors = [];
		this.colorElems.length = 3;
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
		var lastColor = this.colorElems.pop();
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

					currentColor =
						this.selectedBottle.colorElems[
							this.selectedBottle.colorElems.length - 1
						].getAttribute("color");
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

					currentColor2 =
						selectedBottle2.colorElems[
							selectedBottle2.colorElems.length - 1
						].getAttribute("color");
					if (currentColor === currentColor2 || currentColor2 === null) {
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
		console.log();
	}
}

game = new Game(new Playground(2, 3));
bottle = new BaseBottle();
