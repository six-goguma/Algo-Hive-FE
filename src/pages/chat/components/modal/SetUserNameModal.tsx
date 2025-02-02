import { useState } from 'react';

import { Button, Input } from '@chakra-ui/react';

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@shared/components';

type SetUserNameModalProps = {
  onComplete: () => void;
};

export const SetUserNameModal = ({ onComplete }: SetUserNameModalProps) => {
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState('');

  const handleComplete = () => {
    localStorage.setItem('userNickname', nickname);
    onComplete();
  };

  return (
    <>
      <DialogTrigger>
        <Button mt='15px' h='36px' w='100px'>
          채팅방 입장하기
        </Button>
      </DialogTrigger>

      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent p='20px'>
          <DialogHeader fontSize='13px' fontWeight='Bold'>
            <DialogTitle>입장할 닉네임을 설정해 주세요.</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Input
              placeholder='닉네임을 입력해 주세요.'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </DialogBody>

          <DialogFooter justifyContent='center'>
            <Button h='36px' w='100px' onClick={handleComplete}>
              완료
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};
