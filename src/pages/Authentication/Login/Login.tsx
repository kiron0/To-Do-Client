import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import useToken from "../../../hooks/useToken";
import auth from "../../../auth/Firebase/firebase.init";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { BiHomeHeart } from "react-icons/bi";

const Login = () => {
  useScrollToTop();
  useTitle("Login");
  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
  const [token] = useToken(gUser);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      toast.success(`Welcome to K Task ToDo, ${auth?.currentUser?.displayName}`);
    }
  }, [token, navigate, from]);

  if (gLoading) {
    return <Loading />;
  }

  if (token) {
    navigate(from, { replace: true });
  }

  return (
    <div className="flex justify-center items-center h-screen px-4 lg:px-12 bg-base-100">
      <div className="card w-full max-w-md">
        <div className="card-body">
          <h2 className="text-center text-4xl font-bold pb-6">Login</h2>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline border-primary flex items-center justify-center rounded-full hover:bg-primary hover:border-primary duration-500 gap-2 hover:text-white"
          >
            <i className="bx bxl-google text-2xl"></i>Continue with Google
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline border-primary mt-6 flex items-center justify-center rounded-full hover:bg-primary hover:border-primary duration-500 gap-2 hover:text-white"
          >
            <BiHomeHeart className="text-2xl" /> Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
