import React, { useState ,useRef,useEffect} from 'react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css'
import {axios} from "../../utilities/axios";
import {loginUser, getArticle, clearArticle} from '../../utilities/helpers'

const NewArticle = ()=>{

  const name = useRef('');
  const identifier = useRef('');
  const jp_quillEditor = useRef(null)
  const jp_quill = useRef(null)
  const en_quillEditor = useRef(null)
  const en_quill = useRef(null)
  const [msg,setMsg] = useState()
  const [form,setForm] = useState(true)
  const [checked,setChecked]=useState([{value:'test',checked:false},{value:'test2',checked:false}])

  useEffect(()=>{
    if(jp_quillEditor.current){
      jp_quill.current = new Quill(jp_quillEditor.current,{
        theme:'snow',
        modules:{
          toolbar:[
            [{'font':[]},{'color':[]},'bold','italic'],
            [{'header':1},{'header':2},{'list':'ordered'},{'list':'bullet'}],
            [{'script':'sub'},{'script':'super'}],
            ['link','image','code-block'],
          ]
        }
        });
    }
    if(en_quillEditor.current){
      en_quill.current = new Quill(en_quillEditor.current,{
        theme:'snow',
        modules:{
          toolbar:[
            [{'font':[]},{'color':[]},'bold','italic'],
            [{'header':1},{'header':2},{'list':'ordered'},{'list':'bullet'}],
            [{'script':'sub'},{'script':'super'}],
            ['link','image','code-block'],
          ]
        }
        });
    }
    //load data from article if edit mode
    if(getArticle()){
      axios.get('http://localhost:5000/article/all',
        {params:{
          filter:{_id:getArticle()}
        }})
        .then((res) => {
          const article = res.data.payload[0]
          console.log(article.tags)
          name.current.value = article.name
          setChecked(article.tags)
          identifier.current.value = article.identifier
          jp_quill.current.setContents(article.jp_content[0])
          en_quill.current.setContents(article.en_content[0])
        })
        .catch((err) => {
          setForm(true)
          setMsg([err.message,err.success]);
        });
    }
  },[])

const onSubmit = (e) => {
  e.preventDefault();
  setForm(false)
  console.log(checked)
  if(getArticle()){
    axios.post('http://localhost:5000/article/update',
      { articleId:getArticle(),
        updates:{
          name:name.current.value,
          identifier:identifier.current.value,
          en_content:en_quill.current.getContents(),
          jp_content:jp_quill.current.getContents(),
          tags: checked,
        }
      })
      .then((res) => {
        setMsg([res.data.message,res.data.success]);
        window.location='/dash'
      })
      .catch((err) => {
        setForm(true)
        setMsg([err.message,err.success]);
      });
  }
  else{
    axios.post('http://localhost:5000/article/new',
      {
        name:name.current.value,
        identifier:identifier.current.value,
        en_content:en_quill.current.getContents(),
        jp_content:jp_quill.current.getContents(),
        tags: checked,
      })
      .then((res) => {
        setMsg([res.data.message,res.data.success]);
        window.location='/dash'
      })
      .catch((err) => {
        setForm(true)
        setMsg([err.message,err.success]);
      });
  }
  clearArticle()

}


  return (
    <div class='col'>
      <div class='col'>
        <form onSubmit={onSubmit}>
          <div class="master-row form-group border">
              <div class='row'>
                <input ref={name} onChange={()=>identifier.current.value=name.current.value.replace(/ /g,'_')} class='form-control' minlength='1' placeholder='Article Name'  required/>
                <input ref={identifier} class='form-control' minlength='1' placeholder='Identifier'  required/>
              </div>              
              <div ref={en_quillEditor}>
              </div>
              <div ref={jp_quillEditor}>
              </div>
              <div class='row'>
                <Checkboxes options={checked} setChecked={setChecked}/>
              </div>
                {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                <div class='row'>
                    {form?<button class='form-control solid-first' type="submit">Save</button>:'Loading...'}
                </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default NewArticle;

const Checkboxes = ({options,setChecked})=>{
  const handleChange =(e)=>{
    const {name, checked} = e.target
    setChecked(prevState=>(prevState.map(obj =>
      obj.value === name? {...obj,checked} :obj
    )))
  }
  return (
    <div>
      {options.map(option=>(
        <label class='checkbox_container' key={option.value}>
          {option.value}
          <input type='checkbox' name={option.value} checked={option.checked} onChange={handleChange}/>
        </label>
      ))}
    </div>
  )
}
