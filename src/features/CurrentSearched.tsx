import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectData, selectError, selectLoading } from 'features/SearchSlice';
import { useSnackbar } from 'notistack';
import { Typography, Backdrop, Divider } from '@material-ui/core';
import { keys } from 'helpers/constants';

import TextRow from 'components/TextRow';

const CurrentSearched: React.FC = () => {
  const data = useSelector(selectData);
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      enqueueSnackbar('Value you provided could not be found', {
        variant: 'error',
      });
    }
  }, [isError]);

  return (
    <>
      {data ? (
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
          <Backdrop open={isLoading} />
        </>
      ) : (
        <Typography color="textSecondary" align="center">
          Use input above to search for localization data about your IP address
        </Typography>
      )}
    </>
  );
};

export default CurrentSearched;
