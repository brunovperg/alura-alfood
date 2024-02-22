import {
	AppBar,
	Box,
	Button,
	Container,
	Link,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
const AdminLink = ({
	to,
	children,
}: {
	to: string;
	children: React.ReactNode;
}) => (
	<Link component={RouterLink} to={to}>
		<Button sx={{ my: 2, color: 'white' }}>{children}</Button>
	</Link>
);

export default function DefaultAdminPage() {
	return (
		<>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar>
						<Typography variant='h6'>Administração</Typography>
						<Box
							sx={{
								display: 'flex',
								flexGrow: 1,
								justifyContent: 'space-evenly',
							}}
						>
							<AdminLink to='/'>Início</AdminLink>
							<AdminLink to='/admin/restaurantes'>Restaurantes</AdminLink>
							<AdminLink to='/admin/restaurantes/novo'>
								Novo Restaurante
							</AdminLink>
							<AdminLink to='/admin/pratos'>Pratos</AdminLink>
							<AdminLink to='/admin/pratos/novo'>Novo Prato</AdminLink>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Box>
				<Container maxWidth='lg' sx={{ marginTop: 1 }}>
					<Paper sx={{ padding: 2 }}>{<Outlet />}</Paper>
				</Container>
			</Box>
		</>
	);
}
