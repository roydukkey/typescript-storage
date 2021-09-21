// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { commonPlugins } from '../../build/rollup.plugins';
import { config } from '../../package.json';
import { join } from 'path';
import { main, module, name, version } from './package.json';


const basePath = `./packages/${name}`;
const input = join(basePath, './index.ts');

const external = [
	'universal-cookie'
];


export default [

	{
		input,
		external,
		output: {
			file: join(basePath, module),
			format: 'es'
		},
		plugins: commonPlugins(name, version)
	},

	{
		input,
		external,
		output: {
			name: config.subPackages[name],
			file: join(basePath, main),
			format: 'umd',
			globals: {
				'universal-cookie': 'UniversalCookie'
			}
		},
		plugins: commonPlugins(name, version, {
			declaration: false
		})
	}

];
