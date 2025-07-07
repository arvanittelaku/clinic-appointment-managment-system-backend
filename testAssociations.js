const { sequelize, User, Appointment } = require('./models');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    const doctor = await User.create({
      name: 'Dr. Arvanit',
      email: 'arvanitdr@example.com',
      password: 'secret',
      role: 'doctor',
    });

    
    const patient = await User.create({
      name: 'Arvanit Patient',
      email: 'arvanitpatient@example.com',
      password: 'secret',
      role: 'patient',
    });

    const appointment = await Appointment.create({
      doctor_id: doctor.id,
      patient_id: patient.id,
      date: new Date('2025-08-01'),
      time_slot: '10:00 - 10:30',
      status: 'scheduled',
    });

    const fetchedAppointment = await Appointment.findOne({
      where: { id: appointment.id },
      include: [
        { model: User, as: 'doctor' },
        { model: User, as: 'patient' }
      ],
    });

    console.log(JSON.stringify(fetchedAppointment, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

test();
