import * as React from 'react';
import { styled, useTheme,alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


const drawerWidth = 180;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    backgroundColor: '#FAFAFA',
    color: 'black',
    marginLeft: 0,
    width: '2000px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar({children}) {
//   const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [logoOpen, setLogoOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  const handleNavigate = (path) => {
    // navigate(path);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setLogoOpen(false);
  };

  const handleNavigateToHome = () => {
    // navigate("/");
  }

  
  return (
    <Box id="box" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{
        '& .MuiSvgIcon-root': {
          color: 'white',
          fontSize: '1.2rem',
        },
        
      }}>
        <Toolbar id="toolbar">
          <IconButton
            color="black"
            aria-label="open drawer"
            // onClick={handleDrawerOpen}
            onClick={handleClick}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open),
            }}  id="menu-icon"
          >
            <MenuIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
          </IconButton>
            {logoOpen ? "":<>
          <Typography className='youtube-typo2' variant="h6" noWrap component="div" >
            Nua
          </Typography> </>}

          <Search style={{margin:"0 auto"}}>
            <SearchIconWrapper >
              <SearchIcon style={{color:"black"}}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            <Avatar style={{marginLeft:"auto",marginRight:"7px"}}>A</Avatar>
            <span style={{color:"black"}}>User Name</span>
        </Toolbar>
      </AppBar>
      <Drawer style={{border:"500px"}} variant="permanent" open={open} sx={{                 // targeting the complete sidebar
        '& .MuiDrawer-paper': {
            marginTop: '10px',
          backgroundColor: '#FFFFFF',
          color: 'black',
        },
        '& .MuiSvgIcon-root': {
            color: 'white',
            fontSize: '1.3rem',
          },
        
      }}>
        <Divider />
        <List id="list1" sx={{
            '& .MuiListItemText-root':{
                fontSize: '0.9rem',
                '&:hover': {
                    color: '#4d2edc', // Change text color on hover
                  },
            },
            '& .MuiSvgIcon-root':{
                fontSize:"1.6rem",                                 // targeting the icons of first list
                '&:hover': {
                    color: '#4d2edc', 
                  },
            }
        }}>
        <ListItem className='listItem' key={"Home"} disablePadding sx={{ display: 'block',borderColor:"red",'& .MuiListItemButton-root:hover':{
                    backgroundColor: '#F6EEFF',
                  
                  } }}>
              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DashboardIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.6rem',
                      }}}/>

                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Dashboard" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ManageAccountsIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Manage" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SpeedIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="General" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List sx={{ borderBottom: '0.4px solid red',
            '& .MuiListItemText-root':{
                fontSize: '0.9rem',
                '&:hover': {
                    color: '#4d2edc', // Change text color on hover
                  },
            },
            '& .MuiSvgIcon-root':{
                marginLeft:"5px",
                color:'black',
                fontSize:"1.4rem",                                 // targeting the icons of second list
            }
        }}>
          
        <ListItem className='listItem' key={"Library"} disablePadding sx={{ display: 'block',borderColor:"white",'& .MuiListItemButton-root:hover':{
                    backgroundColor: '#F6EEFF',
                  
                  } }}>
              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                    fontSize: '0rem',
                  }}
                >
                  <CalendarTodayIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'black',
                        fontSize: '1.6rem',
                      }}}/>

                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Calendar" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <EmailIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'black',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Email" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ChatIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'black',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Chat" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <InsertDriveFileIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Invoice" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>

              <ListItemButton className='listItemButton'
                sx={{
                  minHeight: 0,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1.5 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <TaskAltIcon style={{color:"black", padding:"0px",width:"25px",marginRight:"0px",'& .MuiSvgIcon-root': {
                        color: 'white',
                        fontSize: '1.3rem',
                      }}}/>
                </ListItemIcon>
                <ListItemText className='listItemText'  disableTypography primary="Task" sx={{ opacity: open ? 1 : 0}} />
              </ListItemButton>


            </ListItem>


         
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
