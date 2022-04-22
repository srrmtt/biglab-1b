import {Film} from "./Film";
import dayjs from "dayjs";
import './custom.css'
function Content(props){
    let films = [];
    let title;
    switch (props.filter) {
      case 'all':
        title = 'All';
        films = props.films;
        break;
      case 'favorite':
        title = 'Favorite(s)';
        films = props.films.filter( (f) => f.favorite == true );
        break;
      case 'bestRated':
        title = 'Best Rated';
        films = props.films.filter( (f) => f.rating == 5);
        break;
      case 'seenLastMonth':
        title = 'Seen last Month';
        films = props.films.filter( f => f.watchDate >= dayjs().subtract(1, 'month'));
        break;
      case 'unseen':
        title = 'Unseen';
        films = props.films.filter( f => f.watchDate == '');
        break;
      default:
        console.log("Unexpected Filter selected");
        break;
    }
    return (
        <main className="col-md-9 col-12 below-nav">
            <h1 className="mb-2" id="filter-title">{title}</h1>

            <FilmList films={films}/>
            <button type="button" className="btn btn-lg btn-primary fixed-right-bottom">&#43;</button>
        </main>
    )
}

function FilmList(props){
    return (
        <ul className="list-group list-group-flush" id="list-films">
            {
                props.films.map((film) => <FilmRow film={film} key={film.id} />)
            }
        </ul>
    );
}

function FilmRow(props){
    return (
        <li className="list-group-item" id={props.film.id}>
            <div className="d-flex w-100 justify-content-between">
                <p className= "text-start col-md-5 col-3">{props.film.title} </p>
                <span className="custom-control custom-checkbox col-md-1 col-3">
                    <input type="checkbox" className="custom-control-input" id={"check-"+props.film.id} checked={props.film.favorite} readOnly/>
                    <label className="custom-control-label" htmlFor={"check-"+props.film.id}>Favorite</label>
                </span>
                <small className="watch-date col-md-3 col-3"> {props.film._formatWatchDate('LL') }</small> 
                <span className="rating text-end col-md-3 col-3">
                    <FilmRating rating={props.film._formatRating()}/>
                </span>
            </div>
        </li>
    );
}

function FilmRating(props){
    let blank_stars;
    if(props.rating == '<not assigned>'){
        blank_stars = 5;
    }else{
        blank_stars =  5 - props.rating;
    }
    
    let stars = [];
    console.log(props.rating);
    for (let i = 0; i < props.rating; i++) {
        stars.push(<FullStar />);
    }
    for (let i = 0; i < blank_stars; i++){
        stars.push(<EmptyStar />);
    }
    return stars;
}

function FullStar(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    );
}

function EmptyStar(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgrey" className="bi bi-star" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    );
}

export {Content};