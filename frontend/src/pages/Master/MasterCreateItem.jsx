import  { useState } from 'react';
import { Box, Grid, TextField, Typography, FormControl, Select, InputLabel, MenuItem, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import itemService from "../../services/itemService";

const MasterCreateItem = () => {
    const [ItemName, setItemName] = useState("");
    const [Cost, setCost] = useState("");
    const [Status, setStatus] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState(''); 
    const navigate = useNavigate();

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleCancel = () => {
        navigate('/master/items');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const item = {
            Cost: parseInt(Cost, 10),
            Status,
            ItemName
        };

        try {
            const data = await itemService.createItem(item);
            console.log(data);
            setItemName('');
            setCost('');
            setSuccess("Item created successfully!");
            setSnackbarType('success');
        } catch (error) {
            console.error("Error creating item:", error);
            setError("Failed to create item. Please try again later.");
            setSnackbarType('error');
        } finally {
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ marginBottom: 3 }}>
                <Typography color='black' fontWeight="bold" fontSize={32}>Create Item</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <TextField
                            label="Item Name"
                            variant="outlined"
                            value={ItemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Customer Selling Price"
                            variant="outlined"
                            value={Cost}
                            onChange={(e) => setCost(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 3, width: 289 }}>
                    <FormControl fullWidth>
                        <InputLabel id="active-status-label">Status</InputLabel>
                        <Select
                            labelId="active-status-label"
                            id="active-status"
                            value={Status}
                            label="Status"
                            onChange={handleStatusChange}
                            required
                        >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', mt: 3, gap: 2 }}>
                    <Button color="error" variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Box>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ width: '100%' }}>
                    {snackbarType === 'error' ? error : success}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MasterCreateItem;
