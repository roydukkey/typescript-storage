// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { commonPlugins } from '../../build/rollup.plugins';
import { config } from '../../package.json';
import { join } from 'path';
import { main, module, name, version } from './package.json';


const basePath = `./packages/${name}`;
const input = join(basePath, './index.ts');


export default [

	{
		input,
		output: {
			file: join(basePath, module),
			format: 'es'
		},
		plugins: commonPlugins(name, version)
	},

	{
		input,
		output: {
			name: config.subPackages[name],
			file: join(basePath, main),
			format: 'umd'
		},
		plugins: commonPlugins(name, version, {
			declaration: false
		})
	}

];
