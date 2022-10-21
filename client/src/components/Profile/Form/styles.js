import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    container: {
        padding: 10,
        maxWidth: 700,
        margin: 20,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btn: {
        backgroundColor: '#34568B',
        '&:hover': {
            background: '#294b80',
        },
        marginTop: 30,
        marginRight: 20,
        color: 'white'
    },
    input: {
        marginTop: 30,
    },
    wrongPass: {
        marginLeft: 5,
        marginTop: 10,
        color: 'red'
    }
});

export default useStyles;