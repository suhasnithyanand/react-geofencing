import createStore from './utils/create-store';
import initialState from './reducers/initialState';
import appReducer from './reducers/appReducer';

const reducers = {
  app: appReducer,
};

export default createStore(reducers, initialState);
