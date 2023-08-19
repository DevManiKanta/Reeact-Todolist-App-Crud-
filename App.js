import { useState,useEffect } from "react";
import axios from'axios';
import  './App.css';
import { Button } from "react-bootstrap";
function App() {
const [data,setData]=useState([]);// used usestate to store data
const [editValue,seteditValue]=useState({title:""});// usestate used to store the input value
const [enter,setEnter]=useState();
useEffect(()=>{//useeffect maily used to control the rerendering of a component
  submit()
},[])
const submit=async()=>{
  //axios method used to call apis
   let resp = await axios.get("https://jsonplaceholder.typicode.com/users/1/todos")
  setData(resp.data)
}
const todo=async()=>{
  let newRecord = {
    id:data.id,
    title:enter,
    completed: 'yes'
  }
  // axios post method to post the input details
  let result=await axios.post("https://jsonplaceholder.typicode.com/users/1/todos",newRecord)
  console.log(result.data)
  setData([...data,newRecord])
}
const submitTodo=(e)=>{
  e.preventDefault();
  setEnter(e.target.value)
}
const DeleteTodo=(index)=>{
  var temp = [...data];
  temp.splice(index,1)
  setData([...temp])
}
const DoneTodo=(index)=>{
var temp=[...data];
temp[index].completed= false
 setData([...temp])

}
const undoTodo=(index)=>{
  var temp=[...data];
temp[index].completed=true
 setData([...temp])

}


const updated=()=>{
   const mappedList=data.map((item)=>{
    //console.log(item.title)
    if(item.id===editValue.id){
      item.title= editValue.title;
    }
    return item
   })
   setData(mappedList)
}
const EditItem=(item)=>{
  seteditValue(item)
}

  return (
    
    <center>
      <h1>TodoList-APP</h1>
    
     <div className="main">
      <div className="child">
   
   <input type="text" placeholder="Edit your Todo" value={editValue.title} onChange={(e)=>seteditValue({...editValue, title : e.target.value})}/><br/><br/>
   <Button variant="warning" onClick={updated}>Update Todo</Button><br/><br/>
   <input type="text" placeholder="Add newTodo" onChange={submitTodo}/><br/><br/>
   <Button variant="info"  onClick={todo}>Add NewTodo</Button>
   
  
   </div><br/>
      
        <div>
        
<table >
  <thead>
    <tr>

      <td>Id</td>
      <td>title</td>
      <td></td>
      <td>Edit</td>
      <td>Delete</td>
      <td>Done/Undo</td>
    </tr>
  </thead>
  <tbody>
    
    {
      // to display we can use map method 
      data.map((item,i) =>{
        return <tr key={i}  className={item.completed===true?"text-decoration-line-through":""}><td>{item.id}</td>
                <td style={{ color:"black"}} >{item.title}</td><br/>
                <td><Button variant="warning" onClick={()=>{EditItem(item)}}>Edit</Button></td>
                <td><Button variant="danger" onClick={()=>{DeleteTodo(i)}}>Delete</Button></td>
                <td>{item.completed===true?(<Button onClick={()=>{DoneTodo(i)}}>Done</Button>):(<Button onClick={()=>{undoTodo(i)}}>Undo</Button>)}</td>
                </tr>
                
      })
    }
   
  </tbody>
</table><br/>
</div>

     </div>

     </center>
           
    
  );
}

export default App;
