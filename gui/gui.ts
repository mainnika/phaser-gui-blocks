'use strict';

import * as debug from 'debug';
import { defer, Deferred } from 'when';

import { configureDebug } from '../helpers/configure-debug';
import { Component, Group } from './components';

export { Gui };

const D: debug.IDebugger = configureDebug(debug)('Gui');

class Gui extends Phaser.State {

	private raws: { [id: string]: Component };

	private whenPreload: Deferred<void>;
	private whenCreate: Deferred<void>;

	private isPreloaded: boolean;
	private isCreated: boolean;

	public constructor(
		private root: Component[],
	) {

		super();

		// tslint:disable-next-line:no-null-keyword
		this.raws = Object.create(null);
		this.whenCreate = defer<void>();
		this.whenPreload = defer<void>();
	}

	public get WhenPreload(): Promise<void> {

		return this.whenPreload.promise;
	}

	public get WhenCreate(): Promise<void> {

		return this.whenCreate.promise;
	}

	public get IsPreloaded(): boolean {

		return this.isPreloaded;
	}

	public get IsCreated(): boolean {

		return this.isCreated;
	}

	public preload(game?: Phaser.Game, components?: Component[], gui?: Gui): void {

		if (this.isPreloaded) {
			return;
		}

		for (let component of components || this.root) {
			component.preload(gui || this, game || this.game);
		}

		if (components) {
			return;
		}

		this.isPreloaded = true;
		this.whenPreload.resolve();
	}

	public create(): void {

		new Group({ content: this.root }).compile(this);

		this.isCreated = true;
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
