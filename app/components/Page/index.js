import React, { Component } from 'react';
import { MuiThemeProvider } from "material-ui";
import './styles.css';

const Page = (props) => (
  <MuiThemeProvider>
    <div className="page-container">
      {props.children}
    </div>
  </MuiThemeProvider>
);

export default Page;