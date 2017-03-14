'use strict';

import { Gui } from '../gui';
import { Component } from './component';

export { Group }

class Group extends Component {

	private raw: Phaser.Group;

	constructor(
		private content: Component[],
	) {

		super(content);
	}

	public get Raw(): Phaser.Group {

		return this.raw;
	}

	public compile(gui: Gui, parent?: Phaser.Group): void {

		gui.compile(this.content, this.raw = gui.add.group(parent));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		gui.preload(game, this.content, gui);
	}
}
