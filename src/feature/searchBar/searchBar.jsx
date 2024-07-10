import { useEffect, useState } from "react";
import searchIcon from "../../assets/icon/search2.svg";
import styles from "./searchBar.module.scss";
import clsx from "clsx";

const SearchBar = ({ handleCountryChange, fetchCountryPosition }) => {
    const [openAccordion, setOpenAccordion] = useState(false);
    useEffect(() => {
        if (openAccordion === false) {
            fetchCountryPosition();
        }
    }, [fetchCountryPosition, openAccordion]);

    return (
        <div className={styles.nav}>
            <div
                onClick={() => {
                    setOpenAccordion((prev) => !prev);
                }}
                className={styles.iconContainer}
            >
                <img className={styles.icon} src={searchIcon} alt="search" />
            </div>
            <div
                className={clsx(styles.searchContainer, {
                    [styles.open]: openAccordion,
                })}
            >
                <div className={styles.inputArea}>
                    <input
                        type="text"
                        onChange={handleCountryChange}
                        placeholder="Enter country name"
                    ></input>
                    {/* <button onClick={fetchCountryPosition}>confirm</button> */}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
