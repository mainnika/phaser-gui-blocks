// tslint:disable
'use strict';

import * as debug from 'debug';

const customFormatArgsFactory = (debugModule: debug.IDebug): (...args: any[]) => any[] => {

	// tslint:disable-next-line:no-string-literal
	const moduleFormatArgs: any = debugModule['formatArgs'];

	/* tslint:disable:no-invalid-this */
	const customFormatArgs: any = (args: any[]): any[] => {

		if (this.useColors) {
			moduleFormatArgs.call(this, args);

			let arg: string = '  '
				+ `%c${new Date().toISOString()}%c `
				+ `${args.shift()}`;

			args.unshift(arg, 'color: red; background: black', 'color: inherit');
		} else {
			args[0] = '  '
				+ `${new Date().toISOString()} `
				+ `${args[0]}`;
		}

		return args;
	};
	/* tslint:enable:no-invalid-this */

	Object.defineProperty(
		customFormatArgs,
		'customized',
		{
			configurable: false,
			enumerable: true,
			value: true,
			writable: false,
		},
	);

	return customFormatArgs;
};

const configureDebug = (debugModule: debug.IDebug): debug.IDebug => {

	// tslint:disable:no-string-literal
	if (!(debugModule['formatArgs'] && debugModule['formatArgs'].customized)) {
		debugModule['formatArgs'] = customFormatArgsFactory(debugModule);
	}
	// tslint:enable:no-string-literal

	return debugModule;
};

export { configureDebug }
