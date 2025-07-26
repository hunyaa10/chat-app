import m01 from '@/asset/bot/m01.jpg';
import m02 from '@/asset/bot/m02.jpg';
import m03 from '@/asset/bot/m03.jpg';
import m04 from '@/asset/bot/m04.jpg';
import w01 from '@/asset/bot/w01.jpg';
import w02 from '@/asset/bot/w02.jpg';
import w03 from '@/asset/bot/w03.jpg';
import w04 from '@/asset/bot/w04.jpg';

export const botImages = [
  { id: 'm01', src: m01, alt: '남성 캐릭터 1' },
  { id: 'm02', src: m02, alt: '남성 캐릭터 2' },
  { id: 'm03', src: m03, alt: '남성 캐릭터 3' },
  { id: 'm04', src: m04, alt: '남성 캐릭터 4' },
  { id: 'w01', src: w01, alt: '여성 캐릭터 1' },
  { id: 'w02', src: w02, alt: '여성 캐릭터 2' },
  { id: 'w03', src: w03, alt: '여성 캐릭터 3' },
  { id: 'w04', src: w04, alt: '여성 캐릭터 4' },
] as const;

export const botImageMap = {
  m01, m02, m03, m04, w01, w02, w03, w04
} as const;

export type BotId = keyof typeof botImageMap;
