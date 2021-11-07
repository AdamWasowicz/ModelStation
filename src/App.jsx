import React from 'react';
import './App.scss';

import StoreProvider from './store/StoreProvider';
console.log(StoreProvider);

//Components
import Header from './components/Header';



const App = () => (
	<StoreProvider>
		<Header/>
	</StoreProvider>
);

export default App;
