import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentLocation, getDataType } from 'services/ipstack';
import { RootState, AppDispatch } from 'containers/store';

export type latLongType = [number, number] | null;

type CurrentLocal = {
  data: null | Record<string, unknown>;
  loading: boolean;
  error: boolean;
  latLong: latLongType;
};

const initialState: CurrentLocal = {
  data: null,
  loading: true,
  error: false,
  latLong: null,
};

export const currentLocalSclice = createSlice({
  name: 'currentLocal',
  initialState,
  reducers: {
    error: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    getData: (state, action: PayloadAction<getDataType>) => {
      state.data = action.payload;
      state.latLong = [action.payload.latitude, action.payload.longitude];
    },
  },
});
export const fetchData =
  () =>
  (dispatch: AppDispatch): void => {
    dispatch(loading(true));
    getCurrentLocation()
      .then(({ data }) => {
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          dispatch(error(true));
        } else {
          dispatch(getData(data));
        }
      })
      .catch(() => {
        dispatch(error(true));
      })
      .finally(() => {
        dispatch(loading(true));
      });
  };

export const { error, loading, getData } = currentLocalSclice.actions;
export const selectError = (state: RootState): boolean =>
  state.currentLocal.error;
export const selectLoading = (state: RootState): boolean =>
  state.currentLocal.loading;
export const selectData = (state: RootState): Record<string, unknown> | null =>
  state.currentLocal.data;
export const selectLatLong = (state: RootState): latLongType =>
  state.currentLocal.latLong;

export default currentLocalSclice.reducer;
