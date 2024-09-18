import React, { useEffect, useState } from 'react'



const Employee = () => {
    const [editing, setEditing] = useState(false);



    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row flex-nowrap">
                    <div className='p-2 d-flex justify-content shadow text-center'>
                        <h4>
                            {editing ? 'Edit Employee' : 'Add Employee'}
                        </h4>
                    </div>

                    <div className='d-flex flex-column px-0 pt-0 min-vh-100'>
                        <form className='row g-10 m-2'>
                            <div className="col-xl-3 col-md-6 col-sm-12">
                                <label htmlFor="">
                                    
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Employee