import axios from "axios";
import { useEffect, useState } from "react";

const ViewStock = () => {
    const [allStock, setAllStock] = useState([]);

    useEffect(() => {
        const fetchStock = async () => {
            await axios.get("https://stock-manager-server.vercel.app/stocks").then((res) => {
                console.log(res.data);
                setAllStock(res.data);
            });
        };

        fetchStock();
    }, []);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center mt-24">
            <h1 className="font-bold text-2xl">All Stock</h1>
            
            <table className="border border-black mt-4">
                <thead>
                    <tr>
                        <th className="px-3 py-1">Item</th>
                        <th className="px-3 py-1">Weight</th>
                        <th className="px-3 py-1">Purchase</th>
                        <th className="px-3 py-1">Total Purchase</th>
                    </tr>
                </thead>

                <tbody>
                    {
                    allStock.map((itr, index) => (
                        <tr key={index}>
                            <td className="px-3 py-1 text-center">{itr.item}</td>
                            <td className="px-3 py-1 text-center">{itr.weight}kg</td>
                            <td className="px-3 py-1 text-center">{itr.purchase.toFixed(2)}/-</td>
                            <td className="px-3 py-1 text-center">{(itr.weight * itr.purchase).toFixed(2)} Rs.</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default ViewStock;
