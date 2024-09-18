import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import NepaliDate from 'nepali-datetime'
import np_govt_logo from '../../assets/logo-small.png';
import np_flag from '../../assets/nepal_flag.gif';
import Navbar from './Navbar';

const Header = () => {
    const [nepaliTime, setNepaliTime] = useState();

    // Function to update Nepali time
    const updateNepaliTime = () => {
      const npTimeNow = new NepaliDate();
      setNepaliTime(npTimeNow.format('HH:mm:ss'));
    };
  
    // useEffect hook to update time every second
    useEffect(() => {
      const interval = setInterval(updateNepaliTime, 1000);
      return () => clearInterval(interval);
    }, []);
  
   // English (Gregorian) Date
    const today = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);
  
    // Nepali Date
    const npToday = new NepaliDate();
    const formattedDateNp = npToday.format('YYYY-MM-DD');
    const day = npToday.getDay();
    const weekDays = ['आइतवार', 'सोमवार', 'मङ्‍गलवार', 'बुधवार', 'बिहिवार', 'शुक्रवार', 'शनिवार'];
    const dayName = weekDays[day];
  
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    axios.defaults.withCredentials = true;

  return (
    <div className='row container-fluid p-3'>
      <div className='col-lg-1 col-md-6 col-sm-12'>
        <img src={np_govt_logo} alt="Logo" height={100} />
      </div>
      <div className="col-lg-7 col-md-6 col-sm-12 m-0 p-0 text-center text-danger">
        <h5 className='m-0 p-0'>नेपाल सरकार</h5>
        <h5 className='m-0 p-0'>गृह मन्त्रालय</h5>
        <h5 className='m-0 p-0'>कालिकास्थान, काठमाडौं</h5>
        <h4 className='m-0 p-0'>कारागार व्यवस्थापन विभाग</h4>
        <h2 className=''><strong>कारागार कार्यालय सङ्‍खुवासभा</strong></h2>
      </div>
      <div className="col-lg-1 col-md-6 col-sm-12">
        <img src={np_flag} alt="Logo" height={100} />
      </div>
      <div className="col-lg-2 col-md-6 col-sm-12 h5 text-info-emphasis">
      {formattedDateNp}, {dayName} <br /> 
      {nepaliTime} &nbsp;
      </div>
      <Navbar/>
    </div>
  );
};

export default Header;
