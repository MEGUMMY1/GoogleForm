import { useDispatch, useSelector } from "react-redux";
import { setTitle, setSubtitle } from "../../redux/formSlice";
import { RootState } from "../../redux/store";
import styles from "./Title.module.scss";

export default function Title() {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.form.title);
  const subtitle = useSelector((state: RootState) => state.form.subtitle);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value));
  };

  const handleSubtitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSubtitle(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar} />
      <div className={styles.input_container}>
        <input
          className={styles.title}
          placeholder="설문지 제목"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          className={styles.subtitle}
          placeholder="설문지 설명"
          value={subtitle}
          onChange={handleSubtitleChange}
        />
      </div>
    </div>
  );
}
