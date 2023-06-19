import {AnyAction, Dispatch, createSelector} from '@reduxjs/toolkit';
import {makeSelectRestaurants} from './selectors';
import {setRestaurants} from './actions';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import RestaurantsList from './restaurantsList';
import {Restaurant} from '../../models/restaurant';

const actionDispatch = (dispatch: Dispatch<AnyAction>) => ({
  setRestaurants: (restaurants: Restaurant[]) =>
    dispatch(setRestaurants(restaurants)),
});

export function RestaurantPage() {
  const {setRestaurants} = actionDispatch(useDispatch());

  const fetchRestaurants = async () => {
    const response = await Axios.get(
      'http://ec2-52-210-203-30.eu-west-1.compute.amazonaws.com:3000/restaurants',
    ).catch(err => {
      console.log('Err: ', err);
      throw new Error(err.message);
    });

    setRestaurants(response.data);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: '#FFF',
          borderBottomColor: '#CCCCCC',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 28,
            lineHeight: 36,
          }}>
          Collect from
        </Text>
      </View>
      <RestaurantsList />
    </ScrollView>
  );
}
