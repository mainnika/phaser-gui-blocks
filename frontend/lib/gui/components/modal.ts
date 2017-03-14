'use strict';

import { Gui } from '../gui';
import { Component } from './component';

export { Modal }

class Modal extends Component {

	private raw: Phaser.Group;
	private owner: Gui;

	constructor(
		private content: Component[],
	) {

		super({});
	}

	public get Raw(): never {

		throw new Error(`not implemented`);
	}

	public compile(gui: Gui, parent: Phaser.Group, root?: Gui | Component): void {

		this.owner = gui;
		this.raw = gui.add.group(parent);
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		gui.preload(game, this.content, gui);
	}

	public show(): void {

		this.owner.compile(this.content, this.raw, this);
	}

	public hide(): void {

		this.raw.removeAll(true);
	}

	public debug(gui: Gui, callback: (...args: any[]) => void): void {

		gui.debug(this.content || []);
	}
}
