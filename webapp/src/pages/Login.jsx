import {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import {TextField, Button, Container, Typography, Box} from '@mui/material';
import {toast} from 'react-toastify';

const Login = () => {
    const {login} = useAuth();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            console.log("dang nhap thanh cong")
            toast.success('Đăng nhập thành công!');
        } catch (error) {
            toast.error('Sai tên đăng nhập hoặc mật khẩu!');
            console.log("dang nhap that bai", error)
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{mt: 8, textAlign: 'center'}}>
                <Typography variant="h4">Đăng nhập</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tên đăng nhập"
                        fullWidth
                        margin="normal"
                        value={credentials.username}
                        inputProps={{
                            autoComplete: "username", // Thêm dòng này
                        }}
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={credentials.password}
                        inputProps={{
                            autoComplete: "current-password", // Thêm dòng này
                        }}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{mt: 3}}>
                        Đăng nhập
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
