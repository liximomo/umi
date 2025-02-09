import fs from 'fs';
import { join } from 'path';
import { winPath } from '@umijs/utils';
import { getGlobalFile, isDynamicRoute } from './utils';

test('getGlobalFile', () => {
  const existsSyncMock = jest
    .spyOn(fs, 'existsSync')
    .mockImplementation((res) => true);
  const files = getGlobalFile({
    files: ['global.ts', 'global.tsx', 'global.js'],
    absSrcPath: winPath(__dirname),
  });
  expect(files).toEqual([join(winPath(__dirname), 'global.ts')]);
  existsSyncMock.mockRestore();
});

test('isDynamicRoute', () => {
  expect(isDynamicRoute('/a')).toBeFalsy();
  expect(isDynamicRoute('/a?b=ccc')).toBeFalsy();
  expect(isDynamicRoute('/a/:id')).toBeTruthy();
  expect(isDynamicRoute('/a/b/c/:id')).toBeTruthy();
  expect(isDynamicRoute('/a/b/:c/:id')).toBeTruthy();
  expect(isDynamicRoute('/a/b/:c/d/:id')).toBeTruthy();
  expect(isDynamicRoute(':id')).toBeTruthy();
  expect(isDynamicRoute(undefined)).toBeFalsy();
});
