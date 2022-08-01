export function validateRecipe(recipe) {
    recipe.ingredients = recipe.ingredients.filter(i => i.ingredient.length > 0);
    recipe.methods = recipe.methods.filter(i => i.method.length > 0);


    let errors = [];
    if (recipe.name.length < 1)
        errors.push({ message: 'Please, give your recipe a name.' });
    if (Number(recipe.numberOfServings) === 0)
        errors.push({ message: 'Number of servings cannot be zero.' });
    if (Number(recipe.numberOfServings) > 100)
        errors.push({ message: 'Number of servings cannot be more than 100.' });
    if (recipe.category.length < 1)
        errors.push({ message: 'Please, select category.' });
    if (recipe.ingredients.length < 1)
        errors.push({ message: 'Please, include at least 1 ingredient.' });
    if (recipe.methods.length < 1)
        errors.push({ message: 'Please, include at least 1 preparation step.' });

    if (errors.length > 0)
        return errors;
    else return null;
}