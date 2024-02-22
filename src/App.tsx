import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VitrineRestaurantes from './pages/VitrineRestaurantes';
import AdministracaoRestaurantes from 'pages/Admin/Restaurantes/AdministracaoRestaurantes';
import FormRestaurante from 'pages/Admin/Restaurantes/FormularioRestaurante';
import DefaultAdminPage from 'pages/Admin/DefaultAdminPage';
import AdministracaoPratos from 'pages/Admin/Pratos/AdministracaoPratos';
import FormPrato from 'pages/Admin/Pratos/FormularioPrato';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/restaurantes' element={<VitrineRestaurantes />} />

			<Route path='admin' element={<DefaultAdminPage />}>
				<Route path='restaurantes' element={<AdministracaoRestaurantes />} />
				<Route path='restaurantes/novo' element={<FormRestaurante />} />
				<Route path='restaurantes/:id' element={<FormRestaurante />} />

				<Route path='pratos' element={<AdministracaoPratos />} />
				<Route path='pratos/:id' element={<FormPrato />} />
			</Route>
		</Routes>
	);
}

export default App;
