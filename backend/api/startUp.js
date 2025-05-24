import dotenv from 'dotenv';

dotenv.config();

export default function startUp( server ) {

    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || 'localhost';

    return new Promise((resolve, reject) => {
        server.listen(PORT, HOST, () => {
            console.log(`Server is running on http://${HOST}:${PORT}`);
            resolve();
        });
    });
}