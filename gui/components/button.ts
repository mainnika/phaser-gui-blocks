'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

interface IButton extends IComponent {
	ctx?: {};
	height?: number;
	url?: string;
	width?: number;
	x?: number;
	y?: number;
	click?(): void;
}

class Button extends Component {

	public static readonly DOWN_FRAME: number = 2;
	public static readonly FRAMES: number = 3;
	public static readonly OUT_FRAME: number = 0;
	public static readonly OVER_FRAME: number = 1;

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
		const key: string = this.button.url;

		parent.add(this.raw = gui.add.button(this.button.x, this.button.y, key, handler, undefined, Button.OVER_FRAME, Button.OUT_FRAME, Button.DOWN_FRAME, 0));
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {

		this.raw.onInputUp.removeAll();

		this.raw.inputEnabled = true;
		this.raw.input.enableDrag(false);

		this.raw.events.onDragStop.add(() => callback(this, this.raw.position.x, this.raw.position.y));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		game.load.spritesheet(this.button.url, this.button.url, this.button.width, this.button.height, Button.FRAMES);
	}

	public update(gui: Gui, game: Phaser.Game): void {
		//
	}
}

export { Button, IButton };
