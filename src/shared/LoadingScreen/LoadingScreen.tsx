import React from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loader}>
        <div className={styles.loader_item}></div>
        <div className={styles.loader_item}></div>
        <div className={styles.loader_item}></div>
      </div>
    </div>
  );
}
