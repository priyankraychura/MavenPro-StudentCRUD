// components/ConfirmDialog.jsx
import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title || 'Confirm'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message || 'Are you sure you want to proceed?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error">Cancel</Button>
        <Button onClick={onConfirm} autoFocus color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
