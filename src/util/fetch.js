import axios from 'axios'
import {getBeerById, pushBeer} from './db'

export const searchBeerByName = (query) => axios
  .get(`https://api.punkapi.com/v2/beers?beer_name=${query}`)
  .then((response) => response.data)


export const fetchBeerById = (id) => {
  return getBeerById(id)
    .then((beer) => {
      if (beer) return beer

      return axios
        .get(`https://api.punkapi.com/v2/beers/${id}`)
        .then((response) => response.data[0])
    })
    .then((beer) => {
      pushBeer(beer)

      return beer
    })
}
