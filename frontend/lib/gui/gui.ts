'use strict';

import { Preload } from './preload';
import { Component, Group } from './components';

export { Gui };

class Gui extends Phaser.State {

	private raws: { [id: string]: Component };

	constructor(
		private preloads: Preload[],
		private skeleton: Component[],
	) {

		super();

		// tslint:disable-next-line:no-null-keyword
		this.raws = Object.create(null);
	}

	public preload(): void {

		for (const preloader of this.preloads) {
			preloader.preload(this);
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

