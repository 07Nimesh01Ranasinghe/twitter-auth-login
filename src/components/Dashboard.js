import React from 'react';
import './style.css'
import homeImage from './images/twitter2.png';


const Dashboard = () => {
  return (
    <div className='dashboard'>
        <img src={homeImage} className='dahsboard-img'/>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
    </div>
  );
};

export default Dashboard;
