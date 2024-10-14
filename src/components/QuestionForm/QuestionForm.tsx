import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ShortAnswer from "./Questions/ShortAnswer";
import LongAnswer from "./Questions/LongAnswer";
import MultipleChoice from "./Questions/MultipleChoice";
import Checkbox from "./Questions/Checkbox";
import Dropdown from "./Questions/Dropdown";
import OptionsDropdown from "./OptionsDropdown/OptionsDropdown";

export default function QuestionForm() {
  const questionType = useSelector((state: RootState) => state.form.questionType);

  const renderQuestionComponent = () => {
    switch (questionType) {
      case "단답형":
        return <ShortAnswer />;
      case "장문형":
        return <LongAnswer />;
      case "객관식 질문":
        return <MultipleChoice />;
      case "체크박스":
        return <Checkbox />;
      case "드롭다운":
        return <Dropdown />;
      default:
        return null;
    }
  };

  return (
    <div>
      <OptionsDropdown />
      {renderQuestionComponent()}
    </div>
  );
}
