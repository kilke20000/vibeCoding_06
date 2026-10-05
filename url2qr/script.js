document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url-input');
  const generateBtn = document.getElementById('generate-btn');
  const qrContainer = document.getElementById('qr-container');
  const qrcodeDiv = document.getElementById('qrcode');
  const downloadJpgBtn = document.getElementById('download-jpg-btn');
  const downloadPngBtn = document.getElementById('download-png-btn');
  const toast = document.getElementById('toast');

  let qrCodeInstance = null;

  // 토스트 메시지 표시 함수
  const showToast = (message, icon = 'fa-check') => {
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // QR 코드 생성 함수 (한글 UTF-8 완벽 지원)
  const generateQR = () => {
    let url = urlInput.value.trim();
    if (!url) {
      showToast('URL을 입력해주세요.', 'fa-circle-exclamation');
      urlInput.focus();
      return;
    }

    // http/https 자동 보정
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('mailto:') && !url.startsWith('tel:') && !url.startsWith('WIFI:')) {
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      }
    }

    try {
      // 기존 QR코드 제거
      qrcodeDiv.innerHTML = '';

      // 한글(UTF-8) 깨짐 방지 인코딩 처리
      const encodedText = unescape(encodeURIComponent(url));

      // QRCode.js 인스턴스 생성
      qrCodeInstance = new QRCode(qrcodeDiv, {
        text: encodedText,
        width: 260,
        height: 260,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });

      // 애니메이션 표시
      qrContainer.classList.remove('qr-hidden');
      qrContainer.classList.add('qr-visible');

      showToast('QR코드가 성공적으로 생성되었습니다!', 'fa-circle-check');
      
      // QR 컨테이너로 부드럽게 스크롤
      qrContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (err) {
      console.error(err);
      showToast('QR코드 생성 중 오류가 발생했습니다.', 'fa-triangle-exclamation');
    }
  };

  // 이미지 다운로드 헬퍼
  const downloadQR = (format = 'png') => {
    const canvas = qrcodeDiv.querySelector('canvas');
    if (!canvas) {
      showToast('생성된 QR코드가 없습니다.', 'fa-triangle-exclamation');
      return;
    }

    const mimeType = format === 'jpeg' || format === 'jpg' ? 'image/jpeg' : 'image/png';
    const extension = format === 'jpeg' || format === 'jpg' ? 'jpg' : 'png';
    
    // 고화질 다운로드를 위해 캔버스 변환
    const image = canvas.toDataURL(mimeType, 1.0);
    const link = document.createElement('a');
    link.href = image;
    link.download = `qrcode_${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`${extension.toUpperCase()} 파일로 다운로드되었습니다.`);
  };

  // 이벤트 리스너 등록
  generateBtn.addEventListener('click', generateQR);

  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generateQR();
    }
  });

  // QR 박스 클릭 시 다운로드
  qrcodeDiv.addEventListener('click', () => downloadQR('jpg'));
  downloadJpgBtn.addEventListener('click', () => downloadQR('jpg'));
  downloadPngBtn.addEventListener('click', () => downloadQR('png'));

  // 인터랙티브 마우스 조명 효과
  document.addEventListener('mousemove', (e) => {
    const x = Math.round((e.clientX / window.innerWidth) * 100);
    const y = Math.round((e.clientY / window.innerHeight) * 100);
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  });

  // URL 파라미터 자동 생성 지원 (한글 디코딩 포함)
  const urlParams = new URLSearchParams(window.location.search);
  const initialUrl = urlParams.get('url');
  if (initialUrl) {
    try {
      urlInput.value = decodeURIComponent(initialUrl);
    } catch {
      urlInput.value = initialUrl;
    }
    generateQR();
  }
});
