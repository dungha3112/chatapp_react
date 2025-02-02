// import { useState } from "react";
// import { FiEdit } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
// import {
//   ConversationSidebarContainer,
//   ConversationSidebarStyle,
// } from "../../styles/sidebar";
// import CreateConversationModal from "../modals/CreateConversationModal";

import {
  ConversationHeaderSidebarStyle,
  ConversationSidebarContainerStyle,
  ConversationSidebarStyle,
} from "../../styles/conversationSidebar";

// import GroupItem from "../groups/GroupItem";
// import ConversationSelected from "../conversations/ConversationSelected";
// import { ConversationSibarItem } from "../conversations/ConversationSibarItem";
// import { ConversationHeaderSidebar } from "../../styles/conversations";

// const ConversationSidebar = () => {
//   const conversationType = useSelector(
//     (state: RootState) => state.selectedConversationType.type
//   );

//   const [showModal, setShowModal] = useState<boolean>(false);

//   const { conversations } = useSelector(
//     (state: RootState) => state.conversation
//   );

//   const groups = useSelector((state: RootState) => state.group.groups);

//   return (
//     <ConversationSidebarStyle>
//       {showModal && <CreateConversationModal setShowModal={setShowModal} />}
//       <ConversationHeaderSidebar>
//         <h1>Conversations</h1>
//         <div onClick={() => setShowModal(true)}>
//           <FiEdit size={24} />
//         </div>
//       </ConversationHeaderSidebar>

//       <ConversationSidebarContainer>
//         <ConversationSelected />
//         <section>
//           {conversationType === "private"
//             ? conversations.map((conversation) => (
//                 <ConversationSibarItem
//                   conversation={conversation}
//                   key={conversation.id}
//                 />
//               ))
//             : groups.map((group) => <GroupItem group={group} key={group.id} />)}
//         </section>
//       </ConversationSidebarContainer>
//     </ConversationSidebarStyle>
//   );
// };

// export default ConversationSidebar;

const ConversationSidebar = () => {
  const arr = () => {
    const items = [];
    for (let i = 1; i <= 100; i++) {
      items.push(
        <div key={i}>
          <h1>ok la cva {i}</h1>
        </div>
      );
    }
    return <>{items}</>;
  };

  return (
    <ConversationSidebarStyle>
      <ConversationHeaderSidebarStyle>
        Conversations
      </ConversationHeaderSidebarStyle>

      {/* <ConversationSidebarContainerStyle>
        {arr()}
      </ConversationSidebarContainerStyle> */}
    </ConversationSidebarStyle>
  );
};

export default ConversationSidebar;
