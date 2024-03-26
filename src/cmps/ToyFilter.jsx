import { useState, useEffect } from 'react'
import { LabelSelector } from './LabelSelect.jsx'

export function ToyFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            [field]: value,
        }))
    }

    function onLabelChange(selectedLabels) {

        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            labels: selectedLabels,
        }))
    }

    const { name, inStock } = filterByToEdit
    return (
        <form className="toy-filter">
            <h3>Filter Toys</h3>
            <select name="inStock" id="inStock" value={inStock || ''} onChange={handleChange}>
                <option value={''}>All</option>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
            </select>

            <input className="filter-input" type="text" id="name" name="name" value={name} placeholder="Enter text here..." onChange={handleChange} />
            <LabelSelector labels={labels} onLabelChange={onLabelChange} />
        </form>
    )
}
