import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatRooms from "./pages/Chatrooms";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/chatrooms" element={<ChatRooms/>}/>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                theme="colored"
                newestOnTop={true}
                pauseOnHover={false}
                closeOnClick
            />
        </Router>
    );
}

export default App;
