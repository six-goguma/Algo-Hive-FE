import axios from 'axios';

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('https://tmpfiles.org/api/v1/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    return '';
  }
}
