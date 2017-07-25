'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from './component';

interface IAnimation extends IComponent {
	frames?: string[] | number[];
	atlas?: string;
	url?: string;
	width?: number;
	height?: number;
	max?: number;
	x: number;
	y: number;
}

class Animation extends Component {

	public static readonly FRAME_RATE: number = 25;

	private raw: Phaser.Sprite;

	public constructor(
		private animation: IAnimation,
	) {

		super(animation);
	}

	public get Raw(): Phaser.Sprite {

		return this.raw;
	}

	public setPosition(x: number, y: number): void {

		this.animation.x = x;
		this.animation.y = y;
	}

	public compile(gui: Gui, parent: Phaser.Group, root?: Gui | Component): void {

		const key: string = this.animation.atlas || this.animation.url;

		parent.add(this.raw = gui.add.sprite(this.animation.x, this.animation.y, key));

		this.raw.visible = false;
		this.raw.animations.add('default', this.animation.frames, Animation.FRAME_RATE)
			.onComplete.add(() => this.raw.visible = false);
	}

	public play(): void {

		this.raw.position.setTo(this.animation.x, this.animation.y);
		this.raw.visible = true;
		this.raw.animations.play('default');
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {

		this.raw.inputEnabled = true;
		this.raw.input.enableDrag(false);

		this.raw.visible = true;

		this.raw.events.onDragStop.add(() => callback(this, this.raw.position.x, this.raw.position.y));
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		if (this.animation.atlas) {
			return;
		}

		game.load.spritesheet(this.animation.url, this.animation.url, this.animation.width, this.animation.height, this.animation.max);
	}

	public update(gui: Gui, game: Phaser.Game): void {
		//
	}
}

export { Animation, IAnimation };
