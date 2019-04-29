import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

export default (reducers, initialState) => {
    const rootReducer = combineReducers({
        ...reducers
    });

    const middlewares = [thunkMiddleware];

    if (process.env.NODE_ENV === 'development') {
        // Collapse all logs and ignore system-level logs (show only app-specific)
        const loggerMiddleware = createLogger({
            collapsed: true,
            predicate: (getState, action) => action.type && !action.type.match(/^@@/)
        });

        middlewares.push(loggerMiddleware);
    }

    return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
};
