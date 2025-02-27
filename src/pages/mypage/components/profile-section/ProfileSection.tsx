import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Avatar, Button, Flex, Image, Input, Spinner } from '@chakra-ui/react';

import { Form, FormField, FormItem } from '@shared/components';
import { useCustomToast } from '@shared/hooks';
import { BASE_URI, SERVER_URI } from '@shared/service';

import { updateProfileImage } from '../../apis';
import { UpdateProfileImage, UpdateProfileImageSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

type Props = {
  profile?: string;
};

export const ProfileSection = ({ profile }: Props) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const toast = useCustomToast();
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: updateImage, isPending } = useMutation({
    mutationFn: updateProfileImage,
    onSuccess: () => {
      toast({
        toastStatus: 'success',
        toastTitle: '프로필 변경',
        toastDescription: '프로필 이미지가 성공적으로 변경되었습니다.',
      });
    },
    onError: () => {
      toast({
        toastStatus: 'error',
        toastTitle: '프로필 변경 실패',
        toastDescription: '프로필 이미지를 변경하는 중 오류가 발생했습니다.',
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

  const uploadFile = async (file: File): Promise<File | null> => {
    if (file.size > 2 * 1024 * 1024) {
      toast({
        toastStatus: 'error',
        toastTitle: '업로드 실패',
        toastDescription: '이미지 크기는 2MB 이하만 가능합니다.',
      });
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await fetch(`${BASE_URI}/mypage/profile`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('파일 업로드 실패');

      const data = await response.json();
      const uploadedUrl = `${SERVER_URI}${data.url}`;

      const blob = await (await fetch(uploadedUrl)).blob();
      return new File([blob], 'profileImage', { type: blob.type });
    } catch {
      toast({
        toastStatus: 'error',
        toastTitle: '업로드 실패',
        toastDescription: '이미지를 업로드하는 중 오류가 발생했습니다.',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

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
  };

  const onSubmit = handleSubmit((data) => {
    if (!data.profileImage) return;
    updateImage({ file: data.profileImage });
  });

  return (
    <Flex as='section' flexDir='column' align='center'>
      {/* 프로필 이미지 영역 */}
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
          {/* 파일 입력 필드 */}
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

          {/* 업로드 버튼 */}
          <Button
            w='110px'
            h='36px'
            fontSize='sm'
            onClick={() => imgRef.current?.click()}
            isDisabled={isUploading || isPending}
          >
            {isUploading ? <Spinner size='sm' /> : '이미지 업로드'}
          </Button>

          {/* 제거 버튼 */}
          <Button
            variant='outline'
            w='110px'
            h='36px'
            fontSize='sm'
            onClick={onFileDelete}
            isDisabled={!profileImage}
          >
            이미지 제거
          </Button>

          {/* 저장 버튼 */}
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
