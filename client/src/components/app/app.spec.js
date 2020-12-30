import { shallow } from 'enzyme';
import React from 'react';

import { mockTitle, mockBody } from '../../../__mocks__/mock-data'
import App from './app';

const mockJsonPromise = Promise.resolve({ userId: 1, id: 1, title: mockTitle, body: mockBody });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
const event = { preventDefault: () => {} };

describe("App component", () => {
  let component;
  let instance;

  beforeEach(() => {
    component = shallow(<App />);
    instance = component.instance();
  });

  it("should render App component", () => {
    const wrapper = component.find(".App");
    expect(wrapper).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it("getData: should make response to api", () => {
    instance.getPost(event);
    expect(global.fetch).toHaveBeenCalled();
  });

  it("getData: should make response with exact query", () => {
    instance.getPost(event);
    expect(global.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts/1");
  });

  it("setData: should add an item to local state", () => {
    const prevLength = component.state().data.length;
    instance.setState({ data : [{ email: "test@test.com" }] });
    expect(component.state().data.length).toBe(prevLength + 1);
  });

  it("createItem: should create an item", () => {
    const result = instance.createItem("Ivan", "Ivanov", 50887562, "asd@ads.com");
    expect(result.firstName).toBe("Ivan");
    expect(result.lastName).toBe("Ivanov");
    expect(result.phone).toBe(50887562);
    expect(result.email).toBe("asd@ads.com");
  });

  it("addItem: should transport data to setData method and refresh the state", () => {
    instance.addItem("first", "last", 888888, "mail@mail.com");
    const [ stateData ] = component.state().data;
    expect(stateData.firstName).toBe("first");
    expect(stateData.lastName).toBe("last");
    expect(stateData.phone).toBe(888888);
    expect(stateData.email).toBe("mail@mail.com");
  });

  it("clearData: should clear state data", () => {
    instance.setState({ data: [{ test: "test"}] });
    expect(component.state().data.length).toEqual(1);
    instance.clearData();
    expect(component.state().data.length).toEqual(0);
  });
});
