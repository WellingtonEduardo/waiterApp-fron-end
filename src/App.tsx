import { Header } from './view/components/Header';
import { Orders } from './view/components/Orders';
import { GlobalStyles } from './view/styles/GlobalStyles';


export function App() {
  return (<>
    <GlobalStyles/>
    <Header/>
    <Orders/>
  </>
  );
}
