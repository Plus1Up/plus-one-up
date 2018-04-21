import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Views
import MainPage from 'views/Coach/MainPage';
import Clients from 'views/Coach/Clients';
import ClientAdd from 'views/Coach/Clients/ClientAdd';
import ClientInfo from 'views/Coach/Clients/ClientInfo';
import ExerciseList from 'views/Coach/ExerciseList';

const Views = (props) => {
  return (
    <Switch>
      <Route exact path ='/coach' component={MainPage} />
      <Route exact path='/coach/clients' component={Clients} />
      <Route path='/coach/clients/add_client' component={ClientAdd} />
      <Route path='/coach/clients/:id' component={ClientInfo} />
      
      <Route path='/coach/exercises' component={ExerciseList} />
    </Switch>
  )
};

export default Views;