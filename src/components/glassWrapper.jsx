import React from "react";
import styles from "./glassWrapper.module.scss";

const GlassWrapper = ({ children }) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default GlassWrapper;
