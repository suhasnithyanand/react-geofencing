import React from 'react';
import { connect } from 'react-redux';
import { centerMap, loadData, setFilter, zoomMap } from '../actions/appActions';
import { ExceptionsDashboard } from '../components';

const ExceptionsDashboardContainer = props => <ExceptionsDashboard {...props} />;

const mapStateToProps = state => ({
    center: state.app.center,
    data: state.app.data,
    exceptions: state.app.exceptions,
    filteredData: state.app.filteredData,
    filterValues: state.app.filterValues,
    filters: state.app.filters,
    zoom: state.app.zoom,
});

const mapDispatchToProps = {
    centerMap,
    loadData,
    setFilter,
    zoomMap,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExceptionsDashboardContainer);
