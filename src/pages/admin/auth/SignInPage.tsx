import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/features/admin/sign/signApiSlice";
import { setRefreshToken } from "@/storage/Cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";
export const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // `useCreateUserMutation` 훅 사용
    const [loginUser, { isLoading, isSuccess, error }] = useLoginUserMutation();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // POST 요청을 보낼 데이터
            const userData = { email, password };
            const data = await loginUser(userData).unwrap();
            console.log(data);
            setRefreshToken(data.refresh_token);
        } catch (err) {
            console.error("Failed to create user", err);
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link to="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Sign In"}
                    </Button>
                    {isSuccess && <p>User created successfully!</p>}
                    {error && <p>Error creating user: {error.toString()}</p>}
                </form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/signUp" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
