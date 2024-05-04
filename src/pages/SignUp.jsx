import { useState } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibleIcon from '../assets/svg/visibilityIcon.svg';
import nameIcon from '../assets/svg/badgeIcon.svg';
import emailIcon from '../assets/svg/personIcon.svg';
import passwordIcon from '../assets/svg/lockIcon.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const { name, email, password } = formData;
  return <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>
      <main>
        <form>
          <div className="nameInputDiv">
            <input type="text" className='nameInput' placeholder='Name' id='name' value={name} onChange={onChange} />
            <img src={nameIcon} alt="nameIcon" className='nameInputIcon' />
          </div>

          <div className="emailInputDiv">
            <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} />
            <img src={emailIcon} alt="emailIcon" className='emailInputIcon' />
          </div>

          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' value={password} id='password' onChange={onChange} />
            <img src={passwordIcon} alt="passwordIcon" className='passwordInputIcon' />

            <img src={visibleIcon} alt="Show-password" className='showPassword' onClick={() => setShowPassword(!showPassword)} />
          </div>

          {/* <Link to='forgot-password' className='forgotPasswordLink'>Forgot Password</Link> */}

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#fff' width='35px' height='35px' />
            </button>
          </div>
        </form>
        {/* Google o Auth */}
        <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
      </main>
    </div>
  </>;
}

export default SignUp;
