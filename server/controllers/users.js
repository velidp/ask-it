const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
const pool = require('../db.js');


const signin = async (req, res) => {

    const { email, password } = req.body;
    
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(!existingUser.rowCount) return res.status(404).json({ message: 'User does not exist.'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.rows[0].password);

        if(!isPasswordCorrect) return res.status(400).json({message: 'Wrong Password'});

        const token = jwt.sign({ email: existingUser.rows[0].email, id: existingUser.rows[0].id}, 'test', {expiresIn: '1h'});

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({message: 'Error'});
    }
}

const signup = async (req, res) => {
    const { email, password, confirmPassword , firstName, lastName } = req.body;

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if(existingUser.rowCount) return res.status(400).json({ message: 'User already exist.'});

        if(password.length < 5) return res.status(401).json({ message: 'Minimal 5 characters.'});

        if(!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
            return res.status(401).json({ message: 'Invalid email.'});

        if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords does not match.'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await pool.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, email, hashedPassword]);

        const token = jwt.sign({ email: result.rows[0].email, id: result.rows[0].id}, 'test', {expiresIn: '1h'});

        res.status(200).json({ result, token });

    } catch (error) {
        res.status(500).json({message: 'Error'});
    }
}


const updateUser = async (req, res) => {

    const { id } = req.params;

    const existingUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if(!existingUser.rowCount) return res.status(404).json({ message: 'No user with that id.'});

    const isPasswordCorrect = await bcrypt.compare(req.body.currentPassword, existingUser.rows[0].password);

    if(!isPasswordCorrect) return res.status(400).json({message: 'Wrong Password'});

    let hashedPassword;

    if(req.body.newPassword.length > 0) {
        hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
    } else {
        hashedPassword = await bcrypt.hash(req.body.currentPassword, 12);
    }

    await pool.query('UPDATE users SET first_name = $1, last_name = $2, password = $3 WHERE id = $4', [req.body.firstName, req.body.lastName, hashedPassword, id]);

    const updatedUser = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    const token = jwt.sign({ email: updatedUser.rows[0].email, id: updatedUser.rows[0].id}, 'test', {expiresIn: '1h'});

    res.json({ updatedUser, token });;
}


const topUsers = async (req, res) => {
    try {    

        const topUsers = await pool.query(' SELECT u.id, u.first_name, u.last_name, u.email, count(ans.id) ' +
        ' FROM users u LEFT JOIN answer ans ON ans.creator_id = u.id ' +
        ' GROUP BY u.first_name, u.last_name, u.email,u.id ' +
        ' ORDER BY count(ans.id) desc' );

        res.status(200).json(topUsers.rows);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}


const getNotifications = async (req, res) => {
    const { id } = req.params;

    try {    
        const notifications = await pool.query(
            ' SELECT u.first_name as questionCreatorFn, u.last_name as questionCreatorLn, ans.answer, usr.first_name, usr.last_name, q.question ' +
            ' FROM notifications n ' +
            ' JOIN answer ans ON ans.id = n.answer_id ' +  
            ' LEFT JOIN users u ON n.question_creator_id = u.id ' +
            ' LEFT JOIN users usr ON n.answer_creator_id = usr.id ' +
            ' LEFT JOIN questions q ON q.id = n.question_id ' +
            ' WHERE n.question_creator_id = $1 AND n.answer_creator_id != $1 ', 
        [id]);
        
        res.status(200).json(notifications.rows);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { signin, signup, updateUser, topUsers, getNotifications };