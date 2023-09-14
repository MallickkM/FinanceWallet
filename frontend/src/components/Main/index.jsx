/*

import React from 'react';

import Sidebarmy from '../Sidebar/Sidebarmy';
import BarChart from '../Charts/BarChart';
import styles from './styles.module.css';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
	
	<div>
		<div className={styles.main_container}>
			
			<nav className={styles.navbar}>
				<h1>FINANCE TRACKER</h1>

				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>		
		</div>
        <div className='container-fluid bg-secondary min-vh-100'>
            <div className='row'>
                <div className='col-2 bg-white vh-100'>
                    <Sidebarmy />
                </div>
                <div className='col bg-light vh-100'>
                    <BarChart />
                </div>
            </div>
        </div>
        </div>
  
  );
}

export default Main;

*/
