const express = require('express');
const cors = require('cors');
const User = require('./models/model');
const cron = require('node-cron');
const path = require('path');
const { sendBirthdayEmail } = require('./utils/mailer');
const { DBConnection } = require('./configs/db');


const app = express();
const server = require('http').createServer(app);
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.post('/form', async (req, res) => {
  const { dob, username, email } = req.body;

  if (!dob || !username || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const dobDate = new Date(dob + 'T00:00:00Z');

  try {
    await User.create({
      username,
      email,
      dob: dobDate,
    });

    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Cron job to run daily at 7
cron.schedule('0 7 * * *', async () => {
  console.log('Running cron job to check for birthdays...');
  const today = new Date();
  const usersWithBirthdayToday = await User.find({
    $expr: {
      $and: [
        { $eq: [{ $dayOfMonth: "$dob" }, today.getUTCDate()] },
        { $eq: [{ $month: "$dob" }, today.getUTCMonth() + 1] }
      ]
    }
  });

  for (const user of usersWithBirthdayToday) {
    try {
      await sendBirthdayEmail(user.email, user.username);
      console.log(`Email sent to ${user.email}`);
    } catch (err) {
      console.error(`Failed to send email to ${user.email}:`, err);
    }
  }
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, async() => {
    DBConnection()
    console.log(`Server is running on port ${PORT}`);
})