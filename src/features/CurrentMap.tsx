import React from 'react';
import CustomMap from 'components/CustomMap';
import { useSelector } from 'react-redux';
import { selectLatLong, latLongType } from 'features/CurrentLocalSlice';

const CurrentMap: React.FC = () => {
  const latLong: latLongType = useSelector(selectLatLong);

  return <CustomMap latLong={latLong} />;
};

export default CurrentMap;
