'use strict';

export { Signals }

class Signals<E> {

	private signals: { [on: number]: Phaser.Signal };

	public constructor() {

		this.signals = {};
	}

	public on(event: E, cb: Function): void {

		const signal: Phaser.Signal = this.signals[event as any] = this.signals[event as any] || new Phaser.Signal();
		signal.add(cb);
	}

	public once(event: E, cb: Function): void {

		const signal: Phaser.Signal = this.signals[event as any] = this.signals[event as any] || new Phaser.Signal();
		signal.addOnce(cb);
	}

	public emit(event: E, ...args: any[]): void {

		const signal: Phaser.Signal = this.signals[event as any];

		if (!signal) {
			return;
		}

		signal.dispatch(...args);
	}
}
