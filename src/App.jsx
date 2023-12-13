// En App.jsx
import React, { useEffect, useState } from 'react';
import ModalList from './Components/ModalList';
import UserList from './Components/UserList';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserPlus } from 'tabler-icons-react';

const BASE_URL = "https://users-crud.academlo.tech/";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null)
  

  const {register, handleSubmit, reset, formState} = useForm();


  const handleOpenModal = () => {
    setOpenModal(true);

  };

  const handleCloseModal = () => {
    setOpenModal(false);
    //Para limpiar los campos cuando se cree un nuevo usuario y cierre el modal
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    });
    setUserToEdit(null)

  };

  const handleUpdateUser = (user) => {
    handleOpenModal();
    setUserToEdit(user)
  }




  //Funcion creacion del usuario
  const createUser = (newUser) => {
    axios.post(BASE_URL + "/users/", newUser)
    .then(({ data: newUser }) => {
      setUsers([...users, newUser])
      handleCloseModal()
      
    })
    .catch((err) => console.log(err))
  }

  //verificamos si hay un usuario para editar y montamos la informacion
  useEffect(() => {

    if(userToEdit !== null){
      reset(userToEdit)
    }
  
   
  }, [userToEdit])
  
  //
  
  

  //Funcion eliminar usuario
  const deleteUser = (idDeleteUser) => {
    axios.delete(BASE_URL + `/users/${idDeleteUser}/`)
    .then(() => {
      const newUsers = users.filter((user) => user.id !== idDeleteUser)
      setUsers(newUsers)
    })
    .catch((err) => console.log(err))
  }


  //Funcion actualizar usuario
  const updateUser = (user) => {
    axios.put(BASE_URL + `/users/${userToEdit.id}/`, user)
    .then(({ data:  userToUpdating}) => {
      handleCloseModal()
      const newUser = users.map((user) => user.id === userToEdit.id ? userToUpdating : user)
      
      setUsers(newUser)
      handleCloseModal()
    })
    .catch((err) => console.log(err))
  }
  

  //usamos useEffect para hacer la peticion a la api y traer los usuarios
  useEffect(() => {
    
    axios
    .get(BASE_URL + "/users/")
    .then(({ data }) => setUsers(data))
    .catch((err) => console.log(err))
    


  }, [])
  

  return (
    <main className='bg-[#fdffdf]'>
      
      <header className='flex justify-evenly p-2 bg-[#002A52] shadow-lg font-sans shadow-black rounded-sm h-16 top-0 '>
        <h1 className='text-center p-2 text-white font-sans font-semibold text-3xl'>
          Usuarios
        </h1>

        <button  onClick={handleOpenModal}
          className='rounded-md text-white bg-[#FC4044] font-semibold p-2 flex gap-2 items-center hover:shadow-lg hover:bg-red-400 transition-colors'
         
        >
          <UserPlus />
          Crear usuario
        </button>

      </header>

      <ModalList 
        openModal={openModal} 
        onCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        register={register}
        createUser={createUser}
        isUpdating={!!userToEdit}
        updateUser={updateUser}
        formState={formState}
        
      />
          
        
      <UserList 
        users={users}
        deleteUser={deleteUser}
        handleUpdateUser={handleUpdateUser}
      />
        
      
      
      



    </main>
    
  );
}

export default App;
