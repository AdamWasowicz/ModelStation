import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

//StoreProvider
import StoreProvider from './store/StoreProvider';

//Components
import Header from './components/Header';
import Menu from './components/Menu';
import Content from './components/Content';
import Footer from './components/Footer';

const App = () => {
	return (
		<StoreProvider>
			<Router>
				<Menu/>
				<Header/>
				<Content/>
				<Footer/>
			</Router>
		</StoreProvider>
	);
};

export default App;
