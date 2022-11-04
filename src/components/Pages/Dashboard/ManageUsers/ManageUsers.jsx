import React from "react";
import { useQuery } from "react-query";
import { BASE_API } from "../../../../config";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import Loading from "../../Shared/Loading/Loading";
import UserRow from "./UserRow";

const ManageUsers = () => {
  useScrollToTop();
  useTitle("Manage All Users");
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`${BASE_API}/users/all`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading || !users || !users.length) {
    return <Loading></Loading>;
  }
  return (
    <div className="lg:px-10 py-8 bg-base-100 h-screen rounded-md">
      <div className="title my-2 mb-10">
        <h3 className="text-2xl font-semibold">Manage Users</h3>
        <span>You can manage all the users whom are already registered</span>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-300">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Uid</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Remove Admin</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <UserRow
                index={index}
                key={user._id}
                user={user}
                refetch={refetch}
              ></UserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
