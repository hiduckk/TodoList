import './App.css';
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


function App(){
  return(
    <TodoListApp />
  )
}
function TodoListApp(){
  const [todo, settodo]=useState('');
  const [list, setlist]=useState([]);
 
  function 할일추가(e){
    e.preventDefault();
    setlist([todo,...list])
    settodo('');
  }

  function deleteClick(삭제할index){
    setlist(
      list.filter((현재값, 요소의index) => 
      (요소의index!==삭제할index)
    ))
  }

  function change(changeIndex, newtodo){
    setlist(list.map((현재값,index)=>(index===changeIndex?newtodo:현재값)))
  }
  // <> 이거안묶어주면 하나의부모 어쩌고 에러뜸
  return(  <div className='userprint'>
    <h1>To-do List</h1> 
    <TodoForm todo={todo} settodo={settodo} 할일추가={할일추가}/>
    <TodoList list={list} setlist={setlist} deleteClick={deleteClick} change={change}/>
    </div>
  )
}

function TodoForm({todo, settodo, 할일추가}){
  return(
    <div className='inputlist'>
    <input 
      placeholder='입력하세요'
      value={todo}
      onChange={(e)=>{settodo(e.target.value)}}></input>
    <button classname="plus" onClick={할일추가}>추가</button> 
</div>)
}
function TodoList ({list, setList, deleteClick, change}){
  let inputlist="할일이 없습니다.";
  if(list.length >0){inputlist=list.map((value, index)=>(
         <TodoListItem
           key={index}
           index={index}
           value={value}
           deleteClick={deleteClick}
           change={change}/>
  ))}
  return(
<ul className='list'>{inputlist}</ul>)
}

function TodoListItem({index, value, deleteClick, change}){
  const[status,setStatus]=useState(false);
  const[newtodo, setNewtodo]=useState([]);
  const[ischeck, setIscheck]=useState(false);
   function modify(){
     change(index, newtodo);
     setStatus(false)
     setNewtodo('')
   }
   function modifycan(){
    setNewtodo('')
    setStatus(false)
  }
  function isChecked(){
    setIscheck(!ischeck)
  }
  return(<li className={ischeck?'hidden':'content'} key={index} value={value}>
    <div><input type='checkbox' onClick={()=>isChecked()}/> {value}</div>
    <div className='totalIcon'>
    {status?
    <div className='newIcon'><input onChange={(e)=>setNewtodo(e.target.value)}
         value={newtodo}></input>
          <button onClick={()=>modify()}>수정완료</button>
          <button onClick={()=>modifycan()}>수정취소</button></div>
    :ischeck?null:<div className='contentIcon'>
      <button onClick={()=>setStatus(true)}><FaEdit className="edit"/></button>
      <button onClick={()=>deleteClick(index)}><FaTrashAlt className="trash"/></button></div>}
    </div></li>
  )
}
export default App;