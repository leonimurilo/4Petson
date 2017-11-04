import React from 'react';
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const API_KEY = "AIzaSyDNQUXZkRY5hvPA3CkUlYHh9x9-xJJ2kZA"
const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{
      height: `400px`,
      maxWidth: `80%`,
      borderRadius: `3px`,
      width: `800%`}} />,
    mapElement: <div style={{ borderRadius: `3px`,height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        circles: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCircles = places.map(place => ({
            position: place.geometry.location,
            radius: 50000,
            visible: true
          }));

          console.log("circles", nextCircles);
          console.log("markers", nextMarkers);
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          console.log("lat:", nextCenter.lat());
          console.log("lng:", nextCenter.lng());
          try {
            this.props.onLocationSelect(nextCenter.lat(), nextCenter.lng());
          }catch(err){
            console.log("The onLocationSelect callback was not passed to LocationPicker component.");
          }
          this.setState({
            center: nextCenter,
            markers: nextMarkers,
            circles: nextCircles
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Select your location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `calc(100% - 200px)`,
          height: `32px`,
          marginTop: `10px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.circles.map((circle, index) =>
      <Circle key={index}
      center={circle.position}
      visible={circle.visible}
      radius={circle.radius} />
    )}
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
  </GoogleMap>
);

<MapWithASearchBox />

export default MapWithASearchBox