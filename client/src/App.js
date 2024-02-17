import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Nav from './components/Navigation/nav.js';
import IndexRoute from './routes/IndexRoute.js';
import { UserContext } from './context/UserProvider.js';
import { Rings } from 'react-loader-spinner';
import { useContext } from 'react';
function App() {
    const { user } = useContext(UserContext);
    return (
        <div className="App">
            {user && user.isLoading === true
                ? <div className='loading-container'>
                    <Rings
                        height='100'
                        width='100'
                        color='#1877f2'
                        ariaLabel='loading'
                    />
                    <div>Loading data ...</div>
                </div>
                : <>
                    <div className='app-header'>
                        <Nav />
                    </div>

                    <div className='app-container'>
                        <IndexRoute />
                    </div>
                </>
            }

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
        </div >
    );
}

export default App;
