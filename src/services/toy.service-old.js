
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service-old.js'

const STORAGE_KEY = 'toyDB'
let toys = _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
'Outdoor', 'Battery Powered'] 

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            
            // NEEDS REFACTOR

            // if (!filterBy.txt) filterBy.txt = ''
            // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            // const regExp = new RegExp(filterBy.txt, 'i')
            // return toys.filter(toy =>
            //     regExp.test(toy.vendor) &&
            //     toy.price <= filterBy.maxPrice
            // )
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return  {
        _id: utilService.makeId(),
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
        }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            getEmptyToy(),
            getEmptyToy(),
            getEmptyToy(),
            getEmptyToy(),
            getEmptyToy(),
            getEmptyToy(),
            getEmptyToy(),
            getEmptyToy()
        ]
    }
    return toys
}

function getDefaultFilter() {
    // return { txt: '', maxPrice: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


