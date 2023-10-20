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
		"teal",
		"aqua",
	];
	colors = [];
	constructor() {
		for (let i = 0; i < this.numerOfColors; i++) {
			const randomIndex = Math.floor(Math.random() * this.baseColors.length);
			this.colors.push(this.baseColors[randomIndex]);
		}
		this.showBottle();
	}

	showBottle() {
		var bottle = document.createElement("div");
		bottle.classList.add("bottle");
		for (let i = 0; i < this.numerOfColors; i++) {
			var box = document.createElement("div");
			box.classList.add("box");
			box.style.backgroundColor = this.colors[i];
			bottle.append(box);
			$("body").append(bottle);
		}
	}
}
class Playground {
	rowsCount;
	colsCount;
	field = $(
		"<div style='width: 20px; height: 80px;border: 1px solid black; display: inline-flex; flex-direction: column; position: relative;'></div>"
	);

	constructor(rowsCount = 10, colsCount = 10) {
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
				$("body").append(clone);
			}
			$("body").append("<br>");
		}
	}
}

class Game {
	playground;

	constructor(playground) {
		this.playground = playground;
		this.startGame();
	}

	startGame() {
		//
	}
}

game = new Game(new Playground(2, 5), new BaseBottle());
