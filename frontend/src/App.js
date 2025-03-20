import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import SuperAdmin from "./Pages/superAdmin/SuperAdmin";
import SellerAdmin from "./Pages/sellerAdmin/SellerAdmin";
import Cart from "./Pages/cart/Cart";
import ManageUsers from "./Pages/superAdmin/superAdminUtils/ManageUsers";
import ManageProducts from "./Pages/superAdmin/superAdminUtils/ManageProducts";
import EditProduct from "./Utils/EditProduct";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/superadmin" Component={SuperAdmin} />
        <Route path="/selleradmin" Component={SellerAdmin} />
        <Route path="/cart" Component={Cart} />
        <Route path="/superadmin/manageusers" Component={ManageUsers}/>
        <Route path="/superadmin/manageproducts" Component={ManageProducts}/>
        <Route path="/superadmin/manageproducts/editproduct/:id" Component={EditProduct}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
