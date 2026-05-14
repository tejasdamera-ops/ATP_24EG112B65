import { useForm } from "react-hook-form";

function FormDemo() {
  const {
    register, //to register form fields
    handleSubmit, //to handle for submission
    formState: { errors }, //to handle validations
  } = useForm();

  console.log(errors);

  //form submit function
  const onFormSubmit = (obj) => {
    console.log(obj);
  };
  return (
    <div>
      <h1 className="text-center text-5xl">From Demo</h1>
      {/* form */}
      <form className="max-w-md mx-auto mt-10" onSubmit={handleSubmit(onFormSubmit)}>
        {/* username */}
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username required",
              validate:(v)=>v.trim().length!==0 ||"White space is not valid"
             // minLength: 4,
            })}
            id="username"
            className="border w-full p-3"
          />
          {/*username validation error message */}
          {
            errors.username?.type === "required" 
            && 
            <p className="text-red-500">{errors.username.message}</p>
          }
          {
            errors.username?.type === "validate" 
            && 
            <p className="text-red-500">{errors.username.message}</p>
          }
         
        </div> 
        {/* email */}
        <div className="mb-3">
          <label htmlFor="email">email</label>
          <input type="email" {...register("email")} id="email" className="border w-full p-3" />
        </div>
        <button type="submit" className="bg-amber-400 p-4 block mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormDemo;

//required
//minLength & maxLength
//min & max
// pattern
//validate

// return <p>hello</p>
// condition ? element-1 : element-2  -> if-else
// condition && element

// ""  " ".trim()==>""
//"ravi" " ravi kumar " trim()