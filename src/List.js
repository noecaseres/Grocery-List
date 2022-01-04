import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const List = ({items, removeItem, editItem}) => {
    return (
        <div>
            {items.map((item)=>{
                const {id, title}=item;
                return(
                    <article key={id} className='list-item d-flex justify-content-between align-items-center mt-4 mb-4'>
                        <p className='item-lable m-0'>{title}</p>
                        <div>
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
                        </div>     
                    </article>
                    
                )

            })}
        </div>
    )
}
