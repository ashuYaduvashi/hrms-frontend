import styles from "./Dashboard.module.css";

const Dashboard = ({ divContent }) => {
  return (
    <div className={styles.dashboard}>
      {divContent.map((item) => (
        <div className={styles.card} key={item.id}>
          <div className={styles.cardIcon}>{item.icon}</div>
          <h3 className={styles.cardTitle}>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;