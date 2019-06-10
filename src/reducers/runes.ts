import { AnyAction } from 'redux'
import  * as actionTypes  from '../constants/ActionTypes'
import initialState from '../initialState'
import { isArrayFromRunes, isArrayFromSpreads } from '../typeguards/typeguards';

const runes = (state: State = initialState, action: AnyAction): State => {
    switch (action.type) {
        case actionTypes.SET_SELECTED_SPREAD:
            const selected_spread: number | null = 
            typeof action.payload !== 'undefined' &&
            typeof action.payload.selected_spread === 'number' ? 
            action.payload.selected_spread : null
            return {
                ...state,
                selected_spread
            }
        case actionTypes.RUNES_RECEIVED: 
            if (action.payload.runes && isArrayFromRunes(action.payload.runes)) {
                return {
                   ...state,
                   runes: action.payload.runes  
                }
            } else {
                return {
                    ...state
                }
            }
        case actionTypes.SPREADS_RECEIVED: 
            if (action.payload.spreads && isArrayFromSpreads(action.payload.spreads)) {
                return {
                   ...state,
                   spreads: action.payload.spreads  
                }
            } else {
                return {
                    ...state
                }
            }    
        default:
            return state
    }
}

export default runes