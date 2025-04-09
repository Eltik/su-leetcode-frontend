import { type AppType } from "next/app";
import { Geist } from "next/font/google";
import { CookiesProvider } from "react-cookie";
import Layout from "~/components/impl/layout";
import { ThemeProvider } from "~/components/impl/theme-provider";

import "~/styles/globals.css";

const geist = Geist({
    subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <CookiesProvider>
            <div className={geist.className} suppressHydrationWarning={true}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </div>
        </CookiesProvider>
    );
};

export default MyApp;
