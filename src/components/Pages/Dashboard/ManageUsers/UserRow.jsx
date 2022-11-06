import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { InitializeContext } from "../../../../App";
import { BASE_API } from "../../../../config";
import auth from "../../Login/Firebase/firebase.init";

const UserRow = ({ user, index, refetch }) => {
  const { theme } = useContext(InitializeContext);
  const { _id, email, role, uid, image, displayName } = user;

  /* Handle Delete User */
  const handleUserDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: theme ? "#333" : "#fff",
      color: theme ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        fetch(`${BASE_API}/user/${email}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount) {
              toast.success(`${email} is deleted.`);
              refetch();
            }
          });
      }
    });
  };

  const makeAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!",
    }).then((willAdmin) => {
      if (willAdmin.isConfirmed) {
        fetch(`${BASE_API}/user/admin`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(user),
        })
          .then((res) => {
            if (res.status === 403) {
              toast.error("Failed to Make an admin");
            }
            return res.json();
          })
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              toast.success(`${email} is an admin now.`);
            }
          });
      }
    });
  };
  const removeAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((willAdmin) => {
      if (willAdmin.isConfirmed) {
        fetch(`${BASE_API}/user/removeAdmin`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(user),
        })
          .then((res) => {
            if (res.status === 403) {
              toast.error("Failed to Remove an admin");
            }
            return res.json();
          })
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              toast.success(`${email} is an user now.`);
            }
          });
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        {image ? (
          <img
            src={image}
            alt=""
            width={60}
            className="rounded shadow-sm bg-base-300 border p-1"
          />
        ) : (
          <img
            src="https://placeimg.com/80/80/people"
            alt=""
            width={60}
            className="rounded shadow-sm bg-base-300 border p-1"
          />
        )}
      </td>
      <td>{displayName ? displayName : "Not Available"}</td>
      {/* <td>{uid ? uid : "Not Available"}</td> */}
      <td>{email}</td>
      <td>
        {role === "admin" ? (
          ""
        ) : (
          <button onClick={makeAdmin} className="btn btn-xs text-white">
            Make Admin
          </button>
        )}
      </td>
      <td>
        {role === "admin" ? (
          <button
            onClick={removeAdmin}
            className="btn btn-xs btn-error text-white"
          >
            Remove Admin
          </button>
        ) : (
          ""
        )}
      </td>
      <td>
        {role === "admin" ? (
          <span className="badge bg-primary text-white border-primary">
            Admin
          </span>
        ) : (
          <span className="badge badge-success text-white">User</span>
        )}
      </td>
      <td>
        {auth?.currentUser?.uid === uid ? (
          <span className="badge bg-green-500 border-green-500 text-white">
            Active{" "}
          </span>
        ) : (
          ""
        )}
      </td>
      <td className="tooltip tooltip-error" data-tip="Delete user data!">
        <button
          onClick={() => handleUserDelete(_id)}
          className="btn btn-sm btn-error text-white"
        >
          <i className="bx bxs-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
