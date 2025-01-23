//변수 선언 - input id
const id_input = document.getElementById("id_input");
const name_input = document.getElementById("name_input");
const age_input = document.getElementById("age_input");
const career_input = document.getElementById("career_input");
const nickname_input = document.getElementById("nickname_input");

//error div
const error_id = document.getElementById("error_id");
const error_name = document.getElementById("error_name");
const error_age = document.getElementById("error_age");
const error_career = document.getElementById("error_career");
const error_nickname = document.getElementById("error_nickname");

//배열 선언 - localStorge
let data_map = [];
const id_arr = [];
const nick_arr = [];
let dummy_map = [];
let ls = window.localStorage.getItem("_data", data_map);

//버튼
const save_btn = document.getElementById("save");
let btn_active = [false, false, false, false];

//수정 삭제 버튼
const delete_btn = document.querySelector(".btnDel");
let modify_cnt = 0;
let open_input = []; //열려있는 지 닫혀있는지 판단하는 배열 - 열려있으면 true 닫혀있으면 false

// 테이블 헤드 생성
const tableWrap = document.querySelector(".main-wrap");
tableWrap.innerHTML = ` 
<div class="table">
      <div class="row">
        <div>이름</div>
        <div>나이</div>
        <div>커리어</div>
        <div>별명</div>
        <div>관리</div>
      </div>
      <div class="tBody"></div>
    </div>
 `;

// 테이블 바디 생성 함수
function dataPrint() {
  const tbBody = document.querySelector(".tBody");
  tbBody.innerHTML = data_map
    .map((item, index) => {
      return `
      <div>
          <div class="inputName">${item.name}</div>
          <div class="inputAge">${item.age}</div>
          <div class="inputCareer" id = inputcareer${index}>${item.career}</div>
          <div class="inputNickname">${item.nickname}</div>
        <div>
          <button class="btnCor" id = modify_${index} onClick = "modify_fuc(${index})">수정</button>
          <button class="btnDel" id = delete_${index} onClick = "delete_fuc(${index})">삭제</button>
        </div>
      </div>
      `;
    })
    .join("");
}

