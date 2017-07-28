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
	frameRate?: number;
	loop?: boolean;
	doNotHide?: boolean;
}

class Animation extends Component {

	public static readonly FRAME_RATE: number = 25;

	private raw: Phaser.Sprite;
	private anim: Phaser.Animation;

	public constructor(
		private animation: IAnimation,
	) {

		super(animation);
	}

	public get Raw(): Phaser.Sprite {

		return this.raw;
	}

	public get Length(): number {

		// tslint:disable-next-line:no-magic-numbers
		return (1000 / this.anim.speed) * this.raw.animations.frameTotal;
	}

	public setPosition(x: number, y: number): void {

		this.animation.x = x;
		this.animation.y = y;
	}

	public compile(gui: Gui, parent: Phaser.Group, root: Gui | Component): void {

		const key: string = this.animation.atlas || this.animation.url;

		parent.add(this.raw = gui.add.sprite(this.animation.x, this.animation.y, key));

		this.raw.visible = false;
		this.anim = this.raw.animations.add('default', this.animation.frames, this.animation.frameRate || Animation.FRAME_RATE, this.animation.loop);
	}

	public play(): Promise<void> {

		this.raw.position.setTo(this.animation.x, this.animation.y);
		this.raw.visible = true;

		if (this.animation.loop) {
			this.anim.play();

			return Promise.resolve();
		}

		return new Promise((resolve: () => void): void => {

			this.anim.play()
				.onComplete.addOnce(() => (resolve(), this.raw.visible = !!this.animation.doNotHide));
		});
	}

	public stop(): void {

		this.anim.stop(true);
	}

	public hide(): void {

		this.raw.visible = false;
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
