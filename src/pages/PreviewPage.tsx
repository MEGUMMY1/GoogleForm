import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styles from "./Page.module.scss";

export default function PreviewPage() {
  const { title, subtitle, questionForms } = useSelector((state: RootState) => state.form);

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className={styles.components_container}>
        {questionForms.map((form) => (
          <div key={form.id} className={styles.questionItem}>
            <h3>
              {form.questionType}
              {form.questionText}
            </h3>
            {form.options.map((option) => (
              <p key={option.id}>{option.text}</p>
            ))}
            {form.isRequired && <span className={styles.required}>*</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
