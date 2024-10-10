import { useEffect } from "react";


const getLocalStorageData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

const checkSameItem = (item1, item2) => {
    if (item1['category'] === item2['category']) {
        
    }
    else {
        return false;
    }
}

const Prediction = () => {
    const [inventory, setInventory] = useState([]);
    const [usedItems, setUsedItems] = useState([]);
    const [expiredItems, setExpiredItems] = useState([]);

    useEffect(() => {
        setInventory(getLocalStorageData('inventory'));
        setUsedItems(getLocalStorageData('usedItems'));
        setExpiredItems(getLocalStorageData('expiredItems'));
    }, []);
    
    useEffect(()=> {
        const totalInventory = [...inventory, ...usedItems, ...expiredItems];
        const countList = []
        totalInventory.forEach(item => {
            
        });
    },[inventory, usedItems, expiredItems]);
    return (<div></div>)
};

export default Prediction;