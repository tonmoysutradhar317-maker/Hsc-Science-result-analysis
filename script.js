/*
===========================================
 HSC SCIENCE RESULT ANALYZER
 Designed & Developed by Tonmoy Sutradhar
===========================================
*/


/*
-------------------------------------------
 SUBJECT STRUCTURE
-------------------------------------------

Physics       = 1st + 2nd = 200
Chemistry     = 1st + 2nd = 200
Higher Math   = 1st + 2nd = 200
Biology       = 1st + 2nd = 200

Each paper:

MCQ        = 25
CQ         = 50
Practical  = 25

Total      = 100

*/


const subjects = [

  {
    id: "bangla",

    name: "বাংলা",

    papers: [

      {
        name: "বাংলা ১ম পত্র",

        parts: [
          ["MCQ", 30],
          ["CQ", 70]
        ]
      },

      {
        name: "বাংলা ২য় পত্র",

        parts: [
          ["Written", 100]
        ]
      }

    ]
  },


  {
    id: "english",

    name: "English",

    papers: [

      {
        name: "English ১ম পত্র",

        parts: [
          ["Written", 100]
        ]
      },

      {
        name: "English ২য় পত্র",

        parts: [
          ["Written", 100]
        ]
      }

    ]
  },


  {
    id: "ict",

    name: "ICT",

    papers: [

      {
        name: "ICT",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      }

    ]
  },


  {
    id: "physics",

    name: "পদার্থবিজ্ঞান",

    papers: [

      {
        name: "পদার্থবিজ্ঞান ১ম পত্র",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      },

      {
        name: "পদার্থবিজ্ঞান ২য় পত্র",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      }

    ]
  },


  {
    id: "chemistry",

    name: "রসায়ন",

    papers: [

      {
        name: "রসায়ন ১ম পত্র",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      },

      {
        name: "রসায়ন ২য় পত্র",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      }

    ]
  },


  {
    id: "higher_math",

    name: "উচ্চতর গণিত",

    papers: [

      {
        name: "উচ্চতর গণিত ১ম পত্র",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      },

      {
        name: "উচ্চতর গণিত ২য় পত্র",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      }

    ]
  },


  {
    id: "biology",

    name: "বায়োলজি",

    papers: [

      {
        name: "বায়োলজি ১ম পত্র",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      },

      {
        name: "বায়োলজি ২য় পত্র",

        parts: [
          ["MCQ", 25],
          ["CQ", 50],
          ["Practical", 25]
        ]
      }

    ]
  }

];



/*
-------------------------------------------
 GPA SCALE
-------------------------------------------
*/

const gradeScale = [

  [80, 5.00, "A+"],

  [70, 4.00, "A"],

  [60, 3.50, "A−"],

  [50, 3.00, "B"],

  [40, 2.00, "C"],

  [33, 1.00, "D"],

  [0, 0.00, "F"]

];



function getGrade(percent) {

  for (const grade of gradeScale) {

    if (percent >= grade[0]) {

      return {

        gpa: grade[1],

        grade: grade[2]

      };

    }

  }

  return {

    gpa: 0,

    grade: "F"

  };

}



/*
-------------------------------------------
 SAFE NUMBER
-------------------------------------------
*/

function getSafeNumber(value, max) {

  let number = parseFloat(value);

  if (Number.isNaN(number)) {

    return 0;

  }

  return Math.min(
    Math.max(number, 0),
    max
  );

}



/*
-------------------------------------------
 RENDER SUBJECTS
-------------------------------------------
*/

function renderSubjects() {

  const container =
    document.getElementById("subjects");


  container.innerHTML = "";


  subjects.forEach(subject => {

    const subjectBox =
      document.createElement("div");

    subjectBox.className = "subject";


    subjectBox.dataset.subject =
      subject.id;


    const fullMarks =
      subject.papers.length * 100;


    subjectBox.innerHTML = `

      <div class="subject-head">

        <span class="subject-name">

          ${subject.name}

        </span>

        <span class="subject-meta">

          Full Marks: ${fullMarks}

        </span>

      </div>

    `;


    subject.papers.forEach(
      (paper, paperIndex) => {

        const paperBox =
          document.createElement("div");

        paperBox.className =
          "paper-block";


        paperBox.innerHTML = `

          <div class="paper-title">

            ${paper.name}

            <span>
              100 Marks
            </span>

          </div>

          <div class="inputs"></div>

        `;


        const inputsContainer =
          paperBox.querySelector(".inputs");


        paper.parts.forEach(
          (part, partIndex) => {

            const wrapper =
              document.createElement("div");

            wrapper.className =
              "input-wrap";


            wrapper.innerHTML = `

              <label>

                ${part[0]}

                <span>
                  / ${part[1]}
                </span>

              </label>

              <input

                type="number"

                min="0"

                max="${part[1]}"

                step="1"

                placeholder="0"

                data-paper="${paperIndex}"

                data-part="${partIndex}"

              >

            `;


            inputsContainer.appendChild(
              wrapper
            );

          }

        );


        subjectBox.appendChild(
          paperBox
        );

      }

    );


    container.appendChild(
      subjectBox
    );

  });


  /*
  Add live calculation
  */

  document
    .querySelectorAll(
      ".inputs input"
    )
    .forEach(input => {

      input.addEventListener(
        "input",
        calculate
      );

    });

}



