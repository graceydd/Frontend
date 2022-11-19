import { observer } from "mobx-react-lite";
import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  Button,
  Form,
  FormFieldProps,
  Grid,
  Header,
  Icon,
  Label,
  Popup,
} from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const PasswordInput: React.FC<IProps> = ({
  input,
  isPasswordShown,
  togglePasswordVisiblity,
  disabled,
  style,
  onChange,
  type,
  placeholder,
  height,
  iconClassName,
  className,
  fieldClassName,
  popup,
  meta: { touched, error },
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
        // className={className}
        {...input}
        // style={{position:"absolute"}}
        maxLength={30}
        className={
          isPasswordShown ? `${className}` : `${className} passwordDiscToggle`
        }
        onInput={onChange}
        placeholder={placeholder}
      />
      <Icon
        name={isPasswordShown ? "eye slash outline" : "eye"}
        size="large"
        className={iconClassName}
        onClick={() => togglePasswordVisiblity(!isPasswordShown)}
      />
      {popup && (
        <Popup
          on="click"
          trigger={
            <span className="show_Terms_Password ">
              <p>Your password should contain at least 8 characters </p>
              <Grid centered divided columns={2}>
                <Grid.Column textAlign="left">
                  <Label circular color="purple" className="minilabel" />
                  <span>1 uppercase</span>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <Label circular color="red" className="minilabel" />
                  <span>1 lowercase</span>
                </Grid.Column>
              </Grid>
              <Grid centered divided columns={2}>
                <Grid.Column textAlign="left">
                  <Label circular color="green" className="minilabel" />
                  <span>1 number</span>
                </Grid.Column>
                <Grid.Column textAlign="left">
                  <Label circular color="blue" className="minilabel" />
                  <span>5 characters</span>
                </Grid.Column>
              </Grid>
            </span>
          }
          // content="I am positioned to the right center"
          position="right center"
        />
      )}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default observer(PasswordInput);
