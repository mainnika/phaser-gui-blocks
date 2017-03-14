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

	public constructor(
		private text: IText,
	) {

		super(text);
	}

	public get Raw(): Phaser.Text {

		return this.raw;
	}

	public compile(gui: Gui, parent: Phaser.Group, root?: Gui | Component): void {

		parent.add(this.raw = gui.add.text(this.text.x, this.text.y, this.text.text, this.text.style));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		// nothing
	}

	public debug(gui: Gui, callback: (...args: any[]) => void): void {

		this.raw.inputEnabled = true;
		this.raw.input.enableDrag(false);

		this.raw.events.onDragStop.add(() => callback(this, this.raw.position.x, this.raw.position.y));
	}
}
