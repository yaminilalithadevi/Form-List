import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; 
import { useParams } from 'react-router-dom';


function UserUpdate({ showModal, setShowModal, userDetails ,fetchUsers}) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [skills, setSkills] = useState('');
    const [dob, setDob] = useState('');
    const [mobile, setMobile] = useState('');
    const [photo, setPhoto] = useState(null);
    const [terms, setTerms] = useState('');
    
    const params = useParams();

   
    useEffect(() => {
        if (userDetails) {
            const { name, gender, skills, dob, mobile, terms} = userDetails;
            console.log(name, gender, skills, dob, mobile)
            setName(name || '');
            setGender(gender || '');
            setSkills(skills || '');
            setDob(dob || '');
            setMobile(mobile || '');
            setTerms(terms || '');
        }
    }, [userDetails]);

    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
            if (!userDetails) return; // Add this condition to handle null userDetails
            const id  = userDetails._id; // Destructure id from userDetails
            // Create FormData object
            const formData = new FormData();
            formData.append('name', name);
            formData.append('gender', gender);
            formData.append('skills', skills);
            formData.append('dob', dob);
            formData.append('mobile', mobile);
            formData.append('terms', terms);
    
            // Append photo if it exists
            if (photo) {
                formData.append('photo', photo);
            }
    
            // Send PUT request to update user data
            await axios.put(`http://localhost:3001/users/updateuser/${id}`, formData);
    
            // Show success message
            alert('User updated successfully');
    
            // Close the modal
            setShowModal(false);
    
            // Refetch the updated user list
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    
    return (
        <div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="container">
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="name" style={{ marginRight: '15px' }}>Name:</label>
                                <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label style={{ marginRight: '15px' }}>Gender:</label><br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="skills" style={{ marginRight: '15px' }}>Skills:</label>
                                <select className="form-control" id="skills" name="skills" value={skills} onChange={(e) => setSkills(e.target.value)}>
                                    <option value="">Select Skills</option>
                                    <option>React.js</option>
                                    <option>Node.js</option>
                                    <option>Flutter</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo" style={{ marginRight: '15px' }}>Upload Photo:</label>
                                <input type="file" className="form-control-file" id="photo" name="photo"  onChange={ (e)=>setPhoto(e.target.files[0])} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob" style={{ marginRight: '15px' }}>Date of Birth:</label>
                                <input type="date" className="form-control" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile" style={{ marginRight: '15px' }}>Mobile Number:</label>
                                <input type="tel" className="form-control" id="mobile" name="mobile" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label style={{ marginRight: '15px' }}>Terms and Conditions:</label><br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="terms" id="yes" value="yes" checked={terms === 'yes'} onChange={(e) => setTerms(e.target.value)} />
                                    <label className="form-check-label" htmlFor="yes">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="terms" id="no" value="no" checked={terms === 'no'} onChange={(e) => setTerms(e.target.value)} />
                                    <label className="form-check-label" htmlFor="no">No</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ textAlign: 'center' }}  onClick={handleUpdate}>Update</button>
                        </form>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserUpdate;
