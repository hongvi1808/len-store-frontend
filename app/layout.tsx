import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'
import StyleRoot from "@/base/ui/style-root";
import ReactQueryProvider from "@/base/react-query/provider";
import { ReduxProvider } from "@/base/store/provider";
import { GoogleProviders } from "@/base/google-auth/provider";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <GoogleProviders>

                    <ReduxProvider>
                        <ReactQueryProvider>
                            <StyleRoot>
                                {children}
                            </StyleRoot>
                        </ReactQueryProvider>
                    </ReduxProvider>
                </GoogleProviders>

            </body>
        </html>
    );
}
