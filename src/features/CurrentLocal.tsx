import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData,
  selectData,
  selectLoading,
  selectError,
} from 'features/CurrentLocalSlice';
import { Backdrop, makeStyles, Divider } from '@material-ui/core';
import TextRow from 'components/TextRow';
import { Skeleton } from '@material-ui/lab';
import { keys } from 'helpers/constants';
import { useSnackbar } from 'notistack';
const useStyles = makeStyles(() => ({
  skeleton: { transform: 'none', height: '85%' },
}));

const CurrentLocal: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Service is currently unavailable', { variant: 'error' });
    }
  }, [isError]);

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
