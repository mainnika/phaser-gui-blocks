'use strict';

import { Gui } from '../gui';
import { Component } from './component';

class Modal extends Component {

	private owner: Gui;
	private raw: Phaser.Group;
	private visible: boolean;

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

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {

		if (!this.visible) {
			return;
		}

		gui.debug(this.content || []);
	}

	public hide(): void {

		this.raw.removeAll(true);
		this.visible = false;
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		gui.preload(game, this.content, gui);
	}

	public show(): void {

		if (this.visible) {
			this.hide();
		}

		this.owner.compile(this.content, this.raw, this);
		this.visible = true;
	}

	public update(gui: Gui, game: Phaser.Game): void {

		if (!this.visible) {
			return;
		}

		gui.update(game, this.content);
	}
}

export { Modal };
