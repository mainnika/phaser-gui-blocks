'use strict';

import { Component, Group } from './components';

export { Gui };

class Gui extends Phaser.State {

	private raws: { [id: string]: Component };

	constructor(
		private root: Component[],
	) {

		super();

		// tslint:disable-next-line:no-null-keyword
		this.raws = Object.create(null);
	}

	public preload(game?: Phaser.Game, components?: Component[], gui?: Gui): void {

		for (let component of components || this.root) {
			component.preload(gui || this, game || this.game);
		}
	}

	public create(): void {

		new Group(this.root).compile(this);
	}

	public update(): void {
		//
	}

	public compile(components: Component[], parent: Phaser.Group): void {

		for (let component of components) {
			component.compile(this, parent);
			this.raws[component.Id || String(Math.random())] = component;
		}
	}
}

