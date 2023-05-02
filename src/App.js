import { useEffect } from "react";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AddEditNota from "./pages/AddEditNota";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route 
              path='/' 
              element={<Dashboard />}
            />
            <Route path='/all' element={
              <PrivateRoute>
              <Home />
              </PrivateRoute>
            } />
            <Route path='/notas/search' element={
              <PrivateRoute>
              <Home />
              </PrivateRoute>
            } />
            <Route path='/notas/dateRange' element={
                <PrivateRoute>
                <Home />
                </PrivateRoute>  
            } />
            <Route path='/notas/statusFilter' element={
                <PrivateRoute>
                <Home />
                </PrivateRoute>  
            } />
            <Route path='/notas/filter' element={
                <PrivateRoute>
                <Home />
                </PrivateRoute>  
            } />
            <Route path='/create' element={
              <PrivateRoute>
              <AddEditNota />
              </PrivateRoute>
            } />
            <Route path="/nota/:id" element={
              <PrivateRoute>
              <AddEditNota />
              </PrivateRoute>  
            } />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
