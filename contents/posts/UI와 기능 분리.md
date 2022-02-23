---
title: 복잡한 컴포넌트에서 UI와 기능을 분리해보자
author: jangky000
date: 2022.02.19
desc: 협업을 하다보면 남이 짠 코드를 읽고 새로운 기획에 맞게 수정해서 사용하는 경우가 많다. 재사용성을 고려하고 각각의 주요 역할이 잘 분리되어 있는 코드라면 쉽게 수정이 가능할 것이라고 생각한다. 이번 작업에서는 재사용성을 고려하여 UI와 기능을 분리해본 경험을 공유하고자 한다.
---

# ImageUploader라는 컴포넌트가 있었다.

## 문제점

- `ImageUploader`라는 컴포넌트 내부에 `버튼(UI)` + `이미지 파일을 업로드하는 기능`이 있다.
- `ImageUploader`라는 이름에서 이 컴포넌트가 버튼이라는 것을 유추하기 어렵다.
- 같은 기능을 하는 두 가지 스타일의 버튼이 필요한데, 버튼 스타일을 변경하기 어렵다.
- `visualType 변경`, `삭제 버튼의 출력 여부` 등 이미지 업로드 기능과 관련이 적은 다른 기능들이 혼재되어 있다.
- 관심사를 분리하고, 하나의 컴포넌트가 하나의 메인 기능을 담당해야 한다. (단일 책임의 원칙)
    - 스타일 기능 `Button`
    - 이미지 업로드 기능 `ImageUploaderComposition`

# 변경 전

