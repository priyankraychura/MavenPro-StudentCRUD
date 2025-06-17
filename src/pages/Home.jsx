import React, { useState } from 'react';
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
import toast, { Toaster } from 'react-hot-toast';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Home() {
  const [userData, setUserData] = useState(localstorageService.getItem('studentsData') || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  // filters by id and update it with localstorage
  const handleDelete = (id) => {
    const updatedData = userData.filter((row) => row.id !== id);
    setUserData(updatedData);
    localstorageService.setItem('studentsData', updatedData);
    toast.success("Data deleted successfully!")
  };

  // when copy button is clicked row data is duplicated creating new id
  const handleCopy = (row) => {
    const newEntry = { ...row, id: Date.now() };
    const updatedData = [...userData, newEntry];
    setUserData(updatedData);
    localstorageService.setItem('studentsData', updatedData);
    toast.success("Data duplicated successfully!")
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 140 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'class', headerName: 'Class', width: 130 },
    { field: 'rollno', headerName: 'Roll No.', width: 130 },
    { field: 'grno', headerName: 'GR No.', width: 130 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Link to={`/addData/${params.row.id}`}>
            <IconButton color="primary" size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Link>
          <Link>
            <IconButton
              color="error"
              size="small"
              onClick={() => {
                setSelectedId(params.row.id);
                setConfirmOpen(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

          </Link>
          <Link>
            <IconButton color="success" size="small" onClick={() => handleCopy(params.row)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Link>
        </Stack>
      ),
    },
  ];

  // Get unique class options for dropdown
  const classOptions = [...new Set(userData.map(item => item.class).filter(Boolean))];

  // Filter logic
  const filteredRows = userData.filter((row) => {
    const matchesSearch = Object.values(row)
      .some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesClass = classFilter ? row.class === classFilter : true;
    return matchesSearch && matchesClass;
  });

  return (
    <Box sx={{ px: 5, py: 5 }}>
      <Toaster />
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <StatsCard title="Total Students" value={userData.length} />
        <StatsCard title="Number of Classes" value={new Set(userData.map(s => s.class)).size} />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Filter by Class</InputLabel>
          <Select
            value={classFilter}
            label="Filter by Class"
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <MenuItem value="">All Classes</MenuItem>
            {classOptions.map((cls, index) => (
              <MenuItem key={index} value={cls}>{cls}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ height: 450, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          sx={{ border: 0 }}
        />
        <ConfirmDialog
          open={confirmOpen}
          title="Delete Confirmation"
          message="Are you sure you want to delete this student entry?"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            handleDelete(selectedId);
            setConfirmOpen(false);
          }}
        />

      </Paper>
    </Box>
  );
}
