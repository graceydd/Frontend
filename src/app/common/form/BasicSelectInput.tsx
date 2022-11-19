import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label, Select } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const BasicSelectInput: React.FC<IProps> = ({
  input,
  style,
  options,
  className,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} style={style}>
      <Select
        className={className}
        name={input.name}
        value={input.value}
        onChange={(e, data) => input.onChange(data.value)}
        options={options}
        placeholder={placeholder}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default observer(BasicSelectInput);
