import { Action, applyMiddleware, createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import reducer from "./reducers/reducer";

type RootReducerType = typeof reducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// window.__store__ = store
