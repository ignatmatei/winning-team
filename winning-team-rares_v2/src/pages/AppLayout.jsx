
import Sidebar from "../components/Sidebar";
import User from "../components/User";

import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar/>
      <Outlet/>
      <User />
      
    </div>
  );
}

export default AppLayout;
