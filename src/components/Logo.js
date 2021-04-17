import BlueGemsLogo from '../bluegem.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    image: props => ({
        width: props.width,
        height: props.height
    })
})

function Logo(props) {
    const classes = useStyles(props);

    return (
        <img className={classes.image} src={BlueGemsLogo} alt='Bluegems icon' variant='square'/>
    )
}

export default Logo;