

const Table = ({items, weights, rates})=>{
    
    return( 
        <div className="mt-4">
            <table className="border border-black">
                <thead>
                    <tr>
                        <th className="px-6 py-3">Item</th>
                        <th className="px-6 py-3">Weight</th>
                        <th className="px-6 py-3">Rate</th>
                        <th className="px-6 py-3">Price</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="px-3 py-2 text-center">{item}</td>
                            <td className="px-3 py-2 text-center">{weights[index]}kg</td>
                            <td className="px-3 py-2 text-center">{rates[index]}/-</td>
                            <td className="px-3 py-2 text-center">{weights[index] * rates[index]} Rs.</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
