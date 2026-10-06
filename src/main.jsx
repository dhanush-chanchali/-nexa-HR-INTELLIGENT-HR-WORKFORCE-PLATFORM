import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  Clock3,
  WalletCards,
  FileText,
  Target,
  Receipt,
  FolderOpen,
  UserRound,
  Megaphone,
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  Plus,
  Check,
  XCircle,
  ArrowUpRight,
  BriefcaseBusiness,
  BarChart3,
  ClipboardList,
  UserPlus,
  Building2,
  ShieldCheck,
  Download,
  Eye,
  MoreHorizontal,
  Sparkles,
  CircleHelp,
  Play,
  Send,
} from "lucide-react";

// Org hierarchy: 1 Director → 6 Managers (one per dept) → 53 Employees = 60 total
const employeesSeed = [
  // ── DIRECTOR (reports to nobody)
  { id: "EMP-1001", name: "Melinda Laiphangbam", email: "melinda.laiphangbam@company.com", department: "Executive",   designation: "Director",                    location: "Bangalore", salary: 350000, status: "Active", role: "director",  reportsTo: null,      phone: "+91 90000 10001" },

  // ── MANAGERS (each reports to Director EMP-1001)
  { id: "EMP-1010", name: "Arjun Mehta",      email: "arjun.mehta@company.com",      department: "Engineering", designation: "Engineering Manager",          location: "Hyderabad", salary: 180000, status: "Active", role: "manager",  reportsTo: "EMP-1001", phone: "+91 90000 10010" },
  { id: "EMP-1020", name: "Priya Nair",       email: "priya.nair@company.com",       department: "Sales",       designation: "Sales Manager",               location: "Delhi",     salary: 145000, status: "Active", role: "manager",  reportsTo: "EMP-1001", phone: "+91 90000 10020" },
  { id: "EMP-1030", name: "Sneha Reddy",      email: "sneha.reddy@company.com",      department: "HR",          designation: "HR Manager",                  location: "Hyderabad", salary: 130000, status: "Active", role: "manager",  reportsTo: "EMP-1001", phone: "+91 90000 10030" },
  { id: "EMP-1040", name: "Rohan Gupta",      email: "rohan.gupta@company.com",      department: "Finance",     designation: "Finance Manager",             location: "Mumbai",    salary: 160000, status: "Active", role: "manager",  reportsTo: "EMP-1001", phone: "+91 90000 10040" },
  { id: "EMP-1050", name: "Meera Iyer",       email: "meera.iyer@company.com",       department: "Marketing",   designation: "Marketing Manager",           location: "Bangalore", salary: 140000, status: "Active", role: "manager",  reportsTo: "EMP-1001", phone: "+91 90000 10050" },
  { id: "EMP-1060", name: "Sanjay Kapoor",    email: "sanjay.kapoor@company.com",    department: "Operations",  designation: "Operations Manager",          location: "Pune",      salary: 150000, status: "Active", role: "manager",  reportsTo: "EMP-1001", phone: "+91 90000 10060" },

  // ── ENGINEERING (reports to Arjun Mehta EMP-1010)
  { id: "EMP-1011", name: "Ashish",           email: "ashish@company.com",           department: "Engineering", designation: "Senior Software Engineer",    location: "Hyderabad", salary: 95000,  status: "Active", role: "employee", reportsTo: "EMP-1010", phone: "+91 98765 43210" },
  { id: "EMP-1012", name: "Kavya Patel",      email: "kavya.patel@company.com",      department: "Engineering", designation: "Software Engineer",           location: "Hyderabad", salary: 72000,  status: "Active", role: "employee", reportsTo: "EMP-1010" },
  { id: "EMP-1013", name: "Aditya Kumar",     email: "aditya.kumar@company.com",     department: "Engineering", designation: "DevOps Engineer",             location: "Pune",      salary: 88000,  status: "Active", role: "employee", reportsTo: "EMP-1010" },
  { id: "EMP-1014", name: "Vikram Rao",       email: "vikram.rao@company.com",       department: "Engineering", designation: "Principal Engineer",          location: "Hyderabad", salary: 145000, status: "Active", role: "employee", reportsTo: "EMP-1010" },
  { id: "EMP-1015", name: "Tanvi Joshi",      email: "tanvi.joshi@company.com",      department: "Engineering", designation: "QA Engineer",                 location: "Pune",      salary: 65000,  status: "Active", role: "employee", reportsTo: "EMP-1010" },
  { id: "EMP-1016", name: "Deepak Verma",     email: "deepak.verma@company.com",     department: "Engineering", designation: "Backend Engineer",            location: "Bangalore", salary: 82000,  status: "Active", role: "employee", reportsTo: "EMP-1010" },
  { id: "EMP-1017", name: "Nisha Choudhary",  email: "nisha.choudhary@company.com",  department: "Engineering", designation: "Frontend Engineer",           location: "Hyderabad", salary: 76000,  status: "Active", role: "employee", reportsTo: "EMP-1010" },
  { id: "EMP-1018", name: "Kiran Desai",      email: "kiran.desai@company.com",      department: "Engineering", designation: "Data Engineer",               location: "Mumbai",    salary: 90000,  status: "Active", role: "employee", reportsTo: "EMP-1010" },
  { id: "EMP-1019", name: "Pooja Sharma",     email: "pooja.sharma@company.com",     department: "Engineering", designation: "Software Engineer",           location: "Bangalore", salary: 69000,  status: "Active", role: "employee", reportsTo: "EMP-1010" },

  // ── SALES (reports to Priya Nair EMP-1020)
  { id: "EMP-1021", name: "Ravi Shankar",     email: "ravi.shankar@company.com",     department: "Sales",       designation: "Senior Sales Executive",     location: "Delhi",     salary: 78000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },
  { id: "EMP-1022", name: "Ananya Singh",     email: "ananya.singh@company.com",     department: "Sales",       designation: "Sales Executive",            location: "Delhi",     salary: 60000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },
  { id: "EMP-1023", name: "Mohit Batra",      email: "mohit.batra@company.com",      department: "Sales",       designation: "Account Manager",            location: "Mumbai",    salary: 72000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },
  { id: "EMP-1024", name: "Sunita Rao",       email: "sunita.rao@company.com",       department: "Sales",       designation: "Sales Executive",            location: "Hyderabad", salary: 58000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },
  { id: "EMP-1025", name: "Prakash Jain",     email: "prakash.jain@company.com",     department: "Sales",       designation: "Key Account Executive",      location: "Bangalore", salary: 68000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },
  { id: "EMP-1026", name: "Geeta Menon",      email: "geeta.menon@company.com",      department: "Sales",       designation: "Inside Sales Rep",           location: "Chennai",   salary: 55000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },
  { id: "EMP-1027", name: "Harsh Agarwal",    email: "harsh.agarwal@company.com",    department: "Sales",       designation: "Business Development Exec",  location: "Delhi",     salary: 63000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },
  { id: "EMP-1028", name: "Divya Pillai",     email: "divya.pillai@company.com",     department: "Sales",       designation: "Sales Analyst",              location: "Bangalore", salary: 61000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },
  { id: "EMP-1029", name: "Sameer Khan",      email: "sameer.khan@company.com",      department: "Sales",       designation: "Regional Sales Rep",         location: "Delhi",     salary: 66000,  status: "Active", role: "employee", reportsTo: "EMP-1020" },

  // ── HR (reports to Sneha Reddy EMP-1030)
  { id: "EMP-1031", name: "Preethi Nair",     email: "preethi.nair@company.com",     department: "HR",          designation: "HR Business Partner",        location: "Hyderabad", salary: 72000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },
  { id: "EMP-1032", name: "Akash Tripathi",   email: "akash.tripathi@company.com",   department: "HR",          designation: "Recruiter",                  location: "Bangalore", salary: 58000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },
  { id: "EMP-1033", name: "Lavanya Subramani",email: "lavanya.subramani@company.com", department: "HR",          designation: "L&D Specialist",             location: "Chennai",   salary: 65000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },
  { id: "EMP-1034", name: "Nikhil Pandey",    email: "nikhil.pandey@company.com",    department: "HR",          designation: "Payroll Specialist",         location: "Mumbai",    salary: 60000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },
  { id: "EMP-1035", name: "Bhavna Chauhan",   email: "bhavna.chauhan@company.com",   department: "HR",          designation: "HR Coordinator",             location: "Delhi",     salary: 52000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },
  { id: "EMP-1036", name: "Tarun Mathur",     email: "tarun.mathur@company.com",     department: "HR",          designation: "Talent Acquisition Spec",    location: "Hyderabad", salary: 63000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },
  { id: "EMP-1037", name: "Simran Kaur",      email: "simran.kaur@company.com",      department: "HR",          designation: "Employee Relations Spec",    location: "Bangalore", salary: 61000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },
  { id: "EMP-1038", name: "Rajesh Iyer",      email: "rajesh.iyer@company.com",      department: "HR",          designation: "HR Generalist",              location: "Chennai",   salary: 57000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },
  { id: "EMP-1039", name: "Poonam Srivastava",email: "poonam.srivastava@company.com", department: "HR",          designation: "HRIS Analyst",               location: "Mumbai",    salary: 68000,  status: "Active", role: "employee", reportsTo: "EMP-1030" },

  // ── FINANCE (reports to Rohan Gupta EMP-1040)
  { id: "EMP-1041", name: "Ankit Sharma",     email: "ankit.sharma@company.com",     department: "Finance",     designation: "Senior Financial Analyst",   location: "Mumbai",    salary: 95000,  status: "Active", role: "employee", reportsTo: "EMP-1040" },
  { id: "EMP-1042", name: "Swati Dubey",      email: "swati.dubey@company.com",      department: "Finance",     designation: "Financial Analyst",          location: "Mumbai",    salary: 72000,  status: "Active", role: "employee", reportsTo: "EMP-1040" },
  { id: "EMP-1043", name: "Manish Sood",      email: "manish.sood@company.com",      department: "Finance",     designation: "Accountant",                 location: "Delhi",     salary: 65000,  status: "Active", role: "employee", reportsTo: "EMP-1040" },
  { id: "EMP-1044", name: "Rupal Kothari",    email: "rupal.kothari@company.com",    department: "Finance",     designation: "Tax Analyst",                location: "Mumbai",    salary: 68000,  status: "Active", role: "employee", reportsTo: "EMP-1040" },
  { id: "EMP-1045", name: "Varun Sethi",      email: "varun.sethi@company.com",      department: "Finance",     designation: "Budget Analyst",             location: "Hyderabad", salary: 70000,  status: "Active", role: "employee", reportsTo: "EMP-1040" },
  { id: "EMP-1046", name: "Pooja Bansal",     email: "pooja.bansal@company.com",     department: "Finance",     designation: "Accounts Payable Spec",      location: "Delhi",     salary: 58000,  status: "Active", role: "employee", reportsTo: "EMP-1040" },
  { id: "EMP-1047", name: "Sumit Goel",       email: "sumit.goel@company.com",       department: "Finance",     designation: "Financial Controller",       location: "Mumbai",    salary: 110000, status: "Active", role: "employee", reportsTo: "EMP-1040" },
  { id: "EMP-1048", name: "Asha Mehta",       email: "asha.mehta@company.com",       department: "Finance",     designation: "Compliance Analyst",         location: "Bangalore", salary: 73000,  status: "Active", role: "employee", reportsTo: "EMP-1040" },
  { id: "EMP-1049", name: "Girish Joshi",     email: "girish.joshi@company.com",     department: "Finance",     designation: "Investment Analyst",         location: "Mumbai",    salary: 85000,  status: "Active", role: "employee", reportsTo: "EMP-1040" },

  // ── MARKETING (reports to Meera Iyer EMP-1050)
  { id: "EMP-1051", name: "Ritu Ahuja",       email: "ritu.ahuja@company.com",       department: "Marketing",   designation: "Brand Strategist",           location: "Bangalore", salary: 82000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },
  { id: "EMP-1052", name: "Yash Malhotra",    email: "yash.malhotra@company.com",    department: "Marketing",   designation: "Digital Marketing Spec",     location: "Delhi",     salary: 68000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },
  { id: "EMP-1053", name: "Sakshi Agrawal",   email: "sakshi.agrawal@company.com",   department: "Marketing",   designation: "Content Writer",             location: "Bangalore", salary: 55000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },
  { id: "EMP-1054", name: "Tushar Bose",      email: "tushar.bose@company.com",      department: "Marketing",   designation: "SEO Specialist",             location: "Kolkata",   salary: 60000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },
  { id: "EMP-1055", name: "Anjali Tiwari",    email: "anjali.tiwari@company.com",    department: "Marketing",   designation: "Social Media Manager",       location: "Bangalore", salary: 63000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },
  { id: "EMP-1056", name: "Kunal Malviya",    email: "kunal.malviya@company.com",    department: "Marketing",   designation: "Growth Marketer",            location: "Delhi",     salary: 72000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },
  { id: "EMP-1057", name: "Neha Bajaj",       email: "neha.bajaj@company.com",       department: "Marketing",   designation: "Marketing Analyst",          location: "Mumbai",    salary: 65000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },
  { id: "EMP-1058", name: "Ronak Shah",       email: "ronak.shah@company.com",       department: "Marketing",   designation: "Performance Marketer",       location: "Bangalore", salary: 70000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },
  { id: "EMP-1059", name: "Kriti Sood",       email: "kriti.sood@company.com",       department: "Marketing",   designation: "PR Specialist",              location: "Delhi",     salary: 67000,  status: "Active", role: "employee", reportsTo: "EMP-1050" },

  // ── OPERATIONS (reports to Sanjay Kapoor EMP-1060)
  { id: "EMP-1061", name: "Ashwin Pillai",    email: "ashwin.pillai@company.com",    department: "Operations",  designation: "Operations Analyst",         location: "Pune",      salary: 68000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
  { id: "EMP-1062", name: "Rekha Bhatt",      email: "rekha.bhatt@company.com",      department: "Operations",  designation: "Supply Chain Specialist",    location: "Pune",      salary: 72000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
  { id: "EMP-1063", name: "Vijay Naidu",      email: "vijay.naidu@company.com",      department: "Operations",  designation: "Logistics Coordinator",      location: "Chennai",   salary: 60000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
  { id: "EMP-1064", name: "Chitra Raj",       email: "chitra.raj@company.com",       department: "Operations",  designation: "Process Improvement Spec",   location: "Hyderabad", salary: 75000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
  { id: "EMP-1065", name: "Pavan Rajan",      email: "pavan.rajan@company.com",      department: "Operations",  designation: "Facilities Manager",         location: "Bangalore", salary: 78000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
  { id: "EMP-1066", name: "Shreya Nanda",     email: "shreya.nanda@company.com",     department: "Operations",  designation: "Vendor Relations Exec",      location: "Pune",      salary: 63000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
  { id: "EMP-1067", name: "Abhinav Mishra",   email: "abhinav.mishra@company.com",   department: "Operations",  designation: "Operations Coordinator",     location: "Delhi",     salary: 58000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
  { id: "EMP-1068", name: "Tara Singh",       email: "tara.singh@company.com",       department: "Operations",  designation: "Quality Analyst",            location: "Pune",      salary: 65000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
  { id: "EMP-1069", name: "Monu Arora",       email: "monu.arora@company.com",       department: "Operations",  designation: "Business Ops Analyst",       location: "Hyderabad", salary: 70000,  status: "Active", role: "employee", reportsTo: "EMP-1060" },
];

const leaveSeed = [
  { id: "LR-2082", employee: "Ashish",         type: "Casual Leave",  from: "2026-10-05", to: "2026-10-05", days: 1, reason: "Family errand",             status: "Approved" },
  { id: "LR-2081", employee: "Ashish",         type: "Casual Leave",  from: "2026-10-08", to: "2026-10-09", days: 2, reason: "Family event",              status: "Approved" },
  { id: "LR-2080", employee: "Ashish",         type: "Personal Leave",from: "2026-10-15", to: "2026-10-16", days: 2, reason: "Festival trip",             status: "Approved" },
  { id: "LR-2079", employee: "Ashish",         type: "Annual Leave",  from: "2026-10-21", to: "2026-10-21", days: 1, reason: "Post-festival off",         status: "Approved" },
  { id: "LR-2078", employee: "Priya Nair",     type: "Annual Leave",  from: "2026-10-12", to: "2026-10-14", days: 3, reason: "Personal travel",           status: "Approved" },
  { id: "LR-2074", employee: "Aditya Kumar",   type: "Sick Leave",    from: "2026-10-06", to: "2026-10-06", days: 1, reason: "Medical appointment",       status: "Pending" },
  { id: "LR-2072", employee: "Kavya Patel",    type: "Casual Leave",  from: "2026-10-15", to: "2026-10-15", days: 1, reason: "Personal work",              status: "Pending" },
  { id: "LR-2071", employee: "Rohan Gupta",    type: "Annual Leave",  from: "2026-10-20", to: "2026-10-22", days: 3, reason: "Family vacation",            status: "Pending" },
  { id: "LR-2069", employee: "Sneha Reddy",    type: "Sick Leave",    from: "2026-10-04", to: "2026-10-05", days: 2, reason: "Fever",                      status: "Approved" },
  { id: "LR-2068", employee: "Deepak Verma",   type: "Casual Leave",  from: "2026-09-28", to: "2026-09-28", days: 1, reason: "Personal errand",            status: "Approved" },
  { id: "LR-2066", employee: "Ravi Shankar",   type: "Annual Leave",  from: "2026-10-25", to: "2026-10-28", days: 4, reason: "Holiday trip",               status: "Pending" },
  { id: "LR-2064", employee: "Ankit Sharma",   type: "Sick Leave",    from: "2026-10-01", to: "2026-10-01", days: 1, reason: "Doctor visit",               status: "Approved" },
  { id: "LR-2062", employee: "Ritu Ahuja",     type: "Maternity Leave",from:"2026-11-01", to: "2026-11-90", days: 90, reason: "Maternity",                 status: "Approved" },
  { id: "LR-2060", employee: "Ashwin Pillai",  type: "Casual Leave",  from: "2026-10-10", to: "2026-10-10", days: 1, reason: "Home maintenance",           status: "Pending" },
  { id: "LR-2058", employee: "Simran Kaur",    type: "Annual Leave",  from: "2026-10-18", to: "2026-10-19", days: 2, reason: "Wedding attendance",         status: "Pending" },
];

const announcementsSeed = [
  { id: 1, title: "Open Enrollment for Health Benefits", text: "Review your benefits options before the enrollment window closes.", category: "Benefits" },
  { id: 2, title: "Updated Remote Work Policy", text: "The hybrid work policy has been updated for all teams.", category: "Policy" },
  { id: 3, title: "Annual Company Meet", text: "Join the annual company meet on 10 October.", category: "Events" },
];

const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

// Clear stale seed data when app version changes
const DATA_VERSION = "v6";
if (localStorage.getItem("__nexaDataVersion") !== DATA_VERSION) {
  ["employees", "departments", "leaves"].forEach(k => localStorage.removeItem(k));
  localStorage.setItem("__nexaDataVersion", DATA_VERSION);
}

function useStore(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Badge({ children }) {
  return <span className={`badge ${String(children).toLowerCase().replaceAll(" ", "-")}`}>{children}</span>;
}

function Button({ children, onClick, variant = "primary", type = "button" }) {
  return (
    <button type={type} className={`btn ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function Stat({ icon: Icon, label, value, note }) {
  return (
    <Card className="stat-card">
      <div className="stat-icon"><Icon size={19} /></div>
      <div className="stat-value">{value}</div>
      <div className="muted">{label}</div>
      {note && <small className="stat-note">{note}</small>}
    </Card>
  );
}

function Header({ title, description, action }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function Toast({ message, onClose }) {
  return (
    <div className="toast">
      <Check size={17} />
      <span>{message}</span>
      <button onClick={onClose}><X size={15} /></button>
    </div>
  );
}

const employeeNav = [
  ["Dashboard", "/employee/dashboard", LayoutDashboard],
  ["Attendance", "/employee/attendance", CalendarCheck],
  ["Timesheet", "/employee/timesheet", Clock3],
  ["Leave", "/employee/leave", CalendarDays],
  ["Apply Leave", "/employee/leave/apply", Plus],
  ["Holidays", "/employee/holidays", CalendarDays],
  ["Salary", "/employee/salary", WalletCards],
  ["Payslips", "/employee/payslips", FileText],
  ["Performance", "/employee/performance", BarChart3],
  ["Goals", "/employee/goals", Target],
  ["Expenses", "/employee/expenses", Receipt],
  ["Documents", "/employee/documents", FolderOpen],
  ["Directory", "/employee/directory", Users],
  ["HR Requests", "/employee/hr-requests", CircleHelp],
  ["Announcements", "/employee/announcements", Megaphone],
  ["Onboarding", "/employee/onboarding", UserPlus],
  ["Profile", "/employee/profile", UserRound],
  ["Settings", "/employee/settings", Settings],
];

const adminNav = [
  ["Dashboard", "/admin/dashboard", LayoutDashboard],
  ["Employees", "/admin/employees", Users],
  ["Org Chart", "/admin/orgchart", Building2],
  ["Departments", "/admin/departments", Building2],
  ["Attendance", "/admin/attendance", CalendarCheck],
  ["Leave Requests", "/admin/leave", CalendarDays],
  ["Payroll", "/admin/payroll", WalletCards],
  ["Performance", "/admin/performance", BarChart3],
  ["Goals", "/admin/goals", Target],
  ["Expenses", "/admin/expenses", Receipt],
  ["Recruitment", "/admin/recruitment", BriefcaseBusiness],
  ["Onboarding", "/admin/onboarding", UserPlus],
  ["Documents", "/admin/documents", FolderOpen],
  ["Announcements", "/admin/announcements", Megaphone],
  ["Reports", "/admin/reports", BarChart3],
  ["Settings", "/admin/settings", Settings],
];

function Shell({ role, dark, setDark, children, showToast }) {
  const [collapsed, setCollapsed] = useStore("sidebarCollapsed", false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const nav = role === "employee" ? employeeNav : adminNav;

  const [liveClock, setLiveClock] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setLiveClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  function logout() {
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">N</div>
          {!collapsed && (
            <div>
              <b>NEXA HR</b>
              <small>People. Performance. Possibility.</small>
            </div>
          )}
          <button className="mobile-close" onClick={() => setMobileOpen(false)}><X /></button>
        </div>

        <nav className="nav">
          {nav.map(([label, path, Icon]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={`nav-item ${location.pathname === path ? "active" : ""}`}
            >
              <Icon size={18} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <button className="nav-item logout" onClick={logout}>
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="top-icon mobile-trigger" onClick={() => setMobileOpen(true)}><Menu /></button>
          <button className="top-icon desktop-trigger" onClick={() => setCollapsed(v => !v)}>
            {collapsed ? <Menu /> : <X />}
          </button>

          <div className="search">
            <Search size={17} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
          </div>

          <div className="top-right">
            <div className="top-clock" title="Indian Standard Time (IST)">
              <Clock3 size={14} />
              <span>{liveClock.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}</span>
              <small>IST</small>
            </div>
            <button className="top-icon" onClick={() => setDark(v => !v)}>
              {dark ? <Sun /> : <Moon />}
            </button>
            <button className="top-icon notification"><Bell /><i>5</i></button>
            <div className="user-chip">
              <div className="avatar">{role === "employee" ? "AS" : "HR"}</div>
              <div>
                <b>{role === "employee" ? "Ashish" : "HR Administrator"}</b>
                <small>{role === "employee" ? "Employee" : "Administrator"}</small>
              </div>
            </div>
          </div>
        </header>

        <main className="content">{children}</main>
      </div>

      {showToast && <Toast message={showToast.message} onClose={showToast.close} />}
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(role) {
    localStorage.setItem("role", role);
    navigate(role === "employee" ? "/employee/dashboard" : "/admin/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="brand login-brand">
          <div className="brand-mark large">N</div>
          <b>NEXA HR</b>
        </div>
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15} /> Modern workforce management</span>
          <h1>Empowering people.<br /><em>Simplifying work.</em></h1>
          <p>A complete HRMS experience for attendance, leave, payroll, performance and everyday people operations.</p>
          <div className="pills"><span>People</span><span>Performance</span><span>Possibility</span></div>
        </div>
      </div>

      <div className="login-card">
        <div className="brand mobile-brand"><div className="brand-mark">N</div><b>NEXA HR</b></div>
        <h2>Welcome back</h2>
        <p className="muted">Choose a demo portal to explore.</p>

        <div className="role-tabs">
          <button className={mode === "employee" ? "selected" : ""} onClick={() => setMode("employee")}><UserRound size={17} /> Employee</button>
          <button className={mode === "admin" ? "selected" : ""} onClick={() => setMode("admin")}><ShieldCheck size={17} /> Admin</button>
        </div>

        <label>Email<input value={email} onChange={e => setEmail(e.target.value)} placeholder={mode === "employee" ? "employee@demo.com" : "admin@demo.com"} /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="demo123" /></label>

        <Button onClick={() => login(mode)}>Sign In <ArrowUpRight size={16} /></Button>

        <div className="or"><span>OR</span></div>

        <div className="demo-buttons">
          <button onClick={() => login("employee")}><UserRound /><div><b>Continue as Employee</b><small>employee@demo.com</small></div></button>
          <button onClick={() => login("admin")}><ShieldCheck /><div><b>Continue as Admin</b><small>admin@demo.com</small></div></button>
        </div>

        <small className="login-note">Demo only · Data is stored locally in your browser.</small>
      </div>
    </div>
  );
}

function EmployeeDashboard({ checkIn, setCheckIn, checkInTime, setCheckInTime, checkOutTime, setCheckOutTime, notify }) {
  const navigate = useNavigate();
  const [liveNow, setLiveNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setLiveNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const curTimeStr = liveNow.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  function handleCheckToggle() {
    const nowStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    if (checkIn) {
      setCheckIn(false);
      if (setCheckOutTime) setCheckOutTime(nowStr);
      notify(`Checked out successfully at ${nowStr}`);
    } else {
      setCheckIn(true);
      if (setCheckInTime) setCheckInTime(nowStr);
      if (setCheckOutTime) setCheckOutTime(null);
      notify(`Checked in successfully at ${nowStr}`);
    }
  }

  return (
    <>
      <Header
        title="Good Morning, Ashish 👋"
        description="Here's what's happening with you today."
        action={
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div className="top-clock" title="Current Time (IST)">
              <Clock3 size={14} />
              <span>{curTimeStr}</span>
              <small>IST</small>
            </div>
            <Button variant="secondary" onClick={() => navigate("/employee/profile")}>
              <UserRound size={16} /> View Profile
            </Button>
          </div>
        }
      />

      <div className="stats-grid">
        <Stat icon={CalendarCheck} value={checkIn ? "04h 32m" : "Not checked"} label="Today's attendance" />
        <Stat icon={CalendarDays} value="12 days" label="Annual leave balance" />
        <Stat icon={WalletCards} value="₹78,500" label="Latest salary" />
        <Stat icon={Target} value="86%" label="Performance score" note="↑ 8% from last review" />
      </div>

      <div className="two-grid">
        <Card>
          <div className="card-head"><div><h3>Weekly attendance</h3><p>Hours worked this week (Mon–Fri)</p></div><Badge>On Track</Badge></div>
          <div className="bars">
            {[8.7, 9, 8.6, 9.2, 8].map((h, i) => (
              <div className="bar-col" key={i}><div className="bar" style={{ height: `${h * 22}px` }}></div><span>{["Mon","Tue","Wed","Thu","Fri"][i]}</span></div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="card-head">
            <div><h3>Today's attendance</h3><p>Live Real-Time Tracker</p></div>
            <Badge variant={checkIn ? "active" : "pending"}>{checkIn ? "🟢 Present" : "⚪ Checked Out"}</Badge>
          </div>
          
          <div className="att-live-box">
            <div className="att-live-item">
              <span className="att-live-lbl"><Clock3 size={12} /> Current Time</span>
              <strong className="att-live-val">{curTimeStr}</strong>
              <small>Live Clock</small>
            </div>
            <div className="att-live-item">
              <span className="att-live-lbl">Check-in Time</span>
              <strong className="att-punch-val">{checkInTime || "09:12:44 AM"}</strong>
              <small>{checkIn ? "Punched in with seconds" : "Recorded"}</small>
            </div>
            <div className="att-live-item">
              <span className="att-live-lbl">Check-out Time</span>
              <strong className="att-punch-val">{checkOutTime || (checkIn ? "In Progress..." : "—")}</strong>
              <small>{checkOutTime ? "Recorded with seconds" : checkIn ? "Currently active" : "Not checked in"}</small>
            </div>
            <div className="att-live-item">
              <span className="att-live-lbl">Work Duration</span>
              <strong className="att-dur-val">{checkIn ? "04h 32m 18s" : "00h 00m 00s"}</strong>
              <small>Hours logged</small>
            </div>
          </div>

          <Button variant={checkIn ? "secondary" : "primary"} onClick={handleCheckToggle} style={{ width: "100%", marginTop: 8 }}>
            {checkIn ? "Check Out (Punch Out)" : "Check In (Punch In)"}
          </Button>
        </Card>
      </div>

      <div className="two-grid">
        <Card>
          <div className="card-head"><div><h3>Quick actions</h3><p>Common tasks</p></div></div>
          <div className="quick-grid">
            <button onClick={() => navigate("/employee/leave/apply")}><CalendarDays />Apply Leave</button>
            <button onClick={() => navigate("/employee/attendance")}><CalendarCheck />Attendance</button>
            <button onClick={() => navigate("/employee/payslips")}><FileText />Payslip</button>
            <button onClick={() => navigate("/employee/expenses")}><Receipt />Expense</button>
            <button onClick={() => navigate("/employee/hr-requests")}><CircleHelp />HR Request</button>
            <button onClick={() => navigate("/employee/profile")}><UserRound />Profile</button>
          </div>
        </Card>

        <Card>
          <div className="card-head"><div><h3>Upcoming</h3><p>Important dates</p></div></div>
          <div className="timeline">
            <div><b>Team Meeting</b><small>Tomorrow · 10:00 AM</small></div>
            <div><b>Performance Review</b><small>12 Oct 2026</small></div>
            <div><b>Company Holiday</b><small>20 Oct 2026</small></div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="card-head"><div><h3>Latest announcements</h3><p>Stay in the loop</p></div></div>
        <div className="announcement-list">
          {announcementsSeed.map(a => <div key={a.id}><div className="round-icon"><Megaphone size={17} /></div><div><b>{a.title}</b><p>{a.text}</p></div><Badge>{a.category}</Badge></div>)}
        </div>
      </Card>
    </>
  );
}

// ─── Indian Date Helpers & Attendance Data ─────────────────────────────────
function formatLocalYMD(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isDateFuture(year, month, day) {
  if (year > 2026) return true;
  if (year === 2026 && month > 9) return true;
  if (year === 2026 && month === 9 && day > 6) return true;
  return false;
}

const HOLIDAYS = new Set([
  "2025-10-02","2025-10-24","2025-11-01","2025-11-15","2025-12-25",
  "2026-01-01","2026-01-14","2026-01-26","2026-03-17","2026-03-25",
  "2026-04-10","2026-04-14","2026-05-01","2026-08-15","2026-10-02",
  "2026-10-20","2026-10-30"
]);
const LEAVES = new Set([
  "2025-10-13","2025-10-14","2025-11-10","2025-11-11",
  "2026-01-20","2026-01-21","2026-03-05",
  "2026-05-12","2026-05-13","2026-06-02",
  "2026-07-07","2026-08-24","2026-09-08","2026-09-09",
  "2026-10-05","2026-10-08","2026-10-09","2026-10-15","2026-10-16","2026-10-21"
]);

function buildAttendance() {
  const map = {};
  const todayKey = "2026-10-06";
  const start = new Date(2025, 9, 1); // Oct 1, 2025
  const endMonth = new Date(2026, 9, 31); // End of Oct 2026

  for (let d = new Date(start); d <= endMonth; d.setDate(d.getDate() + 1)) {
    const y = d.getFullYear();
    const m = d.getMonth();
    const day = d.getDate();
    const key = formatLocalYMD(y, m, day);
    const dow = d.getDay();

    // Monday to Friday working days; Saturday & Sunday are weekly off across India
    if (dow === 0 || dow === 6) { map[key] = "weekend"; continue; }
    if (HOLIDAYS.has(key))      { map[key] = "holiday"; continue; }
    if (LEAVES.has(key))        { map[key] = "leave";   continue; }

    // Future days in October 2026 after today (Oct 6): strictly upcoming / scheduled (NOT present!)
    if (key > todayKey) {
      map[key] = "upcoming";
      continue;
    }

    // Today (Oct 6, 2026): Present
    if (key === todayKey) {
      map[key] = "present";
      continue;
    }

    // Oct 1, 2026: Working day -> Present
    if (key === "2026-10-01") {
      map[key] = "present";
      continue;
    }

    // Past weekdays (Mon–Fri) from Oct 2025 to Sep 2026: ~88% present, ~12% absent (LOP)
    const hash = key.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    map[key] = hash % 9 === 0 ? "absent" : "present";
  }
  return map;
}
const ATTENDANCE_MAP = buildAttendance();

const CHECK_TIMES = {
  present: ["08:58:32","09:03:17","09:12:44","09:05:08","09:08:55","08:55:21","09:15:03","09:00:47","09:07:29"],
  absent:  [null],
};
const CHECK_OUT_SECS = [":12",":44",":07",":33",":58",":21",":49",":03",":27"];
const HOURS = ["8h 42m 40s","8h 55m 23s","9h 02m 15s","8h 30m 07s","8h 48m 52s","8h 37m 18s","9h 10m 34s","8h 22m 09s"];

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

function Attendance({ checkIn, setCheckIn, checkInTime, setCheckInTime, checkOutTime, setCheckOutTime, notify }) {
  const today = new Date(2026, 9, 6);
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [liveNow, setLiveNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setLiveNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const curTimeStr = liveNow.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function handlePunch() {
    const nowStr = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    if (checkIn) {
      setCheckIn(false);
      if (setCheckOutTime) setCheckOutTime(nowStr);
      notify(`Checked out successfully at ${nowStr}`);
    } else {
      setCheckIn(true);
      if (setCheckInTime) setCheckInTime(nowStr);
      if (setCheckOutTime) setCheckOutTime(null);
      notify(`Checked in successfully at ${nowStr}`);
    }
  }

  // Indian calendar: Week starts on Monday!
  const firstDay = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthKey = (d) => formatLocalYMD(viewYear, viewMonth, d);

  const isCurrentMonth = (viewYear === 2026 && viewMonth === 9);
  const countLimit = isCurrentMonth ? 6 : daysInMonth;

  // Summary counts for this month (strictly till date for current month October 2026)
  let pCount = 0, aCount = 0, lCount = 0, hCount = 0, offCount = 0;
  for (let d = 1; d <= countLimit; d++) {
    const s = ATTENDANCE_MAP[monthKey(d)];
    if (s === "present") pCount++;
    else if (s === "absent")  aCount++;
    else if (s === "leave")   lCount++;
    else if (s === "holiday") hCount++;
    else if (s === "weekend") offCount++;
  }

  // Table rows: strictly till date for current month (Oct 1 to 6) or full month for past months
  const maxLogDay = isCurrentMonth ? 6 : daysInMonth;
  const tableRows = [];
  for (let d = 1; d <= maxLogDay; d++) {
    const key = monthKey(d);
    const s = ATTENDANCE_MAP[key];
    const date = new Date(viewYear, viewMonth, d);
    const label = date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", weekday: "short" });
    const hash  = key.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const isTodayDate = (isCurrentMonth && d === 6);

    let cin = "—", cout = "—", hrs = "—", badge = null;
    if (s === "present") {
      if (isTodayDate) {
        cin = checkInTime || "09:12:44 AM";
        cout = checkOutTime || (checkIn ? "In Progress..." : "06:30:15 PM");
        hrs = checkIn ? "04h 32m 18s" : "08h 45m 00s";
        badge = <Badge variant="active">🟢 Present (Today)</Badge>;
      } else {
        cin = CHECK_TIMES.present[hash % CHECK_TIMES.present.length];
        cout = "18:" + String(hash % 30).padStart(2,"0") + CHECK_OUT_SECS[hash % CHECK_OUT_SECS.length];
        hrs = HOURS[hash % HOURS.length];
        badge = <Badge variant="active">Present (Mon–Fri)</Badge>;
      }
    } else if (s === "leave") {
      cin = "— (Approved Leave)";
      cout = "—";
      hrs = "—";
      badge = <Badge variant="outline" style={{ borderColor: "#a855f7", color: "#9333ea", background: "#faf5ff" }}>🟣 On Leave (Casual Leave)</Badge>;
    } else if (s === "holiday") {
      cin = "— (Public Holiday)";
      cout = "—";
      hrs = "—";
      badge = <Badge variant="outline" style={{ borderColor: "#3b82f6", color: "#1d4ed8", background: "#eff6ff" }}>🔵 Public Holiday (Gandhi Jayanti)</Badge>;
    } else if (s === "weekend") {
      cin = "— (Weekly Off)";
      cout = "—";
      hrs = "—";
      badge = <Badge variant="outline" style={{ color: "#64748b" }}>⚪ Weekly Off ({date.getDay() === 6 ? "Saturday" : "Sunday"})</Badge>;
    } else if (s === "absent") {
      cin = "— (Unapproved)";
      cout = "—";
      hrs = "0h 00m";
      badge = <Badge variant="rejected">🔴 Absent (LOP)</Badge>;
    }

    tableRows.push([label, cin, cout, hrs, badge]);
  }

  const statusColor = {
    present: "#22c55e",
    absent: "#ef4444",
    holiday: "#3b82f6",
    leave: "#a855f7",
    weekend: "#94a3b8",
    upcoming: "#cbd5e1"
  };

  return (
    <>
      <Header
        title="Attendance & Time Tracker"
        description="Attendance recorded strictly till date (06 Oct 2026) as per Indian calendar (Mon–Fri working days, Sat & Sun off, leaves in middle)."
        action={
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div className="top-clock" title="Current Time (IST)">
              <Clock3 size={14} />
              <span>{curTimeStr}</span>
              <small>IST</small>
            </div>
            <Button onClick={handlePunch}>
              {checkIn ? "Check Out (Punch Out)" : "Check In (Punch In)"}
            </Button>
          </div>
        }
      />

      {isCurrentMonth && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "10px 16px", borderRadius: "10px", marginBottom: "16px", fontSize: "13px", color: "#166534" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CalendarCheck size={16} color="#16a34a" />
            <span><strong>October 2026 Attendance Recorded Strictly Till Date (06 Oct 2026).</strong> Days 1 to 6 recorded with leaves in middle. Future days (07 to 31 Oct) are scheduled / upcoming.</span>
          </div>
          <span style={{ background: "#dcfce7", padding: "3px 8px", borderRadius: "6px", fontWeight: "700", fontSize: "11px" }}>Mon–Fri Working | Sat–Sun Off</span>
        </div>
      )}

      <Card style={{ marginBottom: 18 }}>
        <div className="att-live-box" style={{ margin: 0 }}>
          <div className="att-live-item">
            <span className="att-live-lbl"><Clock3 size={12} /> Live Current Time</span>
            <strong className="att-live-val">{curTimeStr}</strong>
            <small>Indian Standard Time</small>
          </div>
          <div className="att-live-item">
            <span className="att-live-lbl">Today's Check-in</span>
            <strong className="att-punch-val">{checkInTime || "09:12:44 AM"}</strong>
            <small>{checkIn ? "Recorded with seconds" : "Punched out"}</small>
          </div>
          <div className="att-live-item">
            <span className="att-live-lbl">Today's Check-out</span>
            <strong className="att-punch-val">{checkOutTime || (checkIn ? "In Progress..." : "—")}</strong>
            <small>{checkOutTime ? "Recorded with seconds" : checkIn ? "Working active" : "Not yet punched in"}</small>
          </div>
          <div className="att-live-item">
            <span className="att-live-lbl">Schedule</span>
            <strong className="att-dur-val">Mon–Fri Working</strong>
            <small>Sat & Sun Weekly Off</small>
          </div>
        </div>
      </Card>

      <div className="stats-grid">
        <Stat icon={CalendarCheck} value={`${pCount} Days`}  label={isCurrentMonth ? "Present (Till Date — 06 Oct)" : `Present — ${MONTHS[viewMonth]}`} />
        <Stat icon={CalendarDays}  value={`${lCount} Day${lCount !== 1 ? "s" : ""}`}  label={isCurrentMonth ? "Leaves Taken (Till Date)" : "Approved Leaves"} />
        <Stat icon={XCircle}       value={`${aCount} Days`}  label={isCurrentMonth ? "Absent (Till Date)" : "Absent (Loss of Pay)"} />
        <Stat icon={Check}         value={`${offCount} Days`} label={isCurrentMonth ? "Sat & Sun Off (Till Date)" : "Sat & Sun Weekly Offs"} />
      </div>

      {/* Calendar */}
      <Card>
        <div className="att-cal-head">
          <button className="att-nav" onClick={prevMonth}>&#8249;</button>
          <h3>{MONTHS[viewMonth]} {viewYear} <span style={{ fontSize: 13, fontWeight: 500, color: "#64748b" }}>{isCurrentMonth ? "(Active Till Date — 06 Oct 2026)" : "(India Work Calendar)"}</span></h3>
          <button className="att-nav" onClick={nextMonth}>&#8250;</button>
        </div>

        {/* Legend */}
        <div className="att-legend">
          {[
            ["Present (Mon–Fri)", "#22c55e", "present"],
            ["Absent (LOP)", "#ef4444", "absent"],
            ["Leave (Approved)", "#a855f7", "leave"],
            ["Public Holiday", "#3b82f6", "holiday"],
            ["Weekly Off (Sat & Sun)", "#94a3b8", "weekend"],
            ["Upcoming / Scheduled", "#cbd5e1", "upcoming"],
          ].map(([l, c, k]) => (
            <span key={k} className="att-leg-item"><span className="att-leg-dot" style={{ background: c }} />{l}</span>
          ))}
        </div>

        {/* Day headers: Monday to Sunday */}
        <div className="att-grid">
          {["Mon","Tue","Wed","Thu","Fri","Sat (Off)","Sun (Off)"].map(d => (
            <div key={d} className={`att-dow ${d.includes("Off") ? "att-dow--off" : ""}`}>{d}</div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={`e${i}`} />;
            const key = monthKey(d);
            const dateObj = new Date(viewYear, viewMonth, d);
            const dow = dateObj.getDay();
            const isWeekend = (dow === 0 || dow === 6);
            const isFuture = isDateFuture(viewYear, viewMonth, d);
            const s   = ATTENDANCE_MAP[key] || (isWeekend ? "weekend" : isFuture ? "upcoming" : "present");
            const col = statusColor[s] || "#94a3b8";
            const isToday = isCurrentMonth && d === 6;
            return (
              <div
                key={key}
                className={`att-day att-day--${s}${isToday ? " att-day--today" : ""}`}
                title={
                  isWeekend ? `${dow === 6 ? "Saturday" : "Sunday"} — Weekly Off (India)` :
                  s === "leave" ? "Approved Leave" :
                  s === "holiday" ? "Public Holiday" :
                  s === "upcoming" ? "Upcoming Working Day (Mon–Fri)" :
                  s === "present" ? "Present (Working Day)" : "Absent (LOP)"
                }
              >
                <span className="att-day-num">{d}</span>
                <span className="att-dot" style={{ background: col }} />
                {isWeekend ? (
                  <span className="att-day-label att-day-label--off">OFF</span>
                ) : s === "upcoming" ? (
                  <span className="att-day-label att-day-label--upcoming">—</span>
                ) : (
                  <span className="att-day-label">
                    {s === "present" ? "P" : s === "absent" ? "A" : s === "holiday" ? "H" : "L"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Card>


      {/* Daily log table */}
      <Card>
        <div className="card-head">
          <div>
            <h3>Daily Attendance Records — {MONTHS[viewMonth]} {viewYear} {isCurrentMonth && "(Till Date: 06 Oct)"}</h3>
            <p>Monday–Friday working days with check-in & check-out timestamps. Saturday & Sunday are weekly off. Attendance recorded strictly till date.</p>
          </div>
          <Badge>{isCurrentMonth ? "Recorded Till 06 Oct 2026" : "Mon–Fri Working Days"}</Badge>
        </div>
        <Table
          headers={["Date","Check In (Time)","Check Out (Time)","Hours Worked","Status"]}
          rows={tableRows}
        />
      </Card>
    </>
  );
}

// ─── Payslips ─────────────────────────────────────────────────────────────
const PAYSLIP_DATA = [
  { id:"PS-2026-10", month:"October 2026",   basic:55000, hra:22000, travel:3000, medical:1500, pf:6600,  tax:5200,  gross:81500, net:69700,  status:"Pending" },
  { id:"PS-2026-09", month:"September 2026", basic:55000, hra:22000, travel:3000, medical:1500, pf:6600,  tax:5200,  gross:81500, net:69700,  status:"Paid" },
  { id:"PS-2026-08", month:"August 2026",    basic:55000, hra:22000, travel:3000, medical:1500, pf:6600,  tax:5200,  gross:81500, net:69700,  status:"Paid" },
  { id:"PS-2026-07", month:"July 2026",      basic:55000, hra:22000, travel:3000, medical:1500, pf:6600,  tax:5200,  gross:81500, net:69700,  status:"Paid" },
  { id:"PS-2026-06", month:"June 2026",      basic:55000, hra:22000, travel:3000, medical:1500, pf:6600,  tax:5200,  gross:81500, net:69700,  status:"Paid" },
  { id:"PS-2026-05", month:"May 2026",       basic:55000, hra:22000, travel:3000, medical:1500, pf:6600,  tax:5200,  gross:81500, net:69700,  status:"Paid" },
  { id:"PS-2026-04", month:"April 2026",     basic:52000, hra:20800, travel:2800, medical:1500, pf:6240,  tax:4900,  gross:77100, net:65960,  status:"Paid" },
  { id:"PS-2026-03", month:"March 2026",     basic:52000, hra:20800, travel:2800, medical:1500, pf:6240,  tax:4900,  gross:77100, net:65960,  status:"Paid" },
  { id:"PS-2026-02", month:"February 2026",  basic:52000, hra:20800, travel:2800, medical:1500, pf:6240,  tax:4900,  gross:77100, net:65960,  status:"Paid" },
  { id:"PS-2026-01", month:"January 2026",   basic:52000, hra:20800, travel:2800, medical:1500, pf:6240,  tax:4900,  gross:77100, net:65960,  status:"Paid" },
  { id:"PS-2025-12", month:"December 2025",  basic:50000, hra:20000, travel:2500, medical:1500, pf:6000,  tax:4700,  gross:74000, net:63300,  status:"Paid" },
  { id:"PS-2025-11", month:"November 2025",  basic:50000, hra:20000, travel:2500, medical:1500, pf:6000,  tax:4700,  gross:74000, net:63300,  status:"Paid" },
];

function Payslips() {
  const [selected, setSelected] = useState(null);
  const ps = selected ? PAYSLIP_DATA.find(p => p.id === selected) : null;

  if (ps) return (
    <>
      <Header title={`Payslip — ${ps.month}`} description={`Slip ID: ${ps.id}`}
        action={<Button variant="secondary" onClick={() => setSelected(null)}>← Back to Payslips</Button>}
      />
      <Card className="payslip-detail">
        <div className="ps-header">
          <div>
            <div className="ps-company">NEXA HR Pvt. Ltd.</div>
            <div className="ps-addr">Bengaluru, Karnataka · CIN: U72900KA2020PTC123456</div>
          </div>
          <div className="ps-badge-wrap">
            <span className={`ps-status-badge ${ps.status.toLowerCase()}`}>{ps.status}</span>
            <div className="ps-id">{ps.id}</div>
          </div>
        </div>

        <div className="ps-emp-row">
          <div><span>Employee</span><strong>Ashish</strong></div>
          <div><span>Employee ID</span><strong>EMP-1011</strong></div>
          <div><span>Department</span><strong>Engineering</strong></div>
          <div><span>Designation</span><strong>Senior Software Engineer</strong></div>
          <div><span>Pay Period</span><strong>{ps.month}</strong></div>
          <div><span>Bank Account</span><strong>XXXX XXXX 4821</strong></div>
        </div>

        <div className="ps-cols">
          <div className="ps-col">
            <div className="ps-col-title">Earnings</div>
            {[["Basic Salary",ps.basic],["HRA",ps.hra],["Travel Allowance",ps.travel],["Medical Allowance",ps.medical]].map(([k,v])=>(
              <div className="ps-row" key={k}><span>{k}</span><strong>{money(v)}</strong></div>
            ))}
            <div className="ps-row ps-row--total"><span>Gross Earnings</span><strong>{money(ps.gross)}</strong></div>
          </div>
          <div className="ps-col">
            <div className="ps-col-title">Deductions</div>
            {[["Provident Fund (12%)",ps.pf],["Income Tax (TDS)",ps.tax]].map(([k,v])=>(
              <div className="ps-row" key={k}><span>{k}</span><strong style={{color:"#ef4444"}}>- {money(v)}</strong></div>
            ))}
            <div className="ps-row ps-row--total"><span>Total Deductions</span><strong style={{color:"#ef4444"}}>- {money(ps.pf+ps.tax)}</strong></div>
          </div>
        </div>

        <div className="ps-net">
          <span>Net Take-Home Pay</span>
          <strong>{money(ps.net)}</strong>
        </div>

        <div className="ps-footer">This is a computer-generated payslip and does not require a signature.</div>
      </Card>
    </>
  );

  const totalPaid = PAYSLIP_DATA.filter(p=>p.status==="Paid").reduce((s,p)=>s+p.net,0);
  const avgNet    = Math.round(totalPaid / PAYSLIP_DATA.filter(p=>p.status==="Paid").length);

  return (
    <>
      <Header title="Payslips" description="Your monthly salary breakdowns and payment history." />
      <Form16Notice />
      <div className="stats-grid">
        <Stat icon={WalletCards} value={money(PAYSLIP_DATA[1].net)} label="Last month net pay" />
        <Stat icon={FileText}    value={PAYSLIP_DATA.length}         label="Total payslips" />
        <Stat icon={Check}       value={PAYSLIP_DATA.filter(p=>p.status==="Paid").length} label="Paid" />
        <Stat icon={BarChart3}   value={money(avgNet)}               label="Average net pay" />
      </div>
      <Card>
        <div className="ps-list">
          {PAYSLIP_DATA.map(p => (
            <div key={p.id} className="ps-list-row" onClick={() => setSelected(p.id)}>
              <div className="ps-list-month">
                <div className="ps-month-icon"><FileText size={17}/></div>
                <div>
                  <strong>{p.month}</strong>
                  <small>{p.id}</small>
                </div>
              </div>
              <div className="ps-list-earnings">
                <span>Gross</span><strong>{money(p.gross)}</strong>
              </div>
              <div className="ps-list-net">
                <span>Net</span><strong>{money(p.net)}</strong>
              </div>
              <span className={`ps-status-badge ${p.status.toLowerCase()}`}>{p.status}</span>
              <button className="ps-view-btn" onClick={e=>{e.stopPropagation();setSelected(p.id);}}>View →</button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function Leave({ leaves, setLeaves }) {
  const navigate = useNavigate();
  const mine = leaves.filter(x => x.employee === "Ashish");
  return (
    <>
      <Header title="Leave" description="View your leave balance and requests." action={<Button onClick={() => navigate("/employee/leave/apply")}><Plus size={16} /> Apply Leave</Button>} />
      <div className="stats-grid">
        <Stat icon={CalendarDays} value="12" label="Annual leave remaining" />
        <Stat icon={CalendarDays} value="6" label="Casual leave remaining" />
        <Stat icon={CalendarDays} value="8" label="Sick leave remaining" />
        <Stat icon={Clock3} value={mine.filter(x => x.status === "Pending").length} label="Pending requests" />
      </div>
      <Card>
        <div className="card-head"><div><h3>My requests</h3><p>Recent leave applications</p></div></div>
        <Table headers={["Type", "Dates", "Days", "Reason", "Status"]} rows={mine.length ? mine.map(x => [x.type, `${x.from} → ${x.to}`, x.days, x.reason, <Badge>{x.status}</Badge>]) : [["—","—","—","No requests", "—"]]} />
      </Card>
    </>
  );
}

function ApplyLeave({ leaves, setLeaves, notify }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ type: "Casual Leave", from: "", to: "", reason: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.from || !form.to || !form.reason) return;
    const days = Math.max(1, Math.ceil((new Date(form.to) - new Date(form.from)) / 86400000) + 1);
    setLeaves(v => [{ id: `LR-${Date.now()}`, employee: "Ashish", ...form, days, status: "Pending" }, ...v]);
    notify("Leave request submitted.");
    navigate("/employee/leave");
  }

  return (
    <>
      <Header title="Apply Leave" description="Submit a new time-off request." />
      <Card className="form-card">
        <form onSubmit={submit}>
          <div className="form-grid">
            <label>Leave Type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Casual Leave</option><option>Annual Leave</option><option>Sick Leave</option></select></label>
            <label>Start Date<input type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} /></label>
            <label>End Date<input type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} /></label>
            <label className="full-field">Reason<textarea rows="5" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="Tell your manager why you need leave..." /></label>
          </div>
          <div className="form-actions"><Button variant="secondary" onClick={() => navigate("/employee/leave")}>Cancel</Button><Button type="submit">Submit Request</Button></div>
        </form>
      </Card>
    </>
  );
}

function AdminDashboard({ leaves, employees }) {
  const pending = leaves.filter(x => x.status === "Pending").length;
  return (
    <>
      <Header title="Admin Dashboard" description="A real-time overview of your workforce." action={<Button variant="secondary"><Download size={16} /> Export Report</Button>} />
      <div className="stats-grid">
        <Stat icon={Users} value={employees.length} label="Total employees" note="↑ 6.2% this year" />
        <Stat icon={CalendarCheck} value="94.2%" label="Attendance today" />
        <Stat icon={CalendarDays} value="18" label="On leave today" />
        <Stat icon={Clock3} value={pending} label="Pending leave requests" />
      </div>

      <div className="two-grid">
        <Card>
          <div className="card-head"><div><h3>Workforce by department</h3><p>Current employee distribution</p></div></div>
          {["Engineering", "Sales", "HR", "Finance", "Marketing", "Operations"].map((d) => {
            const count = employees.filter(e => e.department === d).length;
            const pct = Math.max(8, Math.round((count / employees.length) * 100));
            return <div className="progress-row" key={d}><span>{d}</span><div><i style={{ width: `${pct}%` }}></i></div><b>{count}</b></div>;
          })}
        </Card>

        <Card>
          <div className="card-head"><div><h3>Pending actions</h3><p>Items needing attention</p></div></div>
          {[
            ["Leave approvals", pending, "/admin/leave"],
            ["Expense requests", 7, "/admin/expenses"],
            ["Performance reviews", 12, "/admin/performance"],
            ["Documents", 5, "/admin/documents"],
          ].map(x => <Link className="action-row" to={x[2]} key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><ArrowUpRight size={16} /></Link>)}
        </Card>
      </div>

      <Card>
        <div className="card-head"><div><h3>Recent employees</h3><p>People in your organization</p></div></div>
        <Table headers={["Employee", "Department", "Designation", "Location", "Salary", "Status"]} rows={employees.slice(0, 6).map(e => [e.name, e.department, e.designation, e.location, money(e.salary), <Badge>{e.status}</Badge>])} />
      </Card>
    </>
  );
}

function AdminEmployees({ employees, setEmployees, notify }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(
    () => employees.filter(e => `${e.name} ${e.department} ${e.designation} ${e.location}`.toLowerCase().includes(query.toLowerCase())),
    [employees, query]
  );

  function save(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const employee = {
      id: editing?.id || `EMP-${1024 + employees.length + 1}`,
      name: fd.get("name"),
      email: fd.get("email"),
      department: fd.get("department"),
      designation: fd.get("designation"),
      location: fd.get("location"),
      salary: Number(fd.get("salary")),
      status: "Active",
    };
    setEmployees(v => editing ? v.map(x => x.id === editing.id ? employee : x) : [employee, ...v]);
    setOpen(false);
    setEditing(null);
    notify(editing ? "Employee updated." : "Employee added.");
  }

  return (
    <>
      <Header title="Employees" description="Manage your organization's workforce." action={<Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Add Employee</Button>} />
      <Card>
        <div className="toolbar"><div className="search"><Search size={16} /><input placeholder="Search employees..." value={query} onChange={e => setQuery(e.target.value)} /></div><Button variant="secondary"><Download size={16} /> Export</Button></div>
        <Table headers={["Employee", "Department", "Designation", "Location", "Salary", "Status", "Actions"]} rows={filtered.map(e => [
          <div className="person"><div className="avatar">{e.name.split(" ").map(x => x[0]).join("")}</div><div><b>{e.name}</b><small>{e.email}</small></div></div>,
          e.department,
          e.designation,
          e.location,
          money(e.salary),
          <Badge>{e.status}</Badge>,
          <div className="row-actions">
            <button className="mini" onClick={() => { setEditing(e); setOpen(true); }}><MoreHorizontal size={16} /></button>
          </div>
        ])} />
      </Card>

      {open && (
        <Modal title={editing ? "Edit Employee" : "Add Employee"} onClose={() => setOpen(false)}>
          <form id="employee-form" onSubmit={save}>
            <div className="form-grid">
              <label>Name<input name="name" defaultValue={editing?.name || ""} required /></label>
              <label>Email<input name="email" defaultValue={editing?.email || ""} required /></label>
              <label>Department<select name="department" defaultValue={editing?.department || "Engineering"}><option>Engineering</option><option>Product</option><option>Sales</option><option>HR</option><option>Finance</option><option>Marketing</option></select></label>
              <label>Designation<input name="designation" defaultValue={editing?.designation || "Software Engineer"} required /></label>
              <label>Location<input name="location" defaultValue={editing?.location || "Hyderabad"} required /></label>
              <label>Monthly Salary<input name="salary" type="number" defaultValue={editing?.salary || 65000} required /></label>
            </div>
            <div className="form-actions"><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">{editing ? "Save Changes" : "Create Employee"}</Button></div>
          </form>
        </Modal>
      )}
    </>
  );
}

function AdminLeave({ leaves, setLeaves, notify }) {
  function update(id, status) {
    setLeaves(v => v.map(x => x.id === id ? { ...x, status } : x));
    notify(`Leave request ${status.toLowerCase()}.`);
  }

  return (
    <>
      <Header title="Leave Requests" description="Review and approve employee time-off requests." />
      <div className="stats-grid">
        <Stat icon={Clock3} value={leaves.filter(x => x.status === "Pending").length} label="Pending" />
        <Stat icon={Check} value={leaves.filter(x => x.status === "Approved").length} label="Approved" />
        <Stat icon={XCircle} value={leaves.filter(x => x.status === "Rejected").length} label="Rejected" />
        <Stat icon={CalendarDays} value={leaves.length} label="Total requests" />
      </div>
      <Card>
        <Table headers={["Employee", "Type", "Dates", "Days", "Reason", "Status", "Actions"]} rows={leaves.map(x => [
          x.employee,
          x.type,
          `${x.from} → ${x.to}`,
          x.days,
          x.reason,
          <Badge>{x.status}</Badge>,
          x.status === "Pending" ? <div className="row-actions"><button className="approve" onClick={() => update(x.id, "Approved")}><Check size={14} /> Approve</button><button className="reject" onClick={() => update(x.id, "Rejected")}><XCircle size={14} /> Reject</button></div> : "—",
        ])} />
      </Card>
    </>
  );
}

const DEPT_COLORS = {
  Engineering: { bg: "#eef3ff", accent: "#4f6ef7", dark: "#c7d3fc" },
  Sales:       { bg: "#fef3ec", accent: "#f77f4f", dark: "#fcd3b4" },
  HR:          { bg: "#fff0f6", accent: "#d64fa0", dark: "#f8c0df" },
  Finance:     { bg: "#effaf4", accent: "#2faa6a", dark: "#a8e8c6" },
  Marketing:   { bg: "#faf0ff", accent: "#8b5cf6", dark: "#d8b4fe" },
  Operations:  { bg: "#fff8ec", accent: "#e6a817", dark: "#fde68a" },
};

function Departments({ notify, employees }) {
  const deptCounts = [
    "Engineering", "Sales", "HR", "Finance", "Marketing", "Operations"
  ].map(name => ({ name, employees: (employees || employeesSeed).filter(e => e.department === name).length }));

  const [departments, setDepartments] = useStore("departments", deptCounts);

  return (
    <>
      <Header title="Departments" description="Manage organizational functions." action={<Button onClick={() => { setDepartments(v => [...v, { name: "New Department", employees: 0 }]); notify("Department added."); }}><Plus size={16} /> Add Department</Button>} />
      <div className="department-grid">
        {departments.map(d => {
          const c = DEPT_COLORS[d.name] || { bg: "#f5f7fb", accent: "#6b7280", dark: "#d1d5db" };
          return (
            <Card key={d.name} className="dept-card">
              <div className="dept-icon-wrap" style={{ background: c.bg }}>
                <Building2 size={22} style={{ color: c.accent }} />
              </div>
              <h3>{d.name}</h3>
              <p>{d.employees} Employees</p>
              <div className="dept-bar"><div style={{ width: `${Math.min(100, d.employees * 10)}%`, background: c.accent }} /></div>
              <Button variant="secondary">Edit</Button>
            </Card>
          );
        })}
      </div>
    </>
  );
}

// ─── ORG CHART ─────────────────────────────────────────────────────────────
const DEPT_ACCENT = {
  Executive:   "#1e3a5f",
  Engineering: "#4f6ef7",
  Sales:       "#f77f4f",
  HR:          "#d64fa0",
  Finance:     "#2faa6a",
  Marketing:   "#8b5cf6",
  Operations:  "#e6a817",
};

// Count all descendants recursively
function countDescendants(node) {
  if (!node.children?.length) return 0;
  return node.children.length + node.children.reduce((s, c) => s + countDescendants(c), 0);
}

function OrgNode({ node, isLast, isFirst, isOnly }) {
  const [expanded, setExpanded] = useState(true);
  const { emp, children } = node;
  const accent = DEPT_ACCENT[emp.department] || "#6b7280";
  const isDir = emp.role === "director";
  const isMgr = emp.role === "manager";
  const initials = emp.name.split(" ").map(x => x[0]).join("").slice(0, 2);
  const directCount = children?.length || 0;
  const totalCount = countDescendants(node);

  return (
    <div className="oc-row">
      {/* Left connector line segment */}
      <div className="oc-connector-left">
        {/* horizontal arm from parent's vertical rail */}
        <div className="oc-arm-h" />
        {/* vertical rail joining siblings */}
        {!isOnly && (
          <div className={`oc-rail-v oc-rail-v--${isFirst ? 'first' : isLast ? 'last' : 'mid'}`} />
        )}
      </div>

      <div className="oc-node-col">
        {/* The card */}
        <div
          className={`oc-card oc-card--${emp.role}`}
          style={{ "--acc": accent }}
          onClick={() => directCount > 0 && setExpanded(v => !v)}
        >
          {/* left color strip */}
          <div className="oc-strip" style={{ background: accent }} />

          <div className="oc-avatar" style={{ background: accent + "18", color: accent }}>{initials}</div>

          <div className="oc-body">
            <div className="oc-name">
              {isDir && <span className="oc-crown">👑</span>}
              <strong>{emp.name}</strong>
            </div>
            <div className="oc-desg">{emp.designation}</div>
            <div className="oc-dept" style={{ color: accent }}>{emp.department}</div>
          </div>

          {directCount > 0 && (
            <button
              className="oc-expand-btn"
              style={{ background: accent + "18", color: accent, borderColor: accent + "44" }}
              onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
              title={expanded ? "Collapse" : `Show ${directCount} direct report${directCount > 1 ? "s" : ""}`}
            >
              <span className="oc-count">{directCount}</span>
              <span className="oc-count-label">{expanded ? "▾" : "▸"}</span>
            </button>
          )}
        </div>

        {/* Reportee names popup when collapsed */}
        {!expanded && directCount > 0 && (
          <div className="oc-peek" style={{ borderColor: accent + "55" }}>
            <div className="oc-peek-title" style={{ color: accent }}>{directCount} direct report{directCount > 1 ? "s" : ""}</div>
            {children.map(c => (
              <div key={c.emp.id} className="oc-peek-row">
                <div className="oc-peek-dot" style={{ background: DEPT_ACCENT[c.emp.department] || accent }} />
                <span>{c.emp.name}</span>
                <small>{c.emp.designation}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Children column */}
      {directCount > 0 && expanded && (
        <div className="oc-branch">
          {/* horizontal arm from card to vertical rail */}
          <div className="oc-arm-out" />
          {/* vertical rail */}
          {directCount > 1 && <div className="oc-branch-rail" />}
          {/* child rows */}
          <div className="oc-children">
            {children.map((child, i) => (
              <OrgNode
                key={child.emp.id}
                node={child}
                isFirst={i === 0}
                isLast={i === children.length - 1}
                isOnly={children.length === 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrgChart({ employees }) {
  const allEmps = employees || employeesSeed;

  // Build tree
  const byId = {};
  allEmps.forEach(e => { byId[e.id] = { emp: e, children: [] }; });
  let root = null;
  allEmps.forEach(e => {
    if (!e.reportsTo) root = byId[e.id];
    else if (byId[e.reportsTo]) byId[e.reportsTo].children.push(byId[e.id]);
  });

  const deptManagers = allEmps.filter(e => e.role === "manager");
  const deptNames = [...new Set(deptManagers.map(m => m.department))];

  return (
    <>
      <Header title="Org Chart" description="Organization hierarchy — click a node to expand or collapse its reportees." />

      <div className="stats-grid" style={{ marginBottom: 22 }}>
        <Stat icon={Users}         value={allEmps.length}                                     label="Total employees" />
        <Stat icon={Building2}     value={deptNames.length}                                   label="Departments" />
        <Stat icon={ClipboardList} value={deptManagers.length}                                label="Managers" />
        <Stat icon={ShieldCheck}   value={allEmps.filter(e => e.role === "director").length}  label="Directors" />
      </div>

      <Card style={{ marginBottom: 18 }}>
        <div className="org-legend">
          <span className="org-legend-item"><span className="org-legend-dot" style={{ background: DEPT_ACCENT.Executive }} />Director</span>
          {deptManagers.map(m => (
            <span key={m.id} className="org-legend-item">
              <span className="org-legend-dot" style={{ background: DEPT_ACCENT[m.department] }} />
              {m.department} — {m.name}
            </span>
          ))}
        </div>
      </Card>

      <Card className="oc-wrap">
        <div className="oc-scroll">
          {root && <OrgNode node={root} isOnly isFirst isLast />}
        </div>
      </Card>
    </>
  );
}


// ─── Employee Directory ────────────────────────────────────────────────────
function EmployeeDirectory({ employees }) {
  const [query, setQuery] = useState("");
  const [dept,  setDept]  = useState("All");
  const depts = ["All", ...new Set((employees || employeesSeed).map(e => e.department))];
  const all   = employees || employeesSeed;
  const filtered = all.filter(e => {
    const q = query.toLowerCase();
    const matchQ = `${e.name} ${e.email} ${e.phone||""} ${e.designation}`.toLowerCase().includes(q);
    const matchD  = dept === "All" || e.department === dept;
    return matchQ && matchD;
  });

  return (
    <>
      <Header title="Employee Directory" description="Find and contact people across the organization." />
      <Card>
        <div className="toolbar">
          <div className="search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name, email, phone…" /></div>
          <select className="dir-dept-select" value={dept} onChange={e=>setDept(e.target.value)}>
            {depts.map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="dir-grid">
          {filtered.map(e=>{
            const initials = e.name.split(" ").map(x=>x[0]).join("").slice(0,2);
            const accent = {Engineering:"#4f6ef7",Sales:"#f77f4f",HR:"#d64fa0",Finance:"#2faa6a",Marketing:"#8b5cf6",Operations:"#e6a817",Executive:"#1e3a5f"}[e.department]||"#6b7280";
            return (
              <div className="dir-card" key={e.id}>
                <div className="dir-avatar" style={{background:accent+"18",color:accent}}>{initials}</div>
                <div className="dir-name">{e.name}</div>
                <div className="dir-desg">{e.designation}</div>
                <div className="dir-dept" style={{color:accent}}>{e.department}</div>
                <div className="dir-contact">
                  <a href={`mailto:${e.email}`} className="dir-link">✉ {e.email}</a>
                  {e.phone && <a href={`tel:${e.phone}`} className="dir-link">📞 {e.phone}</a>}
                </div>
                <div className="dir-loc">📍 {e.location}</div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && <p style={{textAlign:"center",color:"#8390a2",padding:"30px"}}>No employees found.</p>}
      </Card>
    </>
  );
}

// ─── HR: Admin Attendance Viewer ───────────────────────────────────────────
// ─── HR: Admin Attendance Viewer ───────────────────────────────────────────
function AdminAttendanceViewer({ employees, leaves }) {
  const all = employees || employeesSeed;
  const allLeaves = leaves || leaveSeed;
  const [selected, setSelected] = useState(() => (all.find(e => e.name === "Ashish")?.id || all.find(e => e.role !== "director")?.id || ""));
  const emp = all.find(e => e.id === selected) || all.find(e => e.name === "Ashish") || all[0];

  function getEmpAttendance(empId, empName) {
    const map = {};
    const todayKey = "2026-10-06";
    const start = new Date(2025, 9, 1);
    const end = new Date(2026, 9, 31);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const y = d.getFullYear();
      const m = d.getMonth();
      const day = d.getDate();
      const key = formatLocalYMD(y, m, day);
      const dow = d.getDay();

      if (dow === 0 || dow === 6) { map[key] = "weekend"; continue; }
      if (HOLIDAYS.has(key))      { map[key] = "holiday"; continue; }

      // Check if employee has an approved leave
      const isAshish = (empName === "Ashish" || (!empName && empId === "EMP-1025"));
      const isAshishLeave = isAshish && LEAVES.has(key);
      const isStoreLeave = allLeaves.some(l =>
        l.employee === empName && l.status === "Approved" && key >= l.from && key <= l.to
      );

      if (isAshishLeave || isStoreLeave) {
        map[key] = "leave";
        continue;
      }

      // Future weekdays after Oct 6, 2026: strictly upcoming / scheduled (NOT present!)
      if (key > todayKey) {
        map[key] = "upcoming";
        continue;
      }

      // Today (Oct 6, 2026): Present
      if (key === todayKey) {
        map[key] = "present";
        continue;
      }

      // October 2026 past weekdays: Oct 1 is present, Oct 5 was checked above as leave
      if (key.startsWith("2026-10")) {
        map[key] = "present";
        continue;
      }

      // Past months (Oct 2025 – Sep 2026): hash-based present/absent
      const hash = (key + empId).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      map[key] = hash % 9 === 0 ? "absent" : "present";
    }
    return map;
  }

  const attMap = emp ? getEmpAttendance(emp.id, emp.name) : {};

  const [viewYear,  setViewYear]  = useState(2026);
  const [viewMonth, setViewMonth] = useState(9); // October
  const isCurrentMonth = (viewYear === 2026 && viewMonth === 9);

  // Indian calendar: Week starts on Monday!
  const firstDay = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const monthKey = d => formatLocalYMD(viewYear, viewMonth, d);
  const statusColor = {
    present: "#22c55e",
    absent: "#ef4444",
    holiday: "#3b82f6",
    leave: "#a855f7",
    weekend: "#94a3b8",
    upcoming: "#cbd5e1"
  };

  // Monthly stats for the viewed month (till date if October 2026)
  const countLimit = isCurrentMonth ? 6 : daysInMonth;
  let mPresent = 0, mAbsent = 0, mLeaves = 0, mHolidays = 0, mOff = 0;
  for (let d = 1; d <= countLimit; d++) {
    const k = monthKey(d);
    const s = attMap[k];
    if (s === "present") mPresent++;
    else if (s === "absent") mAbsent++;
    else if (s === "leave") mLeaves++;
    else if (s === "holiday") mHolidays++;
    else if (s === "weekend") mOff++;
  }
  const mLop = mAbsent;

  // Daily records table for the viewed month
  const adminTableRows = [];
  for (let d = 1; d <= countLimit; d++) {
    const key = monthKey(d);
    const s = attMap[key];
    const date = new Date(viewYear, viewMonth, d);
    const label = date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", weekday: "short" });
    const hash = (key + (emp?.id || "EMP-1025")).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const isTodayDate = (isCurrentMonth && d === 6);

    let cin = "—", cout = "—", hrs = "—", badge = null;
    if (s === "present") {
      if (isTodayDate) {
        cin = "09:12:44 AM";
        cout = "In Progress...";
        hrs = "04h 32m 18s";
        badge = <Badge variant="active">🟢 Present (Today)</Badge>;
      } else {
        cin = CHECK_TIMES.present[hash % CHECK_TIMES.present.length];
        cout = "18:" + String(hash % 30).padStart(2, "0") + CHECK_OUT_SECS[hash % CHECK_OUT_SECS.length];
        hrs = HOURS[hash % HOURS.length];
        badge = <Badge variant="active">Present (Mon–Fri)</Badge>;
      }
    } else if (s === "leave") {
      cin = "— (Approved Leave)";
      cout = "—";
      hrs = "—";
      badge = <Badge variant="outline" style={{ borderColor: "#a855f7", color: "#9333ea", background: "#faf5ff" }}>🟣 On Leave (Casual Leave)</Badge>;
    } else if (s === "holiday") {
      cin = "— (Public Holiday)";
      cout = "—";
      hrs = "—";
      badge = <Badge variant="outline" style={{ borderColor: "#3b82f6", color: "#1d4ed8", background: "#eff6ff" }}>🔵 Public Holiday (Gandhi Jayanti)</Badge>;
    } else if (s === "weekend") {
      cin = "— (Weekly Off)";
      cout = "—";
      hrs = "—";
      badge = <Badge variant="outline" style={{ color: "#64748b" }}>⚪ Weekly Off ({date.getDay() === 6 ? "Saturday" : "Sunday"})</Badge>;
    } else if (s === "absent") {
      cin = "— (Unapproved)";
      cout = "—";
      hrs = "0h 00m";
      badge = <Badge variant="rejected">🔴 Absent (LOP)</Badge>;
    }

    adminTableRows.push([label, cin, cout, hrs, badge]);
  }

  return (
    <>
      <Header
        title="Employee Attendance Tracker"
        description="Select any employee to view their attendance record as per Indian work calendar (Mon–Fri working days, Sat–Sun weekly off, leaves in middle, attendance strictly till date)."
        action={
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Badge variant="outline" style={{ borderColor: "#22c55e", color: "#16a34a", background: "#f0fdf4" }}>
              Active Till Date: 06 Oct 2026
            </Badge>
          </div>
        }
      />
      <Card>
        <div className="av-select-row">
          <label className="av-label">Select Employee</label>
          <select className="av-select" value={selected} onChange={e=>setSelected(e.target.value)}>
            <option value="">— choose an employee —</option>
            {all.filter(e=>e.role!=="director").map(e=>(
              <option key={e.id} value={e.id}>{e.name} ({e.department} — {e.designation})</option>
            ))}
          </select>
        </div>
        {emp && (
          <>
            <div className="stats-grid" style={{marginTop:20,marginBottom:0}}>
              <Stat icon={CalendarCheck} value={`${mPresent} Days`}  label={isCurrentMonth ? "Present (Till Date — 06 Oct)" : `Present — ${MONTHS[viewMonth]}`} />
              <Stat icon={CalendarDays}  value={`${mLeaves} Day${mLeaves !== 1 ? "s" : ""}`}   label={isCurrentMonth ? "Leaves Taken (Till Date)" : "Approved Leaves"} />
              <Stat icon={XCircle}       value={`${mAbsent} Days`}   label={isCurrentMonth ? "Absent / LOP (Till Date)" : "Absent (Loss of Pay)"} />
              <Stat icon={WalletCards}   value={money(Math.round(emp.salary/22*mLop))} label="Est. LOP Deduction" />
            </div>

            <div className="att-cal-head" style={{marginTop:22}}>
              <button className="att-nav" onClick={()=>{if(viewMonth===0){setViewMonth(11);setViewYear(y=>y-1);}else setViewMonth(m=>m-1);}}>&#8249;</button>
              <h3>{MONTHS[viewMonth]} {viewYear} <span style={{ fontSize: 13, fontWeight: 500, color: "#64748b" }}>{isCurrentMonth ? "(Active Till Date — 06 Oct 2026)" : "(India Work Calendar: Mon–Fri Working, Sat & Sun Off)"}</span></h3>
              <button className="att-nav" onClick={()=>{if(viewMonth===11){setViewMonth(0);setViewYear(y=>y+1);}else setViewMonth(m=>m+1);}}>&#8250;</button>
            </div>
            <div className="att-legend">
              {[
                ["Present (Mon–Fri)", "#22c55e", "present"],
                ["Absent (LOP)", "#ef4444", "absent"],
                ["Leave (Approved)", "#a855f7", "leave"],
                ["Public Holiday", "#3b82f6", "holiday"],
                ["Weekly Off (Sat & Sun)", "#94a3b8", "weekend"],
                ["Upcoming / Scheduled", "#cbd5e1", "upcoming"]
              ].map(([l,c,k])=>(
                <span key={k} className="att-leg-item"><span className="att-leg-dot" style={{background:c}}/>{l}</span>
              ))}
            </div>
            <div className="att-grid">
              {["Mon","Tue","Wed","Thu","Fri","Sat (Off)","Sun (Off)"].map(d=>(
                <div key={d} className={`att-dow ${d.includes("Off")?"att-dow--off":""}`}>{d}</div>
              ))}
              {cells.map((d,i)=>{
                if(!d) return <div key={`e${i}`}/>;
                const key=monthKey(d);
                const dayDate = new Date(viewYear, viewMonth, d);
                const dow = dayDate.getDay();
                const isWeekend = (dow === 0 || dow === 6);
                const isFuture = isDateFuture(viewYear, viewMonth, d);
                const s = attMap[key] || (isWeekend ? "weekend" : isFuture ? "upcoming" : "present");
                const col = statusColor[s] || "#94a3b8";
                const isToday = isCurrentMonth && d === 6;
                return (
                  <div
                    key={key}
                    className={`att-day att-day--${s}${isToday ? " att-day--today" : ""}`}
                    title={
                      isWeekend ? `${dow===6?"Saturday":"Sunday"} — Weekly Off (India)` :
                      s === "leave" ? "Approved Leave" :
                      s === "holiday" ? "Public Holiday" :
                      s === "upcoming" ? "Upcoming Working Day (Mon–Fri)" :
                      s === "present" ? "Present (Working Day)" : "Absent (LOP)"
                    }
                  >
                    <span className="att-day-num">{d}</span>
                    <span className="att-dot" style={{background:col}}/>
                    {isWeekend ? (
                      <span className="att-day-label att-day-label--off">OFF</span>
                    ) : s === "upcoming" ? (
                      <span className="att-day-label att-day-label--upcoming">—</span>
                    ) : (
                      <span className="att-day-label">{s==="present"?"P":s==="absent"?"A":s==="holiday"?"H":"L"}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>

      {emp && (
        <Card style={{ marginTop: 20 }}>
          <div className="card-head">
            <div>
              <h3>Daily Attendance Records — {MONTHS[viewMonth]} {viewYear} {isCurrentMonth && "(Till Date: 06 Oct)"}</h3>
              <p>Attendance records for <strong>{emp.name}</strong> ({emp.designation} — {emp.department}). Monday–Friday working days, Saturday & Sunday weekly off. Recorded strictly till date.</p>
            </div>
            <Badge>{isCurrentMonth ? "Till Date (06 Oct 2026)" : "Mon–Fri Working Days"}</Badge>
          </div>
          <Table
            headers={["Date", "Check In", "Check Out", "Hours Worked", "Status"]}
            rows={adminTableRows}
          />
        </Card>
      )}
    </>
  );
}

// ─── Admin Payroll ─────────────────────────────────────────────────────────
// Generates 2 years of monthly payroll for all 60 employees with full Indian salary break-up & LOP
function buildPayrollData(employees, leaves) {
  const allEmps = employees || employeesSeed;
  const allLeaves = leaves || leaveSeed;
  const months = [];
  for (let y = 2025; y <= 2026; y++) {
    const startM = y === 2025 ? 9 : 0; // Oct 2025 start
    const endM   = y === 2026 ? 9 : 11;
    for (let m = startM; m <= endM; m++) {
      const workingDays = 22; // Standard Mon–Fri working days in India
      const monthStr = `${y}-${String(m+1).padStart(2,"0")}`;
      const monthLabel = `${MONTHS[m]} ${y}`;
      // Count approved leaves per employee for that month
      const empRows = allEmps.filter(e=>e.role!=="director").map(emp => {
        const empLeaves = allLeaves.filter(l =>
          l.employee === emp.name && l.status === "Approved" && l.from?.startsWith(monthStr)
        ).reduce((s,l)=>s+l.days, 0);
        // absent: hash-based, ~8% of 22 days
        const hash = (emp.id+monthStr).split("").reduce((a,c)=>a+c.charCodeAt(0),0);
        const absentDays = hash % 5 === 0 ? 2 : hash % 7 === 0 ? 1 : 0;
        const lopDays = Math.min(absentDays, workingDays);
        const gross   = emp.salary;
        const lopAmt  = Math.round((gross / workingDays) * lopDays);

        // Indian corporate salary break-up:
        const basic   = Math.round(gross * 0.50); // Basic Pay (50%)
        const hra     = Math.round(gross * 0.25); // House Rent Allowance (25%)
        const travel  = Math.round(gross * 0.05); // Travel / Conveyance Allowance (5%)
        const medical = 1500;                     // Medical Allowance
        const otherAllowances = Math.max(0, gross - (basic + hra + travel + medical)); // Special / Other Allowances
        const totalEarnings = basic + hra + travel + medical + otherAllowances;

        // Statutory & other deductions:
        const pf      = Math.round(basic * 0.12); // EPF (12% of Basic)
        const pt      = 200;                      // Professional Tax (Standard ₹200)
        const tds     = Math.round(gross * 0.05); // TDS
        const totalDeductions = pf + pt + tds + lopAmt;
        const net     = gross - totalDeductions;

        const bankAcct = `HDFC Bank •••• ${String((hash % 8999) + 1000)}`;
        const pan = `AABCP${String((hash % 8999) + 1000)}F`;
        const ifsc = "HDFC0001842";

        return {
          empId: emp.id,
          name: emp.name,
          dept: emp.department,
          designation: emp.designation,
          email: emp.email,
          phone: emp.phone,
          location: emp.location || "Hyderabad",
          gross,
          basic,
          hra,
          travel,
          medical,
          otherAllowances,
          totalEarnings,
          pf,
          pt,
          tds,
          lopDays,
          lopAmt,
          totalDeductions,
          net,
          leaves: empLeaves,
          workingDays,
          presentDays: workingDays - lopDays,
          bankAcct,
          pan,
          ifsc,
        };
      });

      months.push({
        monthStr,
        monthLabel,
        empRows,
        totalGross: empRows.reduce((s,r)=>s+r.gross,0),
        totalBasic: empRows.reduce((s,r)=>s+r.basic,0),
        totalHra: empRows.reduce((s,r)=>s+r.hra,0),
        totalTravel: empRows.reduce((s,r)=>s+r.travel,0),
        totalMedical: empRows.reduce((s,r)=>s+r.medical,0),
        totalOther: empRows.reduce((s,r)=>s+r.otherAllowances,0),
        totalPF: empRows.reduce((s,r)=>s+r.pf,0),
        totalPT: empRows.reduce((s,r)=>s+r.pt,0),
        totalTDS: empRows.reduce((s,r)=>s+r.tds,0),
        totalLOP: empRows.reduce((s,r)=>s+r.lopAmt,0),
        totalNet: empRows.reduce((s,r)=>s+r.net,0),
        status: m === 9 && y === 2026 ? "Pending" : "Processed",
        batchId: `BATCH-${y}${String(m+1).padStart(2,"0")}-7281`
      });
    }
  }
  return months.reverse(); // newest first
}

function AdminPayroll({ employees, leaves, notify }) {
  const data = useMemo(()=>buildPayrollData(employees,leaves),[employees,leaves]);
  const [payrollState, setPayrollState] = useState({});
  const [selMonth, setSelMonth] = useState(data[0]?.monthStr || "");
  const [query, setQuery]       = useState("");
  const [selectedBreakup, setSelectedBreakup] = useState(null);
  const [showRunModal, setShowRunModal] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runSuccess, setRunSuccess] = useState(false);

  const month = data.find(m=>m.monthStr===selMonth) || data[0];
  const isProcessed = payrollState[month?.monthStr] === "Processed" || month?.status === "Processed";

  const rows = (month?.empRows||[]).filter(r=>
    `${r.name} ${r.dept} ${r.designation}`.toLowerCase().includes(query.toLowerCase())
  );

  function handleRunPayroll() {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setRunSuccess(true);
      setPayrollState(prev => ({ ...prev, [month.monthStr]: "Processed" }));
      if (notify) notify(`Payroll for ${month.monthLabel} successfully run! ${money(month.totalNet)} disbursed to ${month.empRows.length} employees.`);
      setTimeout(() => {
        setRunSuccess(false);
        setShowRunModal(false);
      }, 1400);
    }, 1100);
  }

  function exportCSV() {
    const headers = [
      "Employee ID",
      "Employee Name",
      "Department",
      "Designation",
      "Basic Pay (₹)",
      "HRA (₹)",
      "Travel Allowance (₹)",
      "Medical Allowance (₹)",
      "Other Allowances (₹)",
      "Gross Salary (₹)",
      "EPF Deduction (₹)",
      "PT Deduction (₹)",
      "TDS Deduction (₹)",
      "LOP Days",
      "LOP Deduction (₹)",
      "Total Deductions (₹)",
      "Net Take-Home Pay (₹)",
      "Bank Account",
      "IFSC",
      "PAN"
    ];
    const csvContent = [
      headers.join(","),
      ...month.empRows.map(r => [
        `"${r.empId}"`,
        `"${r.name}"`,
        `"${r.dept}"`,
        `"${r.designation}"`,
        r.basic,
        r.hra,
        r.travel,
        r.medical,
        r.otherAllowances,
        r.gross,
        r.pf,
        r.pt,
        r.tds,
        r.lopDays,
        r.lopAmt,
        r.totalDeductions,
        r.net,
        `"${r.bankAcct}"`,
        `"${r.ifsc}"`,
        `"${r.pan}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Salary_Breakup_${month.monthStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (notify) notify(`Exported salary break-up CSV for ${month.monthLabel}.`);
  }

  return (
    <>
      <Header
        title="Payroll & Compensation"
        description="Auto-calculated monthly payroll with Indian salary break-up (Basic, HRA, Travel, Medical, Other) and automated LOP."
        action={
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="secondary" onClick={exportCSV}>
              <Download size={15} /> Export Break-ups (CSV)
            </Button>
            <Button onClick={() => setShowRunModal(true)}>
              <Play size={15} fill="currentColor" /> Run Payroll
            </Button>
          </div>
        }
      />

      <div className="stats-grid">
        <Stat icon={WalletCards}  value={money(month?.totalGross||0)} label={`Gross Payroll — ${month?.monthLabel}`} />
        <Stat icon={Check}        value={money(month?.totalNet||0)}   label="Total Net Payout" />
        <Stat icon={XCircle}      value={money(month?.totalLOP||0)}   label="Total LOP Deductions" />
        <Stat icon={Users}        value={month?.empRows?.length||0}   label="Employees on Payroll" />
      </div>

      <Card>
        <div className="toolbar">
          <select className="av-select" value={selMonth} onChange={e=>setSelMonth(e.target.value)} style={{maxWidth:200}}>
            {data.map(m=><option key={m.monthStr} value={m.monthStr}>{m.monthLabel}</option>)}
          </select>
          <div className="search" style={{flex:1}}>
            <Search size={15}/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search employee name, department, designation…"/>
          </div>
          <Badge variant={isProcessed ? "active" : "pending"}>
            {isProcessed ? "✓ Processed & Paid" : "⏳ Ready to Run"}
          </Badge>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Basic Pay</th>
                <th>HRA</th>
                <th>Travel Allow.</th>
                <th>Other Allow.</th>
                <th>Gross</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th>Salary Break-up</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r.empId} style={{cursor:"pointer"}} onClick={()=>setSelectedBreakup(r)}>
                  <td>
                    <div className="person">
                      <div className="avatar">{r.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div>
                      <div>
                        <b>{r.name}</b>
                        <small style={{display:"block",color:"#8390a2",fontSize:10}}>{r.empId} · {r.designation}</small>
                      </div>
                    </div>
                  </td>
                  <td><Badge>{r.dept}</Badge></td>
                  <td>{money(r.basic)}</td>
                  <td>{money(r.hra)}</td>
                  <td>{money(r.travel)}</td>
                  <td>{money(r.otherAllowances)}</td>
                  <td><b>{money(r.gross)}</b></td>
                  <td>
                    <span style={{color:"#ef4444",fontWeight:600}}>-{money(r.totalDeductions)}</span>
                    {r.lopDays > 0 && <small style={{display:"block",color:"#ef4444",fontSize:10}}>({r.lopDays}d LOP)</small>}
                  </td>
                  <td><strong style={{color:"#16a34a",fontSize:13}}>{money(r.net)}</strong></td>
                  <td>
                    <button
                      className="ps-view-btn"
                      onClick={(e)=>{e.stopPropagation();setSelectedBreakup(r);}}
                      title="View full salary break-up for this employee"
                    >
                      <Eye size={12} style={{marginRight:4,verticalAlign:"middle"}}/> Break-up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ─── Salary Break-up Modal ─────────────────────────────────────── */}
      {selectedBreakup && (
        <div className="modal-backdrop" onClick={()=>setSelectedBreakup(null)}>
          <div className="modal-dialog" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h3 className="modal-title">Employee Salary Break-up</h3>
                <p className="modal-sub">Comprehensive Indian payroll statement for <b>{selectedBreakup.name}</b> · {month.monthLabel}</p>
              </div>
              <button className="modal-close-btn" onClick={()=>setSelectedBreakup(null)}><X size={18}/></button>
            </div>

            <div className="breakup-emp-card">
              <div className="avatar large" style={{background:"#e0e7ff",color:"#4338ca",fontWeight:800}}>
                {selectedBreakup.name.split(" ").map(x=>x[0]).join("").slice(0,2)}
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <h4 style={{margin:0,fontSize:16,fontWeight:800}}>{selectedBreakup.name}</h4>
                  <Badge variant="active">{selectedBreakup.dept}</Badge>
                </div>
                <div style={{display:"flex",gap:"16px",marginTop:4,fontSize:11,color:"#64748b",flexWrap:"wrap"}}>
                  <span><b>ID:</b> {selectedBreakup.empId}</span>
                  <span><b>Designation:</b> {selectedBreakup.designation}</span>
                  <span><b>Location:</b> {selectedBreakup.location}</span>
                </div>
              </div>
            </div>

            <div className="breakup-meta">
              <div>
                <span>Work Calendar (India)</span>
                <strong>22 Working Days (Mon–Fri)</strong>
              </div>
              <div>
                <span>Weekly Off Days</span>
                <strong>8–9 Days (Sat & Sun Off)</strong>
              </div>
              <div>
                <span>Attendance Record</span>
                <strong style={{color: selectedBreakup.lopDays > 0 ? "#ef4444" : "#16a34a"}}>
                  {selectedBreakup.presentDays} Worked · {selectedBreakup.lopDays} LOP Days
                </strong>
              </div>
            </div>

            <div className="breakup-grid">
              {/* Earnings */}
              <div className="breakup-box">
                <div className="breakup-box-title" style={{color:"#16a34a"}}>
                  <span>📈 Earnings / Allowances</span>
                  <span>Amount (₹)</span>
                </div>
                <div className="breakup-row">
                  <span>Basic Pay (50%)</span>
                  <strong>{money(selectedBreakup.basic)}</strong>
                </div>
                <div className="breakup-row">
                  <span>House Rent Allowance (HRA 25%)</span>
                  <strong>{money(selectedBreakup.hra)}</strong>
                </div>
                <div className="breakup-row">
                  <span>Travel / Conveyance Allowance</span>
                  <strong>{money(selectedBreakup.travel)}</strong>
                </div>
                <div className="breakup-row">
                  <span>Medical Allowance</span>
                  <strong>{money(selectedBreakup.medical)}</strong>
                </div>
                <div className="breakup-row">
                  <span>Other / Special Allowances</span>
                  <strong>{money(selectedBreakup.otherAllowances)}</strong>
                </div>
                <div className="breakup-row total" style={{color:"#16a34a"}}>
                  <span>Total Gross Earnings</span>
                  <strong>{money(selectedBreakup.gross)}</strong>
                </div>
              </div>

              {/* Deductions */}
              <div className="breakup-box">
                <div className="breakup-box-title" style={{color:"#ef4444"}}>
                  <span>📉 Deductions & LOP</span>
                  <span>Amount (₹)</span>
                </div>
                <div className="breakup-row">
                  <span>Provident Fund (EPF 12%)</span>
                  <strong style={{color:"#ef4444"}}>-{money(selectedBreakup.pf)}</strong>
                </div>
                <div className="breakup-row">
                  <span>Professional Tax (PT - India)</span>
                  <strong style={{color:"#ef4444"}}>-{money(selectedBreakup.pt)}</strong>
                </div>
                <div className="breakup-row">
                  <span>Tax Deducted at Source (TDS)</span>
                  <strong style={{color:"#ef4444"}}>-{money(selectedBreakup.tds)}</strong>
                </div>
                <div className="breakup-row">
                  <span>Loss of Pay ({selectedBreakup.lopDays} unapproved days)</span>
                  <strong style={{color:selectedBreakup.lopAmt>0?"#ef4444":"#64748b"}}>
                    {selectedBreakup.lopAmt>0?`-${money(selectedBreakup.lopAmt)}`:"₹0"}
                  </strong>
                </div>
                <div className="breakup-row total" style={{color:"#ef4444"}}>
                  <span>Total Deductions</span>
                  <strong>-{money(selectedBreakup.totalDeductions)}</strong>
                </div>
              </div>
            </div>

            <div className="breakup-net-card">
              <div>
                <span>NET TAKE-HOME DISBURSEMENT</span>
                <small style={{display:"block",opacity:.9,fontSize:11,marginTop:3}}>
                  Bank: {selectedBreakup.bankAcct} · IFSC: {selectedBreakup.ifsc} · PAN: {selectedBreakup.pan}
                </small>
              </div>
              <strong>{money(selectedBreakup.net)}</strong>
            </div>

            <div className="modal-actions">
              <Button variant="secondary" onClick={()=>setSelectedBreakup(null)}>Close</Button>
              <Button variant="secondary" onClick={()=>{if(notify) notify(`Payslip downloaded for ${selectedBreakup.name}`);}}>
                <Download size={14}/> Download Slip
              </Button>
              <Button onClick={()=>{if(notify) notify(`Salary break-up statement sent to ${selectedBreakup.email}`);}}>
                <Send size={14}/> Email to Employee
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Run Payroll Modal ─────────────────────────────────────────── */}
      {showRunModal && (
        <div className="modal-backdrop" onClick={()=>!isRunning && setShowRunModal(false)}>
          <div className="modal-dialog" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h3 className="modal-title">Run Monthly Payroll</h3>
                <p className="modal-sub">Execute automated Indian payroll calculation and direct disbursement for <b>{month.monthLabel}</b></p>
              </div>
              <button className="modal-close-btn" disabled={isRunning} onClick={()=>setShowRunModal(false)}><X size={18}/></button>
            </div>

            {runSuccess ? (
              <div style={{textAlign:"center",padding:"32px 12px"}}>
                <div style={{width:64,height:64,borderRadius:"50%",background:"#dcfce7",color:"#16a34a",display:"grid",placeItems:"center",margin:"0 auto 16px",fontSize:32}}>
                  ✓
                </div>
                <h3 style={{fontSize:20,fontWeight:800,margin:"0 0 6px"}}>Payroll Successfully Run!</h3>
                <p style={{color:"#64748b",fontSize:13,margin:0}}>
                  Disbursed <b>{money(month.totalNet)}</b> to all {month.empRows.length} employee accounts via NEFT Batch <b>{month.batchId}</b>.
                </p>
              </div>
            ) : (
              <>
                <div className="run-kpis">
                  <div className="run-kpi">
                    <span>Pay Period</span>
                    <strong>{month.monthLabel}</strong>
                  </div>
                  <div className="run-kpi">
                    <span>Indian Work Days</span>
                    <strong>22 (Mon–Fri)</strong>
                  </div>
                  <div className="run-kpi">
                    <span>Employees</span>
                    <strong>{month.empRows.length} Staff</strong>
                  </div>
                  <div className="run-kpi">
                    <span>Gross Payroll</span>
                    <strong>{money(month.totalGross)}</strong>
                  </div>
                  <div className="run-kpi">
                    <span>Total LOP Deducted</span>
                    <strong style={{color:"#ef4444"}}>-{money(month.totalLOP)}</strong>
                  </div>
                  <div className="run-kpi">
                    <span>Net Payout</span>
                    <strong style={{color:"#16a34a"}}>{money(month.totalNet)}</strong>
                  </div>
                </div>

                <div className="breakup-box" style={{marginTop:14}}>
                  <div className="breakup-box-title">
                    <span>Company-Wide Salary Component Break-up</span>
                    <span>Total (₹)</span>
                  </div>
                  <div className="breakup-row">
                    <span>Total Basic Pay (50%)</span>
                    <strong>{money(month.totalBasic)}</strong>
                  </div>
                  <div className="breakup-row">
                    <span>Total House Rent Allowance (HRA 25%)</span>
                    <strong>{money(month.totalHra)}</strong>
                  </div>
                  <div className="breakup-row">
                    <span>Total Travel / Conveyance Allowances</span>
                    <strong>{money(month.totalTravel)}</strong>
                  </div>
                  <div className="breakup-row">
                    <span>Total Medical Allowances</span>
                    <strong>{money(month.totalMedical)}</strong>
                  </div>
                  <div className="breakup-row">
                    <span>Total Other / Special Allowances</span>
                    <strong>{money(month.totalOther)}</strong>
                  </div>
                  <div className="breakup-row">
                    <span>Total EPF Deductions (12%)</span>
                    <strong style={{color:"#ef4444"}}>-{money(month.totalPF)}</strong>
                  </div>
                  <div className="breakup-row">
                    <span>Total TDS Deductions</span>
                    <strong style={{color:"#ef4444"}}>-{money(month.totalTDS)}</strong>
                  </div>
                  <div className="breakup-row">
                    <span>Total Professional Tax (PT)</span>
                    <strong style={{color:"#ef4444"}}>-{money(month.totalPT)}</strong>
                  </div>
                  <div className="breakup-row total" style={{color:"#16a34a"}}>
                    <span>Total Net Disbursement</span>
                    <strong>{money(month.totalNet)}</strong>
                  </div>
                </div>

                <div className="run-checklist">
                  <div className="run-checklist-item">
                    <span className="chk-icon">✓</span>
                    <span>Indian Calendar compliance verified: Saturday and Sunday designated as weekly off.</span>
                  </div>
                  <div className="run-checklist-item">
                    <span className="chk-icon">✓</span>
                    <span>Attendance logs & LOP automatically calculated across all {month.empRows.length} employees.</span>
                  </div>
                  <div className="run-checklist-item">
                    <span className="chk-icon">✓</span>
                    <span>Statutory EPF, PT, and TDS calculated as per Indian corporate tax laws.</span>
                  </div>
                  <div className="run-checklist-item">
                    <span className="chk-icon">✓</span>
                    <span>Bank account numbers & IFSC codes validated for NEFT direct disbursement.</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <Button variant="secondary" disabled={isRunning} onClick={()=>setShowRunModal(false)}>Cancel</Button>
                  <Button disabled={isRunning} onClick={handleRunPayroll}>
                    {isRunning ? "Executing Disbursement..." : (
                      <>
                        <Play size={15} fill="currentColor"/> Confirm & Execute Payroll Run
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Form 16 Notice (employee portal) ─────────────────────────────────────
function Form16Notice() {
  return (
    <div className="f16-banner">
      <div className="f16-icon">📄</div>
      <div className="f16-body">
        <strong>Form 16 — Tax Certificate</strong>
        <p>Your Form 16 for the current financial year is being prepared. Please <b>contact your HR</b> to request or download it.</p>
      </div>
      <a href="mailto:hr@company.com" className="btn primary" style={{whiteSpace:"nowrap",fontSize:12}}>Contact HR</a>
    </div>
  );
}

function SimplePage({ title, description, icon: Icon = FileText }) {

  return (
    <>
      <Header title={title} description={description} />
      <Card className="simple-page">
        <div className="big-icon"><Icon /></div>
        <h2>{title}</h2>
        <p>This module is ready in the frontend prototype and uses local demo data.</p>
        <div className="feature-list"><span><Check /> Search and filtering</span><span><Check /> Local data persistence</span><span><Check /> Responsive interface</span></div>
      </Card>
    </>
  );
}

function Profile({ notify }) {
  return (
    <>
      <Header title="My Profile" description="View and update your employee information." />
      <Card>
        <div className="profile">
          <div className="avatar huge">AS</div>
          <div><h2>Ashish</h2><p>Senior Software Engineer · Engineering</p><span>Hyderabad · EMP-1011</span></div>
        </div>
        <div className="form-grid profile-fields">
          <label>Full Name<input defaultValue="Ashish" /></label>
          <label>Email<input defaultValue="ashish@company.com" /></label>
          <label>Location<input defaultValue="Hyderabad" /></label>
          <label>Department<input defaultValue="Engineering" disabled /></label>
        </div>
        <Button onClick={() => notify("Profile saved successfully.")}>Save Changes</Button>
      </Card>
    </>
  );
}

function Expenses({ notify }) {
  const [expenses, setExpenses] = useStore("expenses", [
    { title: "Client travel", amount: 3200, status: "Approved" },
    { title: "Learning course", amount: 1800, status: "Pending" },
  ]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  function add() {
    if (!title || !amount) return;
    setExpenses(v => [{ title, amount: Number(amount), status: "Pending" }, ...v]);
    setTitle("");
    setAmount("");
    notify("Expense submitted.");
  }

  return (
    <>
      <Header title="Expenses" description="Submit and track reimbursement requests." />
      <Card>
        <div className="form-grid">
          <label>Expense Title<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Travel, meals, course..." /></label>
          <label>Amount<input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="₹" /></label>
        </div>
        <Button onClick={add}><Plus size={16} /> Submit Expense</Button>
      </Card>
      <Card>
        <Table headers={["Expense", "Amount", "Status"]} rows={expenses.map(e => [e.title, money(e.amount), <Badge>{e.status}</Badge>])} />
      </Card>
    </>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return <div className="modal-bg"><div className="modal"><div className="modal-title"><h2>{title}</h2><button onClick={onClose}><X /></button></div>{children}</div></div>;
}

function Protected({ role, children }) {
  const current = localStorage.getItem("role");
  return current === role ? children : <Navigate to="/login" replace />;
}

function App() {
  const [dark, setDark] = useStore("theme", false);
  const [employees, setEmployees] = useStore("employees", employeesSeed);
  const [leaves, setLeaves] = useStore("leaves", leaveSeed);
  const [checkIn, setCheckIn] = useStore("checkedIn", true);
  const [checkInTime, setCheckInTime] = useStore("checkInTime", "09:12:44 AM");
  const [checkOutTime, setCheckOutTime] = useStore("checkOutTime", null);
  const [toastMessage, setToastMessage] = useState("");

  function notify(message) {
    setToastMessage(message);
    window.clearTimeout(window.__nexaToast);
    window.__nexaToast = window.setTimeout(() => setToastMessage(""), 2500);
  }

  return (
    <>
      <style>{styles}</style>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/employee/*"
          element={
            <Protected role="employee">
              <Shell role="employee" dark={dark} setDark={setDark} showToast={toastMessage ? { message: toastMessage, close: () => setToastMessage("") } : null}>
                <Routes>
                  <Route path="dashboard" element={<EmployeeDashboard checkIn={checkIn} setCheckIn={setCheckIn} checkInTime={checkInTime} setCheckInTime={setCheckInTime} checkOutTime={checkOutTime} setCheckOutTime={setCheckOutTime} notify={notify} />} />
                  <Route path="attendance" element={<Attendance checkIn={checkIn} setCheckIn={setCheckIn} checkInTime={checkInTime} setCheckInTime={setCheckInTime} checkOutTime={checkOutTime} setCheckOutTime={setCheckOutTime} notify={notify} />} />
                  <Route path="leave" element={<Leave leaves={leaves} setLeaves={setLeaves} />} />
                  <Route path="leave/apply" element={<ApplyLeave leaves={leaves} setLeaves={setLeaves} notify={notify} />} />
                  <Route path="profile" element={<Profile notify={notify} />} />
                  <Route path="expenses" element={<Expenses notify={notify} />} />
                  <Route path="timesheet" element={<SimplePage title="Timesheet" description="Review your working hours and timesheets." icon={Clock3} />} />
                  <Route path="holidays" element={<SimplePage title="Holidays" description="Company holidays and upcoming days off." icon={CalendarDays} />} />
                  <Route path="salary" element={<SimplePage title="Salary" description="View your salary details and compensation." icon={WalletCards} />} />
                  <Route path="payslips" element={<Payslips />} />
                  <Route path="performance" element={<SimplePage title="Performance" description="Track your performance reviews." icon={BarChart3} />} />
                  <Route path="goals" element={<SimplePage title="Goals" description="Track your objectives and progress." icon={Target} />} />
                  <Route path="documents" element={<SimplePage title="Documents" description="Manage employee documents." icon={FolderOpen} />} />
                  <Route path="directory" element={<EmployeeDirectory employees={employees} />} />
                  <Route path="hr-requests" element={<SimplePage title="HR Requests" description="Raise and track HR requests." icon={CircleHelp} />} />
                  <Route path="announcements" element={<SimplePage title="Announcements" description="Company news and updates." icon={Megaphone} />} />
                  <Route path="onboarding" element={<SimplePage title="Onboarding" description="Your onboarding checklist." icon={UserPlus} />} />
                  <Route path="settings" element={<SimplePage title="Settings" description="Manage your employee preferences." icon={Settings} />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </Shell>
            </Protected>
          }
        />

        <Route
          path="/admin/*"
          element={
            <Protected role="admin">
              <Shell role="admin" dark={dark} setDark={setDark} showToast={toastMessage ? { message: toastMessage, close: () => setToastMessage("") } : null}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard leaves={leaves} employees={employees} />} />
                  <Route path="employees" element={<AdminEmployees employees={employees} setEmployees={setEmployees} notify={notify} />} />
                  <Route path="orgchart" element={<OrgChart employees={employees} />} />
                  <Route path="departments" element={<Departments notify={notify} employees={employees} />} />
                  <Route path="leave" element={<AdminLeave leaves={leaves} setLeaves={setLeaves} notify={notify} />} />
                  <Route path="attendance" element={<AdminAttendanceViewer employees={employees} leaves={leaves} />} />
                  <Route path="payroll" element={<AdminPayroll employees={employees} leaves={leaves} notify={notify} />} />
                  <Route path="performance" element={<SimplePage title="Performance Reviews" description="Track review cycles and ratings." icon={BarChart3} />} />
                  <Route path="goals" element={<SimplePage title="Goal Management" description="Monitor organizational goals." icon={Target} />} />
                  <Route path="expenses" element={<SimplePage title="Expense Requests" description="Review employee reimbursement requests." icon={Receipt} />} />
                  <Route path="recruitment" element={<SimplePage title="Recruitment" description="Track your hiring pipeline." icon={BriefcaseBusiness} />} />
                  <Route path="onboarding" element={<SimplePage title="Onboarding" description="Track new joiners." icon={UserPlus} />} />
                  <Route path="documents" element={<SimplePage title="Document Management" description="Manage employee and company documents." icon={FolderOpen} />} />
                  <Route path="announcements" element={<SimplePage title="Announcements" description="Create and publish company communications." icon={Megaphone} />} />
                  <Route path="reports" element={<SimplePage title="Reports" description="Explore workforce reports." icon={BarChart3} />} />
                  <Route path="settings" element={<SimplePage title="Settings" description="Configure company preferences and access controls." icon={Settings} />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </Shell>
            </Protected>
          }
        />

        <Route
          path="/"
          element={
            <Navigate
              to={localStorage.getItem("role") === "admin" ? "/admin/dashboard" : localStorage.getItem("role") === "employee" ? "/employee/dashboard" : "/login"}
              replace
            />
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

const styles = `
*{box-sizing:border-box}
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#172033;background:#f5f7fb}
body{margin:0;background:#f5f7fb}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
a{text-decoration:none;color:inherit}
.app{min-height:100vh;display:flex;background:#f5f7fb;color:#172033}
.app.dark{background:#10141d;color:#eef2f8}
.sidebar{position:fixed;inset:0 auto 0 0;width:250px;background:#111827;color:#d8deea;padding:18px 14px;display:flex;flex-direction:column;z-index:20;transition:.2s}
.sidebar.collapsed{width:76px}
.brand{display:flex;align-items:center;gap:11px;min-height:50px;padding:5px 8px;color:#fff}
.brand b{display:block;font-size:17px;letter-spacing:.3px}
.brand small{display:block;color:#8e99aa;font-size:10px;margin-top:2px;white-space:nowrap}
.brand-mark{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(135deg,#ff5b62,#ff9c5a);color:white;font-weight:900;font-size:18px;flex:none}
.brand-mark.large{width:48px;height:48px;font-size:23px}
.nav{margin-top:22px;display:flex;flex-direction:column;gap:4px;overflow:auto}
.nav-item{border:0;background:transparent;color:#aeb8c8;display:flex;align-items:center;gap:12px;width:100%;padding:10px 11px;border-radius:9px;font-size:13px;text-align:left}
.nav-item:hover,.nav-item.active{background:#202938;color:#fff}
.nav-item.active{box-shadow:inset 3px 0 #ff6468}
.sidebar .logout{margin-top:auto}
.main{width:calc(100% - 250px);margin-left:250px;min-width:0}
.collapsed+.main{margin-left:76px;width:calc(100% - 76px)}
.topbar{height:68px;background:rgba(255,255,255,.9);border-bottom:1px solid #e5e9f0;display:flex;align-items:center;gap:14px;padding:0 28px;position:sticky;top:0;z-index:10;backdrop-filter:blur(12px)}
.dark .topbar{background:rgba(16,20,29,.9);border-color:#252d3b}
.top-icon{border:0;background:transparent;width:36px;height:36px;border-radius:9px;display:grid;place-items:center;color:#68758a}
.top-icon:hover{background:#eef1f6;color:#172033}
.dark .top-icon{color:#aeb8c8}.dark .top-icon:hover{background:#202938;color:#fff}
.mobile-trigger,.mobile-close{display:none}
.search{height:38px;max-width:420px;flex:1;display:flex;align-items:center;gap:9px;background:#f2f4f8;border:1px solid #e5e9ef;border-radius:9px;padding:0 12px;color:#8390a2}
.dark .search{background:#181e29;border-color:#2a3342}
.search input{border:0;outline:0;background:transparent;width:100%;color:inherit}
.top-right{display:flex;align-items:center;gap:8px;margin-left:auto}
.notification{position:relative}.notification i{position:absolute;top:3px;right:2px;background:#ff5b62;color:#fff;width:15px;height:15px;border-radius:50%;font-size:9px;font-style:normal;display:grid;place-items:center}
.user-chip{display:flex;align-items:center;gap:9px;margin-left:8px}.user-chip small,.person small{display:block;color:#8792a3;font-size:11px;margin-top:2px}
.avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#ffe2e2;color:#c84b52;font-weight:800;font-size:12px}
.content{padding:28px;max-width:1500px;margin:auto}
.page-header{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin-bottom:22px}
.page-header h1{margin:0;font-size:27px;letter-spacing:-.7px}.page-header p{margin:6px 0 0;color:#7c8798;font-size:13px}
.dark .page-header p{color:#99a5b6}
.btn{border:0;border-radius:9px;padding:10px 15px;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:700;font-size:13px;min-height:40px}
.btn.primary{background:#ff5b62;color:#fff}.btn.primary:hover{background:#ed4d55}
.btn.secondary{background:#fff;border:1px solid #dfe4eb;color:#354052}.dark .btn.secondary{background:#1b222e;border-color:#303a4b;color:#e8edf5}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:18px}
.card{background:#fff;border:1px solid #e5e9ef;border-radius:13px;padding:20px;box-shadow:0 5px 18px rgba(31,42,55,.03);margin-bottom:18px}
.dark .card{background:#171d27;border-color:#293241;box-shadow:none}
.stat-card{min-height:145px}.stat-icon{width:38px;height:38px;border-radius:10px;background:#fff0f0;color:#e05259;display:grid;place-items:center;margin-bottom:13px}
.dark .stat-icon{background:#352125}.stat-value{font-size:25px;font-weight:850;letter-spacing:-.6px}.muted{color:#7d8899;font-size:12px}.stat-note{color:#2d9c6a;display:block;margin-top:5px;font-size:11px}
.two-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:18px}.two-grid>.card{min-width:0}
.card-head{display:flex;justify-content:space-between;align-items:flex-start;gap:15px;margin-bottom:18px}.card-head h3{margin:0;font-size:15px}.card-head p{margin:4px 0 0;color:#8792a3;font-size:12px}
.badge{display:inline-flex;align-items:center;border-radius:999px;padding:5px 9px;background:#edf2f7;color:#586579;font-size:10px;font-weight:800;white-space:nowrap}.badge.present,.badge.approved,.badge.active,.badge.on-track{background:#e8f7ef;color:#23825a}.badge.pending,.badge.late{background:#fff3db;color:#a96b00}.badge.rejected{background:#ffe8e9;color:#b83d44}
.bars{height:250px;display:flex;align-items:flex-end;justify-content:space-around;border-bottom:1px solid #e7ebf1;padding:15px 15px 0}.bar-col{height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:8px;color:#8590a0;font-size:11px}.bar{width:38px;background:linear-gradient(180deg,#ff666d,#ff9a69);border-radius:7px 7px 0 0}
.attendance-box{text-align:center;padding:20px}.attendance-box strong{display:block;font-size:15px;color:#778396}.attendance-box b{display:block;font-size:38px;margin:10px}.attendance-box small{color:#8a95a5}
.quick-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.quick-grid button{border:1px solid #e6eaf0;background:#fafbfc;border-radius:10px;padding:15px 8px;color:#394457;font-weight:700;font-size:11px}.dark .quick-grid button{background:#1b222e;border-color:#2b3544;color:#dbe2ec}.quick-grid svg{display:block;margin:0 auto 7px;color:#ec5c62}
.timeline{display:flex;flex-direction:column;gap:18px}.timeline>div{border-left:2px solid #ffd1d3;padding-left:14px}.timeline b{display:block;font-size:13px}.timeline small{color:#8792a3;font-size:11px;display:block;margin-top:3px}
.announcement-list{display:flex;flex-direction:column;gap:5px}.announcement-list>div{display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:12px;padding:12px;border-radius:10px}.announcement-list>div:hover{background:#f7f8fa}.dark .announcement-list>div:hover{background:#1b222e}.announcement-list b{font-size:13px}.announcement-list p{margin:4px 0 0;color:#7f8998;font-size:11px}
.round-icon,.department-icon,.big-icon{display:grid;place-items:center;background:#fff0f0;color:#e05259;border-radius:10px}.round-icon{width:36px;height:36px}
.table-wrap{overflow:auto}.table-wrap table{width:100%;border-collapse:collapse;min-width:650px}.table-wrap th{text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:#8994a5;padding:12px;border-bottom:1px solid #e8ebf0}.table-wrap td{padding:14px 12px;border-bottom:1px solid #eef1f4;font-size:12px;color:#4c5768}.dark .table-wrap th,.dark .table-wrap td{border-color:#293241}.dark .table-wrap td{color:#c7d0dd}.person{display:flex;align-items:center;gap:9px}.person b{color:#243044}.dark .person b{color:#eef2f8}
.form-card{max-width:850px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px}.form-grid label{font-size:12px;font-weight:700;color:#4e596a;display:flex;flex-direction:column;gap:7px}.dark .form-grid label{color:#cbd4e1}.form-grid input,.form-grid select,.form-grid textarea,.login-card input,.profile-fields input{border:1px solid #dfe4eb;border-radius:8px;padding:11px 12px;outline:0;background:#fff;color:#273245}.dark .form-grid input,.dark .form-grid select,.dark .form-grid textarea,.dark .profile-fields input{background:#121822;border-color:#303a49;color:#eef2f8}.form-grid input:focus,.form-grid select:focus,.form-grid textarea:focus,.login-card input:focus{border-color:#ff6a70;box-shadow:0 0 0 3px #ffe8e9}.full-field{grid-column:1/-1}.form-actions{display:flex;justify-content:flex-end;gap:9px}.toolbar{display:flex;justify-content:space-between;gap:12px;margin-bottom:17px}.toolbar .search{max-width:none;flex:1}
.row-actions{display:flex;gap:6px}.mini{width:30px;height:30px;border:1px solid #dfe4eb;background:#fff;border-radius:7px;display:grid;place-items:center}.dark .mini{background:#1b222e;border-color:#303a49;color:#fff}.approve,.reject{border:0;border-radius:7px;padding:7px 9px;font-size:10px;font-weight:800;display:inline-flex;align-items:center;gap:5px}.approve{background:#e8f7ef;color:#23825a}.reject{background:#ffe8e9;color:#b83d44}
.department-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.department-icon{width:44px;height:44px;margin-bottom:14px}.department-grid h3{margin:0 0 4px}.department-grid p{color:#7f8998;font-size:12px;margin:0 0 10px}.dept-card{transition:.15s}.dept-card:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,.08)}.dept-icon-wrap{width:48px;height:48px;border-radius:12px;display:grid;place-items:center;margin-bottom:14px}.dept-bar{height:5px;background:#edf0f4;border-radius:99px;overflow:hidden;margin-bottom:14px}.dept-bar>div{height:100%;border-radius:99px;transition:.4s}
/* ── Org Chart (horizontal left→right) ─────────────────────────── */
.oc-wrap{padding:28px 20px;overflow:visible}
.oc-scroll{overflow-x:auto;overflow-y:visible;padding-bottom:24px;min-width:0}

/* A row = [connector-left] [card-col] [branch] */
.oc-row{display:flex;align-items:flex-start;position:relative;min-height:80px}

/* left connector: horizontal arm + vertical rail */
.oc-connector-left{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;width:32px;flex:none;align-self:stretch;position:relative}
.oc-arm-h{height:2px;background:#d5dce8;width:32px;position:absolute;top:50%;transform:translateY(-50%)}
.oc-rail-v{position:absolute;left:0;width:2px;background:#d5dce8}
.oc-rail-v--first{top:50%;bottom:-8px}
.oc-rail-v--last{top:-8px;bottom:50%}
.oc-rail-v--mid{top:-8px;bottom:-8px}
.dark .oc-arm-h,.dark .oc-rail-v{background:#2e3a4e}

/* card column */
.oc-node-col{display:flex;flex-direction:column;align-items:flex-start;gap:8px;padding:8px 0;position:relative;z-index:1}

/* card */
.oc-card{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e5e9ef;border-radius:13px;padding:0 14px 0 0;min-width:240px;max-width:280px;cursor:default;transition:box-shadow .15s,transform .15s;box-shadow:0 2px 10px rgba(0,0,0,.05);position:relative;overflow:hidden}
.oc-card:hover{box-shadow:0 8px 22px rgba(0,0,0,.1);transform:translateY(-2px)}
.oc-card--director{border-color:#1e3a5f;border-width:2px;background:linear-gradient(120deg,#f0f4ff,#fff)}
.oc-card--manager{border-color:var(--acc,#6b7280)}
.oc-card--employee{border-color:#e5e9ef}
.dark .oc-card{background:#171d27;border-color:#293241}.dark .oc-card--director{background:linear-gradient(120deg,#1a2540,#171d27)}

/* left accent strip */
.oc-strip{width:5px;align-self:stretch;flex:none;border-radius:0}

/* avatar */
.oc-avatar{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:12px;flex:none}

/* body text */
.oc-body{flex:1;min-width:0;padding:12px 0}
.oc-name{display:flex;align-items:center;gap:5px;margin-bottom:2px}
.oc-name strong{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#1a2333}.dark .oc-name strong{color:#eef2f8}
.oc-crown{font-size:14px;flex:none}
.oc-desg{font-size:10px;color:#8390a2;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.oc-dept{font-size:10px;font-weight:700;white-space:nowrap}

/* expand button (reportee count) */
.oc-expand-btn{border:1px solid;border-radius:20px;padding:4px 9px;font-size:11px;font-weight:800;display:flex;align-items:center;gap:4px;cursor:pointer;background:transparent;white-space:nowrap;transition:.15s;flex:none;margin-left:4px}
.oc-expand-btn:hover{opacity:.8}
.oc-count{font-size:13px;font-weight:900;line-height:1}
.oc-count-label{font-size:11px}

/* collapsed peek panel */
.oc-peek{border:1.5px solid;border-radius:10px;padding:10px 13px;max-width:280px;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,.08);animation:fadein .15s ease}
.dark .oc-peek{background:#1b222e}
.oc-peek-title{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.oc-peek-row{display:flex;align-items:center;gap:7px;padding:4px 0;border-bottom:1px solid #f0f2f5}
.oc-peek-row:last-child{border-bottom:0}
.dark .oc-peek-row{border-color:#293241}
.oc-peek-dot{width:8px;height:8px;border-radius:50%;flex:none}
.oc-peek-row span{font-size:12px;font-weight:600;flex:1;color:#2a3447}.dark .oc-peek-row span{color:#dce4f0}
.oc-peek-row small{font-size:10px;color:#8390a2;white-space:nowrap}

/* branch: connector arm from card + children list */
.oc-branch{display:flex;align-items:flex-start;position:relative}
.oc-arm-out{width:32px;height:2px;background:#d5dce8;flex:none;align-self:center}.dark .oc-arm-out{background:#2e3a4e}
.oc-branch-rail{position:absolute;left:32px;top:0;bottom:0;width:2px;background:#d5dce8}.dark .oc-branch-rail{background:#2e3a4e}
.oc-children{display:flex;flex-direction:column;gap:0}

/* first level (director) has no left connector */
.oc-row:first-child>.oc-connector-left{display:none}

@keyframes fadein{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}

.org-legend{display:flex;flex-wrap:wrap;gap:16px;align-items:center}.org-legend-item{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:#4c5768}.dark .org-legend-item{color:#c7d0dd}.org-legend-dot{width:10px;height:10px;border-radius:50%;flex:none}
.progress-row{display:grid;grid-template-columns:100px 1fr 30px;align-items:center;gap:10px;margin:16px 0;font-size:12px}.progress-row>div{height:8px;background:#edf0f4;border-radius:99px;overflow:hidden}.progress-row i{display:block;height:100%;background:#ff6269;border-radius:99px}.action-row{display:grid;grid-template-columns:1fr 35px 20px;align-items:center;padding:14px 5px;border-bottom:1px solid #eef1f4;font-size:12px}.dark .action-row{border-color:#293241}.action-row b{color:#e05259}
.simple-page{text-align:center;padding:55px}.big-icon{width:65px;height:65px;margin:0 auto 15px}.big-icon svg{width:30px;height:30px}.simple-page h2{margin:0 0 8px}.simple-page p{color:#818c9d}.feature-list{display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-top:20px;color:#5c6879;font-size:12px}.feature-list span{display:flex;gap:5px;align-items:center}.feature-list svg{color:#2b9b6a;width:15px}
.profile{display:flex;align-items:center;gap:18px;margin-bottom:28px}.avatar.huge{width:80px;height:80px;font-size:22px}.profile h2{margin:0 0 5px}.profile p{margin:0 0 5px;color:#697587}.profile span{color:#929cab;font-size:12px}.profile-fields{max-width:800px}
.modal-bg{position:fixed;inset:0;background:rgba(8,12,18,.55);display:grid;place-items:center;padding:20px;z-index:50}.modal{background:#fff;color:#172033;width:min(700px,100%);border-radius:14px;padding:22px;box-shadow:0 25px 70px rgba(0,0,0,.25)}.dark .modal{background:#171d27;color:#eef2f8}.modal-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}.modal-title h2{font-size:18px;margin:0}.modal-title button{border:0;background:transparent}.dark .modal-title button{color:#fff}
.toast{position:fixed;right:24px;bottom:24px;background:#172033;color:#fff;padding:12px 15px;border-radius:10px;display:flex;align-items:center;gap:9px;z-index:100;box-shadow:0 10px 35px rgba(0,0,0,.25);font-size:12px}.toast svg{color:#7be1aa}.toast button{border:0;background:transparent;color:#fff;display:grid;place-items:center}
.login-page{min-height:100vh;display:grid;grid-template-columns:1.1fr .9fr;background:#111827}.login-hero{padding:45px 8%;color:#fff;display:flex;flex-direction:column}.login-brand{padding:0}.hero-copy{max-width:620px;margin:auto 0}.eyebrow{display:inline-flex;align-items:center;gap:7px;color:#ff9b83;font-size:12px;font-weight:800}.hero-copy h1{font-size:55px;line-height:1.05;letter-spacing:-2.5px;margin:20px 0}.hero-copy em{color:#ff7772;font-style:normal}.hero-copy p{max-width:500px;color:#9ba6b7;line-height:1.7}.pills{display:flex;gap:8px;margin-top:25px}.pills span{border:1px solid #303b4d;padding:8px 11px;border-radius:99px;color:#b7c0cf;font-size:11px}.login-card{background:#fff;margin:25px;max-width:540px;width:calc(100% - 50px);align-self:center;justify-self:center;border-radius:18px;padding:38px;box-shadow:0 25px 80px rgba(0,0,0,.22)}.login-card h2{font-size:28px;margin:20px 0 5px}.login-card label{display:flex;flex-direction:column;gap:7px;font-size:12px;font-weight:700;margin-top:15px;color:#4b5768}.login-card input{width:100%;height:43px}.login-card>.btn{width:100%;margin-top:18px}.role-tabs{display:grid;grid-template-columns:1fr 1fr;background:#f3f5f8;padding:4px;border-radius:10px;margin:20px 0}.role-tabs button{border:0;background:transparent;border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:center;gap:7px;color:#778396;font-weight:700}.role-tabs button.selected{background:#fff;color:#e05259;box-shadow:0 2px 7px rgba(0,0,0,.08)}.or{display:flex;align-items:center;gap:10px;color:#a0a8b5;font-size:10px;margin:22px 0}.or:before,.or:after{content:"";height:1px;background:#e6e9ee;flex:1}.demo-buttons{display:grid;gap:9px}.demo-buttons button{display:flex;align-items:center;gap:12px;text-align:left;border:1px solid #e0e5eb;background:#fff;padding:11px;border-radius:9px}.demo-buttons button>svg{color:#e05259}.demo-buttons small{display:block;color:#8b95a4;margin-top:2px}.login-note{text-align:center;display:block;color:#9aa3b0;margin-top:20px}.mobile-brand{display:none}
@media(max-width:1050px){.stats-grid{grid-template-columns:repeat(2,1fr)}.two-grid{grid-template-columns:1fr}.department-grid{grid-template-columns:repeat(2,1fr)}.login-page{grid-template-columns:1fr}.login-hero{display:none}.login-card{margin:30px auto}.mobile-brand{display:flex}}
@media(max-width:760px){.sidebar{transform:translateX(-100%);width:250px}.sidebar.mobile-open{transform:translateX(0)}.main,.collapsed+.main{width:100%;margin-left:0}.desktop-trigger{display:none}.mobile-trigger,.mobile-close{display:grid}.topbar{padding:0 15px}.user-chip>div:last-child{display:none}.content{padding:18px 14px}.stats-grid{grid-template-columns:1fr 1fr}.department-grid{grid-template-columns:1fr}.page-header{align-items:flex-start;flex-direction:column}.quick-grid{grid-template-columns:repeat(2,1fr)}.form-grid{grid-template-columns:1fr}.full-field{grid-column:auto}.toolbar{flex-direction:column}.login-card{padding:25px;margin:15px;width:calc(100% - 30px)}}
@media(max-width:480px){.stats-grid{grid-template-columns:1fr}.topbar .search{display:none}.card{padding:15px}.quick-grid{grid-template-columns:1fr 1fr}.hero-copy h1{font-size:40px}}
/* ── Attendance Calendar ────────────────────────────────────── */
.att-cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.att-cal-head h3{font-size:16px;font-weight:700;margin:0}
.att-nav{border:1px solid #e5e9ef;background:#fff;width:32px;height:32px;border-radius:8px;font-size:20px;cursor:pointer;display:grid;place-items:center;color:#4c5768;transition:.15s}.att-nav:hover{background:#ff5b62;color:#fff;border-color:#ff5b62}.dark .att-nav{background:#1b222e;border-color:#303a4b;color:#cbd4e1}
.att-legend{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:18px}
.att-leg-item{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#4c5768}.dark .att-leg-item{color:#c7d0dd}
.att-leg-dot{width:11px;height:11px;border-radius:3px;flex:none}
.att-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
.att-dow{text-align:center;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:#8994a5;padding:6px 0}
.att-day{border-radius:9px;padding:6px 4px;min-height:58px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:3px;cursor:default;transition:.12s;border:1.5px solid transparent;position:relative}
.att-day--present{background:#f0fdf4}
.att-day--absent{background:#fef2f2}
.att-day--holiday{background:#eff6ff}
.att-day--leave{background:#faf5ff}
.att-day--weekend{background:#f8f9fb}
.att-day--today{border-color:#ff5b62!important;box-shadow:0 0 0 2px #ff5b6240}
.dark .att-day--present{background:#0e2e1a}.dark .att-day--absent{background:#2c1111}.dark .att-day--holiday{background:#0d1e3d}.dark .att-day--leave{background:#1e0d2e}.dark .att-day--weekend{background:#191f2a}
.att-day:hover:not(.att-day--weekend){border-color:#d0d7e2}
.att-day-num{font-size:12px;font-weight:700;color:#2a3447;line-height:1}.dark .att-day-num{color:#eef2f8}
.att-dot{width:8px;height:8px;border-radius:50%;flex:none}
.att-day-label{font-size:9px;font-weight:800;letter-spacing:.4px;margin-top:auto;padding:1px 5px;border-radius:3px}
.att-day--present .att-day-label{background:#dcfce7;color:#16a34a}
.att-day--absent  .att-day-label{background:#fee2e2;color:#dc2626}
.att-day--holiday .att-day-label{background:#dbeafe;color:#1d4ed8}
.att-day--leave   .att-day-label{background:#f3e8ff;color:#9333ea}
/* ── Payslips ─────────────────────────────────────────────── */
.ps-list{display:flex;flex-direction:column;gap:0}
.ps-list-row{display:grid;grid-template-columns:1fr auto auto auto auto;align-items:center;gap:18px;padding:16px 8px;border-bottom:1px solid #eef1f4;cursor:pointer;transition:.12s;border-radius:8px}
.ps-list-row:last-child{border-bottom:0}.ps-list-row:hover{background:#f7f9fb}.dark .ps-list-row:hover{background:#1b222e}.dark .ps-list-row{border-color:#293241}
.ps-list-month{display:flex;align-items:center;gap:12px}.ps-list-month strong{display:block;font-size:13px;font-weight:700;color:#1a2333}.dark .ps-list-month strong{color:#eef2f8}.ps-list-month small{display:block;font-size:10px;color:#8390a2;margin-top:2px}
.ps-month-icon{width:38px;height:38px;border-radius:9px;background:#fff0f0;color:#e05259;display:grid;place-items:center;flex:none}.dark .ps-month-icon{background:#2c1a1a}
.ps-list-earnings,.ps-list-net{text-align:right}.ps-list-earnings span,.ps-list-net span{display:block;font-size:10px;color:#8390a2}.ps-list-earnings strong,.ps-list-net strong{font-size:13px;font-weight:700;color:#1a2333}.dark .ps-list-earnings strong,.dark .ps-list-net strong{color:#eef2f8}
.ps-status-badge{display:inline-flex;align-items:center;border-radius:999px;padding:4px 10px;font-size:10px;font-weight:800;white-space:nowrap}.ps-status-badge.paid{background:#e8f7ef;color:#16a34a}.ps-status-badge.pending{background:#fff3db;color:#a96b00}
.ps-view-btn{border:1px solid #e5e9ef;background:#fff;border-radius:7px;padding:6px 11px;font-size:11px;font-weight:700;color:#4c5768;cursor:pointer;white-space:nowrap}.ps-view-btn:hover{background:#ff5b62;color:#fff;border-color:#ff5b62}.dark .ps-view-btn{background:#1b222e;border-color:#303a4b;color:#cbd4e1}
.payslip-detail{max-width:860px}
.ps-header{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding-bottom:20px;border-bottom:2px solid #eef1f4;margin-bottom:22px}.dark .ps-header{border-color:#293241}
.ps-company{font-size:18px;font-weight:800;color:#1a2333;margin-bottom:4px}.dark .ps-company{color:#eef2f8}
.ps-addr{font-size:11px;color:#8390a2}
.ps-badge-wrap{text-align:right}.ps-id{font-size:11px;color:#8390a2;margin-top:6px}
.ps-emp-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;background:#f8f9fb;border-radius:10px;padding:16px;margin-bottom:22px}.dark .ps-emp-row{background:#1b222e}
.ps-emp-row>div{display:flex;flex-direction:column;gap:3px}.ps-emp-row span{font-size:10px;color:#8390a2;font-weight:600;text-transform:uppercase;letter-spacing:.4px}.ps-emp-row strong{font-size:13px;color:#1a2333;font-weight:700}.dark .ps-emp-row strong{color:#eef2f8}
.ps-cols{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}
.ps-col-title{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:#8390a2;padding-bottom:10px;border-bottom:1px solid #eef1f4;margin-bottom:10px}.dark .ps-col-title{border-color:#293241}
.ps-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f3f5f8}.ps-row:last-child{border-bottom:0}.dark .ps-row{border-color:#1e2635}.ps-row span{font-size:12px;color:#5c6879}.ps-row strong{font-size:13px;font-weight:700;color:#1a2333}.dark .ps-row strong{color:#eef2f8}
.ps-row--total{background:#f7f9fb;margin:0 -8px;padding:10px 8px;border-radius:6px;border:0!important;margin-top:4px}.dark .ps-row--total{background:#1b222e}.ps-row--total span{font-weight:700;color:#3a4557}.dark .ps-row--total span{color:#c7d0dd}.ps-row--total strong{font-size:14px}
.ps-net{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,#ff5b62,#ff9c5a);border-radius:12px;padding:18px 22px;color:#fff;margin-bottom:18px}.ps-net span{font-size:14px;font-weight:600;opacity:.9}.ps-net strong{font-size:26px;font-weight:900;letter-spacing:-.5px}
.ps-footer{text-align:center;font-size:11px;color:#a0a8b6;padding-top:12px;border-top:1px dashed #e5e9ef}.dark .ps-footer{border-color:#293241;color:#5c6879}
/* ── Employee Directory ─────────────────────────────────────── */
.dir-dept-select{border:1px solid #dfe4eb;border-radius:9px;padding:9px 13px;font-size:12px;font-weight:600;color:#4c5768;background:#fff;outline:0;cursor:pointer}.dark .dir-dept-select{background:#1b222e;border-color:#303a4b;color:#cbd4e1}
.dir-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px;margin-top:18px}
.dir-card{background:#fff;border:1.5px solid #e5e9ef;border-radius:14px;padding:22px 18px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;transition:.15s;cursor:default}.dir-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(0,0,0,.09);border-color:#d0d5e0}.dark .dir-card{background:#171d27;border-color:#293241}
.dir-avatar{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;font-weight:900;font-size:18px;margin-bottom:6px}
.dir-name{font-size:14px;font-weight:800;color:#1a2333}.dark .dir-name{color:#eef2f8}
.dir-desg{font-size:10px;color:#8390a2}
.dir-dept{font-size:10px;font-weight:700}
.dir-contact{display:flex;flex-direction:column;gap:3px;margin-top:4px}
.dir-link{font-size:10px;color:#4f6ef7;text-decoration:none;word-break:break-all}.dir-link:hover{text-decoration:underline}
.dir-loc{font-size:10px;color:#8390a2;margin-top:2px}
/* ── Admin Attendance / Payroll selectors ────────────────────── */
.av-select-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.av-label{font-size:12px;font-weight:700;color:#4c5768;white-space:nowrap}.dark .av-label{color:#cbd4e1}
.av-select{border:1px solid #dfe4eb;border-radius:9px;padding:10px 14px;font-size:13px;font-weight:600;color:#1a2333;background:#fff;outline:0;cursor:pointer;flex:1;min-width:200px}.dark .av-select{background:#1b222e;border-color:#303a4b;color:#eef2f8}
/* ── Form 16 Banner ──────────────────────────────────────────── */
.f16-banner{display:flex;align-items:center;gap:16px;background:linear-gradient(120deg,#fffbeb,#fff7d6);border:1.5px solid #fde68a;border-radius:13px;padding:16px 20px;margin-bottom:20px}
.dark .f16-banner{background:linear-gradient(120deg,#2a2005,#1f1a00);border-color:#78620a}
.f16-icon{font-size:32px;flex:none}
.f16-body{flex:1}.f16-body strong{display:block;font-size:14px;font-weight:800;color:#1a2333;margin-bottom:3px}.dark .f16-body strong{color:#fef3c7}.f16-body p{margin:0;font-size:12px;color:#78620a}.dark .f16-body p{color:#d9b800}

/* ── Live Digital Clock ───────────────────────────────────────── */
.top-clock{display:inline-flex;align-items:center;gap:6px;background:#f3f6f9;border:1px solid #e2e8f0;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;color:#1e293b;font-variant-numeric:tabular-nums}
.dark .top-clock{background:#1e2635;border-color:#2e3a4e;color:#e2e8f0}
.top-clock small{font-size:9px;background:#ff5b62;color:#fff;padding:1px 5px;border-radius:4px;font-weight:800;letter-spacing:.3px}

/* ── Live Attendance Punch & Tracker Box ─────────────────────── */
.att-live-box{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;margin:14px 0}
.dark .att-live-box{background:#141a24;border-color:#263244}
.att-live-item{display:flex;flex-direction:column;gap:3px}
.att-live-lbl{font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.4px;display:flex;align-items:center;gap:5px}
.dark .att-live-lbl{color:#94a3b8}
.att-live-val{font-size:16px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}
.dark .att-live-val{color:#f1f5f9}
.att-punch-val{font-size:14px;font-weight:700;color:#2563eb;font-variant-numeric:tabular-nums}
.dark .att-punch-val{color:#60a5fa}
.att-dur-val{font-size:14px;font-weight:800;color:#16a34a;font-variant-numeric:tabular-nums}
.dark .att-dur-val{color:#4ade80}
.att-live-item small{font-size:10px;color:#94a3b8}

/* ── Indian Calendar Off-Days (Sat & Sun) ─────────────────────── */
.att-dow--off{color:#94a3b8!important;background:#f8fafc;border-radius:6px;font-weight:800}
.dark .att-dow--off{color:#64748b!important;background:#141a24}
.att-day--weekend{background:#f8fafc;border-color:#eef2f6;opacity:.8}
.dark .att-day--weekend{background:#141a24;border-color:#1e2736}
.att-day-label--off{background:#e2e8f0!important;color:#64748b!important;font-weight:800!important;font-size:9px!important;padding:1px 5px}
.dark .att-day-label--off{background:#263244!important;color:#94a3b8!important}
.att-day--upcoming{background:#f8fafc;border:1.5px dashed #cbd5e1!important;opacity:.85}
.dark .att-day--upcoming{background:#141a24;border:1.5px dashed #334155!important;opacity:.85}
.att-day-label--upcoming{background:#e2e8f0!important;color:#64748b!important;font-weight:700!important;font-size:9px!important;padding:1px 5px!important;border-radius:3px}
.dark .att-day-label--upcoming{background:#1e293b!important;color:#94a3b8!important}

/* ── Modals & Backdrop ────────────────────────────────────────── */
.modal-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.65);backdrop-filter:blur(4px);z-index:999;display:flex;align-items:center;justify-content:center;padding:16px}
.modal-dialog{background:#fff;border-radius:16px;max-width:760px;width:100%;max-height:92vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,.25);border:1px solid #e2e8f0;padding:24px}
.dark .modal-dialog{background:#161d27;border-color:#2a3444;color:#f1f5f9}
.modal-head{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:14px;border-bottom:1px solid #eef2f6;margin-bottom:16px}
.dark .modal-head{border-color:#263244}
.modal-title{font-size:18px;font-weight:800;color:#0f172a;margin:0}
.dark .modal-title{color:#f8fafc}
.modal-sub{font-size:12px;color:#64748b;margin:3px 0 0}
.dark .modal-sub{color:#94a3b8}
.modal-close-btn{background:none;border:none;cursor:pointer;color:#64748b;padding:4px;border-radius:6px}
.modal-close-btn:hover{background:#f1f5f9;color:#0f172a}
.dark .modal-close-btn:hover{background:#1e2635;color:#fff}

/* ── Salary Break-up Cards ────────────────────────────────────── */
.breakup-emp-card{display:flex;align-items:center;gap:14px;background:#f8fafc;border-radius:12px;padding:14px 18px;margin-bottom:14px;border:1px solid #e2e8f0}
.dark .breakup-emp-card{background:#131822;border-color:#222c3c}
.breakup-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;font-size:11px;background:#f8fafc;padding:12px 14px;border-radius:10px;margin-bottom:16px;border:1px solid #e2e8f0}
.dark .breakup-meta{background:#141a24;border-color:#263244}
.breakup-meta div{display:flex;flex-direction:column;gap:2px}
.breakup-meta span{color:#64748b;font-weight:600}
.breakup-meta strong{color:#0f172a}
.dark .breakup-meta strong{color:#f1f5f9}
.breakup-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
@media(max-width:680px){.breakup-grid{grid-template-columns:1fr}}
.breakup-box{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px}
.dark .breakup-box{background:#1a222f;border-color:#293547}
.breakup-box-title{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid #f1f5f9;display:flex;justify-content:space-between}
.dark .breakup-box-title{border-color:#263244}
.breakup-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;font-size:12px;border-bottom:1px dashed #f1f5f9}
.dark .breakup-row{border-color:#263244}
.breakup-row:last-child{border-bottom:none}
.breakup-row.total{font-weight:800;padding-top:10px;margin-top:4px;border-top:1.5px solid #cbd5e1;border-bottom:none}
.dark .breakup-row.total{border-color:#334155}
.breakup-net-card{background:linear-gradient(135deg,#ff5b62,#ff9c5a);border-radius:12px;padding:16px 20px;color:#fff;display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.breakup-net-card strong{font-size:24px;font-weight:900}
.breakup-net-card span{font-size:12px;font-weight:700;letter-spacing:.4px;opacity:.95}
.modal-actions{display:flex;justify-content:flex-end;gap:10px;padding-top:14px;border-top:1px solid #eef2f6}
.dark .modal-actions{border-color:#263244}

/* ── Run Payroll Dialog Components ────────────────────────────── */
.run-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:14px 0}
.run-kpi{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px}
.dark .run-kpi{background:#131822;border-color:#222c3c}
.run-kpi span{font-size:11px;color:#64748b;display:block;margin-bottom:2px}
.run-kpi strong{font-size:15px;font-weight:800;color:#0f172a}
.dark .run-kpi strong{color:#f1f5f9}
.run-checklist{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin:14px 0;display:flex;flex-direction:column;gap:7px}
.dark .run-checklist{background:#131822;border-color:#222c3c}
.run-checklist-item{display:flex;align-items:center;gap:9px;font-size:12px;color:#334155}
.dark .run-checklist-item{color:#cbd5e1}
.run-checklist-item .chk-icon{color:#16a34a;font-weight:900;flex:none}
`;


createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);
