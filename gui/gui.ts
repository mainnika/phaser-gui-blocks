'use strict';

import * as Q from 'q';
import * as debug from 'debug';

import { configureDebug } from '../helpers/configureDebug';
import { Component, Group } from './components';

export { Gui };

const D: debug.IDebugger = configureDebug(debug)('Gui');

class Gui extends Phaser.State {

	private raws: { [id: string]: Component };

	private whenPreload: Q.Deferred<void>;
	private whenCreate: Q.Deferred<void>;

	public constructor(
		private root: Component[],
	) {

		super();

		// tslint:disable-next-line:no-null-keyword
		this.raws = Object.create(null);
		this.whenCreate = Q.defer<void>();
		this.whenPreload = Q.defer<void>();
	}

	public get WhenPreload(): Q.Promise<void> {

		return this.whenPreload.promise;
	}

	public get WhenCreate(): Q.Promise<void> {

		return this.whenCreate.promise;
	}

	public preload(game?: Phaser.Game, components?: Component[], gui?: Gui): void {

		if (this.WhenPreload.isFulfilled()) {
			return;
		}

		for (let component of components || this.root) {
			component.preload(gui || this, game || this.game);
		}

		if (components) {
			return;
		}

		this.whenPreload.resolve();
	}

	public create(): void {

		new Group({ content: this.root }).compile(this);

		this.whenCreate.resolve();
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
			component.debug(this, (...args: any[]): void => D(`Debug component %o`, args));
		}
	}
}
