import { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState(0)
    return (
      <Drawer
        variant="permanent"
        elevation={0}
        sx={{
          width: 240,
          flexShrink: 0,
          padding:0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', },
          
        }}
      >
        <List sx ={{mt:15}}>
          <ListItemButton  component={Link} to="/" selected={selectedItem===0} onClick={()=>{setSelectedItem(0)}}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton component={Link} to="master" selected={selectedItem===1} onClick={()=>{setSelectedItem(1)}} >
            <ListItemText primary="Master" />
          </ListItemButton>
          <ListItemButton component={Link} to="billing" selected={selectedItem===2} onClick={()=>{setSelectedItem(2)}} >
            <ListItemText primary="Billing" />
          </ListItemButton>
        </List>
      </Drawer>
    );
  };
export default Sidebar;