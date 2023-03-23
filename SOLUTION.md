# Describes the solution

- 리소스 등록시 validation은 함수를 분리했습니다.
  - 300~1000ms의 랜덤 딜레이와 성공할 확률 80%는 `controlValidation.ts`에서 확인할 수 있습니다.
  - youtube url은 embed 변경은 `convertUrl.ts`에서 확인할 수 있습니다.
- 리소스 핸들링은 Context API를 사용했습니다.
- 리소스 배열을 로컬 스토리지에 저장하고 뷰어의 리소스 id를 path로 관리해 새로고침 시에도 상태가 보존되도록 했습니다.
- 자세한 작업 히스토리는 이슈와 PR에서 확인해보실 수 있습니다.
