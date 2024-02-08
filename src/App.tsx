import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './view/components/Header';
import { Orders } from './view/components/Orders';
import { GlobalStyles } from './view/styles/GlobalStyles';



export function App() {
  return (<>
    <GlobalStyles />
    <Header />
    <Orders />

    <ToastContainer position='bottom-center' />
  </>
  );
}
