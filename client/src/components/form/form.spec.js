import { shallow } from 'enzyme';
import React from 'react';

import Form from './form';
import { initialState } from './initial-state';

describe("Form component", () => {
  let component;
  let instance;
  const event = { preventDefault: () => {} };
  const mockCallBack = jest.fn();

  beforeEach(() => {
    component = shallow(<Form />);
    instance = component.instance();
  });

  it("should render Form component", () => {
    const wrapper = component.find("form");
    expect(wrapper.length).toEqual(1);
    expect(component).toMatchSnapshot();
  });
  
  it("should get initial state", () => {
    instance.getInitialState();
    expect(component.state()).toStrictEqual(initialState);
  });

  it("should handle input value", () => {
    expect(component.state().firstName).toBe("");
    instance.handleChange({ target: { name: "firstName", value: "test" } });
    expect(component.state().firstName).toBe("test");
  });

  describe("should validate email", () => {
    it("should return false if email field is empty", () => {
      instance.setState({ email: ""});
      const result = instance.validate();
      expect(result).toBe(false);
    });

    it("should return true if email field isn't empty", () => {
      instance.setState({ email: "test@test.com"});
      const result = instance.validate();
      expect(result).toBe(true);
    });
  });

  it("should not reload page after submiting form", () => {
    jest.spyOn(event, 'preventDefault')
    component.find("form").simulate("submit", event);
    expect(event.preventDefault).toBeCalled();
  });

  it("onCancel: should cancel the form field value", () => {
    instance.setState({ phone: 12455678, email: "test@test.com" });
    component.find(".cancel-btn").simulate("click", event);
    expect(component.state().phone).toBe("");
    expect(component.state().email).toBe("");
  });

  it("should call onClear method", () => {
    component = shallow(<Form clearData={mockCallBack} />);
    component.find(".clear-btn").simulate("click", event);
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
