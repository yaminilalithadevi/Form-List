import React from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import exampleImage from './images.png';


function NavBar() {
    


  return (
    <div>
       <div style={{fontFamily: "Times New Roman, serif"}} >
       <nav className="navbar navbar-expand-sm navbar-light " style={{backgroundColor:'lightgray'}}>
    <div className="container-fluid">
      <a className="navbar-brand" href="/">
        
         <b>

         <img src={exampleImage} alt="Example" style={{width:"45px",borderRadius:'20px',marginRight:"15px"}}/>
          User
          </b></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">
          
          
           </span>
      </button>
      <div className="collapse navbar-collapse  justify-content-end " id="navbarNav" >
        <ul className="navbar-nav " >
          <li className="nav-item  ">
            <NavLink className="nav-link" to="/userlist" activeClassName="active" exact>
            <button type="button" class="btn btn-primary  "  style={{width:"120px"}}>Home</button>
              </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/" activeClassName="active">
            <button type="button" class="btn btn-primary"  style={{width:"120px"}}>Add User </button>
              
              </NavLink>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>  
            </div>
    </div>
  )
}

export default NavBar
