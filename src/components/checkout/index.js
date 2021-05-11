import './checkout.css';
import { Link } from 'react-router-dom';

export default function Checkout() {
    return (
        <div className="checkout">
            <h1>Thank you for your purchase!</h1>
            <p>
                Your order will be on its way shortly. In the
                mean time, please feel free to continue shopping!
            </p>
            <Link to="/"><button>Return to Home</button></Link>
        </div>
    )
}