//실시간 키보드 값 출력
function printId() {
  const content = document.getElementById("id_input").value;

  if (id_arr.slice(0, id_arr.length).includes(content)) {
    document.getElementById("error_id").innerText =
      "동일한 id값을 입력하셨습니다";
    btn_active[0] = false;
  } else {
    document.getElementById("error_id").innerText = "";
    btn_active[0] = true;
  }

  if (btn_active.indexOf(false) === -1) {
    //false 찾지 못한 경우 즉, 모두 True인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
}
function printAge() {
  const content = document.getElementById("age_input").value;
  if (content > 150) {
    document.getElementById("error_age").innerText = "150살 이하로 작성하시오.";
    btn_active[1] = false;
  } else {
    document.getElementById("error_age").innerText = "";
    btn_active[1] = true;
  }
  if (btn_active.indexOf(false) === -1) {
    //false 찾지 못한 경우 즉, 모두 True인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
}
function printCareer() {
  const content = document.getElementById("career_input").value;
  if (content.length < 15) {
    document.getElementById("error_career").innerText =
      "15자 이상으로 작성하시오.";
    btn_active[2] = false;
  } else {
    document.getElementById("error_career").innerText = "";
    btn_active[2] = true;
  }
  if (btn_active.indexOf(false) === -1) {
    //false 찾지 못한 경우 즉, 모두 True인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
}
function printNickName() {
  const content = document.getElementById("nickname_input").value;
  printNickName_den();
  data_map.map((e) => {
    //console.log("e", typeof e.nickname, "content", typeof content);
    if (e.nickname == content) {
      document.getElementById("error_nickname").innerText =
        "별명을 중복 입력하셨습니다.";
      btn_active[3] = false;
    } else {
      btn_active[3] = true;
    }
  });
  if (btn_active.indexOf(false) === -1) {
    //false 찾지 못한 경우 즉, 모두 True인 경우
    save_btn.disabled = false; // 활성화
  } else {
    save_btn.disabled = true; // 비활성화
  }
}
function printNickName_den() {
  const content = document.getElementById("nickname_input").value;
  //console.log(content);
  if (content.length < 2) {
    document.getElementById("error_nickname").innerText =
      "2자 이상으로 입력하시오.";
    btn_active[3] = false;
    return false;
  } else {
    document.getElementById("error_nickname").innerText = "";
    btn_active[3] = true;
    return true;
  }
}

//잘못된 저장 확인 함수
function jugment(content) {
  let cnt = 0;
  //content -> infoData 현재 입력되 값 total -> data_map 전체 데이터 값
  //id 중복 판단
  if (id_arr.slice(0, id_arr.length - 1).includes(content._id)) {
    error_id.innerText = "아이디를 중복 입력하셨습니다.";
    cnt++;
  } else {
    error_id.innerText = "";
  }
  //닉네임 중복 판단
  if (nick_arr.slice(0, nick_arr.length - 1).includes(content.nickname)) {
    error_nickname.innerText = "별명을 중복 입력하셨습니다.";
    cnt++;
  } else if (nickname_input.value.length < 2) {
    error_nickname.innerText = "2자 이상으로 입력하시오.";
    cnt++;
  } else {
    error_nickname.innerText = "";
  }

  if (content.career.length < 15) {
    error_career.innerText = "15자 이상으로 입력하시오.";
    cnt++;
  } else {
    error_career.innerText = "";
  }

  if (parseInt(content.age) > 150) {
    error_age.innerText = "150살 이하로 작성하시오.";
    cnt++;
  } else {
    error_age.innerText = "";
  }

  if (cnt >= 1) {
    //오류 메시지가 하나라도 있는 경우 로컬 스토리지에 저장된 값 삭제
    data_map.pop();
  }
}

//input에서 15자 이상 판단 함수
function modify_input_bot_fuc(btn) {
  const m_btn = document.getElementById(`modify_${btn}`);
  //console.log("m_btn", m_btn);
  const content = document.querySelector(".modify_input").value;
  if (content.length < 15) {
    document.querySelector(
      ".modify_input_fuc"
    ).innerHTML = `<div>15자 이상으로 작성하시오</div>`;
    m_btn.disabled = true; //수정버튼 클릭 x
  } else {
    document.querySelector(".modify_input_fuc").innerHTML = `<div></div>`;
    m_btn.disabled = false;
  }
  console.log("modify_cnt 함수", modify_cnt);
}

//수정 버튼 클릭 함수
function modify_fuc(event) {
  console.log("modify 함수 실행 중 : ", event);
  const career = document.getElementById(`inputcareer${event}`);
  const modify_btn = document.getElementById(`modify_${event}`);
  let sub_input = data_map[event].career; //현재 데이터에서 위치값 가져오기
  console.log("sub_input", sub_input);
  let modify_inner = "";

  if (modify_btn.innerText === "수정") {
    open_input[event] = true;
    //버튼을 처음 누른 상태
    modify_btn.innerHTML = "<div>수정완료</div>";
    career.innerHTML = `<input class="modify_input" onkeyup="modify_input_bot_fuc(${event})"/><div class="modify_input_fuc"></div>`;

    if (modify_cnt === 1) {
      //수정 버튼 x
      modify_btn.disabled = true;
    } else {
      modify_btn.disabled = false;
    }

    document.querySelector(".modify_input").value = sub_input; //기존의 커리어값을 input 값에 삽입
    modify_inner = document.querySelector(".modify_input").value; //수정한 값을 변수에 삽입

    if (sub_input.length < 15) {
      document.querySelector(
        ".modify_input_fuc"
      ).innerHTML = `<div>15자 이상으로 작성하시오</div>`;
      modify_btn.disabled = true;
    } else {
      modify_btn.disabled = false;
    }
  } else {
    //수정 완료를 누른 상태
    open_input[event] = false;
    modify_inner = document.querySelector(".modify_input").value; //수정한 값을 변수에 삽입
    modify_btn.innerHTML = "<div>수정</div>";
    career.innerHTML = `<div>${modify_inner}</div>`; // 커리어 div값 수정

    //data_map 값 수정하기
    data_map[event].career = modify_inner;

    window.localStorage.setItem("_data", JSON.stringify(data_map));
  }
  console.log("open_input", open_input);
}

//삭제 버튼 클릭 함수
function delete_fuc(event) {
  //console.log("event", event); // 해당 위치 행 값
  data_map.splice(event, 1);
  id_arr.splice(event, 1);
  window.localStorage.setItem("_data", JSON.stringify(data_map));
  dataPrint();
}

//window 로드 이벤트
window.onload = function () {
  save_btn.disabled = true; // 비활성화
  if (ls !== null) {
    for (let j in JSON.parse(ls)) {
      data_map.push(JSON.parse(ls)[j]);
      id_arr.push(data_map[j]._id);
    }
  }

  dataPrint();

  //버튼 클릭 이벤트
  save_btn.addEventListener("click", () => {
    save_btn.disabled = true; // 비활성화
    btn_active = [false, false, false, false];
    let infoData = {
      _id: id_input.value,
      name: name_input.value,
      age: age_input.value,
      career: career_input.value,
      nickname: nickname_input.value,
    };
    id_arr.push(infoData._id);
    data_map.push(infoData);
    jugment(infoData);
    //console.log("data_map", data_map);
    window.localStorage.setItem("_data", JSON.stringify(data_map));
    dummy_map = window.localStorage.getItem("_data");

    //데이터 data_map에 push 후 해당 input 초기화
    id_input.value = "";
    name_input.value = "";
    age_input.value = "";
    career_input.value = "";
    nickname_input.value = "";

    //table에 행 달기
    dataPrint();
  });
};
