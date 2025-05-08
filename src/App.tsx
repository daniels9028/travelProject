import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DataUser from "./pages/admin/DataUser";
import DataBanner from "./pages/admin/banner/DataBanner";
import DataPromo from "./pages/admin/promo/DataPromo";
import DataCategory from "./pages/admin/category/DataCategory";
import DataActivity from "./pages/admin/activity/DataActivity";
import DataTransaction from "./pages/admin/transaction/DataTransaction";
import AddBanner from "./pages/admin/banner/AddBanner";
import EditBanner from "./pages/admin/banner/EditBanner";
import AddPromo from "./pages/admin/promo/AddPromo";
import AddCategory from "./pages/admin/category/AddCategory";
import EditCategory from "./pages/admin/category/EditCategory";
import EditPromo from "./pages/admin/promo/EditPromo";
import AddActivity from "./pages/admin/activity/AddActivity";
import EditActivity from "./pages/admin/activity/EditActivity";
import DetailTransaction from "./pages/admin/transaction/DetailTransaction";
import DiscoverPage from "./pages/DiscoverPage";
import SpecialDealsPage from "./pages/SpecialDealsPage";
import DiscoverDetailPage from "./pages/DiscoverDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import DetailOrderPage from "./pages/DetailOrderPage";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/discover/:id" element={<DiscoverDetailPage />} />
        <Route path="/special-deals" element={<SpecialDealsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/cart" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<DetailOrderPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard">
            <Route index element={<AdminDashboard />} />
            {/* Users */}
            <Route path="users" element={<DataUser />} />

            {/* Banners */}
            <Route path="banners">
              <Route index element={<DataBanner />} />
              <Route path="add-banner" element={<AddBanner />} />
              <Route path=":id/edit" element={<EditBanner />} />
            </Route>

            {/* Promos */}
            <Route path="promos">
              <Route index element={<DataPromo />} />
              <Route path="add-promo" element={<AddPromo />} />
              <Route path=":id/edit" element={<EditPromo />} />
            </Route>

            {/* Categories */}
            <Route path="categories">
              <Route index element={<DataCategory />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path=":id/edit" element={<EditCategory />} />
            </Route>

            {/* Activities */}
            <Route path="activities">
              <Route index element={<DataActivity />} />
              <Route path="add-activity" element={<AddActivity />} />
              <Route path=":id/edit" element={<EditActivity />} />
            </Route>

            {/* Transactions */}
            <Route path="transactions">
              <Route index element={<DataTransaction />} />
              <Route path=":id/detail" element={<DetailTransaction />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
