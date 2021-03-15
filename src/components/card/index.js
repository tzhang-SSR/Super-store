import PropTypes from 'prop-types';
import Review from '../reviewStar/review';
import './card.css';
import { Link } from 'react-router-dom';
import default_img from '../../img/product-default-img.jpg';

function isImageValid(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function () {
        let status = request.status;
        if (request.status == 200) {
            console.log("image exists");
        }
        else {
            console.log("image doesn't exist");
        }
    }
    return request.status == 200
}

export default function ItemCard(props) {
    return (
        <>
            {props &&
                <div className="cardWrapper">
                    <div className="card">
                        <img src={props.imageUrl} alt="imgs" className="cardImg" />
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