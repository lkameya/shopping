import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf8" />
      <link rel="shortcupt icon" href="/static/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,700&display=swap" rel="stylesheet" />
      <title>Wears</title>
    </Head>
  );
}