import { useState } from 'react';
import { Box, Grid, TextField, Typography, FormControl, Select, InputLabel, MenuItem, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import customerService from "../../services/customerService";

const MasterCreateCustomer = () => {
    const [PAN, setPAN] = useState("");
    const [Address, setAddress] = useState("");
    const [GST, setGST] = useState("");
    const [Name, setName] = useState("");
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
            navigate('/master/customers');
      };

     const handleSubmit = async (event) => {
        event.preventDefault();
        const customer = {
            PAN,
            Address,
            GST,
            Name,
            status: Status
        };

        try {
            const data = await customerService.createCustomer(customer);
            console.log(data);
            setPAN('');
            setAddress('');
            setGST('');
            setName('');
            setStatus(true);
            setSuccess("Customer created successfully!"); 
            setSnackbarType('success');
        } catch (error) {
            console.error("Error creating customer:", error);
            setError("Failed to create customer. Please try again later.");
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
                <Typography color='black' fontWeight="bold" fontSize={32}>Create Customer</Typography>
            </Box>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                            <TextField
                            label="Name"
                            variant="outlined"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid>
                    
                    <Grid item xs={3}>
                            <TextField
                            label="Address"
                            variant="outlined"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            fullWidth
                        />
                    </Grid>
                    
                </Grid>
                    <Grid container spacing={3} sx={{mt:1}}>
                    <Grid item xs={3}>
                        <TextField
                            label="GST"
                            variant="outlined"
                            value={GST}
                             onChange={(e) => {
                                setGST(e.target.value)
                            }}
                            inputProps={{
                                maxLength:15,
                            }}
                            fullWidth
                        />
                        </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="PAN"
                            variant="outlined"
                            value={PAN}
                            onChange={(e) => setPAN(e.target.value)}
                            required
                            inputProps={{
                                maxLength: 10,
                            }}
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
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbarType} 
                    sx={{ width: '100%' }}
                >
                    {snackbarType === 'error' ? error : success}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MasterCreateCustomer;
