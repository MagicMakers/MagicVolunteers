import React from 'react';
import './CoordinatorPage.css';
import MapComponent from './components/MapComponent';
import MagicNav from './components/MagicNav';

function CoordinatorPage() {
	return (
		<div className="app">
			<MagicNav />
			<div className="container">
				<div className="content">
					<MapComponent />
				</div>
			</div>
		</div>
	);
}

export default CoordinatorPage;
