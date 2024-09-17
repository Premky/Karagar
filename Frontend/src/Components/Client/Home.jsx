import React, { useEffect, useState } from 'react';
import office_image from '../../assets/Office.jpg';
import np_flag from '../../assets/nepal_flag.gif';
import Notice_News from './Notice&Bolpatra/Notice_News';
import Bolpatra from './Notice&Bolpatra/Bolpatra';
import axios from 'axios';

import Notice_Bolpatra from './Notice_Bolpatra'
const Home = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const [color, setColor] = useState('red');
    const [visibility, setVisibility] = useState('');
    const [activeTab, setActiveTab] = useState(1);

    const [employee, setEmployee] = useState({
        name: '',
        rank: '',
        contact: '',
        email: '',
        image: '',
        user_id: localStorage.getItem('uid'),
    });

    const handleClear = () => {
        setEmployee({
            name: '',
            rank: '',
            contact: '',
            email: '',
            image: '',
            user_id: localStorage.getItem('uid'),
        })
    }

    const [fetchEmp, setFetchEmp] = useState([]);

    const fetchemployee = () => {
        axios.get(`${BASE_URL}/display/employee`)
            .then(result => {
                console.log(result)
                if (result.data.Status) {
                    setFetchEmp(result.data.Result)
                } else {
                    // alert(result.data.Result)
                }
            }).catch(err => console.log(err))
    }



    const handleTabChange = () => {
        setActiveTab(activeTab === 1 ? 2 : 1);
    };

    const getBackgroundColor = (tabNumber) => {
        return activeTab === tabNumber ? color : 'blue';
    };

    const getVisibility = (tabNumber) => {
        return activeTab === tabNumber ? visibility : 'hidden';
    };

    useEffect(() => {
        fetchemployee();
    }, [])
    return (
        <div className='container-fluid'>
            <div className="row">
                {/* Main Page */}
                <div className="col-9">
                    <div className="row b">
                        <div className="col mb-1 mt-0 p-2 bg-danger text-white">
                            <marquee behavior="" direction=""scrollamount="1" >
                                सुचना-2 लाई सुचना 5 बनाइएको छ ।                                 
                            </marquee>
                        </div>
                        <div className="col-12">
                            <img
                                src={office_image}
                                alt="Office Building"
                                className="responsive-image"
                            />

                        </div>
                        <div className="col-12 ">
                            <hr className='mt-2' />
                            <h2 className='text-center text-danger'><u>परिचय</u></h2>
                            <hr />
                            <p className='fs-5'>

                                नेपालमा कारागार (जेल) को इतिहास वि.स १९७१ बाट शुरु भएको हो । २०१९ सालमा कारागारसम्बन्धी व्यवस्था गर्न [कारागार ऐन २०१९] निर्माण भै उक्त ऐनको दफा २७ ले दिएको अधिकार प्रयोग गरी कारागार नियमावली २०२० तर्जुमा भै लागू भएको छ । कारागार व्यवस्थापन तथा प्रशासन सम्बन्धी कार्यलाई प्रभावकारी एवं सवल बनाउन २०५० साल श्रावण १ गतेदेखि गृह मन्त्रालय अन्तर्गत केन्द्रिय तहमा कारागार व्यवस्थापन विभागको स्थापना भै सञ्चालनमा आएको हो । नेपालको ७७ जिल्लाहरुमध्ये धनुषा, बारा, भक्तपुर, पूर्वी नवलपरासी र पूर्वी रुकुम गरी ५ जिल्ला बाहेकका ७२ जिल्लामा ७४ कारागार कार्यालयहरु रहेका छन् । स्थानीय स्तरमा कारागार व्यवस्थापन तथा प्रशासनको सामान्य जिम्मेवारी सम्वन्धित प्रमुख जिल्ला अधिकारीको हुने व्यवस्था रहेको छ । कारागार कार्यालय संखुवासभाको स्थापना वि.स. २०२१ सालमा भई हाल सन्चालन भइ रहेको छ । कारागार कार्यालय संखुवासभाको कैदीबन्दी राख्ने क्षमता जम्मा ५५ जना भएको कारागार हो । कारागार कार्यालय संखुवासभाको पुरुष बन्दी गृहमा [२] वटा कोठा भएको [२] तले पक्की भवन, अन्य साना [३] वटा कोठा भएको कच्ची भवन तथा महिला बन्दी गृहमा [१] वटा कोठा भएको कच्ची भवन रहेको छ ।

                            </p>
                            <hr />
                        </div>
                    </div>
                    {/* <div className="row">
                        
                    </div> */}
                    <Notice_Bolpatra />
                </div>

                {/* Side Bar */}
                <div className="col-2">
                    {
                        fetchEmp.map((n, index) => (
                            <>
                                <div className="card" style={{ width: "18rem" }} key={index} >
                                    <img src={np_flag} className="card-img-top" alt="Nepal Flag" height={100} />
                                    <div className="card-body">
                                        <h3 className="card-title">{n.name_np}</h3>
                                        <h5 className="card-title">{n.rank}</h5>
                                        <h5 className="card-text">{n.contact}</h5>
                                        <h5 className="card-text">{n.email}</h5>
                                    </div>
                                </div>    <br />
                            </>

                        ))
                    }
                    <div className="card" style={{ width: "18rem" }}>
                        <img src={np_flag} className="card-img-top" alt="Nepal Flag" height={100} />
                        <div className="card-body">
                            <h3 className="card-title">[Name]</h3>
                            <h5 className="card-title">[Rank]</h5>
                            <h5 className="card-text">[Contact]</h5>
                            <h5 className="card-text">[Email]</h5>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-3">
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body bg-primary text-white">
                                    <h2 className='text-center'>M</h2>
                                </div>
                            </div>

                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body bg-primary text-white">
                                    <h2 className='text-center'>सूचनाको हक</h2>
                                </div>
                            </div>

                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body bg-primary text-white">
                                    <h2 className='text-center'>उजुरी/गुनासो</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
