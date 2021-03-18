import { useEffect, useState, useMemo } from 'react';
import star_empty from '../../img/star_empty.svg';
import star_full from '../../img/star_full.svg';
import star_half from '../../img/star_half.svg';

export default function Review({ score }) {
    // const [starArr, setStarArr] = useState([]);
    const starArr = useMemo(() => {
        let tempArr = new Array(5).fill(star_empty);
        let score_round = Math.floor(score)
        for (let i = 0; i < score_round; i++) {
            tempArr[i] = star_full
        }
        // check if the review is not integer
        if (score_round < score) {
            let ind = score == 0.5 ? 0 : score_round
            tempArr[ind] = star_half
        }
        return tempArr
    }, [])

    return (
        <div>
            {starArr.map((star, index) => <img src={star} key={index} alt={`star${index}`} />)}
        </div>
    )
}