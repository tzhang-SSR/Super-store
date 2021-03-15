import PropTypes from 'prop-types';
import Review from './review'

export default function ItemCard(props) {
    return (
        <>
            {props &&
                <div className="itemWrapper">
                    <div className="itemCard">
                        <img src={props.imageUrl} alt="imgs" className="itemImg" />
                        <div className="cardIntro">
                            <p>{props.name}</p>
                            <div><Review score={props.avgRating} /></div>
                            <p><strong>${props.price}</strong></p>
                        </div>
                    </div>
                    <div className="viewBtn">View Item</div>
                </div>
            }
        </>

    )
}

ItemCard.prototype = {
    imageUrl: PropTypes.string
}