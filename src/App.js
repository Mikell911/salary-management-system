import Header from "./Modules/Header/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import AboutUs from "./Pages/AboutUs/AboutUs";
import NonFound from "./Pages/Page404/NonFound";

function App() {
  return (
    <div className="wrapper">
        <Header/>
        <main>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/contact'} element={<Contact/>}/>
                <Route path={'/about-us'} element={<AboutUs/>}/>
                <Route path={'*'} element={<NonFound/>}/>
            </Routes>
        </main>
    </div>
  );
}

export default App;
