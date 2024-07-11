import React, { useState, useEffect } from "react";
import "../styles/likedProducts.css";
import { toast, ToastContainer } from "react-toastify";
import "../styles/Searchbar.css";
import "../styles/RecipeStyle.css";

const LikedProducts = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  
  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = async () => {
    try {
      const response = await fetch(
        "https://recipe-app-mern.onrender.com/auth/likedRecipes"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch liked products");
      }

      const data = await response.json();
      setLikedProducts(data);
    } catch (error) {
      toast.error("Error fetching liked products: " + error.message);
    }
  };

  const handleRemoveItem = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to remove this recipe from favorites?")) {
        const response = await fetch(
          `https://recipe-app-mern.onrender.com/auth/removeLiked/${recipeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Item removed successfully");
          fetchLikedProducts();
        } else {
          const data = await response.json();
          toast.error(data.error);
        }
      }
    } catch (error) {
      toast.error("Error removing item from liked products: " + error.message);
    }
  };

  const searchRecipes = async (e) => {
    try {
      if (e.target.value) {
        let searchedRecipes = await fetch(
          `https://recipe-app-mern.onrender.com/auth/searchRecipes/${e.target.value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        searchedRecipes = await searchedRecipes.json();

        if (!searchedRecipes.message) {
          setLikedProducts(searchedRecipes);
        } else {
          setLikedProducts([]);
        }
      } else {
        fetchLikedProducts();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Recipes">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search recipes"
          onChange={(e) => searchRecipes(e)}
        />
      </div>
      <div className="likedRecipes">
        <h2>Favorites</h2>
        <ul>
          {likedProducts.map((product) => (
            <li key={product._id} className="list">
              <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <img src={product.imageUrl} alt={product.title} />
                <h4>Ingredients:</h4>
                <ul>
                  {product.ingredients.length > 0 && (
                    <ul className="ingredients-list">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  )}
                </ul>

                <div className="instructions-container">
                  <h4>Instructions:</h4>
                  <div className="instructions-list">
                    {product.instructions.split("\n").map((step, index) => (
                      <p key={index}>{step}</p>
                    ))}
                  </div>
                </div>

                <button
                  className="remove-item-button"
                  onClick={() => handleRemoveItem(product._id)}
                >
                  Remove Item
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LikedProducts;
