import { render } from 'preact';
import { AppComponent } from './AppComponent';
import '../css/app.css';

// Renderiza el componente principal en el elemento con id 'app'
render(<AppComponent />, document.getElementById('app'));
