import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSearch, getDataType } from 'services/ipstack';
import { RootState, AppDispatch } from 'containers/store';
import { latLongType } from './CurrentLocalSlice';

type prevListItem = {
  query: string;
  isError: boolean;
  data: Record<string, unknown>;
};

type CurrentLocal = {
  data: null | Record<string, unknown>;
  loading: boolean;
  error: boolean;
  latLong: latLongType;
  prevList: Array<prevListItem>;
};

const initialState: CurrentLocal = {
  data: null,
  loading: false,
  error: false,
  latLong: null,
  prevList: [],
};

export const searchSlice = createSlice({
  name: 'search',
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
      state.latLong =
        action.payload.latitude && action.payload.longitude
          ? [action.payload.latitude, action.payload.longitude]
          : null;
    },
    addSearched: (state, action: PayloadAction<prevListItem>) => {
      state.prevList = [...state.prevList, action.payload];
    },
  },
});

export const searchData =
  (query: string) =>
  (dispatch: AppDispatch): void => {
    dispatch(loading(true));
    getSearch(query)
      .then(({ data }) => {
        let isError = false;
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
          dispatch(error(true));
          isError = true;
        } else {
          dispatch(getData(data));
        }
        dispatch(addSearched({ data, query, isError: isError }));
      })
      .catch(() => {
        dispatch(error(true));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const { error, loading, getData, addSearched } = searchSlice.actions;
export const selectError = (state: RootState): boolean => state.search.error;
export const selectLoading = (state: RootState): boolean =>
  state.search.loading;
export const selectData = (state: RootState): null | Record<string, unknown> =>
  state.search.data;
export const selectList = (state: RootState): Array<prevListItem> =>
  state.search.prevList;
export const selectLatLong = (state: RootState): latLongType =>
  state.search.latLong;

export default searchSlice.reducer;
