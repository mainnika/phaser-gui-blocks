'use strict';

import { Component, Group } from './components';

export { Gui };

class Gui extends Phaser.State {

	private raws: { [id: string]: Component };

	constructor(
		private skeleton: Component[],
	) {

		super();

		// tslint:disable-next-line:no-null-keyword
		this.raws = Object.create(null);
	}

	public preload(game?: Phaser.Game, components?: Component[], gui?: Gui): void {

		for (let component of components || this.skeleton) {
			component.load(gui || this, game || this.game);
		}
	}

	public create(): void {

		new Group({ include: this.skeleton }).create(this);
	}

	public update(): void {
		//
	}

	public compile(components: Component[], parent: Phaser.Group): void {

		for (let component of components) {
			component.create(this, parent);
			this.raws[component.Id || String(Math.random())] = component;
		}
	}
}

