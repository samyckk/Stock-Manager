import axios from "axios";
import { useEffect, useState } from "react";

const Monthly = () => {
    const [month, setMonth] = useState("All");
    const [name, setName] = useState("All");
    const [details, setDetails] = useState({
        name: "All",
        month: "",
        monthlyProfit: 0,
        monthlySales: 0
    });
    const year = 2024;

    useEffect(() => {
        const getMonthly = async () => {
            await axios.get("http://localhost:8080/bills/details", {
                    params: { year: year, month: month, name: name }
                }).then( (res)=>{
                    console.log(res.data);
                    setDetails(res.data);
                });
                
                
        };

        getMonthly();
    }, [month, year,name]); // Add year as dependency to ensure it updates if year changes

    return (
        <div className="mt-24 w-full flex flex-col items-center justify-center">

            <div className="flex flex-row gap-5 mt-5">
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
           

            <div className="flex flex-row gap-5 mt-5">
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
        


            <div className="flex flex-col border border-black w-[350px] mt-10">
                <div className="flex flex-row justify-between px-2 py-2">
                    <h1>Name: </h1>
                    <h1>{details.name}</h1>
                </div>
                <div className="flex flex-row justify-between px-2 py-2">
                    <h1>Month: </h1>
                    <h1>{details.month}</h1>
                </div>
                <div className="flex flex-row justify-between px-2 py-2">
                    <h1>Year: </h1>
                    <h1>2024</h1>
                </div>
                
                <div className="flex flex-row justify-between px-2 py-2">
                    <h1>Monthly Sales: </h1>
                    <h1>{details.monthlySales.toFixed(2)} Rs.</h1>
                </div>
                <div className="flex flex-row justify-between px-2 py-2">
                    <h1 className={details.monthlyProfit>0 ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>Monthly Profit: </h1>
                    <h1 className={details.monthlyProfit>0 ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>{details.monthlyProfit.toFixed(2)} Rs.</h1>
                </div>
            </div>
        </div>
    );
};

export default Monthly;
