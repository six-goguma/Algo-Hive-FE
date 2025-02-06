import { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';

import { EyeIcon, EyeClosedIcon } from 'lucide-react';

import { FormField, FormItem, FormDescription, FormLabel, FormControl } from '@shared/components';

type PasswordInputFieldProps = {
  name: string;
  formLabel?: string;
  placeholder?: string;
  formDescription?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const PasswordInputField = ({
  name,
  formLabel,
  placeholder,
  formDescription,
  type = 'password',
}: PasswordInputFieldProps) => {
  const form = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const error = form.formState.errors[name]?.message;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel color='customGray.500'>{formLabel}</FormLabel>
          <FormControl>
            <VStack spacing={1}>
              <FormDescription w='full'>{formDescription}</FormDescription>
              <InputGroup>
                <VStack w='full'>
                  <Input
                    fontSize='sm'
                    type={showPassword ? 'text' : type}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={placeholder}
                  />
                  {error && (
                    <Text w='full' ml={2} color='red.500' fontSize='sm'>
                      {typeof error === 'string' ? error : ''}
                    </Text>
                  )}
                </VStack>
                <InputRightElement>
                  <Button
                    bg='none'
                    border='none'
                    _hover={{}}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <EyeIcon color='gray' /> : <EyeClosedIcon color='gray' />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </VStack>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
