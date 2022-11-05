import { useEffect, useState } from "react";
import auth from "../components/Pages/Login/Firebase/firebase.init";
import { BASE_API } from "../config";

const useCompletedToDos = () => {
  const [completedToDos, setCompletedToDos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetch(
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
    })();
  }, [completedToDos]);
  return { completedToDos, loading };
};

export default useCompletedToDos;
