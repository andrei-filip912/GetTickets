// import global css here!!!
import './style.css';
import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client';
import Header from '../components/header';

const App = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser}></Header>
            <div className='container'>
                <Component currentUser={currentUser} {...pageProps}/>
            </div>
            
        </div>
    );
}
// parameter is not called context since its structure is different than the props passed into a page component
App.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    // check regarding components that miss the getInitialProps
    let pageProps = {};
    if(appContext.Component.getInitialProps) {  // calling getInitialProps to fetch data inside child component
        pageProps = await appContext.Component.getInitialProps(
            appContext.ctx,
            client,
            data.currentUser
        );
    }
    
    return {
        pageProps,
        ...data
    };
};

export default App;