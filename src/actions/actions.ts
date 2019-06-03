import { SET_SELECTED_SPREAD } from "../constants/ActionTypes"

export const setSelectedSpread = (selected_spread: string) => ({
    type: SET_SELECTED_SPREAD,
    selected_spread: parseInt(selected_spread, 10)
})

