import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { getCurrentLocation } from 'services/ipstack';
import { RootState } from 'containers/store';

export type latLongType = [number, number] | null;

type CurrentLocal = {
  data: null | Record<string, any>;
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
    getData: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = action.payload;
      state.latLong = [action.payload.latitude, action.payload.longitude];
    },
  },
});

export const fetchData = () => (dispatch: Dispatch) => {
  dispatch(loading(true));
  getCurrentLocation()
    .then(({ data }) => {
      dispatch(getData(data));
    })
    .catch(() => {
      dispatch(error(true));
    })
    .finally(() => {
      dispatch(loading(true));
    });
};

export const { error, loading, getData } = currentLocalSclice.actions;
export const selectError = (state: RootState) => state.currentLocal.error;
export const selectLoading = (state: RootState) => state.currentLocal.loading;
export const selectData = (state: RootState) => state.currentLocal.data;
export const selectLatLong = (state: RootState) => state.currentLocal.latLong;

export default currentLocalSclice.reducer;
