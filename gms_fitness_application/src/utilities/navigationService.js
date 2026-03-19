import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (navigationRef.current?.isReady()) {
    return navigationRef.current.navigate(name, params);
  }

  let attempts = 0;
  const interval = setInterval(() => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.navigate(name, params);
      clearInterval(interval);
    } else {
      attempts += 1;
      if (attempts === 5) {
        clearInterval(interval);
      }
    }
  }, 1000);
};

export const replace = (name, params) => {
  if (navigationRef.current?.isReady()) {
    return navigationRef.current.dispatch(StackActions.replace(name, params));
  }

  let attempts = 0;
  const interval = setInterval(() => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.dispatch(StackActions.replace(name, params));
      clearInterval(interval);
    } else {
      attempts += 1;
      if (attempts === 5) {
        clearInterval(interval);
      }
    }
  }, 1000);
};

export const push = (name, params) => {
  if (navigationRef.current?.isReady()) {
    return navigationRef.current.dispatch(StackActions.push(name, params));
  }

  let attempts = 0;
  const interval = setInterval(() => {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.dispatch(StackActions.push(name, params));
      clearInterval(interval);
    } else {
      attempts += 1;
      if (attempts === 5) {
        clearInterval(interval);
      }
    }
  }, 1000);
};

export const pop = (screenCount = 1) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.dispatch(StackActions.pop(screenCount));
  }
};

export const popToTop = () => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.dispatch(StackActions.popToTop());
  }
};

export const goBack = () => {
  if (navigationRef.current?.isReady() && navigationRef.current.canGoBack()) {
    navigationRef.current.goBack();
  }
};

export const popTo = (screenName, params) => {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName, params }],
      }),
    );
  }
};
