import React from "react";
import styles from "./date.module.scss";
import dateIcon from "../../assets/icon/date.svg";
import useDate from "./useDate";
import PureLoader from "../../components/loader/pureLoader";

const Date = () => {
    const { date, dateLoading } = useDate();
    if (dateLoading) {
        return <PureLoader />;
    }
    return (
        <>
            <p className={styles.iconSubTitle}>date</p>
            <div className={styles.dateGroup}>
                <img className={styles.dateIcon} src={dateIcon} alt="date" />
                <p className={styles.date}>{date}</p>
            </div>
        </>
    );
};

export default Date;
