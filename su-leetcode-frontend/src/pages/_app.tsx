import { type AppType } from "next/app";
import { Geist } from "next/font/google";
import { CookiesProvider } from "react-cookie";
import Layout from "~/components/impl/layout";

import "~/styles/globals.css";

const geist = Geist({
    subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <CookiesProvider>
            <div className={geist.className} suppressHydrationWarning={true}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </CookiesProvider>
    );
};

export default MyApp;
