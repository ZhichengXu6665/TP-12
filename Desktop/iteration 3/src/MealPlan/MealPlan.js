import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeGrid from './RecipeGrid';
import data from "./egg_tomato_onion.json";
import './MealPlan.css';
import MealPlanImage0 from '../images/MealPlanImage.png';
import ImageButtons from "./ImageButtons";
function MealPlan(){
    const [inventory, setInventory] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [defaultRecipes, setDefaultRecipes] = useState([]);
    const [urgentList, setUrgents] = useState([]);
    const [isDefaultMenu, setIsDefaultMenu] = useState(true);
    const [isApiError, setIsApiError] = useState(false);
    
    useEffect(()=>{
      const storedInventory = localStorage.getItem('inventory');
      if (storedInventory) {
        setInventory(JSON.parse(storedInventory));
      }
      console.log("stored inventory:", storedInventory);
    },[]);
    
    useEffect(()=>{
      console.log("inventory:", inventory);
      if (inventory.length > 0) {
        const today = new Date();
        const availableItems = inventory.filter(item => item.expiryDate && !isNaN(new Date(item.expiryDate)));
        const maxAmount = Math.min(availableItems.length, 3);
        if (availableItems.length > 0 ){
          const urgentItems = availableItems.filter(item => 
            new Date(item.expiryDate) > today && 
            ["Vegetables", "Fruits", "Dairy", "Meat & Poultry", "Seafood", "Grains", "Bread & Bakery"].includes(item.category)
          ).sort((a,b)=>a.expiryDate - b.expiryDate).slice(0,maxAmount);
          const currentUrgentList = urgentItems.map(item => {
            if (item.source === 'scan') {
              return item.productGroup;
            } else {
              return item.name;
            }
          });
          setUrgents(currentUrgentList);
          console.log("current urgent items:", currentUrgentList);
        } 
      } else {
        setUrgents([]);
      }
    },[inventory]);
    
    useEffect(() => {
      console.log('urgent items:', urgentList);
      const fetchRecipes = async () => {
        try {
          console.log('Sending request to API...');
          const response = await axios.post('https://iteration2-recipe-api.onrender.com/recipes/',
            {
              "ingredients": urgentList,
              "number_of_recipes": 3
            },
            {
              headers:{
                'Content-Type': 'application/json'
              }
            }
          );
          const dataList = Object.values(response.data).map((item, i) => ({...item, id:i}));
          console.log('Data type:', typeof dataList); // 打印 data 的类型
          console.log('Data:', dataList);
          setRecipes(dataList);
          setIsApiError(false);
        } catch (error) {
          console.error('Error fetching recipes:', error);
          setIsApiError(true);
        }
      };
  
      if (urgentList.length > 0) {
        fetchRecipes();
      }
    },[urgentList]);
    
    useEffect(()=>{
      if (isDefaultMenu) {
        const dataList = Object.values(data).map((item, i) => ({...item, id:i}));
        console.log('Data type:', typeof dataList); // 打印 data 的类型
        console.log('Data:', dataList);
        setDefaultRecipes(dataList);
      }
    },[isDefaultMenu]);
    
    return (
      <>
        <div className='MealPlanTop'>
          <div className='MealPlanTopContent'>
            <h2>
              Plan your meals and discover new recipes
            </h2>
            <p>Find new interesting recipes recipes based on items in you pantry</p>
          </div>
          <div className='MealPlanTopImage'>
            <img src={MealPlanImage0} alt='MealPlanImage0'/>
          </div>
        </div>
        <div className='MealPlanSubTitle'>
          <h3>Recipe Collections</h3>
          <p>
            We've curated these recipes in every possible way to help you make the most of your pantry and reduce your food waste!
          </p>
        </div>
        <div className='MealPlanContainer'>
          <div className='RecipeSwitchContainer'>
            {/* Recommend Recipes 按钮 */}
            <button className='RecipeSwitch' onClick={() => setIsDefaultMenu(!isDefaultMenu)} disabled={(isApiError && isDefaultMenu)}>
              {isDefaultMenu ? 'Recommend Recipes' : 'Default Recipes'}
            </button>
          </div>
          {isApiError && (
            <div className='ApiError'>
              <p>API error, please check your inventory data and try again</p>
            </div>
          )}
          {isDefaultMenu ? (
            <RecipeGrid items={defaultRecipes} />
          ) : (
            <RecipeGrid items={recipes} />
          )}  
          <ImageButtons />  
        </div> 
      </>  
    );
  }
  
  export default MealPlan;
