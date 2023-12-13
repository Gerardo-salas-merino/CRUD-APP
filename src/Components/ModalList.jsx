import { IconX } from '@tabler/icons-react';


const ModalList = ({ openModal, onCloseModal, handleSubmit, register,  createUser, isUpdating, updateUser, formState }) => {
  
  const { errors } = formState;
  
  const submit = (currentUser) => {
    isUpdating ? updateUser(currentUser) : createUser(currentUser);
  
  }

  

  
  

  return (
    <section className={`bg-black/60 fixed top-0 left-0 right-0 h-screen flex justify-center items-center transition-all ${openModal ? "visible opacity-100" : "invisible opacity-0"}`}>
      
      <form onSubmit={handleSubmit(submit)}
        className='grid gap-4 bg-[#fdffdf] [&>label]:grid [&>label]:gap-1 [&>label>span>span]:text-red-500 [&>label>span]:text-sm [&>label>span]:font-semibold p-4 rounded-md relative'
      >

        <button className='absolute top-2 right-2 bg-[#f12b2b] text-white rounded-xl hover:bg-red-900'
          onClick={onCloseModal}
        >
          <IconX />
          
        </button>

        <h2 className=' capitalize text-center font-bold text-[#414177] text-lg'>
          {isUpdating ? "Actualizar usuario" : "Crear usuario"}
        </h2>
        <div class="border  border-b-red-600 ..."></div>

        {/* CAMPO NOMBRE, LO VAMOS A VALIDAR CON LA SIGUIENTE INFORMACION*/}
        <label>
          <span>
            Nombre: <span className='text-red-500'>*</span>
          </span>
          <input
            {...register("first_name", {
              required: "Por favor, rellena este campo.",
              validate: (value) => {
                const firstChar = value.charAt(0);
                if (firstChar !== firstChar.toUpperCase()) {
                  return "El nombre debe comenzar con una letra mayúscula";
                }
                return true;
              },
              maxLength: { value: 15, message: "El nombre no puede tener más de 15 caracteres..." },
              minLength: { value: 5, message: "El nombre debe tener al menos 5 caracteres..." },
            })}
            className={`border rounded-md p-1 outline-none ${formState.errors.first_name ? "border-red-500" : ""}`}
            type='text'
            
            
          />
          {formState.errors.first_name && (
            <small className='text-red-500'>{formState.errors.first_name.message}</small>
          )}

          
        </label>

        {/* CAMPO APELLIDO, LO VAMOS A VALIDAR CON LA SIGUIENTE INFORMACION */}
        <label>
          <span>
            Apellidos: <span className='text-red-500'>*</span>
          </span>
          <input
            {...register("last_name", {
              required: "Este campo es requerido.",
              pattern: {
                value: /^(?=.*[A-Z]).+$/,
                message: "Los apellidos deben comenzar con una letra mayúscula",
              },
              maxLength: {
                value: 15,
                message: "Los apellidos no pueden tener más de 20 caracteres",
              },
              minLength: {
                value: 10,
                message: "Los apellidos deben tener al menos 10 caracteres",
              },
            })}
            className={`border rounded-md p-1 outline-none ${formState.errors.last_name ? "border-red-500" : ""}`}
            type='text'
          />

          {formState.errors.last_name && (
            <small className='text-red-500'>{formState.errors.last_name.message}</small>
          )}
        </label>


        {/* CAMPO CORREO, LO VAMOS A VALIDAR CON LA SIGUIENTE INFORMACION */}
        <label>
          <span>
            Correo: <span className='text-red-500'>*</span>
          </span>
          <input
            {...register("email", {
              required: "Por favor, introduce una dirección de correo electrónico",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Introduce una dirección de correo electrónico válida",
              },
            })}
            className={`border rounded-md p-1 outline-none ${formState.errors.email ? "border-red-500" : ""}`}
            type='email'
          />

          {formState.errors.email && (
            <small className='text-red-500'>{errors.email.message}</small>
          )}
        </label>


        {/* CAMPO CONTRASEÑA, LO VAMOS A VALIAR CON LA SIGUIENTE INFORMACION */}
        <label>
          <span>
            Contraseña: <span className='text-red-500'>*</span>
          </span>
          <input
            {...register("password", {
              required: "Este campo es requerido...",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                message:
                  "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.",
              },
            })}
            className={`border rounded-md p-1 outline-none ${formState.errors.password ? "border-red-500" : ""}`}
            
            type='password'
          />

          {formState.errors.password && (
            <small className='text-red-500'>{formState.errors.password.message}</small>
          )}
        </label>

        {/* Button */}
        <button className='bg-[#0D30C3] hover:bg-blue-900 text-white font-semibold p-2 rounded-md transition-all  hover:tracking-widest'
        >
          {isUpdating ? "Guardar cambios" : "Crear Usuario" }

        </button>
       
      </form>
    </section>
  );
};

export default ModalList;
