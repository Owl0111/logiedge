import { Card, Typography, CardContent } from "@mui/material";

const ItemCard = ({ name, isActive, onClick }) => {
    let bgColor = isActive ? 'white' : 'grey.200'
    const cardStyle = { border: '1px solid lightgrey', boxSizing: 'border-box', cursor:isActive ? 'pointer' : 'auto', backgroundColor:bgColor}
    return (
        <Card sx={cardStyle} onClick={isActive ? onClick : ()=>{}}>
            <CardContent  sx={{backgroundColor: {bgColor}}} >
                <Typography padding={1} color='black' fontWeight="bold" fontSize={20}>{name}</Typography>
                <Typography textAlign='right' padding={1} color={isActive ? 'green' : 'red'} fontSize={14}>{isActive ? 'Active' : 'Inactive'}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ItemCard;