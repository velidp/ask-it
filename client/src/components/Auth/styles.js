import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    paper: {
        width: 300,
        padding: 15,
        margin: 15,
    },
    grid: {
        align: 'center',
        justify: 'center', 
        alignItems: 'center',
    },
    text: {
        width: 300,
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    form: {
        marginLeft: 15,
        marginTop: 15,
    },
    text2: {
        width: 141,
    },
    grid2: {
        marginLeft: 17,
    },
    gridInner: {
        marginTop: 20,
    },
    buttons: {
        marginTop: 10
    },
    wrongPass: {
        marginLeft: 5,
        color: 'red'
    },
    redirection: {
        marginTop: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        cursor: 'pointer'
    },
    btn: {
        backgroundColor: '#34568B',
        '&:hover': {
            background: '#294b80',
        },
    }
});

export default useStyles;