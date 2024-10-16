import add_icon from "../../assets/add.svg";
import styles from "./Nav.module.scss";
import { NavProps } from "./Nav.types";

export default function Nav({ onAddQuestion }: NavProps) {
  return (
    <div className={styles.container}>
      <div className={styles.button_container} onClick={onAddQuestion}>
        <img src={add_icon} className={styles.add_icon} alt="질문 추가" />
        <span className={styles.tooltip}>질문 추가</span>
      </div>
    </div>
  );
}
