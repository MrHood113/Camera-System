import axiosClient from './axiosClient';

export async function getStreamUrl(id: number, accessToken: string): Promise<string> {
    const res = await axiosClient.get(`/authenticated/${id}/stream-url`, {
      headers: {
      Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.streamUrl;
}
