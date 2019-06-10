const selectedSpread = (state: State): Spread | null => {
   if (state.selected_spread === null) {
       return null
   }

   const selected_spread = state.selected_spread.toString()
   const spread = state.spreads.find((spread: Spread) => 
   spread.spread_id === selected_spread) || null
   return spread   
}

export default selectedSpread
