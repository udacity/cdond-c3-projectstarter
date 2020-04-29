import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { logger } from 'app/middleware';
import { RootState, rootReducer } from 'app/reducers';
import thunk from 'redux-thunk';

export function configureStore(
  history: History,
  initialState?: RootState,
): Store<RootState> {
  let middleware = applyMiddleware(logger, thunk, routerMiddleware(history));

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(
    connectRouter(history)(rootReducer) as any,
    initialState as any,
    middleware,
  ) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
