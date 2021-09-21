// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import CookiePackage from './packages/typescript-cookie-storage/rollup.config';
import EnvironmentPackage from './packages/typescript-env/rollup.config';
import WebPackage from './packages/typescript-web-storage/rollup.config';
import { commonPlugins } from './build/rollup.plugins';
import { config, main, module, name, version } from './package.json';


const input = './packages/index.ts';

const external = [
	'typescript-env',
	'typescript-web-storage',
	'typescript-cookie-storage'
];


export default [

	{
		input,
		external,
		output: {
			file: module,
			format: 'es'
		},
		plugins: commonPlugins(name, version)
	},

	{
		input,
		external,
		output: {
			name,
			file: main,
			format: 'umd',
			globals: {
				...config.subPackages
			}
		},
		plugins: commonPlugins(name, version, {
			declaration: false
		})
	},

	...CookiePackage,
	...EnvironmentPackage,
	...WebPackage
];
