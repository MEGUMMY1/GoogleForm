import add_icon from "../../assets/add.svg";
import styles from "./Nav.module.scss";

export default function Nav() {
  return (
    <div className={styles.container}>
      <div className={styles.button_container}>
        <img src={add_icon} className={styles.add_icon} alt="질문 추가" />
        <span className={styles.tooltip}>질문 추가</span>
      </div>
    </div>
  );
}
