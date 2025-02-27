import { useForm } from 'react-hook-form';

import { Avatar, Button, Flex, Image, Input } from '@chakra-ui/react';

import { Form, FormControl, FormField, FormItem } from '@shared/components';

import { updateProfileImage } from '../../apis';
import { UpdateProfileImage, UpdateProfileImageSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

type props = {
  profile?: string;
};

export const ProfileSection = ({ profile }: props) => {
  const { mutate: updateImage } = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      console.log('onSuccess');
    },
    onError: () => {
      console.log('onError');
    },
  });

  const form = useForm<UpdateProfileImage>({
    resolver: zodResolver(UpdateProfileImageSchema),
    defaultValues: {
      profileImage: profile ? new File([profile], 'profile') : undefined,
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    if (!data.profileImage) return;
    console.log(data.profileImage);

    updateImage({ file: data.profileImage });

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   const base64String = reader.result as string;
    //   updateImage({ file: base64String });
    // };
    // reader.readAsDataURL(data.profileImage);
  });

  const onClickUploadButton = () => {
    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    fileInput?.click();
  };

  return (
    <Flex as='section' w='full'>
      <Flex w={{ base: 'full', sm: '128px' }} flexDir='column' align='center'>
        {/* <Image src={profile} boxSize={24} mb='16px' borderRadius='full' />
        <Avatar boxSize={24} mb='16px' h='auto' src='https://bit.ly/broken-link' /> */}
        {profile ? (
          <Image src={profile} boxSize={24} mb='16px' borderRadius='full' />
        ) : (
          <Avatar boxSize={24} mb='16px' h='auto' src='https://bit.ly/broken-link' />
        )}
      </Flex>

      <Form {...form}>
        <Flex
          as='form'
          onSubmit={onSubmit}
          w='full'
          flexDir='column'
          gap={3}
          textAlign='center'
          align='center'
        >
          <FormField
            control={form.control}
            name='profileImage'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='file'
                    hidden
                    accept='image/*'
                    multiple={false}
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      field.onChange(file);
                      // onsubmit();
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            w={{ base: '100px', sm: '110px' }}
            h='36px'
            fontSize='sm'
            mb='10px'
            onClick={onClickUploadButton}
          >
            이미지 업로드
          </Button>
          <Button
            variant='outline'
            bg='none'
            border='none'
            w={{ base: '80px', sm: '110px' }}
            h='36px'
            color='custom.blue'
            fontSize='sm'
            _hover={{}}
          >
            이미지 제거
          </Button>
        </Flex>
        <h1>ProfileSection</h1>
      </Form>
    </Flex>
  );
};
