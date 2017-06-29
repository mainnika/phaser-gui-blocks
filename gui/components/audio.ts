'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

interface IAudio extends IComponent {
	url?: string;
}

class Audio extends Component {

	private raw: Phaser.Sound;

	public constructor(
		private audio: IAudio,
	) {

		super(audio);
	}

	public get Raw(): Phaser.Sound {

		return this.raw;
	}

	public compile(gui: Gui, parent: Phaser.Group, root?: Gui | Component): void {

		const key: string = this.audio.url;

		this.raw = gui.add.audio(key);
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {
		//
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		game.load.audio(this.audio.url, this.audio.url);
	}

	public update(gui: Gui, game: Phaser.Game): void {
		//
	}
}

export { Audio, IAudio };