/*
-------------------------------------------
 GET OPTIONAL SUBJECT
-------------------------------------------
*/

function getOptionalSubject() {

  return document.querySelector(
    'input[name="optional"]:checked'
  ).value;

}



/*
-------------------------------------------
 CALCULATE
-------------------------------------------
*/

function calculate() {

  const results = [];


  subjects.forEach(subject => {

    const box =
      document.querySelector(
        `[data-subject="${subject.id}"]`
      );


    let totalMarks = 0;


    subject.papers.forEach(
      (paper, paperIndex) => {

        paper.parts.forEach(
          (part, partIndex) => {

            const input =
              box.querySelector(
                `input[data-paper="${paperIndex}"][data-part="${partIndex}"]`
              );


            const maxMarks =
              part[1];


            const value =
              getSafeNumber(
                input.value,
                maxMarks
              );


            /*
            Invalid mark indication
            */

            if (
              parseFloat(input.value) >
              maxMarks
            ) {

              input.classList.add(
                "invalid"
              );

            } else {

              input.classList.remove(
                "invalid"
              );

            }


            totalMarks += value;

          }
        );

      }
    );


    const fullMarks =
      subject.papers.length * 100;


    const percentage =
      (totalMarks / fullMarks) * 100;


    const result =
      getGrade(percentage);


    results.push({

      id: subject.id,

      name: subject.name,

      totalMarks,

      fullMarks,

      percentage,

      gpa: result.gpa,

      grade: result.grade,

      passed: result.gpa > 0

    });

  });



  /*
  -----------------------------------------
   OPTIONAL SUBJECT
  -----------------------------------------
  */

  const optional =
    getOptionalSubject();


  const optionalResult =
    results.find(
      result =>
        result.id === optional
    );


  /*
  -----------------------------------------
   MAIN SUBJECTS
  -----------------------------------------
  */

  const compulsorySubjects =
    results.filter(
      result =>
        result.id !== "higher_math" &&
        result.id !== "biology"
    );


  const otherScienceSubject =
    results.find(
      result =>
        (
          result.id === "higher_math" ||
          result.id === "biology"
        ) &&
        result.id !== optional
    );


  const mainSubjects = [

    ...compulsorySubjects,

    otherScienceSubject

  ];



  /*
  -----------------------------------------
   CHECK FAIL
  -----------------------------------------
  */

  const allMainPassed =
    mainSubjects.every(
      subject =>
        subject.passed
    );



  /*
  -----------------------------------------
   GPA SUM
  -----------------------------------------
  */

  const mainGpaSum =
    mainSubjects.reduce(
      (sum, subject) =>
        sum + subject.gpa,
      0
    );



  /*
  -----------------------------------------
   OPTIONAL BONUS

   GPA 5 → 3 bonus
   GPA 4 → 2 bonus
   GPA 3.5 → 1.5 bonus
   GPA 3 → 1 bonus
   GPA 2 → 0 bonus

  -----------------------------------------
  */

  const optionalBonus =
    Math.max(
      0,
      optionalResult.gpa - 2
    );



  /*
  -----------------------------------------
   FINAL GPA
  -----------------------------------------

   Main GPA sum + optional bonus
   divided by 6 main subjects.

  */

  const finalGpa =
    allMainPassed

      ? Math.min(
          5,
          (mainGpaSum + optionalBonus) / 6
        )

      : 0;



  /*
  -----------------------------------------
   FINAL GRADE
  -----------------------------------------
  */

  let finalGrade = "F";


  if (finalGpa >= 5) {

    finalGrade = "A+";

  }

  else if (finalGpa >= 4) {

    finalGrade = "A";

  }

  else if (finalGpa >= 3.5) {

    finalGrade = "A−";

  }

  else if (finalGpa >= 3) {

    finalGrade = "B";

  }

  else if (finalGpa >= 2) {

    finalGrade = "C";

  }

  else if (finalGpa >= 1) {

    finalGrade = "D";

  }



  /*
  -----------------------------------------
   UPDATE FINAL RESULT
  -----------------------------------------
  */

  document.getElementById(
    "finalGpa"
  ).textContent =
    finalGpa.toFixed(2);


  document.getElementById(
    "heroGpa"
  ).textContent =
    finalGpa.toFixed(2);


  document.getElementById(
    "finalGrade"
  ).textContent =
    allMainPassed
      ? finalGrade
      : "FAIL";


  document.getElementById(
    "heroStatus"
  ).textContent =
    allMainPassed
      ? "Current Estimate"
      : "Main Subject-এ F আছে";


  document.getElementById(
    "mainSum"
  ).textContent =
    mainGpaSum.toFixed(2);


  document.getElementById(
    "optionalGpa"
  ).textContent =
    optionalResult.gpa.toFixed(2);


  document.getElementById(
    "bonus"
  ).textContent =
    optionalBonus.toFixed(2);


  document.getElementById(
    "passedCount"
  ).textContent =
    `${mainSubjects.filter(
      subject => subject.passed
    ).length} / 6`;



  /*
  -----------------------------------------
   WARNING
  -----------------------------------------
  */

  const warning =
    document.getElementById(
      "warning"
    );


  const failedSubjects =
    mainSubjects.filter(
      subject =>
        !subject.passed
    );


  if (failedSubjects.length > 0) {

    warning.classList.remove(
      "hidden"
    );


    warning.textContent =
      `⚠️ Main subject-এ F আছে: ${
        failedSubjects
          .map(subject => subject.name)
          .join(", ")
      }`;

  }

  else {

    warning.classList.add(
      "hidden"
    );

  }



  /*
  -----------------------------------------
   SUBJECT TABLE
  -----------------------------------------
  */

  const table =
    document.getElementById(
      "analysisTable"
    );


  table.innerHTML = "";


  results.forEach(result => {

    const row =
      document.createElement("tr");


    const isOptional =
      result.id === optional;


    row.innerHTML = `

      <td>

        ${result.name}

        ${
          isOptional
            ? "<small>(4th Subject)</small>"
            : ""
        }

      </td>

      <td>

        ${result.totalMarks.toFixed(0)}
        /
        ${result.fullMarks}

      </td>

      <td>

        ${result.grade}

      </td>

      <td>

        ${result.gpa.toFixed(2)}

      </td>

      <td class="${
        result.passed
          ? "status-pass"
          : "status-fail"
      }">

        ${
          result.passed
            ? "PASS"
            : "FAIL"
        }

      </td>

    `;


    table.appendChild(row);

  });

}



