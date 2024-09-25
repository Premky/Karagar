import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const [editing, setEditing] = useState(false);
    const [empId, setEmpId] = useState('');

    const fetchRank=async()=>{
        try{
            const result =await axios.get(`${BASE_URL}/display/ranks`)
            
        } catch(err){
            console.log(err);
        }
    }

    const handleEmpIdChange = (event) => {
        setEmpId(event.target.value);
    };

    return (
        <div className="container-fluid m-0 p-0">
            <div className="row flex-nowrap">
                <div className="p-2 justify-content shadow text-center">
                    <h4>{editing ? 'Edit Employee' : 'Add Employee'}</h4>
                
                <div className="d-flex flex-column px-0 pt-0 min-vh-100">
                    <form className="row g-10 m-2">
                        <div className="col-xl-3 col-md-6 col-sm-12">
                            <label htmlFor="emp_id">कर्मचारी संकेत नं.</label>
                            <input
                                type="text"
                                name="emp_id"
                                placeholder="कर्मचारी संकेत नं."
                                className="form-control rounded-0"
                                value=''
                                
                            />
                        </div>

                        <div className="col-xl-3 col-md-6 col-sm-12">
                            <label htmlFor="emp_id">नामथर (नेपालीमा)</label>
                            <input
                                type="text"
                                name="name_np"
                                placeholder="नाम नेपालीमा"
                                className="form-control rounded-0"
                                value=''                                
                            />
                        </div>
                    </form>
                </div>

            </div>
            </div>
        </div>
    );
};

Employee.propTypes = {
    // Define props if needed
};

export default Employee;
