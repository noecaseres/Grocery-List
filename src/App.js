import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import { Alert } from './Alert';
import { List } from './List';


const getLocalStorage = ()=>{
    let list = localStorage.getItem('list');
    if(list){
        return (list = JSON.parse(localStorage.getItem('list')));
    }else{
        return [];
    }
}

const App = () => {

    const [name, setName] = useState('');
    const [list, setList] =useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editID,setEditID]=useState(null);
    const [alert, setAlert]= useState({show:false, type:'', msg:''});

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!name) {
            showAlert(true,'danger', 'Please enter a value')
        }
        //si existe el name y ademas se quiere editar:
        else if (name && isEditing){
            setList(
            list.map((item)=> {
                if (item.id === editID){
                    return {...item, title: name}
                }
                return item;
            })
            )
            setName('');
            setEditID(null);
            setIsEditing(false);
            showAlert(true, 'success', 'Value changed');

        } else {
            showAlert(true, 'success', 'Item added to the list');
            const newItem = {id: new Date().toString(), title:name};
            setList ([ newItem, ...list]);
            setName ('')
        }
    }

    const showAlert = (show = false, type= '' , msg='')=> {
        setAlert({show, type, msg})
    }

   const clearList = () => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          )
          showAlert(true,'','');
          setList([])
        }
      })
    
   }

   const removeItem = (id) =>{
       showAlert(true, 'danger','Item removed');
       setList(list.filter((item) => item.id!==id));
   }

   const editItem = (id) =>{
    
        const specificItem = list.find((item)=> item.id === id);       
       setIsEditing(true);
       setEditID(id);
       setName(specificItem.title)  
   }

   useEffect(() => {
       localStorage.setItem('list', JSON.stringify(list))
   }, [list]);


    return (  
        <div className='main-modal d-flex flex-column justify-content-center align-items-center shadow bg-white p-5'>
            <form className='w-100' onSubmit={handleSubmit}>               
                    <h1 className='text-center'>Grocery</h1>
                    <div className='d-flex justify-content-between mt-3 mb-4'>  
                        <input
                            className='search-input'
                            type='text'
                            placeholder='e.g eggs'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}           
                            />
                        <button 
                        className='btn-submit border-0'
                        type="submit"
                        >{ isEditing ? 'edit' : 'Add to list'}</button>
                        
                    </div>   
            </form>

            {/* Paso todas las props de list al Alert {...list}  */}
            {alert.show && <Alert {...alert} removeAlert={showAlert} list = {list} />}

            {list.length > 0 && ( 
                    <div className='d-flex flex-column w-100'>
                        <List items={list} removeItem={removeItem} editItem = {editItem}/>
                        <button
                            className='btn-clear '
                            onClick={clearList}
                        >
                            Clear Items
                        </button>
        
                    </div>
            )}


        </div>
    )
}

export default App

