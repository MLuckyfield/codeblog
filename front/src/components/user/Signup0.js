import React, { useState ,useRef} from 'react';
import {axios} from "../../utilities/axios";
import {loginUser} from '../../utilities/helpers'

const Signup = (props)=>{
  const email = useRef('');
  const first = useRef('');
  const last = useRef('');
  const password = useRef('');
  const [msg,setMsg] = useState()
  const [form,setForm] = useState(true)

const onSubmit = (e) => {
  e.preventDefault();
  setForm(false)
  axios.post('http://localhost:5000/user/new',
    {
      first:first.current.value,
      last:last.current.value,
      password:password.current.value,
      email: email.current.value,
    })
    .then((res) => {
      loginUser(res.data.result);
      setMsg([res.data.message,res.data.success]);
      window.location='/dash'
    })
    .catch((err) => {
      setForm(true)
      setMsg([err.message,err.success]);
    });
}


  return (
    <div id='signup' class='col'>
      <div class='col'>
        <form onSubmit={onSubmit}>
          <div class="master-row form-group border">
              <div class='row'>
                <input ref={first} class='form-control' minlength='1' placeholder='First Name'  required/>
                <input ref={last} class='form-control' minlength='1' placeholder='Last Name'  required/>
              </div>
              <div class='row'>
                <input ref={email} class='form-control' type='email' placeholder='Email'  required/>
              </div>
              <div class='row'>
                <input ref={password} class='form-control' type='Password' placeholder='Password' required/>
              </div>
                {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                <div class='row'>
                    {form?<button class='form-control solid-first' type="submit">Sign Up</button>:'Loading...'}
                </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Signup;
