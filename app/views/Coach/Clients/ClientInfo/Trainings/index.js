import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, DropDownMenu, MenuItem} from 'material-ui';
import {Link} from 'react-router-dom';
import './styles.css';

import Page from 'components/Page';

class Trainings extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className='container'>
          <Table displaySelectAll={false} selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Nr tygodnia</TableHeaderColumn>
                <TableHeaderColumn>Poniedziałek</TableHeaderColumn>
                <TableHeaderColumn>Wtorek</TableHeaderColumn>
                <TableHeaderColumn>Środa</TableHeaderColumn>
                <TableHeaderColumn>Czwartek</TableHeaderColumn>
                <TableHeaderColumn>Piątek</TableHeaderColumn>
                <TableHeaderColumn>Sobota</TableHeaderColumn>
                <TableHeaderColumn>Niedziela</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow hoverable={true}>
                <TableRowColumn>16</TableRowColumn>
                <TableRowColumn>FBW</TableRowColumn>
                <TableRowColumn>Cardio</TableRowColumn>
                <TableRowColumn>FBW</TableRowColumn>
                <TableRowColumn>Cardio</TableRowColumn>
                <TableRowColumn>FBW</TableRowColumn>
                <TableRowColumn>Bieg</TableRowColumn>
                <TableRowColumn>Bieg</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Trainings;
