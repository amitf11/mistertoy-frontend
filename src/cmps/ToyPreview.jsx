import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <article className="toy-card flex flex-column justify-between">
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* {toy.creator && <p>Owner: <Link to={`/user/${toy.creator._id}`}>{toy.creator.fullname}</Link></p>} */}
            <div className="toy-actions flex justify-between">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link to={`/toy/${toy._id}`}>Details</Link>
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
            </div>
        </article>
    )
}