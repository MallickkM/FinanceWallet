import React from 'react';
import { Spin } from 'antd';

const Spinner = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: 1000, 
    background: 'rgba(255, 255, 255, 0.9)'
  }}>
    <Spin size="large" />
  </div>
);

export default Spinner;
