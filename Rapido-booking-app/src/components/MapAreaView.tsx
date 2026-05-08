import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const MapAreaView = () => {
  return (
      <MapView
        initialRegion={{
          latitude: 12.0288,
          longitude: 77.59,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={{ flex: 1 }}
      >
        <Marker coordinate={{ latitude: 12.0288, longitude: 77.59 }} />
      </MapView>
  )
}

export default MapAreaView