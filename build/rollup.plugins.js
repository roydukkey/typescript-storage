// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { version as browserslistVersion } from 'browserslist/package.json';
import license from 'rollup-plugin-license';
import typescript from 'rollup-plugin-ts';
import { author, browserslist, repository } from '../package.json';


export const commonPlugins = (name, version, tsConfig) => [

	typescript({
		transpiler: 'babel',
		tsconfig: (config) => ({
			...config,
			target: undefined, // Remove target in favor of browserslist
			...tsConfig
		})
	}),

	license({
		banner: {
			commentStyle: 'none',
			content: `/*! ${
				[
					`${name} v${version}`,
					`(c) ${author.name}`,
					repository.url.replace('.git', `/blob/v${version}/LICENSE`),
					`@browserslist v${browserslistVersion}: ${browserslist.join(', ')}`
				].join(' | ')
			} */`
		}
	})

];
