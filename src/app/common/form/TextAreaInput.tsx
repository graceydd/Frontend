import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({
  input,
  disabled,
  style,
  onChange,
  cols,
  rows,
  placeholder,
  className,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} style={style}>
      <textarea
        className={className}
        cols={cols}
        rows={rows}
        {...input}
        onInput={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default observer(TextAreaInput);
