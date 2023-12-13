import React, { useState } from 'react'
import { Pencil } from 'tabler-icons-react';
import { IconTrashFilled } from '@tabler/icons-react'


const UserList = ({ users, deleteUser, handleUpdateUser }) => {

  

  return (
    <section className='grid gap-6 grid-cols-[repeat(auto-fill,_280px)] justify-center mx-auto max-w-[1200px] py-10'>
        
      {users.map((user) => 
      
        <article key={user.id}
          style={{borderBottom: '4px solid #FC4044' }} className={'border p-2 py-2 px-2 first-line:hover:shadow-lg transition-shadow grid gap-2 rounded-md shadow-lg bg-[#FFF]'}
        >
          
          <div>
            <div>
              <img src='https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp' 
               alt='img'
               className='rounded-sm'
              />
            </div>
            

            <h2 className='items-center justify-center flex text-[#414177] font-semibold text-lg'>
              {user.first_name} {user.last_name}
            </h2>

            <div class="border border-g-500  ..."></div>
          </div>

          <ul>
            

            <li>
              <span className='font-light text-gray-400 grid'>CORREO</span>{user.email}
            </li>
            <li>
              <span className='font-semibold'>Contrasena: </span>{user.password}
            </li>

          </ul>
          <div className='flex gap-2 justify-end'>
            <button onClick={() => handleUpdateUser(user)}
              className='rounded-md p-1 text-white bg-yellow-500 hover:shadow-lg hover:bg-yellow-400 transition-colors'
            >
              <Pencil />
            </button>
            <button onClick={() => deleteUser(user.id)}
             className='rounded-md p-1 text-white bg-red-500 hover:shadow-lg hover:bg-red-400 transition-colors'
            >
             <IconTrashFilled />
            </button>
          </div>
        
        </article>
      
       
      )}
      

    </section>
  )
}

export default UserList