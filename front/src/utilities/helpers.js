
// import * as constants from './constants'
import {axios} from "./axios";

//currentUser related helpers
export const loginUser = (user) =>{
  localStorage.setItem('user', JSON.stringify(user));
}
export const logoutUser = (user) =>{
  localStorage.removeItem('user');
}
export const getCurrentUser = ()=>{
  return JSON.parse(localStorage.getItem('user'));
}
//Articlerelated helpers
export const setArticle = (article)=>{
  localStorage.setItem('article', JSON.stringify(article));
}
export const getArticle = (article)=>{
  return JSON.parse(localStorage.getItem('article'));
}
export const clearArticle = (article)=>{
  localStorage.removeItem('article');
}
