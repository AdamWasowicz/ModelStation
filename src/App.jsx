import React from 'react';
import './App.scss';

import StoreProvider from './store/StoreProvider';

const App = () => (
	<StoreProvider>
		<header>Adam</header>
	</StoreProvider>
);

export default App;
