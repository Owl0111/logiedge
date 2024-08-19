import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import customerService from '../../services/customerService';
import ItemCard from './components/ItemCard';
import { Link } from 'react-router-dom';
const MasterCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const getData = async () => {
        try {
            const data = await customerService.getCustomers();
            setCustomers(data);
        } catch (err) {
            console.error("Error fetching customers:", err);
            setError("Failed to fetch customers. Please try again later.");
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleCloseSnackbar = () => {
        
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <Typography color='black' fontWeight="bold" fontSize={32}>Customer</Typography>
                <Button variant="outlined" color="primary" component={Link} to='createCustomer'>Add Customer</Button>
            </Box>
            <Grid container spacing={3}>
                {customers.map(customer => (
                    <Grid item xs={4} key={customer.Id}>
                        <ItemCard name={customer.Name} isActive={customer.isActive}></ItemCard>
                    </Grid>
                ))}
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default MasterCustomer;