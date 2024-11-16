'use client';

import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
    const router = useRouter();
    const [allUsers, setAllUsers] = useState([]);
    const [userCounts, setUserCounts] = useState({ mentors: 0, mentees: 0 });
    const [editingUser, setEditingUser] = useState(null);
    const [hoveredRowId, setHoveredRowId] = useState(null); // For dynamic hover effect
    const [isLoading, setIsLoading] = useState(true); // For loading indicators

    // Base URL for API endpoints
    const API_BASE_URL = 'http://localhost:4000';

    useEffect(() => {
        // Fetch all users and user counts concurrently
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [usersResponse, countsResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/admin/all-users`),
                    fetch(`${API_BASE_URL}/api/admin/user-counts`)
                ]);

                const usersData = await usersResponse.json();
                const countsData = await countsResponse.json();

                if (usersData.users) {
                    setAllUsers(usersData.users);
                } else {
                    console.error('Invalid response structure for users:', usersData);
                    alert('Failed to fetch users. Please try again later.');
                }

                if (countsData.counts) {
                    setUserCounts(countsData.counts);
                } else {
                    console.error('Invalid response structure for counts:', countsData);
                    alert('Failed to fetch user counts. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('An error occurred while fetching data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = async (user_id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/users/${user_id}`);
            if (!response.ok) throw new Error('Failed to fetch user details');
            const data = await response.json();
            setEditingUser(data.user); // Assuming the API returns { user: { ... } }
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            alert('Failed to fetch user details. Please try again.');
        }
    };

    const handleUpdate = async (id, updatedUser) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            });

            if (!response.ok) throw new Error('Failed to update user');

            const updatedUserData = await response.json(); // Assuming it returns the updated user

            setAllUsers(allUsers.map(user => (user.user_id === id ? updatedUserData.user : user)));

            // Update user counts if role has changed
            const originalUser = allUsers.find(user => user.user_id === id);
            if (originalUser.role !== updatedUser.role) {
                setUserCounts(prevCounts => ({
                    ...prevCounts,
                    [originalUser.role === 'mentor' ? 'mentors' : 'mentees']: prevCounts[originalUser.role === 'mentor' ? 'mentors' : 'mentees'] - 1,
                    [updatedUser.role === 'mentor' ? 'mentors' : 'mentees']: prevCounts[updatedUser.role === 'mentor' ? 'mentors' : 'mentees'] + 1
                }));
            }

            setEditingUser(null);
            alert('User updated successfully.');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        // Confirm deletion
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/users/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete user');

            setAllUsers(allUsers.filter(user => user.user_id !== id));

            // Update user counts
            const deletedUser = allUsers.find(user => user.user_id === id);
            setUserCounts(prevCounts => ({
                ...prevCounts,
                [deletedUser.role === 'mentor' ? 'mentors' : 'mentees']: prevCounts[deletedUser.role === 'mentor' ? 'mentors' : 'mentees'] - 1
            }));

            alert('User deleted successfully.');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        }
    };

    const resetForm = () => {
        setEditingUser(null);
    };

    // Inline Styles
    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1000px',
            margin: '0 auto'
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '2em',
            color: '#333'
        },
        countsContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '30px',
            flexWrap: 'wrap'
        },
        countBox: {
            backgroundColor: '#f2f2f2',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            width: '150px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            margin: '10px'
        },
        countNumber: {
            fontSize: '1.5em',
            marginBottom: '10px',
            color: '#4CAF50'
        },
        addButton: {
            padding: '10px 20px',
            marginBottom: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1em',
            transition: 'background-color 0.3s'
        },
        addButtonHover: {
            backgroundColor: '#45a049'
        },
        tableContainer: {
            overflowX: 'auto'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        tableHeader: {
            backgroundColor: '#4CAF50',
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'left',
            color: 'white'
        },
        tableRow: {
            borderBottom: '1px solid #ddd',
            transition: 'background-color 0.3s'
        },
        tableRowHover: {
            backgroundColor: '#f1f1f1'
        },
        tableCell: {
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'left'
        },
        input: {
            padding: '8px',
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        select: {
            padding: '8px',
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        saveButton: {
            padding: '8px 16px',
            marginRight: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9em',
            transition: 'background-color 0.3s'
        },
        saveButtonHover: {
            backgroundColor: '#45a049'
        },
        cancelButton: {
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9em',
            transition: 'background-color 0.3s'
        },
        cancelButtonHover: {
            backgroundColor: '#da190b'
        },
        editButton: {
            padding: '8px 16px',
            marginRight: '8px',
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9em',
            transition: 'background-color 0.3s'
        },
        editButtonHover: {
            backgroundColor: '#007bb5'
        },
        deleteButton: {
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9em',
            transition: 'background-color 0.3s'
        },
        deleteButtonHover: {
            backgroundColor: '#da190b'
        },
        actionButtonsContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        loading: {
            textAlign: 'center',
            fontSize: '1.2em',
            color: '#555'
        }
    };

    // Handlers for hover effects (optional enhancement)
    const [isAddButtonHovered, setIsAddButtonHovered] = useState(false);
    const [buttonHoverStates, setButtonHoverStates] = useState({});

    const handleButtonMouseEnter = (button) => {
        setButtonHoverStates(prev => ({ ...prev, [button]: true }));
    };

    const handleButtonMouseLeave = (button) => {
        setButtonHoverStates(prev => ({ ...prev, [button]: false }));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Dashboard</h1>

            {/* Display User Counts */}
            <div style={styles.countsContainer}>
                <div style={styles.countBox}>
                    <div style={styles.countNumber}>{userCounts.mentors}</div>
                    <div>Mentors</div>
                </div>
                <div style={styles.countBox}>
                    <div style={styles.countNumber}>{userCounts.mentees}</div>
                    <div>Mentees</div>
                </div>
            </div>

            {/* Add User Button */}
            <button
                onClick={() => router.push('/reg_mentor')}
                style={{
                    ...styles.addButton,
                    ...(buttonHoverStates['addButton'] ? styles.addButtonHover : {})
                }}
                onMouseEnter={() => handleButtonMouseEnter('addButton')}
                onMouseLeave={() => handleButtonMouseLeave('addButton')}
            >
                Add New Mentor/Mentee
            </button>

            {/* Loading Indicator */}
            {isLoading ? (
                <div style={styles.loading}>Loading data...</div>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>ID</th>
                                <th style={styles.tableHeader}>Username</th>
                                <th style={styles.tableHeader}>Role</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Display All Users */}
                            {allUsers.map((user) => (
                                <tr
                                    key={user.user_id}
                                    style={{
                                        ...styles.tableRow,
                                        ...(hoveredRowId === user.user_id ? styles.tableRowHover : {})
                                    }}
                                    onMouseEnter={() => setHoveredRowId(user.user_id)}
                                    onMouseLeave={() => setHoveredRowId(null)}
                                >
                                    <td style={styles.tableCell}>{user.user_id}</td>
                                    <td style={styles.tableCell}>
                                        {editingUser?.user_id === user.user_id ? (
                                            <input
                                                type="text"
                                                value={editingUser.username || ''}
                                                onChange={(e) =>
                                                    setEditingUser({ ...editingUser, username: e.target.value })
                                                }
                                                style={styles.input}
                                                placeholder="Enter username"
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td style={styles.tableCell}>
                                        {editingUser?.user_id === user.user_id ? (
                                            <select
                                                value={editingUser.role || ''}
                                                onChange={(e) =>
                                                    setEditingUser({ ...editingUser, role: e.target.value })
                                                }
                                                style={styles.select}
                                            >
                                                <option value="mentee">Mentee</option>
                                                <option value="mentor">Mentor</option>
                                            </select>
                                        ) : (
                                            user.role.charAt(0).toUpperCase() + user.role.slice(1)
                                        )}
                                    </td>
                                    <td style={styles.tableCell}>
                                        {editingUser?.user_id === user.user_id ? (
                                            <div style={styles.actionButtonsContainer}>
                                                <button
                                                    onClick={() => handleUpdate(user.user_id, editingUser)}
                                                    style={{
                                                        ...styles.saveButton,
                                                        ...(buttonHoverStates[`saveButton_${user.user_id}`] ? styles.saveButtonHover : {})
                                                    }}
                                                    onMouseEnter={() => handleButtonMouseEnter(`saveButton_${user.user_id}`)}
                                                    onMouseLeave={() => handleButtonMouseLeave(`saveButton_${user.user_id}`)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={resetForm}
                                                    style={{
                                                        ...styles.cancelButton,
                                                        ...(buttonHoverStates[`cancelButton_${user.user_id}`] ? styles.cancelButtonHover : {})
                                                    }}
                                                    onMouseEnter={() => handleButtonMouseEnter(`cancelButton_${user.user_id}`)}
                                                    onMouseLeave={() => handleButtonMouseLeave(`cancelButton_${user.user_id}`)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div style={styles.actionButtonsContainer}>
                                                <button
                                                    onClick={() => handleEdit(user.user_id)}
                                                    style={{
                                                        ...styles.editButton,
                                                        ...(buttonHoverStates[`editButton_${user.user_id}`] ? styles.editButtonHover : {})
                                                    }}
                                                    onMouseEnter={() => handleButtonMouseEnter(`editButton_${user.user_id}`)}
                                                    onMouseLeave={() => handleButtonMouseLeave(`editButton_${user.user_id}`)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.user_id)}
                                                    style={{
                                                        ...styles.deleteButton,
                                                        ...(buttonHoverStates[`deleteButton_${user.user_id}`] ? styles.deleteButtonHover : {})
                                                    }}
                                                    onMouseEnter={() => handleButtonMouseEnter(`deleteButton_${user.user_id}`)}
                                                    onMouseLeave={() => handleButtonMouseLeave(`deleteButton_${user.user_id}`)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
