"use client"
import React from "react";
import { Card, Typography, Progress, Divider, Space } from "antd";

const { Title, Text } = Typography;

const NutritionBreakdown = ({ nutrition, servings, dailyValue, dietaryLabels }) => {
  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "20px auto",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={3}>Nutrition</Title>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            <Text strong>{nutrition.calories}</Text>
            <Text style={{ display: "block", fontSize: "12px" }}>
              CALORIES / SERVING
            </Text>
          </div>
          <div>
            <Text strong>{dailyValue}%</Text>
            <Text style={{ display: "block", fontSize: "12px" }}>
              DAILY VALUE
            </Text>
          </div>
          <div>
            <Text strong>{servings}</Text>
            <Text style={{ display: "block", fontSize: "12px" }}>
              SERVINGS
            </Text>
          </div>
        </Space>

        <Divider />

        <Text style={{ fontSize: "14px" }}>
          {dietaryLabels.join(", ")}
        </Text>

        <Divider />

        {nutrition.breakdown.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Text strong>{item.name}</Text>
              <Text style={{ display: "block", fontSize: "12px" }}>
                {item.amount}g
              </Text>
            </div>
            <div>
              <Progress
                percent={item.dailyValue}
                showInfo={false}
                strokeColor={item.dailyValue > 100 ? "red" : "green"}
              />
              <Text style={{ fontSize: "12px" }}>{item.dailyValue}%</Text>
            </div>
          </div>
        ))}
      </Space>
    </Card>
  );
};

export default NutritionBreakdown;
