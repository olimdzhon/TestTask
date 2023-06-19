import {createSelector} from 'reselect';

const menuPageState = (state: any) => state.menuPage;

export const makeSelectMenu = createSelector(
  menuPageState,
  menuPage => menuPage.menu,
);
