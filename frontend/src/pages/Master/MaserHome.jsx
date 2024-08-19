import { Grid, Card, Box, Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const MasterHome = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ marginBottom: 3 }}>
                <Typography color='black' fontWeight="bold" fontSize={32}>Master</Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Card sx={{ border: '1px solid lightgrey' }}>
                        <CardContent component={Link} to="/master/customers" sx={{ textDecoration: 'none' }}>
                            <Typography padding={2} color='black' fontWeight="bold" fontSize={26}>Customer</Typography>
                            <Typography padding={2} color='grey' fontWeight="bold" fontSize={14}>Read or create customer data</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card sx={{ border: '1px solid lightgrey' }}>
                        <CardContent component={Link} to="/master/items" sx={{ textDecoration: 'none' }}>
                            <Typography padding={2} color='black' fontWeight="bold" fontSize={26}>Item</Typography>
                            <Typography padding={2} color='grey' fontWeight="bold" fontSize={14}>Read or create item data</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MasterHome;

