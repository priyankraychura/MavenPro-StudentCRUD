import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const navLinks = [
        { label: "Home", to: "/" },
        { label: "Add Student", to: "/add-student-data" },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        STUDENT CRUD OPERATION
                    </Typography>
                    {navLinks?.map(({ label, to }) => (
                        <NavLink key={to} to={to}>
                            {({ isActive }) => (
                                <Button
                                    sx={{
                                        color: "#FFF",
                                        backgroundColor: isActive ? "#121C2B" : "transparent",
                                    }}
                                    color="inherit"
                                >
                                    {label}
                                </Button>
                            )}
                        </NavLink>
                    ))}

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar