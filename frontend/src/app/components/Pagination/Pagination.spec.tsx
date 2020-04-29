import * as React from 'react';
import style from './style.local.css';
import { shallow, ShallowWrapper } from 'enzyme';
import { Pagination } from '.';
import { Button } from 'app/components/Button';

jest.mock('./style.local.css', () => ({
  default: {},
}));

style.Pagination__input = 'Pagination__input';

describe('<Pagination>', () => {
  let wrapper: ShallowWrapper;
  const onPageChangeMock = jest.fn();
  const onPageSizeChangeMock = jest.fn();
  const props: Pagination.Props = {
    onPageChange: onPageChangeMock,
    onPageSizeChange: onPageSizeChangeMock,
    page: 1,
    pageSize: 100,
    total: 2700,
    loading: false,
  };
  beforeEach(() => {
    wrapper = shallow(<Pagination {...props} />);
  });
  it('Should render', () => {
    expect(wrapper).toBeDefined();
  });
  describe('State', () => {
    describe('Should calculate correctly the pagination properties', () => {
      let currentPage = 1;
      const totalOrders = 55;
      const pageSize = 40;
      beforeEach(() => {
        wrapper = wrapper.setProps({
          page: currentPage,
          total: totalOrders,
          pageSize,
        });
      });
      it('Should calculate the number of pages', () => {
        const expectedNumberOfPages = Math.ceil(totalOrders / pageSize);
        expect(wrapper.state('pages')).toBe(expectedNumberOfPages);
      });
      it('Should calculate correcly the page first order index', () => {
        const expectedPageFirstOrderIndex = (currentPage - 1) * pageSize + 1;
        expect(wrapper.state('pageFirstOrderIndex')).toBe(
          expectedPageFirstOrderIndex,
        );
      });
      describe('When current page is the last one', () => {
        beforeEach(() => {
          currentPage = 2;
          wrapper = wrapper.setProps({
            page: currentPage,
            total: totalOrders,
            pageSize,
          });
        });
        it('Should calculate correcly the page last order index', () => {
          let expectedPageLastOrderIndex = currentPage * pageSize;
          if (expectedPageLastOrderIndex > totalOrders) {
            expectedPageLastOrderIndex = totalOrders;
          }
          expect(wrapper.state('pageLastOrderIndex')).toBe(
            expectedPageLastOrderIndex,
          );
        });
      });
    });
  });
  describe('Props', () => {
    describe('when receiving page prop', () => {
      beforeEach(() => {
        wrapper = wrapper.setProps({ page: 3 });
      });
      it('should update the page input value', () => {
        const inputValue = wrapper.find(`.${style.Pagination__input}`).props()
          .value;
        expect(inputValue).toBe('3');
      });
    });
    describe('when fetching data from the backend', () => {
      beforeEach(() => {
        wrapper = wrapper.setProps({ loading: true });
      });
      it('should disable the pagination buttons', () => {
        expect(
          wrapper
            .find(Button)
            .at(0)
            .props().disabled,
        ).toEqual(true);
        expect(
          wrapper
            .find(Button)
            .at(1)
            .props().disabled,
        ).toEqual(true);
      });
    });
  });
});
