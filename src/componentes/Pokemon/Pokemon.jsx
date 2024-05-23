import style from '../Pokemon/Style Pokemon/Pokemon.module.css'
const Pokemon = ({name}) =>{
    return(
        <ul className={style.listaPokemon}>
            <li>{name}</li>
        </ul>
    );
}

export default Pokemon;