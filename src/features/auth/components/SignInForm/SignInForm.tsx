import React, { useId } from 'react';
import {
  EmailIcon,
  Form,
  Label,
  PasswordInput,
  SubmitButton,
  TextInput,
  useTextInput
} from '@/components';
import { useInputFocus } from '@/hooks';
import styles from './sign-in-form.module.scss';

export const SignInForm = () => {
  const labels = {
    email: 'Email',
    emailId: useId(),
    password: 'Password',
    passwordId: useId()
  };

  const email = useTextInput('');
  const password = useTextInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit');
  };

  //  Focus first input when the form renders
  const firstInputRef = useInputFocus();

  return (
    <Form formLabel='Sign in' handleSubmit={handleSubmit}>
      <div className={styles.container}>
        <Label text={labels.email} inputId={labels.emailId} hidden />
        <TextInput
          ref={firstInputRef}
          type='email'
          placeholder={labels.email}
          icon={<EmailIcon className={styles.inputIcon} />}
          value={email.value}
          handleChange={email.handleChange}
          inputId={labels.emailId}
        />
        <Label text={labels.password} inputId={labels.passwordId} hidden />
        <PasswordInput
          placeholder={labels.password}
          value={password.value}
          handleChange={password.handleChange}
          inputId={labels.passwordId}
        />
      </div>
      <SubmitButton text='Sign in' />
    </Form>
  );
};
