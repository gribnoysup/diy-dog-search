import {TYPES} from './actions'

const defaultState = {
  searchQuery: '',
  beerList: [],
  selectedBeer: -1,
  isOffline: false
}

const assign = (prevState, newState) => ({...prevState, ...newState})

const app = (state = defaultState, action) => {
  switch(action.type) {
    case TYPES.SET_BEER_LIST:
      return assign(state, { beerList: action.value })

    case TYPES.ADD_BEER_TO_LIST:
      const newList = state.beerList.filter((beer) => beer.id !== action.value.id)
      newList.push(action.value)

      return assign(state, { beerList: newList })

    case TYPES.SET_OFFLINE:
      return assign(state, { isOffline: action.value })

    case TYPES.SET_SEARCH_QUERY:
      return assign(state, { searchQuery: action.value })

    case TYPES.CLEAR_SEARCH_QUERY:
      return assign(state, { searchQuery: '' })

    case TYPES.SET_SELECTED_BEER:
      return assign(state, { selectedBeer: action.value })

    case TYPES.CLEAR_SELECTED_BEER:
      return assign(state, { selectedBeer: -1 })

    default:
      return state
  }
}

export default app
