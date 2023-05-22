import { Route, Routes } from "react-router-dom";
import EditVac from "../../Pages/Admin/EditVac/EditVac";
import Vacs from "../../Pages/Admin/Vacs/Vacs";
import "./AdminRouting.css";

function AdminRouting(): JSX.Element {
    return (
        <div className="AdminRouting">
            <Routes>
			<Route path="/Admin/Vacs" element={<Vacs/>}/>
            <Route path="/Admin/EditVac" element={<EditVac/>}/>
            </Routes>
        </div>
    );
}

export default AdminRouting;
