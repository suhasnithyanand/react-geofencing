import Types from '../actions/actionTypes'
import initialState from './initialState'

const filterData = (data, filters) => {
    // filters is a complex construct of Type, Company and Delay filters
    const {types, company, delay, mode, region, /*port, terminal, carrier*/} = filters;

    return data.filter(item => {
        if (types.length && !types.find(type => type === item.exceptionType)) {
            return false;
        }
        if (company && item.customer !== company) {
            return false;
        }
        if (delay && item.exceptionMessage !== delay) {
            return false;
        }
        if (mode && item.drayType !== mode) {
            return false;
        }
        if (region && item.region !== region) {
            return false;
        }
        /*
        TODO data has no such values yet, we need to fix the data
        if (port && item.port !== delay) {
            return false;
        }
        if (terminal && item.terminal !== delay) {
            return false;
        }
        if (carrier && item.carrier !== delay) {
            return false;
        }
        */

        return true;
    })
};

const constructAvailableFilterValues = data => {
    // In JS hash maps work way faster than indexOf
    const valuesMap = data.reduce((result, item) => {
        if(!result.regions[item.region]) {
            result.regions[item.region] = true;
        }
        if(!result.customers[item.customer]) {
            result.customers[item.customer] = true;
        }
        if(!result.exceptions[item.exceptionType]) {
            result.exceptions[item.exceptionType] = true;
        }
        return result;
    }, {
        regions: {},
        ports: {},
        terminals: {},
        carriers: {},
        customers: {},
        exceptions: {}
    });

    return {
        regions: Object.keys(valuesMap.regions),
        ports: Object.keys(valuesMap.ports),
        terminals: Object.keys(valuesMap.terminals),
        carriers: Object.keys(valuesMap.carriers),
        customers: Object.keys(valuesMap.customers),
        exceptions: Object.keys(valuesMap.exceptions),
    }
};

export default function appReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case Types.LOAD_DATA:
            return {
                ...state,
                isFetching: true
            };
        case Types.LOAD_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                filteredData: filterData(action.payload, state.filters),
                filterValues: constructAvailableFilterValues(action.payload),
                isFetching: false
            };
        case Types.LOAD_DATA_FAILURE:
            return {
                ...state,
                isFetching: false
            };

        case Types.SET_FILTER:
            return {
                ...state,
                filters: action.payload,
                filteredData: filterData(state.data, action.payload, state.filters),
            };
        case Types.CENTER_MAP:
            return {
                ...state,
                zoom: action.payload.zoom,
                center: action.payload.center,
            };
        case Types.ZOOM_MAP:
            return {
                ...state,
                zoom: action.payload,
            };
        default:
            return state;
    }
}