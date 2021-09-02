import { useContext } from 'react';
import AppContext from '../components/context';

const useAppContext = () => useContext(AppContext);

export default useAppContext;