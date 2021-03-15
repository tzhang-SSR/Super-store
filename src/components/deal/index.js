import './deal.css';
import ItemCard from '../card';

export default function DealsPage({ items }) {
    return (
        <div className="container">
            {
                items.length > 0
                    ? items.map((item, index) => <ItemCard key={index} {...item} />)
                    : <div> There are no on-sale items at this time </div>
            }
        </div >

    );
}