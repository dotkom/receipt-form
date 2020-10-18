/** Requires an import of *anything* to allow additions to the global scope */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react'; // eslint-disable-line @typescript-eslint/no-unused-vars

declare global {
  interface Window {
    /**
     * We don't actually care about the type this function returns, we'll leave that to the Redux Team.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
}
