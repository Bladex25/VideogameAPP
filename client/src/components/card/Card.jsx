import { Link } from "react-router-dom";
import "./card.styles.css";

function Card(props)  {

   
  return (
    <div className="card-container">
    <div className="card">
        <Link to={`/detail/${props.id}`}>
        <img src={props.image} alt={props.name} /> 
      </Link>
      <div>
        <Link to={`/detail/${props.id}`}>
        <h2 className="card-title">{props.name}</h2>
       </Link>
      {props.genres.map((genre, index) => (
    <p className="card-text" key={index}> 
        {typeof genre === 'object' ? genre.name : genre}
    </p>
    
))}
      </div>
      
    </div>

    
    </div>
  );
}

export default Card;