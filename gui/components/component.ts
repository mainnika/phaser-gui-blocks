'use strict';

import { Gui } from '../gui';

interface IComponent {
	id?: string;
}

abstract class Component {

	public static readonly MIDDLE: number = 0.5;

	public constructor(
		private component: IComponent,
	) {
	}

	public get Id(): string {

		return this.component.id;
	}

	public get Component(): IComponent {

		return this.component;
	}

	public abstract get Raw(): {};

	public abstract compile(gui: Gui, parent: Phaser.Group | Phaser.Sprite, root: Gui | Component): void;
	public abstract debug(gui: Gui, callback: (...args: {}[]) => void): void;
	public abstract preload(gui: Gui, game: Phaser.Game): void;
	public abstract update(gui: Gui, game: Phaser.Game): void;
}

export { Component, IComponent };
