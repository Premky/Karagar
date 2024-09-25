import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import NepaliDate from 'nepali-datetime'
import np_govt_logo from '../../assets/logo-small.png';
import np_flag from '../../assets/nepal_flag.gif';
import Navbar from './Navbar';
import './header_footer.css';


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
      <div className='col-md-2 col-sm-2 col-xs-12 text-center'>
        <img src={np_govt_logo} alt="Logo" height={100} />
      </div>
      <div className="col-md-6 col-sm-8 col-xs-12 text-center text-danger headoffice">
        <h4 className='m-0 p-0'>नेपाल सरकार</h4>
        <h4 className='m-0 p-0'>गृह मन्त्रालय</h4>
        <h4 className='m-0 p-0'>कालिकास्थान, काठमाडौं</h4>
        <h4 className='m-0 p-0'>कारागार व्यवस्थापन विभाग</h4>
        <h2 className='office_name'><strong>कारागार कार्यालय सङ्‍खुवासभा</strong></h2>
      </div>
      <div className="col-md-1 col-sm-2 d-none d-sm-block">
        <img src={np_flag} alt="Logo" height={100} />
      </div>
      <div className="d-none d-md-block col-md-3 col-sm-12 h5 text-info-emphasis text-center">
      {formattedDateNp}, {dayName} <br /> 
      {nepaliTime} &nbsp;
      <hr />
      [Slogan]
      <hr />
      </div>
      
    </div>
  );
};

export default Header;
