import React from "react";
import { Table } from "react-bootstrap";

const StudentTab = ({ students }) => {
  return (
    <>
      {students.length === 0 ? (
        <p className="fw-bold mt-2 text-center">There are no posts.</p>
      ) : (
        <>
          <Table striped bordered hover size="sm" className="mt-3">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.lastname}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p className="fw-bold mt-2 text-center">
            There are {students.length} student(s)
          </p>
        </>
      )}
    </>
  );
};

export default StudentTab;
