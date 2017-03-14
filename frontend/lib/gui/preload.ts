'use strict';

export { Preload, Spritesheet, Image }

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

class Image extends Preload {

	constructor(
		public url: string,
	) {

		super();
	}

	public preload(state: Phaser.State): void {

		state.load.image(this.url, this.url);
	}
}