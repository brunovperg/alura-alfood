import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import IRestaurante from 'interfaces/IRestaurante';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export default function FormRestaurante() {
	const [nomeRestaurante, setNomeRestaurante] = useState<string>('');
	const params = useParams();

	useEffect(() => {
		if (params.id) {
			axios
				.get<IRestaurante>(`/api/v2/restaurantes/${params.id}/`)
				.then((response) => setNomeRestaurante(response.data.nome));
		}
	}, [params.id]);

	const navigate = useNavigate();
	const aoSubmeter = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		params.id
			? axios
					.put(`/api/v2/restaurantes/${params.id}/`, { nome: nomeRestaurante })
					.then(() => {
						alert('Restaurante atualizado com sucesso');
						navigate('/admin/restaurantes');
					})
			: axios
					.post('/api/v2/restaurantes/', { nome: nomeRestaurante })
					.then(() => {
						alert('Restaurante cadastrado com sucesso');
						navigate('/admin/restaurantes');
					});
	};
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					alignItems: 'center',
				}}>
				<Typography component='h1' variant='h6'>
					Formulário de Restaurantes
				</Typography>
				<Box component='form' onSubmit={aoSubmeter} sx={{ width: '100%' }}>
					<TextField
						sx={{ marginTop: 2 }}
						id='standard-basic'
						value={nomeRestaurante}
						onChange={(e) => setNomeRestaurante(e.target.value)}
						label='Nome do Restaurante'
						variant='standard'
						fullWidth
						required
					/>
					<Button
						sx={{ marginTop: 2 }}
						fullWidth
						type='submit'
						variant='outlined'>
						Salvar
					</Button>
				</Box>
			</Box>
		</>
	);
}
