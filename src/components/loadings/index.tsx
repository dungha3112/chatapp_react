import { LabelAnimation, OverlayStyle } from "../../styles";
import styles from "./index.module.scss";

type Props = {
  text: string;
};
const Loading = ({ text }: Props) => {
  return (
    <OverlayStyle>
      {/* <div className={styles.wrapper}>
        <div className={styles.text}>Loading ...</div>
      </div> */}

      <LabelAnimation
        style={{ fontSize: "20px" }}
        $animation={true}
        $length={text.length}
      >
        {text.split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </LabelAnimation>
    </OverlayStyle>
  );
};

export default Loading;
