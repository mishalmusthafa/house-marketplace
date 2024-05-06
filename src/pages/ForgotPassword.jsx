import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import emailIcon from '../assets/svg/personIcon.svg';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const inputRef = () => { };

  const onChange = e => {
    setEmail(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was send');
    } catch (error) {
      console.log(error);
      toast.error('Could not send the reset Email');
    }
  };

  return <div className='pageContainer'>
    <header>
      <p className="pageHeader">Forgot Password</p>
    </header>
    <main>
      <form onSubmit={onSubmit}>

        <div className="emailInputDiv">
          <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} ref={inputRef} />
          <img src={emailIcon} alt="emailIcon" className='emailInputIcon' />
        </div>

        <div className="forgotPasswordFlex">
          <Link to='/sign-in' className='forgotPasswordLink'>Sign In</Link>
        </div>
        <div className="signInBar">
          <div className="signInText">Send Reset Link</div>
          <button className="signInButton">
            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
          </button>
        </div>
      </form>
    </main>
  </div>;
}

export default ForgotPassword;
