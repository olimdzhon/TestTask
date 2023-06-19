import {AnyAction, PayloadAction} from '@reduxjs/toolkit';
import {ActionTypes} from './constants';

const defaultState = {
  menu: null,
};

export default function menuPageReducer(
  state = defaultState,
  action: PayloadAction<AnyAction>,
) {
  switch (action.type) {
    case ActionTypes.SET_MENU:
      return {...state, menu: action.payload};
    default:
      return state;
  }
}
