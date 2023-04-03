import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";
import profile from "../../assets/me2.JPG";
import styles from "./AboutMe.module.css";
import { useNavigate } from "react-router-dom";

const Fade = require("react-reveal/Fade");

export default function AboutMe() {
  useTitle("Developer");
  useScrollToTop();
  const navigate = useNavigate();
  return (
    <>
      <Fade top duration={1000} distance="40px">
        <button onClick={() => navigate("/")} className="flex justify-center items-center gap-1 cursor-pointer btn btn-sm mx-auto glass rounded-xl text-black text-md absolute left-2 top-2 z-50"><i className="bx bx-arrow-back text-lg"></i>Back</button>
        <header className={`${styles.profile} ${styles.container}`}>
          <div className={`${styles.profile__container} ${styles.grid}`}>
            <div className={styles.profile__data}>
              <div
                className={`${styles.profile__border} border-[3px] border-primary`}
              >
                <div className={styles.profile__fill}>
                  <img src={profile} alt="" className={styles.profile__img} />
                </div>
              </div>

              <h2 className={styles.profile__name}>Toufiq Hasan Kiron</h2>
              <h3 className={styles.profile__profession}>
                MERN Stack developer
              </h3>

              <ul className={styles.profile__social}>
                <a
                  href="https://github.com/kiron0"
                  className={`${styles.profile__social_link} hover:text-primary`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bx bxl-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/toufiq-hasan-kiron/"
                  className={`${styles.profile__social_link} hover:text-primary`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bx bxl-linkedin"></i>
                </a>
                <a
                  href="https://facebook.com/toufiqhasankiron"
                  className={`${styles.profile__social_link} hover:text-primary`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bx bxl-facebook-circle"></i>
                </a>
              </ul>
            </div>

            <div className={`${styles.profile__info} ${styles.grid}`}>
              <div className={styles.profile__info_group}>
                <h3 className={styles.profile__info_number}>1.4+</h3>
                <p className={styles.profile__info_description}>
                  Years of <br /> work
                </p>
              </div>
              <div className={styles.profile__info_group}>
                <h3 className={styles.profile__info_number}>15+</h3>
                <p className={styles.profile__info_description}>
                  Completed <br /> projects
                </p>
              </div>
              <div className={styles.profile__info_group}>
                <h3 className={styles.profile__info_number}>10+</h3>
                <p className={styles.profile__info_description}>
                  Stars on <br /> GitHub
                </p>
              </div>
            </div>

            <div className={styles.profile__buttons}>
              <a
                href="https://drive.google.com/file/d/17g3kKlWFF9Msi4JjMZEMLkHGYNR0eeb3/view?usp=share_link"
                className={`${styles.button} bg-primary hover:bg-primary-dark`}
                target="_blank"
                rel="noreferrer"
              >
                Download CV{" "}
                <svg
                  className={styles.button__icon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.25 22.7502H9.25C3.82 22.7502 1.5 20.4302 1.5 15.0002V9.00024C1.5 3.57024 3.82 1.25024 9.25 1.25024H14.25C14.66 1.25024 15 1.59024 15 2.00024C15 2.41024 14.66 2.75024 14.25 2.75024H9.25C4.64 2.75024 3 4.39024 3 9.00024V15.0002C3 19.6102 4.64 21.2502 9.25 21.2502H15.25C19.86 21.2502 21.5 19.6102 21.5 15.0002V10.0002C21.5 9.59024 21.84 9.25024 22.25 9.25024C22.66 9.25024 23 9.59024 23 10.0002V15.0002C23 20.4302 20.68 22.7502 15.25 22.7502Z"
                    fill="var(--button-color)"
                  ></path>
                  <path
                    d="M22.25 10.7502H18.25C14.83 10.7502 13.5 9.42023 13.5 6.00023V2.00023C13.5 1.70023 13.68 1.42023 13.96 1.31023C14.24 1.19023 14.56 1.26023 14.78 1.47023L22.78 9.47023C22.99 9.68023 23.06 10.0102 22.94 10.2902C22.82 10.5702 22.55 10.7502 22.25 10.7502ZM15 3.81023V6.00023C15 8.58023 15.67 9.25023 18.25 9.25023H20.44L15 3.81023Z"
                    fill="var(--button-color)"
                  ></path>
                  <path
                    d="M13.25 13.7502H7.25C6.84 13.7502 6.5 13.4102 6.5 13.0002C6.5 12.5902 6.84 12.2502 7.25 12.2502H13.25C13.66 12.2502 14 12.5902 14 13.0002C14 13.4102 13.66 13.7502 13.25 13.7502Z"
                    fill="var(--button-color)"
                  ></path>
                  <path
                    d="M11.25 17.7502H7.25C6.84 17.7502 6.5 17.4102 6.5 17.0002C6.5 16.5902 6.84 16.2502 7.25 16.2502H11.25C11.66 16.2502 12 16.5902 12 17.0002C12 17.4102 11.66 17.7502 11.25 17.7502Z"
                    fill="var(--button-color)"
                  ></path>
                </svg>
              </a>

              <div className={styles.profile__buttons_small}>
                <a
                  href="https://api.whatsapp.com/send?phone=+8801855535091&text=Hey, What's upp buddy!"
                  className={`${styles.button} ${styles.button__small} ${styles.button__gray}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bx bxl-whatsapp"></i>
                </a>

                <a
                  href="https://m.me/toufiqhasankiron"
                  className={`${styles.button} ${styles.button__small} ${styles.button__gray}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bx bxl-messenger"></i>
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className={`${styles.skills__content} ${styles.grid} py-10`}>
          <div className={styles.skills__area}>
            <h3 className={styles.skills__title}>Frontend Developer</h3>

            <div className={styles.skills__box}>
              <div className={styles.skills__group}>
                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>HTML</h3>
                    <span className={styles.skills__level}>Basic</span>
                  </div>
                </div>

                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>CSS</h3>
                    <span className={styles.skills__level}>Advanced</span>
                  </div>
                </div>

                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>JavaScript</h3>
                    <span className={styles.skills__level}>Intermediate</span>
                  </div>
                </div>
              </div>

              <div className={styles.skills__group}>
                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>React</h3>
                    <span className={styles.skills__level}>Intermediate</span>
                  </div>
                </div>

                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>Bootstrap</h3>
                    <span className={styles.skills__level}>Intermediate</span>
                  </div>
                </div>

                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>Git</h3>
                    <span className={styles.skills__level}>Intermediate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.skills__area}>
            <h3 className={styles.skills__title}>Backend Developer</h3>

            <div className={styles.skills__box}>
              <div className={styles.skills__group}>
                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>MongoDB</h3>
                    <span className={styles.skills__level}>Intermediate</span>
                  </div>
                </div>

                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>MySQL</h3>
                    <span className={styles.skills__level}>Basic</span>
                  </div>
                </div>

                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>Firebase</h3>
                    <span className={styles.skills__level}>Intermediate</span>
                  </div>
                </div>
              </div>
              <div className={styles.skills__group}>
                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>Python</h3>
                    <span className={styles.skills__level}>Basic</span>
                  </div>
                </div>

                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>Node Js</h3>
                    <span className={styles.skills__level}>Intermediate</span>
                  </div>
                </div>

                <div className={styles.skills__data}>
                  <i className="bx bx-check-circle text-primary"></i>
                  <div>
                    <h3 className={styles.skills__name}>Express JS</h3>
                    <span className={styles.skills__level}>Intermediate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}
