import styles from "./SideBar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";


function SideBar({ Linkvalue }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <aside className={styles.sidebar}>
      {Linkvalue.map((menu) => (
        <div key={menu.id}>
          
         
          {menu.children && menu.children.length > 0 ? (
            <>
              <div
                className={styles.item}
                onClick={() => toggleMenu(menu.id)}
              >
                {menu.label}
              </div>

             
              {openMenuId === menu.id && (
                <div className={styles.subMenu}>
                  {menu.children.map((child) => (
                    <Link
                      key={child.id}
                      to={child.path}
                      className={styles.item}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link to={menu.path} className={styles.item}>
              {menu.label}
            </Link>
          )}
        </div>
      ))}
    </aside>
  );
}



export default SideBar;