'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

export { Button, IButton }

interface IButton extends IComponent {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	url?: string;
	click?: Function;
	ctx?: Object;
}

class Button extends Component {

	private raw: Phaser.Button;

	constructor(
		private button: IButton,
	) {

		super(button);
	}

	public get Raw(): Phaser.Button {

		return this.raw;
	}

	public compile(gui: Gui, parent: Phaser.Group, root: Gui | Component): void {

		const handler: Function | undefined = this.button.click ? this.button.click.bind(this.button.ctx || root) : undefined;
		const key: string = this.button.url;

		parent.add(this.raw = gui.add.button(this.button.x, this.button.y, key, handler, undefined, 1, 0, 2, 0));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		game.load.spritesheet(this.button.url, this.button.url, this.button.width, this.button.height, 3);
	}
}
