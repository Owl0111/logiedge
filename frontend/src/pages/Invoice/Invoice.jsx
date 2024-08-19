import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import invoiceService from '../../services/invoiceService';
import { Box, Typography, Table, TableBody, CircularProgress, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';

const Invoice = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState([]);
    const [loading, setLoading] = useState(true); 
    const getInvoice = async () => {
        try {
            const response = await invoiceService.getInvoiceById(id);
            console.log(response)
            setInvoice(response);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching invoice:', error);
        }
    };

    useEffect(() => {
        getInvoice();
    }, []);

    if (loading) {
        return(
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">

                    <CircularProgress />
                
            </Box>
            
        )
    }

    return (
        <Box sx={{backgroundColor:'grey.100'}}>
            <Box padding={4}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h5" fontWeight={'bold'} marginBottom={2}>
                        Invoice Details
                    </Typography>
                    <Typography variant="h6" fontWeight={'bold'} marginBottom={2}>
                        Invoice ID: {invoice.InvoiceID}
                    </Typography>
                </Box>
                <hr />
                <Typography fontWeight={'bold'} padding={1} variant="body1">
                    Customer: {invoice.CustMaster.Name}
                </Typography>
                <Typography fontWeight={'bold'} padding={1} variant="body1">
                    Address: {invoice.CustMaster.Address}
                </Typography>
                <Typography fontWeight={'bold'} padding={1} variant="body1">
                    Created At: {new Date(invoice.createdAt).toLocaleString()}
                </Typography>
                
                <hr />
                <TableContainer  >
                    <Table >
                        <TableHead >
                            <TableRow >
                                <TableCell sx={{fontWeight:'bold'}}>Item Name</TableCell>
                                <TableCell sx={{fontWeight:'bold'}} align="right">Quantity</TableCell>
                                <TableCell sx={{fontWeight:'bold'}} align="right">Item Cost</TableCell>
                                <TableCell sx={{fontWeight:'bold'}} align="right">GST Applied</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoice.InvoiceItems.map((item) => (
                                <TableRow key={item.InvoiceItemID}>
                                    <TableCell>{item.ItemName}</TableCell>
                                    <TableCell align="right">{item.Quantity}</TableCell>
                                    <TableCell align="right">{item.ItemCost.toFixed(2)}</TableCell>
                                    <TableCell align="right">{item.GSTApplied ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography fontWeight={'bold'} padding={2} variant="body1" gutterBottom>
                    Total Cost: {invoice.Cost}
                </Typography>
            </Box>
        </Box>
    );
};

export default Invoice;
