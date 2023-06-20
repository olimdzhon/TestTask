import {AnyAction, Dispatch} from '@reduxjs/toolkit';
import {setMenu} from './actions';
import {useDispatch} from 'react-redux';
import Axios from 'axios';
import {useEffect} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import MenusList from './menusList';
import {Menu} from '../../models/menu';
import {useRoute} from '@react-navigation/native';
import {Restaurant} from '../../models/restaurant';
const lock = require('../../images/lock.png');

const actionDispatch = (dispatch: Dispatch<AnyAction>) => ({
  setMenu: (menu: Menu) => dispatch(setMenu(menu)),
});

export function MenuPage() {
  const route = useRoute();
  const restaurant = route.params as Restaurant;

  if (!restaurant) return <></>;

  const {setMenu} = actionDispatch(useDispatch());

  const fetchMenus = async () => {
    const response = await Axios.get(
      `http://ec2-52-210-203-30.eu-west-1.compute.amazonaws.com:3000/menu/${restaurant.menuId}`,
    ).catch(err => {
      console.log('Err: ', err);
      throw new Error(err.message);
    });

    setMenu(response.data);
  };

  useEffect(() => {
    fetchMenus();
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
        }}>
        <Text
          style={{
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 28,
            lineHeight: 36,
            color: '#000000',
          }}>
          {restaurant.name}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: 16,
          paddingRight: 16,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{marginLeft: 'auto', marginRight: 0, width: 24, height: 24}}
            source={lock}
          />
          <Text
            style={{
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 16,
              lineHeight: 24,
              marginLeft: 8,
              color: '#000000',
            }}>
            Collect from
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 8,
          }}>
          <Text
            style={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: 13,
              lineHeight: 18,
              color: '#666666',
            }}>
            {restaurant.address}
          </Text>
          <Text
            style={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: 13,
              lineHeight: 18,
              color: '#666666',
            }}>
            Min order €{restaurant.minimumOrder} • Open till{' '}
            {restaurant.workingHours.close}
          </Text>
        </View>
      </View>
      <MenusList />
    </ScrollView>
  );
}
