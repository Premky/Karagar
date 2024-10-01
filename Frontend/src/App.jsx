import { useState } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Header/Footer';
import Home from './Components/Client/Home';
import Contact from './Components/Client/Contact';
import Feedback from './Components/Client/Feedback';
import Mediacenter from './Components/Client/Mediacenter';
import Notice_Bolpatra from './Components/Client/Notice_Bolpatra';
import Navbar from './Components/Header/Navbar';
import AdminNavbar from './Components/Admin/AdminNavbar';
import Employee from './Components/Admin/Employee';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navbar/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/mediacenter" element={<Mediacenter />} />
        <Route path="/admin" element={<AdminNavbar />}>
          <Route path="employees" element={<Employee />} />
          {/* Add more admin routes here */}
        </Route>
        <Route path="/notices" element={<Notice_Bolpatra />} />
        {/* Add additional routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
