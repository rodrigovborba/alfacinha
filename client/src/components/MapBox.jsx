import React, { Component } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl"; // NEW
import "mapbox-gl/dist/mapbox-gl.css"; // Import of Mapbox CSS

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9kcmlnb3Zib3JiYSIsImEiOiJjazRiNnBhdnUwNmcxM21zYnpjcm91dDVjIn0.4ypldccV7spwy7_sjvH1Tw";

class MapBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: "",
      lat: "",
      restaurants: null
    };
    this.mapRef = React.createRef();
    this.map = null;
    this.initMap = this.initMap.bind(this);
  }

  initMap(lng, lat) {
    this.map = new mapboxgl.Map({
      container: this.mapRef.current, // container id
      style: "mapbox://styles/rodrigovborba/ck4e0d6ce18vq1dprjmowvqqk", // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 11 // starting zoom
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.marker = new mapboxgl.Marker({ color: "green" })
      .setLngLat([lng, lat])
      .addTo(this.map);
    this.markerRestaurant = new mapboxgl.Marker({ color: "purple" })

      .setLngLat([this.props.lng, this.props.lat])
      .addTo(this.map);
  }

  componentDidMount() {
    this.getCurrentCoordinates();
  }

  getCurrentCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lng: position.coords.longitude,
          lat: position.coords.latitude
        });
        this.initMap(this.state.lng, this.state.lat);
      });
    }
  };

  render() {
    return (
      <div
        className="mapbox"
        ref={this.mapRef}
        style={{ height: 300, width: 350 }}
      ></div>
    );
  }
}

export default MapBox;
