import Logo from '../components/Logo';
import { Container, Typography, CssBaseline } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '4rem'
    }
});

function Login() {
    const classes = useStyles();

    return (
        <Container maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Logo width='8rem'/>
                <Typography variant='h3' component='h3'>Log in</Typography>
                <LoginForm />
            </div>
        </Container>
    )
}

export default Login;
