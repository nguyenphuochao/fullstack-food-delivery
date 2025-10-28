import './PlaceOrder.css'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
    const navagate = useNavigate();
    const { getTotalCartAmount, foodList, cartItems, url, token } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        foodList.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2
        }

        let res = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (res.data.success) {
            const { session_url } = res.data;
            window.location.replace(session_url)
        } else {
            alert("Error")
        }
    }

    useEffect(() => {
        if (!token) {
            navagate("/cart");
        }
        else if (getTotalCartAmount() === 0) {
            navagate("/cart");
        }
    }, [token])


    return (
        <form className='place-order' onSubmit={placeOrder}>
            <div className='place-order-left'>
                <p className='title'>Delivery Infomation</p>
                <div className='multi-fields'>
                    <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
                <div className='multi-fields'>
                    <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
                </div>
                <div className='multi-fields'>
                    <input required onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
            </div>

            <div className='place-order-right'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button>PROCESS TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder