import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodIem from '../FoodItem/FoodIem';
const FoodDisplay = ({category}) => {
    const {food_list} =useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top food near you.</h2> 
        <div className="food-display-list">
            {food_list.map((item,index)=>{
              if(category==="All" || category===item.category){
                return <FoodIem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              }
              })}
        </div>
    </div>
  )
}

export default FoodDisplay
