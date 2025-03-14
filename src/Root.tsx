import App from './App';
import '../global.css';
import { Provider } from 'react-redux';
import store from './utils/redux/store';
import { enableScreens } from 'react-native-screens';

enableScreens()

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default Root;
