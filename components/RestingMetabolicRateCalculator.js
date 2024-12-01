"use client";
import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Select, Button, Typography, Card, Spin } from 'antd';
import '../styles/globals.css'
const { Title, Text } = Typography;

const RestingMetabolicRateCalculator = () => {

  const [loaded, setLoaded] = useState(false);
  const [rmr, setRmr] = useState(null);
  const [weightUnit, setWeightUnit] = useState("lb"); // "kg" or "lb"
  const [heightUnit, setHeightUnit] = useState("in"); // "cm" or "in"

  useEffect(() => {
    setLoaded(true)
  }, [])

  const convertToMetric = (value, unit) => {
    if (unit === "lb") return value * 0.453592; // pounds to kilograms
    if (unit === "in") return value * 2.54; // inches to centimeters
    return value;
  };

  const calculateRMR = (values) => {
    const { age, gender, weight, height } = values;
    let rmrValue;

    // Convert weight and height to metric units if needed
    const metricWeight = convertToMetric(weight, weightUnit);
    const metricHeight = convertToMetric(height, heightUnit);

    if (gender === "male") {
      rmrValue = 66 + 13.7 * metricWeight + 5 * metricHeight - 6.8 * age;
    } else {
      rmrValue = 655 + 9.6 * metricWeight + 1.8 * metricHeight - 4.7 * age;
    }

    setRmr(rmrValue.toFixed(2));
  };

  return (
    <Card
      title="Resting Metabolic Rate Calculator"
      bordered={false}
      loading={!loaded}
    >
      <Form
        layout="vertical"
        onFinish={calculateRMR}
        initialValues={{
          gender: "male",
        }}
      >
        <Form.Item
          label="Age (years)"
          name="age"
          rules={[{ required: true, message: "Please enter your age" }]}
        >
          <InputNumber min={0} max={120} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Weight"
          name="weight"
          rules={[{ required: true, message: "Please enter your weight" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Select
            value={weightUnit}
            onChange={setWeightUnit}
            style={{ width: "100%" }}
          >
            <Select.Option value="kg">Kilograms (kg)</Select.Option>
            <Select.Option value="lb">Pounds (lb)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Height"
          name="height"
          rules={[{ required: true, message: "Please enter your height" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Select
            value={heightUnit}
            onChange={setHeightUnit}
            style={{ width: "100%" }}
          >
            <Select.Option value="cm">Centimeters (cm)</Select.Option>
            <Select.Option value="in">Inches (in)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Calculate RMR
          </Button>
        </Form.Item>
      </Form>

      {rmr && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Title level={4}>Your Resting Metabolic Rate (RMR):</Title>
          <Text strong style={{ fontSize: "1.5em" }}>
            {rmr} kcal/day
          </Text>
        </div>
      )}
    </Card>
  );
};

export default RestingMetabolicRateCalculator;
