require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Routes
app.post('/api/users', authenticateUser, async (req, res) => {
  try {
    const { email, firebaseUid, role } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        firebaseUid,
        role,
      },
    });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/profiles', authenticateUser, async (req, res) => {
  try {
    const { userId, firstName, lastName, bio, specialties, certifications } =
      req.body;
    const profile = await prisma.profile.create({
      data: {
        userId,
        firstName,
        lastName,
        bio,
        specialties,
        certifications,
      },
    });
    res.json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Error creating profile' });
  }
});

app.post('/api/messages', authenticateUser, async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
    res.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Admin routes
app.get('/api/admin/users', authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        messages: true,
        receivedMessages: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.get('/api/admin/events', authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const events = await prisma.adminEvent.findMany({
      include: {
        user: true,
      },
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
