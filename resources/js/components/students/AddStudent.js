import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [loading, setLoading ] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const res = await axios.post('/api/students', { name, level }, {headers: {'Content-Type': 'application/json'}});

            setLoading(false);
            setMessage(res.data.message);

            setName('');
            setLevel('');
        }catch(e){
            setLoading(false);
            setError(e.response.data.message);
            console.log(e.response.data.message);
        }
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <div className="d-flex">
                    <a href="/" className="btn btn-default">
                    <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                    </a>
                    <h2>Add Student</h2>
                </div>
                {(!loading && message) && (
                    <div className="alert alert-success">{message}</div>
                ) }
                {(!loading && error) && (
                    <div className="alert alert-danger">{error}</div>
                ) }
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='Name'>Name</label>
                        <input type="text" name="name" className="form-control" value={name} onChange={e => setName(e.target.value) } />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='Email'>Level</label>
                        <select onChange={e => setLevel(e.target.value) } value={level} className="form-control" >
                            <option></option>
                            <option>CLASS 1</option>
                            <option>CLASS 2</option>
                            <option>CLASS 3</option>
                        </select>
                    </div>

                    <div>
                        <button className="btn btn-primary">{loading ? 'Please wait' : 'Save Student'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudent
