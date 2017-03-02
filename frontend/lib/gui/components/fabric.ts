'use strict';

import { Gui } from '../gui';
import { Component, IComponent } from '../components';

export { Fabric, IFabric };

interface IFabric<T> extends IComponent {
	template: T;
}

class Fabric<T extends Component> extends Component {

	private gui: Gui;
	private game: Phaser.Game;
	private parent: Phaser.Group;
	private root: Gui | Fabric<T>;
	private constructed: T[];

	public constructor(
		private fabric: IFabric<T>,
	) {
		super(fabric);

		this.constructed = [];
	}

	public get New(): T {

		let template: T = this.fabric.template;
		let templateCtr: any = (template as Object).constructor;

		let constructed: T = new templateCtr(template.Component);

		constructed.preload(this.gui, this.game);
		constructed.compile(this.gui, this.parent, this.root);

		this.constructed.push(constructed);

		return constructed;
	}

	public get Raw(): any {

		return this.fabric.template;
	}

	public compile(gui: Gui, parent: Phaser.Group, root: Gui | Fabric<T>): void {

		this.gui = gui;
		this.parent = parent;
		this.root = root;
	}

	public preload(gui: Gui, game: Phaser.Game): void {

		this.game = game;
		this.fabric.template.preload(gui, game);
	};

	public update(gui: Gui, game: Phaser.Game): void {

		gui.update(game, this.constructed);
	}

	public debug(gui: Gui, callback: (...args: any[]) => void): void {
		//
	};
}
