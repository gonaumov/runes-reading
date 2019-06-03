interface Rune {
  rune_id: string
  rune_name: string
  rune_image: string
  rune_meaning: string
}

interface Spread {
  spread_id: string
  spread_name: string
  spread_description: string
  spread_runes_count: number
}



interface State {
  runes: Array<Rune>
  spreads: Array<Spread>
  selected_spread: number | null
}