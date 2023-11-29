import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import ShowUsers from "./components/ShowUsers";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowUsers />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
