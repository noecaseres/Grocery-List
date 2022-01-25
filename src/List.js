import React, {useState,useEffect} from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const List = ({items, removeItem, setList}) => {

    const [isEditing,setIsEditing]=useState(false);
    const [editname, seteditName] = useState('');
    const [editID,setEditID]=useState(null);

    const editItem=(id)=>{
        const specificItem = items.find((item) => item.id === id)
        seteditName(specificItem.title)
        setEditID(id)
        setIsEditing(true);
    }

    const seteditItem=(e)=>{
        const newList = items.map((item)=>{
            if (item.id === editID){
                return {...item, title: editname}
            }
            return item;
        })
        setList(newList)
        setIsEditing(false);
    }

    return (
        <div>
            {items.map((item)=>{
                const {id, title}=item;
                return(
                    <article key={id} className='list-item d-flex justify-content-between align-items-center mt-4 mb-4'>
                        {(isEditing && item.id == editID) ? 
                            <input
                            className='search-input'
                            type='text'
                            value={editname}
                            onChange={(e)=>seteditName(e.target.value)}
                            />  : <p className='item-lable m-0'>{title}</p>  
                        }
                        <div>
                        {isEditing 
                        ? 
                                <button
                                    className='btn-save border-0 ps-2 pe-2 bg-transparent'
                                    onClick={()=>seteditItem(id)}   
                                    >
                                    Save
                                </button> 
                        : 
                            <>
                                <button
                                    className='btn-fa border-0 me-1 bg-transparent'
                                    onClick={()=>editItem(id)}    
                                >
                                    <FaEdit/>
                                </button>
                            
                                <button 
                                    className='btn-fa border-0 bg-transparent'
                                    onClick={()=>removeItem(id)}
                                >
                                    <FaTrash/>
                                </button>

                            </>
                            
                        }
                            
                        </div>     
                    </article>
                    
                )

            })}
        </div>
    )
}
