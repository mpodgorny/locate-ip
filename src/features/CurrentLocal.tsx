import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, selectData } from 'features/CurrentLocalSlice';
import TextRow from 'components/TextRow';

const CurrentLocal: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div>
      {data &&
        Object.entries(data).map(([key, value]) => (
          <TextRow
            title={key}
            value={typeof value === 'string' ? value : '-'}
          />
        ))}
    </div>
  );
};

export default CurrentLocal;
