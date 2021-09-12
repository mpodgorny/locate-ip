import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { getSearch } from 'services/ipstack';
import { RootState } from 'containers/store';
import { latLongType } from './CurrentLocalSlice';

type CurrentLocal = {
  data: null | Record<string, any>;
  loading: boolean;
  error: boolean;
  latLong: latLongType;
  prevList: Array<Record<string, Record<string, any>>>;
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
    getData: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = action.payload;
      state.latLong =
        action.payload.latitude && action.payload.longitude
          ? [action.payload.latitude, action.payload.longitude]
          : null;
    },
    addSearched: (state, action: PayloadAction<Record<string, any>>) => {
      state.prevList = [...state.prevList, action.payload];
    },
  },
});

export const searchData = (query: string) => (dispatch: Dispatch) => {
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
export const selectData = (state: RootState): null | Record<string, any> =>
  state.search.data;
export const selectList = (state: RootState): Array<Record<string, any>> =>
  state.search.prevList;
export const selectLatLong = (state: RootState): latLongType =>
  state.search.latLong;

export default searchSlice.reducer;
