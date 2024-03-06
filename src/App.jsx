import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import EditApp from './components/EditApp';
import AddApp from './components/AddApp';
import Header from "./components/Header";
import AddAppType from "./components/AddAppType";
import EditAppType from "./components/EditAppType";

const App = () => {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit-app/:id' element={<EditApp />} />
          <Route path='/edit-type/:id' element={<EditAppType />} />
          <Route path=':id/create-app/' element={< AddApp />} />
          <Route path='/create-type' element={<AddAppType />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;