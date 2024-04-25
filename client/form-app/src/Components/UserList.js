import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function UserList() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        skills: '',
        photo: null,
        dob: '',
        mobile: '',
        terms: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users/getuser');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const formatDateOfBirth = (dob) => {
        const date = new Date(dob);
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this User?');
        if (!shouldDelete) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3001/users/deleteuser/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditClick = (id) => {
        setSelectedUserId(id);
        const selectedUser = users.find(user => user._id === id);
        const dob = new Date(selectedUser.dob).toISOString().split('T')[0];
        setFormData({
            ...selectedUser,
            dob: dob
        });
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            // For file input, store the file directly in the formData
            setFormData({
                ...formData,
                [name]: e.target.files[0]
            });
        } else {
            // For other inputs, update the value normally
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/users/updateuser/${selectedUserId}`, formData);
            if (response.status === 200) {
                // Update was successful
                setShowModal(false);
                fetchUsers(); // Refresh the user list
            } else {
                console.error('Error updating user:', response.data);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div style={{fontFamily: "Times New Roman, serif"}}>
            <h1 style={{marginBottom:"20px"}}>User List</h1>
            <table className="table table-striped table-hover ">
                <thead>
                    <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Skills</th>
                        <th scope="col">Date of Birth</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Terms</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider '>
                    {users.map((user, index) => (
                        <tr key={user._id}  style={{verticalAlign: 'middle' }}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                            <td>{user.skills}</td>
                            <td>{formatDateOfBirth(user.dob)}</td>
                            <td>{user.mobile}</td>
                            <td>{user.terms}</td>
                            <td>
                            <button className='edit-button btn btn-primary p-1 m-2' style={{marginRight: '8px',width:'80px'}} onClick={() => handleEditClick(user._id)}>Edit</button>
                                <button className='delete-button  btn btn-primary p-1 m-2'  style={{fontSize: '16px',marginRight: '8px',width:'80px'}}   onClick={() => handleDelete(user._id)}>Delete</button>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" style={{ marginRight: '15px' }}>Name:</label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label style={{ marginRight: '15px' }}>Gender:</label><br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="skills" style={{ marginRight: '15px' }}>Skills:</label>
                                <select className="form-control" id="skills" name="skills" value={formData.skills} onChange={handleChange}>
                                    <option value="">Select Skills</option>
                                    <option>React.js</option>
                                    <option>Node.js</option>
                                    <option>Flutter</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="photo" style={{ marginRight: '15px' }}>Upload Photo:</label>
                                <input type="file" className="form-control-file" id="photo" name="photo" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob" style={{ marginRight: '15px' }}>Date of Birth:</label>
                                <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile" style={{ marginRight: '15px' }}>Mobile Number:</label>
                                <input type="tel" className="form-control" id="mobile" name="mobile" placeholder="Enter your mobile number" value={formData.mobile} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label style={{ marginRight: '15px' }}>Terms and Conditions:</label><br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="terms" id="yes" value="yes" checked={formData.terms === 'yes'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="yes">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="terms" id="no" value="no" checked={formData.terms === 'no'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="no">No</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ textAlign: 'center' }}>Update</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserList;
