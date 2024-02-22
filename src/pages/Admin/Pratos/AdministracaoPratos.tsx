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
import IPrato from 'interfaces/IPrato';
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

export default function AdministracaoPratos() {
	const [pratos, setPratos] = useState<IPrato[]>([]);

	useEffect(() => {
		axios
			.get<IPrato[]>('/api/v2/pratos/')
			.then((response) => {
				setPratos(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const excluirPrato = (pratoExcluir: IPrato) => {
		axios
			.delete(`/api/v2/pratos/${pratoExcluir.id}/`)
			.then(() => {
				setPratos(pratos.filter((prato) => prato.id !== pratoExcluir.id));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<TableContainer
			component={Paper}
			style={{ borderRadius: '10px', overflow: 'hidden' }}
		>
			<Table>
				<TableHead>
					<StyledTableRow>
						<StyledTableCell>Nome</StyledTableCell>
						<StyledTableCell>Tag</StyledTableCell>
						<StyledTableCell>Imagem</StyledTableCell>
						<StyledTableCell>Editar</StyledTableCell>
						<StyledTableCell>Excluir</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{pratos.map((prato) => (
						<StyledTableRow key={prato.id}>
							<StyledTableCell component='th' scope='row'>
								{prato.nome}
							</StyledTableCell>
							<StyledTableCell component='th' scope='row'>
								{prato.tag}
							</StyledTableCell>
							<StyledTableCell component='th' scope='row'>
								<Link
									to={prato.imagem}
									target='_blank'
									style={{ color: '#1976d2' }}
								>
									[Imagem]
								</Link>
							</StyledTableCell>
							<StyledTableCell>
								<MuiLink
									component={Link}
									to={`/admin/pratos/${prato.id}/`}
									style={{ color: '#1976d2' }}
								>
									[Editar]
								</MuiLink>
							</StyledTableCell>
							<StyledTableCell>
								<Button
									onClick={() => excluirPrato(prato)}
									variant='outlined'
									color='error'
								>
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
