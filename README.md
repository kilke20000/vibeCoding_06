# 🚀 LinkStudio: QR코드 생성 & URL 단축 웹 애플리케이션

> **프로젝트 개요 및 기능 명세서 (Project Overview & Specification)**

---

## 📌 1. 프로젝트 개요 (Overview)

**LinkStudio**는 웹사이트 주소(URL)를 손쉽게 관리하고 공유할 수 있도록 돕는 올인원 웹 애플리케이션입니다.  
복잡하고 긴 URL을 간결하게 줄여주는 **URL 단축 기능**과, 오프라인 및 모바일 환경에서 즉시 스캔 가능한 **QR코드 생성 기능**을 하나의 통합 플랫폼으로 제공합니다.

- **개발 대상 경로**: `project06/`
- **핵심 목표**:
  1. 직관적인 허브 페이지를 통한 상호 전환 및 네비게이션 제공
  2. `[url2qr]` 모듈을 통한 고품질 QR코드 실시간 생성 및 이미지 다운로드
  3. `[urlShort]` 모듈을 통한 실시간 OpenAPI 기반 URL 단축, 유효성 검증, 원클릭 복사
  4. 다크 모드 기반의 글래스모피즘(Glassmorphism)과 마우스 인터랙티브 조명 효과를 통한 프리미엄 UX 구현

---

## 📁 2. 디렉토리 구조 (Directory Structure)

```plaintext
project06/
├── index.html            # [메인 허브] QR코드 & URL단축 진입 포털
├── style.css             # 메인 허브 스타일시트 (글래스모피즘, 반응형 레이아웃)
├── script.js             # 메인 허브 인터랙션 (마우스 글로우, 3D 카드 틸트 효과)
├── README.md             # 프로젝트 개요 및 기능 명세서 문서
│
├── url2qr/               # [QR코드 생성 모듈]
│   ├── index.html        # QR코드 생성기 페이지
│   ├── style.css         # QR코드 페이지 스타일시트
│   └── script.js         # QR코드 렌더링 (QRCode.js), 고화질 다운로드 로직
│
└── urlShort/             # [URL 단축 모듈]
    ├── index.html        # URL 단축기 페이지 (입력창, 출력 상자, 복사 버튼)
    ├── style.css         # URL 단축 페이지 스타일시트
    └── script.js         # 실시간 입력 감지(버튼 비활성화), OpenAPI 연동, 클립보드 복사
```

---

## 📋 3. 기능 명세서 (Functional Specification)

### 3.1 메인 포털 페이지 (`index.html`)
| 기능 ID | 요구사항 | 상세 설명 |
| :--- | :--- | :--- |
| **MAIN-01** | **'QR코드' 바로가기 버튼** | 클릭 시 `url2qr/index.html`로 즉시 이동하는 인터랙티브 카드 및 버튼 제공 |
| **MAIN-02** | **'URL단축' 바로가기 버튼** | 클릭 시 `urlShort/index.html`로 즉시 이동하는 인터랙티브 카드 및 버튼 제공 |
| **MAIN-03** | **글로벌 네비게이션** | 상단 네비게이션 바(GNB)를 통해 홈, QR코드, URL단축 간 끊김 없는 이동 |
| **MAIN-04** | **3D 틸트 인터랙션** | 마우스 커서 위치에 반응하는 카드 입체 회전 및 동적 백그라운드 앰비언트 라이트 |

---

### 3.2 QR코드 생성 모듈 (`url2qr/`)
| 기능 ID | 요구사항 | 상세 설명 |
| :--- | :--- | :--- |
| **QR-01** | **실시간 QR 렌더링** | URL 또는 텍스트 입력 후 '생성하기' 클릭 시 고해상도 QR코드 즉시 렌더링 |
| **QR-02** | **자동 스키마 보정** | `http://` 또는 `https://` 누락 시 도메인 주소에 맞게 자동 프로토콜 보정 |
| **QR-03** | **이미지 다운로드** | QR코드 클릭 또는 다운로드 버튼을 통해 **JPG** 및 **PNG** 고해상도 파일로 저장 |
| **QR-04** | **단축 링크 연계 수신** | URL 쿼리 파라미터(`?url=...`) 지원으로 단축된 링크를 즉시 QR코드로 자동 생성 |

