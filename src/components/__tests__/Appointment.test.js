import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";
import { checkPropTypes } from "prop-types";

afterEach(cleanup);

describe('Appointment component should render without crashing', () => {

  it("renders without crashing", () => {
    render(<Appointment />);
  });
})