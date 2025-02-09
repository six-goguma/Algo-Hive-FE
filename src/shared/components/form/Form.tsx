import * as React from 'react';
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider } from 'react-hook-form';

import { FormControl, FormLabel, FormErrorMessage, Text, chakra } from '@chakra-ui/react';

import { FormFieldContext, useFormField } from '@shared/hooks';

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext>
  );
};

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
  },
);
FormItem.displayName = 'FormItem';

const CustomFormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ ...props }, ref) => {
  const { name } = useFormField();
  return <FormLabel color='customGray.500' fontWeight='bold' ref={ref} htmlFor={name} {...props} />;
});
CustomFormLabel.displayName = 'CustomFormLabel';

const CustomFormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <FormControl isInvalid={!!error} ref={ref} {...props}>
        {children}
      </FormControl>
    );
  },
);
CustomFormControl.displayName = 'CustomFormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof FormErrorMessage>
>(({ ...props }, ref) => {
  return <chakra.div as={Text} ref={ref} fontSize='sm' color='customGray.400' {...props} />;
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof FormErrorMessage>
>(({ children, ...props }, ref) => {
  const { error } = useFormField();
  const message = error?.message ? String(error.message) : children;

  if (!message) return null;

  return (
    <chakra.div as={FormErrorMessage} ref={ref} {...props}>
      {message}
    </chakra.div>
  );
});
FormMessage.displayName = 'FormMessage';

export {
  Form,
  FormItem,
  CustomFormLabel as FormLabel,
  CustomFormControl as FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
