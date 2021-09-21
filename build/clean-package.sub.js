// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


const { indent } = require('./clean-package.main');
const { basename } = require('path');
const packageName = basename(process.cwd());


const {
	homepage,
	author,
	license,
	repository,
	bugs,
	devDependencies
} = require('../package.json');


const completePackage = require(`../packages/${packageName}/package.json`);


const { name, description, version, dependencies, ...package } = completePackage;
delete package['clean-package'];


module.exports = {
	indent,
	remove: Object.keys(completePackage),
	replace: {
		name,
		description,
		version,
		author,
		license,
		repository,
		homepage: homepage.replace('#readme', `/tree/master/packages/${name}$&`),
		bugs,
		...package,
		dependencies,
		devDependencies
	}
};
