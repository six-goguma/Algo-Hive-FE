import { useEffect, useRef, useState } from 'react';

import {
  DialogRoot,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  Flex,
  DialogCloseTrigger,
  Input,
  Textarea,
  VStack,
  Text,
  Image,
  HStack,
} from '@chakra-ui/react';

// import { ImagePlus } from 'lucide-react';

import { DialogActionTrigger } from '@shared/components';

type PostDialogProps = {
  title: string;
  buttonTitle: string;
  postType: 'create' | 'edit';
  imageUrl?: string;
  postContent?: string;
};

export const PostDialog = ({
  //   isOpen,
  //   onClose,
  title,
  buttonTitle,
  imageUrl,
  postType,
  postContent,
}: PostDialogProps) => {
  const [open, setOpen] = useState(false);
  const [inputCount, setInputCount] = useState<number>(0);
  const [imgFile, setImgFile] = useState<File>();
  const [imgPath, setImgPath] = useState('');
  const [contents, setContents] = useState<string>(postContent || '');
  const [showControls, setShowControls] = useState<boolean>(false);

  const imgRef = useRef<HTMLInputElement | null>(null);

  const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;

  const onCountText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
    setContents(e.target.value);
  };

  const onClick = () => {
    imgRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      alert('이미지 사이즈는 2MB를 넘을 수 없습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImgFile(file);
      setImgPath(reader.result as string);
    };
    reader.readAsDataURL(file);
    setShowControls(true);
  };

  const onFileDelete = () => {
    setImgFile(undefined);
    setImgPath('');
    setShowControls(false);
  };

  useEffect(() => {
    if (postType === 'edit') {
      setImgPath(imageUrl || '');
      setContents(postContent || '');
      setShowControls(!!imageUrl);
    }
  }, [imageUrl, postType, postContent]);

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger>
        <Button variant='outline'>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent w='full'>
        <DialogHeader mt={5} textAlign='left' ml={3}>
          <DialogTitle>포스트 미리보기</DialogTitle>
        </DialogHeader>

        <DialogBody>
          {showControls && (
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
          <VStack flexDir='column' textAlign='center' gap={3} px={3}>
            <Flex bgColor='#E9ECEE' justify='center' w='full' h='166px' flexDir='column'>
              <VStack gap={2}>
                {imgFile || imgPath ? (
                  <Image src={imgPath} alt='thumbnail' maxW='312px' maxH='166px' />
                ) : (
                  <>
                    <VStack gap={2}>
                      {/* <ImagePlus strokeWidth={1} size={100} color='gray' /> */}
                    </VStack>
                    <Button
                      onClick={onClick}
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
              <Flex w='full' flexDir='column'>
                <Textarea
                  w='full'
                  px={3}
                  h='100px'
                  maxLength={150}
                  placeholder='나의 포스트를 짧게 소개해보아요.'
                  fontSize='sm'
                  onChange={onCountText}
                  value={contents}
                />
                <Flex w='full' justify='flex-end' mt='2px'>
                  <Text as='b' fontSize='sm' color='customGray.500'>
                    {`${inputCount}/150`}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </VStack>
        </DialogBody>

        <DialogFooter w='full' flexDir='row' px={9} mb={3}>
          <HStack gap={2}>
            <DialogActionTrigger asChild>
              <Button
                variant='outline'
                border='none'
                _hover={{}}
                w='full'
                h='40px'
                colorScheme='custom.blue'
              >
                취소
              </Button>
            </DialogActionTrigger>
            <Button
              w='full'
              h='40px'
              px={5}
              borderRadius='3px'
              colorScheme='custom.blue'
              _hover={{}}
            >
              {buttonTitle}
            </Button>
          </HStack>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
