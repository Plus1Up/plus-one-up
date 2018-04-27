import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, DropDownMenu, MenuItem, RaisedButton} from 'material-ui';
import {Link} from 'react-router-dom';
import {FileSaver} from 'file-saver';
import { clients, diets } from "services/api";
import './styles.css';

import Page from 'components/Page';

class Diet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      selectedFile: null
    };
  }

  get clientId() {
    return this.props.id;
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('diet_plan', this.state.selectedFile);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    clients
      .put(this.clientId, fd, config)
      .then(response => {
        console.log(response);
      });
  }

  fileDownloadHandler() {
    const FileSaver = require('file-saver');
    const axios = require('axios');
    diets
     .get(10, "dieta_cud.pdf")
     .then(response => {
        console.log(response);
        const blob = new Blob([response.data], {
          type: 'application/pdf',
        });
        FileSaver.saveAs(blob, dieta_cud.pdf);
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='half-container'>
            <img src='../../../assets/images/diet.png' />
          </div>
          <div className='half-container'>
          <RaisedButton label='Pobierz plan' className='plan-btn' onClick={this.fileDownloadHandler}></RaisedButton>
          
          <RaisedButton label='Nowy plan' className='plan-btn' onClick={this.toggleHidden.bind(this)} ></RaisedButton>
            {!this.state.isHidden && <div className='hidden-container'>
              <input 
              type="file" 
              onChange={this.fileSelectedHandler} />
              <RaisedButton label='Dodaj' className='plan-btn' onClick={this.fileUploadHandler}></RaisedButton>
            </div>}

          <RaisedButton label='Usuń plan' className='plan-btn'></RaisedButton>
          </div>
        </div>
      </div>
    )
  }
}

export default Diet;
