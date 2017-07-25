'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

interface IImage extends IComponent {
	ctx?: {};
	frame?: string | number;
	atlas?: string;
	url?: string;
<<<<<<< HEAD:gui/components/image.ts
	x?: number;
	y?: number;
<<<<<<< HEAD:gui/components/image.ts
	url?: string;
	click?: Function;
	ctx?: Object;
=======
	x: number;
	y: number;
>>>>>>> ab59d2d... add texture atlas:frontend/lib/gui/components/image.ts
	input?: boolean;
=======
	click?(): void;
>>>>>>> c02e76e... frontend tslint fixes:frontend/lib/gui/components/image.ts
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

		const key: string = this.image.atlas || this.image.url;
		const frame: string | number = this.image.frame;

		parent.add(this.raw = gui.add.image(this.image.x, this.image.y, key, frame));
		this.raw.inputEnabled = !!this.image.input;
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {

		this.raw.inputEnabled = true;
		this.raw.input.enableDrag(false);

		this.raw.events.onDragStop.add(() => callback(this, this.raw.position.x, this.raw.position.y));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		if (this.image.atlas) {
			return;
		}

		game.load.image(this.image.url, this.image.url);
	}

	public update(gui: Gui, game: Phaser.Game): void {
		//
	}
}

export { Image, IImage };
