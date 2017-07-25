'use strict';

import * as debug from 'debug';

import { configureDebug } from '../helpers/configure-debug';
import { Signals } from '../helpers/signals';
import { Component, Group } from './components';

enum GuiEvent {
	Preloaded,
	Created,
}

const D: debug.IDebugger = configureDebug(debug)('Gui');

class Gui extends Phaser.State {

	private events: Signals<GuiEvent>;
	private isCreated: boolean;
	private isPreloaded: boolean;
	private raws: { [id: string]: Component };

	public constructor(
		private root: Component[],
	) {

		super();

		// tslint:disable-next-line:no-null-keyword
		this.raws = Object.create(null);
		this.events = new Signals<GuiEvent>();
	}

	public get GuiEvents(): Signals<GuiEvent> {

		return this.events;
	}

	public get IsPreloaded(): boolean {

		return this.isPreloaded;
	}

	public get IsCreated(): boolean {

		return this.isCreated;
	}

	public compile(components: Component[], parent: Phaser.Group | Phaser.Sprite, root: Gui | Component): void {

		for (const component of components) {
			component.compile(this, parent, root);
			this.raws[component.Id || String(Math.random())] = component;
		}
	}

	public create(): void {

		new Group({ content: this.root }).compile(this);

		this.isCreated = true;
		this.events.emit(GuiEvent.Created);
	}

	public debug(components?: Component[]): void {

		for (const component of components || this.root) {
			component.debug(this, (...args: {}[]): void => D(`Debug component %o`, args));
		}
	}

	public preload(game?: Phaser.Game, components?: Component[], gui?: Gui): void {

		if (this.isPreloaded) {
			return;
		}

		for (const component of components || this.root) {
			component.preload(gui || this, game || this.game);
		}

		if (components) {
			return;
		}

		this.isPreloaded = true;
		this.events.emit(GuiEvent.Preloaded);
	}

	public update(game?: Phaser.Game, components?: Component[], gui?: Gui): void {

		for (const component of components || this.root) {
			component.update(gui || this, game || this.game);
		}
	}
}

export { Gui, GuiEvent };
