import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, DropDownMenu, MenuItem} from 'material-ui';
import {Link} from 'react-router-dom';
import './styles.css';

import Page from 'components/Page';

class DoneTraining extends Component {
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
                <TableHeaderColumn>Data</TableHeaderColumn>
                <TableHeaderColumn>Nazwa treningu</TableHeaderColumn>
                <TableHeaderColumn>Kategoria ćwiczeń</TableHeaderColumn>
                <TableHeaderColumn>Czas trwania</TableHeaderColumn>
                <TableHeaderColumn>Cardio</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow hoverable={true}>
                <TableRowColumn>2018-04-04</TableRowColumn>
                <TableRowColumn>FBW</TableRowColumn>
                <TableRowColumn>Biceps</TableRowColumn>
                <TableRowColumn>120min</TableRowColumn>
                <TableRowColumn>Bieg</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default DoneTraining;
