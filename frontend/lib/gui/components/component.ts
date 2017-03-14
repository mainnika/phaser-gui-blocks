'use strict';

import { Gui } from '../gui';

export { Component, IComponent };

interface IComponent {
	id?: string;
}

abstract class Component {

	private id: string | undefined;

	constructor(component: IComponent) {

		this.id = component.id;
	}

	public get Id(): string {

		return this.id;
	}

	public abstract get Raw(): any;

	public abstract create(gui: Gui, parent: Phaser.Group): void;
}
