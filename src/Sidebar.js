import './custom.css'


function Sidebar(props){
  
  /*
   stato per gestire il filtro attivo  
  */
  const handleClick = filterName => {
    console.log(filterName);
    props.setFilter(filterName);    
  }
  
  return(
        <aside className="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
          <div className="list-group list-group-flush">
            {
              [0, 1, 2, 3, 4].map( i => {
                return <Filter currActive={props.filter} name={props.filters[i]} handleClick={handleClick} key={i}/>;
              })
            }
          </div>
        </aside>
    );
}
/**
 * La componente Filter corrisponde a una entry nel menu della sidebar per selezionare il filtro da applicare
 * @param {*} props: filter corrisponde al filtro corrente, name corrisponde al nome del filtro 
 * @returns una componente costituita da un Button su cui è applicato l'onClick per selezionare il filtro.
 */
function Filter(props){
  return (
    <button className={"list-group-item list-group-item-action" + (props.filter === props.name ? " active " : "") } 
            onClick={ () => props.handleClick(props.name)}> 
          {props.name}
    </button>
  );
}

export {Sidebar};