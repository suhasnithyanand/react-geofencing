import {defaultCenter, defaultZoom, initialFilter} from "../constants";

export default {
    app: {
        data: [],
        exceptions: [],
        filteredData: [],
        filterValues: {
            regions: [],
            ports: [],
            terminals: [],
            carriers: [],
            customers: [],
            exceptions: []
        },
        filters: {...initialFilter},
        zoom: defaultZoom,
        center: defaultCenter,
    }
}
