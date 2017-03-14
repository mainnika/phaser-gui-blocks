'use strict';

import { Preload } from './preload';

export { IComponent, IButton, IGroup, Type, State }

interface IComponent {
	type: Type | string;
	id?: string;
}

interface IButton extends IComponent {
	type: Type.Button | 'Button';
	x?: number;
	y?: number;
	url?: string;
	click?: Function;
	ctx?: Object;
}

interface IGroup extends IComponent {
	type: Type.Group | 'Group';
	include?: Component[];
}

type Component =
	| IButton
	| IGroup;

enum Type {
	Button,
	Text,
	Group,
}

class State extends Phaser.State {

	private skeleton: Component[];
	private preloads: Preload[];
	private root: Phaser.Group;
	private raws: { [key: string]: any };

	constructor(preloads: Preload[], skeleton: Component[]) {

		super();

		this.preloads = preloads;
		this.skeleton = skeleton;
		this.raws = {};
	}

	public preload(): void {

		for (const preloader of this.preloads) {
			preloader.preload(this);
		}
	}

	public create(): void {

		this.root = this.add.group();
		this.compiler(this.skeleton, this.root);
	}

	public update(): void {
		//
	}

	private compiler(components: Component[], parent: Phaser.Group): void {

		for (let component of components) {

			switch (component.type as Type | string) {

				case Type.Group:
				case Type[Type.Group]:
					this.group(component as IGroup, parent);
					break;

				case Type.Button:
				case Type[Type.Button]:
					this.button(component as IButton, parent);
					break;

				default:
					throw new Error(`invalid component type`);
			}
		}
	}

	private group(group: IGroup, parent: Phaser.Group): Phaser.Group {

		const id: string = group.id || String(Math.random());

		if (this.raws[id]) {
			throw new Error(`couldnt compile gui, element already exists, ${id}`);
		}

		const element: Phaser.Group = this.raws[id] = this.add.group(undefined, id);

		if (Array.isArray(group.include)) {
			this.compiler(group.include, element);
		}

		parent.add(element);

		return element;
	}

	private button(button: IButton, parent: Phaser.Group): Phaser.Button {

		const handler: Function | undefined = button.click ? this.createHandler(button.click, button.ctx) : undefined;
		const id: string = button.id || String(Math.random());
		const key: string = button.url || id;

		if (this.raws[id]) {
			throw new Error(`couldnt compile gui, element already exists, ${id}`);
		}

		const element: Phaser.Button = this.raws[id] = this.add.button(button.x, button.y, key, handler);

		parent.add(element);

		return element;
	}

	private createHandler(fn: Function, ctx: Object): Function {

		const self: Object = ctx || this;

		return function (): void {
			fn.apply(self, arguments);
		};
	}
}

