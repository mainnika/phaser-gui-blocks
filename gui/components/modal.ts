'use strict';

import { Gui } from '../gui';
import { Component } from './component';

class Modal extends Component {

	public static readonly SHADOW_COLOR: number = 0x7F7679;
	public static readonly TRANSPARENCY: number = 0.75;

	private owner: Gui;
	private raw: Phaser.Group;
	private visible: boolean;
	private shadow: Phaser.Graphics;

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

		this.shadow = this.owner.add.graphics(0, 0);
		this.shadow.inputEnabled = true;
		this.shadow.beginFill(Modal.SHADOW_COLOR, Modal.TRANSPARENCY);
		this.shadow.drawRect(0, 0, this.owner.game.width, this.owner.game.height);
		this.shadow.endFill();

		this.raw.addChild(this.shadow);
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
