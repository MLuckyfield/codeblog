const router = require('express').Router();
const auth= require('../../services/authentication');
const services = require('./services')


// create new article
router.post('/new', async (req, res) => {
  let result = await services.createArticle(req.body)
  if(result.success){
    return res.status(201).json({
    message: 'Article created',
    success: true
  });}
  return res.status(500).json({
    message: `user creation unsuccessful: ${result.log}`,
    success: false
  });
})

// get all articles
router.get('/all', async (req, res) => {
  const result = await services.getArticles(req.query)
  console.log('from service',result)
  if(result.success){
    return res.status(201).json({
    payload:result.payload,
    message: 'Article created',
    success: true
  });}
  return res.status(500).json({
    message: `user creation unsuccessful: ${result.log}`,
    success: false
  });
})

// get all articles
router.post('/update', async (req, res) => {
  const result = await services.updateArticle(req.body)
  console.log('from service',result)
  if(result.success){
    return res.status(201).json({
    payload:result.payload,
    message: 'Article created',
    success: true
  });}
  return res.status(500).json({
    message: `user creation unsuccessful: ${result.log}`,
    success: false
  });
})
module.exports = router;
