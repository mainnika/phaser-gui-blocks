'use strict';

import { Component, IComponent } from '../components';
import { Gui } from '../gui';

interface IFabric<T> extends IComponent {
	template: T;
}

class Fabric<T extends Component> extends Component {

	private constructed: T[];
	private game: Phaser.Game;
	private gui: Gui;
	private parent: Phaser.Group;
	private root: Gui | Fabric<T>;

	public constructor(
		private fabric: IFabric<T>,
	) {
		super(fabric);

		this.constructed = [];
	}

	public get New(): T {

		const template: T = this.fabric.template;
		const templateProps: {} = Phaser.Utils.extend(true, {}, template.Component);

		// tslint:disable-next-line:ban-types
		const templateCtr: { new (props?: {}): T } = (template as Object).constructor as { new (props?: {}): T };

		const constructed: T = new templateCtr(templateProps);

		constructed.compile(this.gui, this.parent, this.root);

		this.constructed.push(constructed);

		return constructed;
	}

	public get Raw(): T {

		return this.fabric.template;
	}

	public compile(gui: Gui, parent: Phaser.Group, root: Gui | Fabric<T>): void {

		this.gui = gui;
		this.parent = parent;
		this.root = root;
	}

	public debug(gui: Gui, callback: (...args: {}[]) => void): void {
		//
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		this.game = game;
		this.fabric.template.preload(gui, game);
	}

	public update(gui: Gui, game: Phaser.Game): void {

		gui.update(game, this.constructed);
	}
}

export { Fabric, IFabric };
