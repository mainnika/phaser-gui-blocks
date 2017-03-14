'use strict';

export { IComponent, State, Type }

enum Type {
	Button,
	Text,
	Group,
}

interface IComponent {
	type: Type | string;
	id?: string;
	x?: number;
	y?: number;
	key?: string;
	click?: Function;
	include?: IComponent[];
}

class State extends Phaser.State {

	private skeleton: IComponent[];
	private root: Phaser.Group;
	private raws: { [key: string]: any };

	constructor(skeleton: IComponent[]) {

		super();

		this.skeleton = skeleton;
		this.raws = {};
	}

	public preload(): void {

		this.load.spritesheet('btn_blue_simple', '../img/controls/buttons/btn_blue_simple.png', 220, 102, 3);
	}

	public create(): void {

		this.root = this.add.group();
		this.compiler(this.skeleton, this.root);
	}

	public update(): void {
		//
	}

	private compiler(components: IComponent[], parent: Phaser.Group): any {

		for (let component of components) {

			switch (component.type as Type | string) {

				case Type.Group:
				case Type[Type.Group]:
					this.group(component, parent);
					break;

				case Type.Button:
				case Type[Type.Button]:
					this.button(component, parent);
					break;

				default:
					throw new Error(`invalid component type`);
			}
		}
	}

	private group(group: IComponent, parent: Phaser.Group): Phaser.Group {

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

	private button(button: IComponent, parent: Phaser.Group): Phaser.Button {

		const handler: Function | undefined = button.click ? this.createHandler(button.click) : undefined;
		const id: string = button.id || String(Math.random());
		const key: string = button.key || id;

		if (this.raws[id]) {
			throw new Error(`couldnt compile gui, element already exists, ${id}`);
		}

		const element: Phaser.Button = this.raws[id] = this.add.button(button.x, button.y, key, handler);

		parent.add(element);

		return element;
	}

	private createHandler(fn: Function): Function {

		const self: State = this;

		return function (): void {
			fn.apply(self, arguments);
		};
	}
}

