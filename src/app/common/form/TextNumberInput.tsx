import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextNumberInput: React.FC<IProps> = ({
  input,
  disabled,
  inputField,
  setInputField,
  width,
  type,
  placeholder,
  height,
  className,
  fieldClassName,
  meta: { touched, error },
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setInputField({ ...inputField, [e.target.name]: Number(e.target.value) });
    // setInputField(inputField);
  };
  
  return (
    <Form.Field
      error={touched && !!error}
      type={type}
      style={{ width: width }}
      height={height}
      className={fieldClassName}
      disabled={disabled}
    >
      <input
        className={className}
        {...input}
        onInput={handleChange}
        onWheel={(event) => {
          event.currentTarget.blur();
        }}
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

export default observer(TextNumberInput);
