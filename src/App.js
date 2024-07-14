import Home from "./components/Home";
import Record from "./components/Record";
import AddStock from "./components/AddStock";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewStock from "./components/ViewStock";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Monthly from "./components/Monthly";


export default function App() {

  const [show, setShow] = useState(false);

  useEffect(()=>{
    const pass = prompt("Enter your password");
    if(pass === process.env.REACT_APP_PASS){
      setShow(true);
    }
    else{
      setShow(false);
    }
  },[]);

  return (
      show?(<BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/record" element={<Record/>} />
        <Route path="/addstock" element={<AddStock/>} />
        <Route path="/viewstock" element={<ViewStock/>} />
        <Route path="/monthly" element={<Monthly/>} />
      </Routes>
     
    </BrowserRouter>)
    :
    (<div className="w-full flex items-center justify-center mt-8">
        <h1 className="text-xl font-semibold">
        Wrong Password,Please Reload to try again</h1>
    </div>
    )

    
  )
}
