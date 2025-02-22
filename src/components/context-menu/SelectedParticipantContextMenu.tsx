// import { forwardRef, useImperativeHandle, useRef } from "react";
// import { BsPersonFillSlash } from "react-icons/bs";
// import { FaUserCircle } from "react-icons/fa";
// import { GiQueenCrown } from "react-icons/gi";
// import { ContextMenuItemStyle, ContextMenuSyle } from "../../styles";
// import { PointsType } from "../../utils/types";

// type Props = {
//   points: PointsType;
// };

// const SelectedParticipantContextMenu = forwardRef<any, Props>((props, ref) => {
//   const { points } = props;

//   const menuRef = useRef<HTMLUListElement>(null);

//   useImperativeHandle(
//     ref,
//     () => ({
//       getOffsetValue: () => ({
//         width: menuRef.current?.offsetWidth,
//         height: menuRef.current?.offsetHeight,
//       }),
//     }),
//     []
//   );

//   return (
//     <ContextMenuSyle $top={points.y} $left={points.x} ref={menuRef}>
//       <ContextMenuItemStyle>
//         <FaUserCircle fontSize={20} />
//         Profile
//       </ContextMenuItemStyle>

//       <ContextMenuItemStyle style={{ color: "#FF0000" }}>
//         <BsPersonFillSlash fontSize={20} />
//         Kick user
//       </ContextMenuItemStyle>
//       <ContextMenuItemStyle style={{ color: "#FFB800" }}>
//         <GiQueenCrown fontSize={20} />
//         Transfer owner
//       </ContextMenuItemStyle>
//     </ContextMenuSyle>
//   );
// });

// export default SelectedParticipantContextMenu;

import { BsPersonFillSlash } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { ContextMenuItemStyle, ContextMenuSyle } from "../../styles";
import { PointsType } from "../../utils/types";

type Props = {
  points: PointsType;
};
const SelectedParticipantContextMenu = ({ points }: Props) => {
  return (
    <ContextMenuSyle $top={points.y} $left={points.x}>
      <ContextMenuItemStyle>
        <FaUserCircle fontSize={20} />
        Profile
      </ContextMenuItemStyle>

      <ContextMenuItemStyle style={{ color: "#FF0000" }}>
        <BsPersonFillSlash fontSize={20} />
        Kick user
      </ContextMenuItemStyle>
      <ContextMenuItemStyle style={{ color: "#FFB800" }}>
        <GiQueenCrown fontSize={20} />
        Transfer owner
      </ContextMenuItemStyle>
    </ContextMenuSyle>
  );
};

export default SelectedParticipantContextMenu;
