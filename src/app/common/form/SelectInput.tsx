import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label, Select } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const InputSelection: React.FC<IProps> = ({
  input,
  disabled,
  inputField,
  setInputField,
  style,
  options,
  placeholder,
  className,
  fieldClassName,
  meta: { touched, error },
}) => {
  const changeMethod = (e: any, data: any) => {
    input.onChange(data.value);
    // console.log(data.value);
    //  console.log(change(e))
    setInputField({
      ...inputField,
      [input.name]: data.value,
    });
  };

  return (
    <Form.Field
      className={fieldClassName}
      error={touched && !!error}
      style={style}
      disabled={disabled}
    >
      <Select
        name={input.name}
        value={input.value}
        // defaultValue={input.value}
        onChange={(e, data) => changeMethod(e, data)}
        options={options}
        placeholder={placeholder}
        className={className}
        // search
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default observer(InputSelection);
