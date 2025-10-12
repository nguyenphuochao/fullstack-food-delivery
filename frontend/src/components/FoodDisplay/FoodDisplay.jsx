import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext';
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext);

    console.log(food_list);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return <FoodItem key={index} item={item} />
                        }
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay