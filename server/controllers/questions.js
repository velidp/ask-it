const pool = require('../db.js');


const getQuestions = async (req, res) => {
    try {    
        const newQuestions = await pool.query('SELECT q.id, q.question, u.first_name, u.last_name, count(l.id) ' + 
        ' FROM questions q LEFT JOIN users u ON q.creator_id = u.id ' + 
        ' LEFT JOIN questions_likes l ON l.question_id = q.id ' +
        ' GROUP BY q.id, u.first_name, u.last_name' +
        ' ORDER BY q.id DESC ');


        for(let i=0; i<newQuestions.rows.length; i++) {
            const answers = await pool.query('SELECT ans.id, ans.creator_id, u.first_name, u.last_name, ans.answer, COUNT(l.id) ' + 
            ' FROM answer ans LEFT JOIN users u ON ans.creator_id = u.id ' + 
            ' LEFT JOIN answers_likes l ON l.answer_id = ans.id ' +
            ' WHERE ans.question_id = $1 ' +
            ' GROUP BY ans.id, u.first_name, u.last_name ' +
            ' ORDER BY COUNT(l.id) desc ', [newQuestions.rows[i].id]);
            newQuestions.rows[i]['answers'] = answers.rows;
        }

        res.status(200).json(newQuestions.rows);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const myQuestions = async (req, res) => {
   
    const { id } = req.params;
    
    try {    

        const questions = await pool.query('SELECT q.id, q.question, u.first_name, u.last_name, COUNT(l.id) ' + 
        ' FROM questions q left join users u ON q.creator_id = u.id ' + 
        ' LEFT JOIN questions_likes l ON l.question_id = q.id ' +
        ' WHERE q.creator_id = $1 ' +
        ' GROUP BY q.id, u.first_name, u.last_name', [id]);

        
        for(let i=0; i<questions.rows.length; i++) {
            const answers = await pool.query('SELECT ans.id, ans.creator_id, u.first_name, u.last_name, ans.answer, COUNT(l.id) ' + 
            ' FROM ANSWER ans LEFT JOIN users u ON ans.creator_id = u.id ' + 
            ' LEFT JOIN answers_likes l ON l.answer_id = ans.id ' +
            ' WHERE ans.question_id = $1 ' +
            ' GROUP BY ans.id, u.first_name, u.last_name ' +
            ' ORDER BY COUNT(l.id) DESC ', [questions.rows[i].id]);
            questions.rows[i]['answers'] = answers.rows;
        }

        res.status(200).json(questions.rows);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const hotQuestions = async (req, res) => {
    try {    
        const newQuestions = await pool.query('SELECT q.id, q.question, u.first_name, u.last_name, COUNT(l.id) ' + 
        ' FROM questions q LEFT JOIN users u ON q.creator_id = u.id ' + 
        ' LEFT JOIN questions_likes l ON l.question_id = q.id ' +
        ' GROUP BY q.id, u.first_name, u.last_name' +
        ' ORDER BY COUNT(l.id) desc ');


        for(let i=0; i<newQuestions.rows.length; i++) {
            const answers = await pool.query('SELECT ans.id, ans.creator_id, u.first_name, u.last_name, ans.answer, COUNT(l.id) ' + 
            ' FROM answer ans LEFT JOIN users u ON ans.creator_id = u.id ' + 
            ' LEFT JOIN answers_likes l ON l.answer_id = ans.id ' +
            ' WHERE ans.question_id = $1 ' +
            ' GROUP BY ans.id, u.first_name, u.last_name ' +
            ' ORDER BY count(l.id) DESC ', [newQuestions.rows[i].id]);
            newQuestions.rows[i]['answers'] = answers.rows;
        }


        res.status(200).json(newQuestions.rows);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}




const createQuestion = async (req, res) => {

    const question = req.body;

    try {    
        const newQuestion = await pool.query(' INSERT INTO questions (question, creator_id) VALUES ($1, $2) ', [question.question, question.creatorId] );
        res.status(201).json(newQuestion.rows);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

const likeQuestion = async (req, res) => {
    
    const like = req.body;

    try {
        const existedLike = await pool.query('SELECT * FROM questions_likes WHERE creator_id = $1 AND question_id = $2', [like.creatorId, like.questionId]);
        
        let newLike;
        
        if(existedLike.rows.length === 0) {
            newLike = await pool.query('INSERT INTO questions_likes (creator_id, question_id) VALUES ($1, $2) RETURNING *', [like.creatorId, like.questionId]);
        } else {
            newLike = await pool.query('DELETE FROM questions_likes WHERE creator_id = $1 AND question_id = $2 RETURNING *', [like.creatorId, like.questionId]);
        }
        
        res.status(200).json(newLike.rows);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getQuestions, createQuestion, myQuestions, hotQuestions, likeQuestion };