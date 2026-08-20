/* ============================================================
   AID+30 작품 전시관 — 데이터 파일 (data/items.js)
   이 파일만 고치면 작품이 추가·수정됩니다. index.html은 건드리지 않습니다.
   상세 규칙: AID30-exhibition-spec.md 6절
============================================================ */


/* ---------- ① SITE — 사이트 기본 정보 ---------- */
const SITE = {
  /* 상단 표시줄 */
  orgName:     "계원예술대학교",
  orgLogo:     "img/logo-kaywon-inv.png",   // 왼쪽 — 계원예술대(수신재) 반전판(어두운 바용). 원본은 img/logo-kaywon.png
  programName: "AI·D 30+ 집중캠프",
  programLogo: "",                      // 이미지 대신 아래 programMark 텍스트 로고를 사용합니다
  /* 오른쪽 상단 텍스트 로고 — 원본 이미지의 텍스트를 반전 색감으로 재구성 */
  programMark: { main: "AI.D", sub1: "30<sup>+</sup>집중캠프", sub2: "INTENSIVE CAMP" },

  /* 히어로 */
  eyebrow:     "재직자 AI디지털 집중과정 · 작품 전시관",
  titleWords:  ["일하면서"],           // 단어 하나씩 순서대로 떠오릅니다
  titleGlow:   "만들었습니다",          // 둘째 줄 (그라데이션 + 시머)
  subHTML:     "직장을 다니며 배운 재직자들이 자기 업무에 필요한 도구를 직접 만들었습니다. <b>작품을 클릭하고</b> 감상해주세요.",

  /* 히어로 타이핑 카드 — 과정 홍보 문구. 한 줄짜리 문장 3개가 번갈아 출력됩니다 */
  prompts: [
    "말로 시키면 됩니다 — AI 시대의 새로운 업무 역량",
    "코드 없이 대화만으로 업무 도구를 만듭니다",
    "대표가 먼저 배우면 회사의 속도가 달라집니다",
  ],

  /* 소개 스트립 — 3개 고정 */
  stats: [                             // TODO: 실제 수강생·작품 수 확정 필요 — 부록 B
    { value: "30",   label: "수강생" },
    { value: "32",   label: "작품" },
    { value: "하루", label: "제작 기간" },
  ],

  /* 작품 목록 헤더 */
  sectionTitle: "작품 목록",
  sectionHint:  "작품을 선택하면 소개 카드가 열립니다",

  /* 배지·문구 형식 — 이 전시관은 대표님 대상 Z트랙 단일 과정입니다 */
  badge:      () => "Z트랙",   /* 작품 번호는 표시하지 않습니다 */
  artistLine: item => `이 앱은 <b>${item.group} ${item.author} 대표님</b>의 작품입니다.`,

  labelTopic:  "작품 주제",
  labelUsage:  "사용 방법",
  labelPrompt: "어떻게 시켰나",

  linkText: { app: "앱 열기 ↗",        video: "영상 보기 ▶",   extra: "자료 보기" },
  linkNone: { app: "앱 주소 준비 중",   video: "영상 준비 중",  extra: "자료 없음" },

  /* 푸터 — 한 줄씩. 지원사업 명시 문구 포함 */
  footerLines: [
    "<span class='org'>계원예술대학교 AID+30</span>",
    "본 전시관은 수강생이 수업 중 제작한 결과물을 소개합니다.",
    "작품 주소는 제작자가 관리하며 변경되거나 종료될 수 있습니다.",
    "<span class='support'>이 콘텐츠는 교육부와 국가평생교육진흥원의 '재직자 AI디지털(AID) 집중과정 사업'의 지원을 받아 제작한 교육과정의 산출물입니다.</span>",
    "주관·운영 계원예술대학교 ｜ 제작·교육 마인드캔버스 ｜ 협력 경기중소벤처기업협회 ｜ 콘텐츠 제작 참여 (주)SSMI",
  ],

  /* 푸터 기관 로고 — 지원·주관·제작·협력 순. 어두운 푸터 위 흰 칩으로 표시됩니다 */
  footerLogos: [
    { src: "img/logo-moe.jpg",        alt: "교육부" },
    { src: "img/logo-nile.jpg",       alt: "국가평생교육진흥원" },
    { src: "img/logo-kaywon.png",     alt: "계원예술대학교 평생교육원 수신재" },
    { src: "img/logo-mindcanvas.svg", alt: "마인드캔버스" },
    { src: "img/logo-gvsme.svg",      alt: "경기중소벤처기업연합회" },
  ],

  /* 자동 전시 모드 — 무조작 40초 뒤 작품 순환 */
  idleMs: 40000, showMs: 6500, gapMs: 900,
};


/* ---------- ② COHORTS — 트랙(정렬·배지용) ----------
   ※ 대표님 대상 Z트랙 단일 과정. 새 트랙·기수가 생기면 맨 앞에 추가합니다. */
const COHORTS = [
  { key: "z", label: "Z트랙", period: "2026" },
];


