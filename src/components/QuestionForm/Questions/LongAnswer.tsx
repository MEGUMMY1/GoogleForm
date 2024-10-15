import styles from "./Questions.module.scss";

export default function LongAnswer() {
  return <input className={styles.longanswer} readOnly placeholder="장문형 텍스트" />;
}
