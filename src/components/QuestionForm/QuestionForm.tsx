import { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { updateFormState } from "../../redux/formSlice";

export default function QuestionForm({
  id,
  questionType,
  isRequired,
  onDelete,
  onCopy,
  questionText,
  options,
}: QuestionFormProps) {
  const dispatch = useDispatch();
  const [localQuestionText, setLocalQuestionText] = useState(questionText);
  const [localQuestionType, setLocalQuestionType] = useState(questionType);
  const [localIsRequired, setLocalIsRequired] = useState(isRequired);

  useEffect(() => {
    dispatch(
      updateFormState({
        id: id,
        updatedState: {
          questionType: localQuestionType,
          isRequired: localIsRequired,
          questionText: localQuestionText,
          options: options,
        },
      })
    );
  }, [localQuestionText, localQuestionType, localIsRequired, options, dispatch, id]);

  const renderQuestionComponent = () => {
    switch (localQuestionType) {
      case "단답형":
        return <ShortAnswer />;
      case "장문형":
        return <LongAnswer />;
      case "객관식 질문":
        return <MultipleChoice options={options} id={id} />;
      case "체크박스":
        return <Checkbox options={options} id={id} />;
      case "드롭다운":
        return <Dropdown options={options} id={id} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_dropdown_container}>
        <input
          className={styles.input_box}
          placeholder="질문"
          value={localQuestionText}
          onChange={(e) => setLocalQuestionText(e.target.value)}
        />
        <OptionsDropdown questionType={localQuestionType} setQuestionType={setLocalQuestionType} />
      </div>
      {renderQuestionComponent()}
      <div className={styles.bar} />
      <div className={styles.option_container}>
        <div className={styles.icon_container} onClick={() => onCopy(id)}>
          <img className={styles.icon} src={copy_icon} width={20} height={20} alt="복사하기" />
          <span className={styles.tooltip}>복사</span>
        </div>
        <div className={styles.icon_container} onClick={() => onDelete(id)}>
          <img className={styles.icon} src={delete_icon} width={20} height={20} alt="삭제하기" />
          <span className={styles.tooltip}>삭제</span>
        </div>
        <div className={styles.toggle_container}>
          <p className={styles.toggle_text}>필수</p>
          <label className={styles.toggle_switch}>
            <input
              className={styles.toggle_input}
              type="checkbox"
              checked={localIsRequired}
              onChange={() => setLocalIsRequired(!localIsRequired)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </div>
  );
}
