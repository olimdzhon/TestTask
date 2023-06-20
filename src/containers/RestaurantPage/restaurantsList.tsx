import {createSelector} from '@reduxjs/toolkit';
import {makeSelectRestaurants} from './selectors';
import {useSelector} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Restaurant} from '../../models/restaurant';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
const chevron = require('../../images/chevron.png');

export type RootStackParamList = {
  Menu: Restaurant | undefined;
};

const stateSelector = createSelector(makeSelectRestaurants, restaurants => ({
  restaurants,
}));

function RestaurantsList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {restaurants} = useSelector(stateSelector);

  const isEmptyRestaurants =
    !restaurants || (restaurants && restaurants.length === 0);

  if (isEmptyRestaurants) return <></>;

  const openReastaurant = (restaurant: Restaurant) => {
    navigation.navigate('Menu', restaurant);
  };

  return (
    <View>
      {restaurants.map((restaurant: Restaurant, idx: number) => (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            openReastaurant(restaurant);
          }}
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#CCCCCC',
            borderBottomWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'flex-start'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 0,
              }}>
              <View
                style={{
                  height: 16,
                  width: 16,
                  backgroundColor: restaurant.isOpen ? '#20C26E' : '#D80034',
                  borderRadius: 50,
                }}
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
                {restaurant.name}
              </Text>
            </View>
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
            {!restaurant.isOpen && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 0,
                }}>
                <Text
                  style={{
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: 13,
                    lineHeight: 18,
                    color: '#D80034',
                  }}>
                  Closed
                </Text>
                <Text
                  style={{
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: 13,
                    lineHeight: 18,
                    color: '#666666',
                    marginLeft: 4,
                  }}>
                  Opens tomorrow at {restaurant.workingHours.open}
                </Text>
              </View>
            )}
          </View>
          <Image
            style={{marginLeft: 'auto', marginRight: 0}}
            source={chevron}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default RestaurantsList;
