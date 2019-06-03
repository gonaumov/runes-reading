import { AnyAction } from 'redux'
import { SET_SELECTED_SPREAD } from '../constants/ActionTypes'
import initialState from '../initialState'

const runes = (state: State = initialState, action: AnyAction): State => {
    switch (action.type) {
        case SET_SELECTED_SPREAD:
            const selected_spread: number | null = 
            typeof action.selected_spread === 'number' ? 
            action.selected_spread : null
            return {
                ...state,
                selected_spread
            }
        default:
            return state
    }
}

export default runes