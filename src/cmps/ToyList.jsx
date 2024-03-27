import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys, onRemoveToy, onEditToy, addToTCart }) {
    console.log('toys from toylist:', toys)
    return (
        <div className="toys-container">
            {toys.map(toy => (
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
            ))}
        </div>
    )
}