import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {

    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-items-title'>
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
                                <div>
                                    <div key={index} className='cart-items-title cart-items-item'>
                                        <img src={item.image} alt={item.name} />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p>${Number(item.price) * Number(cartItems[item._id])}</p>
                                        <p style={{ cursor: 'pointer' }} onClick={() => removeFromCart(item._id)}>x</p>
                                    </div>
                                    <hr />
                                </div>
                            )
                        }
                    })
                }
            </div>

            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>{0}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>{0}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>{0}</b>
                        </div>
                    </div>
                    <button>PROCESS TO CHECKOUT</button>
                </div>
                <div className='cart-promocode'>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, veritatis?</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='Promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart