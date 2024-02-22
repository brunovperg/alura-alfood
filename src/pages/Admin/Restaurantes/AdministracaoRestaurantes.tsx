import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Link as MuiLink,
	Button,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import IRestaurante from 'interfaces/IRestaurante';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)({
	fontSize: '1rem',
	fontWeight: 'bold',
	padding: '10px 15px',
	borderBottom: '1px solid #ddd',
	'&:last-child': {
		paddingRight: '15px',
	},
});

const StyledTableRow = styled(TableRow)({
	'&:nth-of-type(odd)': {
		backgroundColor: '#f7f7f7',
	},
	'&:hover': {
		backgroundColor: '#eaeaea',
	},
});

export default function AdministracaoRestaurantes() {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	const excluirRestaurante = (restauranteExcluir: IRestaurante) => {
		axios
			.delete(`/api/v2/restaurantes/${restauranteExcluir.id}/`)
			.then(() => {
				setRestaurantes(
					restaurantes.filter(
						(restaurante) => restaurante.id !== restauranteExcluir.id
					)
				);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		axios
			.get<IRestaurante[]>('/api/v2/restaurantes/')
			.then((response) => {
				setRestaurantes(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<TableContainer
			component={Paper}
			style={{ borderRadius: '10px', overflow: 'hidden' }}>
			<Table>
				<TableHead>
					<StyledTableRow>
						<StyledTableCell>Nome</StyledTableCell>
						<StyledTableCell>Editar</StyledTableCell>
						<StyledTableCell>Excluir</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{restaurantes.map((restaurante) => (
						<StyledTableRow key={restaurante.id}>
							<StyledTableCell component='th' scope='row'>
								{restaurante.nome}
							</StyledTableCell>
							<StyledTableCell>
								<MuiLink
									component={Link}
									to={`/admin/restaurantes/${restaurante.id}`}
									style={{ color: '#1976d2' }}>
									[Editar]
								</MuiLink>
							</StyledTableCell>
							<StyledTableCell>
								<Button
									onClick={() => excluirRestaurante(restaurante)}
									variant='outlined'
									color='error'>
									Excluir
								</Button>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
