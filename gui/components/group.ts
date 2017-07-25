'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

interface IGroup extends IComponent {
	content: Component[];
}

class Group extends Component {

	private raw: Phaser.Group;

	public constructor(
		private group: IGroup,
	) {

		super(group);
	}

	public get Raw(): Phaser.Group {

		return this.raw;
	}

	public compile(gui: Gui, parent?: Phaser.Group | Phaser.Sprite, root?: Gui | Component): void {

		gui.compile(this.group.content, this.raw = gui.add.group(parent), root || gui);
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {

		gui.debug(this.group.content);
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		gui.preload(game, this.group.content, gui);
	}

	public update(gui: Gui, game: Phaser.Game): void {

		gui.update(game, this.group.content);
	}
}

export { Group, IGroup };
