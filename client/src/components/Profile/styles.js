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
    avatar: {
        background: '#34568B', 
        width: 70, 
        height: 70,
        marginBottom: 20,
    },
    btn: {
        marginTop: 10,
    },
    redirection: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        cursor: 'pointer'
    },
    info: {
        maxWidth: 300, 
        overflow: 'hidden', 
        textOverflow: 'ellipsis'
    }
});

export default useStyles;