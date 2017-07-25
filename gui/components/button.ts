'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

interface IButton extends IComponent {
	frames: {
		out: string | number;
		over: string | number;
		down: string | number;
	};
	atlas?: string;
	url?: string;
	height?: number;
	width?: number;
	x: number;
	y: number;
	ctx?: {};
	click?(): void;
}

class Button extends Component {

	private static readonly FRAMES: number = 3;

	private raw: Phaser.Button;

	public constructor(
		private button: IButton,
	) {

		super(button);
	}

	public get Raw(): Phaser.Button {

		return this.raw;
	}

	public compile(gui: Gui, parent: Phaser.Group, root: Gui | Component): void {

		const handler: () => void | undefined = this.button.click ? this.button.click.bind(this.button.ctx || root) : undefined;
		const key: string = this.button.atlas || this.button.url;

		parent.add(this.raw = gui.add.button(
			this.button.x,
			this.button.y,
			key,
			handler,
			undefined,
			this.button.frames.over,
			this.button.frames.out,
			this.button.frames.down,
		));
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {

		this.raw.onInputUp.removeAll();

		this.raw.inputEnabled = true;
		this.raw.input.enableDrag(false);

		this.raw.events.onDragStop.add(() => callback(this, this.raw.position.x, this.raw.position.y));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		if (this.button.atlas) {
			return;
		}

		game.load.spritesheet(this.button.url, this.button.url, this.button.width, this.button.height, Button.FRAMES);
	}

	public update(gui: Gui, game: Phaser.Game): void {
		//
	}
}

export { Button, IButton };
