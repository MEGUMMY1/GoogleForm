import Nav from "../components/Nav/Nav";
import Title from "../components/Title/Title";
import styles from "./Page.module.scss";

export default function FormPage() {
  return (
    <div className={styles.container}>
      <div className={styles.components_container}>
        <Title />
        <Nav />
      </div>
    </div>
  );
}
