import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import localstorageService from '../servies/localstorageService';
import StatsCard from '../components/StatsCard';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import showToast from '../servies/toastService';

const Home = () => {
  const [userData, setUserData] = useState(localstorageService?.getItem('studentsData') || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);


  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const updateUserData = (newData, message) => {
    setUserData(newData);
    localstorageService?.setItem('studentsData', newData);
    showToast('success', message);
  };

  // filters by id and update it with localstorage
  const handleDelete = (id) => {
    const updatedData = userData?.filter((row) => row?.id !== id);
    updateUserData(updatedData, "Data deleted successfully!");
  };

  // when copy button is clicked row data is duplicated creating new id
  const handleCopy = (row) => {
    // Find the highest rollno in userData
    const maxRollNo = Math.max(...userData.map((item) => Number(item?.rollno) || 0));

    // Create a copy with a new ID and incremented roll number
    const newEntry = {
      ...row,
      id: Date.now(),
      rollno: String(maxRollNo + 1)
    };

    const updatedData = [...userData, newEntry];
    updateUserData(updatedData, "Data duplicated successfully!");
  };



  const columns = [
    {
      field: 'srno',
      headerName: 'Sr. no',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return filteredRows?.findIndex(row => row?.id === params?.id) + 1;
      }
    },
    { field: 'id', headerName: 'Unique ID', width: 150 },
    { field: 'rollno', headerName: 'Roll No.', width: 130 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'class', headerName: 'Class', width: 130 },
    { field: 'grno', headerName: 'GR No.', width: 130 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Link to={`/addData/${params?.row?.id}`}>
            <IconButton color="primary" size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
          <Link>
            <IconButton
              color="error"
              size="small"
              onClick={() => {
                setSelectedStudent(params?.row); // save full row (student) object
                setConfirmOpen(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Link>
          <Link>
            <IconButton color="success" size="small" onClick={() => handleCopy(params?.row)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Link>
        </Stack>
      ),
    },
  ];

  // Get unique class options for dropdown
  const classOptions = [...new Set(userData?.map(item => item?.class).filter(Boolean))];

  // Filter logic
  const filteredRows = userData?.filter((row) => {
    const matchesSearch = Object.values(row)
      .some(val => String(val).toLowerCase().includes(searchQuery?.toLowerCase()));
    const matchesClass = classFilter ? row?.class === classFilter : true;
    return matchesSearch && matchesClass;
  });

  return (
    <Box sx={{ px: 5, py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <StatsCard title="Total Students" value={userData?.length} />
        <StatsCard title="Number of Classes" value={new Set(userData?.map(s => s?.class))?.size} />
      </Box>
      <Box sx={{ display: 'flex', width: '60%', justifyContent: 'space-between', gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '300px' }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Class</InputLabel>
          <Select
            value={classFilter}
            label="Filter by Class"
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <MenuItem value="">All Classes</MenuItem>
            {classOptions?.map((cls, index) => (
              <MenuItem key={index} value={cls}>{cls}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ height: 400, width: '60%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          localeText={{
            noRowsLabel: 'No data available',
          }}
          sx={{ border: 1, borderColor: 'gray' }}
        />
        <ConfirmDialog
          open={confirmOpen}
          title="Delete Confirmation"
          message={
            selectedStudent
              ? `Are you sure you want to delete "${selectedStudent?.name}" (Roll No: ${selectedStudent?.rollno})?`
              : 'Are you sure you want to delete this student entry?'
          }
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            handleDelete(selectedStudent?.id);
            setConfirmOpen(false);
          }}
        />


      </Paper>
    </Box>
  );
}

export default Home