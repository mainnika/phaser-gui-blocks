'use strict';

import { Gui } from '../gui';
import { Component } from './component';

export { Text, IText }

interface IText {
	x?: number;
	y?: number;
	text?: string;
	style?: {
		font?: string;
		fill?: string;
		align?: string;
	};
}

class Text extends Component {

	private raw: Phaser.Text;

	constructor(
		private text: IText,
	) {

		super(text);
	}

	public get Raw(): Phaser.Text {

		return this.raw;
	}

	public create(gui: Gui, parent: Phaser.Group): void {

		parent.add(this.raw = gui.add.text(this.text.x, this.text.y, this.text.text, this.text.style));
	}
}
