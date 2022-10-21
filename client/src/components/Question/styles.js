import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    btn: {
        color: '#34568B',
        marginTop: 10,
        marginBottom: 10
    },
    paper: {
        padding: 10,
        margin: 5,
        marginBottom: 10,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        
    },
    answerInput: {
        marginTop: 10,
        marginBottom: 10
    },
    answerBtn: {
        backgroundColor: '#34568B',
        '&:hover': {
            background: '#294b80',
        },
        color: 'white',
        marginBottom: 10
    },
    answersHeading: {
        marginBottom: 30,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    fullName: {
        color: 'GrayText',
        marginTop: 4,
        marginLeft: 10,
    },
    user: {
        marginTop: 20,
        marginBottom: 10,
    }
});

export default useStyles;