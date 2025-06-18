import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        STUDENT CRUD OPERATION
                    </Typography>
                    <NavLink to={'/'}>
                        {
                            ({ isActive }) => (
                                <Button sx={{ color: "#FFF", backgroundColor: isActive ? '#121C2B' : 'transparent' }} color="inherit">Home</Button>
                            )
                        }
                    </NavLink>
                    <NavLink to={'/addData'}>
                        {
                            ({ isActive }) => (
                                <Button sx={{ color: "#FFF", backgroundColor: isActive ? '#121C2B' : 'transparent' }} color="inherit">Add Student</Button>
                            )
                        }
                    </NavLink>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar