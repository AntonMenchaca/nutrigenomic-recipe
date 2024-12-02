"use client";
import RestingMetabolicRateCalculator from "../components/RestingMetabolicRateCalculator.js";
import RecipeSteps from "../components/RecipeSteps.js";
import UploadData from "@/components/UploadData.js";
import RecipeReccomendation from "@/components/RecipeReccomndation.js";
import React, { useState, useEffect } from 'react'
export default function Home() {
  const [dietNeeds, setDietNeeds] = useState([])

  return (
    <div>
      <RecipeSteps steps={[{
        title: 'Generate Metabolic Rate',
        content:
          <div className="glass">
            <RestingMetabolicRateCalculator />
          </div>
      }, {
        title: 'Upload Data', content:
          <div className="glass">
            <UploadData dietNeeds={dietNeeds} setDietNeeds={setDietNeeds} />
          </div>

      }, {
        title: 'View Results', content: <div className="glass">
          {dietNeeds.length ? <RecipeReccomendation dietNeeds={dietNeeds} setDietNeeds={setDietNeeds} /> :
            <div>No Recommendations</div>}
        </div>
      }]} />

    </div>

  );
}
