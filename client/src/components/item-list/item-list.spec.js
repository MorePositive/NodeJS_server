import React from 'react';

import ItemList from './item-list';
import { mockItem, mockItems } from '../../../__mocks__/mock-data'

describe("ItemList component", () => {
  let component;

  beforeEach(() => {
    component = shallow(<ItemList data={[]} />);
  });

  it("should render ItemList component", () => {
    const wrapper = component.find(".item-list");
    expect(wrapper).toHaveLength(1);
  });

  it("should contain at least 1 paragraph", () => {
    const wrapper = component.find("p");
    expect(wrapper.length).toBeGreaterThanOrEqual(1);
  });

  it("should render no-data paragraph", () => {
    const wrapper = component.find(".no-data");
    expect(wrapper).toMatchSnapshot();
  });
  
  it("should render item", () => {
    component = shallow(<ItemList data={mockItem} />)
    const wrapper = component.find(".card");
    expect(wrapper).toMatchSnapshot();
  });

  it("should render 2 items", () => {
    component = shallow(<ItemList data={mockItems} />);
    const item = component.find(".card");
    expect(item.length).toBe(2);
  });
});
