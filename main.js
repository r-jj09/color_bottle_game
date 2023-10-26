class BaseBottle {
	numerOfColors = 3;
	baseColors = ["aqua", "teal", "navy", "purple", "maroon", "hotpink"];
	colors = [];
	constructor() {
		for (let i = 0; i < this.numerOfColors; i++) {
			const randomIndex = Math.floor(Math.random() * this.baseColors.length);
			this.colors.push(this.baseColors[randomIndex]);
		}
		this.showBottle();
		this.pourOut();
		this.pourIn();
	}

	showBottle() {
		var bottle = document.createElement("div");
		bottle.classList.add("bottle");
		for (let i = 0; i < this.numerOfColors + 1; i++) {
			var box = document.createElement("div");
			box.classList.add("box");
			box.style.backgroundColor = this.colors[i];
			bottle.append(box);
		}
		return bottle;
	}

	pourOut() {
		var lastColor = this.colors.pop();
		return lastColor;
	}

	pourIn(color) {
		this.colors.push();
		return;
	}
}
class Playground {
	rowsCount;
	colsCount;
	field = $("<div class='field'></div>");

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
				$("body").append(clone);
				clone.append($(".bottle"));
			}
		}

		let fields = $("body").find(".field");
		fields.map((index, field) => {
			let bottle = new BaseBottle();
			field.append(bottle.showBottle());
		});
	}
}

class Game {
	playground;

	constructor(playground) {
		this.playground = playground;
		this.startGame();
	}

	startGame() {}
}
$(document).ready(function () {
	let selected = false;

	$(".field").click(function () {
		if (selected) {
			$(this).css("transform", "none");
			$(this).removeClass("selected");
		} else {
			$(this).css("transform", "translateY(-2.1rem)");
			$(this).addClass("selected");
		}
		selected = !selected;
	});
});
game = new Game(new Playground(2, 3));
let bottle = new BaseBottle();
console.log(bottle.pourOut());
