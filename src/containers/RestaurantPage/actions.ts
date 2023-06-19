import {Restaurant} from '../../models/restaurant';
import {ActionTypes} from './constants';

export const setRestaurants = (restaurants: Restaurant[]) => ({
  type: ActionTypes.SET_RESTAURANTS,
  payload: restaurants,
});
