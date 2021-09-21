// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


import { globbySync } from 'globby';
import { rmSync } from 'fs';


globbySync(['./**/dist', '!node_modules'], {

	onlyFiles: false

}).forEach((path) => rmSync(path, { recursive: true, force: true }));
