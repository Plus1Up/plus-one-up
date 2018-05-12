import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, DropDownMenu, MenuItem, RaisedButton} from "material-ui";
import {Link} from "react-router-dom";
import { trainings } from "services/api";
import "./styles.css";

import Page from "components/Page";
import TrainingDetails from "views/Coach/Clients/ClientInfo/Trainings/TrainingDetails";
import TrainingAdd from "views/Coach/Clients/ClientInfo/Trainings/TrainingAdd";

class Trainings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mondays: [],
      tuesdays: [],
      wednesdays: [],
      thursdays: [],
      fridays: [],
      saturdays: [],
      sundays: [],
      error: "",
      isEdited: false,
      add: false,
      trainingEdited: null,
    };
  }

  componentDidMount() {
      trainings.all(this.clientId)
        .then((response) => {
          this.setState({
            ...this.state,
            mondays: response.data.data.filter((day) => day.weekday === 0),
            tuesdays: response.data.data.filter((day) => day.weekday === 1),
            wednesdays: response.data.data.filter((day) => day.weekday === 2),
            thursdays: response.data.data.filter((day) => day.weekday === 3),
            fridays: response.data.data.filter((day) => day.weekday === 4),
            saturdays: response.data.data.filter((day) => day.weekday === 5),
            sundays: response.data.data.filter((day) => day.weekday === 6),
          });
        });
  }

  changeToEdit(training) {
    this.setState({
      isEdited: !this.state.isEdited,
      trainingEdited: training
    });
  }

  changeToAdd() {
    this.setState({
      add: !this.state.add,
    });
  }

  get clientId() {
    return this.props.id;
  }

  render() {
    if (this.state.isEdited) {
      return <div className="special-container">
        <RaisedButton className="special-btn" label="Powrót do listy" onClick={() => this.changeToEdit()} />
        <TrainingDetails className="training-container" clientId={this.props.id} training={this.state.trainingEdited} />
      </div>;
    }
    if (this.state.add) {
      return <div className="special-container">
        <RaisedButton className="special-btn" label="Powrót do listy" onClick={() => this.changeToAdd()} />
        <TrainingAdd className="training-container" clientId={this.props.id} />
      </div>;
    }
    return (
      <div>
        <div className='container'>
          <Table displaySelectAll={false} selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Poniedziałek</TableHeaderColumn>
                <TableHeaderColumn>Wtorek</TableHeaderColumn>
                <TableHeaderColumn>Środa</TableHeaderColumn>
                <TableHeaderColumn>Czwartek</TableHeaderColumn>
                <TableHeaderColumn>Piątek</TableHeaderColumn>
                <TableHeaderColumn>Sobota</TableHeaderColumn>
                <TableHeaderColumn>Niedziela</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow hoverable={true}>
                <TableRowColumn>
                {
                  this.state.mondays
                  .map((training) => 
                    <p className="training" key={training.id} onClick={() => this.changeToEdit(training)}>{training.name}</p>
                  )
                }
                </TableRowColumn>
                <TableRowColumn>
                {
                  this.state.tuesdays
                  .map((training) => 
                    <p className="training" key={training.id} onClick={() => this.changeToEdit(training)}>{training.name}</p>
                  )
                }
                </TableRowColumn>
                <TableRowColumn>
                {
                  this.state.wednesdays
                  .map((training) => 
                    <p className="training" key={training.id} onClick={() => this.changeToEdit(training)}>{training.name}</p>
                  )
                }
                </TableRowColumn>
                <TableRowColumn>
                {
                  this.state.thursdays
                  .map((training) => 
                    <p className="training" key={training.id} onClick={() => this.changeToEdit(training)}>{training.name}</p>
                  )
                }
                </TableRowColumn>
                <TableRowColumn>
                {
                  this.state.fridays
                  .map((training) => 
                    <p className="training" key={training.id} onClick={() => this.changeToEdit(training)}>{training.name}</p>
                  )
                }
                </TableRowColumn>
                <TableRowColumn>
                {
                  this.state.saturdays
                  .map((training) => 
                    <p className="training" key={training.id} onClick={() => this.changeToEdit(training)}>{training.name}</p>
                  )
                }
                </TableRowColumn>
                <TableRowColumn>
                {
                  this.state.sundays
                  .map((training) => 
                    <p className="training" key={training.id} onClick={() => this.changeToEdit(training)}>{training.name}</p>
                  )
                }
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Dodaj" onClick={() => this.changeToAdd()} />
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Trainings;
