import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Avatar, Button, Flex, Image, Input, Spinner } from '@chakra-ui/react';

import { Upload, X } from 'lucide-react';

import { deleteProfileImage, profilePath } from '@pages/mypage/apis';

import { Form, FormField, FormItem } from '@shared/components';
import { useCustomToast } from '@shared/hooks';
import { queryClient } from '@shared/lib';
import { SERVER_URI } from '@shared/service';

import { useUpdateProfileImage } from '../../hooks/useUpdateProfileImage';
import { useUploadProfileImage } from '../../hooks/useUploadProfileImage';
import { UpdateProfileImage, UpdateProfileImageSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

type Props = {
  profile?: string;
};

export const ProfileSection = ({ profile }: Props) => {
  const imgRef = useRef<HTMLInputElement | null>(null);

  const toast = useCustomToast();

  const { uploadFile, isUploading } = useUploadProfileImage();

  const { mutate: updateImage, isPending } = useUpdateProfileImage();

  const { mutate: deleteImage } = useMutation({
    mutationFn: deleteProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profilePath });

      toast({
        toastStatus: 'success',
        toastTitle: '프로필 삭제',
        toastDescription: '프로필 이미지가 성공적으로 삭제되었습니다.',
      });
    },
    onError: () => {
      toast({
        toastStatus: 'error',
        toastTitle: '프로필 삭제 실패',
        toastDescription: '프로필 이미지를 삭제하는 중 오류가 발생했습니다.',
      });
    },
  });

  const userProfile = profile ? `${SERVER_URI}${profile}` : '';

  const form = useForm<UpdateProfileImage>({
    resolver: zodResolver(UpdateProfileImageSchema),
    defaultValues: {
      profileImage: undefined,
    },
  });

  const { setValue, watch, handleSubmit } = form;
  const profileImage = watch('profileImage');

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedFile = await uploadFile(file);
    if (uploadedFile) {
      setValue('profileImage', uploadedFile);
    }
  };

  const onFileDelete = () => {
    setValue('profileImage', undefined);
    deleteImage();
  };

  const onSubmit = handleSubmit((data) => {
    if (!data.profileImage) return;
    updateImage({ file: data.profileImage });
  });

  return (
    <Flex as='section' flexDir='column' align='center'>
      <Flex w='128px' flexDir='column' align='center'>
        {profileImage ? (
          <Image src={URL.createObjectURL(profileImage)} boxSize={24} borderRadius='full' />
        ) : userProfile ? (
          <Image src={userProfile} boxSize={24} borderRadius='full' />
        ) : (
          <Avatar boxSize={24} src='https://bit.ly/broken-link' />
        )}
      </Flex>

      <Form {...form}>
        <Flex as='form' onSubmit={onSubmit} w='full' flexDir='column' align='center' gap={3}>
          <FormField
            control={form.control}
            name='profileImage'
            render={({ field }) => (
              <FormItem>
                <Input
                  type='file'
                  hidden
                  accept='image/*'
                  ref={imgRef}
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0] || null);
                    onFileChange(e);
                  }}
                />
              </FormItem>
            )}
          />
          <Flex w='110px' gap={3}>
            <Button
              w='full'
              h='36px'
              fontSize='sm'
              onClick={() => imgRef.current?.click()}
              isDisabled={isUploading || isPending}
            >
              {isUploading ? <Spinner size='sm' /> : <Upload />}
            </Button>

            <Button
              variant='outline'
              w='full'
              h='36px'
              fontSize='sm'
              onClick={onFileDelete}
              // isDisabled={!profileImage}
            >
              <X />
            </Button>
          </Flex>
          <Button
            w='110px'
            h='36px'
            fontSize='sm'
            colorScheme='blue'
            type='submit'
            isLoading={isPending}
            isDisabled={!profileImage}
          >
            저장
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
};
