
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductListComponent from './components/ProductListComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <ToastContainer position="top-right"/>
      <ProductListComponent/>
    </div>
  )
}

export default App
