/*
  -*- coding: utf-8 -*-

  This file is part of REANA.
  Copyright (C) 2024 CERN.

  REANA is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
*/
import PropTypes from "prop-types";

import styles from "./DaskIcon.module.scss";

const DaskIcon = ({ size, className }) => {
  // Generator: Adobe Illustrator 26.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)
  return (
    <svg
      className={className || styles.icon}
      viewBox="0 0 512 512"
      width={`${size}px`}
      height={`${size}px`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path
          fill="#FFC11E"
          d="M143.71,157.61l126.5-72.99c1.25-0.72,2.02-2.05,2.02-3.5l0.01-43.77c0-6.48-2.66-12.9-7.83-16.81
		c-6.69-5.06-15.28-5.56-22.33-1.48L65.13,121.17c-6.22,3.59-10.06,10.23-10.06,17.41L55,369.18c0,6.47,2.65,12.89,7.81,16.81
		c6.68,5.07,15.29,5.57,22.35,1.49l37.48-21.62c1.25-0.72,2.02-2.05,2.02-3.5l0.05-171.85C124.71,176.93,131.95,164.4,143.71,157.61
		z"
        />
        <path
          fill="#EF1161"
          d="M446.95,124.53c-3.15-1.82-6.61-2.73-10.06-2.73c-3.45,0-6.9,0.91-10.05,2.73l-176.96,102.1
		c-6.2,3.58-10.06,10.25-10.06,17.41l-0.07,231.47c0,7.27,3.76,13.78,10.05,17.42c6.3,3.64,13.81,3.64,20.11,0l176.95-102.11
		c6.2-3.58,10.06-10.25,10.06-17.41L457,141.95C457,134.68,453.24,128.16,446.95,124.53z"
        />
        <path
          fill="#FC6E6B"
          d="M240.95,211.14l116.78-67.38c1.25-0.72,2.02-2.05,2.02-3.5l0.02-50.98c0-6.48-2.66-12.9-7.83-16.81
		c-6.69-5.06-15.27-5.55-22.33-1.48l-48.43,27.95L152.64,173.1c-6.22,3.59-10.06,10.23-10.06,17.41l-0.05,174.18l-0.02,56.41
		c0,6.48,2.65,12.89,7.81,16.81c6.69,5.07,15.29,5.57,22.35,1.49l47.2-27.24c1.25-0.72,2.02-2.05,2.02-3.5l0.05-164.64
		C221.95,230.46,229.19,217.92,240.95,211.14z"
        />
      </g>
    </svg>
  );
};

DaskIcon.defaultProps = {
  size: 22,
  className: "",
};

DaskIcon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

export default DaskIcon;
