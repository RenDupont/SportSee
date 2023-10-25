import Classes from './Macronutrient.module.css';


function Macronutrient({img, value, type}) {

    return (
        <div className={Classes.macronutrient}>
            <img src={img} alt={type} />
            <div>
                <h1>{value}</h1>
                <h2>{type}</h2>
            </div>
        </div>
    );
}

export default Macronutrient;