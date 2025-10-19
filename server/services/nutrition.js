// const dotenv = require('dotenv');
// dotenv.config(); // Load .env variables

// const axios = require('axios');

// const fetchNutrition = async (ingredients) => {
//   const apiKey = process.env.SPOONACULAR_API_KEY;

//   try {
//     if (!ingredients || ingredients.length === 0) return [];

//     // Convert ingredients to array of strings
//     const ingredientArray = ingredients.map(i => `${i.qty} ${i.name}`);
//     console.log("Sending ingredients to Spoonacular:", ingredientArray);

//     // Send JSON data instead of form data
//     const response = await axios.post(
//       `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${apiKey}`,
//       {
//         ingredientList: ingredientArray.join("\n"),
//         servings: 1
//       },
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded"
//         }
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching nutrition:", error.message);
//     return [];
//   }
// };

// module.exports = { fetchNutrition };

// // const dotenv = require('dotenv');
// // dotenv.config(); // Load your .env
// // const axios = require("axios");

// // const fetchNutrition = async (ingredients) => {
// //   const apiKey = process.env.SPOONACULAR_API_KEY;
// //   try {
// //     if (!ingredients || ingredients.length === 0) return [];

// //     // Convert ingredients to array of strings
// //     const ingredientArray = ingredients.map(i => `${i.qty} ${i.name}`);
// //     console.log("Sending ingredients to Spoonacular:", ingredientArray);

// //     // Create URL-encoded form data instead of JSON
// //     const formData = new URLSearchParams();
// //     formData.append("ingredientList", ingredientArray.join("\n"));
// //     formData.append("servings", "1");

// //     const response = await axios.post(
// //       `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${apiKey}`,
// //       formData.toString(), // URL-encoded body
// //       {
// //         headers: { "Content-Type": "application/x-www-form-urlencoded" } // URL-encoded header
// //       }
// //     );

// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching nutrition:", error.message);
// //     return [];
// //   }
// // };

// // module.exports = { fetchNutrition };



