import {Menu} from '../../models/menu';
import {ActionTypes} from './constants';

export const setMenu = (menu: Menu) => ({
  type: ActionTypes.SET_MENU,
  payload: menu,
});
