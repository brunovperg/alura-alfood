import IPrato from 'interfaces/IPrato';
import IRestaurante from 'interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface RestauranteProps {
	restaurante: IRestaurante;
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
	const [pratos, setPratos] = useState<IPrato[]>();
	useEffect(() => {
		axios
			.get<IPrato[]>(`api/v1/restaurantes/${restaurante.id}/pratos/`)
			.then((resposta) => {
				setPratos(resposta.data); // Extract the 'data' property from 'resposta' object
			})
			.catch((error) => {
				console.log('Axios error:', error);
			});
	}, [restaurante.id]);
	return (
		<section className={estilos.Restaurante}>
			<div className={estilos.Titulo}>
				<h2>{restaurante.nome}</h2>
			</div>
			<div>
				{pratos?.map((item) => (
					<Prato prato={item} key={item.id} />
				))}
			</div>
		</section>
	);
};

export default Restaurante;
