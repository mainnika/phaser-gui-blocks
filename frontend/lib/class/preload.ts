'use strict';

export { Preload, Spritesheet }

abstract class Preload {

	public abstract preload(state: Phaser.State): void;
}

class Spritesheet extends Preload {

	constructor(
		public url: string,
		public width: number,
		public height: number,
		public max?: number,
	) {

		super();
	}

	public preload(state: Phaser.State): void {

		state.load.spritesheet(this.url, this.url, this.width, this.height, this.max);
	}
}
