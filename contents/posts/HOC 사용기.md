---
title: React HOC를 사용해보자
author: jangky000
date: 2021.11.04
---

# 상황 #1

이번에 회사에서 React 프로젝트에 4개의 새로운 페이지를 추가하는 태스크를 맡게 되었다. 

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

# 횡단 관심사

*전역 상태 관리 스토어에서 **선택 가능한 기간**과 **기본 설정 기간**을 가져와 데이터를 검증을 한 뒤 사용하고 싶다, 4개의 페이지에서 똑같이.*

사실 **선택 가능한 기간**과, **기본 설정 기간** 정도 데이터를 불러오는데, 횡단 관심사까지 생각하는 것은 거창하다고 생각할 수 있다. 그럼에도 굳이 이 로직을 재사용하겠다고 결심한 이유는 다음과 같다.

- 각각의 페이지에서 최대한 데이터를 가공하는 로직을 제거하고, View를 그리는 역할에만 집중하고 싶다.
- 유지 보수할 때, 복사 붙여넣기 되어 있는 4개의 소스를 하나씩 찾아 고치고 싶지 않다.
- <s>HOC를 사용해보고 싶다.</s>

# HOC(Higher Order Component): 고차함수
- 리액트 컴포넌트를 인자로 받아서 다른 리액트 컴포넌트를 반환하는 함수
- 컴포넌트에 특정 기능을 부여한다.
- 특정한 기능을 수행한 후 인자로 받은 컴포넌트에 데이터를 넘겨줄 수도 있다.
> 고차 컴포넌트(HOC, Higher Order Component)는 컴포넌트 로직을 재사용하기 위한 React의 고급 기술이다. 고차 컴포넌트(HOC)는 React API의 일부가 아니며, React의 구성적 특성에서 나오는 패턴이다. ([참고](https://ko.reactjs.org/docs/higher-order-components.html))


# HOC를 쓰는 이유는?

*"횡단 관심사(Cross-Cutting Concerns)에 고차 컴포넌트 사용할 수 있다."*
이 설명을 보고 JAVA의 AOP가 떠올랐다. 여러 컴포넌트에서 공통적으로 사용되는 로직을 횡단 관심사로 보아 하나로 묶어 관리하겠다는 것이다.

로직 코드를 재사용하기 위한 방법으로 순수 함수 형태의 Util 함수를 만드는 방법도 있는데 왜 HOC를 쓰는 것일까?

- 함수형 컴포넌트가 아닌 순수 함수에서 hook을 사용할 수 없다.
- 또한 순수 함수 형태의 Util 함수는 사용하고자 하는 컴포넌트 내에서 결국 호출해서 사용하기 때문에, 컴포넌트에 View를 그리는 역할만 남겨두고자 하는 의도에 적합하지 않다.
- 그래서 전역 상태 관리 스토어에서 상태 데이터를 가져와 값을 검증하고 반환하는 로직을 공통화 하고 싶다면 HOC 사용하는 것이 좋다고 생각한다.

# 어떠한 경우에 HOC를 사용할까?

- 여러 컴포넌트에서 특정한 로직을 실헹해야 할 때
- 여러 컴포넌트에서 특정한 데이터 요청(fetching)을 하는 로직이 필요할 때

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
      // 검증 로직
      return dateRange;
    }, []);

    const initSelectedDateRange = useMemo(() => {
      // 검증 로직
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
      {/* title */}
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