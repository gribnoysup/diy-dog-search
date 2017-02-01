import localForage from 'localforage'
import {DB} from './const'

const db = localForage.createInstance({ name: DB.Name })

db.getItem(DB.BeerList)
  .then((result) => {
    if (result === null) {
      db.setItem(DB.BeerList, [])
    }
  })

export function pushBeer(newBeer) {
  return db.getItem(DB.BeerList)
    .then((result) => {

      // const trimmedBeer = {
      //   id: newBeer.id,
      //   name: newBeer.name,
      //   tagline: newBeer.tagline
      // }

      const prevList = result.filter((beer) => beer.id !== newBeer.id)
      const newList = [newBeer].concat(prevList)

      // if (newList.length > DB.MaxBeerCount) newList.pop()

      return db.setItem(DB.BeerList, newList)
    })
}

export function getBeerList() {
  return db.getItem(DB.BeerList)
}

export function getBeerById(id) {
  id = parseInt(id, 10)

  return getBeerList()
    .then((beerList) => beerList.find((beer) => beer.id === id))
}

export default db
