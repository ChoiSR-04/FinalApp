// 1: 미적분학 필수 어휘, 2: 일반물리학 필수 어휘, 3: 회로이론, 4: 전자기학, 5: 중간고사 오답 노트

export const wordsData = {
  1: [
    { en: 'hemisphere', ko: '반구' }, { en: 'radius', ko: '반지름' }, { en: 'diameter', ko: '지름' }, { en: 'circumference', ko: '원주' },
    { en: 'perimeter', ko: '둘레' }, { en: 'surface area', ko: '표면적' }, { en: 'normal line', ko: '법선' }, { en: 'tangent line', ko: '접선' },
    { en: 'first quadrant', ko: '제1사분면' }, { en: 'parallel', ko: '평행의' }, { en: 'horizontal', ko: '수평의' }, { en: 'vertical', ko: '수직의' },
    { en: 'perpendicular', ko: '수직의' }, { en: 'orthogonal', ko: '직교의' }, { en: 'parabola', ko: '포물선' }, { en: 'ellipse', ko: '타원' },
    { en: 'hyperbola', ko: '쌍곡선' }, { en: 'arbitrary', ko: '임의의' }, { en: 'volume', ko: '부피' }, { en: 'side', ko: '변' },
    { en: 'vertex', ko: '꼭짓점' }, { en: 'hypotenuse', ko: '빗변' }, { en: 'right triangle', ko: '직각삼각형' }, { en: 'acute triangle', ko: '예각삼각형' },
    { en: 'obtuse triangle', ko: '둔각삼각형' }, { en: 'equilateral triangle', ko: '정삼각형' }, { en: 'isosceles triangle', ko: '이등변삼각형' }, { en: 'square', ko: '정사각형' },
    { en: 'rectangle', ko: '직사각형' }, { en: 'quadrilateral', ko: '사각형' }, { en: 'parallelogram', ko: '평행사변형' }, { en: 'pyramid', ko: '사각뿔' },
    { en: 'cube', ko: '정육면체' }, { en: 'tetrahedron', ko: '사면체' }, { en: 'domain', ko: '정의역' }, { en: 'range', ko: '치역' },
    { en: 'asymptote', ko: '점근선' }, { en: 'round', ko: '반올림' }, { en: 'reciprocal', ko: '역수' }, { en: 'sign', ko: '부호' },
    { en: 'local(relative) maximum', ko: '극대' }, { en: 'local(relative) minimum', ko: '극소' }, { en: 'global(absolute) maximum', ko: '최대' }, { en: 'global(absolute) minimum', ko: '최소' },
    { en: 'base', ko: '밑면' }, { en: 'cross-section', ko: '단면' }, { en: 'coefficient', ko: '계수' }, { en: 'exponent', ko: '지수' },
    { en: 'slope', ko: '기울기' }, { en: 'induction', ko: '귀납법' }
  ],
  2: [
    { en: 'Mass', ko: '질량' }, { en: 'Weight', ko: '무게' }, { en: 'Force', ko: '힘' }, { en: 'Velocity', ko: '속도' },
    { en: 'Acceleration', ko: '가속도' }, { en: 'Momentum', ko: '운동량' }, { en: 'Energy', ko: '에너지' }, { en: 'Work', ko: '일' },
    { en: 'Power', ko: '일률 (전력)' }, { en: 'Friction', ko: '마찰' }, { en: 'Gravity', ko: '중력' }, { en: 'Tension', ko: '장력' },
    { en: 'Pressure', ko: '압력' }, { en: 'Density', ko: '밀도' }, { en: 'Volume', ko: '부피' }, { en: 'Temperature', ko: '온도' },
    { en: 'Heat', ko: '열' }, { en: 'Thermodynamics', ko: '열역학' }, { en: 'Entropy', ko: '엔트로피' }, { en: 'Conduction', ko: '전도' },
    { en: 'Convection', ko: '대류' }, { en: 'Radiation', ko: '복사' }, { en: 'Wave', ko: '파동' }, { en: 'Wavelength', ko: '파장' },
    { en: 'Frequency', ko: '주파수 (진동수)' }, { en: 'Amplitude', ko: '진폭' }, { en: 'Reflection', ko: '반사' }, { en: 'Refraction', ko: '굴절' },
    { en: 'Diffraction', ko: '회절' }, { en: 'Interference', ko: '간섭' }, { en: 'Optics', ko: '광학' }, { en: 'Lens', ko: '렌즈' },
    { en: 'Mirror', ko: '거울' }, { en: 'Charge', ko: '전하' }, { en: 'Electric Field', ko: '전기장' }, { en: 'Magnetic Field', ko: '자기장' },
    { en: 'Current', ko: '전류' }, { en: 'Voltage', ko: '전압' }, { en: 'Resistance', ko: '저항' }, { en: 'Capacitance', ko: '전기용량' },
    { en: 'Inductance', ko: '인덕턴스' }, { en: 'Circuit', ko: '회로' }, { en: 'Electron', ko: '전자' }, { en: 'Proton', ko: '양성자' },
    { en: 'Neutron', ko: '중성자' }, { en: 'Atom', ko: '원자' }, { en: 'Nucleus', ko: '원자핵' }, { en: 'Quantum', ko: '양자' },
    { en: 'Kinematics', ko: '운동학' }, { en: 'Dynamics', ko: '동역학' }
  ],
  3: [
    { en: 'Circuit', ko: '회로' }, { en: 'Current', ko: '전류' }, { en: 'Voltage', ko: '전압' }, { en: 'Resistance', ko: '저항' },
    { en: 'Resistor', ko: '저항기' }, { en: 'Capacitor', ko: '축전기 (커패시터)' }, { en: 'Inductor', ko: '유도기 (인덕터)' }, { en: 'Impedance', ko: '임피던스' },
    { en: 'Reactance', ko: '리액턴스' }, { en: 'Admittance', ko: '어드미턴스' }, { en: 'Conductance', ko: '컨덕턴스' }, { en: 'Ohm', ko: '옴 (저항 단위)' },
    { en: 'Ampere', ko: '암페어 (전류 단위)' }, { en: 'Volt', ko: '볼트 (전압 단위)' }, { en: 'Watt', ko: '와트 (전력 단위)' }, { en: 'Power', ko: '전력' },
    { en: 'Direct Current (DC)', ko: '직류' }, { en: 'Alternating Current (AC)', ko: '교류' }, { en: 'Frequency', ko: '주파수' }, { en: 'Phase', ko: '위상' },
    { en: 'Node', ko: '노드 (절점)' }, { en: 'Loop', ko: '루프 (폐회로)' }, { en: 'Mesh', ko: '망' }, { en: 'Branch', ko: '가지' },
    { en: 'Kirchhoff’s Laws', ko: '키르히호프의 법칙' }, { en: 'Thevenin Theorem', ko: '테브난의 정리' }, { en: 'Norton Theorem', ko: '노튼의 정리' }, { en: 'Superposition', ko: '중첩' },
    { en: 'Source', ko: '전원' }, { en: 'Load', ko: '부하' }, { en: 'Short Circuit', ko: '단락 (쇼트)' }, { en: 'Open Circuit', ko: '개방 회로' },
    { en: 'Series', ko: '직렬' }, { en: 'Parallel', ko: '병렬' }, { en: 'Transient', ko: '과도 (상태)' }, { en: 'Steady State', ko: '정상 상태' },
    { en: 'Time Constant', ko: '시상수' }, { en: 'Resonance', ko: '공진' }, { en: 'Bandwidth', ko: '대역폭' }, { en: 'Filter', ko: '필터' },
    { en: 'Amplifier', ko: '증폭기' }, { en: 'Gain', ko: '이득' }, { en: 'Attenuation', ko: '감쇠' }, { en: 'Oscillator', ko: '발진기' },
    { en: 'Transformer', ko: '변압기' }, { en: 'Diode', ko: '다이오드' }, { en: 'Transistor', ko: '트랜지스터' }, { en: 'Operational Amplifier', ko: '연산 증폭기 (Op-Amp)' },
    { en: 'Ground', ko: '접지' }, { en: 'Terminal', ko: '단자' }
  ],
  4: [
    { en: 'Electric Field', ko: '전기장' }, { en: 'Magnetic Field', ko: '자기장' }, { en: 'Charge', ko: '전하' }, { en: 'Current', ko: '전류' },
    { en: 'Voltage', ko: '전압' }, { en: 'Resistance', ko: '저항' }, { en: 'Capacitance', ko: '전기용량' }, { en: 'Inductance', ko: '인덕턴스' },
    { en: 'Flux', ko: '선속 (플럭스)' }, { en: 'Permittivity', ko: '유전율' }, { en: 'Permeability', ko: '투자율' }, { en: 'Coulomb', ko: '쿨롱 (전하의 단위)' },
    { en: 'Ampere', ko: '암페어 (전류의 단위)' }, { en: 'Volt', ko: '볼트 (전압의 단위)' }, { en: 'Ohm', ko: '옴 (저항의 단위)' }, { en: 'Farad', ko: '패럿 (전기용량의 단위)' },
    { en: 'Henry', ko: '헨리 (인덕턴스의 단위)' }, { en: 'Tesla', ko: '테슬라 (자기장의 단위)' }, { en: 'Weber', ko: '웨버 (자기선속의 단위)' }, { en: 'Conductor', ko: '도체' },
    { en: 'Insulator', ko: '절연체 (부도체)' }, { en: 'Semiconductor', ko: '반도체' }, { en: 'Dielectric', ko: '유전체' }, { en: 'Polarization', ko: '분극 (편광)' },
    { en: 'Magnetization', ko: '자화' }, { en: 'Dipole', ko: '쌍극자' }, { en: 'Monopole', ko: '단극자' }, { en: 'Electromagnetic Wave', ko: '전자기파' },
    { en: 'Wavelength', ko: '파장' }, { en: 'Frequency', ko: '주파수' }, { en: 'Amplitude', ko: '진폭' }, { en: 'Phase', ko: '위상' },
    { en: 'Impedance', ko: '임피던스' }, { en: 'Admittance', ko: '어드미턴스' }, { en: 'Reactance', ko: '리액턴스' }, { en: 'Conductance', ko: '컨덕턴스' },
    { en: 'Susceptance', ko: '서셉턴스' }, { en: 'Maxwell\'s Equations', ko: '맥스웰 방정식' }, { en: 'Gauss\'s Law', ko: '가우스의 법칙' }, { en: 'Ampere\'s Law', ko: '암페어의 법칙' },
    { en: 'Faraday\'s Law', ko: '패러데이의 법칙' }, { en: 'Lenz\'s Law', ko: '렌츠의 법칙' }, { en: 'Lorentz Force', ko: '로렌츠 힘' }, { en: 'Biot-Savart Law', ko: '비오-사바르 법칙' },
    { en: 'Electromotive Force (EMF)', ko: '기전력' }, { en: 'Magnetomotive Force (MMF)', ko: '기자력' }, { en: 'Reluctance', ko: '자기 저항' }, { en: 'Eddy Current', ko: '와전류 (맴돌이 전류)' },
    { en: 'Hysteresis', ko: '이력 현상' }, { en: 'Transformer', ko: '변압기' }
  ],
  5: [
    { en: 'Algorithm', ko: '알고리즘' }, { en: 'Complexity', ko: '복잡도' }, { en: 'Database', ko: '데이터베이스' }, { en: 'Query', ko: '질의' },
    { en: 'Architecture', ko: '아키텍처' }, { en: 'Protocol', ko: '프로토콜' }, { en: 'Network', ko: '네트워크' }, { en: 'Router', ko: '라우터' },
    { en: 'Server', ko: '서버' }, { en: 'Client', ko: '클라이언트' }, { en: 'Encryption', ko: '암호화' }, { en: 'Decryption', ko: '복호화' },
    { en: 'Authentication', ko: '인증' }, { en: 'Authorization', ko: '인가 (권한 부여)' }, { en: 'Framework', ko: '프레임워크' }, { en: 'Library', ko: '라이브러리' },
    { en: 'Compiler', ko: '컴파일러' }, { en: 'Interpreter', ko: '인터프리터' }, { en: 'Variable', ko: '변수' }, { en: 'Pointer', ko: '포인터' },
    { en: 'Array', ko: '배열' }, { en: 'List', ko: '리스트' }, { en: 'Stack', ko: '스택' }, { en: 'Queue', ko: '큐' },
    { en: 'Tree', ko: '트리' }, { en: 'Graph', ko: '그래프' }, { en: 'Node', ko: '노드' }, { en: 'Edge', ko: '간선' },
    { en: 'Iteration', ko: '반복' }, { en: 'Recursion', ko: '재귀' }, { en: 'Sorting', ko: '정렬' }, { en: 'Searching', ko: '검색' },
    { en: 'Optimization', ko: '최적화' }, { en: 'Heuristic', ko: '휴리스틱' }, { en: 'Machine Learning', ko: '기계 학습' }, { en: 'Artificial Intelligence', ko: '인공지능' },
    { en: 'Neural Network', ko: '신경망' }, { en: 'Training', ko: '학습' }, { en: 'Inference', ko: '추론' }, { en: 'Model', ko: '모델' },
    { en: 'Dataset', ko: '데이터셋' }, { en: 'Feature', ko: '특징' }, { en: 'Label', ko: '레이블 (정답)' }, { en: 'Overfitting', ko: '과적합' },
    { en: 'Underfitting', ko: '과소적합' }, { en: 'Validation', ko: '검증' }, { en: 'Testing', ko: '테스트' }, { en: 'Deployment', ko: '배포' },
    { en: 'Cloud', ko: '클라우드' }, { en: 'Container', ko: '컨테이너' }
  ]
};
