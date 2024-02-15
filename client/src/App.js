import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Nav from './components/Navigation/nav.js';
import IndexRoute from './routes/IndexRoute.js';

function App() {
    return (
        <div className="App">
            <div className='app-header'>
                <Nav />
            </div>

            <div className='app-container'>
                <IndexRoute />

                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div >
    );
}

export default App;
