'use strict';

import { Gui } from '../gui';
import { Component } from './component';

export { Group, IGroup }

interface IGroup {
	include?: Component[];
}

class Group extends Component {

	private raw: Phaser.Group;

	constructor(
		private group: IGroup,
	) {

		super(group);
	}

	public get Raw(): Phaser.Group {

		return this.raw;
	}

	public create(gui: Gui, parent?: Phaser.Group): void {

		this.raw = gui.add.group(parent);

		if (Array.isArray(this.group.include)) {
			gui.compile(this.group.include, this.raw);
		}
	}
}
