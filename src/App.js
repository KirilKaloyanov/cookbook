import { Routes, Route } from 'react-router-dom';
import { Recipes } from './components/public/recipes';
import { Recipe } from './components/public/recipe';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/recipes' element = {<Recipes />}/>
        <Route path='/recipes/:recipeId' element = {<Recipe />}/>
      </Routes>
    </>
  );
}

export default App;
