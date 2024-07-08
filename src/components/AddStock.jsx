import { useState } from "react";
import Table from "./Table";
import axios from "axios";
import Select from 'react-select';


const AddStock = ()=>{
    const [items, setItems] = useState([]);
    const [weights, setWeights] = useState([]);
    const [purchases, setPurchases] = useState([]);

    const [item, setItem] = useState("");
    const [weight, setWeight] = useState(0);
    const [purchase, setPurchase] = useState(0);

    const options = [
        { value: '0.5x0.5 pipe', label: '0.5x0.5 pipe' },
        { value: '0.75x0.75 pipe', label: '0.75x0.75 pipe' },
        { value: '1x0.5 pipe', label: '1x0.5 pipe' },
        { value: '1x1 (5kg) pipe', label: '1x1 (5kg) pipe' },
        { value: '1x1 (7kg) pipe', label: '1x1 (7kg) pipe' },
        { value: '1x1 (9kg) pipe', label: '1x1 (9kg) pipe' },
        { value: '1.5x1 pipe', label: '1.5x1 pipe' },
        { value: '1.5x1.5 (9kg) pipe', label: '1.5x1.5 (9kg) pipe' },
        { value: '1.5x1.5 (12kg) pipe', label: '1.5x1.5 (12kg) pipe' },
        { value: '2x1 (9kg) pipe', label: '2x1 (9kg) pipe' },
        { value: '2x1 (12kg) pipe', label: '2x1 (12kg) pipe' },
        { value: '2x2 (12kg) pipe', label: '2x2 (12kg) pipe' },
        { value: '2x2 (15kg) pipe', label: '2x2 (15kg) pipe' },
        { value: '2x2 (20kg) pipe', label: '2x2 (20kg) pipe' },
        { value: '2.5x1.5 pipe', label: '2.5x1.5 pipe' },
        { value: '3x1 pipe', label: '3x1 pipe' },
        { value: '3x1.5 pipe', label: '3x1.5 pipe' },
        { value: '4x2 pipe', label: '4x2 pipe' },
        { value: '1.5 inch round (9kg) pipe', label: '1.5 inch round (9kg) pipe' },
        { value: '2 inch round (12kg) pipe', label: '2 inch round (12kg) pipe' },
        { value: '2 inch round (18kg) pipe', label: '2 inch round (18kg) pipe' },
        { value: '3 inch round pipe', label: '3 inch round pipe' },
        { value: '1x0.5 L', label: '1x0.5 L' },
        { value: '1x1 L', label: '1x1 L' },
        { value: '1.25x1 L', label: '1.25x1 L' },
        { value: '35x5 L', label: '35x5 L' },
        { value: '40x5 L', label: '40x5 L' },
        { value: '50x5 L', label: '50x5 L' },
        { value: '0.75x0.5 Flat', label: '0.75x0.5 Flat' },
        { value: '0.75x1 Flat', label: '0.75x1 Flat' },
        { value: '1x1 Flat', label: '1x1 Flat' },
        { value: '0.75x1.5 Flat', label: '0.75x1.5 Flat' },
        { value: '1.25x1 Flat', label: '1.25x1 Flat' },
        { value: '1.25x2 Flat', label: '1.25x2 Flat' },
        { value: '1.5x2 Flat', label: '1.5x2 Flat' },
        { value: '2x2 Flat', label: '2x2 Flat' },
        { value: '2 sq', label: '2 sq' },
        { value: '2.5 sq', label: '2.5 sq' },
        { value: '3 sq', label: '3 sq' },
        { value: '4 sq', label: '4 sq' },
        { value: '10mm round', label: '10mm round' },
        { value: '12mm round', label: '12mm round' },
        { value: '15mm round', label: '15mm round' },
        { value: 'Section ISI', label: 'Section ISI' },
        { value: 'Section Local', label: 'Section Local' }
      ];


    const handleAddItem = ()=>{


        if(item === ""){
            alert("Please enter item");
            return ;
        }
        if(weight === ""){
            alert("Please enter weight");
            return ;
        }
        if(purchase === ""){
            alert("Please enter rate");
            return ;
        }

        setItems((prevItems) => [...prevItems, item.value]);
        setWeights((prevItems) => [...prevItems, weight]);
        setPurchases((prevItems) => [...prevItems, purchase]);

        console.log(items);

            setItem("");
            setWeight("");
            setPurchase("");
    }

    const handleChange = (selectedOption) => {
        setItem(selectedOption);
    }

    const handleAddStock = async()=>{

        const hasDuplicates = () => {
            for (let i = 0; i < items.length; i++) {
                for (let j = i + 1; j < items.length; j++) {
                    if (items[i] === items[j]) {
                        alert("Duplicates not allowed !!");
                        return true; // Duplicate found
                    }
                }
            }
            return false;
        };

        if(hasDuplicates() === true){
            setItems([]);
            setWeights([]);
            setPurchases([]);
            setItem("");
            setWeight("");
            setPurchase("");
            return ;
        }

        items.map( async(it,index)=>{
            await axios.put("http://localhost:8080/stocks",{item:it, weight:weights[index], purchase:purchases[index]}).then((res)=>{
                console.log(res.data);
            })
        })

            setItems([]);
            setWeights([]);
            setPurchases([]);
            setItem("");
            setWeight("");
            setPurchase("");

    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center mt-24">
            <h1 className="font-bold text-2xl">Stock जोड़ें</h1>

            <div id="Billdiv" className="w-[300px] h-[300px] mt-4 bg-[#F09536]">
                
                <form className="max-w-sm mx-auto mt-2 flex justify-center items-center flex-col">

                <label htmlFor="it" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Select Item</label>
                <Select className="w-[200px]" onChange={handleChange} value={item} options={options} />

                <div className="mt-3 flex items-center justify-center">
                    <label htmlFor="we" className="font-semibold text-white" >Total Weight: </label>
                    <input value={weight}  id="we" onChange={(e)=>{setWeight(e.target.value)}} className="ml-2 w-[100px] px-2 rounded-md" placeholder="Enter weight in kg" type="number" />
                </div>

                <div className="mt-3 flex items-center justify-center">
                    <label htmlFor="ra" className="font-semibold text-white" >Purchase Price: </label>
                    <input value={purchase} id="ra" onChange={(e)=>{setPurchase(e.target.value)}} className="ml-2 w-[100px] px-2 rounded-md" placeholder="Enter Purchase" type="number" />
                </div>

                    <div onClick={handleAddItem} className="mt-6 bg-white text-[#F09536] px-2 py-1 cursor-pointer rounded-lg">Add Item</div>
                </form>
                
            </div>
            <Table items={items} weights={weights} rates={purchases}/>

            <div onClick={handleAddStock} className="text-lg rounded-lg bg-blue-400 px-2 py-1 mt-4 cursor-pointer">Add Stock</div>
        </div>
    )
}

export default AddStock;