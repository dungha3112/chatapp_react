import { GithubSelector } from "@charkour/react-reactions";

const FeedbackIcon = () => {
  return (
    <div
      style={{ position: "absolute", bottom: 30, right: 0, userSelect: "none" }}
    >
      <GithubSelector />
    </div>
  );
};

export default FeedbackIcon;
