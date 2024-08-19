import { Outlet } from "react-router-dom";
import { Box, AppBar } from "@mui/material";
import Sidebar from "./components/Sidebar";
const Layout = () => {
    return (
      <Box>
        <AppBar 
          position='fixed' 
          sx={{ zIndex: theme => theme.zIndex.drawer + 1, height:50, backgroundColor:'darkblue'}}
        >
          
        </AppBar>
        <Box sx={{ display: 'flex', mt:10}}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    );
  };

  export default Layout