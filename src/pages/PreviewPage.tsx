import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import styles from "./Page.module.scss";
import { useEffect, useRef, useState } from "react";
import top_arrow from "../assets/dropdown_top.png";
import down_arrow from "../assets/dropdown_down.png";

export default function PreviewPage() {
  const { title, subtitle, questionForms } = useSelector((state: RootState) => state.form);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [formErrors, setFormErrors] = useState<{ [key: number]: boolean }>({});
  const [errorMessages, setErrorMessages] = useState<{ [key: number]: string }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleInputChange = (formId: number, value: string | string[]) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [formId]: value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [formId]: false }));
    setErrorMessages((prevMessages) => ({ ...prevMessages, [formId]: "" }));
  };

  const handleBlur = (formId: number) => {
    if (questionForms[formId].isRequired && !answers[formId]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [formId]: true }));
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        [formId]: "필수 질문입니다.",
      }));
    }
  };

  const handleClear = () => {
    setAnswers({});
    setSelectedOption(null);
    setFormErrors({});
    setErrorMessages({});

    questionForms.forEach((form) => {
      switch (form.questionType) {
        case "단답형":
        case "장문형":
          handleInputChange(form.id, "");
          break;
        case "객관식 질문":
          handleInputChange(form.id, "");
          break;
        case "체크박스":
          handleInputChange(form.id, []);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.components_container}>
        <div className={styles.title_container}>
          <div className={styles.title_bar} />
          <div className={styles.title_wrapper}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
            <p className={styles.required}>* 표시는 필수 질문</p>
          </div>
        </div>
        {questionForms.map((form) => (
          <div key={form.id} className={styles.form_container}>
            <div className={`${styles.form_wrapper} ${formErrors[form.id] ? styles.error : ""}`}>
              <div className={styles.form_header}>
                <h2>{form.questionText}</h2>
                {form.isRequired && <span className={styles.required}>*</span>}
              </div>
              {(() => {
                switch (form.questionType) {
                  case "단답형":
                    return (
                      <input
                        type="text"
                        className={styles.shortanswer}
                        placeholder="내 답변"
                        value={answers[form.id] || ""}
                        onChange={(e) => handleInputChange(form.id, e.target.value)}
                        onBlur={() => handleBlur(form.id)}
                        onFocus={() => setFormErrors((prev) => ({ ...prev, [form.id]: false }))}
                      />
                    );
                  case "장문형":
                    return (
                      <textarea
                        className={styles.longanswer}
                        placeholder="내 답변"
                        rows={1}
                        value={answers[form.id] || ""}
                        onChange={(e) => handleInputChange(form.id, e.target.value)}
                        onBlur={() => handleBlur(form.id)}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                        onFocus={() => setFormErrors((prev) => ({ ...prev, [form.id]: false }))}
                      />
                    );
                  case "객관식 질문":
                    return form.options.map((option) => (
                      <div key={option.id} className={styles.checkbox_wrapper}>
                        <input
                          type="radio"
                          id={`option-${option.id}`}
                          name={`question-${form.id}`}
                          className={styles.checkbox}
                          checked={answers[form.id] === option.text}
                          onChange={() => handleInputChange(form.id, option.text)}
                        />
                        <label htmlFor={`option-${option.id}`}>{option.text}</label>
                      </div>
                    ));
                  case "체크박스":
                    return form.options.map((option) => (
                      <div key={option.id} className={styles.checkbox_wrapper}>
                        <input
                          type="checkbox"
                          id={`option-${option.id}`}
                          className={styles.checkbox}
                          checked={
                            Array.isArray(answers[form.id]) &&
                            answers[form.id].includes(option.text)
                          }
                          onChange={() => {
                            const currentAnswers: string[] = Array.isArray(answers[form.id])
                              ? (answers[form.id] as string[])
                              : [];

                            if (currentAnswers.includes(option.text)) {
                              handleInputChange(
                                form.id,
                                currentAnswers.filter((ans) => ans !== option.text)
                              );
                            } else {
                              handleInputChange(form.id, [...currentAnswers, option.text]);
                            }
                          }}
                        />
                        <label htmlFor={`option-${option.id}`}>{option.text}</label>
                      </div>
                    ));
                  case "드롭다운":
                    return (
                      <div className={styles.dropdown} ref={dropdownRef}>
                        <div className={styles.dropdown_input} onClick={() => setIsOpen(!isOpen)}>
                          <span>{selectedOption || "선택"}</span>
                          <img
                            src={isOpen ? top_arrow : down_arrow}
                            className={styles.dropdown_icon}
                            width={15}
                            height={15}
                            alt="arrow icon"
                          />
                        </div>
                        {isOpen && (
                          <ul className={styles.dropdown_menu}>
                            {form.options.map((option) => (
                              <li
                                key={option.id}
                                className={styles.dropdown_option}
                                onClick={() => {
                                  handleOptionClick(option.text);
                                  handleInputChange(form.id, option.text);
                                }}
                              >
                                {option.text}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
              {formErrors[form.id] && (
                <p className={styles.error_message}>{errorMessages[form.id]}</p>
              )}
            </div>
          </div>
        ))}
        <div className={styles.button_wrapper}>
          <button className={styles.submit_button}>제출</button>
          <button onClick={handleClear} className={styles.clear_button}>
            양식 지우기
          </button>
        </div>
      </div>
    </div>
  );
}
