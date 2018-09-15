import React from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from './Theme'

// let darkTheme = createMuiTheme({palette: {type: 'dark', }, });

class MaterialApp extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return (
      <MuiThemeProvider theme={theme}>
      <div>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default MaterialApp;
