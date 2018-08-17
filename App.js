import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { AppLoading, Font, Asset } from 'expo';
import { initializeAnimations } from './src/animations';
import { createRootNavigator } from './src/navigation'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  componentDidMount() {
    initializeAnimations();
    console.log(store.getState());
  }

  _renderMainNavigator() {
    const RootNav = createRootNavigator(store.getState().user.initialLaunch);
    return <RootNav />
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
      return (
        <Provider store={store}>
          <PersistGate loading={<AppLoading />} persistor={persistor}>
            {this._renderMainNavigator()}
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icons/location.png'),
        require('./assets/city.png'),
        require('./assets/map.png')
      ]),
      Font.loadAsync({
        'somatic-rounded': require('./assets/fonts/Somatic-Rounded.otf')
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
