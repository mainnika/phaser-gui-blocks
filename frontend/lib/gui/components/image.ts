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

	public constructor(
		private image: IImage,
	) {

		super(image);
	}

	public get Raw(): Phaser.Image {

		return this.raw;
	}

	public compile(gui: Gui, parent: Phaser.Group, root?: Gui | Component): void {

		const key: string = this.image.url;

		parent.add(this.raw = gui.add.image(this.image.x, this.image.y, key));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		game.load.image(this.image.url, this.image.url);
	}

	public update(gui: Gui, game: Phaser.Game): void {
		//
	}

	public debug(gui: Gui, callback: (...args: any[]) => void): void {

		this.raw.inputEnabled = true;
		this.raw.input.enableDrag(false);

		this.raw.events.onDragStop.add(() => callback(this, this.raw.position.x, this.raw.position.y));
	}
}
