import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import ManagePlatfrom from "./pages/manage-platfrom";
import ManageTest from "./pages/manage-test";
import ManageUser from "./pages/manage-user";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/platform" element={<ManagePlatfrom />} />
        <Route path="/user" element={<ManageUser />} />
        <Route path="/test" element={<ManageTest />} />
      </Route>
    </Routes>
  );
};

export default App;
