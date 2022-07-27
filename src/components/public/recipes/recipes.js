import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as recipeService from '../../../services/recipeService';
import * as categoryService from '../../../services/categoryService';

export function Recipes() {
    
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => { 
    recipeService.getRecipes()
      .then(result => setRecipes(result))
      .catch(err => console.log(err));

    const categoriesCollection = [];
    categoriesCollection.push({_id: '1', name: 'All categories'});
    categoryService.getCategories()
      .then(result => result.map(d => categoriesCollection.push(d)))
      .catch(err => console.log(err));
    setCategories(categoriesCollection);
  }, []);

  const [ selectedCategory, setSelectedCategory ] = useState('All categories');
  const handleSelectedCategory = (category) => {
    setSelectedCategory(category.name);
  }

  return (

    <>
      <div>
        <ul>
          {!categories.length && <li>Loading..</li>}
          {
            categories.map(category => <li 
              key={category._id}
              onClick = {() => handleSelectedCategory(category)}
            >{category.name}</li>)
          }
        </ul>
      </div>

      <div>
        <ul>
          {!recipes.length && <li>Loading..</li>}
          {
            recipes
              .filter(
                recipe => selectedCategory === 'All categories' ?
                recipe :
                recipe.category.name === selectedCategory
              )
              .map(r => <li key = {r._id}><Link to={r._id}> {r.name} </Link></li>)
          }
        </ul>
      </div>
    </>
  );
}

