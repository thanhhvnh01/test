import { ACTION_TYPES } from "./actionType";

const initState = {
  parentCategory: null,
  childCategory: null,
  childItem: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CATEGORY:
      let childData = {
        id: action.data.child.id,
        label: action.data.child.label
      }
      return {
        ...state,
        parentCategory: action.parentId,
        childCategory: action.childId,
        childItem: childData
      }

    default:
      return state

  }

};

export default reducer;
