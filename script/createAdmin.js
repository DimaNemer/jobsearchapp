// scripts/createAdmin.js
// Run this file with: node scripts/createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string - UPDATE THIS WITH YOUR CONNECTION STRING
const MONGODB_URI = 'mongodb://localhost:27017/jobSearchDB';

// Admin user details - CHANGE THESE TO YOUR DESIRED CREDENTIALS
const ADMIN_EMAIL = 'admin@jobportal.com';
const ADMIN_PASSWORD = 'Admin123!'; // Change this to a secure password
const ADMIN_NAME = 'Admin User';

// User Schema (copy from your User model)
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'employer', 'admin'], default: 'candidate' },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email:', ADMIN_EMAIL);
      
      // Update to admin role if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('✅ Updated existing user to admin role');
      }
      
      await mongoose.connection.close();
      return;
    }

    // Hash the password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create admin user
    const adminUser = new User({
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await adminUser.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('==========================================');
    console.log('Admin Login Credentials:');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('==========================================');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    console.log('You can now login at: http://localhost:3000/auth/login');
    
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createAdmin();