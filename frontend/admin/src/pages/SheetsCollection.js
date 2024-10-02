import "../assets/css/Home.css";
import Header from './Header.js';
import addSheetImg from "../assets/images/addSheetImg.svg";
import manageSheet from "../assets/images/paper-sheet.png";
import Footer from './Footer.js';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
        <Header/>
        <div div className="pgHome">
            <div className="container-fluid">
              <div className="BgColor">
                  <nav>
                      <ul className="breadcrumb">
                          <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                          <li className="breadcrumb-item active"><Link to="/dashboard">Sheets</Link></li>
                      </ul>
                  </nav>
                  <div className="container" >

                      <h1 className="page-title">Sheets</h1>
                  </div>
                  <div className="container" >
                      <h3 className="heading"><img src={addSheetImg} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Add Sheet</h3>
                      <hr className="separator" />
                      <Link className="card card-custom bg-white" to="/add-marksheet">
                          <div className="card-body d-flex justify-content-center align-items-center">
                              <span className="plus-sign">+</span>
                          </div>
                      </Link>
                  </div>
              </div>
              <div className="container">
                  <h3 className="heading"><img src={manageSheet} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Manage Sheet</h3>
                  <hr className="separator" />
                  <h5 className="year">Year</h5>
                  <Link className="card card-custom bg-white" to="/marksheet">
                      <div className="card-body d-flex justify-content-center align-items-center">
                          <span className="sheet-label">Year_Course_Sem</span>
                      </div>
                  </Link>
              </div>
          </div>
        </div>
        <Footer/>
    </>
  );
}

export default App;
