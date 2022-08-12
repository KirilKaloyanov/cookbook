import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserRecipe, publishRecipe } from "../../../services/recipeService";
import { Input } from '../../common/input';
import { FormSelectCategory } from "./formSelectCategory";
import { FormDynamicFields } from "./formDynamicFields";
import { validateRecipe } from "./validateRecipe";
import { useEnableButton } from "../../../hooks/useEnableButton";
import styles from './recipeForm.module.css'

export function RecipeForm() {
    const params = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);
    const { isButtonEnabled, enableButton, disableButton } = useEnableButton();

    const isRecipeNew = params.recipeId === 'new';

    const [recipe, setRecipe] = useState({
        name: '',
        numberOfServings: 0,
        ingredients: [{ id: 0, ingredient: '' }],
        methods: [{ id: 0, method: '' }],
        category: ''
    });

    useEffect(() => {
        if (isRecipeNew) return;
        getUserRecipe(params.recipeId)
            .then(result => {
                if (result.error || result.message) navigate('/notFound', { replace: true });
                else setRecipe({
                    _id: result._id,
                    name: result.name,
                    numberOfServings: result.numberOfServings,
                    ingredients: result.ingredients,
                    methods: result.methods,
                    category: result.category.name
                })
            }).catch(ex => { });
    }, [navigate, params.recipeId, isRecipeNew])

    const handleChange = (e) => {
        enableButton();
        setRecipe(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const handleFieldChange = (e, action, index) => {
        enableButton();
        let data;
        if (e.target.name === 'ingredient') data = [...recipe.ingredients];
        else if (e.target.name === 'method') data = [...recipe.methods];
        if (action === 'change') data[index][e.target.name] = e.target.value;
        if (action === 'remove') data.splice(index, 1);
        if (action === 'add')
            data.push({ id: !data.length ? 0 : data[data.length - 1].id + 1, [e.target.name]: '' });
        setRecipe(state => ({ ...state, [`${e.target.name}s`]: data }));
    }
    async function recipeFormSubmit(e) {
        e.preventDefault();
        disableButton();
        setErrors(validateRecipe(recipe));
        if (validateRecipe(recipe)) {
            if (recipe.ingredients.length === 0) recipe.ingredients.push({ id: 0, ingredient: '' });
            if (recipe.methods.length === 0) recipe.methods.push({ id: 0, method: '' });
            return;
        } else {
            await publishRecipe(recipe);
            navigate(`/${params.user}`);
        }
    }

    const onClose = () => navigate(`/${params.user}`);

    return (
        <div className={styles.recipeForm}>
            {!isRecipeNew && recipe.numberOfServings !== 0
                ? <h2> Edit {recipe.name} </h2>
                : !isRecipeNew && <h2> Loading recipe ... </h2>
            }
            {isRecipeNew && <h2> New Recipe </h2>}
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
                    onFieldChange={(e, action, index) => handleFieldChange(e, action, index)}
                />
                <FormDynamicFields
                    label='Methods'
                    fields={recipe.methods}
                    fieldName='method'
                    onFieldChange={(e, action, index) => handleFieldChange(e, action, index)}
                />
                <br />
                {errors && errors.map((e, i) => <div className='alert alert-warning' key={i}>{e.message}</div>)}
                {
                    !isButtonEnabled
                        ? <button disabled className="btn btn-primary my-2">Saving recipe ...</button>
                        : <button type='submit' className='btn btn-primary' onClick={recipeFormSubmit}>Save recipe</button>
                }
                <button className="btn btn-light m-2" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

