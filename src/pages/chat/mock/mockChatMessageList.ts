const roomNames = [
  '브론즈 도전 Lv.2: 기본 그리디',
  '실버 고수 모집: Lv.2 탐욕 알고리즘',
  '프로그래머스 Lv.2: 초보 그리디 클리어',
  '브론즈 빠른 풀이방',
  '실버 레벨업 도전: Lv.2 문제 풀이',
  '그리디 고수: 프로그래머스 Lv.2',
  '브론즈 -> 실버 점프방',
  '실버 그리디 챌린지',
  'Lv.2 브론즈 클리어 방',
  '그리디 연습: Lv.2 브론즈 & 실버',
];

const generateDummyMessages = ({ roomName }: { roomName: string }) => {
  const senders = ['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7', 'User8'];
  const contents = [
    '이 문제는 그리디로 풀 수 있을까요?',
    '프로그래머스 Lv.2 문제 중 가장 어려운 건 뭐예요?',
    '최소 스패닝 트리는 Kruskal로 풀면 쉽습니다.',
    '단속카메라 문제는 범위를 어떻게 처리하죠?',
    '회의실 배정 문제랑 비슷하네요.',
    '우선순위 큐를 사용하는 게 맞을까요?',
    '범위를 정렬하고 그리디로 푸는 게 핵심이에요.',
    '어떤 자료구조를 써야 효율적일까요?',
    '이 문제는 시간 복잡도가 중요해 보이네요.',
    '그리디 알고리즘의 정당성을 어떻게 증명할 수 있을까요?',
  ];

  return Array.from({ length: 50 }, () => ({
    sender: senders[Math.floor(Math.random() * senders.length)],
    content: contents[Math.floor(Math.random() * contents.length)],
    roomName,
  }));
};

export const mockChatMessageList = roomNames.flatMap((roomName) =>
  generateDummyMessages({ roomName }),
);
