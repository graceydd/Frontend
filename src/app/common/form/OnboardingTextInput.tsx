import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const OnboardingTextInput: React.FC<IProps> = ({
  input,
  disabled,
  style,
  onChange,
  type,
  placeholder,
  height,
  className,
  fieldClassName,
  meta: { touched, error},
}) => {
  return (
    <Form.Field
      error={touched && !!error}
      type={type}
      style={style}
      height={height}
      className={fieldClassName}
      disabled={disabled}
    >
      <input
        className={className}
        {...input}
        onInput={onChange}
        onWheel={(event) => {
          event.currentTarget.blur();
        }}
        placeholder={placeholder}
      />
      {!error && (
        <span className="show_Hide_Password pb-1">
          <img src="./images/verified-okay.svg" alt="" />
        </span>
      )}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default observer(OnboardingTextInput);
