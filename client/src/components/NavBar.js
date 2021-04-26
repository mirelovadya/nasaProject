import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div >
            <img style={{ opacity: 0.3, width: '90%', position: 'fixed', marginLeft: "-9.35%", marginTop: "-2%" }} className="d-block w-100" src="1.jpg" alt="First slide" />

            <div>
                <nav style={{position:'fixed', width:"83%"}} className="nav nav-pills flex-column flex-sm-row mt-4">
                    <Link className="flex-sm-fill text-sm-center nav-link active mr-2 btn btn-dark" to="/login/todayPicture">Today picture</Link>
                    <Link className="flex-sm-fill text-sm-center nav-link active mr-2 btn btn-dark" to="/login/historyPicture">history picture</Link>
                    <Link className="flex-sm-fill text-sm-center nav-link active mr-2 btn btn-dark" to="/login/picture">picture</Link>
                </nav>
            </div>

        </div>

    )
}

{/* <div classNameName="container">
            <div classNameName="row">
                <nav className="col-12 navbar navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/login/todayPicture">Today picture</Link>
                    <Link className="navbar-brand" to="/login/historyPicture">history picture</Link>
                    <Link className="navbar-brand" to="/login/picture">picture</Link>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
            </div>



            </div> */}