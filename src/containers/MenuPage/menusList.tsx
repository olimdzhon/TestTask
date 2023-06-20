import {createSelector} from '@reduxjs/toolkit';
import {makeSelectMenu} from './selectors';
import {useSelector} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Category} from '../../models/category';
import {Item} from '../../models/item';
import {useState} from 'react';
const chevron = require('../../images/chevron.png');
const plus = require('../../images/plus.png');
const minus = require('../../images/minus.png');

const menuStateSelector = createSelector(makeSelectMenu, menu => ({
  menu,
}));

function MenusList() {
  const [stateItems, setStateItems] = useState<{item: Item; count: number}[]>(
    [],
  );

  const {menu} = useSelector(menuStateSelector);
  if (!menu) return <></>;

  const onAddItem = (item: Item) => {
    let updateItems = [...stateItems];

    let index = updateItems.findIndex(obj => obj.item === item);

    if (index !== -1) {
      updateItems[index].count += 1;
      setStateItems(updateItems);
    } else {
      setStateItems(prev => [...prev, {item, count: 1}]);
    }
  };

  const onRemoveItem = (item: Item) => {
    let updateItems = [...stateItems];

    let index = updateItems.findIndex(obj => obj.item === item);

    if (updateItems[index].count > 1) {
      updateItems[index].count -= 1;
      setStateItems(updateItems);
    } else {
      updateItems.splice(index, 1);
      setStateItems(updateItems);
    }
  };

  return (
    <View>
      {menu.categories.map((category: Category, idx: number) => (
        <View
          key={idx}
          style={{
            paddingTop: 20,
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#CCCCCC',
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              paddingBottom: 20,
              paddingLeft: 16,
              paddingRight: 16,
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: 21,
              lineHeight: 28,
              color: '#000000',
            }}>
            {category.name}
          </Text>
          {category.items.map((item: Item, idx: number) => (
            <View
              key={idx}
              style={{
                paddingTop: 20,
                paddingBottom: 10,
                backgroundColor: '#FFFFFF',
                borderTopColor: '#CCCCCC',
                borderTopWidth: 1,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingLeft: 16,
                  paddingRight: 16,
                }}>
                <View style={{width: 0, flexGrow: 1, flex: 1, marginRight: 5}}>
                  <Text
                    style={{
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: 16,
                      lineHeight: 21,
                      color: '#000000',
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontStyle: 'normal',
                      fontWeight: '400',
                      fontSize: 13,
                      lineHeight: 18,
                      marginTop: 8,
                      color: '#666666',
                    }}>
                    {item.description}
                  </Text>
                </View>
                {item.imageUrl && (
                  <Image
                    style={{
                      width: 112,
                      height: 112,
                      marginLeft: 0,
                      marginRight: 0,
                      marginTop: -8,
                    }}
                    source={{uri: item.imageUrl}}
                  />
                )}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 16,
                  paddingRight: 16,
                }}>
                <Text
                  style={{
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: 16,
                    lineHeight: 21,
                    alignItems: 'center',
                    color: '#000000',
                  }}>
                  €{item.price}
                </Text>
                <Image
                  style={{
                    width: 10,
                    height: 10,
                    marginLeft: 1,
                  }}
                  source={chevron}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 0,
                    marginLeft: 'auto',
                    marginTop: 10,
                  }}>
                  {stateItems.some(i => i.item === item) && (
                    <TouchableOpacity onPress={() => onRemoveItem(item)}>
                      <Image
                        style={{
                          marginRight: 10,
                        }}
                        source={minus}
                      />
                    </TouchableOpacity>
                  )}
                  {stateItems.some(i => i.item === item) && (
                    <Text
                      style={{
                        marginRight: 10,
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: 13,
                        lineHeight: 18,
                        color: '#000000',
                      }}>
                      {stateItems.find(i => i.item === item)
                        ? stateItems.find(i => i.item === item)?.count
                        : ''}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => onAddItem(item)}>
                    <Image source={plus} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export default MenusList;
