import { useState, useEffect } from 'react'

import { LabelSelect } from './LabelSelect'
import { toyService } from '../services/toy.service'

import * as React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


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

    return <div className="filter-container">
        <form className='form-filter flex flex-column align-center'>
            <div className='name-instock-container flex justify-between align-center'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '30ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField label="Name" variant="outlined"
                        value={filterByToEdit.search}
                        onChange={handleChange}
                        name="txt" />
                </Box>
                
                {/* <label className='filter-label'>
                <span className='filter-label'>Search</span>
                <input
                    value={filterByToEdit.search}
                    onChange={handleChange}
                    type="search"
                    className="search-input"
                    name="txt" />
            </label> */}
                {/* <label className='filter-label'>
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
            </label> */}
                {/* <label className='filter-label'>
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
            </label> */}

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">In-Stock</InputLabel>
                    <Select
                        label="in-Stock"
                        name="inStock"
                        onChange={handleChange}
                        value={String(filterByToEdit.inStock) || ''}
                    >
                        <MenuItem value={'all'}> All </MenuItem>
                        <MenuItem value={true}>In stock</MenuItem>
                        <MenuItem value={false}>Out of stock</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <LabelSelect labels={toyLabel} setFilterByToEdit={setFilterByToEdit} filterByToEdit={filterByToEdit} />
        </form >
    </div>
}