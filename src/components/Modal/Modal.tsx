import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./Modal.module.scss";
import close_icon from "../../assets/close.svg";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { answers, questionForms, title, subtitle } = useSelector((state: RootState) => state.form);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter" || "") {
      onClose();
    }
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2 className={styles.result_title}>설문 제출 결과</h2>
        <div className={styles.title_wrapper}>
          <p className={styles.title}>{title}</p>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.bar} />
        <ul className={styles.question_form}>
          {questionForms.map((form) => {
            const answer = answers[form.id];
            if (answer !== undefined && answer !== "") {
              return (
                <li key={form.id}>
                  <p className={styles.question}>
                    {form.id + 1}. {form.questionText}
                  </p>
                  <p className={styles.answer}>
                    {Array.isArray(answer) ? answer.join(", ") : answer}
                  </p>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <img
          src={close_icon}
          className={styles.close_button}
          alt="닫기"
          onClick={onClose}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e)}
          role="button"
        />
      </div>
    </div>
  );
}
