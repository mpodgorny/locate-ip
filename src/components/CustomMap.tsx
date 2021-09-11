import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L, { Map } from 'leaflet';
import { makeStyles } from '@material-ui/core';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { latLongType } from 'features/CurrentLocalSlice';
import Skeleton from '@material-ui/lab/Skeleton';

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
    position: 'relative',
  },
  mapContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  skeleton: {
    zIndex: 999,
  },
}));

type CustomMapProps = { latLong: latLongType };

const CustomMap: React.FC<CustomMapProps> = ({ latLong }) => {
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  const whenReady = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <Skeleton
          variant="rect"
          className={`${classes.mapContainer} ${classes.skeleton}`}
        />
      )}
      <MapContainer
        center={[34.102385, -79.155351]}
        whenCreated={setMapInstance}
        zoom={16}
        whenReady={whenReady}
        className={classes.mapContainer}
      >
        <TileLayer
          attribution="&copy; Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png	"
        />
        {latLong && <Marker position={latLong} />}
      </MapContainer>
    </>
  );
};

export default CustomMap;
