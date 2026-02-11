import styles from "./Header.module.css";
import { FaCalendarAlt, FaClock, FaUserCircle } from "react-icons/fa";

const Header = ({ source, title, date, time, options }) => {
  return (
    <header className={styles.header}>
      
      <div className={styles.left}>
        <img src={source} alt="Logo" className={styles.logo} />
        <span className={styles.title}>{title}</span>
      </div>

      
      <div className={styles.right}>
        <div className={`${styles.infoBox} ${styles.calendar}`}>
          <FaCalendarAlt />
          <span>{date}</span>
        </div>

        <div className={`${styles.infoBox} ${styles.clock}`}>
          <FaClock />
          <span>{time}</span>
        </div>

        <div className={styles.userBox}>
          <FaUserCircle />
          <select className={styles.userSelect}>
            {options.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
