import { createSlice } from '@reduxjs/toolkit';
import md5 from 'crypto-js/md5';

const getKey = () => {
  const ts = new Date().getTime();
  const hash = md5(ts + process.env.REACT_APP_PRIVATEKEY + process.env.REACT_APP_PUBLICKEY).toString();

  return {
    ts,
    apikey: process.env.REACT_APP_PUBLICKEY,
    hash,
  }
};

export const marvelSlice = createSlice({
  name: 'marvel',
  initialState: {
    loading: false,
    hasError: false,
    characters: [],
  },
  reducers: {
    getCharacters: state => {
      state.loading = true
    },
    getCharactersSuccess: (state, {payload}) => {
      state.characters = payload;
      state.loading = false;
      state.hasError = false;
    },
    getCharactersFailure: state => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

export const { getCharacters, getCharactersSuccess, getCharactersFailure } = marvelSlice.actions;

export const charactersSelector = state => state.characters

export default marvelSlice.reducer;

export function fetchCharacters() {
 
  const url = new URL('https://gateway.marvel.com:443/v1/public/characters');
  const params = getKey();
  
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  return async dispatch => {
    dispatch(getCharacters())

    try {
      const response = await fetch(url);
      const data = await response.json();

      dispatch(getCharactersSuccess(data.data.results));
    } catch (error) {
      dispatch(getCharactersFailure());
    }
  }
}