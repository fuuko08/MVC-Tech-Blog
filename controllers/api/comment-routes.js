const router = require('express').Router();
const { User, Post, Comment  } = require('../../models');
const withAuth = require('../../utils/auth');

// get comments ('api/comment')
router.get('/', withAuth, async (req, res) => {
  try{ 
   const dbCommentData = await Comment.findAll({
     include: [User],
   });
   const comments = dbCommentData.map((comment) => comment.get({ plain: true }));
   res.render('single-post', {comments, loggedIn: req.session.loggedIn});
 } catch(err) {
     res.status(500).json(err);
 }
 });

// create comment ('/api/comment')
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newComment = await Comment.create({
            ...body,
            userId: req.session.userId,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete comment ('api/comment/:id')
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const dbCommentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!dbCommentData) {
        res.status(404).json({
          message: `No post owned by user id = ${req.session.userId} found with id = ${req.params.id}`,
        });
        return;
      }
  
      res.status(200).json(dbCommentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;