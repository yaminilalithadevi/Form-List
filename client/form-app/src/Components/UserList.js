// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import UserUpdate from './UserUpdate';

function UserList() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null); // Add state to store selected user details

    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users/getalluser');
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

    const handleEditClick = async (id) => {
        try {
            const selectedUser = await axios.get(`http://localhost:3001/users/user/${id}`);
            console.log(selectedUser);
            const dob = new Date(selectedUser.data.dob).toISOString().split('T')[0];
            setSelectedUserDetails({ // Set selected user details
                ...selectedUser.data,
                dob: dob
            });
            setShowModal(true);
        } catch (error) {
            console.error('Error to get single user:', error);
        }
    };

    return (
        <div style={{ fontFamily: "Times New Roman, serif" }}>
            <h1 style={{ marginBottom: "20px" }}>User List</h1>
            <table className="table table-striped table-hover ">
                <thead>
                    <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Image</th>
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
                        <tr key={user._id}  style={{ verticalAlign: 'middle' }}>
                            <td>{index + 1}</td>
                           
                            <td>
                            <img src={`http://localhost:3001/${user.photo}`} alt="User Photo" style={{ width: '50px', height: 'auto' }} />
                           </td>

                           {/* <td>
                           <img className="images" src={`/images/${user.photo}`} alt={user.name}  style={{ width: '50px', height: 'auto' }}/>
                           </td> */}
                            
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                            <td>{user.skills}</td>
                            <td>{formatDateOfBirth(user.dob)}</td>
                            <td>{user.mobile}</td>
                            <td>{user.terms}</td>
                            <td>
                                <button className='edit-button btn btn-primary p-1 m-2' style={{ marginRight: '8px', width: '80px' }} onClick={() => handleEditClick(user._id)}>Edit</button>
                                <button className='delete-button  btn btn-danger p-1 m-2'  style={{ fontSize: '16px', marginRight: '8px', width: '80px' }} onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <UserUpdate  
                showModal={showModal}
                setShowModal={setShowModal}
                userDetails={selectedUserDetails}
                fetchUsers={fetchUsers} // Pass selected user details to UserUpdate
            />
        </div>
    );
}

export default UserList;
