import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [skills, setSkills] = useState('');
    const [photo, setPhoto] = useState(null);
    const [dob, setDob] = useState('');
    const [mobile, setMobile] = useState('');
    const [terms, setTerms] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('gender', gender);
            formData.append('skills', skills);
            formData.append('photo', photo);
            formData.append('dob', dob);
            formData.append('mobile', mobile);
            formData.append('terms', terms);

            const response = await axios.post('http://localhost:3001/users/postuser', formData);
            console.log('Form submitted successfully:', response.data);
            // Reset form data after successful submission
            setName('');
            setGender('');
            setSkills('');
            setPhoto();
            setDob('');
            setMobile('');
            setTerms('');
            alert('Data saved successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    

    return (
        <div >
            <div className="container" style={{ width: '40%', padding: '20px',backgroundColor:'lightgray',borderRadius:'10px', fontFamily: "Times New Roman, serif"}}>
                <h1 className='m-auto'> Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" style={{ marginRight: '15px',width:"50px" ,display:'inline-flex'}}>Name    <span style={{ color: 'red' }}>*</span>:</label>
                        <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}  required/>
                    </div>
                    <div className="form-group">
                        <label style={{ marginRight: '15px', }}>Gender:</label><br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)}  />
                            <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                            <label className="form-check-label" htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills" style={{ marginRight: '15px',display:'inline-flex' }}>Skills   <span style={{ color: 'red' }}>*</span>:</label>
                        <select className="form-control" id="skills" name="skills" value={skills} onChange={(e) => setSkills(e.target.value)}  required>
                            <option value="">Select Skills</option>
                            <option>React.js</option>
                            <option>Node.js</option>
                            <option>Flutter</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo" style={{ marginRight: '15px' ,display:'inline-flex'}}>Upload Photo   <span style={{ color: 'red' }}>*</span>:</label>
                        <input type="file" className="form-control-file" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0])}  required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob" style={{ marginRight: '15px',display:'inline-flex' }}>Date of Birth:</label>
                        <input type="date" className="form-control" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile" style={{ marginRight: '15px',display:'inline-flex' }}>Mobile Number   <span style={{ color: 'red' }}>*</span>:</label>
                        <input type="tel" className="form-control" id="mobile" name="mobile" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label style={{ marginRight: '15px' ,display:'inline-flex'}}>Terms and Conditions  <span style={{ color: 'red' }}>*</span>:</label><br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="terms" id="yes" value="yes" checked={terms === 'yes'} onChange={(e) => setTerms(e.target.value)}  required/>
                            <label className="form-check-label" htmlFor="yes">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="terms" id="no" value="no" checked={terms === 'no'} onChange={(e) => setTerms(e.target.value)} />
                            <label className="form-check-label" htmlFor="no">No</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg " style={{display: 'block',margin: 'auto'}}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UserForm;