---

### 3.3 URL 단축 모듈 (`urlShort/`)
| 기능 ID | 요구사항 | 상세 설명 |
| :--- | :--- | :--- |
| **SHORT-01** | **UI 컴포넌트 구성** | 'URL 입력창', '단축하기 버튼', '읽기 전용 결과 출력 상자', '복사 버튼' 배치 (요구사항 3-1) |
| **SHORT-02** | **단축 버튼 상태 제어** | 입력 필드가 비어있거나 공백일 경우 '단축하기' 버튼을 `disabled`로 비활성화 (요구사항 3-2) |
| **SHORT-03** | **OpenAPI 단축 요청** | '단축하기' 클릭 시 `is.gd`, `TinyURL`, `Spoo.me` 등 OpenAPI에 비동기 단축 요청 후 읽기 전용 상자에 결과 출력 (요구사항 3-3) |
| **SHORT-04** | **원클릭 복사 및 알림** | '복사' 버튼 클릭 시 클립보드에 자동 복사되고 `'복사하였습니다'` 알림창(토스트 및 alert) 표시 (요구사항 3-4) |
| **SHORT-05** | **다중 Fallback 아키텍처** | 네트워크 상태나 CORS 정책 차단 상황에서도 안정적으로 단축 결과를 제공하는 다중 API 연쇄 호출 설계 |
| **SHORT-06** | **최근 단축 히스토리** | 브라우저 `localStorage`를 통해 최근 단축한 5개의 링크 목록 저장 및 재복사/QR변환 지원 |

---

## 🛠️ 4. 기술 스택 및 라이브러리 (Tech Stack)

- **Frontend Core**: HTML5, Vanilla JavaScript (ES6+), Modern CSS3
- **QR Engine**: `qrcode.js` (Client-side QR Code Rendering Engine)
- **API 연동**:
  - `is.gd REST API` (`https://is.gd/create.php?format=json&url=`)
  - `TinyURL API` (`https://tinyurl.com/api-create.php?url=`)
  - `Spoo.me API` (`https://spoo.me/url`)
  - `CleanURI API` (`https://cleanuri.com/api/v1/shorten`)
- **UI/UX Icons & Fonts**: Font Awesome 6.4.2, Google Fonts (Pretendard)

---

## 💡 5. 실행 및 테스트 가이드 (How to Test)

1. **메인 페이지 접속**:
   - `project06/index.html`을 웹 브라우저에서 실행합니다.
   - 'QR코드' 버튼 클릭 시 `project06/url2qr/index.html`로 이동합니다.
   - 'URL단축' 버튼 클릭 시 `project06/urlShort/index.html`로 이동합니다.

2. **URL 단축 기능 검증**:
   - `urlShort/index.html` 접속 시 입력창이 비어있으면 **'단축하기' 버튼이 비활성화**되어 클릭되지 않습니다.
   - URL(예: `https://www.google.com/search?q=antigravity`)을 입력하면 **'단축하기' 버튼이 즉시 활성화**됩니다.
   - '단축하기'를 누르면 로딩 인디케이터와 함께 OpenAPI를 통해 단축 URL(예: `https://is.gd/...`)이 **읽기 전용 상자**에 표시됩니다.
   - **'복사' 버튼**을 클릭하면 클립보드에 복사되며 **'복사하였습니다'** 알림창이 나타납니다.
   - 하단의 **'이 단축 링크로 QR코드 만들기'** 클릭 시 단축된 URL을 가지고 QR코드 생성기로 자동 이동합니다.

3. **QR코드 생성 기능 검증**:
   - `url2qr/index.html`에서 URL을 입력하고 **'생성하기'**를 클릭합니다.
   - 생성된 QR코드를 클릭하거나 **'JPG 다운로드'** / **'PNG 다운로드'** 버튼을 클릭하여 고화질 이미지로 저장합니다.
