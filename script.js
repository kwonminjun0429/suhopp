const dictionary = [

];

const dictionaryDiv = document.getElementById("dictionary");
const searchInput = document.getElementById("search");
const newTermInput = document.getElementById("newTerm");
const newDescInput = document.getElementById("newDesc");
const addBtn = document.getElementById("addBtn");
const deleteSelectedBtn = document.getElementById("deleteSelectedBtn");

let deleteMode = false; // 삭제 모드 토글용

function renderDictionary(list) {
  dictionaryDiv.innerHTML = "";
  list.forEach((item, index) => {
    const termDiv = document.createElement("div");
    termDiv.className = "term";

    // 체크박스 생성
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "term-checkbox";
    checkbox.dataset.index = index;
    if (deleteMode) {
      checkbox.classList.add("show");
    }

    // 제목 div
    const termName = document.createElement("div");
    termName.className = "term-name";
    termName.textContent = item.term;

    // 설명 div
    const termDesc = document.createElement("div");
    termDesc.className = "term-desc";
    termDesc.textContent = item.desc;

    termDiv.appendChild(checkbox);
    termDiv.appendChild(termName);
    termDiv.appendChild(termDesc);

    dictionaryDiv.appendChild(termDiv);

    // 제목 클릭 시 설명 토글 (삭제모드일땐 비활성)
    termName.addEventListener("click", () => {
      if (!deleteMode) {
        termDesc.classList.toggle("open");
      }
    });
  });
}

function filterDictionary() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filtered = dictionary.filter(item =>
    item.term.toLowerCase().includes(keyword)
  );
  renderDictionary(filtered);
}

function addNewTerm() {
  const term = newTermInput.value.trim();
  const desc = newDescInput.value.trim();
  if (!term || !desc) {
    alert("제목과 설명을 모두 입력해주세요.");
    return;
  }
  dictionary.push({ term, desc });
  newTermInput.value = "";
  newDescInput.value = "";
  filterDictionary();
}

function toggleDeleteMode() {
  if (!deleteMode) {
    // 삭제 모드 시작: 체크박스 보이고 버튼 텍스트 변경
    deleteMode = true;
    deleteSelectedBtn.textContent = "선택 삭제";
  } else {
    // 삭제 모드 중 다시 눌렀을 때: 선택된 항목 삭제
    const checkedBoxes = document.querySelectorAll(".term-checkbox:checked");
    if (checkedBoxes.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }

    const indexes = Array.from(checkedBoxes).map(cb => parseInt(cb.dataset.index));
    indexes.sort((a,b) => b - a);
    indexes.forEach(i => dictionary.splice(i, 1));

    deleteMode = false;
    deleteSelectedBtn.textContent = "삭제";
  }
  filterDictionary();
}

// 이벤트 등록
searchInput.addEventListener("input", filterDictionary);
addBtn.addEventListener("click", addNewTerm);
deleteSelectedBtn.addEventListener("click", toggleDeleteMode);

// 초기 렌더링
renderDictionary(dictionary);
