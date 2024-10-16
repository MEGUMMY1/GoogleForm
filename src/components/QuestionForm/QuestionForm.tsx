import { useState } from "react";
import ShortAnswer from "./Questions/ShortAnswer";
import LongAnswer from "./Questions/LongAnswer";
import MultipleChoice from "./Questions/MultipleChoice";
import Checkbox from "./Questions/Checkbox";
import Dropdown from "./Questions/Dropdown";
import OptionsDropdown from "./OptionsDropdown/OptionsDropdown";
import copy_icon from "../../assets/copy.png";
import delete_icon from "../../assets/delete.png";
import styles from "./QuestionForm.module.scss";
import { QuestionFormProps } from "./QuestionForm.types";

export default function QuestionForm({ id }: QuestionFormProps) {
  const [questionType, setQuestionType] = useState("객관식 질문");
  const [isRequired, setIsRequired] = useState(false);

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

  const toggleRequired = () => {
    setIsRequired(!isRequired);
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_dropdown_container}>
        <input className={styles.input_box} placeholder="질문" />
        <OptionsDropdown questionType={questionType} setQuestionType={setQuestionType} />
      </div>
      {renderQuestionComponent()}
      <div className={styles.bar} />
      <div className={styles.option_container}>
        <img className={styles.icon} src={copy_icon} width={20} height={20} alt="복사하기" />
        <img className={styles.icon} src={delete_icon} width={20} height={20} alt="삭제하기" />
        <div className={styles.toggle_container}>
          <p className={styles.toggle_text}>필수</p>
          <label className={styles.toggle_switch}>
            <input
              className={styles.toggle_input}
              type="checkbox"
              checked={isRequired}
              onChange={toggleRequired}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </div>
  );
}
