export default function Redirect() {
    return (
        <html>
            <head>
                <meta httpEquiv="refresh" content="0; URL=/login" />
            </head>
            <body>
                <p>Redireccionando a /dashboard...</p>
            </body>
        </html>
    );
}
