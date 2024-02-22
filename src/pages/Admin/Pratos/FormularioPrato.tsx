import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import axios from 'axios';
import IPrato from 'interfaces/IPrato';
import IRestaurante from 'interfaces/IRestaurante';
import ITag from 'interfaces/ITag';
import { MuiFileInput } from 'mui-file-input';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export default function FormPrato() {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [tags, setTags] = useState<ITag[]>([]);
	const [imagemPrato, setImagemPrato] = useState<File | null>(null);
	const [restaurante, setRestaurante] = useState<string>('');
	const [nomePrato, setNomePrato] = useState<string>('');
	const [descricaoPrato, setDescricaoPrato] = useState<string>('');
	const [selectedTag, setSelectedTag] = useState<string>('');
	const params = useParams();

	useEffect(() => {
		if (params.id) {
			axios.get<IPrato>(`/api/v2/pratos/${params.id}/`).then((response) => {
				setNomePrato(response.data.nome);
				setDescricaoPrato(response.data.descricao);
				setSelectedTag(response.data.tag);
				setRestaurante(response.data.restaurante.toString());
			});
		}
	}, [params.id]);

	useEffect(() => {
		axios.get<IRestaurante[]>(`/api/v2/restaurantes/`).then((response) => {
			setRestaurantes(response.data);
		});
		axios.get<{ tags: ITag[] }>(`/api/v2/tags/`).then((response) => {
			setTags(response.data.tags);
		});
	}, []);

	const navigate = useNavigate();
	const aoSubmeter = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('nome', nomePrato);
		formData.append('descricao', descricaoPrato);
		formData.append('tag', selectedTag);
		formData.append('restaurante', restaurante);
		if (imagemPrato) {
			formData.append('imagem', imagemPrato);
		}
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		params.id
			? axios
					.put(`/api/v2/pratos/${params.id}/`, formData, config)
					.then(() => {
						alert('Prato atualizado com sucesso');
						navigate('/admin/pratos');
					})
					.catch((erro) => {
						console.log(erro);
					})
			: axios
					.post('/api/v2/pratos/', formData, config)
					.then(() => {
						setNomePrato('');
						setDescricaoPrato('');
						setSelectedTag('');
						setRestaurante('');
						setImagemPrato(null);
						alert('Prato cadastrado com sucesso');
						navigate('/admin/pratos');
					})
					.catch((erro) => {
						console.log(erro);
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
				}}
			>
				<Typography component='h1' variant='h6'>
					Formulário de prato
				</Typography>

				<Box component='form' onSubmit={aoSubmeter} sx={{ width: '100%' }}>
					<TextField
						sx={{ marginTop: 2 }}
						id='standard-basic'
						value={nomePrato}
						onChange={(e) => setNomePrato(e.target.value)}
						label='Nome do Prato'
						variant='standard'
						fullWidth
						required
						margin='dense'
					/>
					<TextField
						sx={{ marginTop: 2 }}
						id='standard-basic'
						value={descricaoPrato}
						onChange={(e) => setDescricaoPrato(e.target.value)}
						label='Descração do Prato'
						variant='standard'
						fullWidth
						required
						margin='dense'
					/>

					<FormControl margin='dense' fullWidth sx={{ marginTop: 2 }}>
						<InputLabel id='select-tag'>Tag</InputLabel>
						<Select
							labelId='select-tag'
							id='demo-simple-select'
							value={selectedTag}
							label='Tag'
							onChange={(e) => setSelectedTag(e.target.value)}
							fullWidth
							required
						>
							{tags.map((tag) => (
								<MenuItem key={tag.id} value={tag.value}>
									{tag.value}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl margin='dense' fullWidth sx={{ marginTop: 2 }}>
						<InputLabel id='select-restaurante'>Restaurante</InputLabel>
						<Select
							labelId='select-restaurante'
							id='demo-simple-select'
							value={restaurante}
							label='Restaurante'
							onChange={(e) => setRestaurante(e.target.value)}
							fullWidth
						>
							{restaurantes.map((restaurante) => (
								<MenuItem key={restaurante.id} value={restaurante.id}>
									{restaurante.nome}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth sx={{ marginTop: 2 }}>
						<InputLabel id='select-restaurante'></InputLabel>
						<MuiFileInput
							placeholder='Teste'
							value={imagemPrato}
							onChange={(e) => setImagemPrato(e)}
						/>
					</FormControl>

					<Button
						sx={{ marginTop: 2 }}
						fullWidth
						type='submit'
						variant='outlined'
					>
						Salvar
					</Button>
				</Box>
			</Box>
		</>
	);
}
