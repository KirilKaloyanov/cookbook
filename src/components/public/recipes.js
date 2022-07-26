import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Recipes() {
    
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.log(err));
  }, []);


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
    }, []);


  const [ selectedCategory, setSelectedCategory ] = useState('All');
  const handleSelectedCategory = (category) => {
    setSelectedCategory(category.name);
  }

  return (

    <>
      <div>
        <ul>
          {!recipes.length && <li>Loading..</li>}
          {
            recipes
              .filter(
                recipe => selectedCategory === 'All' ?
                recipe :
                recipe.category.name === selectedCategory
              )
              .map(r => <li key = {r._id}><Link to={r._id}> {r.name} </Link></li>)
          }
        </ul>
      </div>
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
    </>
  );
}

