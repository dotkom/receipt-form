/** Requires an import of *anything* to allow additions to the global scope */
// @ts-ignore
import React from 'react';

declare global {
  // tslint:disable-next-line interface-name
  interface Window {
    /**
     * We don't actually care about the type this function returns, we'll leave that to the Redux Team.
     */
    // tslint:disable-next-line no-any
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
}
