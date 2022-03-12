---
title: 모달 컴포넌트와 z-index, React Portal
author: jangky000
date: 2022.02.22
desc: 현재 프로젝트에서 사용되고 있던 모달 컴포넌트를 알아보고, React Portal을 사용하여 개선해보자
---

# 모달 컴포넌트

여기서 말하고자 하는 모달창은 어떠한 사용자의 행동에 대한 응답으로 화면의 최상단에 띄워져야 할 윈도우 창이 아닌 레이어를 말한다. 가장 최상단에 html 요소를 표현하기 위해서는 z-index라는 css 속성을 이해할 필요가 있다.

## z-index의 특징

z-index 속성의 가장 큰 특징은 부모 element가 z-index보다 다른 형제 element들의 z-index보다 낮을 때, 아무리 자식 element의 z-index 값을 크게 해도 최상단에 보이지 않는다는 점이다. 이는 쌓임맥락(Stacking Context)을 참고하면 이해가 될 것이다.(참고: [쌓임맥락](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context))

## 기존 모달 컴포넌트

기존에 프로젝트에서 사용되고 있는 모달 컴포넌트 역시 이 z-index로 인한 고민이 있었을 것이다. 특히 컴포넌트 단위로 개발하는 리액트의 작업 방식의 특성상, 모달 컴포넌트가 어떤 z-index를 가진 컴포넌트 내부에서 사용될지 알 수 없기 때문에 z-index의 설정에 대한 고민이 있었을 것이다.

## 기존 모달 컴포넌트 구현 방식

부모 element의 z-index에 영향을 받지 않기 위해, Route 아래에서 GlobalModal 컴포넌트를 아래와 같이 선언했다. 그리고 전역 상태의 변화를 통해 모달창이 켜지고 꺼지게 설계되었다.

```tsx
<Switch>
  <Route exact path="/..." component={...} />
	...
</Switch>
<GlobalModal />
```

## 기존 모달 컴포넌트의 문제점

1. 가장 큰 문제점은 모달 컴포넌트 자체에서 background-color: #fff, border-radius: 12px로 고정되어 있는 것이 문제였다. 아래와 같은 디자인을 반영하고 싶어도, 2개의 박스를 표현할 수 없고, 배경 색상을 변경할 수도 없었다. 

<img width="70%" alt="1" src="https://user-images.githubusercontent.com/46799722/157811178-4ddc996d-d9f1-4dee-9207-13aa39d55d3b.png">
<img width="25%" alt="2" src="https://user-images.githubusercontent.com/46799722/157811183-1ecfa4a8-0896-461f-87e8-275575b96ad4.png">

2. 아래 사용법을 보면 모달 컴포넌트 내부에 들어갈 내용을 컴포넌트로 전달하고 있다. modalStore는 모달의 open, close 전역 상태를 관리하는 mobx의 observable state다. 또한 onClick 이벤트 핸들러 함수 내부에 컴포넌트가 사용되었다. 이에 대해서 핸들러 기능과 컴포넌트 UI의 분리적인 측면에서 개선될 여지가 있다고 생각했다.

```tsx
// 사용법
<button
  onClick={() =>
    modalStore.open(
      <ModalPresenter
        data={data}
        handleClick={() => ...}
        close={() => modalStore.hide()}
      />,
      {
        disableClose: true,
      },
    )
  }
>
  ...
</button>
```

## 개선점

기존의 모달 컴포넌트는 많은 곳에서 사용되고 있다. 단순히 옵션 추가와 분기 처리만으로도 필요한 디자인을 만들 수 있겠지만, 점점 많아지는 예외적인 분기처리 코드를 의도를 알기 어렵게 만들고 읽기 어렵게 한다는 생각이 든다. 그래서 새롭게 만드는 기능들부터 쉽게 적용 가능하고, 다양하게 쓰일 수 있는 모달 컴포넌트를 제작하기로 했다.

