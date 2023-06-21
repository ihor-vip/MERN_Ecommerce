import {Outlet} from "react-router-dom";

import Header from "./component/Header";

function App() {
  return (
    <div>
      <Header />
      <main className='p-16'>
          <Outlet/>
      </main>
    </div>
  );
}

export default App;
