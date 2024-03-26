
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
    console.log('filterBy:', filterBy)
    return storageService.query(STORAGE_KEY)
    .then(toys => {
            let updatedToys = toys

            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                updatedToys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.inStock) {
                updatedToys = toys.filter(toy => toy.inStock)
            }

            if (filterBy.inStock === 'false') {
                updatedToys = toys.filter(toy => !toy.inStock)
                console.log('updatedToys:', updatedToys)
            }

            return updatedToys
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
    return {
        name: utilService.makeLorem(2),
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
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Outdoor'],
                createdAt: 1631031801011,
                inStock: true,
            },
            {
                _id: 't102',
                name: 'Talking Robot',
                price: 199,
                labels: ['Robot', 'Battery Powered', 'Puzzle'],
                createdAt: 1631032801011,
                inStock: true,
            },
            {
                _id: 't103',
                name: 'Musical Teddy Bear',
                price: 79,
                labels: ['Teddy Bear', 'Battery Powered', 'Outdoor'],
                createdAt: 1631033801011,
                inStock: false,
            },
            {
                _id: 't104',
                name: 'Remote Control Car',
                price: 149,
                labels: ['Toy Car', 'On wheels', 'Baby'],
                createdAt: 1631034801011,
                inStock: true,
            },
            {
                _id: 't105',
                name: 'Building Blocks Set',
                price: 59,
                labels: ['Building Blocks', 'Outdoor'],
                createdAt: 1631035801011,
                inStock: true,
            },
            {
                _id: 't106',
                name: 'Stuffed Animal Playset',
                price: 89,
                labels: ['Stuffed Animals', 'Outdoor'],
                createdAt: 1631036801011,
                inStock: true,
            },
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
    return toys
}

function getDefaultFilter() {
    return { name: '', inStock: true, labels: [] }
}

function getDefaultSort() {
    return { date: '', price: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


