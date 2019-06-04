const selectedRunes = (state: State): Array<Rune> => {
    if(state.selected_spread === null) {
        return []
    }
    
    const selectedSpread = state.spreads.find((s: Spread) => (
        state.selected_spread !== null 
        && s.spread_id === state.selected_spread.toString()
    ))
    
    if (!selectedSpread) {
        return []
    }

    return state.runes
        .map((a: Rune) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value).slice(0, selectedSpread.spread_runes_count)
 }
 
 export default selectedRunes