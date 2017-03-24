'use strict';

import * as debug from 'debug';

import { configureDebug } from '../helpers/configure-debug';
import { Signals } from '../helpers/signals';
import { Component, Group } from './components';

export { Gui, GuiEvent };

enum GuiEvent {
	Preloaded,
	Created,
}

const D: debug.IDebugger = configureDebug(debug)('Gui');

class Gui extends Phaser.State {

	private raws: { [id: string]: Component };

	private events: Signals<GuiEvent>;

	private isPreloaded: boolean;
	private isCreated: boolean;

	public constructor(
		private root: Component[],
	) {

		super();

		// tslint:disable-next-line:no-null-keyword
		this.raws = Object.create(null);
		this.events = new Signals<GuiEvent>();
	}

	public get Events(): Signals<GuiEvent> {

		return this.events;
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
		this.events.emit(GuiEvent.Preloaded);
	}

	public create(): void {

		new Group({ content: this.root }).compile(this);

		this.isCreated = true;
		this.events.emit(GuiEvent.Created);
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
