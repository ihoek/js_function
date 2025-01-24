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
          <div class="inputName" id = inputname${item._id}>${item.name}</div>
          <div class="inputAge" id = inputage${item._id}>${item.age}</div>
          <div class="inputCareer" id = inputcareer${item._id}>${item.career}</div>
          <div class="inputNickname">${item.nickname}</div>
        <div>
          <button class="btnCor" id = modify_${item._id} onClick = "modify_fuc(${item._id})">수정</button>
          <button class="btnDel" id = delete_${item._id} onClick = "delete_fuc(${item._id})">삭제</button>
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

//수정 버튼 클릭 함수
function modify_fuc(event) {
  //event는 item._id값

  const modify_btn = document.getElementById(`modify_${event}`); //수정버튼
  const career = document.getElementById(`inputcareer${event}`); //현재행의 career
  const name = document.getElementById(`inputname${event}`); // 현재행의 name
  const age = document.getElementById(`inputage${event}`); //현재행의 age

  //현재 행 값
  const currentValue = career.textContent;
  const currentValue_name = name.textContent;
  const currentValue_age = age.textContent;

  if (modify_btn.innerText === "수정") {
    modify_btn.innerHTML = "<div>수정완료</div>";

    // 기존 데이터를 input 필드로 교체
    career.innerHTML = `<input class="modify_input${event}" value="${currentValue}"/><div class="modify_input_fuc"></div>`;
    name.innerHTML = `<input class="modify_input_name${event}" value="${currentValue_name}"/><div class="modify_input_name_fuc"></div>`;
    age.innerHTML = `<input class="modify_input_age${event}" value="${currentValue_age}"/><div class="modify_input_age_fuc"></div>`;

    //input content
    const inputField = career.querySelector(`.modify_input${event}`);
    const messageDiv = career.querySelector(".modify_input_fuc");

    const inputField_name = name.querySelector(`.modify_input_name${event}`);
    const messageDiv_name = name.querySelector(".modify_input_name_fuc");

    const inputField_age = age.querySelector(`.modify_input_age${event}`);
    const messageDiv_age = age.querySelector(".modify_input_age_fuc");

    // career -  입력값 글자 수 검사
    inputField.addEventListener("input", () => {
      const newValue = inputField.value;
      if (newValue.length < 15) {
        messageDiv.innerText = "15자 이상으로 작성하시오.";
        modify_btn.disabled = true;
      } else {
        messageDiv.innerText = "";
        modify_btn.disabled = false;
      }
    });

    // name - 공백 확인
    inputField_name.addEventListener("input", () => {
      const newValue_name = inputField_name.value;
      if (newValue_name.length === 0) {
        messageDiv_name.innerText = "글자를 입력하시오";
        modify_btn.disabled = true;
      } else {
        messageDiv_name.innerText = "";
        modify_btn.disabled = false;
      }
    });

    // age - 나이 확인(150살 이내)
    inputField_age.addEventListener("input", () => {
      const newValue_age = inputField_age.value;
      if (newValue_age > 150) {
        messageDiv_age.innerText = "150살 이내로 작성하시오";
        modify_btn.disabled = true;
      } else {
        messageDiv_age.innerText = "";
        modify_btn.disabled = false;
      }
    });
  } else {
    // 수정 완료 상태
    const newValue = career.querySelector(`.modify_input${event}`).value;
    const newValue_name = name.querySelector(
      `.modify_input_name${event}`
    ).value;
    const newValue_age = age.querySelector(`.modify_input_age${event}`).value;

    //innerHTML 수정
    career.innerHTML = `<div>${newValue}</div>`;
    name.innerHTML = `<div>${newValue_name}</div>`;
    age.innerHTML = `<div>${newValue_age}</div>`;

    //버튼 수정
    modify_btn.innerHTML = "<div>수정</div>";

    //localStorge
    let new_data = data_map.map((element) => {
      //console.log("ele id", typeof element._id);
      //console.log("event", typeof event);
      //console.log("element 이전", element);
      if (Number(element._id) === event) {
        return {
          ...element,
          name: newValue_name,
          career: newValue,
          age: newValue_age,
        };
      } else {
        return {
          ...element,
        };
      }
      //console.log("element 이후", element);
    });
    data_map = new_data;
    console.log(new_data);
    window.localStorage.setItem("_data", JSON.stringify(new_data));
  }
}

//삭제 버튼 클릭 함수
function delete_fuc(event) {
  console.log("event", event); // 해당 행의 id값 반환

  const new_data = data_map.filter((item) => Number(item._id) !== event);

  data_map = new_data;
  const del = document.getElementById(`delete_${event}`);
  del.parentNode.parentNode.remove(del);

  window.localStorage.setItem("_data", JSON.stringify(new_data));
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
