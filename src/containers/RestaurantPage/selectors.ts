import {createSelector} from 'reselect';

const restaurantPageState = (state: any) => state.restaurantPage;

export const makeSelectRestaurants = createSelector(
  restaurantPageState,
  restaurantPage => restaurantPage.restaurants,
);
