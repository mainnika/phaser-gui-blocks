'use strict';

import { Gui } from '../gui';
import { Component } from './component';

export { Modal }

class Modal extends Component {

	private visible: boolean;
	private raw: Phaser.Group;
	private owner: Gui;

	public constructor(
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

	public update(gui: Gui, game: Phaser.Game): void {

		if (!this.visible) {
			return;
		}

		gui.update(game, this.content);
	}

	public show(): void {

		if (this.visible) {
			this.hide();
		}

		this.owner.compile(this.content, this.raw, this);
		this.visible = true;
	}

	public hide(): void {

		this.raw.removeAll(true);
		this.visible = false;
	}

	public debug(gui: Gui, callback: (...args: any[]) => void): void {

		if (!this.visible) {
			return;
		}

		gui.debug(this.content || []);
	}
}
