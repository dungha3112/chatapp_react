import { useLocation, useNavigate } from "react-router-dom";
import { SettingsSidebarItemStyle } from "../../../styles/settings";
import { SettingsItemType } from "../../../utils/types";
import { getSettingSidebarIcon } from "../../../utils/helpers";

type Props = {
  item: SettingsItemType;
};
const SettingsSidebarItem = ({ item }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const Icon = getSettingSidebarIcon(item.id);
  const ICON_SIZE = 30;
  const STROKE_WIDTH = 2;
  return (
    <SettingsSidebarItemStyle
      $isActive={item.pathname === pathname}
      onClick={() => navigate(item.pathname)}
    >
      <div className="settingItem">
        <Icon size={ICON_SIZE} strokeWidth={STROKE_WIDTH} />
        <span>{item.label}</span>
      </div>
    </SettingsSidebarItemStyle>
  );
};

export default SettingsSidebarItem;
