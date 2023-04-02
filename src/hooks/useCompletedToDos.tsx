import { useEffect, useState } from "react";
import auth from "../auth/Firebase/firebase.init";
import { BASE_API } from "../config";

const useCompletedToDos = () => {
  const [completedToDos, setCompletedToDos] = useState([] as any);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${BASE_API}/myToDoS/completed?email=${auth?.currentUser?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setCompletedToDos(result);
        setLoading(false);
      });
  }, [completedToDos]);
  return { completedToDos, loading };
};

export default useCompletedToDos;
