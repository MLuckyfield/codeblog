import React, { useState ,useRef,useEffect} from 'react';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css'
import {axios} from "../../utilities/axios";
import {loginUser, setArticle} from '../../utilities/helpers'
import moment from 'moment-timezone'

const ViewArticle = ()=>{
  const [article,setArticle] =useState()
  const [msg,setMsg] = useState()
  const quillEditor = useRef(null)
  const quill = useRef(null)

  useEffect(()=>{
    //if url has article identifier, load article
    const articleId = window.location.pathname.slice(0,5)==='/blog'?window.location.pathname.slice(6,30):'';
    if(articleId){
      console.log(window.location.pathname,window.location.pathname.slice(6,30))
      axios.get('http://localhost:5000/article/all',
        {params:{
          filter:{identifier:articleId}
        }})
        .then((res) => {
          console.log(res.data.payload[0].en_content[0])
          setArticle(res.data.payload[0]);
          //initalize quill
          if(quillEditor.current){
            quill.current = new Quill(quillEditor.current,{
              readOnly:true,
              });
            quill.current.setContents(res.data.payload[0].en_content[0])
          }
        })
        .catch((err) => {
          setMsg([err.message,err.success]);
        });
    }
  },[])

  return (
    <div class='col' style={{maxWidth:'80%', alignItems:'center',alingContent:'center'}}>
      <div ref={quillEditor}>
      </div>
    </div>
  )
}
export default ViewArticle;
