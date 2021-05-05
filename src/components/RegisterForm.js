import { Button, TextField, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client';

const useStyles = makeStyles({
  submit: {
    margin: '1rem 0 1rem 0',
  },
});

const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $username: String!
    $firstName: String!
    $lastName: String
  ) {
    register(
      email: $email
      password: $password
      username: $username
      firstName: $firstName
      lastName: $lastName
    ) {
      username
      tag
    }
  }
`;

function RegisterForm() {
  const classes = useStyles();

  let firstName;
  let lastName;
  let username;
  let email;
  let password;
  const [register, { data, loading, error }] = useMutation(REGISTER);

  return (
    <div>
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          register({
            variables: {
              email: email.value,
              password: password.value,
              firstName: firstName.value,
              lastName: lastName.value,
              username: username.value,
            },
          });
          console.log(data);
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={(node) => (firstName = node)}
              autoComplete="fname"
              name="firstName"
              margin="normal"
              variant="outlined"
              id="firstName"
              label="First Name"
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={(node) => (lastName = node)}
              variant="outlined"
              margin="normal"
              id="lastName"
              label="Last Name"
              name="lastName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={(node) => (username = node)}
              variant="outlined"
              margin="normal"
              id="username"
              name="username"
              label="Username"
              required
              fullWidth
            />
          </Grid>
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
          Sign up
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Log in
            </Link>
          </Grid>
        </Grid>
      </form>
      {loading && <p>Loading ...</p>}
      {error && <p>Error !!!</p>}
    </div>
  );
}

export default RegisterForm;
