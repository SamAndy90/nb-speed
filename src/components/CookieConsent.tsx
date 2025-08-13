"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasConsented = localStorage.getItem("cookieConsent");
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setIsVisible(false);
        enableCookies();
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined");
        setIsVisible(false);
        disableCookies();
    };

    const enableCookies = () => {
        console.log("Cookies enabled for analytics and advertising.");
    };

    const disableCookies = () => {
        console.log("Non-essential cookies disabled.");
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-5 right-5 md:right-5 left-5 md:left-auto z-50">
            <Card
                className="max-w-sm bg-white/50 backdrop-blur-md border border-gray-200/50"
            >
                <CardHeader>
                    <CardTitle className="text-[18px] md:text-[20px] font-light leading-[28px]">Cookie Consent 🍪</CardTitle>
                    <CardDescription className={'font-normal text-[14px] md:text-[16px] text-[#2D2F36] '}>
                        We use both first-party and third-party cookies for analytics and
                        advertising. By clicking &quot;Accept&quot;, you agree to our use of cookies.
                        More info in our{" "}
                        <Link
                            href="/legal/privacy"
                            target="_blank"
                            className="underline"
                        >
                            privacy policy
                        </Link>
                        .
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-3">
                    <Button
                        onClick={handleAccept}
                        className="bg-base-100 hover:bg-base-100/90 text-base-50"
                    >
                        Accept
                    </Button>
                    <Button
                        onClick={handleDecline}
                        variant="outline"
                        className="border-base-100 text-gray-700 hover:bg-gray-100"
                    >
                        Decline
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}