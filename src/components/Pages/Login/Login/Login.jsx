import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import useToken from "../../../../hooks/useToken";
import auth from "../Firebase/firebase.init";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading] = useSignInWithGoogle(auth);
  const [token] = useToken(gUser);
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      toast.success(`Welcome Back, ${auth?.currentUser?.displayName}`, {
        autoClose: 4000,
      });
    }
  }, [token, navigate, from]);

  if (gLoading) {
    return <Loading></Loading>;
  }

  if (token) {
    navigate(from, { replace: true });
  }

  return (
    <div className="bg-base-100 lg:h-screen py-36">
      <div className="flex h-96 justify-center items-center px-4 lg:px-12">
        <div className="card w-full max-w-md bg-base-100">
          <div className="card-body">
            <h2 className="text-center text-4xl font-bold pb-10">Login</h2>
            <button
              onClick={() => signInWithGoogle()}
              className="btn btn-outline border-primary flex items-center content-center rounded-full hover:btn-primary"
            >
              <FcGoogle className="text-2xl mr-2"></FcGoogle>Continue with
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
