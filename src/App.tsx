import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './Header';
import ProjectPage from './components/ProjectPage/ProjectPage';
import ContactPage from './components/ContactPage/ContactPage';
import ResumePage from './components/ResumePage/ResumePage';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: { type: 'dark',  }
});

function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
          <Header />
          <div className="App-header">


            <Switch>
              <Route path="/Projects/" exact>
                <ProjectPage />
              </Route>
              <Route path="/" exact>
                <ProjectPage />
              </Route>
              <Route path="/Contact/" exact>
                <ContactPage />
              </Route>
              <Route path="/Resume/" exact>
                <ResumePage />
              </Route>
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </Router >
  );
}

export default App;



/*

let home = {
    type: 'FlexPanel',
    data: {
      children: [
        {
          type: "Text",
          data: { text: "Hello World", variant: "h1" }
        },
        {
          type: "Text",
          data: { text: "Hello World", variant: "p" }
        },
        {
          type: "Image",
          data: { path: "favicon.ico" }
        }
      ]
    }
  } as WidgetType;

  const tileData: any = [
    {
      img: "favicon.ico",
      title: 'Image',
      author: 'author',
    },
  ];



   <Widget widget={home} />
  */