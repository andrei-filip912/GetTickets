import express from 'express';

const router = express.Router();

router.post('/api/users/signout',  (req, res) => {
    // tell the browser to empty the cookies
    req.session = null;

    res.send({});
 });

export {router as signoutRouter};