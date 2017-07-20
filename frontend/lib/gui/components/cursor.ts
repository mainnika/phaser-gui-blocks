'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

interface ICursor extends IComponent {
	frame?: string | number;
	atlas?: string;
	url?: string;
	width?: number;
	height?: number;
}

class Cursor extends Component {

	private static active: Cursor;

	private gui: Gui;
	private raw: Phaser.Sprite;
	private active: boolean;

	public constructor(
		private cursor: ICursor,
	) {

		super(cursor);
	}

	public get Raw(): Phaser.Sprite {

		return this.raw;
	}

	public set Active(value: boolean) {

		if (!value) {
			this.raw.visible = this.active = false;
			this.gui.game.canvas.style.cursor = '';
			Cursor.active = undefined;

			return;
		}

		if (Cursor.active) {
			Cursor.active.Active = false;
		}

		this.raw.visible = this.active = true;
		Cursor.active = this;
	}

	public get Active(): boolean {

		return this.active;
	}

	public compile(gui: Gui, parent: Phaser.Group, root?: Gui | Component): void {

		const key: string = this.cursor.atlas || this.cursor.url;
		const frame: string | number = this.cursor.frame;

		parent.add(this.raw = gui.add.sprite(0, 0, key, frame));

		this.gui = gui;
		this.raw.anchor.setTo(Cursor.MIDDLE, Cursor.MIDDLE);
		this.raw.visible = false;
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {

		this.raw.inputEnabled = true;
		this.raw.input.enableDrag(false);

		this.raw.visible = true;

		this.raw.events.onDragStop.add(() => callback(this, this.raw.position.x, this.raw.position.y));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		if (this.cursor.atlas) {
			return;
		}

		game.load.spritesheet(this.cursor.url, this.cursor.url, this.cursor.width, this.cursor.height);
	}

	public update(gui: Gui, game: Phaser.Game): void {

		if (!this.active) {
			return;
		}

		if (!this.gui.game.canvas.style.cursor) {
			this.gui.game.canvas.style.cursor = 'none';
		}

		this.raw.position.setTo(this.gui.game.input.mousePointer.x, this.gui.game.input.mousePointer.y);
	}
}

export { Cursor, ICursor };
