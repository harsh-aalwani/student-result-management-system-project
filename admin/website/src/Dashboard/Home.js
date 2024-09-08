import "../assets/css/Home.css";
import addSheetImg from "../assets/images/addSheetImg.svg";
import manageSheet from "../assets/images/paper-sheet.png";

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="BgColor">
                <nav>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="">Home</a></li>
                        <li className="breadcrumb-item active"><a href="">Sheets</a></li>
                    </ul>
                </nav>
                <div className="container" >

                    <h1 className="page-title">Sheets</h1>
                </div>
                <div className="container" >
                    <h3 className="heading"><img src={addSheetImg} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Add Sheet</h3>
                    <hr className="separator" />
                    <a className="card card-custom bg-white" href="#">
                        <div className="card-body d-flex justify-content-center align-items-center">
                            <span className="plus-sign">+</span>
                        </div>
                    </a>
                </div>
            </div>
            <div className="container">
                <h3 className="heading"><img src={manageSheet} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Manage Sheet</h3>
                <hr className="separator" />
                <h5 className="year">Year</h5>
                <a className="card card-custom bg-white" href="#">
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <span className="sheet-label">Year_Course_Sem</span>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Home;