import axios from "axios";
import { useEffect, useState } from "react";

const Record = () => {
    const [record, setRecord] = useState([]);
    const [name, setName] = useState("All");
    const [showPass, setshowPass] = useState(false);
    const [month, setMonth] = useState("All");
    const year = 2024;
    

    useEffect(() => {
        // const fetchBill = async () => {
        //     if(name === "All"){
        //         await axios.get("http://localhost:8080/bills").then((res) => {
        //             console.log("All");
        //             console.log(res.data);
        //             setRecord(res.data);
        //         });
        //     }
        //     else{
        //         await axios.get("http://localhost:8080/bills/atname",{params: { name: name }}).then((res) => {
        //             console.log(res.data);
        //             setRecord(res.data);
        //         });
        //     }
        // };

        const getMonthly = async () => {
            try {
                const res = await axios.get("http://localhost:8080/bills/monthly", {
                    params: { year: year, month: month, name: name }
                });
                console.log(res.data);
                setRecord(res.data);
            } catch (error) {
                console.error("Error fetching monthly bills:", error);
                setRecord([]); // Default to empty array on error
            }
        };

       
            getMonthly();

        
    }, [name,month]);

    const handleshowpass = ()=>{
        if(showPass === false){
            let pass = prompt("Enter Your Password");

            if(pass === process.env.REACT_APP_PASS){
                setshowPass(true);
            }
            else{
                alert("Wrong Password");
            }
        }
        else{
            setshowPass(false);
        }
    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center mt-24">
            <h1 className="font-bold text-2xl">सारे बिल देखे</h1>

            <div className="flex gap-5 flex-col">

            <div className="flex flex-row gap-5">
                <label htmlFor="naam" className="block mt-2 text-sm font-medium text-gray-90">Select Name: </label>
                <select onChange={(e)=>{setName(e.target.value)}} id="naam" className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ">
                    <option value="All" selected>All</option>
                    <option value="Sardarji">Sardarji</option>
                    <option value="Hakeem">Hakeem</option>
                    <option value="Rakesh">Rakesh</option>
                    <option value="Aone">Aone</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="flex flex-row gap-5">
                <label htmlFor="month" className="block mt-2 text-sm font-medium text-gray-900">Select Month: </label>
                <select value={month} onChange={(e) => setMonth(e.target.value)} id="month" className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                    <option value="All">All</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
                

                <div onClick={handleshowpass} className="bg-blue-500 w-[100px] m-auto flex justify-center items-center px-2 py-1 text-white rounded-md cursor-pointer">
                    {showPass ? (<span>Hide Profit</span>):(<span>Show Profit</span>)}
                </div>
            </div>

           

            {record.map((rec, recIndex) => {
                let totalProfit=0;
                let totalPrice = rec.items.reduce((acc, item, index) => {
                    totalProfit = totalProfit + rec.profits[index];
                    return acc + rec.weights[index] * rec.rates[index];
                }, 0);

                return (
                    <div key={recIndex} className="flex flex-col w-[350px] my-5 border border-black">
                        <div className="flex flex-row w-full justify-between items-center">
                            <span className="font-semibold px-2 py-1">{rec.name}</span>
                            <span className="px-2">{new Date(rec.createdAt).toDateString()}</span>
                        </div>
                        
                        <table className="border border-black">
                            <thead>
                                <tr>
                                    <th className="px-3 py-1">Item</th>
                                    <th className="px-3 py-1">Weight</th>
                                    <th className="px-3 py-1">Rate</th>
                                    <th className="px-3 py-1">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rec.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-3 py-1 text-center">{item}</td>
                                        <td className="px-3 py-1 text-center">{rec.weights[index]}kg</td>
                                        <td className="px-3 py-1 text-center">{rec.rates[index]}/-</td>
                                        <td className="px-3 py-1 text-center">{rec.weights[index] * rec.rates[index]} Rs.</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between">
                            {
                                showPass? (<span className={`px-2 font-semibold ${totalProfit > 0 ? 'text-green-500 ' : 'text-red-500'}`}>Profit: {totalProfit.toFixed(2)} Rs.</span>)
                                : (<span className="invisible">.</span>)
                            }
                            <span className="px-2">Total Price: Rs.{totalPrice}</span>
                        </div>
                        
                    </div>
                );
            })}
        </div>
    );
};

export default Record;
