"use client";
import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';


const RecipeSteps = ({ steps }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false)
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    content: item?.content,

  }));

  return (
    <div style={{ width: '85vw', margin: '8px auto' }}>
      <Steps className='step-color' current={current} items={items} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: '15px auto',

        }}
      >


      </div>
      <div style={{ margin: '15px auto', }}>{steps[current]?.content}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: '0 auto',

        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',

            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" disabled={nextDisabled} onClick={() => next()}>
            Next
          </Button>
        )}


      </div>
    </div>
  );
};


export default RecipeSteps;