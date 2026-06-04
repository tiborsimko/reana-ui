/*
  -*- coding: utf-8 -*-

  This file is part of REANA.
  Copyright (C) 2020, 2022 CERN.

  REANA is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
*/

import { useState } from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import CopyButton from "./CopyButton";
import styles from "./CodeSnippet.module.scss";

export default function CodeSnippet({
  children,
  dark,
  small,
  copy,
  reveal,
  dollarPrefix,
  classes,
}) {
  const [revealed, setRevealed] = useState(false);

  const toggleRevealed = () => {
    setRevealed(!revealed);
  };

  const accessChildren = (element) => {
    if (Array.isArray(element)) {
      return element.map((el) =>
        el.props?.children ? accessChildren(el.props.children) : el,
      );
    } else {
      return element?.props?.children ? [element?.props.children] : element;
    }
  };

  return (
    <div
      className={`${styles["container"]} ${
        dark ? styles["dark"] : ""
      } ${classes}`}
    >
      <div
        className={`${styles["content"]} ${small ? styles["small"] : ""} ${
          dollarPrefix ? styles["dollar"] : ""
        } ${revealed ? styles["revealed"] : ""}`}
      >
        {children}
      </div>
      {(reveal || copy) && (
        <div className={styles["actions"]}>
          {reveal && (
            <Icon
              name={revealed ? "eye slash" : "eye"}
              className={styles["action-icon"]}
              onClick={toggleRevealed}
            />
          )}
          {copy && (
            <CopyButton
              as={Icon}
              className={styles["action-icon"]}
              text={accessChildren(children)
                .map((line) => {
                  return Array.isArray(line) ? line.join("") : line;
                })
                .join("\n")}
            />
          )}
        </div>
      )}
    </div>
  );
}

CodeSnippet.propTypes = {
  dark: PropTypes.bool,
  small: PropTypes.bool,
  copy: PropTypes.bool,
  reveal: PropTypes.bool,
  dollarPrefix: PropTypes.bool,
  classes: PropTypes.string,
};

CodeSnippet.defaultProps = {
  dark: false,
  small: false,
  copy: false,
  reveal: false,
  dollarPrefix: true,
  classes: "",
};
