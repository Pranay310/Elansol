import React, { useEffect, useState } from 'react';
import { fetchContacts, deleteContact } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import Button from '@mui/material/Button';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
    const nav = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchContacts();
                if (response) {
                    setData(response);
                }
            } catch (error) {
                console.error("Failed to fetch contacts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const addContact = () => {
        nav('/addContact');
    };

    const handleEdit = (id) => {
        alert("Due to time constraints not able to implement Edit option")
    };

    const handleDelete = async (email) => {
        try {
            const result = await deleteContact(email);
            if (result.message) {
                setData(data.filter(contact => contact.Email !== email));
                alert(result.message);
            }
        } catch (error) {
            alert("Failed to delete contact.");
        }
    };

    const handleLogout = () => {
        nav('/login');
    };

    return (
        <div className="dashboard_container">
            <div className='nav_container'>
                <nav className='nav_dashboard'>
                    <div className='nav_dashboard_div'>
                        <Button sx={{ height: "7vh" }} onClick={addContact} variant="contained" color="success" >Add Contact</Button>
                    </div>
                    <Button className='logout_btn' sx={{margin:"5vw"}} onClick={handleLogout} variant="contained" color="error">Logout</Button>
                </nav>
            </div>
            <main className="dashboard_main">
                <section className='main_section_dashdoard'>
                    {loading ? (
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <CircularProgress />
                            <p>Loading data...</p>
                        </div>
                    ) : (
                        <TableContainer component={Paper} sx={{ maxWidth: 900, margin: 'auto', marginTop: 4 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ margin: "5px" }}>
                                        {/* <TableCell>UserID</TableCell> */}
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.length > 0 ? (
                                        data.map((row, idx) => (
                                            <TableRow key={idx} className="table_row">
                                                {/* <TableCell>{row.UserId}</TableCell> */}
                                                <TableCell>{row.Name}</TableCell>
                                                <TableCell>{row.Email}</TableCell>
                                                <TableCell>{row.Phone}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleEdit(row.UserId)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => handleDelete(row.Email)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                No data available, Add some contacts
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
