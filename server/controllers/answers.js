const pool = require('../db.js');


const deleteAnswer = async (req, res) => {
    const { id } = req.params;
    
    await pool.query('DELETE FROM notifications WHERE answer_id = $1', [id]);
    await pool.query('DELETE FROM answers_likes WHERE answer_id = $1', [id]);
    await pool.query('DELETE FROM answer WHERE id = $1', [id]);

    res.json({ message: 'Answer Deleted' });
}

const updateAnswer = async (req, res) => {

    const { id } = req.params;

    const answer = req.body;

    try {
        await pool.query('UPDATE answer SET answer = $2 WHERE id = $1', [id, answer.answer]);
        res.json({ message: 'Answer Updated' });
    } catch (error) {
        console.log(error);
    }

}

const createAnswer = async (req, res) => {

    const answer = req.body;


    try {
        const newAnswer = await pool.query(
            'INSERT INTO answer (answer, creator_id, question_id) VALUES($1, $2, $3) RETURNING *',
            [answer.answer, answer.creatorId, answer.questionId]
        );

        
        const questionCreator = await pool.query(
            'SELECT creator_id  FROM questions WHERE id = $1', [answer.questionId]
        );

        await pool.query(
            'INSERT INTO notifications (question_creator_id, answer_creator_id, question_id, answer_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [questionCreator.rows[0].creator_id, answer.creatorId, answer.questionId, newAnswer.rows[0].id]
        );
      
        res.json(newAnswer.rows[0]);
    } catch (error) {
        console.log(error);
    }

}


const likeAnswer = async (req, res) => {
    
    const like = req.body;
    
    try {
        const existedLike = await pool.query('SELECT * FROM answers_likes WHERE creator_id = $1 AND answer_id = $2', [like.creatorId, like.answerId]);
        
        let newLike;
        
        if(existedLike.rows.length === 0) {
            newLike = await pool.query('INSERT INTO answers_likes (creator_id, answer_id) VALUES ($1, $2) RETURNING *', [like.creatorId, like.answerId]);
        } else {
            newLike = await pool.query('DELETE FROM answers_likes WHERE creator_id = $1 AND answer_id = $2 RETURNING *', [like.creatorId, like.answerId]);
        }
        
        res.json(newLike.rows);
    } catch (error) {
        console.log(error);
    }
}


module.exports = { deleteAnswer, updateAnswer, createAnswer, likeAnswer };