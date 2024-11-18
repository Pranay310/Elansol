import React, { useState } from 'react';
import { addContact } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import './addContact.css';

const AddContact = () => {
    const nav = useNavigate();

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(userId, name, email, phone);
        nav('/dashboard');
    };

    return (
        <Paper elevation={3} className="add_contact_paper">
            <Typography variant="h5" className="add_contact_title">
                Add Contact
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="User ID"
                            name="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="add_contact_textfield"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="add_contact_textfield"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="add_contact_textfield"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="add_contact_textfield"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Created At"
                            name="createdAt"
                            type="date"
                            value={createdAt}
                            onChange={(e) => setCreatedAt(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className="add_contact_textfield"
                        />
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                       <section className='all_btns'>
                       <Button type="submit" variant="contained" className="add_contact_button">
                            Add Contact
                        </Button>
                        <Button variant="contained" className="add_contact_button" onClick={()=>{nav('/dashboard')}}>
                            Contact List
                        </Button>
                       </section>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddContact;
