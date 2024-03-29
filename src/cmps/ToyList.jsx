import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys, onRemoveToy, onEditToy, addToTCart }) {
    return (
        <div className="toys-container">
            {toys.map(toy => (
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy} key={toy._id}/>
            ))}
        </div>
    )
}