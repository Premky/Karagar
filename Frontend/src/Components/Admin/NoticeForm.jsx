import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import NepaliDate from 'nepali-datetime';
import Icon from './../Icon'

const NoticeForm = () => {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const npToday = new NepaliDate();
    const formattedDateNp = npToday.format('YYYY-MM-DD');
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false); //For displaying loading state
    const [editing, setEditing] = useState(false);
    const [currentNotice, setCurrentNotice] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [fetchNotice, setFetchNotice] = useState([]);

    const fetchNotices = async () => {
        console.log('test')
        try {
            const result = await axios.get(
                `${BASE_URL}/display/notices`)
            if (result.data.Status) {
                setFetchNotice(result.data.Result)
                console.log(result.data.Result)
            } else {
                alert(result.data.Result)
                console.error(result.data.Result)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onFormSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));

            if (data.file && data.file.length > 0) {
                formData.append('file', data.file[0]);  // Correctly append the file
            }

            const url = editing ? `${BASE_URL}/auth/update_notice/${currentNotice.id}` : `${BASE_URL}/auth/add_notice`;
            const method = editing ? 'PUT' : 'POST';
            const result = await axios({
                method, url, data: formData, headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (result.data.Status) {
                alert(`Notice ${editing ? 'updated' : 'added'} successfully!`);
                reset();
                setEditing(false);
                setCurrentNotice(null);
                setFilePreview(null);
                fetchNotices();
            }
        } catch (err) {
            console.log('Submission error:', err);
            alert('Submission Error Occured. Please Try Again Later.');
        } finally {
            setLoading(false);
        }
    }

    const handleClear = () => {
        if (loading) {
            setLoading(false);
        } else {
            reset();
            setEditing(false);
            setCurrentNotice(null);
            setFilePreview(null);
            fetchNotices();
        }
    };

    const handleEdit = (notice) => {
        setCurrentNotice(notice);
        setEditing(true);
        setValue("date", notice.date);
        setValue("end_date", notice.end_date);
        setValue("title_np", notice.subject);
        setValue("is_popup", notice.is_popup);
        setValue("is_active", notice.is_active);
        setValue("file", notice.file);
        setValue("remarks", notice.remarks);
        // Set file preview URL if file exists
        if (notice.file) {
            const fileUrl = `${BASE_URL}/${notice.file}`;
            setFilePreview(fileUrl);  // Use file URL for the preview
        } else {
            setFilePreview(null);  // Reset preview if no file is available
        }
    }

    const [message, setMessage] = React.useState('');

    const handleOnClick = async (data) => {
        if (await confirm({ confirmation: 'Are your sure?' })) {
            setMessage('yes');
        } else {
            setMessage('no');
        }
    };

    useEffect(() => {
        fetchNotices();
    }, [BASE_URL])

    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row flex-nowrap">
                    <div className="p-2 pt-0 justify-content shadow text-center">
                        <u>
                            <h4>{editing ? 'Edit Notice' : 'Add Notice'}</h4>
                        </u>
                        <div className="d-flex flex-column px-0 pt-0 min-vh-100">
                            <form className="row g-10 m-2" onSubmit={handleSubmit(onFormSubmit)}>
                                <div className="row">

                                    <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                        <label htmlFor="date">सुचना प्रकाशन मिति <span>*</span></label>
                                        <input
                                            type="text"
                                            {...register("date", { required: "This field is required" })}
                                            placeholder="सुचना प्रकाशन मिति"
                                            className="form-control rounded-0"
                                        // value=''
                                        />
                                        {errors.date && <span className="text-danger">{errors.date.message}</span>}
                                    </div>

                                    <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                        <label htmlFor="end_date">समाप्त मिति <span>*</span></label>
                                        <input
                                            type="text"
                                            {...register("end_date", { required: "This field is required" })}
                                            placeholder="सुचना समाप्त मिति"
                                            className="form-control rounded-0"
                                        // value=''
                                        />
                                        {errors.end_date && <span className="text-danger">{errors.end_date.message}</span>}
                                    </div>

                                    <div className="col-xl-6 col-md-12 col-sm-12 pt-2">
                                        <label htmlFor="title_np">विषय *</label>
                                        <input
                                            type="text"
                                            {...register("title_np", { required: "This field is required" })} //Use this instead of name=
                                            placeholder="सुचनाको विषय"
                                            className="form-control rounded-0"
                                        // value=''
                                        />
                                        {errors.title_np && <span className="text-danger">{errors.title_np.message}</span>}
                                    </div>

                                    <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                        <label htmlFor="is_popup">पपअप गर्नुहोस?</label>
                                        <select
                                            {...register("is_popup", { required: "This field is required" })} //Use this instead of name=
                                            className='form-control rounded-0'
                                            defaultValue=''
                                        >
                                            {/* <option value='' disabled>अवस्था</option> */}
                                            <option value='0'>होइन</option>
                                            <option value='1'>हो</option>
                                        </select>
                                        {errors.is_popup && <p className="text-danger">{errors.is_popup.message}</p>} {/* Display error message */}
                                    </div>

                                    <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                        <label htmlFor="is_active">अवस्था *</label>
                                        <select
                                            {...register("is_active", { required: "This field is required" })} //Use this instead of name=
                                            className='form-control rounded-0'
                                            defaultValue=''
                                        >
                                            <option value='' disabled>अवस्था </option>
                                            <option value='1'>सक्रिय</option>
                                            <option value='0'>निस्कृिय</option>
                                        </select>
                                        {errors.is_active && <p className="text-danger">{errors.is_active.message}</p>} {/* Display error message */}
                                    </div>

                                    <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                        <label htmlFor="file">फाइल*</label>
                                        <input
                                            type="file"
                                            {...register("file", { onChange: onFileChange })} //Use this instead of name=
                                            placeholder="file"
                                            className="form-control rounded-0"
                                        // value=''
                                        />
                                        {errors.file && <p className="text-danger">{errors.file.message}</p>} {/* Display error message */}
                                    </div>
                                    {filePreview && (
                                        <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                            <img src={filePreview} alt='Preview' style={{ width: '100px', height: 'auto' }} />
                                            {filePreview}
                                        </div>
                                    )}

                                    <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                        <label htmlFor="remarks">कैफियत </label>
                                        <input
                                            type="text"
                                            {...register("remarks", { required: "This field is required" })}
                                            placeholder="कैफियत"
                                            className="form-control rounded-0"
                                        // value=''
                                        />

                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                        <button className='btn btn-primary' disabled={loading}>
                                            {editing ? (loading ? 'Updating' : 'Update') :
                                                (loading ? 'Saving...' : 'Save')}
                                        </button>
                                    </div>
                                    <div className="col-xl-3 col-md-6 col-sm-12 pt-2">
                                        <button type='button' onClick={handleClear} className='btn btn-warning'>
                                            {loading ? 'Stop' : 'Clear'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="row flex-nowrap p-2">
                                <table className='table table-border table-font'>
                                    <tr>
                                        <th>सि.नं.</th>
                                        <th>सुचना प्रकाशन मिति</th>
                                        <th>सुचना समाप्त मिति</th>
                                        <th>विषय</th>
                                        <th>पपअप</th>
                                        <th>अवस्था</th>
                                        <th>फाइल</th>
                                        <th>कैफियत</th>
                                        <th>#</th>
                                    </tr>
                                    {fetchNotice.map((notice, index) => (
                                        <tr key={notice.id}>
                                            <td>{index + 1}</td>
                                            <td>{notice.date}</td>
                                            <td>{notice.end_date}</td>
                                            <td>{notice.subject}</td>
                                            <td>{notice.is_popup === 1 ? 'हो' : 'होइन'}</td>
                                            <td>{notice.is_active === 1 ? 'सक्रिय' : 'निस्कृिय'}</td>
                                            <td>{notice.file}</td>
                                            <td>{notice.remarks}</td>
                                            <td>
                                                <button name='edit' className='btn btn-sm bg-primary'
                                                    id={notice.id}
                                                    onClick={() => handleEdit(notice)}>
                                                    <Icon iconName="Pencil"
                                                        style={{ color: 'white', fontSize: '1em' }}
                                                    />
                                                </button>
                                                <button name='delete' className='btn btn-sm bg-danger'
                                                    id={notice.id}>
                                                    <Icon iconName="Trash"
                                                        style={{ color: 'white', fontSize: '1em' }}
                                                    />
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoticeForm