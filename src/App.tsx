import React from 'react';
import logo from './logo.svg';
import './App.css';
import Widget from './components/Widgets/Widget';
import ProjectData, { Widget as WidgetType, ImageData } from './interfaces/ProjectData';
import Project from './Project';
import { GridList, GridListTile, GridListTileBar, IconButton, ListSubheader } from '@material-ui/core';

const projectList = require('./projectList.json');
var content = require('./projects/3D-From-Scratch/content.json')
//'./projects/3D-From-Scratch/content.json'
console.log(content)

interface oldContent {
  src?: string,
  header?: string,
  description?: string,
}

interface oldProject {
  name: string,
  description: string,
  contents: oldContent[],
  languages?: string[],
  gitHubLink?: string
}

function convertToNew({ name, description, gitHubLink, contents, languages }: oldProject, path: string): ProjectData {
  return {
    name, description,
    images: contents.map(({ header, description, src }) => ({ title: header, description, path: path + "/" + src } as ImageData))
  }
}

console.log(projectList)

var projects: ProjectData[] = projectList.map(({ path, old }: any) => old
  ? convertToNew(require(path + "/content.json"), path)
  : require(path + "/projectView.json"));

console.log(projects)
function App() {
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


  var projectCompoents = projects.map(project => <Project data={project} />)
  return (
    <div className="App">
      <header className="App-header">
        <Widget widget={home} />
        <div style={{
          marginLeft: "30%", marginRight: "30%",
          width: "90%"
        }}>
          <GridList cellHeight={300} cols={3} >
            {projects.map((project) => (
              <GridListTile  cols={1}>
                <Project data={project} />
              </GridListTile>

            ))}
          </GridList>
        </div>
      </header>
    </div>
  );
}

export default App;
