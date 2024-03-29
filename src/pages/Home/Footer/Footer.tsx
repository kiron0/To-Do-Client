import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { InitializeContext } from "../../../App";
import auth from "../../../auth/Firebase/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const Footer = () => {
  const { appName } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  return (
    <div
      style={{ clipPath: `ellipse(90% 100% at 51.45% 100%)` }}
      className="mt-16 md:mt-0"
    >
      <footer className="footer footer-center p-10 bg-primary text-white rounded">
        <div className="grid grid-flow-col gap-4">
          <Link to="/dev" className="link link-hover">
            About me
          </Link>
          <Link to="/contactUs" className="link link-hover">
            Contact us
          </Link>
          {
            user && (
              <Link to="/toDoS" className="link link-hover">
                Add ToDo
              </Link>
            )
          }
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.facebook.com/toufiqhasankiron"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-facebook-circle text-2xl md:text-3xl"></i>
            </a>
            <a
              href="https://linkedin.com/in/toufiq-hasan-kiron"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-linkedin text-2xl md:text-3xl"></i>
            </a>
            <a
              href="https://www.github.com/kiron0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bx bxl-github text-2xl md:text-3xl"></i>
            </a>
          </div>
        </div>
        <div>
          <p>
            Copyright &copy; {new Date().getFullYear()} - All rights reserved.
          </p>
          <p>
            <a href="/">{appName}</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
