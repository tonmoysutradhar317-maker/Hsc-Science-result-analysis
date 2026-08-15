const subjects = [
  {id:"bangla", name:"বাংলা", parts:[["বাংলা ১ম — MCQ",30],["বাংলা ১ম — CQ",70],["বাংলা ২য় — Written",100]], total:200},
  {id:"english", name:"English", parts:[["English ১ম — Written",100],["English ২য় — Written",100]], total:200},
  {id:"ict", name:"ICT", parts:[["MCQ",25],["CQ",50],["Practical",25]], total:100},
  {id:"physics", name:"পদার্থবিজ্ঞান", parts:[["MCQ",25],["CQ",50],["Practical",25]], total:100},
  {id:"chemistry", name:"রসায়ন", parts:[["MCQ",25],["CQ",50],["Practical",25]], total:100},
  {id:"higher_math", name:"উচ্চতর গণিত", parts:[["MCQ",25],["CQ",50],["Practical",25]], total:100},
  {id:"biology", name:"বায়োলজি", parts:[["MCQ",25],["CQ",50],["Practical",25]], total:100}
];

const gradeScale = [
  [80,5,"A+"],[70,4,"A"],[60,3.5,"A−"],[50,3,"B"],[40,2,"C"],[33,1,"D"],[0,0,"F"]
];

function getGrade(percent){
  for(const [min,gp,grade] of gradeScale){
    if(percent >= min) return {gp,grade};
  }
  return {gp:0,grade:"F"};
}
function clampNumber(v,max){
  let n = parseFloat(v);
  if(Number.isNaN(n)) return 0;
  return Math.min(Math.max(n,0),max);
}
function renderSubjects(){
  const wrap=document.getElementById("subjects");
  wrap.innerHTML=subjects.map(s=>{
    const hidden = s.id==="higher_math" || s.id==="biology" ? "" : "";
    return `<div class="subject" data-subject="${s.id}">
      <div class="subject-head">
        <span class="subject-name">${s.name}</span>
        <span class="subject-meta">Full Marks: ${s.total}</span>
      </div>
      <div class="inputs">
        ${s.parts.map((p,i)=>`<div class="input-wrap">
          <label>${p[0]} <span>/ ${p[1]}</span></label>
          <input type="number" min="0" max="${p[1]}" step="1" data-part="${i}" placeholder="0">
        </div>`).join("")}
      </div>
    </div>`;
  }).join("");
  document.querySelectorAll(".inputs input").forEach(inp=>inp.addEventListener("input", calculate));
}

function selectedOptional(){
  return document.querySelector('input[name="optional"]:checked').value;
}

function calculate(){
  const results=[];
  subjects.forEach(s=>{
    const box=document.querySelector(`[data-subject="${s.id}"]`);
    const inputs=[...box.querySelectorAll("input")];
    let total=0;
    inputs.forEach((input,i)=>{
      const max=s.parts[i][1];
      const raw=parseFloat(input.value);
      if(raw>max){input.classList.add("invalid")}else{input.classList.remove("invalid")}
      total += clampNumber(input.value,max);
    });
    const percent=(total/s.total)*100;
    const g=getGrade(percent);
    const passed=g.gp>0;
    results.push({...s,total,gp:g.gp,grade:g.grade,percent,passed});
  });

  const optional=selectedOptional();
  const main=results.filter(r=>r.id!=="higher_math"&&r.id!=="biology");
  const opt=results.find(r=>r.id===optional);
  const other=results.find(r=>r.id!==(optional));
  const sixMain=[...main,other];
  const allPassed=sixMain.every(r=>r.passed);
  const mainSum=sixMain.reduce((a,r)=>a+r.gp,0);
  const bonus=Math.max(0,opt.gp-2);
  const finalGpa=allPassed ? Math.min(5,(mainSum+bonus)/6) : 0;
  const finalGrade=finalGpa>=5?"A+":finalGpa>=4?"A":finalGpa>=3.5?"A−":finalGpa>=3?"B":finalGpa>=2?"C":finalGpa>=1?"D":"F";

  document.getElementById("finalGpa").textContent=finalGpa.toFixed(2);
  document.getElementById("heroGpa").textContent=finalGpa.toFixed(2);
  document.getElementById("finalGrade").textContent=allPassed ? finalGrade : "FAIL";
  document.getElementById("heroStatus").textContent=allPassed ? "Current estimate" : "এক বা একাধিক main subject-এ F";
  document.getElementById("mainSum").textContent=mainSum.toFixed(2);
  document.getElementById("optionalGpa").textContent=opt.gp.toFixed(2);
  document.getElementById("bonus").textContent=bonus.toFixed(2);
  document.getElementById("passedCount").textContent=`${sixMain.filter(r=>r.passed).length} / 6`;

  const warning=document.getElementById("warning");
  const fails=sixMain.filter(r=>!r.passed);
  if(fails.length){
    warning.classList.remove("hidden");
    warning.textContent=`⚠️ Main subject-এ F আছে: ${fails.map(x=>x.name).join(", ")}। Final result FAIL ধরা হয়েছে।`;
  }else{
    warning.classList.add("hidden");
  }

  document.getElementById("analysisTable").innerHTML=results.map(r=>{
    const isOpt=r.id===optional;
    return `<tr>
      <td>${r.name}${isOpt?' <small>(4th)</small>':''}</td>
      <td>${r.total.toFixed(0)} / ${r.total===200?200:100}</td>
      <td>${r.grade}</td>
      <td>${r.gp.toFixed(2)}</td>
      <td class="${r.passed?'status-pass':'status-fail'}">${r.passed?'PASS':'FAIL'}</td>
    </tr>`;
  }).join("");
}

document.querySelectorAll('input[name="optional"]').forEach(r=>{
  r.addEventListener("change",()=>{
    document.querySelectorAll(".option-card").forEach(x=>x.classList.remove("active"));
    r.closest(".option-card").classList.add("active");
    calculate();
  });
});

document.getElementById("resetBtn").addEventListener("click",()=>{
  document.querySelectorAll(".inputs input").forEach(i=>{i.value="";i.classList.remove("invalid")});
  document.querySelector('input[value="higher_math"]').checked=true;
  document.querySelectorAll(".option-card").forEach(x=>x.classList.remove("active"));
  document.querySelector('input[value="higher_math"]').closest(".option-card").classList.add("active");
  calculate();
});

renderSubjects();
calculate();
