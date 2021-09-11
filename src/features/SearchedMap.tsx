import React from 'react';
import CustomMap from 'components/CustomMap';
import { useSelector } from 'react-redux';
import { latLongType } from 'features/CurrentLocalSlice';
import { selectLatLong } from 'features/SearchSlice';

const CurrentMap: React.FC = () => {
  const latLong: latLongType = useSelector(selectLatLong);

  return <CustomMap latLong={latLong} />;
};

export default CurrentMap;
