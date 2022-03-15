---
title: NextJS + Typescript + ESLint 프로젝트에서 절대경로 alias 설정하기
author: jangky000
date: 2022.02.11
desc: 프로젝트의 사이즈가 커질수록 상대경로를 통해 import를 하게 되면 ../ 지옥에 빠지기 쉽다. NextJS + Typescript + ESLint를 사용하고 있는 현재 블로그에서 CRACO 라이브러리를 사용해 절대경로 alias를 설정하고 import path를 깔끔하게 관리하는 방법을 공유한다.
category: 기타
---

# NextJS + Typescript + ESLint 프로젝트에서 절대경로 Alias 설정하기

## 적용 전

![1](https://user-images.githubusercontent.com/46799722/153555553-77c5db2a-3970-4689-996a-c0444ee4723c.png)

## 적용 후

![2](https://user-images.githubusercontent.com/46799722/153555565-f020b259-52d9-486a-bab8-b05ec4bf4b7e.png)

- 프로젝트 디렉토리 구조

```
📦jangky000.github.io
 ┣ 📂components
 ┣ 📂contents
 ┣ 📂jsons
 ┣ 📂lib
 ┣ 📂pages
 ┣ 📂public
 ┣ 📂scripts
 ┣ 📂styles
 ┣ 📂theme
 ┣ 📂types
 ┣ 📜.eslintrc
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜.stylelintrc
 ┣ 📜README.md
 ┣ 📜craco.config.js
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.js
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┗ 📜tsconfig.path.json
```

## **Craco(C**reate **R**eact **A**pp **C**onfiguration **O**verride)

- [https://www.npmjs.com/package/@craco/craco](https://www.npmjs.com/package/@craco/craco)
- create-react-app로 생성한 프로젝트에서 eject로 프로젝트에 숨겨져 있는 모든 설정을 꺼내지 않고 커스텀 설정을 override할 수 있게 하는 모듈

## **Craco** 설치

```
yarn add @craco/craco
yarn add craco-alias -D
```

## **craco.config.js**

- 루트 경로에

```jsx
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: 'tsconfig.path',
      },
    },
  ],
};
```

## **tsconfig.path.json**

```jsx
{
    "compilerOptions": {
        "baseUrl": "./" ,
  
        "paths": {
            "@components/*": ["components/*"],
            "@styles/*": ["styles/*"],
            "@jsons/*": ["jsons/*"],
            "@theme/*": ["theme/*"],
            "@lib/*": ["lib/*"],
         },
     }
   }
```

## **tsconfig.json**

```json
{
	...
	"extends": "./tsconfig.path"
}
```

## .eslintrc

```json
{
	...
	"import/no-unresolved": "off"
	...
}
```

## VS Code 껐다가 켜기*

- **tsconfig.path.json**에서 경로를 수정하면 경로를 인식하지 못하는 경우가 있다.
- ~~대부분의 설정 문제는 설정 완료 후 껐다가 켜면 해결된다.~~