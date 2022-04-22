// import './App.css';
import React from "react";
import {NavBar} from './NavBar';
import {Sidebar} from "./Sidebar";
import {Content} from "./Content"
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'
import { useState } from "react";
import {library} from "./Film";
import dayjs from "dayjs";

function App() {
  const [filter, setFilter] = useState('all');
 
  

  return (
    <div className="App">
      <NavBar />
      <div className="container-fluid">
        <div className="row vheight-100">
          <Sidebar currFilter={filter} setFilter={setFilter}/>
          <Content films={library.list} filter={filter}/>
        </div>
      </div>
    </div>
  );
}

export default App;
