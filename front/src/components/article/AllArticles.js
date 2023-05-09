import React, { useState ,useRef,useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import {axios} from "../../utilities/axios";
import {loginUser, setArticle} from '../../utilities/helpers'
import moment from 'moment-timezone'

const AllArticles = ()=>{
  const [articles,setArticles] =useState()
  const [msg,setMsg] = useState()

  useEffect(()=>{
    axios.get('http://localhost:5000/article/all',
      {params:{fields:'name createdAt read_count search_count status'}})
      .then((res) => {
        setArticles(res.data.payload);
      })
      .catch((err) => {
        setMsg([err.message,err.success]);
      });
  },[])

  const onSubmit = (e,articleId) => {
    e.preventDefault();
    setArticle(articleId)
    window.location.reload()
  }

  return (
    <div class='col'>
      <table>
          <tr>
            <td>Name</td>
            <td>Created</td>
            <td>Read</td>
            <td>Searched</td>
            <td>Status</td>
         </tr>
        {articles?articles.map(article =>{
          return <tr onClick={(e)=>onSubmit(e,article._id)}>
                    <td>{article.name}</td>
                    <td>{moment(article.createdAt).format("MMM Do HH:mm")}</td>
                    <td>{article.read_count}</td>
                    <td>{article.search_count}</td>
                    <td>{article.status}</td>
                 </tr>
        }):'No articles found'}
      </table>
    </div>
  )
}
export default AllArticles;
