import { Outlet } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const AdminLayoutWrapper = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminLayoutWrapper;
