import React from "react";
import Moment from "react-moment";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteEducation } from "../../redux/actions/profileAction";
import { RingSpinner } from "react-spinners-kit";

const Education = ({ education }) => {
  const dispatch = useDispatch();

  const deleteEducationUser = useSelector((state) => state.deleteEducation);
  const { loading, success, error } = deleteEducationUser;
  const onDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteEducation(id));
    }
  };
  const Education = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <Button onClick={() => onDelete(edu._id)} className="btn btn-danger">
          {/* <RingSpinner size={20} color="#fff" /> */}
          {loading[edu._id] ? <RingSpinner size={20} color="#fff" /> : "Delete"}
        </Button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
          {Education}
        </thead>
      </table>
    </div>
  );
};

export default Education;
