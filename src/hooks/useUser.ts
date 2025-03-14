import { useState } from 'react';
import { deleteAllItem, getItem, setItem } from '../utils/asyncStorage/storage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../utils/redux/store';
import { setUser, unsetUser } from '../utils/redux/slices/userSlice';

export const useUser = () => {

  // Redux User State
  const {userUID, userToken} = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch<AppDispatch>()

  // function set user UID
  const setUserAccount = async (userID: string| null, userToken: string|null) => {
    try {
      dispatch(setUser({
        userUID: userID,
        userToken: userToken
      }))
      await setItem('userUID', userID || "");
      await setItem('userToken', userToken || "");
    } catch {
      dispatch(setUser({
        userUID: null,
        userToken: null
      }));
    }
  };

  // function get user UID
  const getUserAccount = async () => {
    try{
        const id = await getItem('userUID');
        const token = await getItem('userToken');
        dispatch(setUser({
          userUID: id,
          userToken: token
        }))
    }catch{
        dispatch(setUser({
          userUID: null,
          userToken: null
        }))
    }
  };

  // function delete user UID
  const deleteUserAccount = async () => {
    try{
        await deleteAllItem();
        dispatch(unsetUser())
    }catch{
        // dispatch(setUser(null))
    }
  };
  return { userUID, userToken, setUserAccount, getUserAccount, deleteUserAccount};
};
