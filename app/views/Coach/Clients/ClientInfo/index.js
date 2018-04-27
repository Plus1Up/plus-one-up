import React, { Component } from 'react';
import { clients } from 'services/api';
import {Tab, Tabs} from 'material-ui/Tabs';
import { RaisedButton, FlatButton, Dialog } from "material-ui";
import {Link} from "react-router-dom";
import './styles.css';

import Page from 'components/Page';
import DoneTraining from 'views/Coach/Clients/ClientInfo/DoneTraining';
import Trainings from 'views/Coach/Clients/ClientInfo/Trainings';
import Diet from 'views/Coach/Clients/ClientInfo/Diet';
import avatarImg from "assets/images/avatar.png";

const styles = {
  button: {
    marginTop: 5,
    marginBottom: 10,
    minWidth: 170,
  },
  tabtab: {
    backgroundColor: "#E53935",
  },
  dialog: {
    width: 500,
    maxWidth: "none",
  },
  flatbtn: {
    color: "#000000"
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
      open: false,
      error: '',
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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

  onHandleClick = () => {
    if (!this.state.data.is_active) {
      clients.put(this.clientId, {
        is_active: 'true'
      }).then(() => {
        this.props.history.push("/coach/clients");
      })
    } else {
      clients.put(this.clientId, {
        is_active: 'false'
      }).then(() => {
        this.props.history.push("/coach/clients");
      })
    }
    this.setState({open: false});
  }

  get clientId() {
    return this.props.match.params.id;
  }

  render() {
    const isActive = this.state.data.is_active;
    const actions = [
      <FlatButton
        label="Anuluj"
        onClick={this.handleClose}
        styles={styles.flatbtn}
      />,
      <FlatButton
        label="Tak"
        onClick={this.onHandleClick}
        styles={styles.flatbtn}
      />,
    ];
    return (
      <Page>
        <div className='client-info-wrapper'>
          <div>
          <div className='client-info'>
            <div className='usr-picture'>
              <img src={avatarImg} />
            </div>
            <div>
              <p>{this.state.data.name} {this.state.data.last_name}</p>
              <p>{this.state.data.mail_address}</p>
              {isActive ?
                <div>
                  <RaisedButton label="Blokuj" onClick={this.handleOpen} />
                  <Dialog
                    title="Blokowanie klienta"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={styles.dialog}
                  >
                    Czy na pewno chcesz zablokować tego klienta?
                  </Dialog>
                </div>
                :
                <div>
                  <RaisedButton label="Odblokuj" onClick={this.handleOpen} />
                  <Dialog
                    title="Odblokowanie klienta"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={styles.dialog}
                  >
                    Czy na pewno chcesz odblokować tego klienta?
                  </Dialog>
              </div>}
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
                <DoneTraining id={this.clientId} />
              </Tab>
              <Tab label='Treningi' value='b' style={styles.tabtab} >
                <Trainings id={this.clientId} />
              </Tab>
              <Tab label='Dieta' value='c' style={styles.tabtab} >
                <Diet id={this.clientId} />
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
