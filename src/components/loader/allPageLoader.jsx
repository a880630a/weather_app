import React from "react";
import styles from "./allPageLoader.module.scss";

const AllPageLoader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default AllPageLoader;
