import App from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  let pageProps = {};
  try {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
  }
  catch (error) {
    //console.log(error)
  }

  pageProps.query = ctx.query;
  return { pageProps };
}

export default withData(MyApp);
