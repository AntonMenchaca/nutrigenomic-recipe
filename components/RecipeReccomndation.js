"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Card, Spin, Pagination } from "antd";
import RecipeCard from "./RecipeCard";
import "../styles/globals.css";

const RecipeRecommendation = ({ dietNeeds }) => {
  const [loaded, setLoaded] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 50; // Maximum recipes to fetch per API call
  const pageSize = 3; // Recipes per page for carousel

  // Cache API responses using useMemo
  const cachedRecipes = useMemo(() => {
    const cache = {};
    return {
      get: (key) => cache[key],
      set: (key, data) => {
        cache[key] = data;
      },
    };
  }, []);

  // Categorize diet needs into diet_labels and health_labels
  const generateRecipes = () => {
    const dietCategories = { diet_labels: [], health_labels: [] };

    dietNeeds.forEach((element) => {
      if (["Low-Fat", "Low-Sodium", "High-Fiber", "High-Protein"].includes(element.category)) {
        if (!dietCategories.diet_labels.includes(element.category)) {
          dietCategories.diet_labels.push(element.category);
        }
      } else if (["Dairy-Free", "Sugar-Conscious", "Gluten-Free", "Vegan"].includes(element.category)) {
        if (!dietCategories.health_labels.includes(element.category)) {
          dietCategories.health_labels.push(element.category);
        }
      }
    });

    return dietCategories;
  };

  const fetchRecipes = async (offset = 0) => {
    const categories = generateRecipes();

    // Check cache for existing data
    const cacheKey = `${JSON.stringify(categories)}_${offset}`;
    const cachedData = cachedRecipes.get(cacheKey);

    if (cachedData) {
      // Use cached data if available
      setRecipes((prevRecipes) => [...prevRecipes, ...cachedData.matching_recipes]);
      return;
    }

    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_API_URL}/api/v1/filter-recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...categories,
          limit,
          offset,
        }),
      });

      const data = await response.json();

      // Cache the response
      cachedRecipes.set(cacheKey, data);

      // Append recipes to state
      setRecipes((prevRecipes) => [...prevRecipes, ...data.matching_recipes]);

      // Fetch next batch if the response has exactly `limit` recipes
      if (data.matching_recipes.length === limit) {
        await fetchRecipes(offset + limit);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    if (!loaded) {
      fetchRecipes(); // Fetch recipes on component mount
      setLoaded(true);
    }
  }, [loaded]);

  // Get the recipes for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentRecipes = recipes.slice(startIndex, startIndex + pageSize);

  return (
    <Card
      title="Recipe Results"
      bordered={false}
      loading={!loaded}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {recipes.length === 0 ? (
        <Spin size="large" />
      ) : (
        <>
          <Pagination
            style={{ margin: "0 auto" }}
            current={currentPage}
            pageSize={pageSize}
            total={recipes.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
          <div>
            {currentRecipes.map((recipe) => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={recipes.length}
              onChange={(page) => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                setCurrentPage(page);
              }}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </Card>
  );
};

export default RecipeRecommendation;
