'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

interface IAtlas extends IComponent {
	url: string;
	json: string;
}

class Atlas extends Component {

	public constructor(
		private atlas: IAtlas,
	) {

		super(atlas);
	}

	public get Raw(): never {

		throw new Error('not impl');
	}

	public compile(gui: Gui, parent: Phaser.Group, root: Gui | Component): void {

		const preloaded: Phaser.Sprite = gui.add.sprite(-1, -1, this.atlas.url);
		preloaded.width = 1;
		preloaded.height = 1;
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {
		//
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		game.load.atlasJSONHash(this.atlas.url, this.atlas.url, this.atlas.json);
	}

	public update(gui: Gui, game: Phaser.Game): void {
		//
	}
}

export { Atlas, IAtlas };
