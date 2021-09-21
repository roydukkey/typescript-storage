// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


export const isTestingBuild = process.env.JEST_TEST?.toLowerCase() === 'build';
