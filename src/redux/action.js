import { ACTION_TYPES } from "./actionType";

export const handleSetCategory = (data) => {
    return (dispatch) => {
        dispatch({
            type: ACTION_TYPES.SET_CATEGORY,
            data,
        });
    };
}