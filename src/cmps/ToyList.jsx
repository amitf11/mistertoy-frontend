import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys, onRemoveToy, onEditToy, addToTCart }) {

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy =>
                <li className="toy-preview flex justify-between" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                        <button className="buy" onClick={() => addToCart(toy)}>
                            Add to Cart
                        </button>
                    </div>

                </li>)}
        </ul>
    )
}