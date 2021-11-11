import React from 'react';
import './App.scss';

//StoreProvider
import StoreProvider from './store/StoreProvider';

//Components
import Header from './components/Header';
import Menu from './components/Menu';
import Content from './components/Content';


const App = () => (
	<StoreProvider>
		<Menu/>
		<Header/>
		<Content/>
	</StoreProvider>
);

export default App;
