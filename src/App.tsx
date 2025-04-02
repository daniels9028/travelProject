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
import DataTransaction from "./pages/admin/DataTransaction";
import AddBanner from "./pages/admin/banner/AddBanner";
import EditBanner from "./pages/admin/banner/EditBanner";
import AddPromo from "./pages/admin/promo/AddPromo";
import AddCategory from "./pages/admin/category/AddCategory";
import EditCategory from "./pages/admin/category/EditCategory";
import EditPromo from "./pages/admin/promo/EditPromo";
import AddActivity from "./pages/admin/activity/AddActivity";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/users" element={<DataUser />} />

          <Route path="/dashboard/banners" element={<DataBanner />} />
          <Route path="/dashboard/banners/add-banner" element={<AddBanner />} />
          <Route path="/dashboard/banners/:id/edit" element={<EditBanner />} />

          <Route path="/dashboard/promos" element={<DataPromo />} />
          <Route path="/dashboard/promos/add-promo" element={<AddPromo />} />
          <Route path="/dashboard/promos/:id/edit" element={<EditPromo />} />

          <Route path="/dashboard/categories" element={<DataCategory />} />
          <Route
            path="/dashboard/categories/add-category"
            element={<AddCategory />}
          />
          <Route
            path="/dashboard/categories/:id/edit"
            element={<EditCategory />}
          />

          <Route path="/dashboard/activities" element={<DataActivity />} />
          <Route
            path="/dashboard/activities/add-activity"
            element={<AddActivity />}
          />

          <Route path="/dashboard/transactions" element={<DataTransaction />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
