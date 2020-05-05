import Head from 'next/head';

export default function Meta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf8" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <link rel="manifest" href="/static/site.webmanifest"></link>
      <link rel="shortcupt icon" href="/static/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,700&display=swap" rel="stylesheet" />
      <title>Thrift Store</title>
    </Head>
  );
}