import { useState, useEffect } from "react";
import auth from "../auth/Firebase/firebase.init";
import { BASE_API } from "../config";

const useProfileImage = (user: any) => {
  const [image, setImage] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${BASE_API}/users?uid=${auth?.currentUser?.uid}`
      );
      const data = await result.json();
      setImage(data[0]?.image);
      setImageLoading(false);
    };
    fetchData();
  }, [user, image]);

  return [image, imageLoading];
};

export default useProfileImage;