/* ---------- ③ ITEMS — 작품 목록 ----------
   no      : 기수 안에서의 번호 (기수마다 1부터). cohort와 조합이 고유해야 합니다
   cohort  : COHORTS의 key
   group   : 소속 (학과·팀·회사)
   author  : 만든 사람 이름 — 공개 동의를 받은 경우에만 실명
   title   : 작품 이름
   topic   : 무엇을 하는 도구인지 2문장 이내
   usage   : 사용 방법. 줄바꿈은 \n
   prompt  : AI에게 실제로 시킨 말 또는 PRD 요약  ★ 이 전시관의 핵심 콘텐츠
             비우면 모달에서 해당 칸이 통째로 사라집니다
   links   : app / video / extra 세 키가 항상 있어야 합니다. 없으면 ""
   image   : 대표 화면 캡처. "" 이면 유튜브 썸네일 → 이모지 카드 순으로 자동 대체
   emoji   : 이미지가 전혀 없을 때 표시할 이모지 1개

   ※ 아래는 items.sample.js 의 예시 데이터입니다.
     실제 작품 데이터가 확정되면 이 배열을 교체하세요 (명세 8회차).      */
const ITEMS = [

  /* 예시 ① 세 링크가 모두 있는 경우 */
  {
    no: 1, cohort: "z", sample: true,
    group: "○○과", author: "김○○",
    title: "도자기 타임머신",
    topic: "도자기 사진을 올리면 제작 시기와 기법을 추정해 설명해 줍니다. 도록 작성용 초안을 만드는 데 씁니다.",
    usage: "① 사진을 올린다\n② 추정 결과를 확인한다\n③ 설명을 복사해 도록에 붙인다",
    prompt: "도자기 사진을 올리면 시대와 기법을 추정해 주는 웹앱을 만들어 줘.\n결과는 초보자도 알 수 있는 말로 3문장 이내로 보여 줘.\n먼저 질문 세 개를 해 주십시오.",
    links: {
      app:   "https://example.vercel.app",
      video: "https://youtu.be/XXXXXXXXXXX",
      extra: "https://docs.google.com/document/d/XXXX"
    },
    image: "img/2-01-ceramic.png",
    emoji: "🏺"
  },

  /* 예시 ② 이미지가 없고 유튜브만 있는 경우 — 썸네일이 자동으로 채워집니다 */
  {
    no: 2, cohort: "z", sample: true,
    group: "○○과", author: "이○○",
    title: "전시 관람 동선 카드",
    topic: "관람객이 남은 시간을 입력하면 그 시간에 맞는 관람 순서를 추천합니다.",
    usage: "① 남은 시간을 고른다\n② 추천 동선을 확인한다",
    prompt: "관람 시간(30분·1시간·2시간)을 고르면 그에 맞는 전시 관람 순서를 카드로 보여 주는 웹앱을 만들어 줘.",
    links: {
      app:   "https://example2.vercel.app",
      video: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
      extra: ""
    },
    image: "",
    emoji: "🗺️"
  },

  /* 예시 ③ 링크가 아직 없는 경우 — 버튼이 비활성되고 자동 전시에서 제외됩니다 */
  {
    no: 3, cohort: "z", sample: true,
    group: "○○과", author: "박○○",
    title: "재료 소진 알림판",
    topic: "공방 재료의 남은 수량을 기록하고 기준 이하로 떨어지면 표시해 줍니다.",
    usage: "① 재료와 수량을 입력한다\n② 기준 수량을 정한다\n③ 목록에서 부족한 재료를 확인한다",
    prompt: "",
    links: { app: "", video: "", extra: "" },
    image: "",
    emoji: "🧵"
  },

  /* 예시 ④ 이미지가 있는 경우 */
  {
    no: 4, cohort: "z", sample: true,
    group: "○○과", author: "최○○",
    title: "수업 기록 정리 도구",
    topic: "수업 중 적은 메모를 붙여 넣으면 주제별로 묶어 정리해 줍니다.",
    usage: "① 메모를 붙여 넣는다\n② 정리된 결과를 확인한다\n③ 복사해서 보관한다",
    prompt: "메모 여러 개를 붙여 넣으면 주제별로 묶어 정리해 주는 웹앱을 만들어 줘.\n원문은 지우지 말고 아래에 함께 보여 줘.",
    links: {
      app:   "https://example4.vercel.app",
      video: "",
      extra: ""
    },
    image: "img/1-01-notes.png",
    emoji: "📝"
  },

];


/* ---------- ④ VIDEOS — 영상 목록 ----------
   [영상] 버튼을 눌렀을 때 보이는 카드들입니다. 영상 하나당 객체 하나.
   youtube : 유튜브 주소 — 일반·쇼츠·youtu.be 모두 가능. 썸네일이 자동으로 걸립니다
   file    : 직접 올린 영상 파일 경로 (예: "video/clip-01.mp4") — youtube 대신 사용.
             쇼츠(세로) 영상 파일도 그대로 재생됩니다
   ※ youtube와 file 중 하나만 채우세요. 둘 다 있으면 youtube가 우선입니다
   title / group / author / desc : 카드와 재생 화면에 표시                    */
const VIDEOS = [

  /* 예시 ① 유튜브 링크 */
  { sample: true, title: "작품 시연 영상 예시", group: "○○컴퍼니", author: "김○○",
    youtube: "https://youtu.be/XXXXXXXXXXX", file: "",
    desc: "작품 시연 장면을 담은 영상입니다." },

  /* 예시 ② 직접 올린 쇼츠 영상 — mp4 파일을 video/ 폴더에 두고 경로를 적으세요 */
  { sample: true, title: "쇼츠 예시 (직접 업로드)", group: "○○컴퍼니", author: "이○○",
    youtube: "", file: "video/sample-shorts.mp4",
    desc: "저장소 video/ 폴더에 올린 영상을 바로 재생합니다." },

];
