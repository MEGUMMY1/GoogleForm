import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import eye_icon from "../../assets/eye_icon.svg";
import close_icon from "../../assets/close.svg";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePreview = () => {
    navigate("/preview");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      {location.pathname === "/" ? (
        <img
          src={eye_icon}
          className={styles.eye_icon}
          alt="미리보기"
          onClick={handlePreview}
          role="button"
        />
      ) : (
        <img
          src={close_icon}
          className={styles.close_icon}
          alt="뒤로가기"
          onClick={handleBack}
          role="button"
        />
      )}
    </div>
  );
}
