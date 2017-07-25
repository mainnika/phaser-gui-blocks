// tslint:disable:no-any
'use strict';

export { States, IStatesRules };

interface IStatesRules<T, E> {
	from: T;
	raise: E;
	to: T;
}

class States<T, E> {

	private current: T;
	private resolver: (event: E) => void;
	private rules: any;

	public constructor(
		initial: T,
		rules: IStatesRules<T, E>[],
		resolver: (event: E) => void,
	) {

		this.current = initial;
		this.resolver = resolver;
		this.rules = {};

		for (const rule of rules) {
			const transitions: any = this.rules[rule.from] = this.rules[rule.from] ? this.rules[rule.from] : {};
			transitions[rule.to] = transitions[rule.to] ? transitions[rule.to] : rule.raise;
		}
	}

	public set State(value: T) {

		const possible: any = this.rules[this.current];

		if (possible === undefined || possible[value] === undefined) {
			return;
		}

		const raise: E = possible[value];

		this.current = value;
		this.resolver(raise);
	}

	public get State(): T {

		return this.current;
	}
}
