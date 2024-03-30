import { Link } from "react-router-dom";
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';




export function ToyPreview({ toy, onRemoveToy }) {
    const chipColors = ['info', 'success', 'warning', 'secondary']
    return (
        <article className="toy-card flex flex-column justify-between">
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.inStock ? <span style={{ color: 'green' }}>In Stock</span>
                : <span style={{ color: 'red' }}>Out of stock</span>}
            <Stack spacing={1} alignItems="center">
                <Stack direction="row" spacing={1}>
                    {toy.labels.map((label, idx) =>
                        <Chip label={label}
                        size="small"
                        sx={{display:'flex', width: 'fit-content'}}
                        color={chipColors[idx]}/>
                    )}
                </Stack>
            </Stack>
            {/* {toy.creator && <p>Owner: <Link to={`/user/${toy.creator._id}`}>{toy.creator.fullname}</Link></p>} */}
            <div className="toy-actions flex justify-between">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link to={`/toy/${toy._id}`}>Details</Link>
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
            </div>

        </article>
    )
}