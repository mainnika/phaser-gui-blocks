'use strict';

import * as debug from 'debug';

import { configureDebug } from '../helpers/configureDebug';
import { Component, Group } from './components';

export { Gui };

class Gui extends Phaser.State {

	private static D: debug.IDebugger = configureDebug(debug)('Gui');

	private raws: { [id: string]: Component };

	public constructor(
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

	public update(game?: Phaser.Game, components?: Component[], gui?: Gui): void {

		for (let component of components || this.root) {
			component.update(gui || this, game || this.game);
		}
	}

	public compile(components: Component[], parent: Phaser.Group, root: Gui | Component): void {

		for (let component of components) {
			component.compile(this, parent, root);
			this.raws[component.Id || String(Math.random())] = component;
		}
	}

	public debug(components?: Component[]): void {

		for (let component of components || this.root) {
			component.debug(this, (...args: any[]): void => Gui.D(`Debug component %o`, args));
		}
	}
}