/*
-------------------------------------------
 OPTIONAL SUBJECT CHANGE
-------------------------------------------
*/

document
  .querySelectorAll(
    'input[name="optional"]'
  )
  .forEach(radio => {

    radio.addEventListener(
      "change",
      () => {

        document
          .querySelectorAll(
            ".option-card"
          )
          .forEach(card => {

            card.classList.remove(
              "active"
            );

          });


        radio
          .closest(".option-card")
          .classList.add("active");


        calculate();

      }
    );

  });



/*
-------------------------------------------
 RESET
-------------------------------------------
*/

document
  .getElementById("resetBtn")
  .addEventListener(
    "click",
    () => {

      document
        .querySelectorAll(
          ".inputs input"
        )
        .forEach(input => {

          input.value = "";

          input.classList.remove(
            "invalid"
          );

        });


      document.querySelector(
        'input[value="higher_math"]'
      ).checked = true;


      document
        .querySelectorAll(
          ".option-card"
        )
        .forEach(card => {

          card.classList.remove(
            "active"
          );

        });


      document
        .querySelector(
          'input[value="higher_math"]'
        )
        .closest(
          ".option-card"
        )
        .classList.add(
          "active"
        );


      calculate();

    }
  );



/*
-------------------------------------------
 INITIALIZE
-------------------------------------------
*/

renderSubjects();

calculate();          <label>${p[0]} <span>/ ${p[1]}</span></label>
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
