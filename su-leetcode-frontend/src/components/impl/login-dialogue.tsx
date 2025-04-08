import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { useCookies } from "react-cookie";
import { Label } from "../ui/label";

export function LoginDialogue() {
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const { toast } = useToast();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie] = useCookies(["login"]);

    const sendOtp = async () => {};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            toast({
                title: "Success: Logged in",
                description: "You have successfully logged in. Fetching player data...",
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Error: Failed to login",
                description: "Please check your email and OTP and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                    Use your YoStar email to send a code to your email. No login information is stored on the server. myrtle.moe keeps you logged in for one day max as a security measure.
                    <br />
                    <br />
                    <b>WARNING:</b> Logging in will log you out of all current Arknights sessions. Make sure you are not logged in on any other devices.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={email} type="email" placeholder="doctor@rhodes.island" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    {isOtpSent && (
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="otp">Code</Label>
                            <Input id="otp" type="number" placeholder="Enter OTP..." value={otp} onChange={(e) => setOTP(String(e.target.value))} required />
                        </div>
                    )}
                </div>
                <DialogFooter className="mt-4 flex flex-col items-start space-y-2">
                    <div className="flex flex-row items-center gap-4">
                        <button
                            type="button"
                            className="hover:underline"
                            onClick={() => {
                                setIsOtpSent(false);
                                setCooldown(0);
                                setOTP("");
                            }}
                        >
                            Retry
                        </button>
                        <Button type="submit" className="w-full" onClick={isOtpSent ? handleSubmit : sendOtp} disabled={isLoading || (isLoading && cooldown > 0) || (isOtpSent && otp.length === 0)}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait...
                                </>
                            ) : isOtpSent ? (
                                "Login"
                            ) : cooldown > 0 ? (
                                `Resend OTP (${cooldown}s)`
                            ) : (
                                "Send OTP"
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
