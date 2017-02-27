'use strict';

import { Gui } from '../gui';
import { Component } from './component';

export { Audio, IAudio }

interface IAudio {
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

		parent.add(this.raw = gui.add.audio(key));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		game.load.audio(this.audio.url, this.audio.url);
	}

	public debug(gui: Gui, callback: (...args: any[]) => void): void {
		//
	}
}
