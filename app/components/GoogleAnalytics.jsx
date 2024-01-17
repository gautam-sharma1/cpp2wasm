import React from 'react'
import Script from "next/script";
export default function GoogleAnalytics() {
    return (
        <>
            <Script
                prefetch
                src="https://www.googletagmanager.com/gtag/js?id=G-Q7HMTR5N95"
            ></Script>
            <Script prefetch>
                {`  window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-Q7HMTR5N95');`}
            </Script>
        </>
    )
}
