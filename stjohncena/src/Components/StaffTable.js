import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import ViewStaffModal from './ViewStaffModal';

const StaffTable = ({ searchQuery, data }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState('');

    const toggleModal = (id = null) => {
        setSelectedStaffId(id);
        setIsModalOpen(!isModalOpen);
    }

    

    const filteredData = data.filter((item) => {
        return (
            item.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.dept ? item.dept.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
            (item.gender ? item.gender.toLowerCase().includes(searchQuery.toLowerCase()) : false)
        );
    });


    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="5%">EID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <tr key={item._id}>
                                <td>{item.empId}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.dept ? item.dept.name : ''}</td>
                                <td>{item.designation}</td>
                                <td>
                                    <button
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            color: 'lightblue',
                                            cursor: 'pointer'
                                        }}
                                        onClick={()=>toggleModal(item._id)}>View Profile</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>No data found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <ViewStaffModal isOpen={isModalOpen} onClose={toggleModal} stfId={selectedStaffId} />
        </div>
    )
}

export default StaffTable