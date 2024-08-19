import {  Card, Typography, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
const ItemCard = ({name,isActive}) => {

    return (
        <Card sx={{ border: '1px solid lightgrey', boxSizing:'border-box' }}>
            <CardContent>
                <Typography padding={1} color='black' fontWeight="bold" fontSize={20}>{name}</Typography>
                    <Typography textAlign='right' padding={1} color={isActive ? 'green' : 'red'} fontSize={14}>{isActive ? 'Active' : 'Inactive'}
                    </Typography>
                </CardContent>
        </Card>
    )
}

export default ItemCard;