import React, { useState } from "react";
import Student from "./Student";
import axios from "axios";

const StudentList = ({ students, refreshCallback }) => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [markLoading, setMarkLoading] = useState(false);
    const [error, setError] = useState("");

    const markPresents = async () => {
        
        try {

            // const presents = data.length;
            // const absences = students.length - presents;
            setMarkLoading(true);
            const updateRes = await axios.post(
                "/api/students/updateRegister",
                { ids: data, absent: false, present: true },
                { headers: { "Content-Type": "application/json" } }
            );

            setMessage(updateRes.data);
            setMarkLoading(false);
            refreshCallback();
        } catch (e) {
            setError(e.response.data.message);
            setMarkLoading(false);
        }
    };
    const markAbsences = async () => {
        // const absences = data.length;
        // const presents = students.length - absences;

        try {
            setMarkLoading(true);
            const updateRes = await axios.post(
                "/api/students/updateRegister",
                { ids: data, absent: true, present: false },
                { headers: { "Content-Type": "application/json" } }
            );

            setMessage(updateRes.data);
            setMarkLoading(false);
            refreshCallback();
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    const onChildCallback = id => {
        const ids = [...data, id];
        console.log('ids on callback', ids);
        setData(ids);
    };

    return (
        <div style={{width: '100%', borderColor: '#000', borderWidth: '1px'}}>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th><i className="fa fa-square"></i></th>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Presents</th>
                        <th>Absence</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <Student
                        students={students}
                        onChildCallback={onChildCallback}
                    />
                </tbody>
            </table>
            <div className="d-flex justify-content-end mb-1 mt-1">
                <button className="btn btn-success mr-1" onClick={markPresents}>
                    Mark Presents <i className="fa fa-check"></i>
                </button>
                <button className="btn btn-danger" onClick={markAbsences}>
                    Mark Absence <i className="fa fa-times"></i>
                </button>
            </div>
            {markLoading && <i className="fa fa-spin fa-spinner"></i> }
        </div>
    );
};

export default StudentList;
