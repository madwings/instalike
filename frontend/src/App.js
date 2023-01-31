import { Container } from '@material-ui/core';
import BlockList from './components/BlockList';
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Blocks} />
            </Switch>
        </Router>
    );
}

function Blocks() {
    return (
        <Container maxWidth='md'>
            <header className='header'>
                <h1>Instalike real time updating POC</h1>
            </header>
            <BlockList />
        </Container>
    );
}

export default App;
