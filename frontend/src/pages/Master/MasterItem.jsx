import  { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import itemService from '../../services/itemService';
import ItemCard from './components/ItemCard';
import { Link } from 'react-router-dom';

const MasterItem = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const getData = async () => {
        try {
            const data = await itemService.getItems();
            setItems(data);
        } catch (err) {
            console.error("Error fetching items:", err);
            setError("Failed to fetch items. Please try again later.");
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
                <Typography color='black' fontWeight="bold" fontSize={32}>Items</Typography>
                <Button variant="outlined" color="primary" component={Link} to='createItem'>Add Item</Button>
            </Box>
            <Grid container spacing={3}>
                {items.map(item => (
                    <Grid item xs={4} key={item.ItemID}>
                        <ItemCard name={item.ItemName} isActive={item.isActive} />
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

export default MasterItem;
