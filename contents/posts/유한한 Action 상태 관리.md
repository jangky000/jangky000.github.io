---
title: 유한한 Action 정의 통한 상태 관리
author: jangky000
date: 2022.01.21
desc: 복잡한 UI 상태를 관리하고 사이드 이펙트를 줄이기 위해서는 액션을 정의하고, 정의된 액션에 한해서 동작하도록 UI를 설계할 필요가 있다. useState를 이용해서 관리하고 있던 복잡한 필터 모달 UI를 useReducer를 이용해 관리한 경험을 공유해보고자 한다.
---

# 업무

- 상품 필터 제작
    1. [상품 필터 속성 - 셀렉터] 
        - ex. “상품 이름”, “상품 ID”, “카테고리”
    2. [값 of 상품 필터 속성 - 모달]
        - 상품 이름을 선택했을 때 → ex. “샘플 상품1”, “샘플 상품2”

# 주제

- 2번 `[값 of 상품 필터 속성 - 모달]` 컴포넌트를 리팩토링하면서
- `액션 정의`를 통해 상태의 `사이드 이펙트` 를 관리했던 경험을 이야기해보고자 한다.

![1](https://user-images.githubusercontent.com/46799722/150506783-3b601978-3d5e-4603-ac62-a8eb6656ebd1.png)

![2](https://user-images.githubusercontent.com/46799722/150506774-d2dad4a7-8978-4abd-8cfd-7830cf85b245.png)

![3](https://user-images.githubusercontent.com/46799722/150506777-886c7aac-1f6a-4437-99db-7d5197bdab88.png)

![4](https://user-images.githubusercontent.com/46799722/150506781-2b375c4f-94d9-4b36-88e9-da9bf1085507.png)

![5](https://user-images.githubusercontent.com/46799722/150506766-f515c78f-55cf-4702-96d9-3c0eb51005d9.png)

# 시나리오

- [값 of 상품 필터 속성 - 모달]: **<PropertyFilterValueModal2 />**
    - API에서 `값 of 상품 필터 속성`을 5개씩 끊어서 불러옴
        - 스크롤을 내리면 추가로 5개를 더 불러옴
    - 각각의 옵션(값)을 눌러 체크박스를 선택/해제
    - `모든 속성 선택` 을 눌렀을 때, 모든 옵션(값)의 체크 박스가 선택
    - 검색 칸에 문구를 입력하면,
        - API에서 해당 검색 문자를 포함하는 `값 of 상품 필터 속성`을 5개씩 끊어서 불러옴
        - `모든 속성 선택` 옵션 숨김
        - `‘[검색어]’를 포함한 모든 속성 선택` 옵션이 노출
        - `‘[검색어]’를 포함한 모든 속성 선택`을 누르면

# #1 액션을 정의하지 않았을 때

## useState로 상태 관리

- useState로 정의한 상태는 다음과 같다.
    - 검색 키워드(searchKeyword)
    - 모두 선택 여부(isAllChecked)
    - 값의 체크 여부를 담고 있는 옵션 리스트(optionList)
    - 체크된 값의 이름을 저장하는 리스트(checkedPropertyValueList)
    
    ```tsx
    const [searchKeyword, setSearchKeyword] = useState<string>(testSearchKeyword || '');
    const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
    const [optionList, setOptionList] = useState<IPropertyValue[]>(testOptionData || []);
    const [checkedPropertyValueList, setCheckedPropertyValueList] = useState<string[]>([]);
    const [skip, setSkip] = useState<number>(0);
    ```
    
- presenter
    
    ```tsx
    // presenter
    
    import React, { FC, useMemo } from 'react';
    import InfiniteScroll from 'react-infinite-scroll-component';
    import i18next from 'i18next';
    import { Backdrop } from '../../Backdrop/Backdrop';
    import { StyledBackButton, StyledLayout, StyledModalOption, StyledSearch } from './PropertyValueFilterModal2.style';
    import { FontIcon } from '../../FontIcon/FontIcon';
    import { BGCheckbox } from '../../BGCheckbox/BGCheckbox';
    import { BGTooltip } from '../../BGTooltip/BGTooltip';
    import { BGLoadingSpinner } from '../../BGLoadingSpinner/BGLoadingSpinner';
    import { BGButtonGroup } from '../../BGButtonGroup/BGButtonGroup';
    import { BGButton } from '../../BGButton/BGButton';
    import { BGEmpty } from '../../BGEmpty/BGEmpty';
    import { IProductProperty } from '../ProductSelectBox/ProductSelectBox.interface';
    
    type IsFetching = boolean;
    
    export interface IPropertyValue {
      value: string;
      checked: boolean;
    }
    
    export interface PropertyValueFilterModal2PresenterProps {
      isAllChecked: boolean;
      toggleAllChecked: () => void;
      searchKeyword: string;
      handleSearchKeyword: (keyword: string) => void;
      backToModal1: () => void;
      closeModal: () => void;
      optionList: IPropertyValue[];
      toggleOption: (value: string) => void;
      isFetching: IsFetching;
      infiniteNext: () => void;
      infiniteHasMore: boolean;
      infiniteSkip: number;
      selectedProductProperty: IProductProperty;
      createFilterInfo: () => void;
    }
    
    export const PropertyValueFilterModal2Presenter: FC<PropertyValueFilterModal2PresenterProps> = ({
      isAllChecked,
      toggleAllChecked,
      searchKeyword,
      handleSearchKeyword,
      backToModal1,
      closeModal,
      optionList,
      toggleOption,
      isFetching,
      infiniteNext,
      infiniteHasMore,
      infiniteSkip,
      selectedProductProperty,
      createFilterInfo,
    }: PropertyValueFilterModal2PresenterProps) => {
      const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        if (typeof keyword === 'string') handleSearchKeyword(keyword);
      };
    
      const saveFilter = () => {
        createFilterInfo();
        closeModal();
      };
    
      const isNoData = useMemo(() => optionList.length === 0 && !isFetching, [optionList, isFetching]);
    
      const isAnyChecked = useMemo(() => optionList.some((option) => option.checked === true), [optionList]);
    
      return (
        <React.Fragment>
          <Backdrop handleClick={closeModal} />
          <StyledLayout>
            <div className="top">
              <StyledBackButton onClick={backToModal1}>
                <FontIcon name="ic-arrow-left" size="16px" />
                <div>{selectedProductProperty.name}</div>
              </StyledBackButton>
            </div>
            <StyledSearch>
              <div className="search-input">
                <FontIcon name="ic-search" size="16px" />
                <input
                  data-testid="search-text"
                  type="text"
                  name="keyword"
                  placeholder="검색"
                  autoComplete="off"
                  onChange={handleInput}
                />
              </div>
            </StyledSearch>
            <InfiniteScroll
              next={infiniteNext}
              hasMore={infiniteHasMore}
              dataLength={infiniteSkip}
              height={220}
              loader={<BGLoadingSpinner isLoading={isFetching} />}
            >
              <StyledModalOption>
                {optionList.length > 0 && (
                  <div className="row" data-testid="check-all-button" onClick={toggleAllChecked}>
                    <BGCheckbox checked={isAllChecked} size={20} style={{ marginRight: '0.5em' }} />
                    <div className="label">
                      {searchKeyword
                        ? i18next.t('"{{keyword}}"을 포함한 모든 속성', { keyword: searchKeyword })
                        : i18next.t('모든 속성')}
                    </div>
                  </div>
                )}
    
                {optionList.map((option) => (
                  <div
                    data-testid={`option-${option.value}`}
                    className="row"
                    key={option.value}
                    onClick={() => toggleOption(option.value)}
                  >
                    <BGCheckbox checked={option.checked} size={20} style={{ marginRight: '0.5em' }} />
                    <div className="label">
                      <BGTooltip title={option.value} placement="right">
                        <div className="tooltip">{option.value}</div>
                      </BGTooltip>
                    </div>
                  </div>
                ))}
                {isNoData && searchKeyword && (
                  <BGEmpty title={i18next.t('"{{keyword}}"를 포함하는 데이터가 없습니다.', { keyword: searchKeyword })} />
                )}
                {isNoData && !searchKeyword && <BGEmpty title={i18next.t('데이터가 없습니다.')} />}
              </StyledModalOption>
            </InfiniteScroll>
            <BGButtonGroup style={{ justifyContent: 'end', margin: '10px 10px 0 0' }}>
              <BGButton appearance="secondary" label={i18next.t('취소')} onClick={closeModal} />
              <BGButton className="save-button" label={i18next.t('확인')} onClick={saveFilter} isDisabled={!isAnyChecked} />
            </BGButtonGroup>
          </StyledLayout>
        </React.Fragment>
      );
    };
    ```
    
- container
    
    ```tsx
    // container
    
    import React, { FC, useState, useMemo, useEffect, useCallback } from 'react';
    import { cloneDeep, isEqual } from 'lodash';
    import { IPropertyValue, PropertyValueFilterModal2Presenter } from './PropertyValueFilterModal2Presenter';
    import { IFilterNotIn, IFilterNotMatch } from './PropertyValueFilterModal2.interface';
    import { useInfiniteFormattingQuery } from '../../../hooks/useCustomQuery';
    import { EventPropertyApi } from '../../../lib/api/EventProperty';
    import BiginStorage from '../../../services/BiginStorage';
    import { IProductProperty } from '../ProductSelectBox/ProductSelectBox.interface';
    
    interface APIResult {
      eventPropertyValues: { value: string }[];
      more: boolean;
    }
    
    export interface PropertyValueFilterModal2ContainerProps {
      initFilter: IFilterNotIn | IFilterNotMatch | undefined; // 초기 필터 세팅
      handleFilter: (createdFilter: IFilterNotIn | IFilterNotMatch) => void; // 완성된 필터 반환
      backToModal1: () => void;
      closeModal: () => void; // 모달 닫기
      selectedProductProperty: IProductProperty; // {id: 'event_seg_...', 'name': '상품 이름'}
      testOptionData?: IPropertyValue[]; // 테스트
      testSearchKeyword?: string; // 테스트
    }
    
    export const PropertyValueFilterModal2Container: FC<PropertyValueFilterModal2ContainerProps> = ({
      initFilter,
      handleFilter,
      backToModal1,
      closeModal,
      selectedProductProperty,
      testOptionData,
      testSearchKeyword,
    }: PropertyValueFilterModal2ContainerProps) => {
      const [searchKeyword, setSearchKeyword] = useState<string>(testSearchKeyword || '');
      const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
      const [optionList, setOptionList] = useState<IPropertyValue[]>(testOptionData || []);
      const [checkedPropertyValueList, setCheckedPropertyValueList] = useState<string[]>([]);
    
      // ====================================== ~를 포함한 모든 속성 선택 관리(searchKeyword + isAllChecked) =====================================
      const handleSearchKeyword = (keyword: string) => {
        if (testSearchKeyword) return;
        setSearchKeyword(keyword);
      };
      useEffect(() => {
        setIsAllChecked(false);
      }, [searchKeyword]);
    
      // ====================================== 체크된 속성 값 handler =======================================
      const addCheckedPropertyValue = (value: string) => {
        const shallowCopiedList = [...checkedPropertyValueList];
        shallowCopiedList.push(value);
        setCheckedPropertyValueList(shallowCopiedList);
      };
      const removeCheckedPropertyValue = (value: string) => {
        const filteredList = checkedPropertyValueList.filter((item) => item !== value);
        setCheckedPropertyValueList(filteredList);
      };
    
      // ====================================== select 옵션 handler ========================================================
      const toggleOption = (value: string) => {
        const deepCopied = cloneDeep(optionList);
        const index = deepCopied.findIndex((item) => item.value === value);
        const isChecked = !deepCopied[index].checked;
    
        deepCopied[index].checked = isChecked;
        setOptionList(deepCopied);
    
        // checkedPropertyValue 업데이트
        if (isChecked) addCheckedPropertyValue(deepCopied[index].value);
        else removeCheckedPropertyValue(deepCopied[index].value);
    
        // all checked
        const allChecked = deepCopied.every((item) => item.checked === true);
        if (allChecked) setIsAllChecked(true);
        else setIsAllChecked(false);
      };
    
      // ====================================== 모든 속성 선택 handler =====================================
      const toggleAllChecked = useCallback(() => {
        const isChecked = !isAllChecked;
        if (isChecked) {
          // 전체 선택
          const deepCopied = cloneDeep(optionList);
          const updatedList = deepCopied.map((item) => ({ ...item, checked: isChecked }));
          setOptionList(updatedList);
          setCheckedPropertyValueList(deepCopied.map((item) => item.value));
        } else {
          // 전체 초기화
          const deepCopied = cloneDeep(optionList);
          const updatedList = deepCopied.map((item) => ({ ...item, checked: isChecked }));
          setOptionList(updatedList);
          setCheckedPropertyValueList([]);
        }
        setIsAllChecked(isChecked);
      }, [isAllChecked, optionList]);
    
      // ======================================infinite scroll ========================================================
      const limit = 5;
      const projectID = useMemo(() => BiginStorage.selectedProject?.id, []);
      const queryOptions = useMemo(
        () => ({ enabled: Boolean(projectID), refetchOnWindowFocus: false, cacheTime: 0, retry: false }),
        [],
      );
    
      // skip
      const [skip, setSkip] = useState<number>(0);
      const updateSkip = useCallback(() => {
        setSkip(optionList.length);
      }, [optionList]);
    
      useEffect(() => {
        updateSkip();
      }, [optionList]);
    
      const query = useMemo(() => {
        const basicQuery = {
          application: projectID,
          name: selectedProductProperty.id,
        };
    
        const keywordQuery = {
          application: projectID,
          name: selectedProductProperty.id,
          searchText: searchKeyword,
        };
        return searchKeyword === '' ? basicQuery : keywordQuery;
      }, [projectID, searchKeyword, selectedProductProperty.id]);
    
      // api 결과 formatting
      const formattingResult = useCallback(
        (result: APIResult | undefined): IPropertyValue[] => {
          if (!result) return [];
          const list = result.eventPropertyValues.map((apiResultObj) => {
            const isPrevChecked = !!checkedPropertyValueList.find((value) => value === apiResultObj.value);
            return { ...apiResultObj, checked: isAllChecked || isPrevChecked };
          });
          return list;
        },
        [checkedPropertyValueList],
      );
    
      // api 요청
      const { data: newPropertyValueList, isFetching, refetch, fetchNextPage, hasNextPage } = useInfiniteFormattingQuery(
        ['propertyValueList', searchKeyword],
        ({ pageParam = 0 }) =>
          EventPropertyApi.findEventPropValue({
            query,
            limit,
            skip: pageParam,
          }),
    
        {
          ...queryOptions,
          getNextPageParam: () => {
            return skip ?? false;
          },
        },
        formattingResult,
      );
    
      // update
      useEffect(() => {
        if (testOptionData) return;
        if (newPropertyValueList) setOptionList(newPropertyValueList);
      }, [newPropertyValueList]);
    
      const loadMore = useCallback(() => fetchNextPage(), [fetchNextPage]);
    
      useEffect(() => {
        refetch();
        setSkip(0);
      }, [searchKeyword]);
    
      // ====================================== make filter result ========================================================
      const createFilterInfo = () => {
        // 부모 컴포넌트로 선택 정보 전달
        const is모든속성 = isAllChecked && !searchKeyword;
        const is문자열포함한모든속성 = isAllChecked && searchKeyword;
    
        if (is모든속성) {
          const createdFilterInfo: IFilterNotMatch = {
            dimension: selectedProductProperty.id,
            type: 'notMatch',
            value: '.*',
          };
          handleFilter(createdFilterInfo);
        } else if (is문자열포함한모든속성) {
          const createdFilterInfo: IFilterNotMatch = {
            dimension: selectedProductProperty.id,
            type: 'notMatch',
            value: searchKeyword,
          };
          handleFilter(createdFilterInfo);
        } else {
          // is직접선택 = !isAllChecked;
          const createdFilterInfo: IFilterNotIn = {
            dimension: selectedProductProperty.id,
            type: 'not in',
            value: checkedPropertyValueList,
          };
          handleFilter(createdFilterInfo);
        }
      };
    
      // init filter
      useEffect(() => {
        if (!initFilter) return;
        if (initFilter.dimension !== selectedProductProperty.id) return;
        switch (initFilter.type) {
          default:
          case 'not in': // 개별 선택
            if (isAllChecked === true) toggleAllChecked();
            if (!isEqual(initFilter.value, checkedPropertyValueList)) setCheckedPropertyValueList(initFilter.value);
            break;
          case 'notMatch': // 모두 선택
            if (isAllChecked === false) toggleAllChecked();
            if (initFilter.value === '.*' && searchKeyword !== '') handleSearchKeyword('');
            else if (initFilter.value !== '.*') handleSearchKeyword(initFilter.value);
            break;
        }
      }, [initFilter]);
    
      return (
        <PropertyValueFilterModal2Presenter
          isAllChecked={isAllChecked}
          toggleAllChecked={toggleAllChecked}
          searchKeyword={searchKeyword}
          handleSearchKeyword={handleSearchKeyword}
          backToModal1={backToModal1}
          closeModal={closeModal}
          optionList={optionList}
          toggleOption={toggleOption}
          isFetching={isFetching}
          infiniteNext={loadMore}
          infiniteHasMore={!!hasNextPage}
          infiniteSkip={skip}
          selectedProductProperty={selectedProductProperty}
          createFilterInfo={createFilterInfo}
        />
      );
    };
    ```
    
- test
    
    ```tsx
    // test
    
    import React from 'react';
    import { render, fireEvent } from '@testing-library/react';
    import { ThemeProvider } from '@emotion/react';
    import { QueryClient, QueryClientProvider } from 'react-query';
    
    import { lightTheme } from '../../../Theme';
    import { PropertyValueFilterModal2Container } from './PropertyValueFilterModal2Container';
    import { EventPropertyApi } from '../../../lib/api/EventProperty';
    import { IFilterNotIn, IFilterNotMatch } from './PropertyValueFilterModal2.interface';
    
    // 상품 ID
    const idSelectOne: IFilterNotIn = { dimension: 'event_seg_productIds', type: 'not in', value: ['P54321'] };
    const idSelectAll: IFilterNotMatch = { dimension: 'event_seg_productIds', type: 'notMatch', value: '.*' };
    const idIncludeAllByKeywords: IFilterNotMatch = {
      dimension: 'event_seg_productIds',
      type: 'notMatch',
      value: 'P12345',
    };
    
    // 상품 이름
    const nameSelectOne: IFilterNotIn = { dimension: 'event_seg_productNames', type: 'not in', value: ['샘플상품 1'] };
    const nameSelectAll: IFilterNotMatch = { dimension: 'event_seg_productNames', type: 'notMatch', value: '.*' };
    const nameIncludeAllByKeywords: IFilterNotMatch = {
      dimension: 'event_seg_productNames',
      type: 'notMatch',
      value: '상품',
    };
    
    // 상품 카테고리
    const categorySelectOne: IFilterNotIn = {
      dimension: 'event_seg_productCategories',
      type: 'not in',
      value: ['남성', '29', '33'],
    };
    const categorySelectAll: IFilterNotMatch = { dimension: 'event_seg_productCategories', type: 'notMatch', value: '.*' };
    const categoryIncludeAllByKeywords: IFilterNotMatch = {
      dimension: 'event_seg_productCategories',
      type: 'notMatch',
      value: '남성',
    };
    
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    // [대분류] 테스트 대상
    describe('PropertyValueFilterModal2Container', () => {
      // local storage mock
      const localStorageMock = (() => {
        return {
          getItem() {
            return '{"id": "test"}';
          },
        };
      })();
      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
      const queryClient = new QueryClient();
      const backToModal1TestFn = jest.fn();
      const closeModalTestFn = jest.fn();
      const handleFilterTestFn = jest.fn();
    
      // [중분류] 특정 상황, 상태
      describe('상품 이름 테스트', () => {
        const selectedProductProperty = { id: 'event_seg_productNames', name: '상품 이름' };
        // api mock
        const mock = jest.spyOn(EventPropertyApi, 'findEventPropValue');
        mock.mockImplementation(() =>
          Promise.resolve({
            eventPropertyValues: [
              { value: '샘플상품 1' },
              { value: '샘플상품2' },
              { value: 'BlueJean' },
              { value: '샘플상품 2' },
              { value: 'BlueJean2' },
            ],
            more: true,
          }),
        );
    
        const testOptionData = [
          { value: '샘플상품 1', checked: false },
          { value: '샘플상품2', checked: false },
          { value: 'BlueJean', checked: false },
          { value: '샘플상품 2', checked: false },
          { value: 'BlueJean2', checked: false },
        ];
    
        // [소분류] 구체적 기능
        it('1. 하나의 속성 선택', () => {
          const { getByTestId, getAllByTestId } = render(
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={lightTheme}>
                <PropertyValueFilterModal2Container
                  initFilter={undefined}
                  backToModal1={backToModal1TestFn}
                  closeModal={closeModalTestFn}
                  handleFilter={handleFilterTestFn}
                  selectedProductProperty={selectedProductProperty}
                  testOptionData={testOptionData} // test 코드에서만 사용
                />
              </ThemeProvider>
            </QueryClientProvider>,
          );
    
          expect(mock).toHaveBeenCalled();
    
          // 하나의 속성 값 버튼 클릭
          const checkAllButton = getByTestId('option-샘플상품 1');
          fireEvent.click(checkAllButton);
    
          // 확인 버튼 클릭
          const buttonList = getAllByTestId('bg-button');
          const saveFilterButton = buttonList.find((button) => button.classList.contains('save-button'));
          if (saveFilterButton) fireEvent.click(saveFilterButton);
    
          expect(handleFilterTestFn).toHaveBeenCalled();
          expect(handleFilterTestFn).toHaveBeenCalledWith(nameSelectOne);
        });
    
        // [소분류] 구체적 기능
        it('2. 모든 속성 선택', async () => {
          const { getByTestId, getAllByTestId } = render(
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={lightTheme}>
                <PropertyValueFilterModal2Container
                  initFilter={undefined}
                  backToModal1={backToModal1TestFn}
                  closeModal={closeModalTestFn}
                  handleFilter={handleFilterTestFn}
                  selectedProductProperty={selectedProductProperty}
                  testOptionData={testOptionData} // test 코드에서만 사용
                />
              </ThemeProvider>
            </QueryClientProvider>,
          );
    
          expect(mock).toHaveBeenCalled();
    
          // 모든 속성 버튼 클릭
          const checkAllButton = getByTestId('check-all-button');
          fireEvent.click(checkAllButton);
    
          // 확인 버튼 클릭
          const buttonList = getAllByTestId('bg-button');
          const saveFilterButton = buttonList.find((button) => button.classList.contains('save-button'));
          if (saveFilterButton) fireEvent.click(saveFilterButton);
    
          expect(handleFilterTestFn).toHaveBeenCalled();
          expect(handleFilterTestFn).toHaveBeenCalledWith(nameSelectAll);
        });
    
        // [소분류] 구체적 기능
        it('3. ~를 포함한 모든 속성 선택', async () => {
          const { getByTestId, getAllByTestId } = render(
            <QueryClientProvider client={queryClient}>
              <ThemeProvider theme={lightTheme}>
                <PropertyValueFilterModal2Container
                  initFilter={undefined}
                  backToModal1={backToModal1TestFn}
                  closeModal={closeModalTestFn}
                  handleFilter={handleFilterTestFn}
                  selectedProductProperty={selectedProductProperty}
                  testOptionData={testOptionData} // test 코드에서만 사용
                  testSearchKeyword="상품" // test 코드에서만 사용
                />
              </ThemeProvider>
            </QueryClientProvider>,
          );
    
          expect(mock).toHaveBeenCalledTimes(1);
    
          // 모든 속성 버튼 클릭
          const checkAllButton = getByTestId('check-all-button');
          fireEvent.click(checkAllButton);
    
          // 확인 버튼 클릭
          const buttonList = getAllByTestId('bg-button');
          const saveFilterButton = buttonList.find((button) => button.classList.contains('save-button'));
          if (saveFilterButton) fireEvent.click(saveFilterButton);
    
          expect(handleFilterTestFn).toHaveBeenCalled();
          expect(handleFilterTestFn).toHaveBeenCalledWith(nameIncludeAllByKeywords);
        });
      });
    });
    ```
    

## 해당 코드의 아쉬운 점

- 상태 간의 사이드 이펙트 발생 → 예외처리 추가 → 코드 가독성 저하 및 유지보수가 어려워짐
    - 예시:
        - DB에 저장된 필터 설정을 불러온다
            - → isAllChecked 업데이트
            - → checkedPropertyValueList 업데이트
            - → searchKeyword 업데이트
        - searchKeyword 업데이트
            - → skip = 0
            - → API refetch→ optionList 업데이트 → skip 업데이트
            - → isAllChecked = false
    - 자주 만나게 될 에러: "Error: Too many re-renders. React limits the number of renders to prevent an infinite loop."
- 코드를 읽고 싶지가 않다.

# #2 액션을 정의 했을 때

## 유한 오토마타

## 기타 라이브러리에서의 상태 관리

- Redux
    - reducer
- Recoil
    - action

## SOLID 중에  S: 단일 책임 원칙

- 하나의 컴포넌트는 하나의 책임만 가진다.
- 컴포넌트 하나가 블랙박스의 역할
- 컴포넌트 내부의 상태는 컴포넌트가 책임진다
- 그래서 전역으로 상태 관리하지는 않는다.
- 내부에서 액션으로 상태를 관리하기 위한 방법은 아래와 같다.

## useReducer를 사용하여 상태 관리

- 하나의 상태 정의
    
    ```tsx
    interface State {
      searchKeyword: string;
      isAllChecked: boolean;
      optionList: IPropertyValue[];
      checkedPropertyValueList: string[];
      infiniteScrollSkip: number;
    }
    
    export const initialState: State = {
      searchKeyword: '',
      isAllChecked: false,
      optionList: [],
      checkedPropertyValueList: [],
      infiniteScrollSkip: 0,
    };
    ```
    
- 액션 정의
    - RESET : 초기화
    - LOAD: 저장된 필터 설정 불러오기
    - TOGGLE_ALL_CHECKED: 모든 속성 선택/해제
    - TOGGLE_REG_EX_ALL_CHECKED: ~를 포함한 모든 속성 선택/해제
    - UPDATE_SEARCH_KEYWORD: 검색어 업데이트
    - TOGGLE_ONE: 하나의 속성 선택/해제
    - UPDATE_OPTION_LIST: 옵션 리스트 업데이트(무한 스크롤 등)
    
    ```tsx
    interface Action {
      type: 'RESET' | 'TOGGLE_ALL_CHECKED' | 'TOGGLE_REG_EX_ALL_CHECKED';
    }
    
    interface LoadAction {
      type: 'LOAD';
      filter: FilterEach | FilterRegEx;
    }
    
    interface UpdateKeywordAction {
      type: 'UPDATE_SEARCH_KEYWORD';
      keyword: string;
    }
    
    interface ToggleOneAction {
      type: 'TOGGLE_ONE';
      key: string;
    }
    
    interface UpdateOptionListAction {
      type: 'UPDATE_OPTION_LIST';
      list: KeyValue[];
    }
    ```
    
- 리듀서 정의
    
    ```tsx
    export const reducer = (
      state: State,
      action: Action | LoadAction | UpdateKeywordAction | ToggleOneAction | UpdateOptionListAction,
    ): State => {
      let newState;
      switch (action.type) {
        default:
        case 'RESET':
          newState = initialState;
          break;
        case 'LOAD':
          newState = load(state, action.filter);
          break;
        case 'TOGGLE_ALL_CHECKED':
          newState = toggleAllChecked(state);
          break;
        case 'TOGGLE_REG_EX_ALL_CHECKED':
          newState = toggleAllChecked(state);
          break;
        case 'TOGGLE_ONE':
          newState = toggleOne(state, action.key);
          break;
        case 'UPDATE_OPTION_LIST':
          newState = updateOptionList(state, action.list);
          break;
        case 'UPDATE_SEARCH_KEYWORD':
          newState = updateKeyword(state, action.keyword);
          break;
      }
      return newState;
    };
    ```
    

- presenter
    
    ```tsx
    // PropertyValueFilterModal2Presenter.tsx
    import React, { FC, useMemo } from 'react';
    import InfiniteScroll from 'react-infinite-scroll-component';
    import { useTranslation } from 'react-i18next';
    import { Backdrop } from '../../Backdrop/Backdrop';
    import { StyledBackButton, StyledLayout, StyledModalOption, StyledSearch } from './PropertyValueFilterModal2.style';
    import { FontIcon } from '../../FontIcon/FontIcon';
    import { BGCheckbox } from '../../BGCheckbox/BGCheckbox';
    import { BGTooltip } from '../../BGTooltip/BGTooltip';
    import { BGLoadingSpinner } from '../../BGLoadingSpinner/BGLoadingSpinner';
    import { BGButtonGroup } from '../../BGButtonGroup/BGButtonGroup';
    import { BGButton } from '../../BGButton/BGButton';
    import { BGEmpty } from '../../BGEmpty/BGEmpty';
    import { IProductProperty } from '../ProductSelectBox/ProductSelectBox.interface';
    import { IPropertyValue } from './PropertyValueFilterModal2.interface';
    
    type IsFetching = boolean;
    
    export interface PropertyValueFilterModal2PresenterProps {
      isAllChecked: boolean;
      toggleAllChecked: () => void;
      toggleRegExAllChecked: () => void;
      searchKeyword: string;
      handleSearchKeyword: (keyword: string) => void;
      backToModal1: () => void;
      closeModal: () => void;
      optionList: IPropertyValue[];
      toggleOption: (value: string) => void;
      isFetching: IsFetching;
      infiniteNext: () => void;
      infiniteHasMore: boolean;
      infiniteSkip: number;
      selectedProductProperty: IProductProperty;
      createFilterInfo: () => void;
    }
    
    export const PropertyValueFilterModal2Presenter: FC<PropertyValueFilterModal2PresenterProps> = ({
      isAllChecked,
      toggleAllChecked,
      toggleRegExAllChecked,
      searchKeyword,
      handleSearchKeyword,
      backToModal1,
      closeModal,
      optionList,
      toggleOption,
      isFetching,
      infiniteNext,
      infiniteHasMore,
      infiniteSkip,
      selectedProductProperty,
      createFilterInfo,
    }: PropertyValueFilterModal2PresenterProps) => {
      const i18next = useTranslation();
      const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        if (typeof keyword === 'string') {
          handleSearchKeyword(keyword);
        }
      };
    
      const saveFilter = () => {
        createFilterInfo();
        closeModal();
      };
    
      const isNoData = useMemo(() => optionList.length === 0 && !isFetching, [optionList, isFetching]);
      const isAnyChecked = useMemo(() => optionList.some((option) => option.checked === true), [optionList]);
    
      return (
        <React.Fragment>
          <Backdrop handleClick={closeModal} />
          <StyledLayout>
            <div className="top">
              <StyledBackButton onClick={backToModal1}>
                <FontIcon name="ic-arrow-left" size="16px" />
                <div>{i18next.t(selectedProductProperty.name)}</div>
              </StyledBackButton>
            </div>
            <StyledSearch>
              <div className="search-input">
                <FontIcon name="ic-search" size="16px" />
                <input
                  data-testid="search-text"
                  type="text"
                  name="keyword"
                  placeholder={i18next.t('검색')}
                  autoComplete="off"
                  value={searchKeyword}
                  onChange={handleInput}
                />
              </div>
            </StyledSearch>
            <InfiniteScroll
              next={infiniteNext}
              hasMore={infiniteHasMore}
              dataLength={infiniteSkip}
              height={220}
              loader={<BGLoadingSpinner isLoading={isFetching} />}
            >
              <StyledModalOption>
                {optionList.length > 0 && !searchKeyword && (
                  <div className="row" data-testid="check-all-button" onClick={toggleAllChecked}>
                    <BGCheckbox checked={isAllChecked} size={20} style={{ marginRight: '0.5em' }} />
                    <div className="label">{i18next.t('모든 속성')}</div>
                  </div>
                )}
    
                {optionList.length > 0 && searchKeyword && (
                  <div className="row" data-testid="check-reg-ex-all-button" onClick={toggleRegExAllChecked}>
                    <BGCheckbox checked={isAllChecked} size={20} style={{ marginRight: '0.5em' }} />
                    <div className="label">{i18next.t('"{{keyword}}"을 포함한 모든 속성', { keyword: searchKeyword })}</div>
                  </div>
                )}
    
                {optionList.map((option) => (
                  <div
                    data-testid={`option-${option.value}`}
                    className="row"
                    key={option.value}
                    onClick={() => toggleOption(option.value)}
                  >
                    <BGCheckbox checked={option.checked} size={20} style={{ marginRight: '0.5em' }} />
                    <BGTooltip title={option.value} placement="right">
                      <div className="label">{option.value}</div>
                    </BGTooltip>
                  </div>
                ))}
                {isNoData && searchKeyword && (
                  <BGEmpty title={i18next.t('"{{keyword}}"를 포함하는 데이터가 없습니다.', { keyword: searchKeyword })} />
                )}
                {isNoData && !searchKeyword && <BGEmpty title={i18next.t('데이터가 없습니다.')} />}
              </StyledModalOption>
            </InfiniteScroll>
            <BGButtonGroup style={{ justifyContent: 'end', margin: '10px 10px 0 0' }}>
              <BGButton appearance="secondary" label={i18next.t('취소')} onClick={closeModal} />
              <BGButton className="save-button" label={i18next.t('확인')} onClick={saveFilter} isDisabled={!isAnyChecked} />
            </BGButtonGroup>
          </StyledLayout>
        </React.Fragment>
      );
    };
    ```
    
- container
    
    ```tsx
    // PropertyValueFilterModal2Container.tsx
    
    import React, { FC, useReducer, useMemo, useEffect, useCallback } from 'react';
    import { PropertyValueFilterModal2Presenter } from './PropertyValueFilterModal2Presenter';
    import { FilterEach, FilterRegEx } from './PropertyValueFilterModal2.interface';
    import { useInfiniteFormattingQuery } from '../../../hooks/useCustomQuery';
    import { EventPropertyApi } from '../../../lib/api/EventProperty';
    import BiginStorage from '../../../services/BiginStorage';
    import { IProductProperty } from '../ProductSelectBox/ProductSelectBox.interface';
    import { reducer, initialState } from './PropertyValueFilterModal2.action';
    import { useDebounce } from '../../../hooks/useDebounce';
    
    interface APIResult {
      eventPropertyValues: { value: string }[];
      more: boolean;
    }
    
    interface Query {
      application: string;
      name: string;
      searchText?: string;
      notFiltered?: boolean;
    }
    
    // api 결과 formatting
    const formattingResult = (result: APIResult | undefined): string[] => {
      if (!result) return [];
      const list = result.eventPropertyValues.map((apiResultObj) => {
        return apiResultObj.value;
      });
      return list;
    };
    
    export interface PropertyValueFilterModal2ContainerProps {
      initFilter: FilterEach | FilterRegEx | undefined; // 초기 필터 세팅
      handleFilter: (createdFilter: FilterEach | FilterRegEx) => void; // 완성된 필터 반환
      backToModal1: () => void;
      closeModal: () => void; // 모달 닫기
      selectedProductProperty: IProductProperty; // {id: 'event_seg_...', 'name': '상품 이름'}
      notFiltered?: boolean;
    }
    
    export const PropertyValueFilterModal2Container: FC<PropertyValueFilterModal2ContainerProps> = ({
      initFilter,
      handleFilter,
      backToModal1,
      closeModal,
      selectedProductProperty,
      notFiltered = false,
    }: PropertyValueFilterModal2ContainerProps) => {
      const [state, dispatch] = useReducer(reducer, initialState);
      const debouncedSearchKeyword = useDebounce(state.searchKeyword, 1000);
    
      const toggleAllChecked = () => {
        dispatch({ type: 'TOGGLE_ALL_CHECKED' });
      };
    
      const toggleRegExAllChecked = () => {
        dispatch({ type: 'TOGGLE_REG_EX_ALL_CHECKED' });
      };
    
      const handleSearchKeyword = (keyword: string) => {
        dispatch({ type: 'UPDATE_SEARCH_KEYWORD', keyword });
      };
    
      const toggleOption = (value: string) => {
        dispatch({ type: 'TOGGLE_ONE', value });
      };
    
      // ======================================infinite scroll ========================================================
      const limit = 5;
      const projectID = useMemo(() => BiginStorage.selectedProject?.id, []);
      const queryOptions = useMemo(
        () => ({ enabled: Boolean(projectID), refetchOnWindowFocus: false, cacheTime: 0, retry: false }),
        [],
      );
      const query = useMemo(() => {
        const basicQuery: Query = {
          application: projectID,
          name: selectedProductProperty.id,
          notFiltered,
        };
        const finalQuery = basicQuery;
        if (debouncedSearchKeyword) finalQuery.searchText = debouncedSearchKeyword;
        return finalQuery;
      }, [projectID, debouncedSearchKeyword, selectedProductProperty.id]);
    
      // api 요청
      const { data: newPropertyValueList, isFetching, fetchNextPage, hasNextPage } = useInfiniteFormattingQuery(
        ['propertyValueList', debouncedSearchKeyword],
        ({ pageParam = 0 }) => {
          return EventPropertyApi.findEventPropValue({
            query,
            limit,
            skip: pageParam,
          });
        },
        {
          ...queryOptions,
          getNextPageParam: () => {
            return state.infiniteScrollSkip ?? false;
          },
        },
        formattingResult,
      );
    
      // add option list
      useEffect(() => {
        if (newPropertyValueList.length > 0) dispatch({ type: 'UPDATE_OPTION_LIST', list: newPropertyValueList });
      }, [newPropertyValueList]);
    
      const loadMore = useCallback(() => fetchNextPage(), [fetchNextPage]);
    
    // ====================================== make filter result ========================================================
      const createFilterInfo = () => {
        // 부모 컴포넌트로 선택 정보 전달
        const isAll = state.isAllChecked && !state.searchKeyword;
        const isRegEx = state.isAllChecked && state.searchKeyword;
    
        if (isAll) {
          const createdFilterInfo: FilterEach | FilterRegEx = {
            dimension: selectedProductProperty.id,
            regex: '.*',
          };
          handleFilter(createdFilterInfo);
        } else if (isRegEx) {
          const createdFilterInfo: FilterEach | FilterRegEx = {
            dimension: selectedProductProperty.id,
            regex: state.searchKeyword,
          };
          // createdFilterInfo.value = productIDList
          handleFilter(createdFilterInfo);
        } else {
          // 개별 선택
          const createdFilterInfo: FilterEach | FilterRegEx = {
            dimension: selectedProductProperty.id,
            value: state.checkedPropertyValueList,
          };
          handleFilter(createdFilterInfo);
        }
      };
    
      // // init filter
      useEffect(() => {
        if (!initFilter) return;
        if (initFilter.dimension !== selectedProductProperty.id) return;
        dispatch({ type: 'LOAD', filter: initFilter });
      }, [initFilter]);
    
      return (
        <PropertyValueFilterModal2Presenter
          isAllChecked={state.isAllChecked}
          toggleAllChecked={toggleAllChecked}
          toggleRegExAllChecked={toggleRegExAllChecked}
          searchKeyword={state.searchKeyword}
          handleSearchKeyword={handleSearchKeyword}
          backToModal1={backToModal1}
          closeModal={closeModal}
          optionList={state.optionList}
          toggleOption={toggleOption}
          isFetching={isFetching}
          infiniteNext={loadMore}
          infiniteHasMore={!!hasNextPage}
          infiniteSkip={state.infiniteScrollSkip}
          selectedProductProperty={selectedProductProperty}
          createFilterInfo={createFilterInfo}
        />
      );
    };
    ```
    
- action
    
    ```tsx
    import { cloneDeep } from 'lodash';
    import { FilterEach, FilterRegEx, IPropertyValue } from './PropertyValueFilterModal2.interface';
    
    interface State {
      searchKeyword: string;
      isAllChecked: boolean;
      optionList: IPropertyValue[];
      checkedPropertyValueList: string[];
      infiniteScrollSkip: number;
    }
    
    export const initialState: State = {
      searchKeyword: '',
      isAllChecked: false,
      optionList: [],
      checkedPropertyValueList: [],
      infiniteScrollSkip: 0,
    };
    
    interface Action {
      type: 'RESET' | 'TOGGLE_ALL_CHECKED' | 'TOGGLE_REG_EX_ALL_CHECKED';
    }
    
    interface LoadAction {
      type: 'LOAD';
      filter: FilterEach | FilterRegEx;
    }
    
    interface UpdateKeywordAction {
      type: 'UPDATE_SEARCH_KEYWORD';
      keyword: string;
    }
    
    interface ToggleOneAction {
      type: 'TOGGLE_ONE';
      value: string;
    }
    
    interface AddOptionListAction {
      type: 'UPDATE_OPTION_LIST';
      list: string[];
    }
    
    // action Functions
    const load = (state: State, filter: FilterEach | FilterRegEx) => {
      const newState = cloneDeep(state);
    
      // 정규식
      if ('regex' in filter) {
        newState.isAllChecked = true;
        newState.searchKeyword = filter.regex === '.*' ? '' : filter.regex;
      } else {
        // 개별 선택
        newState.isAllChecked = false;
        if (filter.value) newState.checkedPropertyValueList = filter.value;
      }
    
      return newState;
    };
    
    const toggleAllChecked = (state: State) => {
      const newState = cloneDeep(state);
      const isChecked = !state.isAllChecked;
      newState.isAllChecked = isChecked;
      newState.optionList = state.optionList.map((option) => ({ ...option, checked: isChecked }));
      if (isChecked) {
        newState.checkedPropertyValueList = state.optionList.map((option) => option.value);
      } else {
        newState.checkedPropertyValueList = [];
      }
      return newState;
    };
    
    const updateKeyword = (state: State, keyword: string) => {
      const newState = cloneDeep(state);
      newState.searchKeyword = keyword;
      newState.isAllChecked = false;
      newState.infiniteScrollSkip = 0;
      newState.checkedPropertyValueList = [];
      newState.optionList = [];
      return newState;
    };
    
    const toggleOne = (state: State, value: string) => {
      const newState = cloneDeep(state);
      const index = state.optionList.findIndex((option) => option.value === value);
      const isChecked = !state.optionList[index].checked;
    
      // optionList
      newState.optionList[index].checked = isChecked;
    
      // checkedPropertyValueList
      // - add
      if (isChecked) newState.checkedPropertyValueList.push(value);
      else {
        // - remove
        const isPrevAllChecked = state.isAllChecked;
        if (isPrevAllChecked) {
          const allList = state.optionList.map((option) => option.value);
          newState.checkedPropertyValueList = allList.filter((item) => item !== value);
        } else {
          newState.checkedPropertyValueList = state.checkedPropertyValueList.filter((item) => item !== value);
        }
      }
    
      // isAllChecked
      if (newState.optionList.every((option) => option.checked === true)) {
        newState.isAllChecked = true;
      } else {
        newState.isAllChecked = false;
      }
      return newState;
    };
    
    const updateOptionList = (state: State, newList: string[]) => {
      const newState = cloneDeep(state);
      const newOptionList = newList.map((value) => {
        const isPrevChecked = state.checkedPropertyValueList.includes(value);
        return { value, checked: state.isAllChecked || isPrevChecked };
      });
      newState.optionList = newOptionList;
      newState.infiniteScrollSkip = newOptionList.length;
      return newState;
    };
    
    // reducer
    export const reducer = (
      state: State,
      action: Action | LoadAction | UpdateKeywordAction | ToggleOneAction | AddOptionListAction,
    ): State => {
      switch (action.type) {
        default:
        case 'RESET':
          return initialState;
        case 'LOAD':
          return load(state, action.filter);
        case 'TOGGLE_ALL_CHECKED':
          return toggleAllChecked(state);
        case 'TOGGLE_REG_EX_ALL_CHECKED':
          return toggleAllChecked(state);
        case 'TOGGLE_ONE':
          return toggleOne(state, action.value);
        case 'UPDATE_OPTION_LIST':
          return updateOptionList(state, action.list);
        case 'UPDATE_SEARCH_KEYWORD':
          return updateKeyword(state, action.keyword);
      }
    };
    ```
    

- <ProductSelectBox/> 접기
    
    ```tsx
    //action
    
    import { IFilterNotIn, IFilterNotMatch } from '../PropertyValueFilterModal2/PropertyValueFilterModal2.interface';
    import { IProductProperty, productPropertyList } from './ProductSelectBox.interface';
    
    export interface State {
      text: string;
      isModal1Open: boolean;
      isModal2Open: boolean;
      selectedProductProperty: IProductProperty;
    }
    export interface Action {
      type: 'RESET' | 'OPEN_MODAL1' | 'BACK_TO_MODAL1' | 'CLOSE';
    }
    export interface OpenModal2Action {
      type: 'OPEN_MODAL2';
      selectedProductProperty: IProductProperty;
    }
    export interface LoadAction {
      type: 'LOAD';
      propertyValueFilter: IFilterNotIn | IFilterNotMatch;
    }
    export const initialState: State = {
      text: '',
      isModal1Open: false,
      isModal2Open: false,
      selectedProductProperty: productPropertyList[0],
    };
    const getSelectBoxText = (propertyValueFilter: IFilterNotIn | IFilterNotMatch) => {
      const selectedProductProperty =
        productPropertyList.find((property) => property.id === propertyValueFilter.dimension) || productPropertyList[0];
    
      const is개별선택1개 = propertyValueFilter.type === 'not in' && propertyValueFilter.value.length === 1;
      const is개별선택2개이상 = propertyValueFilter.type === 'not in' && propertyValueFilter.value.length > 1;
      const is모든속성선택 = propertyValueFilter.type === 'notMatch' && propertyValueFilter.value === '.*';
      const is문자열포함한모든속성선택 = propertyValueFilter.type === 'notMatch' && propertyValueFilter.value !== '.*';
    
      if (is개별선택1개) {
        return `${selectedProductProperty.name}: ${propertyValueFilter.value[0]}`;
      }
    
      if (is개별선택2개이상) {
        return `${selectedProductProperty.name}: ${propertyValueFilter.value[0]} 외 ${
          propertyValueFilter.value.length - 1
        }개`;
      }
    
      if (is모든속성선택) {
        return `${selectedProductProperty.name}: 모든 속성`;
      }
    
      if (is문자열포함한모든속성선택) {
        return `${selectedProductProperty.name}: "${propertyValueFilter.value}"을 포함한 모든 속성`;
      }
      return '';
    };
    const filterMapper = (state: State, propertyValueFilter: IFilterNotIn | IFilterNotMatch): State => {
      const text = getSelectBoxText(propertyValueFilter);
      const selectedProductProperty =
        productPropertyList.find((property) => property.id === propertyValueFilter.dimension) || productPropertyList[0];
      return { ...state, text, selectedProductProperty };
    };
    export const reducer = (state: State, action: Action | OpenModal2Action | LoadAction): State => {
      switch (action.type) {
        default:
        case 'RESET':
          return initialState;
        case 'LOAD':
          return filterMapper(state, action.propertyValueFilter);
        case 'OPEN_MODAL1':
          return { ...state, isModal1Open: true };
        case 'OPEN_MODAL2':
          return {
            ...state,
            isModal1Open: false,
            isModal2Open: true,
            selectedProductProperty: action.selectedProductProperty,
          };
        case 'BACK_TO_MODAL1':
          return { ...state, isModal1Open: true, isModal2Open: false };
        case 'CLOSE':
          return { ...state, isModal1Open: false, isModal2Open: false };
      }
    };
    ```
    
    ```tsx
    // component
    
    import React, { FC, useEffect, useReducer } from 'react';
    import { IProductProperty, productPropertyList } from './ProductSelectBox.interface';
    import { IFilterNotIn, IFilterNotMatch } from '../PropertyValueFilterModal2/PropertyValueFilterModal2.interface';
    import { PropertyValueFilterModal2Container } from '../PropertyValueFilterModal2/PropertyValueFilterModal2Container';
    import { StyledSelectBox, StyledModalLayout, StyledRow } from './ProductSelectBox.style';
    import { FontIcon } from '../../FontIcon/FontIcon';
    import { Backdrop } from '../../Backdrop/Backdrop';
    import { reducer, initialState } from './ProductSelectBox.action';
    
    export interface ProductSelectBoxProps {
      propertyValueFilter: IFilterNotIn | IFilterNotMatch | undefined;
      handlePropertyValueFilter: (createdFilter: IFilterNotIn | IFilterNotMatch) => void; // 완성된 필터 반환
    }
    export const ProductSelectBox: FC<ProductSelectBoxProps> = ({
      propertyValueFilter,
      handlePropertyValueFilter,
    }: ProductSelectBoxProps) => {
      const [state, dispatch] = useReducer(reducer, initialState);
    
      const openModal1 = () => {
        dispatch({ type: 'OPEN_MODAL1' });
      };
    
      const backToModal1 = () => {
        dispatch({ type: 'BACK_TO_MODAL1' });
      };
    
      const closeModal = () => {
        dispatch({ type: 'CLOSE' });
      };
    
      const openModal2 = (property: IProductProperty) => {
        dispatch({ type: 'OPEN_MODAL2', selectedProductProperty: property });
      };
    
      useEffect(() => {
        if (!propertyValueFilter) return;
        dispatch({ type: 'LOAD', propertyValueFilter });
      }, [propertyValueFilter]);
    
      return (
        <div style={{ position: 'relative' }}>
          <StyledSelectBox onClick={openModal1}>
            <div className="text">{state.text || state.selectedProductProperty.name}</div>
            <FontIcon name="ic-arrow-down" size="20px" />
          </StyledSelectBox>
          {state.isModal1Open && (
            <React.Fragment>
              <Backdrop handleClick={closeModal} />
              <StyledModalLayout>
                <StyledRow notHover onClick={closeModal}>
                  <div className="text">{state.text || state.selectedProductProperty.name}</div>
                  <FontIcon name="ic-arrow-up" size="20px" />
                </StyledRow>
                {productPropertyList.map((property) => (
                  <StyledRow
                    key={property.id}
                    selected={state.selectedProductProperty.id === property.id}
                    onClick={() => openModal2(property)}
                  >
                    {property.name}
                  </StyledRow>
                ))}
              </StyledModalLayout>
            </React.Fragment>
          )}
    
          {state.isModal2Open && (
            <PropertyValueFilterModal2Container
              initFilter={propertyValueFilter}
              backToModal1={backToModal1}
              closeModal={closeModal}
              handleFilter={handlePropertyValueFilter}
              selectedProductProperty={state.selectedProductProperty}
            />
          )}
        </div>
      );
    };
    ```