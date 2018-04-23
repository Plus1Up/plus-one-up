import React, { Component } from 'react';
import { clients } from 'services/api';
import {Tab, Tabs} from 'material-ui/Tabs';
import { RaisedButton } from 'material-ui';
import './styles.css';

import Page from 'components/Page';
import DoneTraining from 'views/Coach/Clients/ClientInfo/DoneTraining';
import Trainings from 'views/Coach/Clients/ClientInfo/Trainings';
import Diet from 'views/Coach/Clients/ClientInfo/Diet';


const styles = {
  button: {
    marginTop: 5,
    marginBottom: 10,
    minWidth: 170,
  },
  tabtab: {
    backgroundColor: '#E53935',
  },
};

class ClientInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        'id':'',
        'coach_id':'',
        'mail_address':'',
        'password':'',
        'name':'',
        'last_name':'',
        'is_pending':'',
        'is_active':'',
        'created_at':'',
        'updated_at':''
      },
      error: '',
    };
  }

  componentDidMount() {
    if(this.clientId) {
      clients.get(this.clientId)
        .then(response => {
          this.setState({
            ...this.state,
            data: response.data.data
          });
        })
      }
  }

  onHandleClickT = () => {
    clients.put(this.clientId, {
      is_active: 'true'
    })
    .then((response) => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  onHandleClickF = () => {
    clients.put(this.clientId, {
      is_active: 'false'
    })
  }

  get clientId() {
    return this.props.match.params.id;
  }


  render() {
    const isActive = this.state.data.is_active;
    const isPending = this.state.data.is_pending;
    return (
      <Page>
        <div className='client-info-wrapper'>
          <div>
          <div className='client-info'>
            <div className='usr-picture'>
              <img src='../../../assets/images/avatar.png' />
            </div>
            <div>
              <p>{this.state.data.name} {this.state.data.last_name}</p>
              <p>{this.state.data.mail_address}</p>
              <div>
                {isActive ? (
                  <RaisedButton onClick={this.onHandleClickF} label='Blokuj' />
                ) : (
                  <RaisedButton onClick={this.onHandleClickT} label='Odblokuj' />
                )}

              </div>
            </div>
          </div>
          </div>
          <div>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              className='tabstabs'
              inkBarStyle={{backgroundColor: '#ffffff'}} >
              <Tab label='Odbyte treningi' value='a' style={styles.tabtab}>
                <DoneTraining />
              </Tab>
              <Tab label='Treningi' value='b' style={styles.tabtab} >
                <Trainings />
              </Tab>
              <Tab label='Dieta' value='c' style={styles.tabtab} >
                <Diet />
              </Tab>
              <Tab label='Ustawienia' value='d' style={styles.tabtab} >

              </Tab>
            </Tabs>
          </div>
        </div>
      </Page>
      )
  }
}

export default ClientInfo;
