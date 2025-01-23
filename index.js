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
let ls = window.localStorage.getItem("_data", data_map);
//버튼
const save_btn = document.getElementById("save");

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
          <div class="career${item._id}">${item.career}</div>
          <div class="inputNickname">${item.nickname}</div>
        <div>
          <button class="btnCor" index = ${index}>수정</button>
          <button class="btnDel" index = ${index}>삭제</button>
        </div>
      </div>
      `;
    })
    .join("");
}

//실시간 키보드 값 출력
function printId() {
  const content = document.getElementById("id_input").value;
  data_map.map((e) => {
    if (e._id === content) {
      document.getElementById("error_id").innerText =
        "동일한 id값을 입력하셨습니다";
      return false;
      //console.log("오류");
    } else {
      document.getElementById("error_id").innerText = "";
    }
  });
  return true;
}
function printAge() {
  const content = document.getElementById("age_input").value;
  if (content > 150) {
    document.getElementById("error_age").innerText = "150살 이하로 작성하시오.";
    return false;
  } else {
    document.getElementById("error_age").innerText = "";
    return true;
  }
}

function printCareer() {
  const content = document.getElementById("career_input").value;
  if (content.length < 15) {
    document.getElementById("error_career").innerText =
      "15자 이상으로 작성하시오.";
    return false;
  } else {
    document.getElementById("error_career").innerText = "";
    return true;
  }
}
function printNickName() {
  const content = document.getElementById("nickname_input").value;
  printNickName_den();
  data_map.map((e) => {
    console.log("e", typeof e.nickname, "content", typeof content);
    if (e.nickname == content) {
      document.getElementById("error_nickname").innerText =
        "별명을 중복 입력하셨습니다.";
    }
  });
}
function printNickName_den() {
  const content = document.getElementById("nickname_input").value;
  //console.log(content);
  if (content.length < 2) {
    document.getElementById("error_nickname").innerText =
      "2자 이상으로 입력하시오.";
    return false;
  } else {
    document.getElementById("error_nickname").innerText = "";
    return true;
  }
}

//잘못된 저장 확인 함수
function jugment(content, total) {
  //content -> infoData 현재 입력되 값 total -> data_map 전체 데이터 값
  //id 중복 판단
  if (id_arr.slice(0, id_arr.length - 1).includes(content._id)) {
    error_id.innerText = "아이디를 중복 입력하셨습니다.";
  } else {
    error_id.innerText = "";
  }
  //닉네임 중복 판단
  if (nick_arr.slice(0, nick_arr.length - 1).includes(content.nickname)) {
    error_nickname.innerText = "별명을 중복 입력하셨습니다.";
  } else if (nickname_input.value.length < 2) {
    error_nickname.innerText = "2자 이상으로 입력하시오.";
  } else {
    error_nickname.innerText = "";
  }

  if (content.career.length < 15) {
    error_career.innerText = "15자 이상으로 입력하시오.";
  } else {
    error_career.innerText = "";
  }

  if (parseInt(content.age) > 150) {
    error_age.innerText = "150살 이하로 작성하시오.";
  } else {
    error_age.innerText = "";
  }
  //로컬 스토리지에 저장된 값 삭제
  data_map.pop();
}

//나이 판단 함수
function age_judgment(content) {
  if (content > 150) {
    error_age.innerText = "150살 이하로 작성하시오.";
    return false;
  } else if (content === "") {
    return false;
  } else {
    error_age.innerText = "";
    return true;
  }
}
//경력 판단 함수
function career_judgment(content) {
  if (content.length < 15) {
    error_career.innerText = "15자 이상으로 입력하시오.";
    return false;
  } else {
    error_career.innerText = "";
    return true;
  }
}
//별명 판단 함수
function nickname_judgment(content, total) {
  for (let i of total) {
    console.log("total", i);
  }
  if (content.length < 2) {
    error_nickname.innerText = "2자 이상으로 입력하시오.";
    return false;
  } else {
    error_nickname.innerText = "";
    return true;
  }
}

//window 로드 이벤트
window.onload = function () {
  //save_btn.disabled = true; // 비활성화
  //버튼 클릭 이벤트
  save_btn.addEventListener("click", () => {
    let infoData = {
      _id: id_input.value,
      name: name_input.value,
      age: age_input.value,
      career: career_input.value,
      nickname: nickname_input.value,
    };
    id_arr.push(infoData._id);
    data_map.push(infoData);
    console.log("data_map", data_map);
    window.localStorage.setItem("_data", JSON.stringify(data_map));

    jugment(infoData, data_map);
    // id_jugment(infoData._id, data_map); //아이디 중복 확인
    // age_judgment(infoData.age); //나이 판단함수 true면 값 출력 fasle면 통과x
    // career_judgment(infoData.career); //경력 판단 함수 - 150자 판단
    // nickname_judgment(infoData.nickname, data_map); //별명 중복 확인

    //만약 하나라도 false일 경우 data_map 추가 안함
    // let jugment = [
    //   id_jugment(infoData._id, data_map),
    //   age_judgment(infoData.age),
    //   career_judgment(infoData.career),
    //   nickname_judgment(infoData.nickname, data_map),
    // ];
    // console.log("jugment", jugment);
    // let cnt = 0;
    // jugment.map((e) => {
    //   if (e === true) {
    //     cnt++;
    //   }
    // });

    // if (cnt === 4) {
    //   //모두 참인 경우

    // }

    //데이터 data_map에 push 후 해당 input 초기화
    id_input.value = "";
    name_input.value = "";
    age_input.value = "";
    career_input.value = "";
    nickname_input.value = "";

    //table에 행 달기
    dataPrint();

    //console.log(data_map);
  });

  dataPrint();

  //console.log("ls", JSON.parse(ls));
};
