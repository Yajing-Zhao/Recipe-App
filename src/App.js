import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from "./Recipe";

const App= () => {
  const APP_ID = '6b19ab1b';
  const APP_KEY ="9fc30047c90838567b157e3c1ca9acd5";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");

  useEffect(()=>{
    getRecipes();
  }, [query])

  const getRecipes=async ()=>{
    const response= await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  }
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const updateQuery = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch("")
  }

  
  return(
    <div className='App'>
      <form onSubmit={updateQuery} className='search-form'>
        <input value={search} className='search-bar' type='text' onChange={updateSearch}></input>
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
          key = {recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
