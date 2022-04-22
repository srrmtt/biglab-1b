import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavBar(propss){
    return (
        <nav className="navbar navbar-dark navbar-expand-md bg-primary fixed-top navbar-padding">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#left-sidebar" aria-controls="left-sidebar" aria-expanded="false" aria-label="Toggle sidebar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Logo />
            <SearchForm />
            <UserProfile />
        </nav>

    );
}
function Logo(propss){
    <a className="navbar-brand" href="index.html">
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-collection-play" viewBox="0 0 16 16">
          <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z"/>
          <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z"/>
        </svg>
        Film Library
    </a>
}
function SearchForm(props){
    return (
        <form className="form-inline my-2 my-lg-0 mx-auto d-none d-md-block" role="search" aria-label="Quick search">
            <input className="form-control me-md-2" type="search" placeholder="Search" aria-label="Search Query"/>
        </form>
    );
}

function UserProfile(props){
    return (
        <div className="navbar-nav ms-md-auto">
            <a href="index.html" className="nav-item nav-link" >
                <svg className="bi bi-people-circle" width="30" height="30" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
                    <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd"/>
                </svg>
            </a>
        </div>
    );
}

export {NavBar};