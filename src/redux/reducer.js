import { ACTION_TYPES } from "./actionType";

const initState = {
  parentCategory: null,
  childCategory: null,
  childItem: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CATEGORY:
      console.log(">>>action",action);
      return {
        ...state,
        parentCategory: action.data.parentId,
        childCategory: action.data.childId,
        childItem: action.data.childItem,
        selectedFilter: action.data.selectedFilter
      }
    default:
      return state
  }
};

export default reducer;
