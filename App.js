// import a library to help create a component
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { AppLoading, Font } from 'expo';
import { initializeAnimations } from './src/animations';
import { createRootNavigator } from './src/navigation'

//1st argument is list of reducers
//2nd argument is initial state
//3rd argument is middleware (store enhancers)
//const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const initialLaunch = true;

// create a component
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  componentDidMount() {
    initializeAnimations();
    console.log(store.getState());
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      const RootNav = createRootNavigator(initialLaunch);
      return (
        <Provider store={store}>
          <RootNav />
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'somatic-rounded': require('./assets/fonts/Somatic-Rounded.otf'),
        'bebas-neue': require('./assets/fonts/BebasNeue-Regular.ttf'),
        'bariol': require('./assets/fonts/Bariol-Regular.otf')
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
