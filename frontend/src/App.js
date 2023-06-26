import {Outlet} from "react-router-dom";
import toast, {Toast, Toaster} from "react-hot-toast";

import Header from "./component/Header";

function App() {
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
