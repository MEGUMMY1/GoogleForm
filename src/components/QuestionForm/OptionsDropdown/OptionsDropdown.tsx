import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "./OptionsDropdown.module.scss";
import top_arrow from "../../../assets/dropdown_top.png";
import down_arrow from "../../../assets/dropdown_down.png";
import option_icon_1 from "../../../assets/dropdown1.png";
import option_icon_2 from "../../../assets/dropdown2.png";
import option_icon_3 from "../../../assets/dropdown3.png";
import option_icon_4 from "../../../assets/dropdown4.png";
import option_icon_5 from "../../../assets/dropdown5.png";
import { setQuestionType } from "../../../redux/formSlice";

const options = [
  { label: "단답형", icon: option_icon_1 },
  { label: "장문형", icon: option_icon_2 },
  { label: "객관식 질문", icon: option_icon_3 },
  { label: "체크박스", icon: option_icon_4 },
  { label: "드롭다운", icon: option_icon_5 },
];

export default function OptionsDropdown() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState(options[0].label);
  const [selectedOptionIcon, setSelectedOptionIcon] = useState(options[0].icon);

  const handleOptionClick = (optionLabel: string, optionIcon: string) => {
    setSelectedOption(optionLabel);
    setSelectedOptionIcon(optionIcon);
    dispatch(setQuestionType(optionLabel));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <div className={styles.option_container}>
          <img src={selectedOptionIcon} className={styles.option_icon} width={30} height={30} />
          <span className={styles.selected}>{selectedOption}</span>
        </div>
        <img
          src={isOpen ? top_arrow : down_arrow}
          className={styles.dropdown_icon}
          width={15}
          height={15}
          alt="option icon"
        />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map(({ label, icon }) => (
            <li
              key={label}
              className={styles.option}
              onClick={() => handleOptionClick(label, icon)}
            >
              <img
                src={icon}
                className={styles.option_icon}
                width={30}
                height={30}
                alt={`${label} icon`}
              />
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
