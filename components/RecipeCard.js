"use client";

import React from "react";
import { Card, Space, Typography, Image, Dropdown, List, Button, Collapse, Menu } from "antd";
const { Panel } = Collapse;
const { Title, Text } = Typography;

const RecipeCard = ({ recipe }) => {
  // Menu for diet labels dropdown
  const dietMenu = (
    <Menu>
      {recipe.diet_labels.map((label, index) => (
        <Menu.Item key={index}>{label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Card
      style={{ maxWidth: 600, margin: "20px auto" }}
      cover={
        <Image
          src={recipe.image}
          alt={recipe.label}
          style={{ minHeight: 300, height: 300, objectFit: "cover" }}
        />
      }
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Title level={3}>{recipe.label}</Title>

        <Text>
          <b>Cuisine Type:</b> {recipe.cuisine_type.join(", ")}
        </Text>

        <Text>
          <b>Meal Type:</b> {recipe.meal_type.join(", ")}
        </Text>

        <Text>
          <b>Calories:</b> {recipe.calories.toLocaleString()}
        </Text>

        <Dropdown overlay={dietMenu} placement="bottomLeft">
          <a href="#">View Diet Labels</a>
        </Dropdown>

        <Title level={5}>Ingredients:</Title>
        <List
          itemLayout="horizontal"
          dataSource={recipe.ingredients}
          renderItem={(ingredient) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Image width={50} src={ingredient.image} />}
                title={ingredient.food}
                description={`Description: ${ingredient.text}`}
              />
            </List.Item>
          )}
        />

        <Title level={5}>Nutritional Values:</Title>
        <Collapse>
          <Panel header="View Nutritional Values" key="1">
            <List
              itemLayout="horizontal"
              dataSource={recipe.digest}
              renderItem={(nutrient) => (
                <List.Item>
                  <List.Item.Meta
                    title={<b>{nutrient.label}</b>}
                    description={`Daily Value: ${nutrient.daily.toLocaleString()} ${nutrient.unit}`}
                  />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>

        <Title level={5}>Recipe:</Title>
        <Button onClick={() => window.open(recipe.url, "_blank")}>View Full Recipe</Button>
        <List
          itemLayout="horizontal"
          dataSource={recipe.ingredients}
          renderItem={(ingredient) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Image width={50} src={ingredient.image} />}
                title={ingredient.food}
                description={`Category: ${ingredient.foodCategory}`}
              />
            </List.Item>
          )}
        />
        {/* <NutritionBreakdown nutrition={} /> */}
      </Space>
    </Card>
  );
};

export default RecipeCard;
