import { Button, TextField, Grid, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    submit: {
        margin: '1rem 0 1rem 0'
    }
})

function RegisterForm() {
    const classes = useStyles();
    return (
    <form noValidate>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="fname"
                name="firstName"
                margin='normal'
                variant="outlined"
                id="firstName"
                label="First Name"
                required
                autoFocus
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                variant="outlined"
                margin='normal'
                id="lastName"
                label="Last Name"
                name="lastName"
            />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    id='username'
                    name='username'
                    label='Username'
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    id='email'
                    name='email'
                    label='Email address'
                    required
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    id='password'
                    name='password'
                    label='Password'
                    required
                    fullWidth
                />
            </Grid>
        </Grid>
        <Button className={classes.submit} type='submit' fullWidth variant='contained' color='primary'>Sign up</Button>
        <Grid container>
            <Grid item>
            <Link href="#" variant="body2">
                {"Already have an account? Log in"}
            </Link>
            </Grid>
        </Grid>
    </form>
    )
}

export default RegisterForm;
