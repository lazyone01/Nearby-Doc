const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (replace with actual database in production)
const users = [];
const appointments = [];
const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Mitchell',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 234,
    experience: '15 years',
    location: 'Medical Center, Downtown',
    nextAvailable: '2:00 PM Today',
    image: '👩‍⚕️',
    about: 'Specialized in preventive cardiology and heart disease management.',
    fee: '$120'
  },
  {
    id: 2,
    name: 'Dr. James Chen',
    specialty: 'Pediatrician',
    rating: 4.8,
    reviews: 189,
    experience: '12 years',
    location: 'Children\'s Hospital',
    nextAvailable: '4:30 PM Today',
    image: '👨‍⚕️',
    about: 'Expert in child development and pediatric care.',
    fee: '$100'
  },
  {
    id: 3,
    name: 'Dr. Emily Roberts',
    specialty: 'Dermatologist',
    rating: 4.9,
    reviews: 312,
    experience: '10 years',
    location: 'Skin Care Clinic, Uptown',
    nextAvailable: 'Tomorrow 9:00 AM',
    image: '👩‍⚕️',
    about: 'Specializing in medical and cosmetic dermatology.',
    fee: '$150'
  },
  {
    id: 4,
    name: 'Dr. Michael Brown',
    specialty: 'Orthopedic',
    rating: 4.7,
    reviews: 156,
    experience: '18 years',
    location: 'Sports Medicine Center',
    nextAvailable: 'Tomorrow 11:00 AM',
    image: '👨‍⚕️',
    about: 'Expert in sports injuries and joint replacement.',
    fee: '$130'
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 198,
    experience: '14 years',
    location: 'Neuroscience Institute',
    nextAvailable: 'Tomorrow 3:00 PM',
    image: '👩‍⚕️',
    about: 'Specializing in neurological disorders and brain health.',
    fee: '$140'
  }
];

// Helper function to generate unique IDs
let userIdCounter = 1;
let appointmentIdCounter = 1;

// Auth Routes
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validation
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }

  // Create new user
  const newUser = {
    id: userIdCounter++,
    name,
    email,
    password, // In production, hash the password!
    phone,
    memberSince: new Date().getFullYear().toString(),
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  // Return user data (without password)
  res.status(201).json({
    message: 'User created successfully',
    userId: newUser.id,
    name: newUser.name,
    email: newUser.email,
    memberSince: newUser.memberSince
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Return user data (without password)
  res.status(200).json({
    message: 'Login successful',
    userId: user.id,
    id: user.id,
    name: user.name,
    email: user.email,
    memberSince: user.memberSince
  });
});

// Doctor Routes
app.get('/api/doctors', (req, res) => {
  res.status(200).json(doctors);
});

app.get('/api/doctors/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctors.find(d => d.id === doctorId);
  
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }
  
  res.status(200).json(doctor);
});

// Appointment Routes
app.post('/api/appointments', (req, res) => {
  const { userId, doctorId, date, time, reason } = req.body;

  // Validation
  if (!userId || !doctorId || !date || !time || !reason) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Find doctor
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  // Create appointment
  const newAppointment = {
    id: appointmentIdCounter++,
    userId,
    doctorId,
    doctorName: doctor.name,
    doctorSpecialty: doctor.specialty,
    doctorImage: doctor.image,
    doctorLocation: doctor.location,
    date,
    time,
    reason,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppointment);

  res.status(201).json({
    message: 'Appointment booked successfully',
    appointmentId: newAppointment.id,
    appointment: newAppointment
  });
});

app.get('/api/appointments/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userAppointments = appointments.filter(a => a.userId === userId);
  
  // Transform to match frontend format
  const formattedAppointments = userAppointments.map(apt => ({
    id: apt.id,
    doctor: {
      id: apt.doctorId,
      name: apt.doctorName,
      specialty: apt.doctorSpecialty,
      image: apt.doctorImage,
      location: apt.doctorLocation
    },
    date: apt.date,
    time: apt.time,
    reason: apt.reason,
    status: apt.status
  }));
  
  res.status(200).json(formattedAppointments);
});

app.get('/api/appointments/detail/:appointmentId', (req, res) => {
  const appointmentId = parseInt(req.params.appointmentId);
  const appointment = appointments.find(a => a.id === appointmentId);
  
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  
  res.status(200).json(appointment);
});

app.delete('/api/appointments/:appointmentId', (req, res) => {
  const appointmentId = parseInt(req.params.appointmentId);
  const index = appointments.findIndex(a => a.id === appointmentId);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Appointment not found' });
  }
  
  appointments.splice(index, 1);
  res.status(200).json({ message: 'Appointment cancelled successfully' });
});

// User Profile Route
app.get('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Return user data (without password)
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    memberSince: user.memberSince
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'NearbyDoc API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NearbyDoc API server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Total doctors available: ${doctors.length}`);
});

module.exports = app;