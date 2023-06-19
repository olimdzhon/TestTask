import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import restaurantPage from './containers/RestaurantPage/reducers';
import menuPage from './containers/MenuPage/reducers';

const reducers = combineReducers({restaurantPage, menuPage});

export default configureStore({reducer: reducers});
