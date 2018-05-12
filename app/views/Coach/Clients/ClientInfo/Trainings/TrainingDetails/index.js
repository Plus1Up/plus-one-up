import React, {Component} from "react";
import {DropDownMenu, MenuItem, RaisedButton, TextField} from "material-ui";
import { trainings } from "services/api";
import {Popconfirm} from "antd";
import "./styles.css";

import Form from "components/FormElements/Form";

const hideAutoFillColorStyle = {
  WebkitBoxShadow: "0 0 0 1000px white inset"
};  
const hintStyle = { 
  zIndex: "1" 
};

const styles = {
  editButton: {
    width: 10,
    margin: 5,
  }
};

class TrainingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        id: "",
        name: "",
        weekday: "",
      },
      clientId: this.props.clientId,
      trainingId: this.props.training.id,
    };
  }

  componentDidMount() {
    trainings.get(this.state.clientId, this.state.trainingId)
      .then((response) => {
        this.setState({
          ...this.state,
          form: response.data.data
        });
      });
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ form: {
      ...this.state.form,
      [name]: value,
    }});
  }

  onHandleClick = () => {
    trainings.put(this.state.clientId, this.state.trainingId, this.state.form)
      .then((response) => this.setState({
        ...this.state,
      }));
    alert("Nowy został edytowany.");
  }

  onDelete(client, training) {
    trainings.delete(client, training)
      .then((response) => this.setState({
        ...this.state,
      }));
  }

  render() {
    return (
      <Form>
        <p>Identyfikator treningu: {this.state.form.id}</p>
        <TextField
          name="name"
          floatingLabelText="Nazwa treningu"
          value={this.state.form.name}
          fullWidth={true}
          floatingLabelFixed={true}
          onChange={this.onInputChange}
          hintStyle={hintStyle} 
        />
        <TextField
          name="weekday"
          floatingLabelText="Dzień tygodnia"
          value={this.state.form.weekday}
          fullWidth={true}
          floatingLabelFixed={true}
          onChange={this.onInputChange}
          hintStyle={hintStyle} 
        />
        <div>
          <RaisedButton style={styles.editButton} label="Edytuj" onClick={this.onHandleClick} />
          <RaisedButton style={styles.editButton} label="Usuń" onClick={() => this.onDelete(this.state.clientId, this.state.trainingId)} />
        </div>
      </Form>
    );
  }
}

export default TrainingDetails;
