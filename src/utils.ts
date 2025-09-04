let globalCookies = "";

// 쿠키 설정 함수 (React/Express에서 호출)
export function setCookies(cookies: string) {
  globalCookies = cookies;
}

// 쿠키 가져오기 함수
export function getCookies(): string {
  // React 환경에서는 document.cookie 사용
  if (typeof document !== "undefined") {
    return document.cookie;
  }
  // Express 환경에서는 전역 저장소 사용
  return globalCookies;
}
