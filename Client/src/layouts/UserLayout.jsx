import { Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";

const UserLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default UserLayout;
