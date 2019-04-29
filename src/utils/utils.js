/**
 * create action helper (borrowed from here https://github.com/keuller/redux-action-help)
 * @param name
 * @returns {Function}
 */
export const createAction = name =>
  function(data, err) {
    return { type: name, payload: data, error: err };
  };

/**
 * create dynamic action helper (borrowed from here https://github.com/keuller/redux-action-help)
 * @param name
 * @param fn
 * @returns {Function}
 */
export const createDynamicAction = (name, fn) =>
  function(data) {
    const payload = data ? fn(data) : fn();
    return { type: name, payload, error: null };
  };

/**
 * create thunk action helper (borrowed from here https://github.com/keuller/redux-action-help)
 * @param type
 * @param fn
 * @param errorHandler
 * @returns {Function}
 */
export const createAsyncAction = (type, fn, errorHandler) =>
  function(data) {
    return function(dispatch, getState) {
      let customType = type;
      const result = fn(dispatch, data, getState);
      if (result && !!result.then) {
        return result
          .then(resp => {
            customType = `${type}_SUCCESS`;
            dispatch({ type: customType, payload: resp, error: null });
            // return json response up in promise chain
            return resp;
          })
          .catch(err => {
            customType = `${type}_FAIL`;
            dispatch({ type: customType, payload: null, error: err });
            // trigger error handling (this can be redux-form SubmissionError emitter or etc)
            if (errorHandler) return errorHandler(dispatch, err);
            // re-throw the error if no error handling was provided
            throw err;
          });
      }

      return null;
    };
  };

export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
};

export const handleRequest = () => state => ({
  ...state,
  isFetching: true
});

export const handleSuccess = () => state => ({
  ...state,
  isFetching: false
});

export const handleFailure = () => (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error
});
