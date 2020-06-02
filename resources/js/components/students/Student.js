import React from "react";

const Student = ({ students, onChildCallback }) => {
    const onChange = (e) => {
        onChildCallback(e.target.value);
    }

    return students.map(student => (
        <tr key={student.id}>
            <td scope="row">{student.id}
            </td>
            <td>
                <input type="checkbox" value={student.id} onChange={onChange}/>
            </td>
            <td>{student.name}</td>
            <td>{student.level}</td>
            <td>{student.presents}</td>
            <td>{student.absences}</td>
            <td className="actions">
                <a href={"/view-student/"+student.id}>View</a>
            </td>
        </tr>
    ));
};

export default Student;
