import dayjs from "dayjs";
import './custom.css'
import {Form, Button} from 'react-bootstrap';
import {useState} from 'react';
import {Film, library} from './Film';
import { Alert } from "bootstrap";
function validateFilmForm(){
    return [true, ''];
}
function getLastId(films){
    return films.map((e) => e.id).reduce((id1, id2) => id1 > id2 ? id1 : id2);
}


function InputForm(props){

    const [errorMsg, setErrorMsg] = useState('');
    const [filmTitle, setFilmTitle] = useState('');
    const [filmFavorite, setFilmFavorite] = useState(false);
    const [filmRating, setFilmRating] = useState(0);
    const [filmDate, setFilmDate] = useState('');

    const submitFilm = (event) => {
        console.log("adding film...");
        console.log(filmRating);
        event.preventDefault();

        // validation
        const [ok, err] = validateFilmForm();
        const date = filmDate === '' ? '' : dayjs(filmDate); 
        const rating = filmRating === '' ? '' : filmRating;
        if(ok){
            const newId = getLastId(props.films) + 1;

            console.log(filmDate);
            console.log("last ID" , newId);
            const newFilm = new Film(newId,
                           filmTitle,
                            filmFavorite,
                            date,
                            filmRating
            );
            props.addFilm(newFilm);
        }else{
            setErrorMsg(err);
        }

    }
    return ( props.clicked &&
        <>
            {errorMsg ? <Alert variant='danger' onClose={()=> setErrorMsg('')} dismissible/> : false}
            <Form>
                <Form.Group className='mb-3' controlId="formBasicInput">
                    <Form.Label>Film Title</Form.Label>
                    <Form.Control type='text' placeholder='Insert the film title' value={filmTitle} onChange={ev => setFilmTitle(ev.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Check type='checkbox' label='Favorite' value={filmFavorite} onChange={ev => setFilmFavorite(ev.target.checked)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rating (optional)</Form.Label>
                    <Form.Control type='number' min='0' max='5' placeholder='Insert your rating for the film' value={filmRating} onChange={ev => setFilmRating(ev.target.value)}/>

                    <Form.Label>Watch Date</Form.Label>
                    <Form.Control type='date' placeholder='Insert the date when you watched the film' value={filmDate} onChange={ev => setFilmDate(ev.target.value)}/>
                </Form.Group>
                
                <Button variant="primary" type="submit" onClick={submitFilm}>
                    Add Film
                </Button>
                
                
            </Form>
        </>
    );

}
function Content(props){
    const title = props.filter;

    const [clicked, setClicked] = useState(false);
    const [films, setFilms] = useState(props.films);

    function addFilm(film) {
        setFilms( oldFilms => [...oldFilms , film]);
    }
    function deleteFilm(id) {
        console.log("id",id);
        setFilms( films.filter( (film) => film.id !== id ));
    }
    const showForm = () => {
        console.log("new state: ", clicked);
        setClicked(!clicked);
    }
    
    return (
        <main className="col-md-9 col-12 below-nav">
            <h1 className="mb-2" id="filter-title">{title}</h1>

            <FilmList filter={props.filter} filters={props.filters} films={films} deleteFilm={deleteFilm}/>
            <InputForm clicked={clicked} films={films} addFilm={addFilm}/>
            <button type="button" onClick={() => showForm()}className="btn btn-lg btn-primary fixed-right-bottom">&#43;</button>
            
        </main>
    )
}

function FilmList(props){
    let filteredFilms = [];

    switch (props.filter) {
        case props.filters[0]:
          filteredFilms = props.films;
          break;
        case props.filters[1]:
          filteredFilms =  props.films.filter( (f) => f.favorite === true );
          break;
        case props.filters[2]:
          filteredFilms =  props.films.filter( (f) => f.rating === 5);
          break;
        case props.filters[3]:
          filteredFilms =  props.films.filter( f => f.watchDate >= dayjs().subtract(1, 'month'));
          break;
        case props.filters[4]:
          filteredFilms =  props.films.filter( f => f.watchDate === '');
          break;
        default:
          console.log("Unexpected Filter selected");
          break;
      }
    return (
        <ul className="list-group list-group-flush" id="list-films">
            {
                filteredFilms.map((film) => <FilmRow film={film} key={film.id} deleteFilm={props.deleteFilm}/>)
            }
        </ul>
    );
}

function FilmRow(props){
    const [isNewRating, setRating] = useState(false);

    
    function editRatings(newRating){
        console.log("new Rating: ",newRating, " for film: ", props.film.id);
        setRating(true);
        props.film.rating = newRating;
    }

     
    return (
        <li className="list-group-item" id={props.film.id}>
            <div className="d-flex w-100 justify-content-between">
                <span className="rating text-end col-md-1 col-3 trash-bin">
                    <TrashBin filmID = {props.film.id} deleteFilm={props.deleteFilm} />
                </span>
                <p className= "text-start col-md-3 col-3">{props.film.title} </p>
                <span className="custom-control custom-checkbox col-md-1 col-3">
                    <input type="checkbox" className="custom-control-input" id={"check-"+props.film.id} checked={props.film.favorite} />
                    <label className= {"custom-control-label" + (props.film.favorite ? " favorite" : "")} htmlFor={"check-"+props.film.id}>Favorite</label>
                </span>
                <small className="watch-date col-md-3 col-3"> {props.film._formatWatchDate('LL') }</small> 
                <span className="rating text-end col-md-3 col-3">
                    <FilmRating rating={props.film._formatRating()} editRatings={editRatings}/>
                </span>
            </div>
        </li>
    );
}

function FilmRating(props){
    let blank_stars;
    let full_stars;
   
    if(props.rating === '<not assigned>'){
        blank_stars = 5;
        full_stars = 0;
    }else{
        full_stars = props.rating;
        blank_stars =  5 - props.rating;
    }
    
    let stars = [];
    
    for (let i = 0; i < full_stars; i++) {
        stars.push(<FullStar editRatings={props.editRatings} position={i+1}/>);
    }
    for (let i = 0; i < blank_stars; i++){
        stars.push(<EmptyStar editRatings={props.editRatings} position={i+1 + full_stars}/>);
    }
    return stars;
}

function FullStar(props){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16" onClick={() => props.editRatings(props.position)}>
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    );
}

function EmptyStar(props){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgrey" className="bi bi-star empty-star" viewBox="0 0 16 16" onClick={() => props.editRatings(props.position)}>
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    );
}
function TrashBin(props){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash trash-bin" viewBox="0 0 16 16" onClick={() => props.deleteFilm(props.filmID) }>
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    );
}
export {Content, InputForm};