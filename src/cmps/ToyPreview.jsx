import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article className="flex align-center">
            <div className="title-price">
                <h4>{toy.name}</h4>
                <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            </div>
            {/* {toy.creator && <p>Owner: <Link to={`/user/${toy.creator._id}`}>{toy.creator.fullname}</Link></p>} */}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}