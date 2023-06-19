import {AnyAction, PayloadAction} from '@reduxjs/toolkit';
import {ActionTypes} from './constants';
import {Restaurant} from '../../models/restaurant';

const defaultState = {
  restaurants: [],
};

export default function restaurantPageReducer(
  state = defaultState,
  action: PayloadAction<AnyAction>,
) {
  switch (action.type) {
    case ActionTypes.SET_RESTAURANTS:
      return {...state, restaurants: action.payload};
    default:
      return state;
  }
}
