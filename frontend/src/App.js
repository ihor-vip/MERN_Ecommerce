import {Outlet} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

import Header from "./component/Header";
import {setDataProduct} from "./redux/productSlice";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
            const resData = await res.json()
            dispatch(setDataProduct(resData))
        })()
    },[])

    return (
        <>
            <Toaster />
            <div>
                <Header />
                <main className='p-16 bg-slate-100 min-h-[calc(100vh)]'>
                    <Outlet/>
                </main>
            </div>
        </>
      );
}

export default App;
