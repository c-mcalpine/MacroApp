import React, { useState, useEffect } from 'react';

const CustomizeMeal = ({ mealName, onAddToCart, onBack }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [nutrition, setNutrition] = useState({ calories: 0, fat: 0, carbs: 0, protein: 0 });
  const [price, setPrice] = useState(13.00); // Base price

  useEffect(() => {
    // Fetch ingredients for the selected meal
    fetch(`/api/ingredients/${mealName}`)
      .then((res) => res.json())
      .then((data) => setIngredients(data));
  }, [mealName]);

  const handleIngredientToggle = (ingredient) => {
    const isSelected = selectedIngredients.includes(ingredient.Ingredient);

    if (isSelected) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient.Ingredient));
      updateNutrition(ingredient, "remove");
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient.Ingredient]);
      updateNutrition(ingredient, "add");
    }
  };

  const updateNutrition = (ingredient, action) => {
    const multiplier = action === "add" ? 1 : -1;
    setNutrition((prev) => ({
      calories: prev.calories + multiplier * ingredient.Calories,
      fat: prev.fat + multiplier * ingredient.Fat,
      carbs: prev.carbs + multiplier * ingredient.Carbs,
      protein: prev.protein + multiplier * ingredient.Protein,
    }));
    setPrice((prev) => prev + multiplier * ingredient.Cost);
  };

  return (
    <div className="customize-meal">
      <h2>Customize Your {mealName}</h2>
      <div className="ingredients">
        {ingredients.map((ingredient) => (
          <label key={ingredient.Ingredient}>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient.Ingredient)}
              onChange={() => handleIngredientToggle(ingredient)}
            />
            {ingredient.Ingredient} (+${ingredient.Cost.toFixed(2)})
          </label>
        ))}
      </div>
      <div className="summary">
        <h3>Nutrition</h3>
        <p>Calories: {nutrition.calories}</p>
        <p>Fat: {nutrition.fat}g</p>
        <p>Carbs: {nutrition.carbs}g</p>
        <p>Protein: {nutrition.protein}g</p>
        <h3>Price: ${price.toFixed(2)}</h3>
        <button onClick={() => onAddToCart({ mealName, ingredients: selectedIngredients, price, nutrition })}>
          Add to Cart
        </button>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default CustomizeMeal;
