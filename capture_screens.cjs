const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const outputDir = path.join(__dirname, 'presentation_assets', 'screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Login Page
  console.log('Capturing Login page...');
  await page.goto('http://localhost:5175/login', { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '01_login_page.png') });

  // 2. Employee Dashboard
  console.log('Capturing Employee Dashboard...');
  await page.evaluate(() => {
    localStorage.setItem('role', 'employee');
    localStorage.setItem('email', 'employee@demo.com');
  });
  await page.goto('http://localhost:5175/employee/dashboard', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '02_employee_dashboard.png') });

  // 3. Employee Leave Form
  console.log('Capturing Apply Leave Form...');
  await page.goto('http://localhost:5175/employee/leave/apply', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '03_leave_form.png') });

  // 4. Employee Payslips (Output / Result Page)
  console.log('Capturing Payslips Output Result...');
  await page.goto('http://localhost:5175/employee/payslips', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '04_payslip_result.png') });

  // 5. Admin Dashboard
  console.log('Capturing Admin Dashboard...');
  await page.evaluate(() => {
    localStorage.setItem('role', 'admin');
    localStorage.setItem('email', 'admin@demo.com');
  });
  await page.goto('http://localhost:5175/admin/dashboard', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '05_admin_dashboard.png') });

  // 6. Interactive Org Chart
  console.log('Capturing Org Chart...');
  await page.goto('http://localhost:5175/admin/orgchart', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '06_org_chart.png') });

  // 7. Admin Employees Directory / Table
  console.log('Capturing Admin Employee Management...');
  await page.goto('http://localhost:5175/admin/employees', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '07_admin_employees.png') });

  // 8. Admin Payroll
  console.log('Capturing Admin Payroll...');
  await page.goto('http://localhost:5175/admin/payroll', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, '08_admin_payroll.png') });

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
