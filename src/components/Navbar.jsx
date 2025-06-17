import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        STUDENT CRUD OPERATION
                    </Typography>
                    <Link to={'/'}><Button sx={{ color: '#FFF' }} color="inherit">Home</Button></Link>
                    <Link to={'/addData'}><Button sx={{ color: '#FFF' }} color="inherit">Add Student</Button></Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