1. React 자체 기능인 Portal을 이용하여, 전역 상태 관리를 하지 않고 z-index 문제를 해결한다.(참고: [React Portals](https://ko.reactjs.org/docs/portals.html))
2. background-color와 border-radius 속성을 고정하지 않고 children을 통해 자유롭게 전달할 수 있게 한다.
3. fade in, fade out 애니메이션을 적용한다.

## 개선 결과: GeneralModalComposition

일반적인 컴포넌트가 `div#root` 내부에 추가되고 Portal을 사용한 컴포넌트는 형제 element인 `div#modal-root` 내부에 추가된다. 그렇게 되면 나중에 나온 `div#modal-root`가 형제 element보다 상위에 표시되게 된다.(position이 없는 요소 간의 비교) 

그러므로 `div#modal-root` 내부에 있는 모든 컴포넌트는 부모인 `div#modal-root`의 쌓임 맥락(Stacking Context)에 동화되기 때문에 최상단에 보일 수 있게 된다.

<img width="35%" alt="3" src="https://user-images.githubusercontent.com/46799722/157811185-5f417b2d-73c0-4c32-9b54-111ff7f3d93f.png">
<img width="60%" alt="4" src="https://user-images.githubusercontent.com/46799722/157811188-4993ac48-9b6a-46d4-95f8-0550835928df.png">

## GeneralModalComposition 사용법

버튼의 클릭 이벤트 핸들러와 모달 내부의 컴포넌트가 분리가 되었다. 그리고 전역 상태로 관리하지 않고도 모달 컴포넌트를 최상단에 그릴 수 있게 되었다.

```tsx
const [isModalOpen, setModalOpen] = useState(false);
const handleModalOpen = useCallback(() => setLegacyPlanModalOpen(true), []);
const handleModalClose = useCallback(() => setLegacyPlanModalOpen(false), []);

return (
	<Button onClick={handleModalOpen}>모달 열기</Button>
	
	<GeneralModalComposition 
		isOpen={isModalOpen}
		closeModal={handleModalClose}
		childrenCss={{ width: '1352px', height: '1607px' }} -> optional
	>
		{ 임의의 Modal 컴포넌트 }
	</GeneralModalComposition>
	)
```

# GeneralModalComposition.tsx

배경에 Backdrop 추가.
fadeIn, fadeOut animation 적용.

```tsx
interface GeneralModalCompositionProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  childrenCss?: React.CSSProperties;
}
/**
 * @description
 * Composition
 * @example
 * <Button onClick={handleModalOpen}>모달 열기</Button>
 *
 * <GeneralModalComposition
    isOpen={isModalOpen}
    childrenCss={{ width: '1352px', height: '1607px' }}
    closeModal={handleModalClose}
  >
 *  { 임의의 Modal 컴포넌트 }
 * </GeneralModalComposition>
 */
function GeneralModalComposition({ isOpen, closeModal, children, childrenCss }: GeneralModalCompositionProps) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 100);
    }
  }, [isOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <PortalToModalRootComposition>
      <StyledGeneralModal isOpen={isOpen}>
        <Backdrop handleClick={closeModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} />
        <div className="general-modal-content" style={childrenCss}>
          {children}
        </div>
      </StyledGeneralModal>
    </PortalToModalRootComposition>
  );
}

export default React.memo(GeneralModalComposition);
```

# GeneralModalComposition.style.ts

```tsx
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const StyledGeneralModal = styled.div<{ isOpen: boolean }>`
  label: general-modal;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .general-modal-content {
    z-index: 1;
    max-width: 90%;
    max-height: 90vh;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.5s;
`;
```

# PortalToModalRootComposition.tsx

React Portal을 사용한 컴포지션 패턴의 컴포넌트.
fade out 애니메이션 발생 시 깜빡 거리는 문제를 해결하기 위해 container ref를 사용.

```tsx
import React, { useEffect, useRef } from 'react';
import ReactDom from 'react-dom';

const modalRoot = document.getElementById('modal-root');

interface ModalCompositionPortalProps {
  children: React.ReactNode;
}
/**
 * @description
 * Portal Composition
 * index.html의 <div id="modal-root"></div> 내부로 children을 이동
 * @example
 * <PortalToModalRootComposition>
 *  { 임의의 Modal 컴포넌트 }
 * </PortalToModalRootComposition>
 */
function PortalToModalRootComposition({ children }: ModalCompositionPortalProps) {
  const container = document.createElement('div');
  // container를 ref로 관리하여, fadeout render 시점 문제 해결
  const containerRef = useRef<HTMLDivElement | null>(container);

  useEffect(() => {
    if (containerRef.current !== null) modalRoot?.appendChild(containerRef.current);
    return () => {
      if (containerRef.current !== null) modalRoot?.removeChild(containerRef.current);
    };
  }, [containerRef]);

  if (containerRef.current) {
    return ReactDom.createPortal(children, containerRef.current);
  }
  return null;
}

export default React.memo(PortalToModalRootComposition);
```

# index.html

id가 modal-root인 div 태그 추가

```html
<!DOCTYPE html>
<html lang="en">
	<head>
    <title>...</title>
	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root"></div>
		<div id="modal-root"></div>
	</body>
</html>
```