![1](https://user-images.githubusercontent.com/46799722/154789453-c6fea7ef-e4d8-4b2e-8411-04fc7e7eae3e.png)
![2](https://user-images.githubusercontent.com/46799722/154789454-24b0539d-feb8-421a-8982-7b4f137448d0.png)


```tsx
// SmsCreateStep2.tsx

...
<div className="sms-create-item">
  <div className="sms-create-item-header">{i18next.t('이미지')}</div>
  <div className="sms-create-image">
    <div className="sms-create-image-desc">
      <div>* {i18next.t('권장 이미지 사이즈: 320px*480px (모바일 기기 최적화)')}</div>
      <div>* {i18next.t('파일 형식: JPG, JPEG')}</div>
      <div>* {i18next.t('파일 용량: 최대 300kb')}</div>
    </div>
    <ImageUploader
      handleUpload={updateImage(0)}
      index={0}
      endPoint="bizSmsCreate"
      uploadBtnLabel={i18next.t('파일 선택')}
      isExistFile={!!props.material.images[0]?.img_url}
      handleRemove={() => {
        const tempMaterial: SmsMaterial = _.cloneDeep(props.material);
        props.handleUpdate({
          ...tempMaterial,
          images: [],
        });
      }}
    />
  </div>
</div>
...
```

```tsx
// ImageUploader.tsx 
// 하나의 컴포넌트에서 하는 일이 너무 많다.

export interface ImageUploaderProp {
  visualType?: ImageUploaderVisualType;
  handleUpload?: (file: FileInter | Error) => void; // parent material 업데이트
  verify?: (file: File) => Promise<boolean> | undefined;
  image?: string;
  index: number; // id 생성에 사용
  endPoint?: string;
  uploadBtnLabel?: string;
  isValid?: boolean;
  isExistFile?: boolean;
  handleRemove?: () => void;
}

export const ImageUploader = (props: ImageUploaderProp): ReactElement => {
  const i18next = useTranslation();
  const { uploadBtnLabel = '파일 선택' } = props;
  const [loaded, setLoaded] = useState(false);
  const fileInput: React.Ref<HTMLInputElement> = useRef(null);
  const { dialogStore } = useDataStore();

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: null | File = event && event.target && event.target.files && event.target.files[0];
    let isChecked = true;
    if (props.verify) {
      isChecked = (await props.verify(file as File)) as boolean;
    }

    if (isChecked) {
      return FileAPI.uploadImage(file, props.endPoint)
        .then((res) => {
          if (props.handleUpload) props.handleUpload(res.file as FileInter);
          setLoaded(true);
          return Observable.of(res);
        })
        .catch(() => {
          dialogStore.showMessage(i18next.t('알림'), i18next.t('업로드에 실패하였습니다.'));
          if (fileInput.current) {
            fileInput.current.value = '';
          }
        });
    }
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    return isChecked;
  };

  useEffect(() => {
    if (props.image) setLoaded(true);
  }, []);

  return (
    <div className="image-uploader-wrapper" style={{ position: 'relative' }}>
      {(!props.visualType || props.visualType === 'normal') && (
        <div className="normal" css={[normalWrapperStyle]}>
          <label htmlFor={`imageUploader-${props.index}`} css={labelCss}>
            <input
              type="file"
              className="image-uploader-input"
              accept="image/*"
              css={inputCss}
              id={`imageUploader-${props.index}`}
              ref={fileInput}
              onChange={uploadImage}
            />
            {!loaded && (
              <Button
                className={`image-updater-btn ${!props.isValid ? 'invalid' : ''}`}
                onClick={() => setLoaded(!loaded)}
                label={uploadBtnLabel}
              />
            )}
            {loaded && (
              <Button className="image-updater-btn" onClick={() => setLoaded(!loaded)} label={uploadBtnLabel} />
            )}
          </label>
          {props.handleRemove && props.isExistFile && (
            <Button
              style={{ marginLeft: '12px' }}
              label={i18next.t('삭제')}
              appearance="secondary"
              onClick={() => {
                if (props.handleRemove) {
                  props.handleRemove();
                }
              }}
            />
          )}
        </div>
      )}
      {props.visualType === 'small' && (
        <div className={`small ${props.isValid ? '' : 'invalid'}`} css={[smallWrapperStyle]}>
          <label
            htmlFor={`imageUploader-${props.index}`}
            css={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <input
              type="file"
              className="image-uploader-input"
              accept="image/*"
              css={inputCss}
              id={`imageUploader-${props.index}`}
              onChange={(event) => {
                uploadImage(event);
              }}
            />
            {!(loaded && props.image) && (
              <div css={smallButtonCss} className="image-uploader-btn">
                <FontIcon name="ic-img" color="#7e8696" size="20px" />
              </div>
            )}
            {loaded && props.image && <img css={smallImageCss} src={props.image} alt="slide-content" />}
            {!loaded && (
              <Button
                className={`image-updater-btn ${!props.isValid ? 'invalid' : ''}`}
                onClick={() => setLoaded(!loaded)}
                label={i18next.t('업로드')}
              />
            )}
            {loaded && (
              <Button className="image-updater-btn" onClick={() => setLoaded(!loaded)} label={i18next.t('업로드')} />
            )}
          </label>
          {props.handleRemove && props.isExistFile && (
            <Button
              style={{ marginLeft: '8px' }}
              label={i18next.t('이미지 삭제')}
              appearance="secondary"
              onClick={() => {
                if (props.handleRemove) {
                  props.handleRemove();
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

ImageUploader.defaultProps = {
  isValid: true,
};
```

# 변경 후

- 컴포넌트를 다음과 같이 분리
- `이미지 리스트를 관리하는 컴포넌트(SmsInputImageList)`
- `이미지 하나를 관리하는 컴포넌트(InputImageCard, InputImageEmptyCard)`
- `이미지 업로드 기능을 담당하는 컴포넌트(ImageUploaderComposition)`
- `Button`을 `ImageUploaderComposition` 의 children으로 전달하여 업로드 기능을 수행
- \+ 디자인이 조금 수정되었다.

![3](https://user-images.githubusercontent.com/46799722/154789455-b28a31e2-e827-459e-8d9c-da77a3741569.png)
![4](https://user-images.githubusercontent.com/46799722/154789456-acef377a-3590-49b5-99e5-e449c2f67cdf.png)

```tsx
// SmsCreateStep2.tsx

...
<div className="sms-create-item">
  <div className="sms-create-item-header">{i18next.t('이미지')}</div>
  <div className="sms-create-image">
    <div className="sms-create-image-desc">
      <div>* {i18next.t('최대 첨부 가능 이미지 개수: {{count}}개', { count: 3 })}</div>
      <div>* {i18next.t('권장 이미지 사이즈: 320px x 480px (모바일 기기 최적화)')}</div>
      <div>* {i18next.t('파일 형식: JPG, JPEG')}</div>
      <div>* {i18next.t('파일 용량: 이미지 당 300KB')}</div>
    </div>
    <SmsInputImageList
      imageInfoList={images}
      handleImageInfoList={handleImageInfoList}
    />
  </div>
</div>
...
```

```tsx
// InputImageEmptyCard.tsx
// [이미지 썸네일] [파일선택 버튼] UI
export const InputImageEmptyCard: FC<InputImageEmptyCardProps> = ({
  addNewImage,
  fileValidation,
}: InputImageEmptyCardProps) => {
  const i18next = useTranslation();
  return (
    <StyledImageCard>
      <div className="image-card-wrapper">
        <div className="image-card-thumbnail">
          <FontIcon name="ic-img" size="20px" color="#53585f" />
        </div>
        <ImageUploaderComposition
          uploadImageAPIEndPoint="bizSmsCreate"
          handleUpload={addNewImage}
          fileValidation={fileValidation}
        >
          <Button appearance="primary" label={i18next.t('파일 선택')} />
        </ImageUploaderComposition>
      </div>
    </StyledImageCard>
  );
};
```

```tsx
// ImageUploaderComposition.tsx
// 이미지 업로드 기능만 담당
export interface ImageUploaderCompositionProps {
  uploadImageAPIEndPoint: string;
  handleUpload: (file: FileInter | Error) => void;
  fileValidation?: (file: File) => boolean;
  children: React.ReactNode;
}
export const ImageUploaderComposition: FC<ImageUploaderCompositionProps> = ({
  uploadImageAPIEndPoint,
  handleUpload,
  fileValidation,
  children,
}: ImageUploaderCompositionProps) => {
  const i18next = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { dialogStore } = useDataStore();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file === undefined) return;

    // 파일 검증
    const isValid = fileValidation?.(file) && true;
    if (isValid === false) return;

    // 파일 업로드
    try {
      const result = await FileAPI.uploadImage(file, uploadImageAPIEndPoint); //  uploadImageAPIEndPoint: ex) "bizSmsCreate"
      // 부모 컴포넌트에 업로드 성공한 파일 정보 반환
      handleUpload(result.file as FileInter);
    } catch {
      // 업로드 실패
      dialogStore.showMessage(i18next.t('알림'), i18next.t('업로드에 실패하였습니다.'));
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleChildrenClick = () => {
    inputRef?.current?.click();
  };
  return (
    <React.Fragment>
      <input type="file" accept="image/*" ref={inputRef} onChange={handleChange} style={{ display: 'none' }} />
      <div onClick={handleChildrenClick}>{children}</div>
    </React.Fragment>
  );
};
```