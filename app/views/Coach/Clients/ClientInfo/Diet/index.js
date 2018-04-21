import React, {Component} from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, DropDownMenu, MenuItem, RaisedButton} from 'material-ui';
import {Link} from 'react-router-dom';
import './styles.css';

import Page from 'components/Page';

class Diet extends Component {
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
          <div className='half-container'>
            <img src='../../../assets/images/diet.png' />
          </div>
          <div className='half-container'>
          <RaisedButton label='Pobierz plan' className='plan-btn'></RaisedButton>
          <RaisedButton label='Usuń plan' className='plan-btn'></RaisedButton>
          <RaisedButton label='Nowy plan' className='plan-btn'></RaisedButton>
          </div>
        </div>
      </div>
    )
  }
}

export default Diet;
