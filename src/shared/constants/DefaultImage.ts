import { SERVER_FILE_URI } from '@shared/service';

// 썸네일이 없는 게시글에 사용하는 단일 기본 이미지.
// 서버(/backend/profile/images)에서 서빙되는 default.svg 를 사용한다.
export const DEFAULT_IMAGE = `${SERVER_FILE_URI}/backend/profile/images/default.svg`;
