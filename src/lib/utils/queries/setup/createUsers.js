// createUsers.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createUsers() {
  try {
    // Crea dos usuarios
    const user1 = await prisma.user.create({
      data: {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1', // Asegúrate de manejar contraseñas de manera segura en producción
      },
    });

    const user2 = await prisma.user.create({
      data: {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password2', // Asegúrate de manejar contraseñas de manera segura en producción
      },
    });

    console.log('Usuarios creados:', { user1, user2 });
  } catch (error) {
    console.error('Error al crear los usuarios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createUsers();
