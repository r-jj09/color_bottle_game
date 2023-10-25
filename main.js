class BaseBottle {
	numerOfColors = 4;
	baseColors = ["aqua", "teal", "navy", "purple", "maroon", "hotpink"];
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
		"<div class='field' style='width: 60px; height: 120px;border: 1px solid teal; display: inline-flex; flex-direction: column; position: relative;'></div>"
	);
	// let fields = $("body").find(".field")
	// fields.map((index, field) => {
	// })
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
				clone.append($(".bottle"));
			}
			$("body").append("<br>");
		}
	}
}

class Game {
	playground;
	basebottle;

	constructor(playground, basebottle) {
		this.playground = playground;
		this.basebottle = basebottle;
		this.startGame();
	}

	startGame() {}
}

bottle = new BaseBottle();
game = new Game(bottle, new Playground(2, 3));
