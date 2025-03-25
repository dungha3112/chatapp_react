import React from "react";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "../../components/sidebars/settings/SettingsSidebar";

const SettingsPage = () => {
  return (
    <>
      <SettingsSidebar />
      <Outlet />
    </>
  );
};

export default SettingsPage;
