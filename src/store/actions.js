export const SET_OFFLINE = 'SET_OFFLINE'

export const SET_SELECTED_BEER = 'SET_SELECTED_BEER'

export const CLEAR_SELECTED_BEER = 'CLEAR_SELECTED_BEER'

export const SET_BEER_LIST = 'SET_BEER_LIST'

export const ADD_BEER_TO_LIST = 'ADD_BEER_TO_LIST'

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'

export const CLEAR_SEARCH_QUERY = 'CLEAR_SEARCH_QUERY'

export const TYPES = {
  SET_OFFLINE,
  SET_SELECTED_BEER,
  CLEAR_SELECTED_BEER,
  SET_BEER_LIST,
  ADD_BEER_TO_LIST,
  SET_SEARCH_QUERY,
  CLEAR_SEARCH_QUERY,
}

export const setOffline = (isOffline) => ({
  type: SET_OFFLINE,
  value: isOffline
})

export const setSelectedBeer = (id) => ({
  type: SET_SELECTED_BEER,
  value: id
})

export const clearSelectedBeer = () => ({
  type: CLEAR_SELECTED_BEER
})

export const setBeerList = (list) => ({
  type: SET_BEER_LIST,
  value: list
})

export const addBeerToList = (newBeer) => ({
  type: ADD_BEER_TO_LIST,
  value: newBeer
})

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  value: query
})

export const clearSearchQuery = () => ({
  type: CLEAR_SEARCH_QUERY
})
