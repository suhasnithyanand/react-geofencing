import Types from '../actions/actionTypes';
import HTTPService from '../services/HTTPService';
import {createAction, createAsyncAction} from '../utils/utils';

export const serverError = createAction(Types.SERVER_ERROR);

export const serverErrorHandler = (dispatch, error) =>
    dispatch(serverError(error));

export const disposeServerError = createAction(Types.DISPOSE_SERVER_ERROR);

export const loadData = createAsyncAction(
    Types.LOAD_DATA,
    (dispatch, data) => {
        dispatch({ type: Types.LOAD_DATA, payload: data });
        return HTTPService.get(`load-data`, {}, data);
    },
    serverErrorHandler
);

export const setFilter = createAction(Types.SET_FILTER);

export const centerMap = createAction(Types.CENTER_MAP);

export const zoomMap = createAction(Types.ZOOM_MAP);
