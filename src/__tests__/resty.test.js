import React from 'react';
import { mount } from 'enzyme';

import Resty from '../components/Resty';

describe('Results tests', () => {
  test('change url input', () => {
    let component = mount(<Resty />);
    component
      .find('#url')
      .simulate('change', { target: { value: 'http://localhost:3000' } });
    expect(component.state('url')).toBe('http://localhost:3000');
  });

  test('change request type select', () => {
    let component = mount(<Resty />);
    component.find('#reqType').simulate('change', { target: { value: 'PUT' } });
    expect(component.state('reqType')).toBe('PUT');
  });

  test('submit form and call handler', () => {
    let component = mount(<Resty />);
    let spy = jest.spyOn(component.instance(), 'fetchData');
    component.find('#submit').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
