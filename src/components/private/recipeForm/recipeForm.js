import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserRecipe, publishRecipe } from "../../../services/recipeService";
import { Input } from '../../public/common/input';
import { FormSelectCategory } from "./formSelectCategory";
import { FormDynamicFields } from "./formDynamicFields"; 
import { validateRecipe } from "./validateRecipe";
import styles from './recipeForm.module.css'

export function RecipeForm() {
    const params = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);
    const [recipe, setRecipe] = useState({
        name: '',
        numberOfServings: 1,
        ingredients: [{id: 0, ingredient: ''}],
        methods: [{id: 0, method: ''}],
        category: ''
    });

    useEffect(() => {
        async function getData() {
            if (params.recipeId === 'new') return;
            const result = await getUserRecipe(params.recipeId);
            if (result.error || result.message) navigate('/notFound', { replace: true });
            else return result;
        }
        getData().then(result => setRecipe(mapToViewModel(result))).catch(ex => { });
    }, [navigate, params.recipeId])

    function mapToViewModel(recipe) {
        return {
            _id: recipe._id,
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
        setErrors(validateRecipe(recipe));
        if (validateRecipe(recipe)) {
            if (recipe.ingredients.length === 0) recipe.ingredients.push({id: 0, ingredient: ''});
            if (recipe.methods.length === 0) recipe.methods.push({id: 0, method: ''});
            return;
        } else {
            await publishRecipe(recipe);
            navigate(`/${params.user}`);
        }
    }

    const onClose = () => navigate(`/${params.user}`);

    return (
        <div className={styles.recipeForm}>
            {params.recipeId === 'new' && <h2> New Recipe </h2>}
            {params.recipeId !== 'new' && <h2> Edit {recipe.name} </h2>}

            <form>
                <Input
                    label='Name'
                    name='name'
                    value={recipe.name}
                    onChange={handleChange}
                    autoFocus={true}
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
                <br />
                {errors && errors.map((e, i) => <div className='alert alert-warning' key={i}>{e.message}</div>)}
                <button type='submit' className='btn btn-primary' onClick={recipeFormSubmit}>Save recipe</button>
                <button className="btn btn-light m-2" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}


//

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