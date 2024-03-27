import React , {useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux'
import {useMutationHooks} from './hooks/useMutation'
import * as apiPost from './api/index'
import HomePage from './pages/HomePage';


 
function App() {
  return (<HomePage/>);
}

export default App;
