## Kookstery 신비한 상점

### 관련 url
- figma : 
- vercel(client) : 
- vercel(server) :
- supabase

### 로그인 페이지

![로그인 페이지](image.png)

- 모바일/데스크탑 공통 로그인 컴포넌트 구현
- 로그인 성공 시 Home 페이지로 라우팅
- 이메일, 비밀번호 에러 시 입력 필드 아래 경고 메세지 표시
- 그 외 에러 발생 시 Toast 메세지 호출
  - Context & Provider 사용한 Toast 메세지 구현
- 로그인 api 호출 시 서버에서 jwt 토큰을 쿠키에 저장
