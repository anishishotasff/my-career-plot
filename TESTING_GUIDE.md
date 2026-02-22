# Testing Guide - CareerPilot AI

## 🧪 Manual Testing Checklist

### Prerequisites
- Backend running on http://localhost:5000
- Frontend running on http://localhost:5173
- Valid OpenAI API key configured

## 1️⃣ Landing Page Test

### Steps:
1. Open http://localhost:5173
2. Verify page loads with hero section
3. Check "Get Started" button is visible
4. Click "Get Started" → Should navigate to profile form

### Expected Results:
- ✅ Smooth animations on load
- ✅ Responsive design on mobile/tablet/desktop
- ✅ Navigation works correctly
- ✅ Dark theme applied

---

## 2️⃣ Profile Form Test

### Test Case 1: Valid Input
**Steps:**
1. Fill in all fields:
   - Skills: JavaScript, React, Node.js
   - Interests: Web Development, AI
   - Education: Bachelor's Degree
   - Work Type: Remote
   - Salary: 6-10 LPA
   - Location: India
2. Click "Analyze Career Paths"

**Expected Results:**
- ✅ Loading spinner appears
- ✅ Redirects to dashboard after 5-10 seconds
- ✅ Shows 3 career matches

### Test Case 2: Empty Fields
**Steps:**
1. Leave fields empty
2. Click "Analyze Career Paths"

**Expected Results:**
- ✅ Form validation errors appear
- ✅ Required fields highlighted
- ✅ No API call made

### Test Case 3: Skill Tags
**Steps:**
1. Type "Python" and press Enter
2. Type "Machine Learning" and press Enter
3. Click X on "Python" tag

**Expected Results:**
- ✅ Tags appear as chips
- ✅ Tags can be removed
- ✅ Input clears after adding tag

---

## 3️⃣ Dashboard Test

### Test Case 1: Career Cards Display
**Steps:**
1. Complete profile form
2. Wait for dashboard to load

**Expected Results:**
- ✅ 3 career cards displayed
- ✅ Match percentage shown (0-100%)
- ✅ Market demand badge (Green/Yellow/Red)
- ✅ Automation risk indicator
- ✅ Entry salary displayed
- ✅ 5-year projection shown
- ✅ Required skills listed
- ✅ Skill gap highlighted

### Test Case 2: View Roadmap
**Steps:**
1. Click "View Roadmap" on any career card

**Expected Results:**
- ✅ Loading spinner appears
- ✅ Navigates to roadmap page
- ✅ Roadmap data loads

### Test Case 3: Responsive Design
**Steps:**
1. Resize browser window
2. Test on mobile viewport (375px)
3. Test on tablet viewport (768px)

**Expected Results:**
- ✅ Cards stack vertically on mobile
- ✅ Text remains readable
- ✅ No horizontal scroll

---

## 4️⃣ Roadmap View Test

### Test Case 1: Roadmap Display
**Steps:**
1. View roadmap from dashboard

**Expected Results:**
- ✅ Career name displayed
- ✅ 3 phases shown (0-3, 3-6, 6-12 months)
- ✅ Each phase has:
  - Duration
  - Focus area
  - Skills list
  - Resources list
- ✅ Certifications section
- ✅ Project ideas section (3 projects)

### Test Case 2: Navigation
**Steps:**
1. Click "Back to Dashboard"

**Expected Results:**
- ✅ Returns to dashboard
- ✅ Career data still visible

---

## 5️⃣ Resume Analyzer Test

### Test Case 1: Valid Resume
**Steps:**
1. Navigate to Resume Analyzer
2. Enter target career: "Data Scientist"
3. Paste resume text (100+ words)
4. Click "Analyze Resume"

**Expected Results:**
- ✅ Loading spinner appears
- ✅ Results display after 5-10 seconds
- ✅ ATS score shown (0-100)
- ✅ Detected skills listed
- ✅ Missing skills listed
- ✅ Keyword suggestions provided
- ✅ Improvement points listed

### Test Case 2: Empty Resume
**Steps:**
1. Leave resume text empty
2. Click "Analyze Resume"

**Expected Results:**
- ✅ Validation error appears
- ✅ No API call made

