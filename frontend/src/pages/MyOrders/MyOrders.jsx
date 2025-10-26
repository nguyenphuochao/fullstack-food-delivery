import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token]);

    return (
        <div>MyOrders</div>
    )
}

export default MyOrders