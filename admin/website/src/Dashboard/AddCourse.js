import "../assets/css/Home.css";
import listImg from "../assets/images/list.png";
import courseImg from "../assets/images/course.png";

const Home = () => {
    return (
        <div className="container-fluid">
            <div className="BgColor">
                <nav>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="">Home</a></li>
                        <li className="breadcrumb-item active"><a href="">Course</a></li>
                    </ul>
                </nav>
                <div className="container" >
                    <h1 className="page-title">Course</h1>
                </div>
                <div className="container" >
                    <h3 className="heading"><img src={courseImg} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Add Course</h3>
                    <hr className="separator" />
                    <form method="POST" class="container">
                        <div class="row mb-3">
                            <label for="courseName" class="col-sm-1 col-form-label">Course</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="cname" placeholder="Enter Course Name" required/>
                            </div>
                            <label for="semester" class="col-sm-1 col-form-label">Semester</label>
                            <div class="col-sm-2">
                                <input type="text" class="form-control" id="semester" placeholder="Enter Semester" required/>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="courseName" class="col-sm-1 col-form-label">Description</label>
                            <div class="col-sm-11">
                                <textarea class="form-control description" rows="5" maxlength="360" id="description" placeholder="Enter Description" required></textarea>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-10 offset-sm-2">
                                <input type="submit" class="btn btn-primary btn-add" value="ADD" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="container mt-5">
                <h3 className="heading"><img src={listImg} alt="Logo" width="35" height="35" className="d-inline-block align-text-top me-2" />Course List</h3>
                <hr className="separator" />
                <div class="table-responsive container" >
                    <table class="table table-striped table-bordered">
                        <thead class="table-dark">
                            <tr>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Semester</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>101</td>
                                <td>Introduction to Computer Science</td>
                                <td>1st Semester</td>
                                <td><a href="#" class="btn btn-link">Click me</a></td>
                                <td>
                                    <button class="btn btn-warning btn-md btnaction">Edit</button>
                                </td>
                                <td>
                                    <button class="btn btn-danger btn-md btnaction">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;