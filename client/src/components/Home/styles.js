import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        direction: 'row',
        marginBottom: 10
    },
    item: {
        padding: 10,
        width: 400
    },
    askContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        padding: 10,
        margin: 10,
        marginTop: 20,
        maxWidth: 1255,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btn: {
        marginTop: 10,
        color: 'white',
        backgroundColor: '#34568B',
        '&:hover': {
            background: '#294b80',
        },
    },
    inputAnswer: {
       
    }
});

export default useStyles;