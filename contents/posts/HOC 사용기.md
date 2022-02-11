---
title: React에서 HOC로 공통 로직을 묶어서 관리해보자(+ Custom hook)
author: jangky000
date: 2021.11.04
desc: React 공식 문서에서 class형으로 구현된 예제만 있는 HOC를 굳이 함수형으로 구현/적용해보고 느낀 Custom hook의 소중함에 대해 이야기해본다.
---

# 상황 #1

React 프로젝트에 4개의 새로운 페이지를 추가하는 태스크를 맡게 되었다. 

아래와 같이 4개의 페이지를 제작해야 한다고 하자, 4개의 페이지에는 공통적으로 날짜를 선택할 수 있는 Calendar Selector가 있고, 이 셀렉터에는 사용자에 따라 **선택 가능한 기간**과 **기본 설정 기간** 정보가 필요하다.
- **선택 가능한 기간**은 서버에서 데이터를 불러와 전역 상태로 관리되고 있는 데이터다.
- **기본 설정 기간** 역시 전역 상태 데이터다.
- 각각의 페이지는 Calendar Selector에서 선택한 기간에 따라 다른 데이터를 불러와 출력해야 한다.

<div style="display: grid;grid-template-columns: repeat(2, 1fr);grid-column-gap: 20px;grid-row-gap: 20px;">
    <img src="https://user-images.githubusercontent.com/46799722/140294319-00c25762-be33-4452-93ad-b9ffec94b290.png" style="width:100%;"/>
    <img src="https://user-images.githubusercontent.com/46799722/140294330-2092adfa-5527-4b24-a23b-2c75838e98f7.png" style="width:100%;"/>
    <img src="https://user-images.githubusercontent.com/46799722/140294336-21ddcf01-228d-4ff0-b74c-4148139496cc.png" style="width:100%;"/>
    <img src="https://user-images.githubusercontent.com/46799722/140294339-c4061391-c5a0-47ab-b619-4a34e8a11ec8.png" style="width:100%;"/>
</div>

# 코드의 재사용

*전역 상태 관리 스토어에서 **선택 가능한 기간**과 **기본 설정 기간**을 가져와 데이터를 검증을 한 뒤 사용하고 싶다, 4개의 페이지에서 똑같이.*

**선택 가능한 기간**과, **기본 설정 기간** 정도 데이터를 불러오는데, 이 로직을 재사용하겠다고 결심한 이유는 다음과 같다.

- 유지 보수할 때, 복사 붙여넣기 되어 있는 4개의 소스를 하나씩 찾아 고치고 싶지 않다.
- 각각의 페이지에서 최대한 데이터를 가공하는 로직을 제거하고, View를 그리는 역할에만 집중하고 싶다.

# 리액트에서 코드를 재사용할 수 있는 방법

- Util 성 순수 함수
- Composition
- Render Props
- HOC
- Custom Hook

# 이중 HOC를 선택한 이유는 다음과 같다.

- Util 성 순수함수는 전역 상태 관리 스토어 값을 활용 할 수 없다.(순수 함수 정의에 위배)
- Composition은, Render Props는 JSX Element 형태로 사용하여 동적으로 무엇을 그릴지에 초점이 있는 느낌이다.
- 하지만 내게 필요한 기능은 단순히 전역 상태 관리 스토어에서 데이터를 가져오는 기능이다.
- <s>선택지가 아직 두 개가 남았지만 내게 가장 낯선 HOC를 사용해보고 싶었다.</s>

# HOC(Higher Order Component): 고차함수

