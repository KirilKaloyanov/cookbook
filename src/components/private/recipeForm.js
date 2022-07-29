import { useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from '../public/common/input';
import { FormDynamicFields } from "./formDynamicFields";

export function RecipeForm() {
    const params = useParams();

    const [recipe, setRecipe] = useState({
        name: '',
        numberOfServings: '',
        ingredients: [],
        methods: []
    });

    const handleChange = (e) => {
        setRecipe(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const handleFieldChange = (index, e) => {
        let data;
        if (e.target.name === 'ingredient') data = [...recipe.ingredients];
        else if (e.target.name === 'method') data = [...recipe.methods];
        data[index][e.target.name] = e.target.value;
        setRecipe(state => ({
            ...state,
            [`${e.target.name}s`]: data
        }));
    }

    function recipeFormSubmit(e) {
        e.preventDefault();
        console.log('Form Submitted', recipe);
    }

    function addField(e) {
        let data;
        if (e.target.name === 'ingredient') data = [...recipe.ingredients];
        else if (e.target.name === 'method') data = [...recipe.methods];
        data.push({ id: data.length });
        setRecipe(state => ({
            ...state,
            [`${e.target.name}s`]: data
        }));
    }

    const removeField = (index, e) => {
        let data = [];
        if (e.target.name === 'ingredient') data = [...recipe.ingredients];
        else if (e.target.name === 'method') data = [...recipe.methods];
        data.splice(index, 1);

        setRecipe(state => ({
            ...state,
            [`${e.target.name}s`]: data
        }));
    }

    return (
        <>
            {params.recipeId === 'new' && <h2> New Recipe </h2>}
            {params.recipeId !== 'new' && <h2> Edit Recipe </h2>}

            <form>
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

                <FormDynamicFields
                    label='Ingredients'
                    fields={recipe.ingredients}
                    fieldName='ingredient'
                    onFieldChange={(e, index) => handleFieldChange(index, e)}
                    onFieldRemove={(e, index) => removeField(index, e)}
                    onFieldAdd={(e) => addField(e)}
                />
                <FormDynamicFields
                    label='Methods'
                    fields={recipe.methods}
                    fieldName='method'
                    onFieldChange={(e, index) => handleFieldChange(index, e)}
                    onFieldRemove={(e, index) => removeField(index, e)}
                    onFieldAdd={(e) => addField(e)}
                />

                <button type='submit' className='btn btn-primary' onClick={recipeFormSubmit}>Submit</button>
            </form>

        </>
    );
}
                   