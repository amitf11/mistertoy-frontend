import { useState, useEffect } from 'react'
import { toyService } from '../services/toy.service'

const toyLabel = toyService.getLabels()

export function ToyFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'checkbox') value = target.checked
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSelectLabels(ev) {
        const label = ev.target.value
        let filter = { ...filterByToEdit }
        if (filter.labels.includes(label)) filter.labels = filter.labels.filter(l => l !== label)
        else filter.labels.push(label)
        setFilterByToEdit(filter)
    }
    console.log('filterByToEdit:', filterByToEdit)

    return <div className="filter-container">
        <form className='form-filter'>
            <label className='filter-label'>
                <span className='filter-label'>Search</span>
                <input
                    value={filterByToEdit.search}
                    onChange={handleChange}
                    type="search"
                    className="search-input"
                    name="txt" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Min-price</span>
                <input
                    onChange={handleChange}
                    type="number"
                    className="min-price"
                    name="minPrice" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Max-price</span>
                <input
                    onChange={handleChange}
                    type="number"
                    className="max-price"
                    name="maxPrice" />
            </label>
            <label className='filter-label'>
                <span className='filter-label'>Filter By</span>
                <select
                    onChange={onSelectLabels}
                    name="labels"
                    multiple
                    value={filterByToEdit.labels || []}>

                    <option value=""> All </option>
                    <>
                        {toyLabel.map(label => <option key={label} value={label}>{label}</option>)}
                    </>
                    
                </select>
            </label>
            <label className='filter-label'>
                <span className='filter-label'>In stock</span>
                <select
                    onChange={handleChange}
                    name="inStock"
                    value={filterByToEdit.inStock || ''}>
                    <option value={'all'}> All </option>
                    <option value={true}>In stock</option>
                    <option value={false}>Out of stock</option>
                </select>
            </label>
        </form>
    </div>
}