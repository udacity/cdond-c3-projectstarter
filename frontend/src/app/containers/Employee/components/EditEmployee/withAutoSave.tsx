import * as React from 'react';

export type Debounce = (inputName: string, callback: () => void) => void;
export const withAutoSave = (Component: React.ComponentClass<any>) => {
  return class extends React.Component  {
    private coolDown = 1000;
    private timerDictionary = new Map<string, number>();

    debounce: Debounce = (inputName: string, callback: () => void) => {
      clearTimeout(this.timerDictionary.get(inputName));
      this.timerDictionary.set(inputName, window.setTimeout(callback, this.coolDown));
    }

    render () {
      return <Component {...this.props} debounce={this.debounce} />
    }
  }
};