import { useState } from "react";
import Nav from "../components/Nav/Nav";
import Title from "../components/Title/Title";
import styles from "./Page.module.scss";
import QuestionForm from "../components/QuestionForm/QuestionForm";

export default function FormPage() {
  const [questionForms, setQuestionForms] = useState<{ id: number }[]>([{ id: 0 }]);

  const handleAddQuestion = () => {
    setQuestionForms((prevForms) => [...prevForms, { id: prevForms.length }]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.components_container}>
        <Title />
        <Nav onAddQuestion={handleAddQuestion} />
        {questionForms.map((form) => (
          <QuestionForm key={form.id} id={form.id} />
        ))}
      </div>
    </div>
  );
}