### Test Case 3: Score Visualization
**Steps:**
1. Analyze a resume
2. Check ATS score display

**Expected Results:**
- ✅ Score shown as percentage
- ✅ Color coding:
  - Green: 70-100
  - Yellow: 40-69
  - Red: 0-39

---

## 6️⃣ API Endpoint Tests

### Using cURL or Postman

#### Test Career Analysis
```bash
curl -X POST http://localhost:5000/api/career \
  -H "Content-Type: application/json" \
  -d '{
    "skills": ["JavaScript", "React"],
    "interests": ["Web Development"],
    "education": "Bachelor'\''s Degree",
    "workType": "Remote",
    "salaryExpectation": "6-10 LPA",
    "location": "India"
  }'
```

**Expected Response:**
```json
{
  "career_matches": [
    {
      "career_name": "Full Stack Developer",
      "match_percentage": 85,
      "why_match": "...",
      "required_skills": [...],
      "skill_gap": [...],
      "entry_salary_india": "6-8 LPA",
      "five_year_projection": "15-25 LPA",
      "market_demand": "High",
      "automation_risk": "Low"
    }
  ]
}
```

#### Test Roadmap Generation
```bash
curl -X POST http://localhost:5000/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{"careerName": "Full Stack Developer"}'
```

#### Test Resume Analysis
```bash
curl -X POST http://localhost:5000/api/resume \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "Experienced software developer...",
    "targetCareer": "Data Scientist"
  }'
```

---

## 7️⃣ Error Handling Tests

### Test Case 1: Invalid API Key
**Steps:**
1. Set invalid OPENAI_API_KEY in backend/.env
2. Try to analyze career

**Expected Results:**
- ✅ Error message displayed
- ✅ User-friendly error (not technical stack trace)
- ✅ Suggestion to check API key

### Test Case 2: Network Error
**Steps:**
1. Stop backend server
2. Try to submit profile form

**Expected Results:**
- ✅ Error message: "Unable to connect to server"
- ✅ No crash
- ✅ Form data preserved

### Test Case 3: Rate Limiting
**Steps:**
1. Make 100+ requests in 15 minutes

**Expected Results:**
- ✅ 429 status code
- ✅ Error message: "Too many requests"
- ✅ Retry after message

---

## 8️⃣ Performance Tests

### Test Case 1: Response Time
**Metrics:**
- Career analysis: < 15 seconds
- Roadmap generation: < 10 seconds
- Resume analysis: < 12 seconds

### Test Case 2: UI Responsiveness
**Metrics:**
- Page load: < 2 seconds
- Navigation: < 500ms
- Animations: 60fps

---

## 9️⃣ Browser Compatibility

Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 🔟 Mobile Testing

Test on:
- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ Tablet (iPad/Android)

---

## 🐛 Common Issues & Solutions

### Issue: "OpenAI API Error"
**Solution:** Check API key in backend/.env

### Issue: "CORS Error"
**Solution:** Verify FRONTEND_URL in backend/.env matches frontend URL

### Issue: "Port already in use"
**Solution:** 
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Issue: "Module not found"
**Solution:** Run `npm install` in both backend and frontend

---

## ✅ Pre-Deployment Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables configured
- [ ] API responses are JSON (no markdown)
- [ ] Error handling works
- [ ] Loading states display correctly
- [ ] Responsive on all devices
- [ ] Rate limiting tested
- [ ] Security headers present
- [ ] Documentation complete

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

Landing Page:        [ ] Pass  [ ] Fail
Profile Form:        [ ] Pass  [ ] Fail
Dashboard:           [ ] Pass  [ ] Fail
Roadmap View:        [ ] Pass  [ ] Fail
Resume Analyzer:     [ ] Pass  [ ] Fail
API Endpoints:       [ ] Pass  [ ] Fail
Error Handling:      [ ] Pass  [ ] Fail
Performance:         [ ] Pass  [ ] Fail
Browser Compat:      [ ] Pass  [ ] Fail
Mobile:              [ ] Pass  [ ] Fail

Notes:
_________________________________
_________________________________
```

---

Happy Testing! 🚀
