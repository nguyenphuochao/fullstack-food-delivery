import React, { useContext } from 'react'
import './Cart.css'
import { food_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {

    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cartt-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Qty</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                            return (
                                <div key={index} className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{Number(item.price) * Number(cartItems[item._id])}</p>
                                    <p>x</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Cart