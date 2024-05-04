import { useState } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibleIcon from '../assets/svg/visibilityIcon.svg';
import emailIcon from '../assets/svg/personIcon.svg';
import passwordIcon from '../assets/svg/lockIcon.svg';



function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const { email, password } = formData;
  return <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>
      <main>
        <form>
          <div className="emailInputDiv">
            <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} />
            <img src={emailIcon} alt="emailIcon" className='emailInputIcon' />
          </div>

          <div className="passwordInputDiv">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' value={password} id='password' onChange={onChange} />
            <img src={passwordIcon} alt="passwordIcon" className='passwordInputIcon' />


            <img src={visibleIcon} alt="Show-password" className='showPassword' onClick={() => setShowPassword(!showPassword)} />
          </div>

          <div className="forgotPasswordFlex">
            <Link to='forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
          </div>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill='#fff' width='35px' height='35px' />
            </button>
          </div>
        </form>
        {/* Google o Auth */}
        <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
      </main>
    </div>
  </>;
}

export default SignIn;
