import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import * as categoryService from '../../services/categoryService';

export function Recipes() {

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      const recipes = await recipeService.getRecipes();

      let categoriesCollection = [{ _id: '1', name: 'All categories' }];
      const categories = await categoryService.getCategories();
      categories
        .filter(c => recipes.some(r => r.category.name === c.name))
        .map(c => categoriesCollection.push(c));

      setCategories(categoriesCollection);
      setRecipes(recipes);
    }
    getData();
  }, [])

  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const handleSelectedCategory = (category) => setSelectedCategory(category.name);

  return (
    <>
      <div>
        <h2>Recipes collection</h2>
        <ul>
          {categories
            .map(category => <li
              key={category._id}
              onClick={() => handleSelectedCategory(category)}
              className={
                category.name === selectedCategory
                  ? 'badge rounded-pill p-2 m-2 cursor-pointer bg-primary'
                  : 'badge rounded-pill p-2 m-2 cursor-pointer bg-info'
              }
            >{category.name}</li>)
          }
        </ul>
      </div>

      <div>
        <ul className='list-group'>
          {!recipes.length && <h3>Loading..</h3>}
          {recipes
            .filter(
              recipe => selectedCategory === 'All categories'
                ? recipe
                : recipe.category.name === selectedCategory
            )
            .sort(
              (a, b) =>
                b.likes.filter(rl => rl.like === true).length -
                a.likes.filter(rl => rl.like === true).length
            )
            .map(r =>
              <li key={r._id} className='list-group-item d-flex justify-content-between'>
                <Link to={r._id} className='decoration-none'> {r.name} </Link>
                <span className='border border-secondary rounded-4 px-2 m-1'>
                  <i className='red-heart fa-heart fa-solid m-2' />
                  {r.likes.filter(rl => rl.like === true).length}
                </span>
              </li>
            )
          }
        </ul>
      </div>
    </>
  );
}

