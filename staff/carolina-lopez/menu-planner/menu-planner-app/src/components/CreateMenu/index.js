import React, { useState, useEffect } from 'react'
import logic from "../../logic"
import { Link } from 'react-router-dom'


export default function ({ onLogout, onRegisterDay }) {

  // const [day, setDay] = useState(undefined)
  const [selectedDay, setSelectedDay] = useState()
  const [recipesBr, setRecipesBr] = useState()
  const [selectedBreakfast, setSelectedBreakfast] = useState()
  const [recipesLn, setRecipesLn] = useState()
  const [selectedLunch, setSelectedLunch] = useState()
  const [recipesSn, setRecipesSn] = useState()
  const [selectedSnack, setSelectedSnack] = useState()
  const [recipesDn, setRecipesDn] = useState()
  const [selectedDinner, setSelectedDinner] = useState()

  useEffect(() => {
    (async () => {
      try {
        const recipesBr = await logic.searchRecipe("breakfast")
        setRecipesBr(recipesBr)

      } catch ({ message }) {
        console.log('fail search recipe', message)
      }
      try {
        const recipesLn = await logic.searchRecipe("lunch")
        setRecipesLn(recipesLn)
      } catch ({ message }) {
        console.log('fail search recipe', message)
      }
      try {
        const recipesSn = await logic.searchRecipe("snack")
        setRecipesSn(recipesSn)
      } catch ({ message }) {
        console.log('fail search recipe', message)
      }
      try {
        const recipesDn = await logic.searchRecipe("dinner")
        setRecipesDn(recipesDn)
      } catch ({ message }) {
        console.log('fail search recipe', message)
      }
    })()
  }, [])


  function handleStateDay(event) {
    const { target: { value: day } } = event
    setSelectedDay(day)
    /* try {
      const day = await logic.registerDay(selectedDay, recipesBr, recipesLn, recipesSn, recipesDn)
      setDay(day)
    } catch ({ message }) {
      console.log('fail register day', message)
    } */
  }

  function handleStateBr(event) {
    const { target: { value } } = event

    const { title, image, items, description, id } = recipesBr.find(recipe => value === recipe.id)

    setSelectedBreakfast({ title, image, items, description, id })
  }
  
  function handleStateLn(event) {
    const { target: { value } } = event
    const { title, image, items, description, id } = recipesLn.find(recipe => value === recipe.id)
  
    setSelectedLunch({ title, image, items, description, id })

  }

  function handleStateSn(event) {
    const { target: { value } } = event

    const { title, image, items, description, id} = recipesSn.find(recipe => value === recipe.id)

    setSelectedSnack({ title, image, items, description, id })
  }

  function handleStateDn(event) {
    const { target: { value } } = event

    const { title, image, items, description, id } = recipesDn.find(recipe => value === recipe.id)

    setSelectedDinner({ title, image, items, description, id })
  }

  return <section className='body'>
   <header>
    <nav className="nav">
      <a className="nav__h2" href="#"><h2 className="nav__h2">MenuPlanner</h2></a>
      <div className="dropdown">
        <button className="nav__icon dropdown__dropbtn">
          <i className="far fa-user-circle"></i>
        </button>
        <div className="nav__a dropdown__content">
          <Link className="nav__a dropdown__button" href="#" to="/home">Home</Link>
          <Link className="nav__a dropdown__button" href="#" to="/user-profile">User profile</Link>
          <Link className="nav__a dropdown__button" href="#" to="/current-week">Current week</Link>
          <a className="nav__a dropdown__button" href="#" onClick={onLogout}>Logout</a>
        </div>
      </div>  
    </nav>
  </header>
    <main className="main-create">
      <h3 className="main-create__h3">Create menu</h3>

      {recipesBr && recipesLn && recipesSn && recipesDn &&
        <form onSubmit={event => {
          event.preventDefault()

           const { id: breakfastId } = selectedBreakfast
           const { id: lunchId } = selectedLunch
           const { id: snackId } = selectedSnack
           const { id: dinnerId } = selectedDinner

          onRegisterDay(selectedDay, breakfastId, lunchId, snackId, dinnerId)
        }}>
          <select onChange={handleStateDay} name="day" className="selector">
            <option value="default">Pick a day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>

          <select onChange={handleStateBr} name="breakfast" className="selector">
            <option value="default">Select your breakfast</option>
            {recipesBr.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.title}</option>)}
          </select>

          <select onChange={handleStateLn} name="lunch" className="selector">
            <option value="default">Select your lunch</option>
            {recipesLn.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.title}</option>)}
          </select>

          <select onChange={handleStateSn} name="snack" className="selector">
            <option value="default">Select your snack</option>
            {recipesSn.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.title}</option>)}
          </select>

          <select onChange={handleStateDn} name="snack" className="selector">
            <option value="default">Select your dinner</option>
            {recipesDn.map(recipe => <option  value={recipe.id}>{recipe.title}</option>)}
          </select>

          <button className="main__button">Select</button>
        </form>

      }
      {/* BREAKFAST */}
      <section className="recipe">
        {selectedBreakfast && <h2 className="recipe__meal">Breakfast</h2>}
        {selectedBreakfast && <h2 className="recipe__title">{selectedBreakfast.title}</h2>}
        {selectedBreakfast && <img className="recipe__photo" src={`http://localhost:8080/${selectedBreakfast.image}`} alt="recipe" />}
        {selectedBreakfast && <ul className="recipe__ul">Ingredients{selectedBreakfast.items.map(item => <li key={Math.random()} className="recipe__li"> - {item.ingredient.title} {item.quantity} {item.ingredient.unit} <p>{item.description}</p> </li>)}</ul>}
        {selectedBreakfast && <div className="recipe__text">{selectedBreakfast.description}</div>}
      </section>

      {/* LUNCH */}
      <section className="recipe">
        {selectedLunch && <h2 className="recipe__meal">Lunch</h2>}
        {selectedLunch && <h2 className="recipe__title">{selectedLunch.title}</h2>}
        {selectedLunch && <img className="recipe__photo" src={`http://localhost:8080/${selectedLunch.image}`} alt="recipe"/>}
        {selectedLunch && <ul className="recipe__ul">Ingredients{selectedLunch.items.map(item => <li key={Math.random()} className="recipe__li"> - {item.ingredient.title} {item.quantity} {item.ingredient.unit} <p>{item.description}</p> </li>)}</ul>}
        {selectedLunch && <div className="recipe__text">{selectedLunch.description}</div>}
      </section>

      {/* SNACK */}
      <section className="recipe">
        {selectedSnack && <h2 className="recipe__meal">Snack</h2>}
        {selectedSnack && <h2 className="recipe__title">{selectedSnack.title}</h2>}
        {selectedSnack && <img className="recipe__photo" src={`http://localhost:8080/${selectedSnack.image}`} alt="recipe"/>}
        {selectedSnack && <ul className="recipe__ul">Ingredients{selectedSnack.items.map(item => <li key={Math.random()} className="recipe__li"> - {item.ingredient.title} {item.quantity} {item.ingredient.unit} <p>{item.description}</p> </li>)}</ul>}
        {selectedSnack && <div className="recipe__text">{selectedSnack.description}</div>}
      </section>

      {/* DINNER */}
      <section className="recipe">
        {selectedDinner && <h2 className="recipe__meal">Dinner</h2>}
        {selectedDinner && <h2 className="recipe__title">{selectedDinner.title}</h2>}
        {selectedDinner && <img className="recipe__photo" src={`http://localhost:8080/${selectedDinner.image}`} alt="recipe"/>}
        {selectedDinner && <ul className="recipe__ul">Ingredients{selectedDinner.items.map(item => <li key={Math.random()} className="recipe__li"> - {item.ingredient.title} {item.quantity} {item.ingredient.unit} <p>{item.description}</p> </li>)}</ul>}
        {selectedDinner && <div className="recipe__text">{selectedDinner.description}</div>}
      </section>
    </main>
  </section>
}
