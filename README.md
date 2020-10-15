# GameToon
자체 정의 스크립트 언어로 게임을 작성하고, 작성된 게임을 실행하는 게임 엔진 제작
작성된 게임 스크립트는 다양한 플랫폼에서 실행 가능하며, 현재 제작된 엔진은 웹 버전(Javascipt) 이다.

# G-Tune
게임 제작 툴. WPF(C#)으로 제작됨.
정의된 이벤트-액션을 조합하고 다양한 object, room을 선언하여 자유롭게 다양한 종류의 게임을 제작할 수 있다.
제작된 게임은 자체 정의된 스크립트로 출력되며, 미리 제작된 스크립트를 읽어 게임을 수정할 수도 있다.

# Engine
작성된 게임을 실행시키는 툴. 
EaselJS 등의 JavaScript 라이브러리를 사용하여 웹 환경에서 동작할 수 있도록 작성되었다.
스크립트를 읽어 작성된 게임을 동작시키며, 렌더링 및 물리엔진 등의 기능을 포함하고 있다.

# HiperMarioScript
예시 게임 스크립트.
위 툴로 제작된 스크립트이며, 실행은 engine 폴더 안의 hipermario.html로 실행할 수 있다.
