const router = require('express').Router();
const auth= require('../../services/authentication');
const Article = require('./model')

// create new article
const createArticle = (article) =>{
  console.log('new article',article)
  try{
    new Article({
      ...article,
      status: 'draft'
    }).save();
    return {success:true}
  }catch(err){
    console.log('failed',err)
    return {success:false,log:err}
  }
}

// get all articles
const getArticles = async (query)=>{
  console.log('get articles',query)
  try{
    const result = await Article.find(
        query.filter?JSON.parse(query.filter):{},
        query.fields?query.fields:{}
      )
    return {success:true,payload:result}
  }
  catch(err){return {success:false,log:err}}
}

const updateArticle = async (changes)=>{
  console.log('update articles',changes)
  try{
    const result = await Article.findByIdAndUpdate(
        changes.articleId,
        changes.updates,
        {new:true}
      )
    return {success:true,payload:result}
  }
  catch(err){return {success:false,log:err}}
}

module.exports = {createArticle,getArticles,updateArticle};
