import React, {Component} from 'react';
import PropTypes from "prop-types";
import Paper from '@material-ui/core/Paper';
import ArrowLeftSharp from '@material-ui/icons/ArrowLeftSharp';
import ArrowRightSharp from '@material-ui/icons/ArrowRightSharp';
import {ChartsHolder, FilterSidebar, GoogleMapView, ExceptionsList, MapOverlay, TopBar} from './';
import '../static/ExceptionsDashboard.css';

class ExceptionsDashboard extends Component {

    static propTypes = {
        center: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired,
        exceptions: PropTypes.array.isRequired,
        filteredData: PropTypes.array.isRequired,
        filters: PropTypes.object.isRequired,
        filterValues: PropTypes.object.isRequired,
        loadData: PropTypes.func.isRequired,
        setFilter: PropTypes.func.isRequired,
        centerMap: PropTypes.func.isRequired,
        zoomMap: PropTypes.func.isRequired,
        zoom: PropTypes.number.isRequired,
    };

    state = {
        isFilterOpen: false,
        isOpen: true,
        sidebarWidth: 0,
        exceptionsAvailableHeight: 100,
    };

    componentDidMount() {
        this.props.loadData();
        window.addEventListener('resize', this.calculateAvailableSpace);
        // give some time for browser repaint to finish
        window.setTimeout(this.calculateAvailableSpace, 0);
    }

    componentDidUpdate(oldProps) {
        // recalculate the height for exceptions list every time filter changes
        if(oldProps.filters !== this.props.filters) {
            // we need a delay for chart to get displayed and take it's space
            window.setTimeout(this.calculateAvailableSpace, 100);
        }
    }

    // calculateAvailableSpace = () => {
    //     const sidebar = document.getElementById('sidebar');
    //     const chartHolder = document.getElementById('charts-holder');
    //     const inifiniteContainer = sidebar.getElementsByClassName('infinite-scroll')[0];

    //     this.setState({
    //         sidebarWidth: sidebar.offsetWidth,
    //         exceptionsAvailableHeight: sidebar.offsetHeight - chartHolder.offsetHeight
    //             - chartHolder.offsetTop - inifiniteContainer.offsetTop,
    //     })
    // };

    // toggleSidebar = () => {
    //     this.setState({isOpen: !this.state.isOpen});
    // };

    // handleBookMarkToggle = () => {
    //     // to be implemented
    // };

    // handleFilterToggle = () => {
    //     this.setState({isFilterOpen: !this.state.isFilterOpen});
    // };

    render() {
        const {
            center,
            data,
            exceptions,
            centerMap,
            filteredData,
            filters,
            setFilter,
            zoom,
            zoomMap,
            filterValues,
        } = this.props;
        const {exceptionsAvailableHeight, isFilterOpen, isOpen, sidebarWidth}= this.state;

        return (
             
                <div className={'dashboard'}>
                    <div id="MapContainer">
                        {/* <MapOverlay data={data}
                                    center={center}
                                    centerMap={centerMap}
                                    filteredData={filteredData}
                                    filters={filters}
                                    setFilter={setFilter}
                                    zoom={zoom}/> */}
                        <GoogleMapView center={center}
                                       centerMap={centerMap}
                                       exceptions={exceptions}
                                       markers={filteredData}
                                       zoom={zoom}
                                       zoomMap={zoomMap} />
                    </div>
                </div>
        );
    }

}

export default ExceptionsDashboard;
