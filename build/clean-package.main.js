// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


const { config: { subPackages }, devDependencies } = require('../package.json');


module.exports = {
	indent: '\t',
	extends: 'clean-package/common',
	remove: ['config', 'scripts', 'devDependencies'],
	replace: {
		dependencies: Object.fromEntries(Object.entries(subPackages).map(([name]) => {
			return [
				name,
				`~${require(`../packages/${name}/package.json`).version}`
			];
		})),
		devDependencies
	}
};
