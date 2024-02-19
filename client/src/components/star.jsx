import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const StarRating = (props) => {
    console.log(props.rating);  // Imprime el rating en la consola

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= props.rating) {
            stars.push(<BsStarFill />);
        } else if (i === Math.ceil(props.rating) && !Number.isInteger(props.rating)) {
            stars.push(<BsStarHalf />);
        } else {
            stars.push(<BsStar />);
        }
    }

    return <>{stars}</>;
};

export default StarRating;