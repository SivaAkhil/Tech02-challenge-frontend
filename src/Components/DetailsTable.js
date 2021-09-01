import "./detailstable.css";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";

const DetailsTable = (props) => {
  const { firstName, lastName, email, phone, role, _id } = props.data;

  const Userrole = useSelector((state) => state.auth.userData.role);

  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{lastName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{email}</td>
          </tr>
          <tr>
            <th>Phone No</th>
            <td>{phone}</td>
          </tr>
        </tbody>
      </table>
      {role === "user" && Userrole === "admin" && (
        <div className="delete-btn-container">
          <div onClick={() => props.handleDelete(_id)}>
            <Button name={"Delete User"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsTable;
