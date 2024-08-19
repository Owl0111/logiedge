import { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import invoiceService from '../../services/invoiceService';

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const [searchInvoices, setSearchInvoices] = useState([]);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {
        try {
            const data = await invoiceService.getInvoices();
            setInvoices(data);
            setSearchInvoices(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    useEffect(() => {
        setSearchInvoices(
            invoices.filter(invoice =>
                invoice.InvoiceID.toLowerCase().includes(value.toLowerCase())
            )
        );
    }, [value, invoices]);

    const handleSearchChange = (event) => {
        setValue(event.target.value);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box padding={3}>
            <Typography variant="h5" fontWeight={'bold'} marginBottom={2}>
                Dashboard
            </Typography>
            <TextField
                label="Search by Invoice ID"
                variant="outlined"
                value={value}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2, width: 400 }}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'darkblue' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Invoice ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Cost</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Item Names</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>View Invoice</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchInvoices.map((invoice) => (
                            <TableRow key={invoice.InvoiceID}>
                                <TableCell>{invoice.InvoiceID}</TableCell>
                                    <TableCell>{invoice.CustMaster.Name}</TableCell>
                                      <TableCell>{invoice.Cost}</TableCell>
                                   <TableCell>{invoice.InvoiceItems.map(item => item.ItemName).join(', ')}</TableCell>
                                         <TableCell>
                                    <Button component={Link} to={`/invoice/${invoice.InvoiceID}`} variant="contained" color="primary">
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Dashboard;
