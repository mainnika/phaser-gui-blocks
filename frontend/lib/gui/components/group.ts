'use strict';

import { Gui } from '../gui';
import { Component } from './component';

export { Group }

class Group extends Component {

	private raw: Phaser.Group;

	public constructor(
		private content: Component[],
	) {

		super(content);
	}

	public get Raw(): Phaser.Group {

		return this.raw;
	}

	public compile(gui: Gui, parent?: Phaser.Group, root?: Gui | Component): void {

		gui.compile(this.content, this.raw = gui.add.group(parent), root || gui);
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		gui.preload(game, this.content, gui);
	}

	public update(gui: Gui, game: Phaser.Game): void {

		gui.update(game, this.group.content);
	}

	public debug(gui: Gui, callback: (...args: any[]) => void): void {

		gui.debug(this.content || []);
	}
}