> 고차 컴포넌트(HOC, Higher Order Component)는 컴포넌트 로직을 재사용하기 위한 React의 고급 기술이다. 고차 컴포넌트(HOC)는 React API의 일부가 아니며, React의 구성적 특성에서 나오는 패턴이다. ([참고](https://ko.reactjs.org/docs/higher-order-components.html))

> *"횡단 관심사(Cross-Cutting Concerns)에 고차 컴포넌트를 사용할 수 있다."*

이 설명을 보고 JAVA의 AOP가 떠올랐다. 여러 컴포넌트에서 공통적으로 사용되는 로직을 횡단 관심사로 보아 하나로 묶어 관리할 수 있다고 한다.

## HOC는

- 리액트 컴포넌트를 인자로 받아서 다른 리액트 컴포넌트를 반환하는 함수
- 컴포넌트에 특정 기능을 부여한다.
- 특정한 기능을 수행한 후 인자로 받은 컴포넌트에 데이터를 넘겨줄 수도 있다.


# 어떠한 경우에 HOC를 사용할까?

- 로딩, 에러, 데이터 요청 등 여러 컴포넌트에서 반복적으로 사용되는 로직을 컴포넌트 바깥으로 분리할 때 고려될 수 있다.

# Functional하게 HOC 사용하기

- React 공식 홈페이지에서는 class 형태로 HOC를 사용하는 예제가 나와 있지만, 리액트 프로젝트에서 함수형 컴포넌트로 사용하고 있기 때문에, 함수의 형태로 HOC를 사용하는 방법을 조사했다.

# 사용 예제

````typescript
// HOC 함수: withCalendarDateRange
import React, { FC, useMemo } from 'react';
import moment from 'moment';
import { useDataStore } from './context/Store';
import { DateRange } from './Calendar';

export interface CalendarDateRangeProps {
  selectableDateRange: DateRange;
  initSelectedDateRange: DateRange;
}

interface WrapperProps extends CalendarDateRangeProps {
  [props: string]: unknown;
}

export const withCalendarDateRange = <OriginProps,>(WrappedComponent: FC<WrapperProps>): FC<OriginProps> => {
  const WrapperComponent = (props?: OriginProps) => {
    const { projectStore } = useDataStore();

    const selectableDateRange = useMemo(() => {
      const dateRange = projectStore.date.selectable
      // 검증 로직...
      return dateRange;
    }, []);

    const initSelectedDateRange = useMemo(() => {
      const dateRange = projectStore.date.init
      // 검증 로직...
      return dateRange;
    }, []);

    return (
      <WrappedComponent
        {...props}
        selectableDateRange={selectableDateRange}
        initSelectedDateRange={initSelectedDateRange}
      />
    );
  };
  WrapperComponent.displayName = WrappedComponent.displayName || WrappedComponent.name || 'CalendarDateRangeWrapper';
  return WrapperComponent;
};
````

````typescript
// 공통 로직을 추가할 컴포넌트: WrappedVisitStatus
// Props를 통해 selectableDateRange, initSelectedDateRange 데이터를 받는다.
import React, { useState } from 'react';
import { Calendar, DateRange } from './Calendar';
import { withCalendarDateRange, CalendarDateRangeProps } from './HOC/withCalendarDateRange';

type WrappedVisitStatusProps = CalendarDateRangeProps;

const WrappedVisitStatus = ({ selectableDateRange, initSelectedDateRange }: WrappedVisitStatusProps) => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const handleDateRange = (changedDateRange: DateRange) => setDateRange(changedDateRange);

  return (
    <StyledLayout>
      <StyledTitleWrapper>
        <StyledTitle>방문 현황</StyledTitle>
        <Calendar
          selectableRange={selectableDateRange}
          initDateRange={initSelectedDateRange}
          dateHandle={handleDateRange}
        />
      </StyledTitleWrapper>
    </StyledLayout>
  );
};

// HOC를 통해 캘린더 데이터 Props 삽입
export const VisitStatus = withCalendarDateRange(WrappedVisitStatus);
````

````typescript
// 공통 로직이 추가된 컴포넌트 사용: Dashboard
import React, { FC, useState } from 'react';
import { BGTab, ITab } from './components/BGTab';
import { TopNavBar } from './components/TopNavBar';
import { Container } from './Dashboard.style';
import { tabList } from './Dashboard.data';
import { BorderSection } from './components/BorderSection';
import { VisitStatus } from './components/VisitStatus';

interface IUseTab {
  selectedTab: ITab;
  handleTab: (tab: ITab) => void;
}
export const useTab = (defaultTab: ITab): IUseTab => {
  const [selectedTab, setTab] = useState<ITab>(defaultTab);
  const handleTab = (tab: ITab) => {
    setTab(tab);
  };
  return { selectedTab, handleTab };
};

export const Dashboard: FC = () => {
  const { selectedTab, handleTab } = useTab(tabList[0]);

  return (
    <Container>
      <TopNavBar title="CRM 대시보드" style={{ border: 0 }} />
      <BGTab tabList={tabList} selectedTab={selectedTab} handleTab={handleTab} />
      <BorderSection style={{ marginTop: '32px', borderRadius: '8px' }}>
        {selectedTab.key === 'visitStatus' && <VisitStatus />}
      </BorderSection>
    </Container>
  );
};

````

# 좀 더 간단한 코드

````javascript
// HOC
export const withHOC = WrappedComponent => {
  const NewComponent = async (props) => {
    // 공통 로직
    const { newData } = await fetchNewDate(); // newData = 'Higher Order Component'
    return (
        <WrappedComponent {...props} data={newData} />
      );
  }
  NewComponent.displayName = 'NewComponent'
  return NewComponent;
}
````

````javascript
// 공통 로직을 추가할 컴포넌트
import { withHOC } from 'withHOC.tsx'
const WrappedComponent = ({text, data})=>{
    // name은 PageComponent에서 props로 넘겨준 데이터
    // data는 HOC에 의해 props에 추가된
    return (
        <div>
            <div>{text}</div>
            <div>{data}</div>
        </div>
    );
}
export const MyComponent = withHOC(WrappedComponent)
````

````javascript
import { MyComponent } from 'MyComponent.tsx'
// 공통 로직이 추가된 컴포넌트 사용
const PageComponent에서 = ()=>{
    return <MyComponent text={'HOC'}/>
}
````
````
결과 화면:

HOC
Higher Order Component
````

# 그런데,

어찌저찌 HOC를 사용해보고 싶은 지적인 욕심은 풀었으나 HOC의 단점들이 눈에 들어오기 시작했다.

- 타입스크립트를 사용한다면, 타입을 맞추기도 어려울 뿐더러, 읽기도 어렵다.

````typescript
export interface CalendarDateRangeProps {
  selectableDateRange: DateRange;
  initSelectedDateRange: DateRange;
}

interface WrapperProps extends CalendarDateRangeProps {
  [props: string]: unknown;
}

export const withCalendarDateRange = <OriginProps,>(WrappedComponent: FC<WrapperProps>): FC<OriginProps> => {
  const WrapperComponent = (props?: OriginProps) => {
    ...
````

- 여러 HOC를 하나의 컴포넌트에서 사용해야 할 경우가 생긴다면, `withA(withB(withC(MyComponent)))` 처럼 함수 호출 Depth가 깊어진다(Nesting).

# 나는 평소 Hooks를 소중히 여기지 않았지

필자는 리액트를 처음 시작할 때부터 함수형 컴포넌트와 리액트 Hooks를 사용해왔기 때문에 Hooks의 편리함을 잘 몰랐다. [리액트 Hooks는 대부분의 HOC와 Render Props를 대체 가능하며, 더 간단하고 리액트 가상 DOM Tree의 Nesting을 줄여준다.](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)
다음과 같이 Custom Hook을 사용하여 해결이 가능하다.

````typescript
// useCalendarDateRange.ts
const useCalendarDateRange = ()=>{
  const { projectStore } = useDataStore();

    const selectableDateRange = useMemo(() => {
      const dateRange = projectStore.date.selectable
      // 검증 로직...
      return dateRange;
    }, []);

    const initSelectedDateRange = useMemo(() => {
      const dateRange = projectStore.date.init
      // 검증 로직...
      return dateRange;
    }, []);
  return {selectableDateRange, initSelectedDateRange}
}
````

````typescript
// 공통 로직을 추가할 컴포넌트: VisitStatus
// Props를 통해서가 아닌 useCalendarDateRange()를 호출해서 필요한 데이터를 받는다.
import React, { useState } from 'react';
import { Calendar, DateRange } from './Calendar';
import { useCalendarDateRange } from './hooks/useCalendarDateRange';

export const VisitStatus = () => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const handleDateRange = (changedDateRange: DateRange) => setDateRange(changedDateRange);
  const {selectableDateRange, initSelectedDateRange} = useCalendarDateRange();

  return (
    <StyledLayout>
      <StyledTitleWrapper>
        <StyledTitle>방문 현황</StyledTitle>
        <Calendar
          selectableRange={selectableDateRange}
          initDateRange={initSelectedDateRange}
          dateHandle={handleDateRange}
        />
      </StyledTitleWrapper>
    </StyledLayout>
  );
};
````

# 결론

- HOC는 함수형 컴포넌트와 리액트 Hooks가 나오기 이전부터 Class Component 개발에서 리액트 Life Cycle에 종속적이지 않은 중복된 코드를 분리하기 위해서 사용되었다. (그래서 공식 홈페이지에 클래스형 컴포넌트로 만들어진 HOC 예제가 있나보다.)
- HOC는 클래스형, 그리고 함수형 모두에 적용할 수 있어, 레거시와 모던한 리액트 컴포넌트 사이에서 연결 다리처럼 재사용이 가능하다는 장점이 있다. 
- 현재는 리액트 Hooks를 사용해 Custom Hook을 만들어 HOC를 대부분 대체할 수 있으며, 이렇게 사용하는 것이 더 간단하고 직관적이다.
- 그러니 다시 소스를 수정하러 가야겠다.

# 참고
- [https://ko.reactjs.org/docs/higher-order-components.html](https://ko.reactjs.org/docs/higher-order-components.html)
- [https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)
- [https://velog.io/@yeonseo07/%EB%AA%A8%EB%8B%AC%EC%9D%84-%EB%A7%8C%EB%93%A4%EB%8B%A4-%EC%83%9D%EA%B8%B4-%EC%9D%BC](https://velog.io/@yeonseo07/%EB%AA%A8%EB%8B%AC%EC%9D%84-%EB%A7%8C%EB%93%A4%EB%8B%A4-%EC%83%9D%EA%B8%B4-%EC%9D%BC)
- [https://yceffort.kr/2020/10/react-hooks-and-hocs](https://yceffort.kr/2020/10/react-hooks-and-hocs)