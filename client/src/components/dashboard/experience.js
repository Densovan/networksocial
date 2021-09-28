import React from "react";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../redux/actions/profileAction";

const Experience = ({ experience }) => {
  const dispatch = useDispatch();

  const onDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteExperience(id));
    }
  };

  const Experience = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <Button onClick={() => onDelete(exp._id)} className="btn btn-danger">
          Delete
        </Button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
          {Experience}
        </thead>
      </table>
    </div>
  );
};

export default Experience;
