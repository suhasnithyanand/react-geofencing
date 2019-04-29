/*global google*/ 
import React from 'react';
import PropTypes from "prop-types";
import {compose, withProps, withHandlers} from "recompose";
import {withScriptjs, withGoogleMap, GoogleMap, Marker, TrafficLayer} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import {clusterStyles, maxClusterCount, clusterDivider} from "../constants";
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

const isMarkerRed = function (data) {
    const redExceptions = ['In Detention', 'Arriving within 24', 'Over free time', 'Missed cut off'];
    return redExceptions.indexOf(data.exceptionMessage) !== -1;
};
  

const MapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCVJ_4G85silDMaq9tlOz-mLGzGmc5ypII&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100vh`}}/>,
        containerElement: <div style={{height: `100vh`}}/>,
        mapElement: <div style={{height: `100vh`}}/>,
    }),
    withHandlers(() => {
        const refs = {
            map: undefined,
        };

        return {
            onMarkerClustererClick: () => (markerClusterer) => {
                //const clickedMarkers = markerClusterer.getMarkers();
            },
            onMapMounted: () => ref => {
                refs.map = ref
            },
            onZoomChanged: ({ onZoomChange }) => () => {
                onZoomChange(refs.map.getZoom())
            }
        }
    }),
    withScriptjs,
    withGoogleMap
)(({center, myMarkers, onMarkerClick, onMarkerClustererClick, onMapMounted, handleOverlayComplete, onZoomChanged, zoom}) =>
    <GoogleMap zoom={zoom}
               center={center}
               options={{mapTypeControl: false}}
               onZoomChanged={onZoomChanged}
               ref={onMapMounted} >
        <MarkerClusterer onClick={onMarkerClustererClick}
                         averageCenter
                         enableRetinaIcons
                         gridSize={60}
                         styles={clusterStyles}
                         calculator={(markers) => {
                             const count = markers.length;
                             let threshold = maxClusterCount;
                             let index = 1;
                             //style index needs to be in range of 0 to 5
                             while (index < 6) {
                                 if (count > threshold) {
                                     break;
                                 }
                                 threshold = threshold / clusterDivider;
                                 index++;
                             }
                             // or 6 to 12 for red circles
                             if (markers.find(marker => marker.animation && marker.animation.isRed)) {
                                 index+= 6;
                             }

                             return {
                                 text: markers.length,
                                 index: index
                             }
                         }}
        >
            {myMarkers.map(marker => (
                <Marker noRedraw={true}
                        key={marker.shipmentNumber}
                        position={{lat: marker.latitude, lng: marker.longitude}}
                        animation={{
                            isRed: isMarkerRed(marker)
                        }}
                        onClick={onMarkerClick}
                />
            ))}
        </MarkerClusterer>
        {/* <TrafficLayer></TrafficLayer> */}
        <DrawingManager
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        circleOptions: {
        //   fillColor: `#ffff00`,
          fillOpacity: 0,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      }}
      onOverlayComplete={handleOverlayComplete}
    />
    </GoogleMap>
);

class GoogleMapView extends React.PureComponent {

    static propTypes = {
        center: PropTypes.object.isRequired,
        markers: PropTypes.array.isRequired,
        zoom: PropTypes.number.isRequired,
        zoomMap: PropTypes.func.isRequired,
    };

    handleOverlayComplete = rectangle => {
        // Clear the rectangle managed by DrawingManager.
        console.log('added overlay*****',rectangle)
        google.maps.event.clearInstanceListeners(rectangle);
        // rectangle.setMap(null);
        // Set its values to the one stored in our state.
        // this.setState({bounds: rectangle.getBounds()});
      }

    handleMarkerClick = () => {
        console.log(this);
        alert("marker clicked" + this.lat);
    };

    handleManualZoom = zoom => {
        this.props.zoomMap(zoom)
    };

    render() {
        const {center, markers, zoom} = this.props;
        return (
            <MapComponent center={center}
                          myMarkers={markers}
                          handleOverlayComplete={this.handleOverlayComplete}
                          onMarkerClustererClick={this.handleMarkerClick}
                          onMarkerClick={this.handleMarkerClick}
                          onZoomChange={this.handleManualZoom}
                          zoom={zoom}
            />
        )
    }

}

export default GoogleMapView;
