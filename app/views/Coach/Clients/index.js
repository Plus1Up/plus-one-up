import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import InfoIcon from 'material-ui-icons/Info';

import axios from 'config/axios';
import avatarImg from "assets/images/avatar.png";
import Page from 'components/Page';
import './index.css';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 'auto',
    height: 'auto',
    overflowY: 'auto',
  },
  tabtab: {
    backgroundColor: '#E53935',
  },
  cancelbtn: {
    color: "#A9A9A9"
  },
};

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeClientsList: [],
      pendingClientsList: [],
      blockedClientsList: [],
    };
  }

  componentDidMount() {
    axios
      .get('/clients?is_active=true')
      .then(response => {
        console.log(response);
        this.setState({
          activeClientsList: response.data.data,
        })
      })
      .catch(error =>
        console.log('error',error)),
    axios
      .get('/clients?is_pending=true')
      .then(response => {
        console.log(response);
        this.setState({
          pendingClientsList: response.data.data,
        })
      })
      .catch(error =>
        console.log('error',error)),
    axios
      .get('/clients?is_active=false')
      .then(response => {
        console.log(response);
        this.setState({
          blockedClientsList: response.data.data,
        })
      })
      .catch(error =>
        console.log('error',error))
  }

  render() {
    return (
      <MuiThemeProvider>
      <Page>
      <div className='clients-wrapper'>
        <h1 id='inline1'>KLIENCI</h1>
          <Link to={"/coach/clients/add_client"}>
            <RaisedButton id='inline2'
              label='Dodaj klienta'
              labelPosition='before'
              backgroundColor='#E53935'
              labelColor='#FFFFFF'
            />
          </Link>
          <Tabs inkBarStyle={{backgroundColor: '#ffffff'}}>
            <Tab label='Aktywni' style={styles.tabtab}>
            <div style={styles.root}>
              <GridList
                cellHeight={250}
                style={styles.gridList}
                cols={6}
              >
                <Subheader>Aktywni klienci</Subheader>
                {this.state.activeClientsList.map((tile) => (
                  <Link to={"/coach/clients/"+tile.id} key={tile.id} >
                    <GridTile
                      title={<span>{tile.name} {tile.last_name}</span>}
                      subtitle={<span>ostatni trening: <b>{tile.updated_at}</b></span>}
                      actionIcon={<IconButton><InfoIcon /></IconButton>}
                    >
                      <img src={avatarImg} />
                    </GridTile>
                  </Link>
                ))}
              </GridList>
            </div>
            </Tab>
            <Tab label='Oczekujący' style={styles.tabtab} >
            <div style={styles.root}>
              <GridList
                cellHeight={250}
                style={styles.gridList}
                cols={6}
              >
                <Subheader>Oczekujący klienci</Subheader>
                {this.state.pendingClientsList.map((tile) => (
                  <GridTile
                    key={tile.id}
                    title={<span>{tile.name} {tile.last_name}</span>}
                    actionIcon={<FlatButton label='Anuluj zaproszenie' fullWidth={true} style={styles.cancelbtn} />}
                  >
                    <img src={avatarImg} />
                  </GridTile>
                ))}
              </GridList>
            </div>
            </Tab>
            <Tab label='Zablokowani' style={styles.tabtab} >
            <div style={styles.root}>
              <GridList
                cellHeight={250}
                style={styles.gridList}
                cols={6}
              >
                <Subheader>Zablokowani klienci</Subheader>
                {this.state.blockedClientsList.map((tile) => (
                  <Link to={"/coach/clients/"+tile.id} key={tile.id} >
                    <GridTile
                      title={<span>{tile.name} {tile.last_name}</span>}
                      subtitle={<span>zablokowany: <b>{tile.updated_at}</b></span>}
                      actionIcon={<IconButton><InfoIcon /></IconButton>}
                    >
                      <img src={avatarImg} />
                    </GridTile>
                  </Link>
                ))}
              </GridList>
            </div>
            </Tab>
          </Tabs>
      </div>
      </Page>
      </MuiThemeProvider>
    )
  }
}

export default Clients;