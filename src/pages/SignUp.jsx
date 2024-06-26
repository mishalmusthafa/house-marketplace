import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibleIcon from '../assets/svg/visibilityIcon.svg';
import nameIcon from '../assets/svg/badgeIcon.svg';
import emailIcon from '../assets/svg/personIcon.svg';
import passwordIcon from '../assets/svg/lockIcon.svg';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import OAuth from '../components/OAuth';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigator = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const { name, email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigator('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          toast.error('Enter Email ');
          break;
        case 'auth/missing-password':
          toast.error('Enter the password ');
          break;
        case 'auth/invalid-credential':
          toast.error('Invalid user name or password ');
          break;
        case 'auth/email-already-in-use':
          toast.error('Email already exist');
          break;
        default:
          toast.error('Bad User Credentials');
      }
      console.log(error);
    }

  };

  return <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
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

        <OAuth />

        <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
      </main>
    </div>
  </>;
}

export default SignUp;
