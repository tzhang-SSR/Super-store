import './deal.css';
import ItemCard from '../card';

export default function DealsPage({ items }) {
    return (
        <div className="container">
            {
                items.map((item, index) => <ItemCard key={index} {...item} />)
            }
        </div>
    );
}