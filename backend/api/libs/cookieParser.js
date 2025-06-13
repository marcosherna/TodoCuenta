const config = {
    httpOnly: true, // Protege la cookie contra accesos desde JavaScript
    secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
    maxAge: 60 * 60 * 1000, // Expira en 1 hora
    sameSite: 'Strict'
}

export { config };