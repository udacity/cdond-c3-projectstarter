import * as React from 'react';
import { shallow } from 'enzyme';
import { Empty } from '.';

describe('<Empty />', () => {
  describe('When rendering the component', () => {
    it('Should render correctly', () => {
      const wrapper = shallow(<Empty title='No orders at the moment' />);
      expect(wrapper).toBeDefined();
    });
  });
});
