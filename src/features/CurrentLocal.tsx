import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData,
  selectData,
  selectLoading,
} from 'features/CurrentLocalSlice';
import { Backdrop, makeStyles, Divider } from '@material-ui/core';
import TextRow from 'components/TextRow';
import { Skeleton } from '@material-ui/lab';
import { keys } from 'helpers/constants';

const useStyles = makeStyles(() => ({
  skeleton: { transform: 'none', height: '85%' },
}));

const CurrentLocal: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return data ? (
    <>
      {Object.entries(data)
        .filter(([key]) => keys.includes(key))
        .map(([key, value]) => (
          <>
            <TextRow
              title={key}
              value={typeof value === 'string' ? value : '-'}
            />
            <Divider component="hr" />
          </>
        ))}
      <Backdrop open={loading} />
    </>
  ) : (
    <Skeleton variant="text" className={classes.skeleton} />
  );
};

export default CurrentLocal;
