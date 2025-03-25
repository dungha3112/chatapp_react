import {
  SettingsSidebarHeader,
  SettingsSidebarItemContainer,
  SettingsSidebarStyle,
} from "../../../styles/settings";
import { settingsItems } from "../../../utils/constants";
import SettingsSidebarItem from "./SettingsSidebarItem";

const SettingsSidebar = () => {
  return (
    <SettingsSidebarStyle>
      <SettingsSidebarHeader>
        <span>Settings</span>
      </SettingsSidebarHeader>

      <SettingsSidebarItemContainer>
        {settingsItems.map((item) => (
          <SettingsSidebarItem key={item.id} item={item} />
        ))}
      </SettingsSidebarItemContainer>
    </SettingsSidebarStyle>
  );
};

export default SettingsSidebar;
