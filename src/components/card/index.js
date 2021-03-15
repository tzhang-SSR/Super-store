import PropTypes from 'prop-types';
import Review from '../reviewStar/review';
import './card.css';
import { Link } from 'react-router-dom';
import default_img from '../../img/product-default-img.jpg';

let addDefaultSrc = function(e){
    e.target.src = default_img
  }

export default function ItemCard(props) {
    return (
        <>
            {props &&
                <div className="cardWrapper">
                    <div className="card">
                        <img onError={addDefaultSrc} src={props.imageUrl} alt="imgs" className="cardImg" />
                        <div className="cardIntro">
                            <p>{props.name}</p>
                            <Review score={props.avgRating} />
                            <p><strong>${props.price}</strong></p>
                        </div>
                    </div>
                    <Link to={`/item/${props._id}`}><div className="viewBtn">View Item</div></Link>
                </div>
            }
        </>

    )
}

ItemCard.prototype = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    avgRating: PropTypes.number,
    price: PropTypes.number,
    _id: PropTypes.number
}