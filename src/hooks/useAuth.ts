import { useCallback, useEffect, useState } from 'react';
import { auth } from '../utils/firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/redux/store';
import { useNotify } from './useNotify';
import { useUser } from './useUser';

interface authType {
  username?: string;
  phone?: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  // Notify State
  const { message, type, loading } = useSelector((state: RootState) => state.notify);
  const { notifyMessage } = useNotify();

  // Auth State
  const { setUserAccount, deleteUserAccount } = useUser();
  const [toggleAuth, setToggleAuth] = useState<boolean>(true);
  const [localMessage, setLocalMessage] = useState<string>('');
  const [typeMessage, setTypeMessage] = useState<string>('');
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  // UseEffect
  useEffect(() => {
    setLocalMessage(message);
    setTypeMessage(type);
    setLocalLoading(loading);
  }, [message, type, loading]);

  // Toggle Auth method
  const toggleAuthMethod = useCallback(() => {
    setToggleAuth((prev) => !prev);
  }, []);

  // signIn Method
  const signInAccount = async ({ email, password }: authType) => {
    notifyMessage('loading');
    const data: authType = { email, password };
    const isAllDataFilled = Object.values(data).every((data) => data);
    if (!isAllDataFilled) {
      notifyMessage('auth/empty-data');
    } else {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const tokenUser = await user.getIdToken()
        setUserAccount(user.uid, tokenUser);
        notifyMessage('reset');
      } catch (err: any) {
        notifyMessage(err.code);
      }
    }
  };
  
  // signUp Method
  const signUpAccount = async ({ username, phone, email, password }: authType) => {
    notifyMessage('loading');
    const data: authType = { username, phone, email, password };
    const isAllDataFilled = Object.values(data).every((data) => data);
    if (!isAllDataFilled) {
      notifyMessage('auth/empty-data');
    } else {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const tokenUser = await user.getIdToken()
        setUserAccount(user.uid, tokenUser);
        notifyMessage('reset');
      } catch (err: any) {
        notifyMessage(err.code);
      }
    }
  };

  // signIn Method
  const signOutAccount = async () => {
    try {
      deleteUserAccount()
    } catch (err: any) {
      notifyMessage(err);
    }
  };

  return { toggleAuthMethod, signInAccount, signUpAccount, signOutAccount, toggleAuth, localMessage, typeMessage, localLoading };
};
