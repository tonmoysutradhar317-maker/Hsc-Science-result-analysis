# HSC Science Result Analyzer

একটি responsive HSC Science Group result/GPA analyzer।

## Features
- বাংলা ১ম + ২য় = এক subject
- English ১ম + ২য় = এক subject
- ICT: 25 MCQ + 50 CQ + 25 Practical
- Physics/Chemistry/Higher Math/Biology: 25 MCQ + 50 CQ + 25 Practical
- Higher Math অথবা Biology কে Optional/4th Subject নির্বাচন
- Optional bonus = Optional GPA − 2, minimum 0
- Main 6 subjects-এর GPA + optional bonus দিয়ে final GPA
- Main subject-এ F থাকলে final result FAIL
- Responsive mobile UI
- Live calculation
- Reset button

## Run
index.html ফাইলটি browser-এ খুললেই চলবে।

## Important
এই project-এ user-provided grading rules ব্যবহার করা হয়েছে:
80–100 = A+ (5.00), 70–79 = A (4.00), 60–69 = A− (3.50), 50–59 = B (3.00), 40–49 = C (2.00), 33–39 = D (1.00), 0–32 = F (0.00)।

বোর্ডের official rule বা কোনো subject-specific pass rule পরিবর্তিত হলে script.js-এর gradeScale/validation অংশ আপডেট করতে হবে।
