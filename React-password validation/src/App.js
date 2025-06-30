import { useState } from 'react';
import './App.css';

function App() {

  const inputFields = {
    name: "",
    password: "",
    confirmPassword: ""
  }

  const [formData, setFormData] = useState(inputFields)
  const [validateInput, setValidateInput] = useState({
     uppercase: false,
     lowercase: false,
     digit: false,
     specialChar: false,
     minLength: false,
     matching: false
  })


  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})

    if(name === 'password'){

      const uppercase = /[A-Z]/.test(value);
      const lowercase = /[a-z]/.test(value);
      const specialChar = /[!@$&*?]/.test(value);
      const digit = /\d/.test(value);
      const minLength = value.length >= 8;
      const matching = (value === formData.confirmPassword) && value !== "";

      setValidateInput({
        ...validateInput,
        uppercase,
        lowercase,
        specialChar,
        digit,
        minLength,
        matching
       })
    }

    if(name === 'confirmPassword'){
        const matching = (value === formData.password) && value !== "";
        setValidateInput({
          ...validateInput,
          matching
        })
    }

  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(validateInput.uppercase && validateInput.lowercase && validateInput.digit && validateInput.minLength && validateInput.specialChar && validateInput.matching){
      console.log(formData);
    }else{
      console.log(false)
    }
  }

  return (
    <div className="App">
       <h2>Password Validation</h2>
       <div className='form'>
          <span>Name</span>
          <label>
             <input type='text' name='name' onChange={handleChange} value={formData.name} autoComplete='off' placeholder='Enter your name' />
          </label>
          <span>Password</span>
          <label>
             <input type='password' name='password' onChange={handleChange} value={formData.password} autoComplete='off' placeholder='Create new password' />
          </label>
          <span>Confirm Password</span>
          <label>
             <input type='password' name='confirmPassword' onChange={handleChange} value={formData.confirmPassword} autoComplete='off' placeholder='Confirm password' />
          </label>
          <button className='submitButton' onClick={handleSubmit}>Submit</button>
          <ul className='validationList'>
            <li className={validateInput.uppercase ? 'green' : 'red'}>At least one uppercase letter</li>
            <li className={validateInput.lowercase ? 'green' : 'red'}>At least one lowercase letter</li>
            <li className={validateInput.digit ? 'green' : 'red'}>At leat one digit</li>
            <li className={validateInput.specialChar ? 'green' : 'red'}>At leat one Special characters (e.g., !@$&*?)</li>
            <li className={validateInput.minLength ? 'green' : 'red'}>Minimum length 8 characters</li>
            <li className={validateInput.matching ? 'green' : 'red'}>Passwords Match</li>
          </ul>
       </div>
    </div>
  );
}

export default App;
