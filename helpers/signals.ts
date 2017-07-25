// tslint:disable:no-any
'use strict';

class Signals<E> {

	private signals: { [on: number]: Phaser.Signal };

	public constructor() {

		this.signals = {};
	}

	public emit(event: E, ...args: any[]): void {

		const signal: Phaser.Signal = this.signals[event as any];

		if (!signal) {
			return;
		}

		signal.dispatch(...args);
	}

	// tslint:disable-next-line:ban-types
	public on(event: E, cb: Function): void {

		const signal: Phaser.Signal = this.signals[event as any] = this.signals[event as any] || new Phaser.Signal();
		signal.add(cb);
	}

	// tslint:disable-next-line:ban-types
	public once(event: E, cb: Function): void {

		const signal: Phaser.Signal = this.signals[event as any] = this.signals[event as any] || new Phaser.Signal();
		signal.addOnce(cb);
	}
}

export { Signals };
