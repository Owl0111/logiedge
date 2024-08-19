import {
    Box, Typography, Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, IconButton,
    Snackbar, Alert
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customerService from "../../services/customerService";
import itemService from "../../services/itemService";
import AddItemCard from "./components/AddItemCard";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import invoiceService from "../../services/invoiceService";

const QuantityCell = ({ onDecrement, quantity, onIncrement }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton onClick={onDecrement} disabled={quantity <= 0}>
                <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton onClick={onIncrement}>
                <AddIcon />
            </IconButton>
        </Box>
    );
}

const BillingGenerate = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState('');
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const getCustomer = async (id) => {
        const data = await customerService.getCustomerById(id);
        setCustomer(data);
    };

    const getItems = async () => {
        const data = await itemService.getItems();
        setItems(data);
    };

    useEffect(() => {
        getCustomer(id);
        getItems();
    }, [id]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log(selectedItems);
    };

    const handleCancel = () => {
        navigate('/billing');
    };

    const handleCreate = async () => {
        try {
            const items = selectedItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                cost: item.cost,
                gstApplied: item.GSTApplied
            }));

            const totalCost = selectedItems.reduce((acc, item) => acc + (item.quantity * item.cost), 0) * (customer.GST ? 1 : 1.18);

            const invoiceData = {
                customerId: id,
                items: items,
                totalCost: totalCost
            };

            const response = await invoiceService.createInvoice(invoiceData);
            console.log(response);

            setSnackbarMessage('Invoice created successfully! Redirecting...');
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate(`/invoice/${response.InvoiceID}`);
            }, 3000);

        } catch (error) {
            console.error("Error creating invoice:", error);
        }
    };

    const handleIncrement = (itemName, cost) => {
        setSelectedItems((prevItems) => {
            const GSTApplied = customer.GST ? false : true;
            const itemIndex = prevItems.findIndex(item => item.name === itemName);
            if (itemIndex === -1) {
                return [...prevItems, { name: itemName, quantity: 1, cost, GSTApplied }];
            }
            const updatedItems = [...prevItems];
            updatedItems[itemIndex].quantity += 1;
            return updatedItems;
        });
    };

    const handleDecrement = (itemName) => {
        setSelectedItems((prevItems) => {
            const itemIndex = prevItems.findIndex(item => item.name === itemName);
            if (itemIndex === -1) {
                return prevItems;
            }
            const updatedItems = [...prevItems];
            if (updatedItems[itemIndex].quantity === 1) {
                return updatedItems.filter(item => item.name !== itemName);
            }
            updatedItems[itemIndex].quantity -= 1;
            return updatedItems;
        });
    };

    const totalCost = selectedItems.reduce((acc, item) => acc + (item.quantity * item.cost), 0) * (customer.GST ? 1 : 1.18);

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ marginBottom: 3 }}>
                <Typography color='black' fontWeight="bold" fontSize={32}>Billing</Typography>
            </Box>
            <Box sx={{ backgroundColor: 'grey.100' }}>
                <Box><Typography padding={1} fontWeight='bold' fontSize={24}>Customer Details</Typography></Box>
                <hr />
                <Box>
                    <Typography padding={1} fontWeight='bold'>Name: {customer.Name}</Typography>
                </Box>
                <Box>
                    <Typography padding={1} fontWeight='bold'>Address: {customer.Address}</Typography>
                </Box>
                <Box>
                    <Typography padding={1} fontWeight='bold'>Pan Card: {customer.PAN}</Typography>
                </Box>
                {customer.GST ?
                    <Box>
                        <Typography padding={1} fontWeight='bold'>GST: {customer.GST}</Typography>
                    </Box> : ""
                }
            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Select Items</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {items.map((item) => (
                            <Grid item xs={6} md={4} key={item.ItemID}>
                                <AddItemCard
                                    name={item.ItemName}
                                    quantity={selectedItems.find(si => si.name === item.ItemName)?.quantity || 0}
                                    isActive={item.isActive}
                                    onIncrement={() => handleIncrement(item.ItemName, item.Cost)}
                                    onDecrement={() => handleDecrement(item.ItemName)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="warning">Close</Button>
                </DialogActions>
            </Dialog>
            {selectedItems.length > 0 ?
                <Box>
                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table sx={{backgroundColor:'grey.100'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item Name</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="right">Cost</TableCell>
                                <TableCell align="right">GST Applied</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedItems.map(item => (
                                <TableRow key={item.name}>
                                    <TableCell component="th" scope="row">
                                        {item.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        <QuantityCell 
                                            quantity={item.quantity} 
                                            onIncrement={() => handleIncrement(item.name, item.cost)} 
                                            onDecrement={() => handleDecrement(item.name)} 
                                        />
                                    </TableCell>
                                    <TableCell align="right">{item.cost}</TableCell>
                                    <TableCell align="right">{item.GSTApplied ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2} align="left"><Typography fontSize={16} fontWeight={'Bold'} variant="h6">Total Cost:</Typography></TableCell>
                                <TableCell align="right" colSpan={2}><Typography variant="h6">{totalCost.toFixed(2)}</Typography></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Box sx={{display:'flex', justifyContent:'flex-end', mt:2, gap:2}}>
                    <Button color="warning" variant="outlined" onClick={handleCancel}>Cancel</Button>
                    <Button color="primary" variant="outlined" onClick={handleCreate}>Create</Button>
                </Box>
                
                </Box>
                :
                <Paper sx={{ padding: 2, backgroundColor: 'grey.100', mt: 8 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
                        No Items Selected
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center" sx={{ height: 200 }}>
                        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
                            Add Items
                        </Button>
                    </Grid>
                </Paper>
            }

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                anchorOrigin={{vertical:'bottom',horizontal:"center"}}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BillingGenerate;
