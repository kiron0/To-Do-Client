import React, { useContext } from "react";
import { InitializeContext } from "../../App";
import { themeOptions } from "./data";
import styles from "./ThemeChanger.module.css";

export default function ThemeChanger() {
  const { theme, setTheme } = useContext(InitializeContext);

  // for form onSubmit
  // const handleThemeChange = (e) => {
  //   e.preventDefault();
  //   setTheme(e.target.theme.value);
  // };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    window.localStorage.setItem("theme", e.target.value);
  };

  return (
    <div>
      {/* The button to open modal */}
      <label
        htmlFor="themeChanger"
        className="btn btn-sm btn-primary rounded-full h-8 w-8 absolute right-1 top-1/3"
      >
        <i className={`bx bx-cog text-lg text-white ${styles.themeBtn}`}></i>
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="themeChanger" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-lg font-bold flex items-center gap-1">
            <i className={`bx bx-cog text-lg ${styles.themeBtn}`}></i>Choose
            your theme from here
          </h3>
          {/* <form onSubmit={handleThemeChange}> */}
          <div className="name border rounded p-3 relative mt-10">
            <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
              <h3 className="text-xs font-poppins">Theme Chooser</h3>
            </div>
            <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 max-w-md overflow-hidden">
              <div className="icon">
                <i className="bx bxs-hot text-red-500"></i>
              </div>
              <select
                className="select w-full max-w-sm md:ml-2"
                name="theme"
                onChange={handleThemeChange}
                defaultValue={theme}
              >
                <option disabled selected>
                  Choose your theme
                </option>
                {themeOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-action">
            <label htmlFor="themeChanger" className="btn btn-warning">
              <i className="bx bx-x text-xl"></i> Close
            </label>

            {/* <button className="btn btn-success" type="submit">
                <i className={`bx bx-cog text-lg ${styles.themeBtn}`}></i>{" "}
                Selected
              </button> */}
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}