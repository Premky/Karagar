import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const [editing, setEditing] = useState(false);
    const [empId, setEmpId] = useState('');
    const [ranks, setRanks] = useState([]);

    const fetchRank = async () => {
        try {
            const result = await axios.get(`${BASE_URL}/display/ranks`)
            if (result.data.Status) {
                setRanks(result.data.Result)
                console.log(ranks)
            }else{
                alert(result.data.Result)
                console.error(result.data.Result)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleEmpIdChange = (event) => {
        setEmpId(event.target.value);
    };
    useEffect(()=>{
        fetchRank();
    },[BASE_URL])

    return (
        <div className="container-fluid m-0 p-0">
            <div className="row flex-nowrap">
                <div className="p-2 justify-content shadow text-center">
                    <h4>{editing ? 'Edit Employee' : 'Add Employee'}</h4>

                    <div className="d-flex flex-column px-0 pt-0 min-vh-100">
                        <form className="row g-10 m-2">
                            <div className="row">
                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="emp_id">कर्मचारी संकेत नं.</label>
                                    <input
                                        type="text"
                                        name="emp_id"
                                        placeholder="कर्मचारी संकेत नं."
                                        className="form-control rounded-0"
                                        value=''

                                    />
                                </div>

                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="name_np">नामथर (नेपालीमा)</label>
                                    <input
                                        type="text"
                                        name="name_np"
                                        placeholder="नाम नेपालीमा"
                                        className="form-control rounded-0"
                                        value=''
                                    />
                                </div>

                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="name">नामथर (अंग्रेजी)</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name (In English)"
                                        className="form-control rounded-0"
                                        value=''
                                    />
                                </div>

                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="gender">लिङ्ग</label>
                                    <select
                                        className='form-control rounded-0'
                                    >
                                        <option value="M">पुरुष</option>
                                        <option value="F">महिला</option>
                                        <option value="O">अन्य</option>
                                    </select>
                                </div>

                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="rank">पद</label>
                                    <select
                                        className='form-control rounded-0'>
                                            {
                                                ranks.map((n, index)=>(
                                                    <option value={n.id}>{n.rank_np_name}</option>            
                                                ))
                                            }
                                    </select>
                                </div>

                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="merit_no">वरीयता</label>
                                    <input
                                        type="number"
                                        name="merit_no"
                                        placeholder="वरीयता"
                                        className="form-control rounded-0"
                                        value=''
                                    />
                                </div>

                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="contact">सम्पर्क</label>
                                    <input
                                        type="text"
                                        name="contact"
                                        placeholder="सम्पर्क नं."
                                        className="form-control rounded-0"
                                        value=''
                                    />
                                </div>

                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="email">इमेल</label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control rounded-0"
                                        value=''
                                    />
                                </div>

                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <label htmlFor="photo">फोटो</label>
                                    <input
                                        type="file"
                                        name="photo"
                                        placeholder="Photo"
                                        className="form-control rounded-0"
                                        value=''
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <button className='btn btn-primary'> Save</button>
                                </div>
                                <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                    <button className='btn btn-warning'>Clear</button>
                                </div>
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
