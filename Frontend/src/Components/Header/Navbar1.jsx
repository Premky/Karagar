import React from 'react'
import './header_footer.css';
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">हाम्रो बारेमा</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">सूचना पाटी</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://dopm.gov.np/acts-rules/1/2556674">प्रकाशनहरु</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">मिडिया सेन्टर</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">सम्पर्क</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">जनगुनासो</a>
                            </li>                           
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar