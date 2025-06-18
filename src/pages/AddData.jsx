import React, { useEffect, useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Divider,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import localstorageService from '../servies/localstorageService';
import showToast from '../servies/toastService';

function AddData() {
    const [userData, setUserData] = useState(localstorageService.getItem('studentsData') || []);
    const { id } = useParams();
    const [editIndex, setEditIndex] = useState(id || null);
    const [formData, setFormData] = useState({
        id: Date.now(),
        name: '',
        class: '',
        grno: '',
        rollno: ''
    });

    // sets all input field to true
    const [isValid, setIsValid] = useState({
        name: true,
        class: true,
        grno: true,
        rollno: true
    })
    const navigate = useNavigate();

    // checks whether id is received in params when loaded
    useEffect(() => {
        document.title = "Add/Update Student";
        if (editIndex) {
            const student = userData?.find((item) => item?.id == editIndex);
            if (student) {
                setFormData(student);
            } else {
                navigate('/');
            }
        } else {
            // Auto-generate roll number if adding new
            const maxRollNo = userData?.reduce((max, curr) => {
                const roll = parseInt(curr?.rollno);
                return roll > max ? roll : max;
            }, 0);

            setFormData((prev) => ({
                ...prev,
                rollno: String(maxRollNo + 1),
            }));
        }
    }, []);

    // checks if the length of input is greated than 3 when focus blurred
    const handleOnBlur = (e) => {

        if (e.target.value.length < 3) {
            setIsValid({ ...isValid, [e.target.name]: false })
        }

        // console.log(isValid);

        // console.log(e.target.value.length > 0);

    }

    // set valid to true when input field is focused
    const handleFocus = (e) => {
        setIsValid({ ...isValid, [e.target.name]: true })
    }

    // handle submit for both add and update
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields manually on submit
        const updatedValidity = {
            name: formData.name.trim().length >= 3,
            class: formData.class.trim().length >= 3,
            grno: formData.grno.trim().length >= 3,
            rollno: formData.rollno.trim().length > 0
        };

        setIsValid(updatedValidity);

        let isFormInvalid = Object.values(isValid).some(value => value == false);
        if (isFormInvalid) {
            return;
        }

        let updatedData;

        // if id is received then update else add new data
        if (editIndex) {
            updatedData = userData.map((item) =>
                item?.id == editIndex ? { ...formData, id: Number(editIndex) } : item
            );
            showToast('success', 'Updated successfully!');
        } else {
            updatedData = [...userData, { ...formData, id: Date.now() }];
            showToast('success', 'Added successfully!');
        }

        setUserData(updatedData);
        localstorageService.setItem('studentsData', updatedData);

        // clear input field when data is processed
        setFormData({
            id: Date.now(),
            name: '',
            class: '',
            grno: '',
            rollno: ''
        });

        navigate('/');
    };

    // sets form data when text typed
    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (

        <Box
            sx={{
                minHeight: '91vh',
                backgroundColor: '#101624',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 520,
                    borderRadius: 4,
                    backgroundColor: '#1e293b',
                    boxShadow: '0px 4px 24px rgba(0,0,0,0.4)',
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 1 }}>
                        {editIndex ? 'Update Student' : 'Add New Student'}
                    </Typography>
                    <Divider sx={{ background: '#334155', mb: 3 }} />

                    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            disabled
                            error={!isValid?.rollno}
                            name="rollno"
                            label="Roll Number"
                            type='number'
                            value={formData?.rollno}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            onFocus={handleFocus}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputProps={{ style: { color: '#fff' } }}
                            InputLabelProps={{ style: { color: !isValid?.rollno ? "#E23F44" : '#cbd5e1' } }}
                            sx={{
                                '& fieldset': { borderColor: '#334155' },
                                '&:hover fieldset': { borderColor: '#64748b' },
                            }}
                            helperText={!isValid?.rollno ? "Invalid input" : ""}
                        />
                        <TextField
                            autoFocus
                            error={!isValid?.name}
                            name="name"
                            label="Student Name"
                            value={formData?.name}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            onFocus={handleFocus}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputProps={{ style: { color: '#fff' } }}
                            InputLabelProps={{ style: { color: !isValid?.name ? "#E23F44" : '#cbd5e1' } }}
                            sx={{
                                '& fieldset': { borderColor: '#334155' },
                                '&:hover fieldset': { borderColor: '#64748b' },
                            }}
                            helperText={!isValid?.name ? "Invalid input" : ""}
                        />
                        <TextField
                            error={!isValid?.class}
                            name="class"
                            label="Class"
                            value={formData?.class}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            onFocus={handleFocus}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputProps={{ style: { color: '#fff' } }}
                            InputLabelProps={{ style: { color: !isValid?.class ? "#E23F44" : '#cbd5e1' } }}
                            sx={{
                                '& fieldset': { borderColor: '#334155' },
                                '&:hover fieldset': { borderColor: '#64748b' },
                            }}
                            helperText={!isValid?.class ? "Invalid input" : ""}
                        />
                        <TextField
                            error={!isValid?.grno}
                            name="grno"
                            label="GR Number"
                            type='number'
                            value={formData?.grno}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            onFocus={handleFocus}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputProps={{ style: { color: '#fff' } }}
                            InputLabelProps={{ style: { color: !isValid?.grno ? "#E23F44" : '#cbd5e1' } }}
                            sx={{
                                '& fieldset': { borderColor: '#334155' },
                                '&:hover fieldset': { borderColor: '#64748b' },
                            }}
                            helperText={!isValid?.grno ? "Invalid input" : ""}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                            <Link to="/">
                                <Button variant="outlined" sx={{
                                    borderColor: '#64748b',
                                    color: '#cbd5e1',
                                    '&:hover': {
                                        borderColor: '#94a3b8',
                                        backgroundColor: '#1e293b',
                                    },
                                }}>
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#38bdf8',
                                    color: '#000',
                                    '&:hover': {
                                        backgroundColor: '#0ea5e9',
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default AddData