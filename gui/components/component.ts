'use strict';

import { Gui } from '../gui';

export { Component, IComponent };

interface IComponent {
	id?: string;
}

abstract class Component {

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

	public abstract get Raw(): any;

	public abstract compile(gui: Gui, parent: Phaser.Group, root: Gui | Component): void;
	public abstract preload(gui: Gui, game: Phaser.Game): void;
	public abstract update(gui: Gui, game: Phaser.Game): void;
	public abstract debug(gui: Gui, callback: (...args: any[]) => void): void;
}
