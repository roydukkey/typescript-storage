// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { WebStorage } from './WebStorage';


/** This class provides typed access to a particular domain's local storage. */
export class LocalStorage extends WebStorage {

	protected readonly store = window.localStorage;

}
