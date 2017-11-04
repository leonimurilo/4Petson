import React from 'react';
const _ = require("lodash");
const { compose, withProps, lifecycle, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const API_KEY = "AIzaSyDNQUXZkRY5hvPA3CkUlYHh9x9-xJJ2kZA"
const MapWithASearchBox = compose(
  withStateHandlers(() => ({
    isOpen: true,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{
      height: `450px`,
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
        radius: 130,
        center: {
          lat: -23.53, lng: -46.62
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
            radius: this.state.radius * 1000,
            visible: true
          }));

          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
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
    defaultZoom={7}
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
          width: `calc(100% - 140px)`,
          height: `32px`,
          marginTop: `10px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.4)`,
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
      options={
        {
          fillColor:"#DC7331",
          strokeColor:"#DC7331",
          strokeWeight: "1"
        }
      }
      radius={circle.radius} />
    )}
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} onClick={props.onToggleOpen}>
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <button>Hello</button>
      </InfoWindow>}
      </Marker>
    )}
  </GoogleMap>
);

<MapWithASearchBox />

export default MapWithASearchBox
