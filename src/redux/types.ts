import { Store as ReduxStore } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { rootReducer } from './reducers';

export type State = ReturnType<typeof rootReducer>;
export type Action = Parameters<typeof rootReducer>[1];
export type Store = ReduxStore<State, Action>;
export type Dispatch = Store['dispatch'];
export type ThunkResult<R> = ThunkAction<R, State, undefined, Action>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Thunk<T = void> = (...args: any[]) => (dispatch: Dispatch, getState: Store['getState']) => Promise<T>;
