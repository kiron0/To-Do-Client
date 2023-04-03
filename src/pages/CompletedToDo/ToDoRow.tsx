import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";

type Props = {
  todo: any;
  loading: boolean;
};

const ToDoRow = ({ todo, loading }: Props) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="card w-100 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{todo?.title}</h2>
        <p>
          {todo?.description?.length > 100 && !showMore
            ? todo?.description?.slice(0, 100) + "..."
            : todo?.description}{" "}
          {todo?.description?.length > 100 && (
            <span
              onClick={() => setShowMore(!showMore)}
              className="text-primary cursor-pointer"
            >
              {showMore ? "Show Less" : "Show More"}
            </span>
          )}
        </p>
        {/* <div className="card-actions justify-end">
          <div className="badge badge-outline badge-success">Completed</div>
        </div> */}
        <div className="card-actions justify-end pt-4">
          Created By -{" "}
          <div
            className="badge badge-outline badge-primary tooltip tooltip-left tooltip-primary"
            data-tip={todo?.addedBy?.email}
          >
            {todo?.addedBy?.name}
          </div>
        </div>
        <div className="card-actions justify-end mt-1">
          Created at -{" "}
          <div className="badge badge-outline badge-success">
            {todo?.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoRow;
