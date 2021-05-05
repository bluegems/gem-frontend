import { Button, TextField, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  submit: {
    margin: '1rem 0 1rem 0',
  },
});

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

function LoginForm() {
  const classes = useStyles();
  const history = useHistory();

  let email;
  let password;
  const [login, { data, error }] = useMutation(LOGIN);

  return (
    <form
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        await login({
          variables: {
            email: email.value,
            password: password.value,
          },
        });
        console.log(data);
        if (!error) {
          history.push('/feed');
        }
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            inputRef={(node) => (email = node)}
            variant="outlined"
            margin="normal"
            type="email"
            id="email"
            name="email"
            label="Email address"
            required
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={(node) => (password = node)}
            variant="outlined"
            margin="normal"
            type="password"
            id="password"
            name="password"
            label="Password"
            required
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        className={classes.submit}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Log in
      </Button>
      <Grid container>
        <Grid item>
          <Link href="/register" variant="body2">
            Don't have an account? Sign up!
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
