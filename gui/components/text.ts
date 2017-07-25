'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

enum TextAlign {
	Left,
	Center,
	Right,
}

interface IText extends IComponent {
	aligh?: TextAlign;
	style?: {
		align?: string;
		boundsAlignH?: string;
		boundsAlignV?: string;
		fill?: string;
		font?: string;
	};
	text?: string;
	x?: number;
	y?: number;
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

	public get Text(): string {

		return this.text.text;
	}

	public set Text(text: string) {

		this.text.text = text;

		if (!this.raw) {
			return;
		}

		this.raw.setText(text);
	}

	public compile(gui: Gui, parent: Phaser.Group, root?: Gui | Component): void {

		parent.add(this.raw = gui.add.text(this.text.x, this.text.y, this.text.text, this.text.style));

		switch (this.text.aligh) {
			case TextAlign.Right:
				this.raw.anchor.setTo(1, 0);
				break;
			case TextAlign.Center:
				this.raw.anchor.setTo(Component.MIDDLE, 0);
				break;
			default:
		}
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {

		this.raw.inputEnabled = true;
		this.raw.input.enableDrag(false);

		this.raw.events.onDragStop.add(() => callback(this, this.raw.position.x, this.raw.position.y));
	}

	public preload(gui: Gui, game: Phaser.Game): void {
		//
	}

	public update(gui: Gui, game: Phaser.Game): void {
		//
	}
}

export { Text, IText, TextAlign };
