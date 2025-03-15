import { Dispatch, SetStateAction } from "react";
import {
  InputContainer,
  InputField,
  InputLabel,
  LabelAnimation,
} from "../../styles";

type Props = {
  searching: boolean;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
};
const GroupRecipientField = ({ searching, setQuery, query }: Props) => {
  const titleLength = (searching ? "Search ..." : "Recipient").length;

  return (
    <section>
      <InputContainer $backgroundColor="#161616">
        {searching ? (
          <LabelAnimation
            htmlFor="username"
            $animation={true}
            $length={titleLength}
          >
            {"Search ...".split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </LabelAnimation>
        ) : (
          <InputLabel>Recipient</InputLabel>
        )}
        <InputField
          id="username"
          value={query}
          autoComplete="off"
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputContainer>
    </section>
  );
};

export default GroupRecipientField;
