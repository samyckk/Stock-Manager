import axios from "axios";
import { useEffect, useState } from "react";

const ViewStock = () => {
    const [allStock, setAllStock] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStock = async () => {
            setLoading(true);
            await axios.get("https://stock-manager-server.vercel.app/stocks").then((res) => {
                console.log(res.data);
                setAllStock(res.data);
                setLoading(false);
            });
        };

        fetchStock();
    }, []);

    return (
        <div className="h-full w-full flex flex-col justify-center items-center mt-24">
            <h1 className="font-bold text-2xl">सारे Stock देखे</h1>

            {
                loading ? (<div><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="" srcset="" /></div>) :

                (
                    <>
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
                                <td className="px-3 py-1 text-center">{(itr.weight).toFixed(2)}kg</td>
                                <td className="px-3 py-1 text-center">{itr.purchase.toFixed(2)}/-</td>
                                <td className="px-3 py-1 text-center">{(itr.weight * itr.purchase).toFixed(2)} Rs.</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>)
            }
            
            
            
        </div>
    );
};

export default ViewStock;
