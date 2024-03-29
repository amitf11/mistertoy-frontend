import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { MultiSelect } from "../cmps/MultiSelect.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSetLabel(label) {
        const labels = toyToEdit.labels.includes(label) ? toyToEdit.labels.filter(l => l !== label) : [label, ...toyToEdit.labels]
        setToyToEdit(prevToy => ({ ...prevToy, labels }))
    }

    function onSave(ev) {
        ev.preventDefault()

        const newToy = {
            ...toyToEdit,
            inStock: (toyToEdit.inStock === 'true') ? true : false
        }

        saveToy(newToy)
            .then(() => {
                showSuccessMsg('Toy saved successfully')
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Can not save toy, please try again')
            })
    }

    function isInStock() {
        return toyToEdit.inStock
    }

    if (!toyToEdit) return <div>Loading...</div>

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSave} >
                <label htmlFor="name">name: </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder={toyToEdit._id ? toyToEdit.name : "Enter name..."}
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                <div>
                    <MultiSelect onSetLabel={onSetLabel} toyToEdit={toyToEdit} />
                </div>

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}