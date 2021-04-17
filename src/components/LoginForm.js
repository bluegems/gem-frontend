import { Button, TextField, Grid, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    submit: {
        margin: '1rem 0 1rem 0'
    }
})

function LoginForm() {
    const classes = useStyles();
    return (
    <form noValidate>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    id='email'
                    name='email'
                    label='Email address'
                    required
                    fullWidth
                    autoFocus
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
        {/* <div className={classes.formControl}>
            <FormControlLabel
                control={<Checkbox value='remember' color='primary'/>}
                label='Remember me'
            />
        </div> */}
        <Button className={classes.submit} type='submit' fullWidth variant='contained' color='primary'>Log in</Button>
        <Grid container>
            <Grid item>
            <Link href="#" variant="body2">
                {"Don't have an account? Sign up!"}
            </Link>
            </Grid>
        </Grid>
    </form>

    )
}

export default LoginForm;
