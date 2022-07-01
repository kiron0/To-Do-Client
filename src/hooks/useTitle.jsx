import { useEffect, useState } from "react";

const useTitle = (titleText) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    document.title = titleText + " - K Task To Do";
    setTitle(titleText);
  }, [titleText]);
  return [title];
};

export default useTitle;
