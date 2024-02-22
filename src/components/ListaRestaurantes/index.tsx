import IRestaurante from 'interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { useEffect, useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { IPaginacao } from 'interfaces/IPaginacao';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

interface IParametrosBusca {
	search?: string;
	ordering?: string;
}

const ListaRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [next, setNext] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const [order, setOrder] = useState<string>('');
	const searchRef = useRef(search);

	const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
		axios
			.get<IPaginacao<IRestaurante>>(url, opcoes)
			.then((resposta) => {
				setRestaurantes(() => {
					if (resposta.data.previous) {
						return [...restaurantes, ...resposta.data.results];
					}
					return resposta.data.results;
				});
				setNext('');

				if (resposta.data.next) {
					const nextUrl = new URL(resposta.data.next);
					setNext(nextUrl.pathname + nextUrl.search);
				}
			})
			.catch((erro) => {
				console.log(erro);
			});
		console.log(next);
	};

	useEffect(() => {
		const handler = setTimeout(() => {
			const opcoes = {
				params: {} as IParametrosBusca,
			};
			if (searchRef.current) {
				const normalizedSearch = searchRef.current
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '');
				opcoes.params.search = normalizedSearch;
			}
			if (order) {
				opcoes.params.ordering = order;
			}
			carregarDados('/api/v1/restaurantes/', opcoes);
		}, 500); // 500ms delay

		return () => {
			clearTimeout(handler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, order]);

	useEffect(() => {
		searchRef.current = search;
	}, [search]);

	return (
		<section className={style.ListaRestaurantes}>
			<h1>
				Os restaurantes mais <em>bacanas</em>!
			</h1>

			<TextField
				id='outlined-search'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				label='Pesquisar'
				type='search'
			/>

			<FormControl
				variant='standard'
				sx={{ m: 1, minWidth: 120, marginLeft: 10 }}
			>
				<InputLabel id='Ordenar'>Ordenar Por</InputLabel>
				<Select
					labelId='Ordenar'
					id='order-select'
					value={order}
					onChange={(e) => setOrder(e.target.value)}
					label='Ordenar'
				>
					<MenuItem value=''>Padrão</MenuItem>
					<MenuItem value='id'>ID</MenuItem>
					<MenuItem value='nome'>Nome</MenuItem>
				</Select>
			</FormControl>

			{restaurantes?.map((item) => (
				<Restaurante restaurante={item} key={item.id} />
			))}

			<Button
				sx={{
					marginTop: 2,
					height: 60,
					backgroundColor: '#f2745f',
					'&:hover': { backgroundColor: '#db4c33' },
				}}
				fullWidth
				type='submit'
				variant='contained'
				onClick={() => carregarDados(next)}
				disabled={!next}
			>
				Ver Mais
			</Button>
		</section>
	);
};

export default ListaRestaurantes;
