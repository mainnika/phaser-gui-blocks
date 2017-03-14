'use strict';

import { Gui } from '../gui';
import { Component } from './component';

export { Image, IImage }

interface IImage {
	x?: number;
	y?: number;
	url?: string;
	click?: Function;
	ctx?: Object;
}

class Image extends Component {

	private raw: Phaser.Image;

	constructor(
		private image: IImage,
	) {

		super(image);
	}

	public get Raw(): Phaser.Image {

		return this.raw;
	}

	public create(gui: Gui, parent: Phaser.Group): void {

		const key: string = this.image.url;

		parent.add(this.raw = gui.add.image(this.image.x, this.image.y, key));
	}

	public load(gui: Gui, game: Phaser.Game): void {

		game.load.image(this.image.url, this.image.url);
	}
}
