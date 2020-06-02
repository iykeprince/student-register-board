import React, { useEffect, useState, Fragment } from "react";

import axios from "axios";
import StudentList from "../students/StudentList";
import Spinner from "../Spinner";

const Teacher = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        setLoading(true);
        const student = await axios.get("/api/students", {
            headers: { "Content-Type": "application/json" }
        });

        setStudents(student.data);
        setLoading(false);
    };
    const refreshCallback = () => {
        console.log('refreshed called');
        getStudents();
    }
    return (
        loading ? <Spinner /> : (
        <div style={{ marginTop: "20px" }}>
            <div>
                <section>
                    <div className="d-flex justify-content-between">
                        <h3>Student Registered</h3>

                        <a className="btn btn-primary" href="/add-student">
                            Add New Student <i className="fa fa-plus"></i>
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <StudentList students={students} refreshCallback={refreshCallback} />
                        </div>
                    </div>

                    <div id="sub-footer">
                        <ul className="list-group">
                            <li className="list-group-item">
                                Total Number of Student:{" "}
                                <strong>{students.length}</strong>
                            </li>
                        </ul>
                    </div>
                </section>

                <div className="footer pt-4 pb-4">
                    Student Register &copy; {new Date().getFullYear()}
                </div>
            </div>
        </div>)
    );
};

export default Teacher;
