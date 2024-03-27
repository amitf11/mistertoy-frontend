import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, saveToy, removeToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'

export function ToyIndex() {

    const sortBy = useSelector(state => state.toyModule.sortBy)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys(filterBy, sortBy)
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sort) {
        setSortBy(sort)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter} />

                <ToySort
                    onSetSort={onSetSort}
                    sortBy={sortBy} />

                <Link to="/toy/edit">Add Toy</Link>
                <button className='add-btn' onClick={onAddToy}>Add Random Toy</button>
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}