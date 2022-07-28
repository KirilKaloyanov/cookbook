import { useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from '../public/common/input';

export function RecipeForm() {
    const params = useParams();

    const [recipe, setRecipe] = useState({
        name: '',
        numberOfServings: '',
        ingredients: []

    });
    
    const handleChange = (e) => {
        setRecipe(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const handleIngredientChange = (index, event) => {
        let data = [...recipe.ingredients];
        data[index][event.target.name] = event.target.value;
        setRecipe(state => ({
            ...state,
            ingredients: data
        }));
    }

    const addIngredient = () => {
        let newField = {};
        setRecipe(state => ({
            ...state,
            ingredients: [...state.ingredients, newField]
        }));
    }

    const removeIngredient = (index) => {
        let data = [...recipe.ingredients];
        data.splice(index, 1);
        setRecipe(state => ({
            ...state,
            ingredients: data
        }));
    }

    return (
        <>
            {params.recipeId === 'new' && <h2> New Recipe </h2>}
            {params.recipeId !== 'new' && <h2> Edit Recipe </h2>}
            <Input
                label='Name'
                name='name'
                value={recipe.name}
                onChange={handleChange}
            />
            <Input
                label='Number of servings'
                name='numberOfServings'
                type='number'
                value={recipe.numberOfServings}
                onChange={handleChange}
            />

            <h3>Ingredients</h3>
            {recipe.ingredients.map((input, index) => {
                return (
                    <div className="row" key={index}>
                        <div className="col-md-9">
                            <input 
                                name='ingredient'
                                className="form-control" 
                                value={input.name}
                                onChange={event => handleIngredientChange(index, event)}
                            />
                        </div>
                        <div className="col-md-3">
                            <button 
                                onClick={() => removeIngredient(index)} 
                                className="btn btn-primary mx-2 mb-2" 
                            >Remove ingredient</button>
                        </div>
                    </div>
                )
            })}
            <button onClick={addIngredient}className="btn btn-primary my-2" >Add ingredient</button>
        </>
    );
}