export interface Tea {
  id: number,
  name: string,
  label: string,
  teaAmount: number,
  waterAmount: number,
  temperature: number,
  brewTime: BrewTime,
  icon: string
}

interface BrewTime {
  minute: number,
  second: number
}