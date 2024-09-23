import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '@/Store/Admin-Slice';
import EmployeeForm from './EmployeeForm';

const EmployeeTable = () => {
    const dispatch = useDispatch();
    const { employee, isLoading } = useSelector((state) => state.admin);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [showForm, setShowForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDelete = (id) => {
        dispatch(deleteEmployee(id));
    };

    const filteredEmployees = employee.filter((emp) => {
      return emp.name && emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleEdit = (emp) => {
        setEditingEmployee(emp);
        setShowForm(true);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 p-2 rounded"
                    />
                    <button
                        className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition"
                        onClick={() => dispatch(fetchEmployees())}
                    >
                        Search
                    </button>
                </div>
                <button
                    onClick={() => {
                        setEditingEmployee(null);
                        setShowForm(true);
                    }}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                >
                    Create Employee
                </button>
            </div>

            {showForm && (
                <div className="relative mb-4">
                    <button 
                        onClick={() => setShowForm(false)} 
                        className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                    >
                        Close Form
                    </button>
                    <EmployeeForm employee={editingEmployee} setShowForm={setShowForm} />
                </div>
            )}

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 p-2 text-center w-1/12">ID</th>
                            <th className="border border-gray-300 p-2 text-center w-1/12">Image</th>
                            <th className="border border-gray-300 p-2 text-center w-2/12">Name</th>
                            <th className="border border-gray-300 p-2 text-center w-2/12">Email</th>
                            <th className="border border-gray-300 p-2 text-center w-1/12">Phone</th>
                            <th className="border border-gray-300 p-2 text-center w-1/12">Designation</th>
                            <th className="border border-gray-300 p-2 text-center w-1/12">Gender</th>
                            <th className="border border-gray-300 p-2 text-center w-1/12">Course</th>
                            <th className="border border-gray-300 p-2 text-center w-1/12">Created Date</th>
                            <th className="border border-gray-300 p-2 text-center w-1/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredEmployees.map((emp, index) => (
                            <tr key={emp._id} className="hover:bg-gray-100 transition">
                                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <img src={emp.image} alt="Employee" className="h-10 w-10 rounded mx-auto" />
                                </td>
                                <td className="border border-gray-300 p-2 text-center">{emp.name}</td>
                                <td className="border border-gray-300 p-2 text-center">{emp.email}</td>
                                <td className="border border-gray-300 p-2 text-center">{emp.phone}</td>
                                <td className="border border-gray-300 p-2 text-center">{emp.designation}</td>
                                <td className="border border-gray-300 p-2 text-center">{emp.gender}</td>
                                <td className="border border-gray-300 p-2 text-center">{emp.course.join(', ')}</td>
                                <td className="border border-gray-300 p-2 text-center">{new Date(emp.createdAt).toLocaleDateString()}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button 
                                        onClick={() => handleEdit(emp)} 
                                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition m-1"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(emp._id)} 
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition mx-1"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeTable;
