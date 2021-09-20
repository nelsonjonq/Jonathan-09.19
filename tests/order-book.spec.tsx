import "jest-enzyme";

import React from "react";

import enzyme from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import ErrorMessage from "../src/components/error-message";
import Header from "../src/components/header";
import OrderAskChart from "../src/components/charts/ask-chart";
import OrderBidChart from "../src/components/charts/bid-chart";
import OrderRow from "../src/components/charts/order-row";
import ToggleProductButton from "../src/components/buttons/toggle-product-button";
import SpreadRow from "../src/components/spread";

import { Pressable } from "react-native";

enzyme.configure({ adapter: new Adapter() });

const mockedMaxTotalSum = 10000;
const getMockedData = () => {
  return [
    [45000, 100],
    [44950, 200],
    [44900, 650],
  ];
};

describe("OrderAskChart", () => {
  it("should render correctly", () => {
    const component = enzyme.shallow(
      <OrderAskChart data={getMockedData()} maxTotalSum={mockedMaxTotalSum} />,
    );

    expect(component).toMatchSnapshot();
  });
});

describe("OrderBidChart", () => {
  it("should render correctly", () => {
    const component = enzyme.shallow(
      <OrderBidChart data={getMockedData()} maxTotalSum={mockedMaxTotalSum} />,
    );

    expect(component).toMatchSnapshot();
  });
});

describe("OrderRow", () => {
  it("should render correctly", () => {
    const component = enzyme.shallow(
      <OrderRow
        backgroundColor="#123534"
        key="45000"
        priceText="45,000.0"
        priceTextColor="#129269"
        sizeText="100"
        totalPercentage={1}
        totalText="100"
      />,
    );

    expect(component).toMatchSnapshot();
  });
});

describe("SpreadRow", () => {
  it("should render correctly", () => {
    const component = enzyme.shallow(<SpreadRow units={100} percentage={10} />);

    expect(component).toMatchSnapshot();
  });
});

describe("Header", () => {
  it("should render correctly", () => {
    const component = enzyme.shallow(<Header />);

    expect(component).toMatchSnapshot();
  });
});

describe("ToggleProductButton", () => {
  it("should render correctly", () => {
    const onToggle = () => {};
    const component = enzyme.shallow(
      <ToggleProductButton onToggle={onToggle} />,
    );

    expect(component).toMatchSnapshot();
  });

  it("should call the callback function on press", () => {
    const mockCallback = jest.fn(() => {});
    const component = enzyme.shallow(
      <ToggleProductButton onToggle={mockCallback} />,
    );

    // Action
    component.find(Pressable).first().simulate("press");

    //Assert
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});

describe("ErrorMessage", () => {
  it("should render correctly when display is true", () => {
    const component = enzyme.shallow(
      <ErrorMessage display={true} text={"Sample Error Message"} />,
    );

    expect(component).toMatchSnapshot();
  });

  it("should render correctly when display is false", () => {
    const component = enzyme.shallow(
      <ErrorMessage display={false} text={"Sample Error Message"} />,
    );

    expect(component).toMatchSnapshot();
  });
});
