import { Box, Typography, IconButton, Button } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

const AddItemCard = ({ name, quantity, isActive, onIncrement, onDecrement }) => {
    return (
        <Box
            sx={{
                border: '1px solid grey',
                borderRadius: 2,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: isActive ? 'white' : 'grey.300',
            }}
        >
            <Typography variant="h6">{name}</Typography>
            {
                isActive?
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 , justifyContent:'flex-end'}}>
                    {
                        !quantity?
                        <Button onClick={onIncrement}>Add</Button>:
                        <Box sx={{display:'flex'}}> 
                                <IconButton onClick={onDecrement} disabled={quantity <= 0}>
                            <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ mx: 2 }}>{quantity}</Typography>
                            <IconButton onClick={onIncrement}>
                                <AddIcon />
                            </IconButton>
                        </Box>


                    }
                    
                    
                </Box> : <Typography textAlign='right' padding={1} color={'red'} fontSize={14}>{'Inactive'}
                </Typography>

            }
            
        </Box>
    );
};

export default AddItemCard;
