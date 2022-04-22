import React from "react";
import './custom.css'



function Sidebar(props){
  
  
  function all(){
    props.setFilter('all');
  }

  function filterFavorite(){
    console.log("filtering...");
    props.setFilter('favorite');
    //setFilms(list.filter( (f) => f.favorite == true ));
  }

  function filterBestRated(){
    props.setFilter('bestRated');
    //setFilms(list.filter( (f) => f.rating == 5));
  }

  function filterSeenLastMonth(){
    props.setFilter('seenLastMonth');
    //setFilms(list.filter( (f) => f.watchDate >= dayjs().subtract(1, 'month')));
  }

  function filterUnseen(){
    props.setFilter('unseen');
    //setFilms(list.filter( f => f.watchDate == ''));
  }  
  return(
        <aside className="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
          <div className="list-group list-group-flush">
            <button id="filter-all" className="list-group-item list-group-item-action " onClick={ () => all()}>All</button>
            <button id="filter-favorites" className="list-group-item list-group-item-action" onClick={ () => {filterFavorite()}}>Favorites</button>
            <button id="filter-best" className="list-group-item list-group-item-action" onClick={ () => {filterBestRated()}}>Best Rated</button>
            <button id="filter-seen-last-month"className="list-group-item list-group-item-action" onClick={ () => {filterSeenLastMonth()}}>Seen Last Month</button>
            <button id="filter-unseen" className="list-group-item list-group-item-action" onClick={ () => filterUnseen()}>Unseen</button>
          </div>
        </aside>
    );
}

export {Sidebar};