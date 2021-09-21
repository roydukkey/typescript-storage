// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { isTestingBuild } from './isTestingBuild';


export const configurePackages = <P extends [string, P[1]]> (srcPackage: P, ...otherPackages: P[]): P[] => {
	const packages: P[] = [srcPackage];

	if (isTestingBuild) {
		packages.push(...otherPackages);
	}

	return packages;
};
