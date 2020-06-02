import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import axios from 'axios';

const ViewStudent = (props) => {
   
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = async () => {
        try {
            setLoading(true);
            const id = props.match.params.id;
            const url = `/api/students/${id}`;
            console.log('url', url);
            const student = await axios.get(url, {
                headers: { "Content-Type": "application/json" }
            });

            setStudent(student.data);
            setLoading(false);
        } catch (e) {
            console.log(e.response);
            setError(e.response.data.message);
        }
    };
    return (loading ) ? (
        <Spinner />
    ) : (
        <div className="card">
            <div className="card-header">
                <div className="d-flex">
                    <a href="/" className="btn btn-default">
                    <i className="fa fa-long-arrow-left" aria-hidden="true"></i>

                    </a>
                    <h3 className="card-title">#{student.id}</h3>
                </div>
            </div>
            <div className="card-body">
                <p className="lead">Fullname: <strong>{student.name}</strong></p>
                <p>Level: <strong>{student.level}</strong></p>
                <p><span className="mute-text">No. of times present:</span> <strong>{student.presents}</strong></p>
                <p>No. of times absent: <strong>{student.absences}</strong></p>
            </div>
        </div>
    );
};

export default ViewStudent;
