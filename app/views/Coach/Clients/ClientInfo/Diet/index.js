import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, DropDownMenu, MenuItem, RaisedButton} from "material-ui";
import {Link} from "react-router-dom";
import {FileSaver} from "file-saver";
import { clients, diets } from "services/api";
import "./styles.css";

import Page from "components/Page";
import dietImg from "assets/images/diet.png";

class Diet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dietPlanFileName: "",
      isHidden: true,
      selectedFile: null
    };
  }

  get clientId() {
    return this.props.id;
  }

  get dietName() {
    return this.state.dietPlanFileName;
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("diet_plan", this.state.selectedFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    clients
      .put(this.clientId, fd, config)
      .then((response) => {
        this.setState({
          ...this.state,
          dietPlanFileName: this.state.selectedFile.name,
        });
        alert("Nowy plan został dodany.");
      });
  }

  fileDownloadHandler = () => {
    const FileSaver = require("file-saver");
    const axios = require("axios");
    diets
     .get(this.clientId, this.dietName)
     .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        FileSaver.saveAs(blob, this.dietName);
    });
  }

  componentDidMount() {
    if(this.clientId) {
      clients.get(this.clientId)
        .then((response) => {
          this.setState({
            ...this.state,
            dietPlanFileName: response.data.data.diet_plan_file_name,
          });
        });
      }
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='half-container'>
            <img src={dietImg} />
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
