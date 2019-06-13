import * as actionTypes from "../constants/ActionTypes"

export const setSelectedSpread = (selected_spread: string) => ({
    type: actionTypes.SET_SELECTED_SPREAD,
    payload: {
        selected_spread: parseInt(selected_spread, 10)
    }
})

export const getRunes = () => ({
    type: actionTypes.GET_RUNES
})

export const init = (spread_number: string) => ({
    type: actionTypes.INIT,
    spread_number
})

export const setRunes = (runes: Array<object>) => ({
    type: actionTypes.RUNES_RECEIVED,
    payload: {
        runes
    }
})

export const getSpreads = () => ({
    type: actionTypes.GET_SPREADS
})

export const setSpreads = (spreads: Array<object>) => ({
    type: actionTypes.SPREADS_RECEIVED,
    payload: {
        spreads
    }
})




