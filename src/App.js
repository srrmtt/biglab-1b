// import './App.css';
import React from "react";
import {NavBar} from './NavBar';
import {Sidebar} from "./Sidebar";
import {Content} from "./Content"
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'
import { useState } from "react";
import {library} from "./Film";

function App() {
  const filters = ['All', 'Favorites', 'Best Rated', 'Seen Last Month', 'Unseen'];
  const [filter, setFilter] = useState(filters[0]);
 
  
  return (
    <div className="App">
      <NavBar />
      <div className="container-fluid">
        <div className="row vheight-100">
          <Sidebar currFilter={filter} setFilter={setFilter} filters={filters}/>
          <Content films={library.list} filter={filter} filters={filters}/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
