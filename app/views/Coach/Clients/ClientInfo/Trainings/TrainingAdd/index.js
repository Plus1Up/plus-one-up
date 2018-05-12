import React, {Component} from "react";
import {DropDownMenu, MenuItem, RaisedButton, TextField} from "material-ui";
import "./styles.css";
import { trainings } from "services/api";

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
    margin: 10,
  }
};

class TrainingAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        id: "",
        name: "",
        weekday: "",
      },
      clientId: this.props.clientId,
    };
  }

  componentDidMount() {
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ form: {
      ...this.state.form,
      [name]: value,
    }});
  }

  onHandleClick = () => {
    trainings.new(this.state.clientId, this.state.form)
      .then((response) => this.setState({
        ...this.state,
      }));
    alert("Trening został dodany.");
  }

  render() {
    return (
      <Form>
        <p>Dodaj trening{this.state.form.id}</p>
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
        <div className="smart">
          <RaisedButton style={styles.editButton} label="Dodaj" onClick={this.onHandleClick} />
        </div>
      </Form>
    );
  }
}

export default TrainingAdd;
