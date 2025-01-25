import React, {  useState } from 'react';
import Table from 'react-bootstrap/Table';
import ViewStdModal from './ViewStdModal';

const StudentsTableAll = ({ searchQuery, data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState('');


    const filteredData = data.filter((item) => {
        return (
            item.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.stdId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.dept ? item.dept.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
            (item.course ? item.course.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
            (item.gender ? item.gender.toLowerCase().includes(searchQuery.toLowerCase()) : false)
        );
    });

    const toggleModal = (id = null) => {
        setSelectedStudentId(id);
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="5%">SID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Course</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <tr key={item._id}>
                                <td>{item.stdId}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.dept ? item.dept.name : 'N/A'}</td>
                                <td>{item.course ? item.course.name : 'N/A'}</td>
                                <td>
                                    <button
                                        style={{
                                            border: 'none',
                                            color: 'lightblue',
                                            background:'none'
                                        }}
                                        onClick={() => toggleModal(item._id)}
                                    >
                                        View Profile
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <ViewStdModal isOpen={isModalOpen} onClose={toggleModal} studentId={selectedStudentId} />
        </div>
    );
};

export default StudentsTableAll;
