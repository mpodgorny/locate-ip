import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L, { Map } from 'leaflet';
import { makeStyles } from '@material-ui/core';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { latLongType } from 'features/CurrentLocalSlice';

// fix for react-leaflet issue #453
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const useStyles = makeStyles(() => ({
  mapWrapper: {
    width: '100%',
    height: 0,
    paddingTop: '40%',
    position: 'relative',
  },
  mapContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

type CustomMapProps = { latLong: latLongType };

const CustomMap: React.FC<CustomMapProps> = ({ latLong }) => {
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (mapInstance) {
      mapInstance.invalidateSize();
    }
  }, [mapInstance]);

  useEffect(() => {
    if (latLong && mapInstance) {
      mapInstance.panTo(latLong);
    }
  }, [latLong, mapInstance]);

  return (
    <div className={classes.mapWrapper}>
      <MapContainer
        center={[51.505, -0.09]}
        whenCreated={setMapInstance}
        zoom={13}
        className={classes.mapContainer}
      >
        <TileLayer
          attribution="&copy; Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png	"
        />
        {latLong && <Marker position={latLong} />}
      </MapContainer>
    </div>
  );
};

export default CustomMap;
