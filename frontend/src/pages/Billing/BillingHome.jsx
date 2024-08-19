import { useState } from 'react';
import { Box, Button, Typography, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import customerService from "../../services/customerService";
import ItemCard from './components/ItemCard';

const BillingHome = () => {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = async () => {
        setOpen(true);
        setLoading(true);
        try {
            const data = await customerService.getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCustomerClick = (customerID) => {
        navigate(`/billing/${customerID}`);
        handleClose();
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>
                Billing
            </Typography>
            <Paper  sx={{ padding: 2,backgroundColor: 'grey.100'  }}>
                <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2,}}>
                    Customer Details
                </Typography>
                <hr />
                <Grid container justifyContent="center" alignItems="center" sx={{ height: 200 }}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Add
                    </Button>
                </Grid>
            </Paper>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Select Customer</DialogTitle>
                <DialogContent dividers>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            {customers.map((customer) => (
                                <Grid item xs={4} key={customer.Id}>
                                    <ItemCard
                                        name={customer.Name}
                                        isActive={customer.isActive}
                                        onClick={() => handleCustomerClick(customer.Id)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BillingHome;
