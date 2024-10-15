import styles from "./Questions.module.scss";

export default function ShortAnswer() {
  return <input className={styles.shortanswer} readOnly placeholder="단답형 텍스트" />;
}
