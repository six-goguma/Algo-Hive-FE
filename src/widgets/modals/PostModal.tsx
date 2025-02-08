import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Text,
  HStack,
  Textarea,
  VStack,
  Image,
  Input,
  Spinner,
} from '@chakra-ui/react';

import { ImagePlus } from 'lucide-react';

import { Form, FormField, FormItem } from '@shared/components';
import { useCustomToast } from '@shared/hooks';
import { BASE_URI } from '@shared/service';

const SERVER_URL = 'http://algo.knu-soft.site';

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  postContent: string;
  postSummary: string;
  buttonTitle: string;
  onConfirmButton: (data: {
    title: string;
    contents: string;
    thumbnail: string;
    summary: string;
  }) => void;
  postType: 'create' | 'edit';
  imageUrl?: string;
};

type PostModalForm = {
  thumbnail: string;
  summary: string;
};

export const PostModal = ({
  isOpen,
  onClose,
  title,
  buttonTitle,
  imageUrl,
  postType,
  postContent,
  postSummary,
  onConfirmButton,
}: PostModalProps) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;
  const customToast = useCustomToast();

  const form = useForm<PostModalForm>({
    defaultValues: {
      thumbnail: imageUrl || '',
      summary: postSummary || '',
    },
  });

  const { setValue, watch, handleSubmit } = form;
  const thumbnail = watch('thumbnail');
  const summary = watch('summary');

  useEffect(() => {
    if (postType === 'edit') {
      setValue('thumbnail', imageUrl || '');
      setValue('summary', postSummary || '');
    }
  }, [imageUrl, postType, postSummary, setValue]);

  const uploadFile = async (file: File): Promise<string> => {
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      customToast({
        toastStatus: 'error',
        toastTitle: '업로드 실패',
        toastDescription: '이미지 크기는 2MB 이하만 가능합니다.',
      });
      return '';
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);

    try {
      const response = await fetch(`${BASE_URI}/images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('파일 업로드 실패');
      }

      const data = await response.json();
      return `${SERVER_URL}${data.url}`;
    } catch {
      customToast({
        toastStatus: 'error',
        toastTitle: '업로드 실패',
        toastDescription: '이미지를 업로드하는 중 오류가 발생했습니다.',
      });
      return '';
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await uploadFile(file);
    if (uploadedUrl) {
      setValue('thumbnail', uploadedUrl);
    }
  };

  const onFileDelete = () => {
    setValue('thumbnail', '');
  };

  const onSubmit = (data: PostModalForm) => {
    onConfirmButton({
      title,
      contents: postContent,
      thumbnail: data.thumbnail,
      summary: data.summary,
    });
  };

  return (
    <Modal size='sm' isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(3px)' />
      <ModalContent w='100%'>
        <ModalHeader mt={5} textAlign='left' ml='3'>
          포스트 미리보기
        </ModalHeader>
        <ModalCloseButton />

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody textAlign='center' justifyContent='center' alignItems='center'>
              {thumbnail && (
                <Flex w='325px' pb={1} justifyContent='flex-end' gap={2}>
                  <Text
                    as='button'
                    fontSize='sm'
                    fontWeight='700'
                    color='customGray.400'
                    textDecor='underline'
                    onClick={onFileDelete}
                  >
                    썸네일 제거
                  </Text>
                </Flex>
              )}
              <VStack flexDir='column' textAlign='center' spacing={3} px={3}>
                <Flex bgColor='#E9ECEE' justify='center' w='full' h='166px' flexDir='column'>
                  <VStack spacing={2}>
                    {isUploading ? (
                      <Spinner size='xl' color='customGray.500' /> // ✅ 업로드 중 스피너 표시
                    ) : thumbnail ? (
                      <Image src={thumbnail} alt='thumbnail' maxW='312px' maxH='166px' />
                    ) : (
                      <>
                        <VStack spacing={2}>
                          <ImagePlus strokeWidth={1} size={100} color='gray' />
                        </VStack>
                        <Button
                          onClick={() => imgRef.current?.click()}
                          variant='outline'
                          px={5}
                          py='2px'
                          fontSize='sm'
                          borderColor='white'
                          transition='all 0.2s ease-in-out'
                          borderRadius='3px'
                          _hover={{
                            borderColor: 'custom.blue',
                            backgroundColor: 'custom.blue',
                            color: 'white',
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          썸네일 업로드
                          <Input
                            type='file'
                            name='photo'
                            display='none'
                            accept='image/png, image/jpeg, image/jpg'
                            ref={imgRef}
                            onChange={onFileChange}
                          />
                        </Button>
                      </>
                    )}
                  </VStack>
                </Flex>
                <Flex w='full' flexDir='column'>
                  <Flex w='full' py={3}>
                    <Text as='b' fontSize='xl'>
                      {title}
                    </Text>
                  </Flex>

                  <FormField
                    control={form.control}
                    name='summary'
                    render={({ field }) => (
                      <FormItem>
                        <Textarea
                          {...field}
                          w='full'
                          px={3}
                          h='100px'
                          maxLength={150}
                          placeholder='나의 포스트를 짧게 소개해보아요.'
                          fontSize='sm'
                        />
                        <Flex w='full' justify='flex-end' mt='2px'>
                          <Text as='b' fontSize='sm' color='customGray.500'>
                            {`${summary.length}/150`}
                          </Text>
                        </Flex>
                      </FormItem>
                    )}
                  />
                </Flex>
              </VStack>
            </ModalBody>

            <ModalFooter w='full' flexDir='row' px={9} mb={3}>
              <HStack spacing={2}>
                <Button
                  variant='outline'
                  border='none'
                  _hover={{}}
                  w='full'
                  h='40px'
                  colorScheme='custom.blue'
                  onClick={onClose}
                >
                  취소
                </Button>
                <Button
                  w='full'
                  h='40px'
                  px={5}
                  borderRadius='3px'
                  colorScheme='custom.blue'
                  _hover={{}}
                  type='submit'
                >
                  {buttonTitle}
                </Button>
              </HStack>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
};
