import { useEffect, useState, useRef } from "react";
import searchIcon from "../../assets/icon/search2.svg";
import styles from "./searchBar.module.scss";
import clsx from "clsx";

const SearchBar = ({ handleCityNameChange, fetchCountryPosition }) => {
    const [openAccordion, setOpenAccordion] = useState(false);
    const cityRef = useRef(null);

    // debounce 每3秒才call api
    let debounceTimer;
    useEffect(() => {
        if (cityRef.current.value) {
            clearTimeout(debounceTimer);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            debounceTimer = setTimeout(() => {
                fetchCountryPosition(cityRef.current.value);
            }, 3000);
        }
    }, [fetchCountryPosition, cityRef.current?.value]);

    return (
        <div className={styles.navContainer}>
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
                        ref={cityRef}
                        onChange={handleCityNameChange}
                        className={styles.input}
                        type="text"
                        placeholder="Enter country name"
                    ></input>
                    {/* <button onClick={fetchCountryPosition}>confirm</button> */}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
