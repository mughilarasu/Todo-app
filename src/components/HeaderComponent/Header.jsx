import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TodoTable from '../TableComponent/TodoTable';

export default function Header() {
  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              TODO App
            </Typography>
          </Toolbar>
        </AppBar>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>
          <TodoTable/>
        </Box>
      </Container>
    </React.Fragment>
  );
}
