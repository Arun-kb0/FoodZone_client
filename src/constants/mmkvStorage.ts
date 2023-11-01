import { MMKV } from "react-native-mmkv";

export const storage = new MMKV()

export enum mmkvkeys {
  tokenProvider = "tokenProvider",
  accessToken = "accessToken",
  refreshToken = "refreshToken"
}