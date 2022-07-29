import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleRecipe, publishRecipe } from "../../services/recipeService";
import { Input } from '../public/common/input';
import { FormSelectCategory } from "./formSelectCategory";
import { FormDynamicFields } from "./formDynamicFields";

export function RecipeForm() {
    const params = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        name: '',
        numberOfServings: 1,
        ingredients: [],
        methods: [],
        category: ''
    });

    useEffect(() => {
        async function getData() {
            if (params.recipeId === 'new') return;
            const result = await getSingleRecipe(params.recipeId);
            if (result.error) navigate('/notFound', { replace: true });
            else return result;
        }
        getData().then(result => setRecipe(mapToViewModel(result))).catch(ex => { });
    }, [])

    function mapToViewModel(recipe) {
        return {
            name: recipe.name,
            numberOfServings: recipe.numberOfServings,
            ingredients: recipe.ingredients,
            methods: recipe.methods,
            category: recipe.category.name
        }
    }

    const handleChange = (e) => setRecipe(state => ({ ...state, [e.target.name]: e.target.value }));

    const handleFieldChange = (index, e) => {
        let data;
        if (e.target.name === 'ingredient') data = [...recipe.ingredients];
        else if (e.target.name === 'method') data = [...recipe.methods];
        data[index][e.target.name] = e.target.value;
        setRecipe(state => ({ ...state, [`${e.target.name}s`]: data }));
    }
    function addField(e) {
        let data = [];
        if (e.target.name === 'ingredient') data = [...recipe.ingredients];
        else if (e.target.name === 'method') data = [...recipe.methods];
        data.push({ id: !data.length ? 0 : data[data.length - 1].id + 1, [e.target.name]: '' });
        setRecipe(state => ({ ...state, [`${e.target.name}s`]: data }));
    }
    function removeField(index, e) {
        let data = [];
        if (e.target.name === 'ingredient') data = [...recipe.ingredients];
        else if (e.target.name === 'method') data = [...recipe.methods];
        data.splice(index, 1);
        setRecipe(state => ({ ...state, [`${e.target.name}s`]: data }));
    }
    async function recipeFormSubmit(e) {
        e.preventDefault();
        await publishRecipe(recipe);
        navigate(`/${params.user}`)
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
                    value={Math.abs(recipe.numberOfServings)}
                    onChange={handleChange}
                />
                <FormSelectCategory
                    value={recipe.category}
                    onChange={handleChange}
                />
                <FormDynamicFields
                    path={params.recipeId}
                    label='Ingredients'
                    fields={recipe.ingredients}
                    fieldName='ingredient'
                    onFieldChange={(e, index) => handleFieldChange(index, e)}
                    onFieldRemove={(e, index) => removeField(index, e)}
                    onFieldAdd={(e) => addField(e)}
                />
                <FormDynamicFields
                    path={params.recipeId}
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




// <h3>Ingredients</h3>

// {recipe.ingredients.map((field, index) => {
//     return (
//         <div className="row" key={field.id}>
//             <div className="col-md-9">
//                 <input
//                     name='ingredient'
//                     className="form-control"
//                     value={field['ingredient']}//.name(new) .ingredient(edit)
//                     onChange={(e) => handleFieldChange(index, e)}
//                 />
//             </div>
//             <div className="col-md-3">
//                 <button
//                     name='ingredient'
//                     onClick={(e) => removeField(index, e)}
//                     className="btn btn-primary mx-2 mb-2"
//                     form=''
//                 >Remove ingredient</button>
//             </div>
//         </div>
//     )
// })}

// <button
//     name='ingredient'
//     onClick={(e) => addField(e)}
//     className="btn btn-primary my-2"
//     form=''
// >
//     Add ingredient
// </button>